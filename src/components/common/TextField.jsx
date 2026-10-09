import { forwardRef } from "react";
import "./TextField.css";

/**
 * Campo de texto controlado via react-hook-form (usa forwardRef para o
 * register funcionar). Exibe mensagem de erro abaixo do campo quando houver.
 */
const TextField = forwardRef(
  ({ label, id, error, type = "text", ...rest }, ref) => {
    return (
      <div className="text-field">
        <label htmlFor={id} className="text-field__label">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          className={`text-field__input ${error ? "text-field__input--error" : ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {error && (
          <span id={`${id}-error`} className="text-field__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
