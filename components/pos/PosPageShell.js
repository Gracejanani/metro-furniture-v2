export default function PosPageShell({ title, description, children, action }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-sm text-body">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
