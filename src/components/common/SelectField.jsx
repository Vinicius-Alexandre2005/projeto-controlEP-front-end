import { forwardRef } from "react";
import "./TextField.css";

const SelectField = forwardRef(({ label, id, error, children, ...rest }, ref) => {
  return (
    <div className="text-field">
      {label && (
        <label htmlFor={id} className="text-field__label">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`text-field__input ${error ? "text-field__input--error" : ""}`}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <span className="text-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

SelectField.displayName = "SelectField";

export default SelectField;
