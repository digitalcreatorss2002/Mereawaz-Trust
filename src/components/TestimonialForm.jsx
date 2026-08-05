import { useState } from "react";
import { api } from "../api.js";
import SubmissionAlert from "./SubmissionAlert.jsx";

export default function TestimonialForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    email: "",
    rating: 5,
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api.post("/testimonials.php", form);
      setStatus("sent");
      setShowAlert(true);
      setForm({ name: "", location: "", email: "", rating: 5, message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  if (status === "sent") {
    return (
      <>
        {showAlert && (
          <SubmissionAlert
            message="Data is submitted successfully! Your review will appear here once approved by our team."
            onClose={() => setShowAlert(false)}
          />
        )}
        <div className="rounded-xl2 bg-leaf/10 p-6 text-center">
          <p className="font-display text-lg font-semibold text-leaf-dark">
            Thank you for sharing your story! 🙏
          </p>
          <p className="mt-1 text-md text-ink/70">
            Your review has been received and will appear here once our team
            approves it.
          </p>
        </div>
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl2 bg-white p-6 shadow-card sm:p-8"
    >
      <h3 className="mb-1 font-display text-2xl font-extrabold text-[var(--button-bg-color)]">
        Write Customer Review
      </h3>

      <p className="mb-6 text-md text-muted">
        Reviews are moderated — your story will be published after our team
        approves it.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-md font-medium text-ink/80">
            Your Name
          </label>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className="w-full rounded-lg border border-primary/15 px-4 py-2.5 text-md focus:border-accent focus:outline-none"
            placeholder="Anjali Sharma"
          />
        </div>
        <div>
          <label className="mb-1 block text-md font-medium text-ink/80">
            Location
          </label>
          <input
            value={form.location}
            onChange={update("location")}
            className="w-full rounded-lg border border-primary/15 px-4 py-2.5 text-md focus:border-accent focus:outline-none"
            placeholder="Dwarka, Delhi"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-md font-medium text-ink/80">
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          className="w-full rounded-lg border border-primary/15 px-4 py-2.5 text-md focus:border-accent focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-md font-medium text-ink/80">
          Rating
        </label>
        <select
          value={form.rating}
          onChange={update("rating")}
          className="w-full rounded-lg border border-primary/15 px-4 py-2.5 text-md focus:border-accent focus:outline-none"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} {r === 1 ? "star" : "stars"}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-md font-medium text-ink/80">
          Your Review
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={update("message")}
          className="w-full rounded-lg border border-primary/15 px-4 py-2.5 text-md focus:border-accent focus:outline-none"
          placeholder="Tell us about your experience with Meri Awaz Trust..."
        />
      </div>

      {status === "error" && (
        <p className="mt-3 text-center text-md text-red-600">{error}</p>
      )}

      {/* Button container wrapped with text-center */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-[var(--button-bg-color)] px-8 py-3 font-semibold text-[var(--text-color-light)] transition hover:bg-[var(--button-hover-color)] disabled:opacity-60"
        >
          {status === "sending" ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
}
