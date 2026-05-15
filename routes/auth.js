const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "finan-dash",
});

// =========================
// 1. OBTENER BALANCE
// =========================
router.get("/wallet/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT balance FROM wallets WHERE user_id = ?",
      [userId],
    );

    if (rows.length === 0) return res.json({ balance: 0 });

    res.json({ balance: Number(rows[0].balance) });
  } catch (error) {
    console.error("Error obteniendo balance:", error);
    res.status(500).json({ message: "Error obteniendo balance" });
  }
});

// =========================
// 2. OBTENER TRANSACCIONES
// =========================
router.get("/transactions/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC",
      [userId],
    );

    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo transacciones:", error);
    res.status(500).json({ message: "Error obteniendo transacciones" });
  }
});

// =========================
// 3. REGISTRAR DEPÓSITO
// =========================
router.post("/deposit", async (req, res) => {
  const { user_id, amount } = req.body;

  if (!user_id || !amount) {
    return res.status(400).json({ message: "Datos faltantes" });
  }

  try {
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      return res.status(400).json({ message: "Monto inválido" });
    }

    // 1) Insertar transacción (solo columnas que EXISTEN)
    await pool.query(
      "INSERT INTO transactions (user_id, platform, amount) VALUES (?, 'Web', ?)",
      [user_id, amt],
    );

    // 2) Actualizar wallet
    await pool.query(
      "UPDATE wallets SET balance = balance + ?, last_update = NOW() WHERE user_id = ?",
      [amt, user_id],
    );

    // 3) Obtener nuevo balance para devolverlo al front
    const [rows] = await pool.query(
      "SELECT balance FROM wallets WHERE user_id = ?",
      [user_id],
    );

    const newBalance = rows.length ? Number(rows[0].balance) : 0;

    res.json({
      message: "Depósito exitoso",
      new_balance: newBalance,
    });
  } catch (error) {
    console.error("Error en depósito:", error);
    res.status(500).json({ message: "Error en servidor" });
  }
});

router.post("/transfer", async (req, res) => {
  const { user_id, amount, recipient_name } = req.body;

  if (!user_id || !amount || !recipient_name) {
    return res.status(400).json({
      message: "Faltan datos: user_id, amount, recipient_name",
    });
  }

  try {
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      return res.status(400).json({ message: "Monto inválido" });
    }

    // Buscar destinatario
    const [recipientRows] = await pool.query(
      "SELECT id FROM users WHERE name = ?",
      [recipient_name],
    );

    if (recipientRows.length === 0) {
      return res.status(400).json({ message: "El destinatario no existe" });
    }

    const recipientId = recipientRows[0].id;

    // Obtener balance del usuario
    const [walletRows] = await pool.query(
      "SELECT balance FROM wallets WHERE user_id = ?",
      [user_id],
    );

    if (walletRows.length === 0) {
      return res.status(400).json({ message: "Wallet no encontrada" });
    }

    const balance = Number(walletRows[0].balance);

    if (balance < amt) {
      return res.status(400).json({ message: "Fondos insuficientes" });
    }

    const newBalance = balance - amt;

    // Restar al usuario
    await pool.query(
      "UPDATE wallets SET balance = ?, last_update = NOW() WHERE user_id = ?",
      [newBalance, user_id],
    );

    // SUMAR AL DESTINATARIO (ESTO ES LO QUE NO SE EJECUTABA)
    await pool.query(
      "UPDATE wallets SET balance = balance + ?, last_update = NOW() WHERE user_id = ?",
      [amt, recipientId],
    );

    // Registrar transacción (SOLO COLUMNAS QUE EXISTEN)
    await pool.query(
      "INSERT INTO transactions (user_id, platform, amount) VALUES (?, 'Web', ?)",
      [user_id, amt],
    );

    res.json({
      message: "Transferencia exitosa",
      old_balance: balance,
      new_balance: newBalance,
      sent_to: recipient_name,
    });
  } catch (error) {
    console.error("🔥 ERROR EN TRANSFERENCIA:", error);
    res.status(500).json({ message: "Error en transferencia" });
  }
});

// =========================
// 5. LOGIN (SIN BCRYPT)
// =========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Faltan datos" });

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(400).json({ error: "Usuario no encontrado" });

    const user = rows[0];

    // Contraseña en texto plano (como tu BD actual)
    if (user.password !== password)
      return res.status(400).json({ error: "Contraseña incorrecta" });

    res.json({
      message: "Login correcto",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en servidor" });
  }
});

// =========================
// 6. REGISTER (SIN BCRYPT)
// =========================
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Faltan datos" });

  try {
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existing.length > 0)
      return res.status(400).json({ message: "El email ya está registrado" });

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, created_at, balance) VALUES (?, ?, ?, NOW(), 0)",
      [name, email, password],
    );

    await pool.query(
      "INSERT INTO wallets (user_id, balance, currency, last_update) VALUES (?, 0, 'USD', NOW())",
      [result.insertId],
    );

    res.json({
      message: "Usuario registrado correctamente",
      user: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("🔥 ERROR EN REGISTER:", error);
    res.status(500).json({ message: "Error en registro" });
  }
});

module.exports = router;
