import "./Badge.css";

const TONE_BY_STATUS = {
  ativo: "success",
  disponível: "success",
  aprovado: "success",
  inativo: "neutral",
  pendente: "warning",
  "em uso": "warning",
  rejeitado: "error",
  inativo_erro: "error",
};

export default function Badge({ children, tone }) {
  const resolvedTone = tone || TONE_BY_STATUS[String(children).toLowerCase()] || "neutral";
  return <span className={`badge badge--${resolvedTone}`}>{children}</span>;
}
