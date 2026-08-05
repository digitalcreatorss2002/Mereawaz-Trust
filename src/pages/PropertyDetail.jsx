import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaMapMarkerAlt, FaShareAlt, FaHeart, FaCheckCircle } from 'react-icons/fa'
import Loader from '../components/Loader.jsx'
import { api, getImageUrl } from '../api.js'
import PropertiesSection from '../components/PropertiesSection.jsx'

const fallbackBenefits = [
  { icon: '🌱', title: 'Sustainable Livelihoods', desc: 'Provides training and equipment that create long-term financial independence.' },
  { icon: '🤝', title: '100% Community Led', desc: 'Designed in close collaboration with local village leaders and self-help groups.' },
  { icon: '⚡', title: 'Clean Tech Integration', desc: 'Utilizes solar power, biogas, and precision agricultural tools to maximize efficiency.' },
  { icon: '📈', title: 'Measurable Impact', desc: 'Rigorous tracking to ensure every donor rupee directly touches beneficiary lives.' },
]

export default function PropertyDetail() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const [related, setRelated] = useState([])
  const [status, setStatus] = useState('loading')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setStatus('loading')
    api
      .get(`/properties.php?slug=${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res?.data) return setStatus('notfound')
        setItem(res.data)
        setStatus('done')
      })
      .catch(() => setStatus('error'))

    api
      .get('/properties.php')
      .then((res) => {
        setRelated((res?.data || []).filter((p) => p.slug !== slug).slice(0, 3))
      })
      .catch(() => {})
  }, [slug])

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (status === 'loading') return <Loader label="Loading program details..." />
  if (status === 'notfound' || status === 'error') {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-gray-500 font-medium">We couldn't find that program.</p>
        <Link to="/properties" className="mt-4 inline-block text-[var(--button-bg-color)] underline font-bold">Back to All Programs</Link>
      </div>
    )
  }

  const parsedBenefits = item.benefits
    ? item.benefits.split('\n').filter(Boolean).map((line, idx) => {
        const parts = line.split(':')
        return {
          icon: ['🌱', '🤝', '⚡', '📈', '💡', '🛡️'][idx % 6],
          title: parts[0]?.trim() || `Benefit #${idx + 1}`,
          desc: parts[1]?.trim() || line,
        }
      })
    : fallbackBenefits

  return (
    <article className="py-16 bg-[#FAF8F4]">
      <div className="container-page max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/properties" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--button-bg-color)] hover:underline">
            <FaArrowLeft /> Back to All Programs
          </Link>
          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm hover:border-gray-300 transition-colors"
          >
            <FaShareAlt className="text-gray-400" />
            <span>{copied ? '✓ Link Copied!' : 'Share Program'}</span>
          </button>
        </div>

        {item.category && (
          <span className="inline-block rounded-full bg-[var(--secondary-light)] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[var(--button-bg-color)] mb-3">
            {item.category}
          </span>
        )}

        <h1 className="font-display text-3xl font-extrabold sm:text-5xl text-gray-900 leading-tight mb-2">
          {item.title}
        </h1>

        {item.location && (
          <p className="text-sm font-semibold text-gray-600 mb-6 flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-red-500" />
            <span>Location: {item.location}</span>
          </p>
        )}

        {item.image_url && (
          <div className="mb-8 overflow-hidden rounded-3xl border border-gray-100 shadow-aasha-lg">
            <img
              src={getImageUrl(item.image_url)}
              alt={item.title}
              className="h-80 sm:h-[480px] w-full object-cover"
            />
          </div>
        )}

        {item.summary && (
          <div className="mb-8 rounded-3xl border-l-4 border-[var(--button-bg-color)] bg-white p-6 sm:p-8 shadow-aasha">
            <h3 className="font-display font-bold text-gray-900 text-base mb-1">Program Overview</h3>
            <p className="text-base text-gray-700 leading-relaxed font-normal">{item.summary}</p>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="mb-8 rounded-3xl bg-[var(--secondary-light)]/50 p-6 sm:p-8 border border-[var(--primary-color)]">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-[var(--button-bg-color)]" />
            <span>Key Benefits &amp; Community Impact</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {parsedBenefits.map((b, i) => (
              <div key={i} className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
                <span className="text-2xl mb-2 block">{b.icon}</span>
                <h3 className="font-display font-bold text-sm text-gray-900 mb-1">{b.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Content */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-gray-100 shadow-aasha-lg">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">
            Full Program Description
          </h2>
          <div className="prose max-w-none whitespace-pre-line leading-relaxed text-gray-800 text-base sm:text-lg font-normal">
            {item.description || item.summary}
          </div>
        </div>

        {/* Donation CTA */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-[var(--button-bg-color)] to-[#3d601b] p-8 sm:p-10 text-center text-white shadow-aasha-lg">
          <h3 className="font-display text-2xl font-extrabold sm:text-3xl text-white">Support This Rural Program</h3>
          <p className="mt-2 text-sm text-white/90 max-w-lg mx-auto">
            Your contribution helps expand this initiative to reach more families across remote Indian villages.
          </p>
          <Link
            to="/donate"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[var(--button-bg-color)] shadow-md hover:scale-105 transition-transform"
          >
            <FaHeart className="text-pink-600" />
            <span>Donate via UPI (80G Tax Exemption)</span>
          </Link>
        </div>

        {/* Related Programs using original design card */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#13382C] mb-6">
              Explore Other Programs
            </h3>
            <PropertiesSection
              programs={related}
              showHeading={false}
              isGrid={true}
              className="py-2"
            />
          </div>
        )}
      </div>
    </article>
  )
}
