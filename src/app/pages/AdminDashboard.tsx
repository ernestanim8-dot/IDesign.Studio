import { useEffect, useMemo, useState } from "react";
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getStats,
  updateStats,
  getTestimonials,
  verifyStudioPin,
  type InquiryItem,
  type StudioStats,
  type Testimonial,
} from "../api";

const statuses = ["New", "Contacted", "Qualified", "Booked", "Closed"];

const BLANK_REVIEW = {
  name: "",
  role: "",
  company: "",
  quote: "",
  rating: 5,
  project: "",
};

export function AdminDashboard() {
  const [pin, setPin] = useState("");
  const [savedPin, setSavedPin] = useState(() => window.localStorage.getItem("idesign-admin-pin") || "");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"inquiries" | "stats" | "testimonials">("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pinError, setPinError] = useState("");

  // Stats State
  const [stats, setStats] = useState<StudioStats>({
    projectsCompleted: 340,
    happyClients: 80,
    clientSatisfaction: "100%",
    yearsExperience: 4,
    servicesOffered: 4,
    activeInquiriesThisWeek: 0,
  });
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsSuccess, setStatsSuccess] = useState("");

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [newReview, setNewReview] = useState(BLANK_REVIEW);
  const [reviewSuccess, setReviewSuccess] = useState("");

  const attemptUnlock = async (candidatePin: string, isManual: boolean = true) => {
    const trimmed = candidatePin.trim();
    if (!trimmed) {
      setPinError("Please enter your studio PIN.");
      return;
    }
    setLoading(true);
    setPinError("");
    try {
      const res = await verifyStudioPin(trimmed);
      if (res.ok) {
        window.localStorage.setItem("idesign-admin-pin", trimmed);
        setSavedPin(trimmed);
        setIsUnlocked(true);
        loadInquiries(trimmed);
        loadStudioStats();
      } else {
        setIsUnlocked(false);
        if (isManual) {
          setPinError(res.error || "Incorrect Studio PIN. Access restricted.");
        } else {
          window.localStorage.removeItem("idesign-admin-pin");
          setSavedPin("");
        }
      }
    } catch {
      setIsUnlocked(false);
      setPinError("Connection error checking Studio PIN.");
    } finally {
      setLoading(false);
    }
  };

  const loadInquiries = async (tokenToUse: string) => {
    setLoading(true);
    setError("");
    try {
      const list = await getInquiries(tokenToUse);
      setInquiries(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  const loadStudioStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.warn("Failed to load initial studio stats:", err);
    }
  };

  const loadTestimonials = async () => {
    setTestimonialsLoading(true);
    try {
      const list = await getTestimonials();
      setTestimonials(list);
    } catch (err) {
      console.warn("Failed to load testimonials:", err);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  useEffect(() => {
    if (savedPin) {
      attemptUnlock(savedPin, false);
    }
  }, []);

  useEffect(() => {
    if (isUnlocked && activeTab === "testimonials" && testimonials.length === 0) {
      loadTestimonials();
    }
  }, [isUnlocked, activeTab]);

  const handleLock = () => {
    window.localStorage.removeItem("idesign-admin-pin");
    setSavedPin("");
    setIsUnlocked(false);
    setPin("");
    setPinError("");
    setInquiries([]);
  };

  const setStatus = async (inquiry: InquiryItem, status: string) => {
    const result = await updateInquiryStatus(inquiry.id, status, savedPin);
    if (!result.ok || !result.inquiry) {
      setError(result.errors?.[0] || "Status could not be updated.");
      return;
    }
    setInquiries((current) =>
      current.map((item) => (item.id === inquiry.id ? result.inquiry! : item))
    );
  };

  const handleDeleteInquiry = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete the inquiry from ${name}?`)) {
      return;
    }
    const res = await deleteInquiry(id, savedPin);
    if (res.ok) {
      setInquiries((current) => current.filter((item) => item.id !== id));
    } else {
      setError(res.errors?.[0] || "Failed to delete inquiry.");
    }
  };

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatsLoading(true);
    setStatsSuccess("");
    setError("");
    try {
      const res = await updateStats(stats, savedPin);
      if (res.ok && res.stats) {
        setStats(res.stats);
        setStatsSuccess("Studio metrics updated and live on website!");
        setTimeout(() => setStatsSuccess(""), 4000);
      } else {
        setError(res.error || "Failed to update stats.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving stats.");
    } finally {
      setStatsLoading(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.quote.trim()) {
      setError("Client name and review quote are required.");
      return;
    }
    setError("");
    setReviewSuccess("");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setTestimonials((prev) => [json.testimonial, ...prev]);
        setNewReview(BLANK_REVIEW);
        setReviewSuccess("Review published successfully!");
        setTimeout(() => setReviewSuccess(""), 3500);
      } else {
        setError(json.errors?.[0] || "Failed to publish review.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    }
  };

  const visible = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return inquiries.filter((inquiry) => {
      const matchesStatus = statusFilter === "All" || inquiry.status === statusFilter;
      const matchesSearch =
        !q ||
        inquiry.fullName.toLowerCase().includes(q) ||
        inquiry.email.toLowerCase().includes(q) ||
        (inquiry.phone && inquiry.phone.toLowerCase().includes(q)) ||
        inquiry.interest.toLowerCase().includes(q) ||
        inquiry.message.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  if (!isUnlocked) {
    return (
      <div className="admin-page min-h-[80vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#161410] border border-[#2e2920] rounded-2xl p-8 text-center shadow-2xl text-[#f3efe6]">
          <div className="w-16 h-16 rounded-2xl bg-[#1f1b14] border border-[#3e382d] flex items-center justify-center text-3xl mx-auto mb-6 text-[#c8a54a]">
            🔒
          </div>
          <p className="text-xs uppercase tracking-widest font-mono text-[#c8a54a] mb-1">
            iDESIGN Studio Management
          </p>
          <h1 className="text-2xl font-serif text-white mb-2">Restricted Access</h1>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            Enter your Studio PIN to view confidential client inquiries and project submissions.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              attemptUnlock(pin);
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setPinError("");
              }}
              placeholder="Enter Studio PIN"
              autoFocus
              className="w-full text-center tracking-[0.25em] font-mono text-xl py-3 px-4 rounded-xl bg-[#100f0d] border border-[#3e382d] focus:border-[#c8a54a] text-white placeholder:text-[#555047] placeholder:tracking-normal placeholder:text-sm outline-none"
            />
            {pinError && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/50 py-2 px-3 rounded-lg">
                {pinError}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !pin.trim()}
              className="w-full py-3 rounded-xl bg-[#c8a54a] hover:bg-[#d6b55e] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              {loading ? "Authenticating..." : "Unlock Studio Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-wrap">
        <header className="admin-header">
          <div>
            <p>Studio Operations</p>
            <h1>iDESIGN Control Center</h1>
          </div>
          <div className="admin-auth flex items-center gap-3">
            <button
              onClick={() => {
                loadInquiries(savedPin);
                loadStudioStats();
              }}
              disabled={loading}
              className="cursor-pointer"
            >
              {loading ? "Refreshing..." : "↻ Refresh"}
            </button>
            <button
              onClick={handleLock}
              className="bg-red-950/40 border-red-800/60 text-red-300 hover:bg-red-900/50 cursor-pointer"
            >
              🔒 Lock
            </button>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#2e2920] mb-6 gap-3">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-3 text-xs uppercase tracking-widest font-mono font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === "inquiries"
                ? "border-[#c8a54a] text-[#c8a54a]"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Client Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`pb-3 text-xs uppercase tracking-widest font-mono font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === "stats"
                ? "border-[#c8a54a] text-[#c8a54a]"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Live Studio Metrics
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`pb-3 text-xs uppercase tracking-widest font-mono font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === "testimonials"
                ? "border-[#c8a54a] text-[#c8a54a]"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Client Reviews ({testimonials.length})
          </button>
        </div>

        {error && <p className="admin-error mb-4">{error}</p>}

        {activeTab === "inquiries" ? (
          <>
            {/* Status Metrics Cards */}
            <div className="admin-metrics">
              {statuses.map((status) => {
                const count = inquiries.filter((item) => item.status === status).length;
                return (
                  <div
                    key={status}
                    onClick={() => setStatusFilter(status === statusFilter ? "All" : status)}
                    className={`cursor-pointer transition-all ${
                      statusFilter === status ? "ring-1 ring-[#c8a54a] bg-[#1a1814]" : ""
                    }`}
                  >
                    <span>{status}</span>
                    <strong>{count}</strong>
                  </div>
                );
              })}
            </div>

            {/* Inquiries Toolbar */}
            <div className="admin-toolbar flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client, email, service..."
                  className="w-full text-xs px-3 py-2 rounded-lg bg-[#14120e] border border-[#2e2920] focus:border-[#c8a54a] text-white placeholder:text-neutral-500 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-neutral-400 hover:text-white px-2 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">
                  {visible.length} of {inquiries.length} leads
                </span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter status"
                >
                  <option value="All">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inquiries List */}
            <section className="inquiry-list mt-6 space-y-4">
              {visible.map((inquiry) => {
                const cleanPhone = inquiry.phone ? inquiry.phone.replace(/\D/g, "") : "";
                const whatsappText = encodeURIComponent(
                  `Hi ${inquiry.fullName}, thank you for contacting iDESIGN Studio about ${inquiry.interest}. I would love to hear a little more about your project.`
                );

                const statusColor =
                  inquiry.status === "New"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : inquiry.status === "Contacted"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : inquiry.status === "Qualified"
                    ? "bg-sky-500/10 text-sky-400 border-sky-500/30"
                    : inquiry.status === "Booked"
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                    : "bg-neutral-800 text-neutral-400 border-neutral-700";

                return (
                  <article key={inquiry.id} className="inquiry-card">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-mono uppercase tracking-wider ${statusColor}`}>
                          {inquiry.status}
                        </span>
                        <p className="inquiry-date text-xs text-neutral-500 font-mono">
                          {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <h2 className="text-lg font-serif text-white">{inquiry.fullName}</h2>
                      <p className="inquiry-meta text-xs text-neutral-400 mt-1">
                        <span className="text-[#c8a54a] font-medium">{inquiry.interest}</span> · Timeline: {inquiry.timeline} · Budget: {inquiry.budget || "Flexible"}
                      </p>
                      <p className="inquiry-message text-sm text-neutral-300 mt-3 p-3 rounded-lg bg-[#110f0c] border border-[#23201a] leading-relaxed">
                        {inquiry.message}
                      </p>

                      <div className="inquiry-links flex items-center gap-4 mt-3 text-xs">
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-[#c8a54a] hover:underline"
                        >
                          ✉ Email Client ({inquiry.email})
                        </a>
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${whatsappText}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            💬 WhatsApp ({inquiry.phone})
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteInquiry(inquiry.id, inquiry.fullName)}
                          className="text-red-400 hover:text-red-300 ml-auto text-[11px] underline cursor-pointer"
                        >
                          Delete Lead
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <label className="text-[10px] font-mono uppercase text-neutral-400">
                        Status
                      </label>
                      <select
                        value={inquiry.status}
                        onChange={(e) => setStatus(inquiry, e.target.value)}
                        aria-label={`Set status for ${inquiry.fullName}`}
                        className="text-xs bg-[#12100d] border border-[#3e382d] rounded-lg px-2 py-1.5 text-white"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </article>
                );
              })}

              {!loading && visible.length === 0 && (
                <p className="admin-empty py-12 text-center text-neutral-500">
                  No inquiries match this filter view.
                </p>
              )}
            </section>
          </>
        ) : activeTab === "stats" ? (
          /* Live Studio Metrics Tab */
          <div className="bg-[#14120e] border border-[#2e2920] rounded-2xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-serif text-white">Live Studio Performance Metrics</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Update the official counters displayed across the Home page hero, stats ticker, and client trust badges.
              </p>
            </div>

            {statsSuccess && (
              <div className="mb-6 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs">
                ✓ {statsSuccess}
              </div>
            )}

            <form onSubmit={handleSaveStats} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-2">
                    Projects Completed
                  </label>
                  <input
                    type="number"
                    value={stats.projectsCompleted}
                    onChange={(e) =>
                      setStats({ ...stats, projectsCompleted: Number(e.target.value) })
                    }
                    className="w-full text-base font-semibold px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">e.g. 340+ completed commissions</p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-2">
                    Happy Clients
                  </label>
                  <input
                    type="number"
                    value={stats.happyClients}
                    onChange={(e) =>
                      setStats({ ...stats, happyClients: Number(e.target.value) })
                    }
                    className="w-full text-base font-semibold px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">e.g. 80+ corporate &amp; portrait clients</p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-2">
                    Client Satisfaction Rate
                  </label>
                  <input
                    type="text"
                    value={stats.clientSatisfaction}
                    onChange={(e) =>
                      setStats({ ...stats, clientSatisfaction: e.target.value })
                    }
                    className="w-full text-base font-semibold px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">e.g. 100% or 99.4%</p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-2">
                    Years of Studio Excellence
                  </label>
                  <input
                    type="number"
                    value={stats.yearsExperience}
                    onChange={(e) =>
                      setStats({ ...stats, yearsExperience: Number(e.target.value) })
                    }
                    className="w-full text-base font-semibold px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">e.g. 4+ or 5+ years active</p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-2">
                    Primary Service Disciplines
                  </label>
                  <input
                    type="number"
                    value={stats.servicesOffered}
                    onChange={(e) =>
                      setStats({ ...stats, servicesOffered: Number(e.target.value) })
                    }
                    className="w-full text-base font-semibold px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">Photography, Design, Concepts, Print</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#23201a] flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Changes take effect immediately on production site.
                </span>
                <button
                  type="submit"
                  disabled={statsLoading}
                  className="px-6 py-2.5 rounded-xl bg-[#c8a54a] hover:bg-[#d6b55e] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  {statsLoading ? "Saving..." : "Save Studio Metrics"}
                </button>
              </div>
            </form>
          </div>
        ) : activeTab === "testimonials" ? (
          /* Client Reviews Management Tab */
          <div className="space-y-8">
            {/* Add New Review Form */}
            <div className="bg-[#14120e] border border-[#2e2920] rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-serif text-white mb-1">Publish Client Review</h2>
              <p className="text-xs text-neutral-400 mb-6">Add a new testimonial that will appear on the website immediately.</p>

              {reviewSuccess && (
                <div className="mb-6 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs">
                  ✓ {reviewSuccess}
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1.5">Client Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Elizabeth Mensah"
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white placeholder:text-neutral-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1.5">Role / Title</label>
                    <input
                      type="text"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      placeholder="e.g. Fashion Designer"
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white placeholder:text-neutral-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1.5">Company / Context</label>
                    <input
                      type="text"
                      value={newReview.company}
                      onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                      placeholder="e.g. Portrait Session 2025"
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white placeholder:text-neutral-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1.5">Rating (1–5)</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white outline-none"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{"★".repeat(r)} ({r}/5)</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1.5">Review Quote *</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.quote}
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    placeholder="Type the client's words exactly as they said or wrote them..."
                    className="w-full text-sm px-4 py-3 rounded-xl bg-[#0c0a08] border border-[#2e2920] focus:border-[#c8a54a] text-white placeholder:text-neutral-600 outline-none resize-none leading-relaxed"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#c8a54a] hover:bg-[#d6b55e] text-black font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Reviews */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
                {testimonialsLoading ? "Loading reviews..." : `${testimonials.length} Published Review${testimonials.length !== 1 ? "s" : ""}`}
              </h3>
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#14120e] border border-[#2e2920] rounded-xl p-5 flex gap-4 items-start"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#c8a54a] text-xs">{"★".repeat(Math.round(t.rating))}</span>
                        <span className="text-xs font-mono text-neutral-500">{t.date}</span>
                      </div>
                      <p className="text-sm text-white font-semibold">{t.name}</p>
                      <p className="text-xs text-neutral-400">{t.role}{t.company ? ` · ${t.company}` : ""}</p>
                      <p className="text-sm text-neutral-300 mt-2 leading-relaxed line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
                    </div>
                  </div>
                ))}
                {!testimonialsLoading && testimonials.length === 0 && (
                  <p className="text-neutral-500 text-sm py-6 text-center">No reviews published yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
