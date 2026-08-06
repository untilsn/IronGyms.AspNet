import { forwardRef } from "react";
import { Link } from "react-router-dom";

const VARIANT_CLASS = {
  primary: "btn-primary border-none",
  secondary: "btn-secondary",
  accent: "btn-accent",
  neutral: "btn-neutral",
  ghost: "btn-ghost",
  outline:
    "bg-transparent border border-base-content/15 text-base-content hover:border-base-content/30 hover:bg-base-content/1",
  error: "btn-error",
};

const SIZE_CLASS = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = "",
    disabled,
    children,
    to,
    ...props
  },
  ref,
) {
  const classes = `btn !rounded-none font-display font-semibold uppercase tracking-wide transition-all duration-250 hover:scale-[1.03] active:scale-[0.97] ${
    VARIANT_CLASS[variant] ?? ""
  } ${SIZE_CLASS[size] ?? ""} ${fullWidth ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
