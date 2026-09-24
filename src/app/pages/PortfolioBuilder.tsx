import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { saveUserPortfolio, type BuilderProject, type UserPortfolio } from "../api";
import { THEME_PRESETS } from "@/tokens";

const starterProjects: BuilderProject[] = [
  { id: "project-1", title: "Signature Identity", category: "Branding", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&auto=format&q=95", description: "A considered visual system for a growing brand." },
  { id: "project-2", title: "Campaign Stories", category: "Photography", imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&auto=format&q=95", description: "Editorial imagery made to move people." },
  { id: "project-3", title: "Launch Direction", category: "Creative Direction", imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&auto=format&q=95", description: "A focused campaign language from concept to delivery." },
];

const initialPortfolio: Omit<UserPortfolio, "id" | "createdAt"> = {
  name: "Your Name", headline: "Independent creative director", bio: "I make visual work that gives thoughtful brands a distinct presence.", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&auto=format&q=95", theme: "obsidian-gold", layout: "editorial", accentColor: "#c8a54a", email: "hello@example.com", location: "Accra, Ghana", socialLinks: { instagram: "", behance: "", website: "" }, projects: starterProjects,
};

export function PortfolioBuilder() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const theme = THEME_PRESETS[portfolio.theme];
  const previewStyle = useMemo(() => ({ background: theme.bg, color: theme.text, "--accent": portfolio.accentColor } as React.CSSProperties), [theme, portfolio.accentColor]);

  const update = <K extends keyof typeof portfolio>(key: K, value: (typeof portfolio)[K]) => setPortfolio((current) => ({ ...current, [key]: value }));
  const updateProject = (id: string, field: keyof BuilderProject, value: string) => setPortfolio((current) => ({ ...current, projects: current.projects.map((project) => project.id === id ? { ...project, [field]: value } : project) }));
  const addProject = () => update("projects", [...portfolio.projects, { id: `project-${Date.now()}`, title: "New Project", category: "Selected Work", imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&auto=format&q=95", description: "Describe the work and its impact." }]);
  const save = async () => {
    setSaving(true); setNotice("");
    const result = await saveUserPortfolio(portfolio);
    setSaving(false);
    setNotice(result.ok ? "Portfolio saved. Your shareable preview is ready." : result.errors?.[0] || "Could not save the portfolio.");
  };

  return <div style={{ background: "#efebe4", minHeight: "100vh", padding: "2rem clamp(1rem, 3vw, 3rem) 4rem" }}>
    <div style={{ maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}><p style={{ fontFamily: "'DM Mono', monospace", color: "#8e6f25", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase" }}>Portfolio Builder</p><h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 4vw, 3.7rem)", fontWeight: 400 }}>Build the work into a home.</h1></div>
      <div className="builder-shell">
        <section className="builder-controls">
          <label>Portfolio name<input value={portfolio.name} onChange={(e) => update("name", e.target.value)} /></label>
          <label>Headline<input value={portfolio.headline} onChange={(e) => update("headline", e.target.value)} /></label>
          <label>Short bio<textarea value={portfolio.bio} onChange={(e) => update("bio", e.target.value)} rows={3} /></label>
          <div className="builder-row"><label>Email<input value={portfolio.email} onChange={(e) => update("email", e.target.value)} /></label><label>Location<input value={portfolio.location} onChange={(e) => update("location", e.target.value)} /></label></div>
          <label>Portrait image URL<input value={portfolio.avatar} onChange={(e) => update("avatar", e.target.value)} /></label>
          <div className="builder-row"><label>Theme<select value={portfolio.theme} onChange={(e) => update("theme", e.target.value as UserPortfolio["theme"])}>{Object.entries(THEME_PRESETS).map(([id, preset]) => <option key={id} value={id}>{preset.name}</option>)}</select></label><label>Layout<select value={portfolio.layout} onChange={(e) => update("layout", e.target.value as UserPortfolio["layout"])}><option value="editorial">Editorial</option><option value="masonry">Masonry</option><option value="minimal">Minimal</option><option value="split">Split</option></select></label></div>
          <label>Accent color<input type="color" value={portfolio.accentColor} onChange={(e) => update("accentColor", e.target.value)} /></label>
          <div className="builder-project-head"><span>Selected work</span><button onClick={addProject} aria-label="Add project" title="Add project">+</button></div>
          {portfolio.projects.map((project) => <div key={project.id} className="builder-project"><input aria-label="Project title" value={project.title} onChange={(e) => updateProject(project.id, "title", e.target.value)} /><input aria-label="Project category" value={project.category} onChange={(e) => updateProject(project.id, "category", e.target.value)} /><input aria-label="Project image URL" value={project.imageUrl} onChange={(e) => updateProject(project.id, "imageUrl", e.target.value)} /><button onClick={() => update("projects", portfolio.projects.filter((item) => item.id !== project.id))} aria-label={`Remove ${project.title}`} title="Remove project">Remove</button></div>)}
          <button className="builder-save" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save portfolio"}</button>{notice && <p className="builder-notice">{notice}</p>}
        </section>
        <motion.section className={`portfolio-preview layout-${portfolio.layout}`} style={previewStyle} layout>
          <div className="preview-top"><img src={portfolio.avatar} alt="" /><span>{portfolio.name}</span><span>Available for select projects</span></div>
          <div className="preview-intro"><p>{portfolio.location}</p><h2>{portfolio.headline}</h2><p>{portfolio.bio}</p><a href={`mailto:${portfolio.email}`}>Start a conversation</a></div>
          <div className="preview-grid">{portfolio.projects.map((project) => <article key={project.id}><img src={project.imageUrl} alt={project.title} /><p>{project.category}</p><h3>{project.title}</h3><span>{project.description}</span></article>)}</div>
        </motion.section>
      </div>
    </div>
  </div>;
}
