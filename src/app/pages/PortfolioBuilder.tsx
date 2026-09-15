import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveUserPortfolio, getPortfolios, type UserPortfolio, type BuilderProject } from "../api";
import { THEME_PRESETS } from "@/tokens";
import { ToastContainer, type ToastMessage } from "../components/Toast";

const INITIAL_PROJECTS: BuilderProject[] = [
  {
    id: "p-1",
    title: "Aura Haute Parfumerie",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&h=600&fit=crop&auto=format",
    description: "Bespoke gold-foiled packaging and tactile visual identity for bespoke Parisian fragrances.",
  },
  {
    id: "p-2",
    title: "Sahara Golden Hour",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&h=600&fit=crop&auto=format",
    description: "Editorial fashion series investigating silhouettes against dramatic desert textures.",
  },
  {
    id: "p-3",
    title: "Solstice Pavilion Renders",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=600&fit=crop&auto=format",
    description: "Atmospheric architectural visualization and editorial publication for tropical modern residences.",
  },
  {
    id: "p-4",
    title: "Kinfolk Studio Monograph",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&h=600&fit=crop&auto=format",
    description: "High-contrast black and white medium-format portraits highlighting raw emotion and craft.",
  },
];

const CURATED_IMAGE_PRESETS = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=900&h=600&fit=crop&auto=format",
];

