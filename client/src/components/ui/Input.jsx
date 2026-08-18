import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, helperText, leftIcon, rightIcon, className = "", id, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={inputId} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="text-base-content/40 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`input input-bordered w-full ${error ? "input-error" : ""} ${
            leftIcon ? "pl-10" : ""
          } ${rightIcon ? "pr-10" : ""} ${className}`}
          {...props}
        />
        {rightIcon && (
          <span className="text-base-content/40 absolute top-1/2 right-3 -translate-y-1/2">
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <p className="text-error mt-1 text-xs">{error}</p>
      ) : helperText ? (
        <p className="text-base-content/50 mt-1 text-xs">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Input;
