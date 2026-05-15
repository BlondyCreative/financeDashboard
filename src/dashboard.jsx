import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Bell,
  Settings,
  Plus,
  Calendar,
  ChevronDown,
  Maximize2,
  BarChart3,
  CreditCard,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import "./App.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [wallet, setWallet] = useState({ balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const getStoredUser = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error leyendo user de localStorage:", error);
      return null;
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const user = getStoredUser();
      const cleanUserId = Number(user?.id);

      if (!cleanUserId) {
        console.warn("No hay userId disponible");
        setLoading(false);
        return;
      }
      setUserId(cleanUserId);

      const [userRes, walletRes, txRes] = await Promise.all([
        fetch(`http://localhost:5001/api/auth/user/${cleanUserId}`),
        fetch(`http://localhost:5001/api/auth/wallet/${cleanUserId}`),
        fetch(`http://localhost:5001/api/auth/transactions/${cleanUserId}`),
      ]);

      if (userRes.ok) setUserData(await userRes.json());

      if (walletRes.ok) {
        const data = await walletRes.json();
        const cleanWallet = Array.isArray(data) ? data[0] : data;
        setWallet({ balance: Number(cleanWallet?.balance) || 0 });
      }

      if (txRes.ok) {
        const data = await txRes.json();
        let txList = Array.isArray(data) ? data : [];
        txList = txList.filter((tx) => tx && tx.id != null);

        txList.sort((a, b) => {
          const da = a.transaction_date ? new Date(a.transaction_date) : 0;
          const db = b.transaction_date ? new Date(b.transaction_date) : 0;
          return db - da;
        });

        setTransactions(txList);
      }
    } catch (err) {
      console.error("Error en fetchData:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const handler = () => fetchData();
    window.addEventListener("transactionsUpdated", handler);
    return () => window.removeEventListener("transactionsUpdated", handler);
  }, [fetchData]);

  const chartData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const grouped = months.map((m) => ({ month: m, goal: 0 }));

    transactions.forEach((tx) => {
      if (tx.transaction_date && tx.type === "deposit") {
        const date = new Date(tx.transaction_date);
        const monthIndex = date.getMonth();
        grouped[monthIndex].goal += Number(tx.amount);
      }
    });
    return grouped;
  }, [transactions]);

  if (loading) return <div className="loading">Loading...</div>;

  const displayName =
    userData?.name || userData?.nombre || getStoredUser()?.name || "User";

  return (
    <div className="dashboard-container">
      <main className="main-content">
        {/* HEADER */}
        <header className="top-header">
          <div className="header-center">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search anything" />
            </div>
          </div>

          <div className="header-right">
            <div className="action-icons">
              <div className="icon-bg">
                <Bell size={20} />
              </div>
              <div className="icon-bg">
                <Settings size={20} />
              </div>
            </div>

            <div className="user-profile">
              <div className="user-info">
                <span className="name">{displayName}</span>
                <span className="email">
                  {userData?.email || getStoredUser()?.email || "Cargando..."}
                </span>
              </div>
              <img src="../src/assets/icon.png" alt="profile" />
            </div>
          </div>
        </header>

        <div className="content-layout">
          {/* COLUMNA IZQUIERDA */}
          <div className="left-column">
            <section className="welcome-area">
              <h1>
                <span className="playfair-italic">Good Morning </span>
                {displayName}!
              </h1>
              <p className="pending-msg">
                ⓘ You have <strong>8 pending</strong> payments today!
              </p>
              <div className="welcome-btns">
                <button className="btn-black">
                  <Plus size={18} /> Create Request Payment
                </button>
                <button className="btn-white">
                  <Calendar size={18} /> Sat, 13 Aug
                </button>
                <button className="btn-icon-search">
                  <Search size={18} />
                </button>
              </div>
            </section>

            {/* INCOME TRACKER CARD - DINÁMICO */}
            <div className="card chart-card">
              <div className="card-header">
                <div className="filter-group">
                  <span className="filter-pill">
                    <Calendar size={14} /> 2026 <ChevronDown size={14} />
                  </span>
                  <span className="filter-pill">
                    Monthly <ChevronDown size={14} />
                  </span>
                </div>
                <Maximize2
                  size={18}
                  className="text-muted"
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div
                className="chart-main-container"
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                {/* Gráfico Dinámico */}
                <div className="chart-viz" style={{ flex: "2" }}>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#999", fontSize: 12 }}
                      />
                      <Bar
                        dataKey="goal"
                        fill="#ffcea3"
                        radius={[5, 5, 0, 0]}
                        barSize={30}
                        animationDuration={1000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Estadísticas del lado derecho (Espacio Blanco) */}
                <div
                  className="chart-details"
                  style={{ flex: "1", paddingLeft: "20px" }}
                >
                  <div
                    className="detail-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      className="icon-title"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#666",
                      }}
                    >
                      <BarChart3 size={18} />
                      <span style={{ fontWeight: "600" }}>Income Tracker</span>
                    </div>
                    <span
                      className="trend-up"
                      style={{
                        backgroundColor: "#e6f4ea",
                        color: "#1e7e34",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      ↑ 13%
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      margin: "10px 0",
                    }}
                  >
                    $
                    {wallet.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </h2>

                  <div
                    className="mini-stats"
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginBottom: "15px",
                    }}
                  >
                    <div className="m-stat">
                      <strong style={{ fontSize: "18px" }}>56% ↑</strong>
                      <div style={{ color: "#999", fontSize: "12px" }}>
                        Last Month
                      </div>
                    </div>
                    <div className="m-stat">
                      <strong style={{ fontSize: "18px" }}>
                        {transactions.length}
                      </strong>
                      <div style={{ color: "#999", fontSize: "12px" }}>
                        Movements
                      </div>
                    </div>
                  </div>
                  <p
                    className="increase-msg"
                    style={{ color: "#999", fontSize: "13px" }}
                  >
                    Actualizado en tiempo real.
                  </p>
                </div>
              </div>
            </div>

            {/* STATS AND TABLE ROW */}
            <div className="bottom-row">
              <div className="mini-cards-stack">
                <div className="card mini-card yellow-bg">
                  <div className="mini-val">{transactions.length}</div>
                  <div className="mini-label">Total Movements</div>
                </div>
                <div className="card mini-card yellow-bg">
                  <div className="mini-val">$ {wallet.balance.toFixed(2)}</div>
                  <div className="mini-label">Available Balance</div>
                </div>
              </div>

              <div className="card table-card">
                <div className="table-header">
                  <h3>
                    Recent Activities <span className="trend-up">↑ 13%</span>
                  </h3>
                </div>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Plan</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td
                            style={{
                              color:
                                tx.type === "withdrawal"
                                  ? "#e53e3e"
                                  : "inherit",
                            }}
                          >
                            {tx.type === "withdrawal" ? "-" : ""}${tx.amount}
                          </td>
                          <td>
                            <span className="plan-badge">{tx.type}</span>
                          </td>
                          <td
                            className={tx.status === "Delayed" ? "delayed" : ""}
                          >
                            {tx.status}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          style={{
                            textAlign: "center",
                            padding: "40px",
                            color: "#666",
                          }}
                        >
                          Sin movimientos
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="right-column">
            <div className="card physical-card-box">
              <div className="visa-preview">
                <div className="visa-name">{displayName.toUpperCase()}</div>
                <div className="visa-number">**** **** **** 5472</div>
              </div>
              <div className="visa-details">
                <h3>VISA</h3>
                <p>Linked to main account</p>
                <button className="btn-type">
                  Credit card <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="quick-actions-grid">
              <button
                className="q-btn"
                onClick={() =>
                  navigate("/transfer", {
                    state: { userId, balance: wallet.balance },
                  })
                }
              >
                <CreditCard />
                <span>Transfer</span>
              </button>
              <button className="q-btn" onClick={() => navigate("/deposit")}>
                <Plus />
                <span>Deposit</span>
              </button>
            </div>

            <div className="upgrade-box">
              <div className="upgrade-top">
                <div className="rocket">🚀</div>
                <div className="upgrade-text">
                  <h3>Upgrade Your Card</h3>
                  <p>Better Card Better Quality</p>
                </div>
                <div className="upgrade-price">
                  $8<span>/Mo</span>
                </div>
              </div>
              <button className="btn-upgrade-now">Upgrade!</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
