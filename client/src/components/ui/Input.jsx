import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className = "",
    id,
    ...props
  },
  ref,
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
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
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
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40">
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <p className="mt-1 text-xs text-error">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-base-content/50">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Input;
