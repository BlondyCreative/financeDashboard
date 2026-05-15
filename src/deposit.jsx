import React, { useState, useEffect, useCallback } from "react";
import { Info, Search, ShieldCheck, Download } from "lucide-react";

const DepositCard = ({ userId: userIdProp }) => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const rawUser =
    userIdProp ||
    (() => {
      try {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored)?.id : null;
      } catch {
        return null;
      }
    })();

  const userId = rawUser ? String(rawUser).replace(/[^0-9]/g, "") : null;

  const fetchBalance = useCallback(async () => {
    if (!userId) {
      console.warn("No hay userId para obtener balance");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/auth/wallet/${userId}`,
      );

      if (!response.ok) {
        console.error("Respuesta no OK al obtener balance");
        setAvailableBalance(0);
        return;
      }

      const data = await response.json();

      const balanceRaw =
        typeof data.balance === "object" ? data.balance.balance : data.balance;

      const balanceNum = parseFloat(balanceRaw);
      setAvailableBalance(Number.isNaN(balanceNum) ? 0 : balanceNum);
    } catch (error) {
      console.error("Error al obtener balance:", error);
      setAvailableBalance(0);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      return alert("No se encontró el usuario. Vuelve a iniciar sesión.");
    }

    const numericAmount = parseFloat(amount);

    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      return alert("Ingrese un monto válido");
    }

    if (activeTab === "transfer" && numericAmount > availableBalance) {
      return alert("Saldo insuficiente para transferir");
    }

    setIsProcessing(true);

    const endpoint = activeTab === "deposit" ? "deposit" : "null";

    try {
      const response = await fetch(
        `http://localhost:5001/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: Number(userId),
            amount: numericAmount,
            recipient: activeTab === "deposit" ? recipient : null,
          }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        alert(`¡Deposito exitoso!`);
        setAmount("");
        setRecipient("");
        fetchBalance();

        window.dispatchEvent(new Event("transactionsUpdated"));
      } else {
        alert(
          `Error: ${data.details || data.message || "No se pudo procesar"}`,
        );
      }
    } catch (error) {
      console.error("Error en la transacción:", error);
      alert("Error de conexión con el servidor.");
    } finally {
      setIsProcessing(false);
    }
  };

  const numericAmount = parseFloat(amount) || 0;
  const isDisabled =
    !amount ||
    Number.isNaN(numericAmount) ||
    numericAmount <= 0 ||
    (activeTab === "transfer" && !recipient) ||
    (activeTab === "transfer" && numericAmount > availableBalance) ||
    isProcessing;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-900">
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 w-full max-w-2xl overflow-hidden">
        <div className="px-8 md:px-16 py-8">
          <div className="bg-gray-100/80 p-1.5 rounded-2xl flex mb-12 max-w-md mx-auto">
            {["deposit"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all capitalize ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-4">
              {activeTab === "deposit"
                ? "Amount to deposit"
                : `Amount to ${activeTab}`}
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

          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto space-y-6 mb-10"
          >
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

            {activeTab === "transfer" && (
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
            )}

            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-[0.98] ${
                !isDisabled
                  ? "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isProcessing
                ? "Processing..."
                : activeTab === "transfer" && numericAmount > availableBalance
                  ? "Insufficient Balance"
                  : `Confirm ${
                      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                    }`}

              {!isProcessing &&
                (activeTab === "transfer" ? (
                  <ShieldCheck size={20} />
                ) : (
                  <Download size={20} />
                ))}
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

export default DepositCard;