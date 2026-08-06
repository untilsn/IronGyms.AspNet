export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-box border border-dashed border-base-300 px-6 py-16 text-center">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-base-content/40">
          <Icon size={28} />
        </div>
      )}
      <div>
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-base-content">
          {title}
        </h3>
        {description && (
          <p className="mt-1 max-w-sm text-sm text-base-content/50">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
