import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import PropertiesSection from '../components/PropertiesSection.jsx'
import Loader from '../components/Loader.jsx'
import { api } from '../api.js'
import TickerBar from '../components/TickerBar.jsx'

export default function Properties() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    api
      .get('/properties.php')
      .then((res) => {
        setItems(res?.data || [])
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="OUR PROGRAMs &amp; INITIATIVES"
        title="Programs &amp; Field Sites"
        subtitle="Community centers, agricultural drone projects, and digital literacy hubs active across India."
        bgImage="/hero-banner.jpg"
      />
      {/* <TickerBar /> */}

      {/* Grid mode enabled & Heading hidden */}
      <PropertiesSection programs={items} showHeading={false} isGrid={true} />

      {status === 'loading' && (
        <section className="py-10 bg-[#FAF8F4]">
          <div className="container-page">
            <Loader label="Loading programs &amp; properties..." />
          </div>
        </section>
      )}

      {status === 'error' && (
        <section className="py-10 bg-[#FAF8F4]">
          <div className="container-page">
            <div className="rounded-3xl bg-red-50 p-8 text-center text-red-600 border border-red-200">
              <p className="font-bold text-base">Couldn't load programs right now. Please try again shortly.</p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}