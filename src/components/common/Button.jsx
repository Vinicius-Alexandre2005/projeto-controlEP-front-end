import "./Button.css";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`app-button app-button--${variant}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Aguarde..." : children}
    </button>
  );
}
