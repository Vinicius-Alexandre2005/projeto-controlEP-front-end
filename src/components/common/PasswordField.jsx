import { forwardRef, useState } from "react";
import "./TextField.css";

const PasswordField = forwardRef(({ label, id, error, ...rest }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="text-field">
      <label htmlFor={id} className="text-field__label">
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          ref={ref}
          type={visible ? "text" : "password"}
          className={`text-field__input ${error ? "text-field__input--error" : ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{ width: "100%", boxSizing: "border-box", paddingRight: 60 }}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--color-primary)",
          }}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
      {error && (
        <span id={`${id}-error`} className="text-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

PasswordField.displayName = "PasswordField";

export default PasswordField;
