import { useEffect, useMemo, useState } from "react";
import { getInquiries, updateInquiryStatus, verifyStudioPin, type InquiryItem } from "../api";

const statuses = ["New", "Contacted", "Qualified", "Booked", "Closed"];

export function AdminDashboard() {
  const [pin, setPin] = useState("");
  const [savedPin, setSavedPin] = useState(() => window.localStorage.getItem("idesign-admin-pin") || "");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pinError, setPinError] = useState("");

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

  useEffect(() => {
    if (savedPin) {
      attemptUnlock(savedPin, false);
    }
  }, []);

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

  const visible = useMemo(
    () => inquiries.filter((inquiry) => statusFilter === "All" || inquiry.status === statusFilter),
    [inquiries, statusFilter]
  );

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
              className="w-full py-3 rounded-xl bg-[#c8a54a] hover:bg-[#d6b55e] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-widest transition-all"
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
            <h1>Client inquiries</h1>
          </div>
          <div className="admin-auth flex items-center gap-3">
            <button onClick={() => loadInquiries(savedPin)} disabled={loading}>
              {loading ? "Loading..." : "↻ Refresh"}
            </button>
            <button
              onClick={handleLock}
              className="bg-red-950/40 border-red-800/60 text-red-300 hover:bg-red-900/50"
            >
              🔒 Lock
            </button>
          </div>
        </header>

        <div className="admin-metrics">
          {statuses.slice(0, 4).map((status) => (
            <div key={status}>
              <span>{status}</span>
              <strong>{inquiries.filter((item) => item.status === status).length}</strong>
            </div>
          ))}
        </div>

        <div className="admin-toolbar">
          <span>{inquiries.length} total leads</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter status"
          >
            <option>All</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <section className="inquiry-list">
          {visible.map((inquiry) => {
            const cleanPhone = inquiry.phone ? inquiry.phone.replace(/\D/g, "") : "";
            const whatsappText = encodeURIComponent(
              `Hi ${inquiry.fullName}, thank you for contacting iDESIGN Studio about ${inquiry.interest}. I would love to hear a little more about your project.`
            );

            return (
              <article key={inquiry.id} className="inquiry-card">
                <div>
                  <p className="inquiry-date">
                    {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <h2>{inquiry.fullName}</h2>
                  <p className="inquiry-meta">
                    {inquiry.interest} · {inquiry.timeline} · {inquiry.budget || "Budget flexible"}
                  </p>
                  <p className="inquiry-message">{inquiry.message}</p>
                  <div className="inquiry-links">
                    <a href={`mailto:${inquiry.email}`}>Email Client</a>
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${whatsappText}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>

                <select
                  value={inquiry.status}
                  onChange={(e) => setStatus(inquiry, e.target.value)}
                  aria-label={`Set status for ${inquiry.fullName}`}
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </article>
            );
          })}

          {!loading && visible.length === 0 && (
            <p className="admin-empty">No inquiries match this view yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
