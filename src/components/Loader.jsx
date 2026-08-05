export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-accent" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
