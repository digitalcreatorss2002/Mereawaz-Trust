export function extractData(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.items)) return res.items;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  return [];
}

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://hrntechsolutions.com/mereawaz_backend'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hrntechsolutions.com/mereawaz_backend/api'

export function getImageUrl(path) {
  if (!path) return ''
  if (typeof path === 'string') {
    if (path.includes('localhost') || path.includes('127.0.0.1')) {
      path = path.replace(/^https?:\/\/[^\/]+(\/meriawaz-trust\/mereawaz_backend|\/meriawaz_trust\/backend|\/mereawaz_backend|\/backend)?/i, '')
    }
  }
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/uploads') || path.startsWith('uploads/')) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${BACKEND_URL}${cleanPath}`
  }
  if (path.startsWith('/')) {
    return path
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${BACKEND_URL}${cleanPath}`
}

async function request(path, options = {}) {
  const token = localStorage.getItem('admin_token')
  const headers = { ...options.headers }

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  let data
  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`)
  }
  return data
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) =>
    request(path, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  del: (path) => request(path, { method: 'DELETE' }),
}