export function PortfolioBuilder() {
  // Builder Configuration State
  const [name, setName] = useState("Ernest Anim");
  const [headline, setHeadline] = useState("Visual Designer & Photographer");
  const [bio, setBio] = useState(
    "Crafting evocative brand stories, fine art portraiture, and sleek digital experiences with an obsession for typography and golden ratios."
  );
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces&auto=format"
  );
  const [theme, setTheme] = useState<keyof typeof THEME_PRESETS>("obsidian-gold");
  const [layout, setLayout] = useState<"masonry" | "editorial" | "minimal" | "split">("masonry");
  const [accentColor, setAccentColor] = useState("#c8a54a");
  const [email, setEmail] = useState("idesign6048@gmail.com");
  const [location, setLocation] = useState("Accra & Global");
  const [instagram, setInstagram] = useState("@idesign_creative");
  const [behance, setBehance] = useState("idesign.studio");
  const [projects, setProjects] = useState<BuilderProject[]>(INITIAL_PROJECTS);

  // New Project Form Modal State
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Branding");
  const [newImageUrl, setNewImageUrl] = useState(CURATED_IMAGE_PRESETS[0]);
  const [newDescription, setNewDescription] = useState("");

  // Preview & Viewport State
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activePreviewCategory, setActivePreviewCategory] = useState<string>("All");
  const [isSaving, setIsSaving] = useState(false);
  const [savedPortfolioId, setSavedPortfolioId] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = "t-" + Date.now() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Active Theme Styles
  const currentTheme = THEME_PRESETS[theme];

  // Add Project Action
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      addToast("Please provide a project title.", "error");
      return;
    }
    const newP: BuilderProject = {
      id: "proj-" + Date.now(),
      title: newTitle.trim(),
      category: newCategory.trim() || "Design",
      imageUrl: newImageUrl || CURATED_IMAGE_PRESETS[0],
      description: newDescription.trim() || "Creative portfolio highlight.",
    };
    setProjects([newP, ...projects]);
    setIsAddingProject(false);
    setNewTitle("");
    setNewDescription("");
    addToast(`Added "${newP.title}" to showcase.`);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    addToast("Project removed from showcase.", "info");
  };

  // 1-Click Fill
  const handleLoadSample = () => {
    setProjects(INITIAL_PROJECTS);
    setName("Ernest Anim");
    setHeadline("Creative Director & Photographer");
    setBio(
      "Directing luxury visual campaigns, editorial portraiture, and high-impact identity systems across West Africa and worldwide."
    );
    setTheme("obsidian-gold");
    setLayout("masonry");
    addToast("Reset to sample portfolio showcase.");
  };

  // Save to Backend
  const handleSaveToBackend = async () => {
    setIsSaving(true);
    try {
      const result = await saveUserPortfolio({
        name,
        headline,
        bio,
        avatar,
        theme,
        layout,
        accentColor,
        email,
        location,
        socialLinks: {
          instagram,
          behance,
        },
        projects,
      });

      if (result.ok && result.portfolio) {
        setSavedPortfolioId(result.portfolio.id);
        addToast("Portfolio saved successfully to backend database!", "success");
      } else {
        throw new Error(result.errors?.[0] || "Save failed");
      }
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Failed to connect to backend", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const data = {
      name,
      headline,
      bio,
      avatar,
      theme,
      layout,
      accentColor,
      email,
      location,
      socialLinks: { instagram, behance },
      projects,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, "-")}-portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("Exported portfolio configuration JSON.", "success");
  };

  // Filtered preview projects
  const previewCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const displayedProjects =
    activePreviewCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activePreviewCategory);

  return (
    <div className="min-h-screen bg-[#0d0c09] text-[#f2ede5] flex flex-col">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Top Banner & Action Header */}
      <header className="border-b border-[#25221b] bg-[#14120e]/95 backdrop-blur-md sticky top-[68px] z-40 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c8a54a] to-[#8f6d22] flex items-center justify-center font-serif text-black font-bold text-lg shadow-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg tracking-wide text-white">Digital Portfolio Builder</h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#c8a54a]/20 text-[#e4c06e] border border-[#c8a54a]/40">
                Full-Stack
              </span>
            </div>
            <p className="text-xs text-[#9a9183]">
              Craft, theme, preview, and deploy custom creative portfolios to the REST backend.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleLoadSample}
            className="px-3 py-1.5 rounded-lg border border-[#332f25] hover:border-[#c8a54a] text-xs font-mono text-[#bfb7aa] transition-colors"
          >
            ↺ Reset Sample
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-lg border border-[#332f25] hover:border-[#c8a54a] text-xs font-mono text-[#bfb7aa] transition-colors"
          >
            ↓ Export JSON
          </button>
          <button
            onClick={handleSaveToBackend}
            disabled={isSaving}
            className="px-4 py-1.5 rounded-lg bg-[#c8a54a] hover:bg-[#e4c06e] text-black text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Saving to Server...
              </>
            ) : (
              <>
                <span>☁️</span>
                Save & Publish
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Split Interface */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT COLUMN: Controls & Content Suite (5 cols) */}
        <div className="lg:col-span-5 border-r border-[#25221b] bg-[#110f0c] p-6 lg:overflow-y-auto max-h-[calc(100vh-140px)] space-y-8">
          {/* Section 1: Identity & Bio */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase font-mono tracking-widest text-[#c8a54a] flex items-center gap-2">
                <span>01</span> Creator Persona
              </h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#b0a798] mb-1">Portfolio Title / Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181612] border border-[#2d2921] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#c8a54a] transition-colors"
                  placeholder="e.g. Ernest Studio"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#b0a798] mb-1">Headline / Discipline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[#181612] border border-[#2d2921] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#c8a54a] transition-colors"
                  placeholder="e.g. Visual Director & Photographer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#b0a798] mb-1">Bio / Creative Manifesto</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-[#181612] border border-[#2d2921] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#c8a54a] transition-colors resize-none leading-relaxed"
                  placeholder="Briefly state your vision, craft, and passion..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#b0a798] mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181612] border border-[#2d2921] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c8a54a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#b0a798] mb-1">Base Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#181612] border border-[#2d2921] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c8a54a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#b0a798] mb-1">Instagram</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-[#181612] border border-[#2d2921] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c8a54a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#b0a798] mb-1">Behance / Portfolio</label>
                  <input
                    type="text"
                    value={behance}
                    onChange={(e) => setBehance(e.target.value)}
                    className="w-full bg-[#181612] border border-[#2d2921] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c8a54a]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Visual Style & Themes */}
          <div className="space-y-4 pt-4 border-t border-[#232018]">
            <h2 className="text-xs uppercase font-mono tracking-widest text-[#c8a54a] flex items-center gap-2">
              <span>02</span> Palette & Layout Architecture
            </h2>

            {/* Theme Presets */}
            <div>
              <label className="block text-xs font-medium text-[#b0a798] mb-2">Aesthetic Theme Preset</label>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(THEME_PRESETS) as Array<keyof typeof THEME_PRESETS>).map((key) => {
                  const t = THEME_PRESETS[key];
                  const isSelected = theme === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-[#c8a54a] bg-[#1e1a14] shadow-md"
                          : "border-[#28241d] bg-[#161410] hover:border-[#3d372c]"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="block text-xs font-medium text-white">{t.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: t.bg }}
                          />
                          <span
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: t.surface }}
                          />
                          <span
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: t.accent }}
                          />
                        </div>
                      </div>
                      {isSelected && <span className="text-[#c8a54a] text-xs font-mono">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Layout Style */}
            <div>
              <label className="block text-xs font-medium text-[#b0a798] mb-2">Showcase Layout Mode</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "masonry", label: "Masonry" },
                  { id: "editorial", label: "Editorial" },
                  { id: "minimal", label: "Minimal" },
                  { id: "split", label: "Split" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id as any)}
                    className={`py-2 px-3 rounded-md text-xs font-mono text-center border transition-all ${
                      layout === l.id
                        ? "border-[#c8a54a] bg-[#c8a54a]/15 text-[#e4c06e]"
                        : "border-[#28241d] bg-[#161410] text-neutral-400 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Projects Showcase Manager */}
          <div className="space-y-4 pt-4 border-t border-[#232018]">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase font-mono tracking-widest text-[#c8a54a] flex items-center gap-2">
                <span>03</span> Portfolio Works ({projects.length})
              </h2>
              <button
                onClick={() => setIsAddingProject(true)}
                className="text-xs px-2.5 py-1 rounded bg-[#c8a54a]/20 hover:bg-[#c8a54a]/30 text-[#e4c06e] border border-[#c8a54a]/40 font-mono transition-colors"
              >
                + Add Project
              </button>
            </div>

            {/* Project List */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-3 rounded-lg border border-[#29251e] bg-[#171511] flex items-center justify-between gap-3 group"
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-12 h-12 object-cover rounded border border-[#383329]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">{proj.title}</h4>
                    <p className="text-[11px] text-[#91887b]">{proj.category}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="text-neutral-500 hover:text-red-400 p-1 text-xs opacity-60 group-hover:opacity-100 transition-opacity"
                    title="Remove project"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Device Previewer (7 cols) */}
        <div className="lg:col-span-7 bg-[#080706] p-4 sm:p-8 flex flex-col items-center justify-start overflow-y-auto min-h-[600px]">
          {/* Device Switcher Bar */}
          <div className="w-full max-w-4xl mb-4 flex items-center justify-between bg-[#14120e] p-2 rounded-xl border border-[#26231c]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#a39a8c]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Real-Time Interactive Preview</span>
            </div>

            {/* Device Frame Buttons */}
            <div className="flex items-center gap-1 bg-[#0d0c09] p-1 rounded-lg border border-[#22201a]">
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  previewDevice === "desktop"
                    ? "bg-[#c8a54a] text-black font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setPreviewDevice("tablet")}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  previewDevice === "tablet"
                    ? "bg-[#c8a54a] text-black font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  previewDevice === "mobile"
                    ? "bg-[#c8a54a] text-black font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Mobile
              </button>
            </div>
          </div>

          {/* Dynamic Preview Container */}
          <div
            className={`transition-all duration-300 shadow-2xl rounded-2xl border overflow-hidden w-full flex flex-col ${
              previewDevice === "mobile"
                ? "max-w-[390px] border-[#383329]"
                : previewDevice === "tablet"
                ? "max-w-[768px] border-[#383329]"
                : "max-w-4xl border-[#2a261f]"
            }`}
            style={{
              backgroundColor: currentTheme.bg,
              color: currentTheme.text,
              minHeight: "560px",
            }}
          >
            {/* Mock Browser Header / Status Bar */}
            <div
              className="px-4 py-2.5 border-b flex items-center justify-between text-[11px]"
              style={{
                borderColor: currentTheme.border,
                backgroundColor: currentTheme.surface,
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono text-[10px] opacity-60">
                https://portfolio.idesign.studio/{name.toLowerCase().replace(/\s+/g, "")}
              </span>
              <span className="font-mono text-[10px] opacity-40">SSL Active</span>
            </div>

            {/* Rendered Portfolio Site View */}
            <div className="p-6 sm:p-10 space-y-8 flex-1">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b" style={{ borderColor: currentTheme.border }}>
                <div className="flex items-center gap-4">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 shadow-lg"
                    style={{ borderColor: currentTheme.accent }}
                  />
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                      {name || "Your Name"}
                    </h3>
                    <p
                      className="text-xs sm:text-sm font-medium tracking-wide uppercase font-mono mt-0.5"
                      style={{ color: currentTheme.accent }}
                    >
                      {headline || "Creative Specialist"}
                    </p>
                    <p className="text-xs mt-1 opacity-70">📍 {location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition-transform hover:scale-105"
                    style={{
                      backgroundColor: currentTheme.accent,
                      color: currentTheme.bg === "#0d0c09" || currentTheme.bg === "#0a0a0c" || currentTheme.bg === "#07120e" ? "#000000" : "#ffffff",
                    }}
                  >
                    Inquire / Work With Me
                  </a>
                </div>
              </div>

              {/* Bio */}
              <p
                className="text-sm sm:text-base leading-relaxed max-w-2xl font-light"
                style={{ color: currentTheme.muted }}
              >
                "{bio}"
              </p>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                {previewCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActivePreviewCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      activePreviewCategory === cat
                        ? "shadow-sm font-semibold"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    style={{
                      backgroundColor: activePreviewCategory === cat ? currentTheme.accent : "transparent",
                      color:
                        activePreviewCategory === cat
                          ? currentTheme.bg === "#faf8f4"
                            ? "#ffffff"
                            : "#000000"
                          : currentTheme.text,
                      border: `1px solid ${currentTheme.border}`,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid based on chosen Layout */}
              <div
                className={`grid gap-6 ${
                  layout === "masonry"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : layout === "editorial"
                    ? "grid-cols-1"
                    : layout === "minimal"
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {displayedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="group rounded-xl overflow-hidden border transition-all hover:shadow-xl"
                    style={{
                      backgroundColor: currentTheme.surface,
                      borderColor: currentTheme.border,
                    }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2 py-0.5 rounded backdrop-blur-md"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.6)",
                          color: "#ffffff",
                        }}
                      >
                        {proj.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <h4 className="font-serif text-lg font-semibold">{proj.title}</h4>
                      <p className="text-xs leading-relaxed opacity-80" style={{ color: currentTheme.muted }}>
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer inside preview */}
              <div
                className="pt-8 border-t flex flex-wrap items-center justify-between gap-4 text-xs opacity-60"
                style={{ borderColor: currentTheme.border }}
              >
                <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
                <div className="flex gap-4">
                  {instagram && <span>{instagram}</span>}
                  {behance && <span>{behance}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {isAddingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#14120e] border border-[#383329] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#28241d] pb-3">
                <h3 className="font-serif text-lg text-white">Add Showcase Work</h3>
                <button
                  onClick={() => setIsAddingProject(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#b0a798] mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#1c1914] border border-[#2d2921] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c8a54a]"
                    placeholder="e.g. Noir Silk Brand Story"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#b0a798] mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-[#1c1914] border border-[#2d2921] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c8a54a]"
                    >
                      <option value="Branding">Branding</option>
                      <option value="Photography">Photography</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Creative Concept">Creative Concept</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#b0a798] mb-1">Image URL</label>
                    <input
                      type="url"
                      required
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full bg-[#1c1914] border border-[#2d2921] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c8a54a]"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Quick Presets for Image */}
                <div>
                  <label className="block text-[11px] font-mono text-[#8a8274] mb-1.5">Or Choose Curated Studio Visual:</label>
                  <div className="grid grid-cols-6 gap-2">
                    {CURATED_IMAGE_PRESETS.map((img, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setNewImageUrl(img)}
                        className={`aspect-video rounded border overflow-hidden transition-all ${
                          newImageUrl === img ? "border-[#c8a54a] ring-2 ring-[#c8a54a]/40" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="Preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#b0a798] mb-1">Description / Deliverables</label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-[#1c1914] border border-[#2d2921] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c8a54a] resize-none"
                    placeholder="Brief highlight about the project, role, or concept..."
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(false)}
                    className="px-4 py-2 rounded-lg border border-[#332f25] text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#c8a54a] hover:bg-[#e4c06e] text-black font-semibold text-xs tracking-wide transition-all shadow-md"
                  >
                    Add to Portfolio
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
