"use client"

import Link from "next/link";
import "./loginpage.css";
import { useState } from "react";
import { loginUser, saveToken } from "@/services/auth";
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      saveToken(token);
      router.push("/eventos/explorar");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="my-5">
        <h1 className="fw-bold">Login</h1>
        <p className="fs-4">Bem vindo de volta!</p>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="row row-cols-1 px-4 gap-4">
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <div className="col d-flex justify-content-end">
            <a className="fw-bold esqueceu-senha">Esqueceu a senha?</a>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-entrar fw-semibold py-2 mt-4">
              Entrar
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <div className="registro-text fs-5">
            Ainda não possui conta?{" "}
            <Link className="esqueceu-senha fw-bold" href="/registro">
              Registre-se
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
