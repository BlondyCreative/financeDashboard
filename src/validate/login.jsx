import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("info.madhu786@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación básica antes de enviar
    if (!email || !password) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Muestra el mensaje de error que configuramos en el backend (auth.js)
        alert(data.error || "Error al iniciar sesión");
        return;
      }

      // --- PASO CLAVE: Guardado de datos dinámicos ---
      // Limpiamos cualquier rastro de sesiones anteriores
      localStorage.removeItem("user");

      // Guardamos el objeto 'user' que viene del backend (contiene id, name y email)
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        }),
      );

      console.log("Login exitoso, usuario guardado:", data.user);

      // Redireccionamos al Dashboard usando window.location para forzar la carga limpia
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      alert(
        "No se pudo conectar con el servidor. Revisa si el backend en el puerto 5001 está corriendo.",
      );
    }
  };

  return (
    <div className="login-page">
      <div className="hero-section">
        <div className="logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">NextPay</span>
        </div>

        <div className="hero-text">
          <h1>Find your sweet home</h1>
          <p>Schedule visits in just a few clicks</p>
        </div>

        <img
          src="https://picsum.photos/id/1015/2000/1200"
          alt="Hero"
          className="hero-image"
        />
      </div>

      <div className="form-section">
        <div className="form-container">
          <button className="sign-in-top" onClick={() => navigate("/register")}>
            Sign Up
          </button>

          <h2>Welcome Back!</h2>
          <p className="subtitle">Sign in your account</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Your Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>

              <a href="#" className="forgot">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
