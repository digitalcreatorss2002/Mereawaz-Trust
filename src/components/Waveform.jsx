// Signature motif: "Meri Awaz" means "My Voice" — a row of animated
// waveform bars stands in for the many rural voices the Trust amplifies.
// Used as a hero accent and section divider across the site.
export default function Waveform({ className = '', bars = 24, tone = 'accent' })  {
  const color = tone === 'accent' ? 'bg-accent' : tone === 'leaf' ? 'bg-leaf' : 'bg-primary'
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${color} animate-wave`}
          style={{
            height: `${8 + ((i * 37) % 22)}px`,
            animationDelay: `${(i % 8) * 0.09}s`,
          }}
        />
      ))}
    </div>
  )
}
