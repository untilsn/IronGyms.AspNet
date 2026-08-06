const SIZE_CLASS = {
  xs: "loading-xs",
  sm: "loading-sm",
  md: "loading-md",
  lg: "loading-lg",
};

export default function Spinner({
  size = "md",
  className = "",
  fullScreen = false,
}) {
  const spinner = (
    <span
      className={`loading loading-spinner ${SIZE_CLASS[size]} text-primary ${className}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100">
        {spinner}
      </div>
    );
  }

  return spinner;
}
