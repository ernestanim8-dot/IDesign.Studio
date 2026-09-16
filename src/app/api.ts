export interface Project {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  year: string;
  client: string;
  description: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  startingPrice: string;
  timeline: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  project: string;
  date: string;
}

export interface StudioStats {
  projectsCompleted: number;
  clientSatisfaction: string;
  internationalClients: number;
  yearsExperience: number;
  awardsWon: number;
  activeInquiriesThisWeek: number;
}

export interface InquiryItem {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone?: string;
  interest: string;
  timeline: string;
  budget?: string;
  message: string;
  status: string;
}

export interface BuilderProject {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface UserPortfolio {
  id: string;
  createdAt?: string;
  name: string;
  headline: string;
  bio: string;
  avatar: string;
  theme: "obsidian-gold" | "warm-editorial" | "nordic-minimal" | "emerald-noir";
  layout: "masonry" | "editorial" | "minimal" | "split";
  accentColor: string;
  email: string;
  location: string;
  socialLinks: {
    instagram?: string;
    behance?: string;
    twitter?: string;
    website?: string;
  };
  projects: BuilderProject[];
}

const FALLBACK_STATS: StudioStats = {
  projectsCompleted: 184,
  clientSatisfaction: "99.4%",
  internationalClients: 38,
  yearsExperience: 9,
  awardsWon: 14,
  activeInquiriesThisWeek: 12,
};

async function readJsonResponse<T>(res: Response, fallback: T): Promise<T> {
  const text = await res.text();
  if (!text.trim()) return fallback;
  return JSON.parse(text) as T;
}

export async function getStats(): Promise<StudioStats> {
  try {
    const res = await fetch("/api/stats");
    if (!res.ok) throw new Error("Failed to fetch stats");
    const json = await readJsonResponse<{ stats?: StudioStats }>(res, {});
    return json.stats || FALLBACK_STATS;
  } catch {
    return FALLBACK_STATS;
  }
}

export async function getProjects(category?: string, q?: string): Promise<Project[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== "All") params.set("category", category);
    if (q) params.set("q", q);
    const res = await fetch(`/api/projects?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    const json = await readJsonResponse<{ projects?: Project[] }>(res, {});
    return json.projects || [];
  } catch {
    return [];
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch("/api/services");
    if (!res.ok) throw new Error("Failed to fetch services");
    const json = await readJsonResponse<{ services?: ServiceItem[] }>(res, {});
    return json.services || [];
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch("/api/testimonials");
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    const json = await readJsonResponse<{ testimonials?: Testimonial[] }>(res, {});
    return json.testimonials || [];
  } catch {
    return [];
  }
}

export async function getInquiries(adminToken?: string): Promise<InquiryItem[]> {
  const headers: HeadersInit = {};
  if (adminToken) headers.Authorization = `Bearer ${adminToken}`;

  const res = await fetch("/api/inquiries", { headers });
  if (!res.ok) throw new Error("Failed to fetch inquiries");
  const json = await readJsonResponse<{ inquiries?: InquiryItem[] }>(res, {});
  return json.inquiries || [];
}

export async function submitInquiry(payload: {
  fullName: string;
  email: string;
  phone?: string;
  interest: string;
  timeline: string;
  budget?: string;
  message: string;
}): Promise<{ ok: boolean; message?: string; errors?: string[] }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const fallback = res.ok
      ? { ok: true, message: "Inquiry received successfully. We will get back to you shortly." }
      : { ok: false, errors: ["The server returned an empty response."] };
    const result = await readJsonResponse(res, fallback);

    if (!res.ok && result.ok !== true) {
      return {
        ok: false,
        errors: result.errors || [`Request failed with status ${res.status}.`],
      };
    }

    return result;
  } catch (err) {
    return { ok: false, errors: [err instanceof Error ? err.message : "Network error"] };
  }
}

export async function getPortfolios(): Promise<UserPortfolio[]> {
  try {
    const res = await fetch("/api/builder");
    if (!res.ok) throw new Error("Failed to fetch portfolios");
    const json = await readJsonResponse<{ portfolios?: UserPortfolio[] }>(res, {});
    return json.portfolios || [];
  } catch {
    return [];
  }
}

export async function getPortfolioById(id: string): Promise<UserPortfolio | null> {
  try {
    const res = await fetch(`/api/builder/${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    const json = await readJsonResponse<{ portfolio?: UserPortfolio }>(res, {});
    return json.portfolio || null;
  } catch {
    return null;
  }
}

export async function saveUserPortfolio(
  portfolio: Omit<UserPortfolio, "id" | "createdAt">
): Promise<{ ok: boolean; portfolio?: UserPortfolio; errors?: string[] }> {
  try {
    const res = await fetch("/api/builder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portfolio),
    });
    return await readJsonResponse(res, {
      ok: false,
      errors: ["The server returned an empty response."],
    });
  } catch (err) {
    return { ok: false, errors: [err instanceof Error ? err.message : "Failed to save portfolio"] };
  }
}
