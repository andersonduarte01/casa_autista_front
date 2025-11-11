// src/paginas/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./auth";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      setUser(user);
      navigate(user.painel_url); // redireciona para o painel correto
    } catch (err: any) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow rounded"
        style={{ width: "300px" }}
      >
        <h4 className="mb-3 text-center">Login</h4>
        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}
