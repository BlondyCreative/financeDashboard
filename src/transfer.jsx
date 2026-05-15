import React, { useState, useEffect } from "react";
import { Info, Search, ShieldCheck } from "lucide-react";

const TransactionCard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ============================
  // OBTENER BALANCE
  // ============================
  useEffect(() => {
    const fetchBalance = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:5001/api/auth/wallet/${userId}`,
        );
        const data = await response.json();
        setAvailableBalance(Number(data.balance) || 0);
      } catch (error) {
        console.error("❌ Error obteniendo balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [userId]);

  // ============================
  // TRANSFER
  // ============================
  const handleTransfer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || !recipient) {
      setError("Debes ingresar monto y destinatario");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("http://localhost:5001/api/auth/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          amount: Number(amount),
          recipient_name: recipient,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Error en transferencia");
        return;
      }

      setAvailableBalance(result.new_balance);
      setAmount("");
      setRecipient("");
      setSuccess("Transferencia exitosa");

      window.dispatchEvent(new Event("transactionsUpdated"));
    } catch (error) {
      console.error("❌ Error enviando transferencia:", error);
      setError("Error de conexión");
    } finally {
      setIsSending(false);
    }
  };

  const numericAmount = parseFloat(amount) || 0;

  const isDisabled =
    !amount ||
    numericAmount <= 0 ||
    !recipient ||
    numericAmount > availableBalance ||
    isSending;

  // ============================
  // UI
  // ============================
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-900">
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 w-full max-w-2xl overflow-hidden">
        <div className="px-8 md:px-16 py-8">
          {/* Tabs (solo transfer) */}
          <div className="bg-gray-100/80 p-1.5 rounded-2xl flex mb-12 max-w-md mx-auto">
            <button
              type="button"
              className="flex-1 py-2.5 text-sm font-bold rounded-xl bg-white text-blue-600 shadow-sm capitalize"
            >
              transfer
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-4">
              Amount to transfer
            </p>

            <div className="flex items-center justify-center gap-1">
              <span
                className={`text-4xl font-light ${
                  amount ? "text-blue-600" : "text-gray-300"
                }`}
              >
                $
              </span>
              <span className="text-7xl font-bold text-gray-800 tracking-tighter">
                {amount || "0.00"}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mt-6 border border-blue-100">
              <Info size={14} />
              <span className="text-xs font-bold font-mono">
                {loading
                  ? "Cargando..."
                  : `Available: $${availableBalance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleTransfer}
            className="max-w-lg mx-auto space-y-6 mb-10"
          >
            {/* Amount */}
            <div className="group">
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2 ml-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-10 pr-4 outline-none focus:border-blue-500 focus:bg-white transition-all text-gray-600 shadow-sm"
                />
              </div>
            </div>

            {/* Recipient */}
            <div className="group animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2 ml-1">
                Send to
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Email or Wallet ID"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white transition-all text-gray-600 shadow-sm"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-[0.98] ${
                !isDisabled
                  ? "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isSending
                ? "Processing..."
                : numericAmount > availableBalance
                  ? "Insufficient Balance"
                  : "Confirm Transfer"}

              {!isSending && <ShieldCheck size={20} />}
            </button>
          </form>
        </div>

        <div className="bg-gray-50/80 py-5 flex items-center justify-center gap-2 border-t border-gray-100">
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Encrypted end-to-end transaction
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
