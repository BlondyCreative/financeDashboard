import React, { useState } from "react";
import "../../src/login.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/login";
    } catch (err) {
      console.error("Registration error:", err);
      alert(
        "Cannot connect to server. Make sure backend is running on port 5001",
      );
    }
  };

  return (
    <div className="login-page">
      {/* LADO IZQUIERDO: IMAGEN */}
      <div className="hero-section">
        <div className="logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">Realnest</span>
        </div>

        <div className="hero-text">
          <h1>Find your sweet home</h1>
          <p>Schedule visits in just a few clicks</p>
        </div>

        <img
          src="https://picsum.photos/id/1015/1200/800"
          alt="Hero"
          className="hero-image"
        />
      </div>

      {/* LADO DERECHO: FORMULARIO */}
      <div className="form-section">
        <div className="form-container">
          <button className="sign-in-top" onClick={() => navigate("/login")}>
            Sign In
          </button>

          <h2>Join Realnest!</h2>
          <p className="subtitle">Create your account</p>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="input-group">
              <label>Your Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                I agree to the terms
              </label>
            </div>

            <button type="submit" className="login-btn">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
