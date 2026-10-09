import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Tabs from "../common/Tabs";
import LoginForm from "../../pages/Login/LoginForm";
import RegisterForm from "../../pages/Register/RegisterForm";

const TABS = [
  { id: "login", label: "Entrar" },
  { id: "register", label: "Criar conta" },
];

export default function AuthModal({ open, initialTab = "login", onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (open) setActiveTab(initialTab);
  }, [open, initialTab]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={activeTab === "login" ? "Entrar no Control EP" : "Criar sua conta"}
      size="sm"
    >
      <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

      {activeTab === "login" ? (
        <LoginForm onSuccess={onSuccess} />
      ) : (
        <RegisterForm onSuccess={onSuccess} />
      )}
    </Modal>
  );
}
