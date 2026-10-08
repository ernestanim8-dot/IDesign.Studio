import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import {
  savePortfolioConfig,
  getPortfolioConfig,
  type DigitalPortfolio,
  type PortfolioProject,
} from "../api";

const PRESET_PROJECTS: PortfolioProject[] = [
  {
    id: "p1",
    title: "Soleil Lumineux Editorial",
    category: "Haute Couture & Lookbook",
    year: "2025",
    client: "Atelier Mensah",
    description: "High-contrast golden hour editorial capturing drape, organic textures, and sovereign poise.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80",
    tags: ["Fashion", "Editorial", "Studio Lighting"],
  },
  {
    id: "p2",
    title: "Veritas Identity & Monogram",
    category: "Visual Identity",
    year: "2024",
    client: "Veritas Capital",
    description: "Luxury geometric serif mark, blind debossed business collateral, and executive brand guidelines.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
    tags: ["Branding", "Typography", "Print Collateral"],
  },
  {
    id: "p3",
    title: "Accra Contemporary Movement",
    category: "Fine Art Photography",
    year: "2025",
    client: "National Theatre Showcase",
    description: "Dynamic strobe choreography exploring spatial velocity, traditional kente accents, and modern dance.",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80",
    tags: ["Portraiture", "Motion", "Cultural Heritage"],
  },
];

const INITIAL_PORTFOLIO: DigitalPortfolio = {
  creatorName: "Ernest Anim",
  title: "Creative Director & Visual Storyteller",
  tagline: "Distilling modern African excellence into iconic visual identities and luxury imagery.",
  bio: "Over 4 years of multidisciplinary craft spanning commercial photography, bespoke brand architecture, and tactile editorial direction. Partnering with forward-thinking creators and institutions across Accra and worldwide.",
  discipline: "Photography & Brand Identity",
  location: "Accra, Ghana",
  email: "studio@idesign.studio",
  phone: "+233 50 231 0663",
  instagram: "@i_design_8",
  theme: "noir",
  typography: "serif",
  projects: PRESET_PROJECTS,
  skills: [
    "Commercial Photography",
    "Brand Architecture",
    "Editorial Art Direction",
    "Typography & Layout",
    "Print Production",
    "Lighting Design",
  ],
  clients: ["Stanbic Bank", "SWGC", "Atelier Mensah", "GCTU Alumni", "Youth Camp Ghana"],
};

