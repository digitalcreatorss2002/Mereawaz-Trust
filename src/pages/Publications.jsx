import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaFilePdf, FaDownload, FaCalendarAlt, FaSearch, FaFolderOpen, FaArrowRight, FaShieldAlt } from 'react-icons/fa'
import PageHeader from '../components/PageHeader.jsx'
import Loader from '../components/Loader.jsx'
import { api, extractData } from '../api.js'

const CATEGORIES = [
  {
    id: 'reports',
    label: 'Reports',
    fullName: 'Annual Reports & Audits',
    desc: 'Audited financial statements, governance filings, and yearly social impact assessments.',
  },
  {
    id: 'case_studies',
    label: 'Case Studies',
    fullName: 'Field Research & Case Studies',
    desc: 'Detailed ground reports and analytical studies from our operational villages.',
  },
  {
    id: 'our_publications',
    label: 'Our Publications',
    fullName: 'Our Publications & Books',
    desc: 'Community training handbooks, awareness literature, and guides.',
  },
  {
    id: 'legal_documents',
    label: 'Legal Documents',
    fullName: 'Legal & Statutory Registrations',
    desc: 'Trust Deed registration, 80G tax exemption certificates, and FCRA filings.',
  },
]

export default function Publications() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState('reports')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    api
      .get('/publications.php')
      .then((res) => {
        setItems(extractData(res))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const currentCategoryMeta = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0]
  }, [activeCategory])

  // Filter items by category and search
  const filteredItems = useMemo(() => {
    return items.filter((doc) => {
      // Category match
      const docCat = (doc.category || '').toLowerCase().replace(/[\s-]/g, '_')
      const matchesCat = docCat === activeCategory

      // Search match
      if (!searchQuery.trim()) return matchesCat

      const q = searchQuery.toLowerCase()
      const titleMatch = (doc.title || '').toLowerCase().includes(q)
      const descMatch = (doc.description || '').toLowerCase().includes(q)
      return matchesCat && (titleMatch || descMatch)
    })
  }, [items, activeCategory, searchQuery])

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = {}
    CATEGORIES.forEach((c) => (counts[c.id] = 0))
    items.forEach((doc) => {
      const docCat = (doc.category || '').toLowerCase().replace(/[\s-]/g, '_')
      if (counts[docCat] !== undefined) {
        counts[docCat]++
      }
    })
    return counts
  }, [items])

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Header Banner */}
      <PageHeader
        eyebrow="TRANSPARENCY & RESEARCH"
        title="Publications & Resources"
        subtitle="Explore our reports, case studies, legal documents, and books showcasing our impact-driven work."
        bgImage="/hero-banner.jpg"
      />

      <section className="py-12 sm:py-16">
        <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: CATEGORY LIST */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-3xl bg-white p-6 border border-stone-200/90 shadow-sm space-y-4">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="font-display text-sm font-black uppercase tracking-wider text-stone-500">
                      Resources
                    </h3>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = activeCategory === cat.id
                      const count = categoryCounts[cat.id] || 0
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveCategory(cat.id)}
                          className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 text-left ${
                            isSelected
                              ? 'bg-[#13382C] text-white shadow-md translate-x-1'
                              : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/60'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
                                isSelected
                                  ? 'bg-[#F7D046] text-[#13382C]'
                                  : 'bg-stone-200 text-stone-600'
                              }`}
                            >
                              {count}
                            </span>
                            {isSelected && <FaArrowRight className="text-xs text-[#F7D046]" />}
                          </div>
                        </button>
                      )
                    })}
                  </nav>

                  {/* Trust & Transparency Note */}
                  <div className="pt-4 border-t border-stone-100 flex items-start gap-2.5 text-xs text-stone-500">
                    <FaShieldAlt className="text-[#13382C] mt-0.5 shrink-0 text-sm" />
                    <span>All disclosures and audited reports are verified under Indian NGO Darpan standards.</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT MAIN CONTENT: DOCUMENTS LIST */}
            <main className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* Category Header with Search */}
              <div className="rounded-3xl bg-white p-6 border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-black text-[#13382C]">
                    {currentCategoryMeta.fullName}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
                    {currentCategoryMeta.desc}
                  </p>
                </div>

                {/* Quick Search */}
                <div className="relative w-full md:w-64 shrink-0">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full bg-stone-50 border border-stone-200 py-2 pl-9 pr-3 text-xs font-medium text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13382C]/20"
                  />
                </div>
              </div>

              {/* LOADING STATE */}
              {loading && (
                <div className="rounded-3xl bg-white p-12 border border-stone-200 text-center">
                  <Loader label="Loading publications &amp; resources..." />
                </div>
              )}

              {/* ERROR STATE */}
              {!loading && error && (
                <div className="rounded-3xl bg-red-50 p-8 border border-red-200 text-center text-red-700">
                  <p className="font-bold">Failed to load publications. Please refresh or try again shortly.</p>
                </div>
              )}

              {/* EMPTY STATE (Matching screenshot reference) */}
              {!loading && !error && filteredItems.length === 0 && (
                <div className="rounded-3xl bg-white p-12 sm:p-20 border-2 border-dashed border-stone-200 text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-50 text-stone-400 text-xl">
                    <FaFolderOpen />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-stone-600">
                    No {currentCategoryMeta.label.toLowerCase()} available.
                  </h3>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    New documents and public filings are uploaded regularly. Please check back soon or reach out directly to our team.
                  </p>
                </div>
              )}

              {/* DOCUMENTS LIST */}
              {!loading && !error && filteredItems.length > 0 && (
                <div className="space-y-4">
                  {filteredItems.map((doc) => {
                    const hasThumb = Boolean(doc.thumbnail_url)
                    const publishDateFormatted = doc.publish_date
                      ? new Date(doc.publish_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : null

                    return (
                      <div
                        key={doc.id}
                        className="group rounded-3xl bg-white p-5 sm:p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                      >
                        {/* Left Document Icon / Thumbnail */}
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {hasThumb ? (
                            <img
                              src={doc.thumbnail_url}
                              alt={doc.title}
                              className="h-16 w-12 rounded-xl object-cover shadow-sm border border-stone-200 shrink-0"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="h-16 w-14 rounded-2xl bg-red-50 border border-red-100 flex flex-col items-center justify-center text-red-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                              <FaFilePdf className="text-2xl mb-0.5" />
                              <span className="text-[9px] font-black uppercase tracking-wider">DOC</span>
                            </div>
                          )}

                          {/* Info */}
                          <div className="space-y-1.5 min-w-0">
                            <h3 className="font-display text-base sm:text-lg font-black text-[#13382C] group-hover:text-amber-700 transition-colors leading-snug">
                              {doc.title}
                            </h3>

                            {doc.description && (
                              <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                                {doc.description}
                              </p>
                            )}

                            {/* Meta Tags */}
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              {publishDateFormatted && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500">
                                  <FaCalendarAlt className="text-stone-400 text-[10px]" />
                                  <span>{publishDateFormatted}</span>
                                </span>
                              )}

                              <span className="h-1 w-1 rounded-full bg-stone-300"></span>

                              <span className="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                                {doc.file_size || 'PDF Document'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Download Button */}
                        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 flex items-center justify-end">
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#13382C] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#F7D046] hover:text-[#13382C] transition-all duration-200 shadow-sm hover:shadow"
                          >
                            <FaDownload className="text-xs" />
                            <span>Download PDF</span>
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

            </main>

          </div>

        </div>
      </section>
    </div>
  )
}
