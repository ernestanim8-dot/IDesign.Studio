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
  happyClients: number;
  clientSatisfaction: string;
  yearsExperience: number;
  servicesOffered: number;
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

const FALLBACK_STATS: StudioStats = {
  projectsCompleted: 340,
  happyClients: 80,
  clientSatisfaction: "100%",
  yearsExperience: 4,
  servicesOffered: 3,
  activeInquiriesThisWeek: 0,
};

async function readJsonResponse<T>(res: Response, fallback: T): Promise<T> {
  try {
    const text = await res.text();
    if (!text.trim()) return fallback;
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
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

export async function createTestimonial(
  review: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
    quote: string;
    rating?: number;
    project?: string;
  },
  adminToken?: string
): Promise<{ ok: boolean; testimonial?: Testimonial; error?: string; errors?: string[] }> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (adminToken) {
      headers.Authorization = `Bearer ${adminToken.trim()}`;
      headers["x-admin-token"] = adminToken.trim();
    }
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers,
      body: JSON.stringify(review),
    });
    return await readJsonResponse(res, { ok: false, error: "Empty server response." });
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

export async function deleteTestimonial(
  id: string,
  adminToken?: string
): Promise<{ ok: boolean; message?: string; error?: string }> {
  try {
    const headers: HeadersInit = {};
    if (adminToken) {
      headers.Authorization = `Bearer ${adminToken.trim()}`;
      headers["x-admin-token"] = adminToken.trim();
    }
    const res = await fetch(`/api/testimonials/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers,
    });
    return await readJsonResponse(res, { ok: false, error: "Failed to delete review." });
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

export async function verifyStudioPin(pin: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/auth/verify-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pin.trim() }),
    });
    const json = await readJsonResponse<{ ok?: boolean; error?: string }>(res, {});
    if (res.ok && json.ok) {
      return { ok: true };
    }
    return { ok: false, error: json.error || "Incorrect Studio PIN. Access restricted." };
  } catch (err) {
    return { ok: false, error: "Network error connecting to verification service." };
  }
}

export async function getInquiries(adminToken?: string): Promise<InquiryItem[]> {
  const headers: HeadersInit = {};
  if (adminToken) {
    headers.Authorization = `Bearer ${adminToken.trim()}`;
    headers["x-admin-token"] = adminToken.trim();
  }

  const res = await fetch("/api/inquiries", { headers });
  const json = await readJsonResponse<{ ok?: boolean; inquiries?: InquiryItem[]; errors?: string[]; error?: string }>(res, {});

  if (res.status === 401) {
    throw new Error("Invalid Studio PIN. Access restricted.");
  }
  if (!res.ok) {
    const serverMsg = json.errors?.[0] || json.error || `Server error ${res.status}`;
    throw new Error(serverMsg);
  }
  return json.inquiries || [];
}

export async function updateInquiryStatus(
  id: string,
  status: string,
  adminToken?: string
): Promise<{ ok: boolean; inquiry?: InquiryItem; errors?: string[] }> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (adminToken) headers.Authorization = `Bearer ${adminToken}`;
    const res = await fetch(`/api/inquiries/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    return await readJsonResponse(res, { ok: false, errors: ["The server returned an empty response."] });
  } catch (err) {
    return { ok: false, errors: [err instanceof Error ? err.message : "Failed to update inquiry"] };
  }
}

export async function submitInquiry(payload: {
  fullName: string;
  email: string;
  phone?: string;
  interest: string;
  timeline: string;
  budget?: string;
  message?: string;
}): Promise<{ ok: boolean; message?: string; errors?: string[] }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: any = null;
    try {
      data = text.trim() ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (res.ok && data?.ok) {
      return data;
    }

    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return { ok: false, errors: data.errors };
    }

    if (!res.ok) {
      const errMsg = data?.errors?.[0] || data?.message || (text.length < 200 ? text : "") || `Server status ${res.status}`;
      return { ok: false, errors: [errMsg] };
    }

    return data || { ok: true, message: "Inquiry received successfully. We will get back to you shortly." };
  } catch (err) {
    return { ok: false, errors: [err instanceof Error ? err.message : "Network error"] };
  }
}

export async function deleteInquiry(
  id: string,
  adminToken?: string
): Promise<{ ok: boolean; message?: string; errors?: string[] }> {
  try {
    const headers: HeadersInit = {};
    if (adminToken) {
      headers.Authorization = `Bearer ${adminToken.trim()}`;
      headers["x-admin-token"] = adminToken.trim();
    }
    const res = await fetch(`/api/inquiries/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers,
    });
    return await readJsonResponse(res, { ok: false, errors: ["Failed to delete inquiry."] });
  } catch (err) {
    return { ok: false, errors: [err instanceof Error ? err.message : "Network error"] };
  }
}

export async function updateStats(
  stats: Partial<StudioStats>,
  adminToken?: string
): Promise<{ ok: boolean; stats?: StudioStats; error?: string }> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (adminToken) {
      headers.Authorization = `Bearer ${adminToken.trim()}`;
      headers["x-admin-token"] = adminToken.trim();
    }
    const res = await fetch("/api/stats", {
      method: "POST",
      headers,
      body: JSON.stringify(stats),
    });
    const json = await readJsonResponse<{ ok?: boolean; stats?: StudioStats; error?: string }>(res, {});
    if (res.ok && json.ok) {
      return { ok: true, stats: json.stats };
    }
    return { ok: false, error: json.error || "Failed to update stats" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  year: string;
  client?: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface DigitalPortfolio {
  id?: string;
  creatorName: string;
  title: string;
  tagline: string;
  bio: string;
  discipline: string;
  location: string;
  email: string;
  phone: string;
  instagram?: string;
  theme: "noir" | "solar" | "ivory" | "cyber";
  typography: "serif" | "modern" | "mono";
  projects: PortfolioProject[];
  skills: string[];
  clients: string[];
  createdAt?: string;
  updatedAt?: string;
}

export async function savePortfolioConfig(
  portfolio: DigitalPortfolio
): Promise<{ ok: boolean; id?: string; portfolio?: DigitalPortfolio; error?: string }> {
  try {
    const res = await fetch("/api/builder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portfolio),
    });
    return await readJsonResponse(res, { ok: false, error: "Failed to save portfolio." });
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

export async function getPortfolioConfig(
  id: string
): Promise<{ ok: boolean; portfolio?: DigitalPortfolio; error?: string }> {
  try {
    const res = await fetch(`/api/builder/${encodeURIComponent(id)}`);
    return await readJsonResponse(res, { ok: false, error: "Failed to load portfolio." });
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

