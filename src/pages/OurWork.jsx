import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaFilter, FaSearch, FaTimes, FaCheck, FaHandsHelping } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import PageHeader from '../components/PageHeader.jsx'
import Loader from '../components/Loader.jsx'
import { api, extractData, getImageUrl } from '../api.js'

const STATUS_FILTERS = [
  { id: 'all', label: 'All Status' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
  { id: 'planned', label: 'Planned' },
]

const DEFAULT_SECTORS = [
  'All Sectors',
  'WASH',
  'Health',
  'Education',
  'Environment',
  'Livelihood',
  'Agriculture',
]

export default function OurWork() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Filters state
  const [statusFilter, setStatusFilter] = useState('all')
  const [sectorFilter, setSectorFilter] = useState('All Sectors')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .get('/properties.php')
      .then((res) => {
        setItems(extractData(res))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  // Strip HTML utility
  const formatText = (str) => {
    if (!str) return ''
    return str.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  }

  // Extract all sectors dynamically combined with defaults
  const sectorOptions = useMemo(() => {
    const list = new Set(DEFAULT_SECTORS)
    items.forEach((p) => {
      if (p.category) {
        list.add(p.category.trim())
      }
    })
    return Array.from(list)
  }, [items])

  // Filtered initiatives
  const filteredItems = useMemo(() => {
    return items.filter((p) => {
      // 1. Status Filter
      const phase = (p.project_status || 'ongoing').toLowerCase()
      if (statusFilter !== 'all' && phase !== statusFilter.toLowerCase()) {
        return false
      }

      // 2. Sector Filter
      if (sectorFilter !== 'All Sectors') {
        const cat = (p.category || '').toLowerCase()
        if (cat !== sectorFilter.toLowerCase()) {
          return false
        }
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const titleMatch = (p.title || '').toLowerCase().includes(q)
        const locationMatch = (p.location || '').toLowerCase().includes(q)
        const summaryMatch = (p.summary || '').toLowerCase().includes(q)
        const categoryMatch = (p.category || '').toLowerCase().includes(q)
        if (!titleMatch && !locationMatch && !summaryMatch && !categoryMatch) {
          return false
        }
      }

      return true
    })
  }, [items, statusFilter, sectorFilter, searchQuery])

  const hasActiveFilters = statusFilter !== 'all' || sectorFilter !== 'All Sectors' || searchQuery.trim() !== ''

  const clearFilters = () => {
    setStatusFilter('all')
    setSectorFilter('All Sectors')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Header Banner */}
      <PageHeader
        eyebrow="OUR ACTIONS & INITIATIVES"
        title="Our Work & Impact"
        subtitle="Discover our active interventions and on-ground activities across various geographies."
        bgImage="/about-banner.jpg"
      />

      <section className="py-12 sm:py-16">
        <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white border border-stone-300 px-5 py-3 text-sm font-bold text-[#13382C] shadow-sm active:scale-95 transition-transform"
            >
              <FaFilter className="text-amber-500" />
              <span>{mobileFilterOpen ? 'Hide Filters' : 'Filter Initiatives'}</span>
              {hasActiveFilters && (
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              )}
            </button>

            <span className="text-xs font-semibold text-stone-500">
              Showing {filteredItems.length} of {items.length}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: FILTERS */}
            <aside
              className={`lg:col-span-4 xl:col-span-3 space-y-6 ${
                mobileFilterOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="sticky top-28 space-y-6">
                
                {/* Filter Box Container */}
                <div className="rounded-3xl bg-white p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <h3 className="font-display text-lg font-black tracking-tight text-[#13382C] flex items-center gap-2">
                      <FaFilter className="text-[#F7D046] text-sm" />
                      <span>Filter Initiatives</span>
                    </h3>

                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 underline flex items-center gap-1"
                      >
                        <FaTimes className="text-[10px]" /> Clear
                      </button>
                    )}
                  </div>

                  {/* PROJECT STATUS GROUP */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-stone-500 mb-3">
                      Project Status
                    </label>
                    <div className="flex flex-col gap-2">
                      {STATUS_FILTERS.map((s) => {
                        const isSelected = statusFilter === s.id
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setStatusFilter(s.id)}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 text-left ${
                              isSelected
                                ? 'bg-[#13382C] text-white shadow-md -translate-y-0.5'
                                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/60'
                            }`}
                          >
                            <span>{s.label}</span>
                            {isSelected && <FaCheck className="text-[#F7D046] text-xs" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* SECTORS GROUP */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-stone-500 mb-3">
                      Sectors &amp; Domains
                    </label>
                    <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto pr-1">
                      {sectorOptions.map((sec) => {
                        const isSelected = sectorFilter.toLowerCase() === sec.toLowerCase()
                        return (
                          <button
                            key={sec}
                            type="button"
                            onClick={() => setSectorFilter(sec)}
                            className={`flex items-center justify-between px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 text-left ${
                              isSelected
                                ? 'bg-[#13382C] text-white shadow-sm'
                                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                            }`}
                          >
                            <span className="truncate">{sec}</span>
                            {isSelected && <span className="h-2 w-2 rounded-full bg-[#F7D046]"></span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick Donation Prompt */}
                  <div className="pt-2 border-t border-stone-100">
                    <div className="rounded-2xl bg-gradient-to-br from-[#13382C] to-[#1c4d3d] p-4 text-white">
                      <h4 className="font-display font-extrabold text-sm mb-1 text-[#F7D046]">Support Our Cause</h4>
                      <p className="text-[11px] text-white/80 leading-relaxed mb-3">
                        Every contribution powers real-world social initiatives across India.
                      </p>
                      <Link
                        to="/donate"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F7D046] py-2 text-xs font-bold text-[#13382C] shadow hover:bg-amber-400 transition-colors"
                      >
                        <span>Donate via UPI (80G)</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </aside>

            {/* RIGHT MAIN CONTENT AREA */}
            <main className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* Top Controls Bar */}
              <div className="rounded-3xl bg-white p-4 sm:p-5 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Search Box */}
                <div className="relative w-full sm:max-w-md">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
                  <input
                    type="text"
                    placeholder="Search by initiative title, sector, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full bg-stone-50 border border-stone-200 py-2.5 pl-10 pr-10 text-xs font-medium text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13382C]/20"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  )}
                </div>

                {/* Counter & Clear Badges */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
                  <span className="font-extrabold text-stone-500">
                    Showing <strong className="text-[#13382C]">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'initiative' : 'initiatives'}
                  </span>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-1 rounded-full bg-stone-100 hover:bg-stone-200 px-3 py-1 font-bold text-stone-700 transition-colors"
                    >
                      <span>Reset</span>
                    </button>
                  )}
                </div>

              </div>

              {/* LOADING STATE */}
              {loading && (
                <div className="rounded-3xl bg-white p-12 border border-stone-200 text-center">
                  <Loader label="Loading active initiatives & field sites..." />
                </div>
              )}

              {/* ERROR STATE */}
              {!loading && error && (
                <div className="rounded-3xl bg-red-50 p-8 border border-red-200 text-center text-red-700">
                  <p className="font-bold">Failed to load initiatives. Please refresh or check back shortly.</p>
                </div>
              )}

              {/* EMPTY RESULTS STATE */}
              {!loading && !error && filteredItems.length === 0 && (
                <div className="rounded-3xl bg-white p-12 sm:p-16 border-2 border-dashed border-stone-200 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 text-2xl">
                    <FaHandsHelping />
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-800">
                    No initiatives match your filters
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    Try selecting a different status phase or sector, or search using broader terms.
                  </p>
                  <div>
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 rounded-full bg-[#13382C] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#F7D046] hover:text-[#13382C] transition-colors shadow-sm"
                    >
                      <FaTimes className="text-xs" />
                      <span>Reset All Filters</span>
                    </button>
                  </div>
                </div>
              )}

              {/* INITIATIVES CARDS GRID */}
              {!loading && !error && filteredItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                  {filteredItems.map((p) => {
                    const cardTitle = p.title || p.name || 'Initiative Title'
                    const cardDesc = formatText(p.summary || p.description) || 'Empowering communities through field initiatives.'
                    const rawImg = p.image_url || p.image
                    const imgSrc = getImageUrl(rawImg) || '/about-banner.jpg'
                    const targetLink = `/properties/${p.slug || p.id}`

                    const isActive = p.is_active !== undefined ? (Boolean(p.is_active) && p.is_active !== '0' && p.is_active !== 0) : true
                    const projectPhase = (p.project_status || 'ongoing').toLowerCase()
                    const sectorName = p.category || 'Initiative'
                    const locationStr = p.location || 'Multiple Field Sites, India'

                    return (
                      <div
                        key={p.id || p.slug}
                        className="group rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                      >
                        {/* Top Image Container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                          <img
                            src={imgSrc}
                            alt={cardTitle}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = '/about-banner.jpg'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          {/* Floating Top Badges */}
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                            {/* Sector Pill */}
                            <span className="inline-flex items-center rounded-full bg-[#F7D046] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#13382C] shadow-sm">
                              {sectorName}
                            </span>

                            {/* Status Indicator */}
                            {isActive ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 text-white px-3 py-1 text-[11px] font-black uppercase tracking-wider backdrop-blur shadow-sm">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                </span>
                                <span>Active</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-stone-700/90 text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur shadow-sm">
                                <span>{projectPhase === 'completed' ? 'Completed' : projectPhase === 'planned' ? 'Planned' : 'Inactive'}</span>
                              </span>
                            )}
                          </div>

                          {/* Phase Label Bottom Right of Image */}
                          <div className="absolute bottom-3 right-4 pointer-events-none">
                            <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold text-white/90 capitalize">
                              {projectPhase} phase
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                          <div className="space-y-2.5">
                            {/* Location Tag */}
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
                              <FaMapMarkerAlt className="text-red-500 shrink-0" />
                              <span className="truncate">{locationStr}</span>
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-lg sm:text-xl font-bold text-[#13382C] group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                              {cardTitle}
                            </h3>

                            {/* Summary Snippet */}
                            <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                              {cardDesc}
                            </p>
                          </div>

                          {/* Action Footer */}
                          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <Link
                              to={targetLink}
                              className="inline-flex items-center gap-2 rounded-full bg-[#13382C] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#F7D046] hover:text-[#13382C] group-hover:shadow-md"
                            >
                              <span>View Details</span>
                              <FiArrowUpRight className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>

                            <span className="text-[11px] font-bold text-stone-400 group-hover:text-[#13382C] transition-colors">
                              Meri Awaz Trust
                            </span>
                          </div>
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
