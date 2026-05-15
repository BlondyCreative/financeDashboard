import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./validate/login";
import Register from "./validate/register"; // Importante importar tu componente de registro
import "./index.css";
import TransactionPanel from "./transfer";
import Dashboard from "./dashboard";
import Deposit from "./deposit";
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/login" element={<Login />} />
        <Route path="/transfer" element={<TransactionPanel />} />

        <Route path="/deposit" element={<Deposit />} />

        {/* 3. Ruta de Registro (Esto arregla tu problema de redirección) */}
        <Route path="/register" element={<Register />} />

        {/* 4. Ruta del Dashboard (App.jsx) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 5. Ruta para manejar errores 404 (Opcional) */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
