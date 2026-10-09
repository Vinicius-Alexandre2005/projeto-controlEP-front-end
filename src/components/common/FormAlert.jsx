import "./FormAlert.css";

/**
 * Mensagem de erro (ou sucesso) exibida no topo do formulário,
 * usada para erros vindos da API (ex.: credenciais inválidas).
 */
export default function FormAlert({ message, type = "error" }) {
  if (!message) return null;

  return (
    <div className={`form-alert form-alert--${type}`} role="alert">
      {message}
    </div>
  );
}
