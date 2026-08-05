import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaCalendarAlt, FaShareAlt, FaHeart, FaCheckCircle } from 'react-icons/fa'
import Loader from '../components/Loader.jsx'
import { api, getImageUrl } from '../api.js'

const fallbackBlogBenefits = [
  { icon: '💡', title: 'Actionable Field Learnings', desc: 'Ground solutions implemented directly with rural communities.' },
  { icon: '📊', title: 'Data-Driven Outcomes', desc: 'Clear reporting on program reach, education metrics, and economic growth.' },
  { icon: '🌍', title: 'Scalable Frameworks', desc: 'Sustainable frameworks that can be replicated across Indian states.' },
]

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [status, setStatus] = useState('loading')
  const [likes, setLikes] = useState(14)
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setStatus('loading')
    api
      .get(`/blog.php?slug=${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res?.data) return setStatus('notfound')
        setPost(res.data)
        setStatus('done')
      })
      .catch(() => setStatus('error'))

    api
      .get('/blog.php?status=published')
      .then((res) => {
        setRelated((res?.data || []).filter((b) => b.slug !== slug).slice(0, 3))
      })
      .catch(() => {})
  }, [slug])

  const handleLike = () => {
    if (liked) {
      setLikes((l) => l - 1)
      setLiked(false)
    } else {
      setLikes((l) => l + 1)
      setLiked(true)
    }
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (status === 'loading') return <Loader label="Loading blog article..." />
  if (status === 'notfound' || status === 'error') {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-gray-500 font-medium">We couldn't find that blog article.</p>
        <Link to="/blog" className="mt-4 inline-block text-[var(--button-bg-color)] underline font-bold">Back to Blog Stories</Link>
      </div>
    )
  }

  const parsedBenefits = post.benefits
    ? post.benefits.split('\n').filter(Boolean).map((line, idx) => {
        const parts = line.split(':')
        return {
          icon: ['💡', '📊', '🌍', '⚡'][idx % 4],
          title: parts[0]?.trim() || `Key Takeaway #${idx + 1}`,
          desc: parts[1]?.trim() || line,
        }
      })
    : fallbackBlogBenefits

  return (
    <article className="py-16 bg-[#FAF8F4]">
      <div className="container-page max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--button-bg-color)] hover:underline">
            <FaArrowLeft /> Back to Blog Stories
          </Link>
          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm hover:border-gray-300 transition-colors"
          >
            <FaShareAlt className="text-gray-400" />
            <span>{copied ? '✓ Link Copied!' : 'Share Story'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          <span className="rounded-full bg-[var(--secondary-light)] text-[var(--button-bg-color)] px-3 py-1">
            FIELD REPORT
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-[var(--button-bg-color)]" />
            {new Date(post.published_at || post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 className="font-display text-3xl font-extrabold sm:text-5xl text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        {post.cover_image && (
          <div className="mb-8 overflow-hidden rounded-3xl border border-gray-100 shadow-aasha-lg">
            <img
              src={getImageUrl(post.cover_image)}
              alt={post.title}
              className="h-80 sm:h-[480px] w-full object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <div className="mb-8 rounded-3xl border-l-4 border-[var(--button-bg-color)] bg-white p-6 sm:p-8 shadow-aasha">
            <h3 className="font-display font-bold text-gray-900 text-base mb-1">Executive Summary</h3>
            <p className="text-base text-gray-700 leading-relaxed font-normal">{post.excerpt}</p>
          </div>
        )}

        {/* Highlights */}
        <div className="mb-8 rounded-3xl bg-[var(--secondary-light)]/50 p-6 sm:p-8 border border-[var(--primary-color)]">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-[var(--button-bg-color)]" />
            <span>Key Takeaways &amp; Impact</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {parsedBenefits.map((b, i) => (
              <div key={i} className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
                <span className="text-2xl mb-2 block">{b.icon}</span>
                <h3 className="font-display font-bold text-sm text-gray-900 mb-1">{b.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-gray-100 shadow-aasha-lg">
          <div className="prose max-w-none whitespace-pre-line leading-relaxed text-gray-800 text-base sm:text-lg font-normal">
            {post.content}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--primary-color)] text-[var(--button-bg-color)] flex items-center justify-center font-bold">
                MAT
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Meri Awaz Trust Editorial</p>
                <p className="text-xs text-gray-500">Village Operations &amp; Reporting</p>
              </div>
            </div>

            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
                liked
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaHeart className={liked ? 'text-white' : 'text-red-500'} />
              <span>{likes} Helpful</span>
            </button>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">More Field Stories</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group block overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-aasha transition-all duration-300 hover:-translate-y-1 hover:shadow-aasha-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrl(r.cover_image) || "/about-banner.jpg"}
                      alt={r.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-display font-bold text-sm text-gray-900 group-hover:text-[var(--button-bg-color)] transition-colors line-clamp-2">
                      {r.title}
                    </h4>
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
