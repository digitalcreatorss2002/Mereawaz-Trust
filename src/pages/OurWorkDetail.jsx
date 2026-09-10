import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaMapMarkerAlt, FaShareAlt, FaHeart, FaUsers, FaCalendarAlt, FaCheckCircle, FaLayerGroup } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import Loader from '../components/Loader.jsx'
import { api, getImageUrl, extractData } from '../api.js'

export default function OurWorkDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [related, setRelated] = useState([])
  const [status, setStatus] = useState('loading')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setStatus('loading')
    window.scrollTo(0, 0)

    api
      .get(`/projects.php?slug=${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res?.data) return setStatus('notfound')
        setProject(res.data)
        setStatus('done')
      })
      .catch(() => setStatus('error'))

    api
      .get('/projects.php')
      .then((res) => {
        const all = extractData(res)
        setRelated(all.filter((p) => p.slug !== slug).slice(0, 2))
      })
      .catch(() => {})
  }, [slug])

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (status === 'loading') return <Loader label="Loading project details..." />
  if (status === 'notfound' || status === 'error' || !project) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-stone-500 font-medium text-lg">We couldn't find that field initiative.</p>
        <Link to="/our-work" className="mt-4 inline-block text-[var(--button-bg-color)] underline font-bold">
          ← Back to Our Work
        </Link>
      </div>
    )
  }

  const isActive = project.is_active !== undefined ? (Boolean(project.is_active) && project.is_active !== '0' && project.is_active !== 0) : true
  const projectPhase = (project.project_status || 'ongoing').toLowerCase()
  const sectorName = project.sector || 'WASH'
  const locationStr = project.locations || 'Multiple Field Hamlets, India'
  const imgSrc = getImageUrl(project.image_url) || '/about-banner.jpg'

  return (
    <article className="py-12 sm:py-16 bg-[#FAF8F4] min-h-screen">
      <div className="container-page max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Back & Share Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/our-work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--button-bg-color)] hover:underline"
          >
            <FaArrowLeft /> Back to Our Work
          </Link>
          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold text-stone-700 shadow-sm hover:border-stone-300 transition-colors"
          >
            <FaShareAlt className="text-stone-400" />
            <span>{copied ? '✓ Link Copied!' : 'Share Project'}</span>
          </button>
        </div>

        {/* Badges Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="inline-block rounded-full bg-[#F7D046] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#13382C] shadow-sm">
            {sectorName}
          </span>

          {isActive ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Active Intervention</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-stone-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <span>{projectPhase === 'completed' ? 'Completed' : projectPhase === 'planned' ? 'Planned' : 'Inactive'}</span>
            </span>
          )}

          <span className="inline-block rounded-full bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 text-xs font-bold capitalize">
            {projectPhase} Phase
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl font-extrabold sm:text-5xl text-[#13382C] leading-tight mb-6">
          {project.title}
        </h1>

        {/* Key Metrics / Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="rounded-2xl bg-white p-4 border border-stone-200 shadow-sm">
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 mb-1">
              <FaMapMarkerAlt className="text-red-500" /> Locations
            </span>
            <p className="font-bold text-xs text-stone-800 line-clamp-2">{locationStr}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-stone-200 shadow-sm">
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 mb-1">
              <FaUsers className="text-emerald-500" /> Beneficiaries
            </span>
            <p className="font-bold text-xs text-stone-800">{project.beneficiaries || 'Rural Communities'}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-stone-200 shadow-sm">
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 mb-1">
              <FaLayerGroup className="text-amber-500" /> Sector
            </span>
            <p className="font-bold text-xs text-stone-800">{sectorName}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-stone-200 shadow-sm">
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 mb-1">
              <FaCalendarAlt className="text-blue-500" /> Timeline
            </span>
            <p className="font-bold text-xs text-stone-800">{project.start_date || '2023 - Present'}</p>
          </div>
        </div>

        {/* Featured Image */}
        {imgSrc && (
          <div className="mb-8 overflow-hidden rounded-3xl border border-stone-200 shadow-lg">
            <img
              src={imgSrc}
              alt={project.title}
              className="h-80 sm:h-[480px] w-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/about-banner.jpg'
              }}
            />
          </div>
        )}

        {/* Project Summary Callout */}
        {project.summary && (
          <div className="mb-8 rounded-3xl border-l-4 border-[#13382C] bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="font-display font-black text-[#13382C] text-base mb-2 flex items-center gap-2">
              <FaCheckCircle className="text-amber-500" />
              <span>Executive Project Overview</span>
            </h3>
            <p className="text-base text-stone-700 leading-relaxed font-normal">{project.summary}</p>
          </div>
        )}

        {/* Full Detailed Description */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-stone-200 shadow-sm space-y-6">
          <h2 className="font-display text-2xl font-black text-[#13382C] border-b border-stone-100 pb-3">
            Intervention Scope &amp; Field Impact
          </h2>
          <div className="prose max-w-none whitespace-pre-line leading-relaxed text-stone-700 text-base sm:text-lg font-normal">
            {project.description || project.summary}
          </div>
        </div>

        {/* Support This Project Callout */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#13382C] to-[#1e5241] p-8 sm:p-10 text-center text-white shadow-xl">
          <h3 className="font-display text-2xl font-extrabold sm:text-3xl text-[#F7D046]">
            Support This Field Intervention
          </h3>
          <p className="mt-2 text-sm text-white/90 max-w-lg mx-auto">
            Your generous contributions directly support equipment, material procurement, and grassroots execution for {project.title}.
          </p>
          <Link
            to="/donate"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F7D046] px-8 py-3.5 text-sm font-black text-[#13382C] shadow-md hover:scale-105 transition-transform"
          >
            <FaHeart className="text-red-700" />
            <span>Donate via UPI (80G Tax Exemption)</span>
          </Link>
        </div>

        {/* Other Related Projects */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-extrabold text-[#13382C]">
                Explore Other Initiatives
              </h3>
              <Link to="/our-work" className="text-xs font-bold text-[#13382C] hover:underline flex items-center gap-1">
                <span>View All Our Work</span>
                <FiArrowUpRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/our-work/${rp.slug}`}
                  className="group rounded-3xl bg-white p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
                >
                  <img
                    src={getImageUrl(rp.image_url) || '/about-banner.jpg'}
                    alt={rp.title}
                    className="h-20 w-24 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase text-amber-600">{rp.sector || 'Project'}</span>
                    <h4 className="font-display font-bold text-sm text-[#13382C] group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                      {rp.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">{rp.locations}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  )
}
