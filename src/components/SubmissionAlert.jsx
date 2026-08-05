import { useEffect } from 'react'

export default function SubmissionAlert({ message = 'Data is submitted successfully!', onClose }) {
  useEffect(() => {
    // Also trigger native browser alert for instant user feedback
    window.alert(`✅ ${message}`)
  }, [message])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl border border-accent/40 animate-fadeUp">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-leaf">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-primary">Submission Received</h3>
        <p className="mt-2 text-sm text-ink/80">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-accent py-3 font-bold text-primary-dark shadow-card transition hover:bg-accent-light"
        >
          OK, Continue
        </button>
      </div>
    </div>
  )
}
