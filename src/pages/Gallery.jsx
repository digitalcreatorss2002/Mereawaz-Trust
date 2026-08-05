import { useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { FaExpand, FaTimes } from 'react-icons/fa'
import PageHeader from '../components/PageHeader.jsx'
import Loader from '../components/Loader.jsx'
import { api, getImageUrl } from '../api.js'
import TickerBar from '../components/TickerBar.jsx'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [status, setStatus] = useState('loading')
  const [active, setActive] = useState(null)

  useEffect(() => {
    api
      .get('/gallery.php?status=approved')
      .then((res) => {
        setImages(res?.data || [])
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="FIELD SNAPSHOTS"
        title="Our Photo Gallery"
        subtitle="Visual stories from our rural programs, health camps, drone farming labs, and community events."
        bgImage="/about-banner.jpg"
      />
      <TickerBar/>

      <section className="py-20 pt-28 bg-[var(--text-color-light)]">
        <div className="container-page">
          {status === 'loading' && <Loader label="Loading gallery items..." />}

          {status === 'done' && images.length === 0 && (
            <div className="text-center py-16 rounded-3xl bg-white border border-gray-100 shadow-aasha">
              <p className="text-gray-500 font-medium">No gallery photos published yet — check back soon.</p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                onClick={() => setActive(img)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-aasha transition-all duration-300 hover:-translate-y-2 hover:shadow-aasha-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                  <img
                    src={getImageUrl(img.image_url)}
                    alt={img.caption || 'Gallery photo'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-6">
                    <div className="self-end">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                        <FaExpand />
                      </span>
                    </div>
                    {img.caption && (
                      <p className="text-xs font-bold text-white leading-snug drop-shadow">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close photo"
            >
              <FaTimes className="text-xl" />
            </button>

            <div
              className="max-w-4xl w-full p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(active.image_url)}
                alt={active.caption || 'Expanded photo'}
                className="max-h-[80vh] w-auto mx-auto rounded-3xl shadow-2xl object-contain border border-white/10"
              />
              {active.caption && (
                <p className="mt-4 text-center text-sm font-semibold text-white/90">
                  {active.caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
