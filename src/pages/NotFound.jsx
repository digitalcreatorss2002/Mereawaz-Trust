import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-32 text-center">
      <h1 className="font-display text-5xl font-bold text-primary">404</h1>
      <p className="mt-3 text-muted">This page doesn't exist.</p>
      <Link to="/" className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-white">Back Home</Link>
    </div>
  )
}
