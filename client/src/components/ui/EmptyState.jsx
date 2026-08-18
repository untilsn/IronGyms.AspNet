export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-box border-base-300 flex flex-col items-center justify-center gap-3 border border-dashed px-6 py-16 text-center">
      {Icon && (
        <div className="bg-base-200 text-base-content/40 flex h-14 w-14 items-center justify-center rounded-full">
          <Icon size={28} />
        </div>
      )}
      <div>
        <h3 className="font-display text-base-content text-lg font-semibold tracking-wide uppercase">
          {title}
        </h3>
        {description && <p className="text-base-content/50 mt-1 max-w-sm text-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}
