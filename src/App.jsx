import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Properties from './pages/Properties.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx'
import Gallery from './pages/Gallery.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Contact from './pages/Contact.jsx'
import Volunteer from './pages/Volunteer.jsx'
import Donate from './pages/Donate.jsx'
import NotFound from './pages/NotFound.jsx'

import Preloader from './components/Preloader.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden">
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