export function Builder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [portfolio, setPortfolio] = useState<DigitalPortfolio>(INITIAL_PORTFOLIO);
  const [activeTab, setActiveTab] = useState<"profile" | "style" | "projects" | "skills">("profile");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [shareUrl, setShareUrl] = useState<string>("");
  const previewRef = useRef<HTMLDivElement>(null);

  // Load from query param if ID provided
  useEffect(() => {
    document.title = "Digital Portfolio Builder — iDESIGN Studio";
    const id = searchParams.get("id");
    if (id) {
      getPortfolioConfig(id).then((res) => {
        if (res.ok && res.portfolio) {
          setPortfolio(res.portfolio);
          setShareUrl(window.location.href);
        }
      });
    }
  }, [searchParams]);

  // Project editing state
  const [newProject, setNewProject] = useState<PortfolioProject>({
    id: "",
    title: "",
    category: "Commercial Photography",
    year: new Date().getFullYear().toString(),
    client: "",
    description: "",
    imageUrl: "",
    tags: [],
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const themeStyles = useMemo(() => {
    switch (portfolio.theme) {
      case "solar":
        return {
          bg: "#0d0b07",
          cardBg: "#17140c",
          border: "#3d3216",
          accent: "#e5b83b",
          text: "#f7f2e4",
          subtext: "#b8aa8f",
        };
      case "ivory":
        return {
          bg: "#f8f6f0",
          cardBg: "#ffffff",
          border: "#e2dcce",
          accent: "#8c6b2d",
          text: "#1c1a17",
          subtext: "#615c54",
        };
      case "cyber":
        return {
          bg: "#05070a",
          cardBg: "#0c1017",
          border: "#1f2937",
          accent: "#38bdf8",
          text: "#f1f5f9",
          subtext: "#94a3b8",
        };
      case "noir":
      default:
        return {
          bg: "#0c0a08",
          cardBg: "#14120e",
          border: "#262118",
          accent: "#c8a54a",
          text: "#ffffff",
          subtext: "#9ca3af",
        };
    }
  }, [portfolio.theme]);

  const fontFamily = useMemo(() => {
    switch (portfolio.typography) {
      case "modern":
        return "'Work Sans', -apple-system, sans-serif";
      case "mono":
        return "'DM Mono', monospace";
      case "serif":
      default:
        return "'DM Serif Display', Georgia, serif";
    }
  }, [portfolio.typography]);

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;
    const projectToAdd: PortfolioProject = {
      ...newProject,
      id: editingProjectId || "p-" + Date.now(),
      imageUrl:
        newProject.imageUrl.trim() ||
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80",
    };

    if (editingProjectId) {
      setPortfolio((prev) => ({
        ...prev,
        projects: prev.projects.map((p) => (p.id === editingProjectId ? projectToAdd : p)),
      }));
      setEditingProjectId(null);
    } else {
      setPortfolio((prev) => ({
        ...prev,
        projects: [projectToAdd, ...prev.projects],
      }));
    }

    setNewProject({
      id: "",
      title: "",
      category: "Commercial Photography",
      year: new Date().getFullYear().toString(),
      client: "",
      description: "",
      imageUrl: "",
      tags: [],
    });
  };

  const handleDeleteProject = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleEditProject = (proj: PortfolioProject) => {
    setNewProject(proj);
    setEditingProjectId(proj.id);
  };

  // Actions
  const handleSaveAndShare = async () => {
    setSaving(true);
    setSaveStatus("Publishing portfolio...");
    try {
      const res = await savePortfolioConfig(portfolio);
      if (res.ok && res.id) {
        const fullUrl = `${window.location.origin}/builder?id=${res.id}`;
        setShareUrl(fullUrl);
        setSearchParams({ id: res.id });
        setSaveStatus("Portfolio published! Shareable link generated.");
        if (navigator.clipboard) {
          navigator.clipboard.writeText(fullUrl);
        }
      } else {
        setSaveStatus("Saved locally. Could not generate remote link.");
      }
    } catch {
      setSaveStatus("Error saving portfolio.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(""), 4500);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolio.creatorName} — ${portfolio.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@300;400;500;600;700&family=DM+Mono&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: ${themeStyles.bg};
      color: ${themeStyles.text};
      font-family: 'Work Sans', sans-serif;
      line-height: 1.6;
      padding: 40px 20px;
    }
    .container { max-width: 1040px; margin: 0 auto; }
    header {
      padding-bottom: 48px;
      border-bottom: 1px solid ${themeStyles.border};
      margin-bottom: 48px;
    }
    .badge {
      display: inline-block;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${themeStyles.accent};
      margin-bottom: 12px;
    }
    h1 {
      font-family: ${fontFamily};
      font-size: 42px;
      font-weight: 600;
      line-height: 1.15;
      margin-bottom: 12px;
      color: ${themeStyles.text};
    }
    .title {
      font-size: 18px;
      color: ${themeStyles.subtext};
      margin-bottom: 20px;
    }
    .bio {
      font-size: 15px;
      color: ${themeStyles.subtext};
      max-width: 680px;
      line-height: 1.7;
      margin-bottom: 28px;
    }
    .meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 13px;
      color: ${themeStyles.subtext};
      font-family: 'DM Mono', monospace;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 28px;
      margin-bottom: 56px;
    }
    .card {
      background: ${themeStyles.cardBg};
      border: 1px solid ${themeStyles.border};
      border-radius: 14px;
      overflow: hidden;
      transition: transform 0.2s;
    }
    .card img {
      width: 100%;
      height: 240px;
      object-fit: cover;
      display: block;
    }
    .card-body { padding: 22px; }
    .card-cat {
      font-size: 11px;
      font-family: 'DM Mono', monospace;
      color: ${themeStyles.accent};
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 600;
      color: ${themeStyles.text};
      margin-bottom: 8px;
    }
    .card-desc {
      font-size: 13px;
      color: ${themeStyles.subtext};
      line-height: 1.6;
    }
    footer {
      text-align: center;
      padding-top: 40px;
      border-top: 1px solid ${themeStyles.border};
      font-size: 12px;
      color: ${themeStyles.subtext};
      font-family: 'DM Mono', monospace;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">${portfolio.discipline} &bull; ${portfolio.location}</div>
      <h1>${portfolio.creatorName}</h1>
      <div class="title">${portfolio.title}</div>
      <p class="bio">${portfolio.bio}</p>
      <div class="meta-row">
        <span>Email: ${portfolio.email}</span>
        <span>Phone: ${portfolio.phone}</span>
        ${portfolio.instagram ? `<span>Instagram: ${portfolio.instagram}</span>` : ""}
      </div>
    </header>
    <div class="grid">
      ${portfolio.projects
        .map(
          (p) => `
        <div class="card">
          <img src="${p.imageUrl}" alt="${p.title}" />
          <div class="card-body">
            <div class="card-cat">${p.category} &bull; ${p.year}</div>
            <div class="card-title">${p.title}</div>
            <div class="card-desc">${p.description}</div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
    <footer>
      Crafted with iDESIGN Studio &bull; Digital Portfolio Builder
    </footer>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${portfolio.creatorName.toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello iDESIGN Studio! I generated my digital portfolio brief for "${portfolio.creatorName} — ${portfolio.title}".\n\nDiscipline: ${portfolio.discipline}\nLocation: ${portfolio.location}\nProjects: ${portfolio.projects.length} showcase pieces.\n\nI would like to discuss branding, website production, or photography commissions.`
    );
    window.open(`https://wa.me/233502310663?text=${text}`, "_blank");
  };

  return (
    <div className="builder-page min-h-screen bg-[#0a0907] text-[#eae5d9] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Print View Styles */}
      <style>{`
        @media print {
          body { background: #fff !important; color: #000 !important; }
          .builder-page { padding: 0 !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .portfolio-preview {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            background: #fff !important;
            color: #000 !important;
          }
        }
      `}</style>

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 no-print">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#262118] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1710] border border-[#3d3216] text-[#c8a54a] text-xs font-mono tracking-widest uppercase mb-3">
              <span>✦</span> Bespoke Portfolio Engine
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              Digital Portfolio Builder
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl font-sans">
              Create, curate, and share a luxury digital portfolio in minutes. Choose tailored color schemes, typography, and projects with instant PDF printing and link publishing.
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrintPdf}
              className="px-4 py-2.5 rounded-xl border border-[#3d3216] bg-[#14120e] hover:bg-[#1d1913] text-neutral-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Print / Export PDF
            </button>
            <button
              onClick={handleDownloadHtml}
              className="px-4 py-2.5 rounded-xl border border-[#3d3216] bg-[#14120e] hover:bg-[#1d1913] text-neutral-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Download HTML
            </button>
            <button
              onClick={handleSaveAndShare}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-[#c8a54a] hover:bg-[#d6b55e] text-black font-semibold text-xs font-mono uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-[#c8a54a]/10"
            >
              {saving ? "Publishing..." : "Publish & Share"}
            </button>
          </div>
        </div>

        {saveStatus && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center justify-between">
            <span>✓ {saveStatus}</span>
            {shareUrl && (
              <span className="text-[11px] underline cursor-pointer" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                Copy Link: {shareUrl}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Workspace: Editor Left, Live Preview Right */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (No Print) */}
        <div className="lg:col-span-5 space-y-6 no-print">
          {/* Navigation Tabs */}
          <div className="flex rounded-xl bg-[#14120e] border border-[#262118] p-1 gap-1">
            {(
              [
                { id: "profile", label: "Profile" },
                { id: "style", label: "Style" },
                { id: "projects", label: `Works (${portfolio.projects.length})` },
                { id: "skills", label: "Skills" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#c8a54a] text-black font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Profile & Identity */}
          {activeTab === "profile" && (
            <div className="bg-[#14120e] border border-[#262118] rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-serif text-white">Creative Identity</h2>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                  Full Name / Studio Name *
                </label>
                <input
                  type="text"
                  value={portfolio.creatorName}
                  onChange={(e) => setPortfolio({ ...portfolio, creatorName: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#262118] focus:border-[#c8a54a] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                  Professional Title / Discipline
                </label>
                <input
                  type="text"
                  value={portfolio.title}
                  onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
                  placeholder="e.g. Editorial Photographer & Visual Artist"
                  className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#262118] focus:border-[#c8a54a] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                  Headline Tagline
                </label>
                <input
                  type="text"
                  value={portfolio.tagline}
                  onChange={(e) => setPortfolio({ ...portfolio, tagline: e.target.value })}
                  placeholder="Brief one-sentence positioning"
                  className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#262118] focus:border-[#c8a54a] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                  Artist Statement / Bio
                </label>
                <textarea
                  rows={4}
                  value={portfolio.bio}
                  onChange={(e) => setPortfolio({ ...portfolio, bio: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#262118] focus:border-[#c8a54a] text-white outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={portfolio.location}
                    onChange={(e) => setPortfolio({ ...portfolio, location: e.target.value })}
                    className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#262118] focus:border-[#c8a54a] text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                    Discipline Tag
                  </label>
                  <input
                    type="text"
                    value={portfolio.discipline}
                    onChange={(e) => setPortfolio({ ...portfolio, discipline: e.target.value })}
                    className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#262118] focus:border-[#c8a54a] text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={portfolio.email}
                    onChange={(e) => setPortfolio({ ...portfolio, email: e.target.value })}
                    className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#262118] focus:border-[#c8a54a] text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={portfolio.phone}
                    onChange={(e) => setPortfolio({ ...portfolio, phone: e.target.value })}
                    className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#0c0a08] border border-[#262118] focus:border-[#c8a54a] text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Aesthetics & Style */}
          {activeTab === "style" && (
            <div className="bg-[#14120e] border border-[#262118] rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-base font-serif text-white mb-2">Palette Atmosphere</h2>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { id: "noir", label: "Atelier Noir", desc: "Charcoal & Royal Gold" },
                      { id: "solar", label: "Solar Gold", desc: "Warm Obsidian & Ochre" },
                      { id: "ivory", label: "Editorial Ivory", desc: "Light Paper & Bronze" },
                      { id: "cyber", label: "Cyber Minimal", desc: "Deep Midnight & Cyan" },
                    ] as const
                  ).map((th) => (
                    <button
                      key={th.id}
                      onClick={() => setPortfolio({ ...portfolio, theme: th.id })}
                      className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                        portfolio.theme === th.id
                          ? "border-[#c8a54a] bg-[#1d1912]"
                          : "border-[#262118] bg-[#0c0a08] hover:border-neutral-700"
                      }`}
                    >
                      <div className="text-xs font-semibold text-white">{th.label}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">{th.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-base font-serif text-white mb-2">Typography Pairing</h2>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { id: "serif", label: "Luxury Serif", desc: "DM Serif Display" },
                      { id: "modern", label: "Modern Sans", desc: "Work Sans" },
                      { id: "mono", label: "Technical Mono", desc: "DM Mono" },
                    ] as const
                  ).map((ty) => (
                    <button
                      key={ty.id}
                      onClick={() => setPortfolio({ ...portfolio, typography: ty.id })}
                      className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                        portfolio.typography === ty.id
                          ? "border-[#c8a54a] bg-[#1d1912]"
                          : "border-[#262118] bg-[#0c0a08] hover:border-neutral-700"
                      }`}
                    >
                      <div className="text-xs font-semibold text-white">{ty.label}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{ty.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Curated Projects */}
          {activeTab === "projects" && (
            <div className="bg-[#14120e] border border-[#262118] rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-serif text-white">
                  {editingProjectId ? "Edit Project Item" : "Add Portfolio Showcase"}
                </h2>
                {editingProjectId && (
                  <button
                    onClick={() => {
                      setEditingProjectId(null);
                      setNewProject({
                        id: "",
                        title: "",
                        category: "Commercial Photography",
                        year: new Date().getFullYear().toString(),
                        client: "",
                        description: "",
                        imageUrl: "",
                        tags: [],
                      });
                    }}
                    className="text-xs text-neutral-400 hover:text-white"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="space-y-3 bg-[#0c0a08] p-4 rounded-xl border border-[#262118]">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Kente Royalty Lookbook"
                    className="w-full text-sm px-3 py-2 rounded-lg bg-[#14120e] border border-[#262118] text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      placeholder="e.g. Visual Identity"
                      className="w-full text-sm px-3 py-2 rounded-lg bg-[#14120e] border border-[#262118] text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      value={newProject.year}
                      onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                      placeholder="2025"
                      className="w-full text-sm px-3 py-2 rounded-lg bg-[#14120e] border border-[#262118] text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newProject.imageUrl}
                    onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-sm px-3 py-2 rounded-lg bg-[#14120e] border border-[#262118] text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c8a54a] mb-1">
                    Brief Description
                  </label>
                  <textarea
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Story and technique..."
                    className="w-full text-sm px-3 py-2 rounded-lg bg-[#14120e] border border-[#262118] text-white outline-none resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddProject}
                  className="w-full py-2 rounded-lg bg-[#c8a54a] hover:bg-[#d6b55e] text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  {editingProjectId ? "Save Changes" : "+ Add Project To Showcase"}
                </button>
              </div>

              {/* List of current projects */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Current Projects ({portfolio.projects.length})
                </div>
                {portfolio.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0c0a08] border border-[#262118]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={proj.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{proj.title}</div>
                        <div className="text-xs text-neutral-400 font-mono">
                          {proj.category} &bull; {proj.year}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="text-xs text-neutral-400 hover:text-white px-2 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-xs text-red-400 hover:text-red-300 px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Skills & Clients */}
          {activeTab === "skills" && (
            <div className="bg-[#14120e] border border-[#262118] rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-base font-serif text-white mb-2">Core Skills & Specialties</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {portfolio.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0a08] border border-[#262118] text-xs text-neutral-300"
                    >
                      {skill}
                      <button
                        onClick={() =>
                          setPortfolio({
                            ...portfolio,
                            skills: portfolio.skills.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-neutral-500 hover:text-red-400 cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type skill & press Enter..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      e.preventDefault();
                      setPortfolio({
                        ...portfolio,
                        skills: [...portfolio.skills, e.currentTarget.value.trim()],
                      });
                      e.currentTarget.value = "";
                    }
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-[#0c0a08] border border-[#262118] text-white outline-none"
                />
              </div>

              <div>
                <h2 className="text-base font-serif text-white mb-2">Featured Clients & Brands</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {portfolio.clients.map((client, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0a08] border border-[#262118] text-xs text-[#c8a54a]"
                    >
                      {client}
                      <button
                        onClick={() =>
                          setPortfolio({
                            ...portfolio,
                            clients: portfolio.clients.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-neutral-500 hover:text-red-400 cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type client & press Enter..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      e.preventDefault();
                      setPortfolio({
                        ...portfolio,
                        clients: [...portfolio.clients, e.currentTarget.value.trim()],
                      });
                      e.currentTarget.value = "";
                    }
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-[#0c0a08] border border-[#262118] text-white outline-none"
                />
              </div>
            </div>
          )}

          {/* Connect to Studio CTA */}
          <div className="p-5 rounded-2xl bg-[#14120e] border border-[#3d3216] flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-serif text-white font-medium">Ready for Studio Production?</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                Send this brief directly to our team for custom design or print fulfillment.
              </div>
            </div>
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Right Column: Live Luxury Preview */}
        <div className="lg:col-span-7 sticky top-28">
          <div className="flex items-center justify-between mb-3 no-print">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Live Portfolio Presentation
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#14120e] border border-[#262118] rounded-lg p-0.5">
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`px-3 py-1 text-[11px] font-mono rounded cursor-pointer ${
                  previewMode === "desktop" ? "bg-[#262118] text-white" : "text-neutral-500"
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                className={`px-3 py-1 text-[11px] font-mono rounded cursor-pointer ${
                  previewMode === "mobile" ? "bg-[#262118] text-white" : "text-neutral-500"
                }`}
              >
                Mobile
              </button>
            </div>
          </div>

          {/* The Preview Frame */}
          <div
            ref={previewRef}
            className={`portfolio-preview mx-auto transition-all duration-300 rounded-3xl border shadow-2xl overflow-hidden ${
              previewMode === "mobile" ? "max-w-sm" : "w-full"
            }`}
            style={{
              backgroundColor: themeStyles.bg,
              borderColor: themeStyles.border,
              color: themeStyles.text,
            }}
          >
            {/* Portfolio Header */}
            <div className="p-8 sm:p-10 border-b" style={{ borderColor: themeStyles.border }}>
              <div
                className="text-xs font-mono uppercase tracking-widest mb-3"
                style={{ color: themeStyles.accent }}
              >
                {portfolio.discipline} &bull; {portfolio.location}
              </div>

              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
                style={{ fontFamily, color: themeStyles.text }}
              >
                {portfolio.creatorName || "Your Name"}
              </h2>

              <p className="text-sm font-medium mb-4" style={{ color: themeStyles.subtext }}>
                {portfolio.title}
              </p>

              <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: themeStyles.subtext }}>
                {portfolio.bio}
              </p>

              <div
                className="flex flex-wrap gap-y-2 gap-x-6 text-xs font-mono pt-4 border-t"
                style={{ borderColor: themeStyles.border, color: themeStyles.subtext }}
              >
                <span>✉ {portfolio.email}</span>
                <span>☎ {portfolio.phone}</span>
                {portfolio.instagram && <span>◈ {portfolio.instagram}</span>}
              </div>
            </div>

            {/* Skills & Clients Bar */}
            {(portfolio.skills.length > 0 || portfolio.clients.length > 0) && (
              <div className="px-8 py-5 border-b" style={{ borderColor: themeStyles.border }}>
                <div className="text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: themeStyles.accent }}>
                  Disciplines &amp; Collaborations
                </div>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{ background: themeStyles.cardBg, border: `1px solid ${themeStyles.border}` }}
                    >
                      {s}
                    </span>
                  ))}
                  {portfolio.clients.map((c, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md font-semibold"
                      style={{
                        background: themeStyles.cardBg,
                        border: `1px solid ${themeStyles.accent}`,
                        color: themeStyles.accent,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Showcase */}
            <div className="p-8 sm:p-10 space-y-6">
              <div className="flex items-center justify-between">
                <div
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: themeStyles.accent }}
                >
                  Selected Works ({portfolio.projects.length})
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {portfolio.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-2xl overflow-hidden border transition-all duration-300"
                    style={{
                      backgroundColor: themeStyles.cardBg,
                      borderColor: themeStyles.border,
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div
                        className="text-[10px] font-mono uppercase tracking-wider mb-1"
                        style={{ color: themeStyles.accent }}
                      >
                        {proj.category} &bull; {proj.year}
                      </div>
                      <h3
                        className="text-base font-semibold mb-2"
                        style={{ fontFamily, color: themeStyles.text }}
                      >
                        {proj.title}
                      </h3>
                      <p
                        className="text-xs leading-relaxed line-clamp-3"
                        style={{ color: themeStyles.subtext }}
                      >
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="p-6 text-center text-xs font-mono border-t"
              style={{ borderColor: themeStyles.border, color: themeStyles.subtext }}
            >
              Curated via iDESIGN Studio &bull; Digital Portfolio Builder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Builder;
