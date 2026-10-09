import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthModal from "../../components/auth/AuthModal";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  function openAuth(tab) {
    setAuthTab(tab);
    setAuthOpen(true);
  }

  function handleAuthSuccess() {
    setAuthOpen(false);
    navigate("/painel");
  }

  return (
    <div className="landing">
      <header className="landing__header">
        <span className="landing__brand">
          Control <span className="landing__brand-accent">EP</span>
        </span>
        <button type="button" className="landing__cta-header" onClick={() => openAuth("login")}>
          Entrar / Criar conta
        </button>
      </header>

      <main className="landing__hero">
        <h1 className="landing__title">Bem-vindo ao Control EP</h1>
        <p className="landing__subtitle">
          Controle de presença de funcionários e disponibilidade de equipamentos, tudo em um só
          lugar.
        </p>
        <button type="button" className="landing__cta" onClick={() => openAuth("login")}>
          Entrar / Criar conta
        </button>
      </main>

      <AuthModal
        open={authOpen}
        initialTab={authTab}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
