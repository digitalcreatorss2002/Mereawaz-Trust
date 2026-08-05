import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api.js'
import PageHeader from '../components/PageHeader.jsx'
import { FaHeart, FaShieldAlt, FaCheckCircle, FaQrcode, FaLock } from 'react-icons/fa'

const PRESET_AMOUNTS = [500, 1000, 2500, 5000]

export default function Donate() {
  const [searchParams] = useSearchParams()
  const initialAmount = searchParams.get('amount') ? Number(searchParams.get('amount')) : 1000

  const [step, setStep] = useState('form') // form -> pay -> done
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: initialAmount || 1000,
    note: '',
    requires_80g: false,
    pan_number: ''
  })

  useEffect(() => {
    const amtParam = searchParams.get('amount')
    if (amtParam && !isNaN(amtParam) && Number(amtParam) > 0) {
      setForm((f) => ({ ...f, amount: Number(amtParam) }))
    }
  }, [searchParams])

  const [donation, setDonation] = useState(null)
  const [utr, setUtr] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleCreate(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const payload = {
        ...form,
        amount: Number(form.amount)
      }
      const res = await api.post('/donate/create.php', payload)
      if (res?.data) {
        setDonation(res.data)
        setStep('pay')
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 250, behavior: 'smooth' })
        }
      } else {
        throw new Error(res?.message || 'Failed to create donation reference.')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleConfirm(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api.post('/donate/confirm.php', { donation_id: donation.id, utr })
      setStep('done')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const qrUrl = donation
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(donation.upi_uri)}`
    : ''

  return (
    <>
      <PageHeader
        eyebrow="SUPPORT OUR CAUSE"
        title="Direct Online Donation"
        subtitle="100% of your contribution goes directly to rural empowerment, healthcare, and education."
        bgImage="/hero-banner.jpg"
      />

      <section className="py-20 bg-[#FAF8F4]">
        <div className="container-page max-w-2xl">
          {step === 'form' && (
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-gray-100 shadow-aasha-lg">
              {/* Header Badges */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
                <div>
                  <span className="inline-block rounded-full bg-[var(--secondary-light)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--button-bg-color)] mb-1">
                    TRANSPARENT DONATION
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-gray-900">Enter Donation Amount</h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border">
                  <FaLock className="text-green-600" />
                  <span>256-bit Secure</span>
                </div>
              </div>

              <form onSubmit={handleCreate} className="space-y-6">
                {/* Preset Amounts */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Select Preset Amount (₹)
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {PRESET_AMOUNTS.map((a) => (
                      <button
                        type="button"
                        key={a}
                        onClick={() => setForm((f) => ({ ...f, amount: a }))}
                        className={`rounded-2xl border-2 py-3 text-sm font-bold transition-all duration-300 ${
                          Number(form.amount) === a
                            ? 'border-[var(--button-bg-color)] bg-[var(--button-bg-color)] text-white shadow-md'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        ₹{a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Or Enter Custom Amount (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.amount}
                    onChange={update('amount')}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-lg font-bold text-gray-900 focus:border-[var(--button-bg-color)] focus:outline-none"
                  />
                </div>

                {/* Donor Contact Details */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="vikram@example.com"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Note / Purpose (Optional)
                  </label>
                  <input
                    value={form.note}
                    onChange={update('note')}
                    placeholder="e.g. For Education Program, In Memory Of..."
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                  />
                </div>

                {/* 80G Tax Exemption Box */}
                <div className="rounded-2xl border border-[var(--primary-color)] bg-[var(--secondary-light)]/40 p-5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.requires_80g}
                      onChange={(e) => setForm((f) => ({ ...f, requires_80g: e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300 text-[var(--button-bg-color)] focus:ring-[var(--button-bg-color)]"
                    />
                    <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <FaShieldAlt className="text-[var(--button-bg-color)]" />
                      <span>Request 80G Tax Exemption Certificate</span>
                    </span>
                  </label>

                  {form.requires_80g && (
                    <div className="mt-4 pt-3 border-t border-[var(--primary-color)]/60">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        PAN Card Number (Required for 80G Tax Receipt) *
                      </label>
                      <input
                        required={form.requires_80g}
                        value={form.pan_number}
                        onChange={(e) => setForm((f) => ({ ...f, pan_number: e.target.value.toUpperCase() }))}
                        placeholder="e.g. ABCDE1234F"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm uppercase font-bold focus:border-[var(--button-bg-color)] focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {error && <p className="text-xs font-bold text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--button-bg-color)] py-4 text-base font-bold text-white shadow-aasha transition-all hover:bg-[var(--button-hover-color)] hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                >
                  <FaHeart className="text-pink-300" />
                  <span>{busy ? 'Processing...' : `Continue to Pay ₹${form.amount}`}</span>
                </button>
              </form>
            </div>
          )}

          {step === 'pay' && donation && (
            <div className="rounded-3xl bg-white p-8 sm:p-10 text-center border border-gray-100 shadow-aasha-lg space-y-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-green-50 text-green-600 mb-2">
                <FaQrcode className="text-3xl" />
              </div>
              <h2 className="font-display text-2xl font-extrabold text-gray-900">Scan &amp; Pay ₹{donation.amount}</h2>
              <p className="text-xs text-gray-500 font-mono">Reference Code: {donation.reference}</p>

              <div className="p-4 bg-gray-50 rounded-3xl border inline-block mx-auto">
                <img src={qrUrl} alt="UPI QR Code" className="w-56 h-56 mx-auto rounded-2xl border border-gray-200" />
              </div>

              <div className="text-sm text-gray-700">
                <p>UPI ID: <span className="font-bold text-gray-900">{donation.upi_id}</span></p>
                <a
                  href={donation.upi_uri}
                  className="mt-3 inline-block rounded-full bg-[var(--button-bg-color)] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[var(--button-hover-color)]"
                >
                  Open UPI App (GPay / PhonePe / Paytm)
                </a>
              </div>

              {/* UTR Confirmation Form */}
              <form onSubmit={handleConfirm} className="pt-6 border-t border-gray-100 text-left space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Step 2: Enter Transaction UTR / Ref Number After Payment *
                </label>
                <input
                  required
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="e.g. 329847192847"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                />
                {error && <p className="text-xs font-bold text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-[var(--button-bg-color)] py-3.5 text-sm font-bold text-white shadow-aasha hover:bg-[var(--button-hover-color)] disabled:opacity-60"
                >
                  {busy ? 'Verifying...' : 'Submit Payment Reference'}
                </button>
              </form>
            </div>
          )}

          {step === 'done' && (
            <div className="rounded-3xl bg-green-50 border border-green-200 p-10 text-center space-y-4">
              <FaCheckCircle className="text-5xl text-green-600 mx-auto" />
              <h2 className="font-display text-2xl font-extrabold text-green-900">Thank You For Your Donation! 🙏</h2>
              <p className="text-sm text-green-800 leading-relaxed max-w-md mx-auto">
                Your generosity directly transforms rural lives. Our finance team will verify your transaction reference and send your receipt to your email within 24 hours.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
