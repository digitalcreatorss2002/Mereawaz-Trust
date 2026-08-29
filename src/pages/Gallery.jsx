import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExpand, FaTimes, FaFolder, FaArrowLeft, FaImages, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import PageHeader from '../components/PageHeader.jsx'
import Loader from '../components/Loader.jsx'
import { api, getImageUrl } from '../api.js'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [status, setStatus] = useState('loading')
  const [selectedCategory, setSelectedCategory] = useState('ALL') // 'ALL' or specific category name
  const [viewMode, setViewMode] = useState('categories') // 'categories' | 'photos'
  const [activePhoto, setActivePhoto] = useState(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  useEffect(() => {
    api
      .get('/gallery.php?status=approved')
      .then((res) => {
        const list = Array.isArray(res) ? res : (res?.data && Array.isArray(res.data) ? res.data : [])
        setImages(list)
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [])

  // Group images by category
  const categoriesMap = useMemo(() => {
    const map = {}
    images.forEach((img) => {
      const cat = img.category && img.category.trim() ? img.category.trim() : 'General'
      if (!map[cat]) {
        map[cat] = []
      }
      map[cat].push(img)
    })
    return map
  }, [images])

  const categoryList = useMemo(() => {
    return Object.keys(categoriesMap)
  }, [categoriesMap])

  // Images for current view
  const currentCategoryImages = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return images
    }
    return categoriesMap[selectedCategory] || []
  }, [images, categoriesMap, selectedCategory])

  const openLightbox = (photo, index) => {
    setActivePhoto(photo)
    setActivePhotoIndex(index)
  }

  const prevLightboxPhoto = (e) => {
    e.stopPropagation()
    const newIdx = (activePhotoIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length
    setActivePhotoIndex(newIdx)
    setActivePhoto(currentCategoryImages[newIdx])
  }

  const nextLightboxPhoto = (e) => {
    e.stopPropagation()
    const newIdx = (activePhotoIndex + 1) % currentCategoryImages.length
    setActivePhotoIndex(newIdx)
    setActivePhoto(currentCategoryImages[newIdx])
  }

  const handleCategoryCardClick = (catName) => {
    setSelectedCategory(catName)
    setViewMode('photos')
  }

  return (
    <>
      <PageHeader
        eyebrow="FIELD SNAPSHOTS"
        title="Our Photo Gallery"
        subtitle="Visual stories from our rural programs, health camps, drone farming labs, and community events."
        bgImage="/about-banner.jpg"
      />

      <section className="py-16 lg:py-24 bg-[#FAF8F4] min-h-[600px] font-sans">
        <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {status === 'loading' && <Loader label="Loading photo albums..." />}

          {status === 'error' && (
            <div className="text-center py-12 rounded-3xl bg-red-50 border border-red-200 text-red-600 font-bold">
              Failed to load gallery images. Please try again later.
            </div>
          )}

          {status === 'done' && images.length === 0 && (
            <div className="text-center py-16 rounded-3xl bg-white border border-gray-100 shadow-aasha">
              <p className="text-gray-500 font-medium">No gallery photos published yet — check back soon.</p>
            </div>
          )}

          {status === 'done' && images.length > 0 && (
            <div>
              
              {/* Category Filter Tabs Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('ALL')
                      setViewMode('categories')
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                      viewMode === 'categories' && selectedCategory === 'ALL'
                        ? 'bg-[var(--button-bg-color)] text-[var(--accent-gold)] shadow-md scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    All Albums ({categoryList.length})
                  </button>

                  {categoryList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat)
                        setViewMode('photos')
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                        selectedCategory === cat && viewMode === 'photos'
                          ? 'bg-[var(--button-bg-color)] text-[var(--accent-gold)] shadow-md scale-105'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {cat} ({categoriesMap[cat]?.length || 0})
                    </button>
                  ))}
                </div>

                {viewMode === 'photos' && (
                  <button
                    onClick={() => setViewMode('categories')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-xs font-bold text-gray-800 transition-all"
                  >
                    <FaArrowLeft className="text-xs" />
                    <span>Back to Albums</span>
                  </button>
                )}
              </div>

              {/* MODE 1: CATEGORY ALBUM CARDS GRID */}
              {viewMode === 'categories' ? (
                <div>
                  <div className="mb-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-[#13382C]">
                      Explore By Photo Categories
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Click any category album to view field photos and event highlights.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryList.map((catName, idx) => {
                      const catPhotos = categoriesMap[catName] || []
                      const coverPhoto = catPhotos[0]
                      const coverUrl = getImageUrl(coverPhoto?.image_url) || '/about-banner.jpg'

                      return (
                        <motion.div
                          key={catName}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          onClick={() => handleCategoryCardClick(catName)}
                          className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {/* Album Cover Photo */}
                          <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                            <img
                              src={coverUrl}
                              alt={catName}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/about-banner.jpg';
                              }}
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* Top Badge: Photo Count */}
                            <div className="absolute top-4 right-4 z-10">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-black text-white shadow-sm">
                                <FaImages className="text-[var(--accent-gold)]" />
                                <span>{catPhotos.length} {catPhotos.length === 1 ? 'Photo' : 'Photos'}</span>
                              </span>
                            </div>

                            {/* Bottom Card Header Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                              <span className="inline-block rounded-full bg-[var(--accent-gold)] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#13382C] mb-2">
                                ALBUM
                              </span>
                              <h3 className="font-display text-xl font-extrabold text-white group-hover:text-[var(--accent-gold)] transition-colors leading-tight">
                                {catName}
                              </h3>
                              <p className="text-xs text-gray-300 mt-1 flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                                <span>View all {catPhotos.length} photos</span>
                                <span>&rarr;</span>
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* MODE 2: SELECTED CATEGORY PHOTOS GRID */
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                      <span className="inline-block rounded-full bg-[var(--button-bg-color)] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[var(--accent-gold)] mb-2">
                        {selectedCategory === 'ALL' ? 'ALL GALLERY PHOTOS' : `CATEGORY: ${selectedCategory}`}
                      </span>
                      <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#13382C]">
                        {selectedCategory === 'ALL' ? 'All Field Photos' : selectedCategory}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Showing {currentCategoryImages.length} photos in this collection.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentCategoryImages.map((img, index) => (
                      <motion.div
                        key={img.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                        onClick={() => openLightbox(img, index)}
                        className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-aasha transition-all duration-300 hover:-translate-y-2 hover:shadow-aasha-lg"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                          <img
                            src={getImageUrl(img.image_url)}
                            alt={img.caption || 'Gallery photo'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/about-banner.jpg';
                            }}
                          />
                          
                          {/* Category Tag Top Left */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="inline-block rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                              {img.category || 'General'}
                            </span>
                          </div>

                          {/* Hover Details Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-6">
                            <div className="self-end">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur shadow-md">
                                <FaExpand />
                              </span>
                            </div>
                            {img.caption && (
                              <p className="text-xs font-bold text-white leading-snug drop-shadow line-clamp-2">
                                {img.caption}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close photo"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Previous Photo Button */}
            {currentCategoryImages.length > 1 && (
              <button
                onClick={prevLightboxPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous photo"
              >
                <FaChevronLeft className="text-xl" />
              </button>
            )}

            {/* Next Photo Button */}
            {currentCategoryImages.length > 1 && (
              <button
                onClick={nextLightboxPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Next photo"
              >
                <FaChevronRight className="text-xl" />
              </button>
            )}

            {/* Modal Image Box */}
            <div
              className="max-w-5xl w-full p-2 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(activePhoto.image_url)}
                alt={activePhoto.caption || 'Expanded photo'}
                className="max-h-[78vh] w-auto mx-auto rounded-2xl shadow-2xl object-contain border border-white/10"
              />
              
              <div className="mt-4 text-center space-y-1.5">
                <span className="inline-block rounded-full bg-[var(--accent-gold)] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#13382C]">
                  {activePhoto.category || 'General'}
                </span>
                {activePhoto.caption && (
                  <p className="text-sm font-semibold text-white/90 max-w-2xl mx-auto">
                    {activePhoto.caption}
                  </p>
                )}
                {currentCategoryImages.length > 1 && (
                  <p className="text-[11px] text-gray-400 font-mono">
                    {activePhotoIndex + 1} of {currentCategoryImages.length}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

