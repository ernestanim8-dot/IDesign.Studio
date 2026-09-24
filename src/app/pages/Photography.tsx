import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { Lightbox, type LightboxItem } from "@/app/components/Lightbox";

import blueMenPedestal from "@/imports/Photography/Commercial/Blue for men/blue-for-men-pedestal.jpg";
import blueMenSplashLight from "@/imports/Photography/Commercial/Blue for men/blue-for-men-splash-light.jpg";
import blueMenRosesVertical from "@/imports/Photography/Commercial/Blue for men/blue-for-men-roses-vertical.jpg";
import blueMenWaterSplash from "@/imports/Photography/Commercial/Blue for men/blue-for-men-water-splash.jpg";
import blueMenSmokeBox from "@/imports/Photography/Commercial/Blue for men/blue-for-men-smoke-box.jpg";

import pomadeImg1 from "@/imports/Photography/Commercial/Pomade/IMG_0063.jpg";
import pomadeImg2 from "@/imports/Photography/Commercial/Pomade/IMG_0068.jpg";

import rightGuardImg1 from "@/imports/Photography/Commercial/Right Guard/IMG_0075.jpg";
import rightGuardImg2 from "@/imports/Photography/Commercial/Right Guard/IMG_0083.jpg";
import rightGuardImg3 from "@/imports/Photography/Commercial/Right Guard/IMG_0084.jpg";
import rightGuardImg4 from "@/imports/Photography/Commercial/Right Guard/IMG_0112.jpg";
import rightGuardImg5 from "@/imports/Photography/Commercial/Right Guard/IMG_0114.jpg";

import watchImg1 from "@/imports/Photography/Commercial/Watch/IMG_0045.jpg";
import watchImg2 from "@/imports/Photography/Commercial/Watch/IMG_0047.jpg";

import frostyBiteImg1 from "@/imports/Photography/Food/Frosty Bite/IMG_0006.jpg";
import frostyBiteImg2 from "@/imports/Photography/Food/Frosty Bite/IMG_9978.jpg";
import frostyBiteImg3 from "@/imports/Photography/Food/Frosty Bite/IMG_9982.jpg";
import frostyBiteImg4 from "@/imports/Photography/Food/Frosty Bite/IMG_9985.jpg";
import frostyBiteImg5 from "@/imports/Photography/Food/Frosty Bite/IMG_9986.jpg";
import frostyBiteImg6 from "@/imports/Photography/Food/Frosty Bite/IMG_9996.jpg";

import waakyeImg1 from "@/imports/Photography/Food/Waakye/IMG_0036.jpg";
import waakyeImg2 from "@/imports/Photography/Food/Waakye/IMG_0038.jpg";

// Portrait Campaign 1: Amber Glow Studio Birthday
import bdayAmberCake from "@/imports/Photography/Portrait/Birthday/IMG_1020.jpg";
import bdayAmberCalling from "@/imports/Photography/Portrait/Birthday/IMG_1054.jpg";
import bdayAmberBalloon from "@/imports/Photography/Portrait/Birthday/IMG_0999.jpg";
import bdayAmberSitting from "@/imports/Photography/Portrait/Birthday/IMG_1002.jpg";

// Portrait Campaign 2: Electric Pop Studio
import bdayPopBallSmile from "@/imports/Photography/Portrait/Birthday/IMG_1106.jpg";
import bdayPopBallAction from "@/imports/Photography/Portrait/Birthday/IMG_1116.jpg";
import bdayPopSkirtTwirl from "@/imports/Photography/Portrait/Birthday/IMG_1168.jpg";
import bdayPopLaptopSmile from "@/imports/Photography/Portrait/Birthday/IMG_1269.jpg";
import bdayPopLaptopWork from "@/imports/Photography/Portrait/Birthday/IMG_1273.jpg";
import bdayPopPortrait from "@/imports/Photography/Portrait/Birthday/IMG_1313.jpg";

// Portrait Campaign 3: Golden Radiance & Emerald Couture
import bdayOutdoorYellowHero from "@/imports/Photography/Portrait/Birthday 2/IMG_6677.jpg";
import bdayOutdoorEmeraldCouture from "@/imports/Photography/Portrait/Birthday 2/IMG_6777.jpg";
import bdayOutdoorYellowWalk from "@/imports/Photography/Portrait/Birthday 2/IMG_6703.jpg";
import bdayOutdoorYellowBokeh from "@/imports/Photography/Portrait/Birthday 2/IMG_6744.jpg";
import bdayOutdoorYellowJoy from "@/imports/Photography/Portrait/Birthday 2/IMG_6721.jpg";


const CATEGORIES = ["All", "Product", "Food", "Commercial", "Portrait", "Documentary", "Still Life"];

/* ─── Gallery 1: Blue for Men ─────────────────────────────────────── */
const BLUE_FOR_MEN_GALLERY: LightboxItem[] = [
  {
    img: blueMenSplashLight,
    title: "Blue for Men — Liquid Splash & Light",
    category: "Product",
    client: "Blue for Men Fragrance",
    year: "2026",
    description:
      "High-speed water splash capture highlighting precision rim lighting, crisp droplet kinetics, and crystal glass reflections.",
  },
  {
    img: blueMenRosesVertical,
    title: "Blue for Men — Midnight Botanical",
    category: "Product",
    client: "Blue for Men Fragrance",
    year: "2026",
    description:
      "Vertical editorial flacon study with midnight backdrop, aqua rose floral accents, and pristine mirrored surface reflections.",
  },
  {
    img: blueMenWaterSplash,
    title: "Blue for Men — Kinetic Aqua Crown",
    category: "Product",
    client: "Blue for Men Fragrance",
    year: "2026",
    description:
      "Dynamic fluid crown sculpted around luxury cologne packaging with rising ambient smoke trails.",
  },
  {
    img: blueMenSmokeBox,
    title: "Blue for Men — Atmospheric Haze",
    category: "Product",
    client: "Blue for Men Fragrance",
    year: "2026",
    description:
      "Commercial still blending high-contrast black backdrop, liquid splash dynamics, and swirling atmospheric mist.",
  },
  {
    img: blueMenPedestal,
    title: "Blue for Men — Studio Pedestal",
    category: "Product",
    client: "Blue for Men Fragrance",
    year: "2026",
    description: "Minimalist pedestal showcase highlighting the architectural flacon silhouette.",
  },
];

/* ─── Gallery 2: Right Guard ───────────────────────────────────────── */
const RIGHT_GUARD_GALLERY: LightboxItem[] = [
  {
    img: rightGuardImg2,
    title: "Right Guard — Kinetic Water Crown",
    category: "Product",
    client: "Right Guard Sport",
    year: "2026",
    description:
      "High-speed fluid dynamics sculpted around the aerosol canister with crystal droplet kinetics and precision studio lighting.",
  },
  {
    img: rightGuardImg3,
    title: "Right Guard — Liquid Splash Impact",
    category: "Product",
    client: "Right Guard Sport",
    year: "2026",
    description:
      "Dynamic water splash impact capturing suspended droplets and high-energy brand motion.",
  },
  {
    img: rightGuardImg1,
    title: "Right Guard — Wide Dynamic Splash",
    category: "Product",
    client: "Right Guard Sport",
    year: "2026",
    description:
      "Wide commercial composition featuring lateral splash waves and sleek studio backdrop reflections.",
  },
  {
    img: rightGuardImg4,
    title: "Right Guard — Studio Still & Droplet Texture",
    category: "Product",
    client: "Right Guard Sport",
    year: "2026",
    description:
      "Crisp studio portrait highlighting fine moisture beading across the matte aerosol canister and chrome nozzle.",
  },
  {
    img: rightGuardImg5,
    title: "Right Guard — Backlit Atmospheric Mist",
    category: "Product",
    client: "Right Guard Sport",
    year: "2026",
    description:
      "Dramatic directional lighting accentuating translucent water sheets and an athletic atmospheric aura.",
  },
];

/* ─── Gallery 3: Artisanal Pomade ──────────────────────────────────── */
const POMADE_GALLERY: LightboxItem[] = [
  {
    img: pomadeImg1,
    title: "Artisanal Pomade — Flacon & Texture Study",
    category: "Product",
    client: "Classic Pomade Studio",
    year: "2026",
    description:
      "High-key studio composition highlighting rich pomade formulation, tactile substance textures, and amber jar transparency.",
  },
  {
    img: pomadeImg2,
    title: "Artisanal Pomade — Packaging & Elevation",
    category: "Product",
    client: "Classic Pomade Studio",
    year: "2026",
    description:
      "Dramatic rim lighting emphasizing metallic foil typography, polished lid reflections, and minimalist grooming presentation.",
  },
];

/* ─── Gallery 4: Luxury Watch ──────────────────────────────────────── */
const WATCH_GALLERY: LightboxItem[] = [
  {
    img: watchImg2,
    title: "Chronograph Horizon — Dial & Bevel Macro",
    category: "Product",
    client: "Horology Atelier",
    year: "2026",
    description:
      "Vertical macro horology study capturing brushed stainless steel bevels, sapphire crystal reflections, and textured dial indices.",
  },
  {
    img: watchImg1,
    title: "Chronograph Horizon — Horizon Profile & Leather",
    category: "Product",
    client: "Horology Atelier",
    year: "2026",
    description:
      "Angled macro perspective showcasing case contour architecture, knurled crown details, and hand-stitched leather strap grain.",
  },
];

/* ─── Gallery 5: Frosty Bite (Food) ────────────────────────────────── */
const FROSTY_BITE_GALLERY: LightboxItem[] = [
  {
    img: frostyBiteImg1,
    title: "Frosty Bite — Waffle & Gelato Tower",
    category: "Food",
    client: "Frosty Bite Creamery",
    year: "2026",
    description:
      "Decadent multi-layered sundae composition featuring velvety vanilla swirls, warm chocolate drizzle, and crisp waffle crisps.",
  },
  {
    img: frostyBiteImg5,
    title: "Frosty Bite — Confectionery Spread",
    category: "Food",
    client: "Frosty Bite Creamery",
    year: "2026",
    description:
      "Warm, inviting tabletop overhead showcase highlighting the full dessert lineup with delicate sugar dusting and vibrant garnishes.",
  },
  {
    img: frostyBiteImg3,
    title: "Frosty Bite — Strawberry Drizzle Sundae",
    category: "Food",
    client: "Frosty Bite Creamery",
    year: "2026",
    description:
      "Mouthwatering dessert presentation with fresh berry coulis, whipped cream swirls, and crisp wafer straws.",
  },
  {
    img: frostyBiteImg4,
    title: "Frosty Bite — Handcrafted Waffle Cone",
    category: "Food",
    client: "Frosty Bite Creamery",
    year: "2026",
    description:
      "Sensory food portrait capturing a freshly baked waffle cone cradling smooth, velvety artisan gelato.",
  },
  {
    img: frostyBiteImg2,
    title: "Frosty Bite — Artisanal Chocolate Ribbon",
    category: "Food",
    client: "Frosty Bite Creamery",
    year: "2026",
    description:
      "Close-up culinary study highlighting creamy scoop consistency and rich molten dark chocolate drizzle.",
  },
  {
    img: frostyBiteImg6,
    title: "Frosty Bite — Signature Gelato Cup",
    category: "Food",
    client: "Frosty Bite Creamery",
    year: "2026",
    description:
      "Individual serving presentation adorned with roasted nut toppings and decadent caramel swirl.",
  },
];

/* ─── Gallery 6: The Waakye Pot (Food) ─────────────────────────────── */
const WAAKYE_GALLERY: LightboxItem[] = [
  {
    img: waakyeImg2,
    title: "The Waakye Pot — Banana Leaf Heritage",
    category: "Food",
    client: "The Waakye Pot Kitchen",
    year: "2026",
    description:
      "Iconic Ghanaian culinary presentation served in traditional plantain leaves with aromatic shito, tender boiled egg, spaghetti, and seasoned proteins.",
  },
  {
    img: waakyeImg1,
    title: "The Waakye Pot — Feast Table Spread",
    category: "Food",
    client: "The Waakye Pot Kitchen",
    year: "2026",
    description:
      "Editorial culinary table setting highlighting golden fried plantains, rich tomato stew accompaniments, and fragrant sorghum-steeped rice and beans.",
  },
];

/* ─── Gallery 7: Amber Glow Studio Birthday (Portrait) ─────────────── */
const AMBER_BIRTHDAY_GALLERY: LightboxItem[] = [
  {
    img: bdayAmberCake,
    title: "Amber Glow — Birthday Cake & Candlelight",
    category: "Portrait",
    client: "Studio Birthday Commission",
    year: "2026",
    description:
      "Warm-toned studio birthday portrait capturing the intimate moment of blowing out the birthday cake candle with pastel balloons.",
  },
  {
    img: bdayAmberCalling,
    title: "Amber Glow — 'Birthday Is Calling'",
    category: "Portrait",
    client: "Studio Birthday Commission",
    year: "2026",
    description:
      "Playful candid studio portrait showcasing incoming birthday call on phone with floating celebratory balloons and energetic expression.",
  },
  {
    img: bdayAmberBalloon,
    title: "Amber Glow — Silver Balloon Reverie",
    category: "Portrait",
    client: "Studio Birthday Commission",
    year: "2026",
    description:
      "Warm ambient studio overhead capture playing with reflective silver birthday balloon and plush velvet textures.",
  },
  {
    img: bdayAmberSitting,
    title: "Amber Glow — Celebratory Still",
    category: "Portrait",
    client: "Studio Birthday Commission",
    year: "2026",
    description:
      "Joyful studio birthday portrait surrounded by custom printed pastel balloons and warm terracotta studio illumination.",
  },
];

/* ─── Gallery 8: Electric Pop & Collegiate (Portrait) ───────────────── */
const ELECTRIC_POP_GALLERY: LightboxItem[] = [
  {
    img: bdayPopBallSmile,
    title: "Electric Pop — Hoop & Plaid Chic",
    category: "Portrait",
    client: "Creative Studio Portraiture",
    year: "2026",
    description:
      "High-energy studio portrait against rich cobalt cyan, featuring an orange basketball prop, pleated tartan skirt, and radiant smile.",
  },
  {
    img: bdayPopSkirtTwirl,
    title: "Electric Pop — Plaid Skirt Motion",
    category: "Portrait",
    client: "Creative Studio Portraiture",
    year: "2026",
    description:
      "Full-length fashion portrait capturing movement and skirt flare against saturated studio backdrop with clean rim highlights.",
  },
  {
    img: bdayPopBallAction,
    title: "Electric Pop — Athletic Energy",
    category: "Portrait",
    client: "Creative Studio Portraiture",
    year: "2026",
    description:
      "Dynamic athletic portrait pose balancing sport aesthetics with modern fashion studio lighting.",
  },
  {
    img: bdayPopLaptopSmile,
    title: "Electric Pop — Digital Creator Stool",
    category: "Portrait",
    client: "Creative Studio Portraiture",
    year: "2026",
    description:
      "Contemporary editorial portrait seated on studio stool with graphic art laptop, patent pumps, and collegiate necktie styling.",
  },
  {
    img: bdayPopLaptopWork,
    title: "Electric Pop — Digital Focus",
    category: "Portrait",
    client: "Creative Studio Portraiture",
    year: "2026",
    description:
      "Editorial work perspective highlighting expressive style and creative tech presence.",
  },
  {
    img: bdayPopPortrait,
    title: "Electric Pop — Cyan Studio Portrait",
    category: "Portrait",
    client: "Creative Studio Portraiture",
    year: "2026",
    description:
      "Crisp studio beauty portrait showcasing delicate hair styling, vibrant backdrop separation, and natural luminous skin tones.",
  },
];

/* ─── Gallery 9: Golden Radiance & Emerald Couture (Portrait) ────────── */
const OUTDOOR_COUTURE_GALLERY: LightboxItem[] = [
  {
    img: bdayOutdoorYellowHero,
    title: "Golden Radiance — Sunlight Batik Avenue",
    category: "Portrait",
    client: "Outdoor Birthday & Fashion Editorial",
    year: "2026",
    description:
      "Sunlit outdoor runway portrait on tree-lined avenue featuring a bespoke golden-yellow sunburst batik dress and metallic heels.",
  },
  {
    img: bdayOutdoorEmeraldCouture,
    title: "Emerald Grace — Sequin Lace Couture",
    category: "Portrait",
    client: "Outdoor Birthday & Fashion Editorial",
    year: "2026",
    description:
      "Exquisite couture fashion portrait in an asymmetrical one-shoulder emerald green sequined lace gown with traditional wax-print skirt accent.",
  },
  {
    img: bdayOutdoorYellowWalk,
    title: "Golden Radiance — Street Promenade",
    category: "Portrait",
    client: "Outdoor Birthday & Fashion Editorial",
    year: "2026",
    description:
      "Fluid full-length editorial stride capturing natural afternoon light and vibrant batik fabric motion.",
  },
  {
    img: bdayOutdoorYellowBokeh,
    title: "Golden Radiance — Soft Ambient Glow",
    category: "Portrait",
    client: "Outdoor Birthday & Fashion Editorial",
    year: "2026",
    description:
      "Mid-shot natural light portrait showcasing warm facial expressions framed by lush green canopy bokeh.",
  },
  {
    img: bdayOutdoorYellowJoy,
    title: "Golden Radiance — Joyful Celebration Flare",
    category: "Portrait",
    client: "Outdoor Birthday & Fashion Editorial",
    year: "2026",
    description:
      "Dynamic candid outdoor portrait capturing genuine birthday happiness and golden-hour warmth.",
  },
];

interface PhotoItem extends LightboxItem {
  id: number;
  tall: boolean;
  cat: string;
  /** If set, clicking opens the named gallery in the lightbox */
  gallery?: string;
  galleryItems?: LightboxItem[];
  /** Total images in gallery (shown as badge) */
  galleryCount?: number;
}

const PHOTOS: PhotoItem[] = [
  /* ── Grouped Campaigns: Product ─────────────────── */
  {
    id: 1,
    title: "Blue for Men — Fragrance Campaign",
    cat: "Product",
    category: "Product",
    img: blueMenSplashLight,
    tall: true,
    client: "Blue for Men Fragrance",
    year: "2026",
    description:
      "A 5-image commercial product campaign featuring liquid-splash dynamics, editorial botanicals, atmospheric haze, and studio pedestal showcases.",
    gallery: "blueformen",
    galleryItems: BLUE_FOR_MEN_GALLERY,
    galleryCount: 5,
  },
  {
    id: 2,
    title: "Right Guard — High-Performance Commercial",
    cat: "Product",
    category: "Product",
    img: rightGuardImg2,
    tall: true,
    client: "Right Guard Sport",
    year: "2026",
    description:
      "A 5-image high-energy commercial campaign featuring dynamic liquid splash crowns, atmospheric mist, and studio aerosol studies.",
    gallery: "rightguard",
    galleryItems: RIGHT_GUARD_GALLERY,
    galleryCount: 5,
  },
  {
    id: 3,
    title: "Chronograph Horizon — Luxury Timepiece",
    cat: "Product",
    category: "Product",
    img: watchImg2,
    tall: true,
    client: "Horology Atelier",
    year: "2026",
    description:
      "Precision macro horology study highlighting brushed steel bevels, sapphire crystal reflections, and textured dial indices.",
    gallery: "watch",
    galleryItems: WATCH_GALLERY,
    galleryCount: 2,
  },
  {
    id: 4,
    title: "Artisanal Pomade — Grooming Collection",
    cat: "Product",
    category: "Product",
    img: pomadeImg1,
    tall: false,
    client: "Classic Pomade Studio",
    year: "2026",
    description:
      "Studio still-life and packaging study for premium styling pomade, focusing on reflective lid finish, amber jar transparency, and tactile substance textures.",
    gallery: "pomade",
    galleryItems: POMADE_GALLERY,
    galleryCount: 2,
  },

  /* ── Grouped Campaigns: Food ────────────────────── */
  {
    id: 5,
    title: "Frosty Bite — Gourmet Dessert & Gelato",
    cat: "Food",
    category: "Food",
    img: frostyBiteImg1,
    tall: true,
    client: "Frosty Bite Creamery",
    year: "2026",
    description:
      "A 6-image vibrant culinary series capturing artisanal ice cream creations, decadent toppings, rich chocolate drizzles, and fresh waffle textures.",
    gallery: "frostybite",
    galleryItems: FROSTY_BITE_GALLERY,
    galleryCount: 6,
  },
  {
    id: 6,
    title: "The Waakye Pot — Heritage Culinary Editorial",
    cat: "Food",
    category: "Food",
    img: waakyeImg2,
    tall: false,
    client: "The Waakye Pot Kitchen",
    year: "2026",
    description:
      "Rich, authentic culinary editorial capturing the iconic Ghanaian delicacy served in traditional banana leaves with aromatic shito, golden plantains, and rich stews.",
    gallery: "waakye",
    galleryItems: WAAKYE_GALLERY,
    galleryCount: 2,
  },

  /* ── Grouped Campaigns: Portrait ─────────────────── */
  {
    id: 7,
    title: "Amber Glow — Studio Birthday Celebration",
    cat: "Portrait",
    category: "Portrait",
    img: bdayAmberCake,
    tall: true,
    client: "Studio Birthday Commission",
    year: "2026",
    description:
      "A 4-image intimate warm-toned birthday studio celebration featuring candlelight cake cuts, playful balloon kinetics, and joyful candid moments.",
    gallery: "amberbirthday",
    galleryItems: AMBER_BIRTHDAY_GALLERY,
    galleryCount: 4,
  },
  {
    id: 8,
    title: "Electric Pop — Collegiate & Sport Chic",
    cat: "Portrait",
    category: "Portrait",
    img: bdayPopBallSmile,
    tall: true,
    client: "Creative Studio Portraiture",
    year: "2026",
    description:
      "A 6-image high-energy pop-editorial portrait series blending 90s collegiate aesthetic, sport chic props, and bold saturated cyan backdrops.",
    gallery: "electricpop",
    galleryItems: ELECTRIC_POP_GALLERY,
    galleryCount: 6,
  },
  {
    id: 9,
    title: "Golden Radiance & Emerald Couture",
    cat: "Portrait",
    category: "Portrait",
    img: bdayOutdoorYellowHero,
    tall: true,
    client: "Outdoor Birthday & Fashion Editorial",
    year: "2026",
    description:
      "A 5-image vibrant open-air celebration series showcasing bespoke Ghanaian textiles — transitioning from sunlit golden batik to intricate emerald lace couture.",
    gallery: "outdoorcouture",
    galleryItems: OUTDOOR_COUTURE_GALLERY,
    galleryCount: 5,
  },

  /* ── Other Portfolio Works ──────────────────────── */
  {
    id: 10,
    title: "Fog & Light",
    cat: "Documentary",
    category: "Documentary",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    year: "2024",
    description: "Atmospheric dawn capture illustrating the interplay of morning mist and golden mountain ridgelines.",
  },
  {
    id: 11,
    title: "Golden Hour Coast",
    cat: "Commercial",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=1600&h=1000&fit=crop&auto=format",
    tall: false,
    client: "Horizon Travel",
    year: "2024",
    description: "Campaign visual for sustainable luxury coastal travel destination.",
  },
  {
    id: 12,
    title: "Solstice Ritual",
    cat: "Documentary",
    category: "Documentary",
    img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    year: "2023",
    description: "Natural light documentary study on quiet spaces and tranquil Scandinavian geography.",
  },
  {
    id: 13,
    title: "Botanical Still Life No. 7",
    cat: "Still Life",
    category: "Still Life",
    img: "https://images.unsplash.com/photo-1490750967868-88df5691cc5f?w=1600&h=1100&fit=crop&auto=format",
    tall: false,
    client: "Flora Atelier",
    year: "2023",
    description: "Minimalist floral composition highlighting soft texture gradients and balanced shadow play.",
  },
  {
    id: 14,
    title: "Editorial Studio Portrait",
    cat: "Portrait",
    category: "Portrait",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    client: "Vogue Creative Spotlight",
    year: "2024",
    description: "High-contrast editorial portrait capturing strength, quiet presence, and organic skin tones.",
  },
  {
    id: 15,
    title: "Brand Story & Craft",
    cat: "Commercial",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&h=1000&fit=crop&auto=format",
    tall: false,
    client: "Heritage Makers Co.",
    year: "2023",
    description: "Authentic behind-the-scenes craft documentation showcasing artisanal handiwork.",
  },
  {
    id: 16,
    title: "Urban Fragment",
    cat: "Documentary",
    category: "Documentary",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=1100&fit=crop&auto=format",
    tall: false,
    year: "2023",
    description: "Geometric lines, architectural shadows, and metropolitan movement.",
  },
  {
    id: 17,
    title: "Quiet Interior & Form",
    cat: "Still Life",
    category: "Still Life",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    client: "Nordic Living Studio",
    year: "2024",
    description: "Interior architectural study focusing on green velvet furnishings and serene ambient light.",
  },
];

/** Total count for category badges — counts grouped galleries as their individual shot count */
function getCategoryCount(cat: string) {
  if (cat === "All") {
    return PHOTOS.reduce((acc, p) => acc + (p.galleryCount ?? 1), 0);
  }
  return PHOTOS.filter((p) => p.cat === cat).reduce((acc, p) => acc + (p.galleryCount ?? 1), 0);
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Photography() {
  useEffect(() => {
    document.title = "Photography Portfolio — iDESIGN Studio";
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);

  /* lightbox state */
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    return PHOTOS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.cat === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesNestedGallery = p.galleryItems?.some(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          (item.client && item.client.toLowerCase().includes(q))
      );
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        Boolean(matchesNestedGallery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  /* Total count for the "Showing X of Y" label */
  const totalCount = useMemo(() => getCategoryCount("All"), []);
  const filteredCount = useMemo(
    () => filteredPhotos.reduce((acc, p) => acc + (p.galleryCount ?? 1), 0),
    [filteredPhotos]
  );

  function openCard(p: PhotoItem, indexInFiltered: number) {
    if (p.galleryItems && p.galleryItems.length > 0) {
      setLightboxItems(p.galleryItems);
      setLightboxIndex(0);
    } else {
      // For non-grouped photos, show the filtered list (excluding gallery entries)
      const singlePhotos = filteredPhotos.filter((x) => !x.galleryItems);
      const singleIndex = singlePhotos.findIndex((x) => x.id === p.id);
      setLightboxItems(singlePhotos);
      setLightboxIndex(singleIndex >= 0 ? singleIndex : 0);
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          paddingBottom: "4rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1800&h=900&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,12,9,0.92) 0%, rgba(13,12,9,0.4) 60%, rgba(13,12,9,0.1) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(2rem,8vw,8rem)", maxWidth: "700px" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: "0.75rem",
            }}
          >
            — Visual Storytelling
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(2.5rem,6vw,4.5rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.025em",
              color: WHITE,
              marginBottom: "1rem",
            }}
          >
            Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.62)",
              maxWidth: "460px",
            }}
          >
            Commercial, portrait, and documentary work that captures truth and communicates without words. Click any
            photo to inspect in full resolution.
          </motion.p>
        </div>
      </section>

      {/* Category filter & Search Bar */}
      <section style={{ padding: "3rem 2rem 1.5rem", maxWidth: "1280px", margin: "0 auto" }}>
        {/* Search bar */}
        <div style={{ maxWidth: "480px", margin: "0 auto 1.5rem", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${searchQuery ? GOLD : BORDER}`,
              borderRadius: "4px",
              padding: "0.5rem 0.9rem",
              transition: "border-color 0.2s, box-shadow 0.2s",
              boxShadow: searchQuery ? "0 0 16px rgba(200, 165, 74, 0.2)" : "none",
            }}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke={searchQuery ? GOLD : MUTED}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "0.6rem", flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, title, product, lighting..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.85rem",
                color: DARK,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: MUTED,
                  fontSize: "1rem",
                  padding: "0 0.2rem",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const count = getCategoryCount(c);
            const isSelected = activeCategory === c;
            return (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1.1rem",
                  border: `1px solid ${isSelected ? GOLD : BORDER}`,
                  background: isSelected ? GOLD : "transparent",
                  color: isSelected ? WHITE : MUTED,
                  cursor: "pointer",
                  borderRadius: "3px",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span>{c}</span>
                <span
                  style={{
                    opacity: 0.8,
                    fontSize: "0.6rem",
                    padding: "0.1rem 0.35rem",
                    borderRadius: "10px",
                    background: isSelected ? "rgba(0,0,0,0.18)" : "rgba(13,12,9,0.06)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results indicator */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Showing {filteredCount} of {totalCount} showcase photographs
          </span>
          {(searchQuery || activeCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              style={{
                marginLeft: "0.8rem",
                background: "transparent",
                border: "none",
                color: GOLD,
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* Gallery grid section */}
      <section style={{ padding: "1.5rem 2rem 5rem", maxWidth: "1280px", margin: "0 auto" }}>
        {filteredPhotos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1.5rem",
              background: SURFACE,
              border: `1px dashed ${BORDER}`,
              borderRadius: "8px",
            }}
          >
            <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.35rem", color: DARK, marginBottom: "0.5rem" }}>
              No showcase photographs found
            </p>
            <p style={{ fontFamily: "'Work Sans',sans-serif", fontSize: "0.875rem", color: MUTED, marginBottom: "1.5rem" }}>
              No matches found for &quot;{searchQuery}&quot; under &quot;{activeCategory}&quot;. Try adjusting your keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              style={{
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0.75rem 1.8rem",
                background: GOLD,
                color: WHITE,
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
          >
            {filteredPhotos.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "4px",
                  background: SURFACE,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => openCard(p, i)}
              >
                <div style={{ paddingBottom: p.tall ? "120%" : "75%", position: "relative" }}>
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    animate={{
                      scale: hovered === p.id ? 1.06 : 1,
                      filter: hovered === p.id ? "brightness(0.35)" : "brightness(0.92)",
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Gallery count badge (top-left) */}
                  {p.galleryCount && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        left: "0.75rem",
                        background: "rgba(13,12,9,0.72)",
                        backdropFilter: "blur(6px)",
                        border: `1px solid ${GOLD}`,
                        color: GOLD,
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.1em",
                        padding: "0.22rem 0.55rem",
                        borderRadius: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        zIndex: 2,
                      }}
                    >
                      {/* grid icon */}
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={2}>
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                      {p.galleryCount} PHOTOS
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "1.25rem",
                      zIndex: 1,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <motion.span
                        animate={{ opacity: hovered === p.id ? 1 : 0, scale: hovered === p.id ? 1 : 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: "rgba(200, 165, 74, 0.9)",
                          color: WHITE,
                          padding: "0.25rem 0.6rem",
                          borderRadius: "3px",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {p.gallery ? "VIEW GALLERY ↗" : "VIEW FULL ↗"}
                      </motion.span>
                    </div>

                    <div>
                      <motion.span
                        animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 6 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.58rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: GOLD,
                          marginBottom: "0.25rem",
                          display: "block",
                        }}
                      >
                        {p.cat} {p.year ? `• ${p.year}` : ""}
                      </motion.span>
                      <motion.h3
                        animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 8 }}
                        transition={{ duration: 0.28, delay: 0.04 }}
                        style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.2rem", color: WHITE }}
                      >
                        {p.title}
                      </motion.h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Services offered */}
      <section style={{ background: SURFACE, padding: "5rem 2rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: "0.75rem",
                }}
              >
                — What We Shoot
              </p>
              <h2
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.75rem)",
                  color: DARK,
                }}
              >
                Photography Services
              </h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Product", desc: "Studio-grade cosmetic, fragrance, and e-commerce visuals with splash dynamics and rim lighting." },
              { title: "Food & Culinary", desc: "Sensory gastronomy, dessert styling, and restaurant editorial visuals that stimulate appetite and brand distinction." },
              { title: "Commercial", desc: "Brand lifestyle and advertising photography engineered to build customer trust and elevate campaigns." },
              { title: "Portrait", desc: "Individual, team, and executive portraiture in studio or on location." },
              { title: "Documentary", desc: "Event and editorial coverage that captures real moments authentically." },
              { title: "Still Life", desc: "Precision product and object photography for luxury catalogues and print." },
            ].map(({ title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.1}>
                <div style={{ borderTop: `2px solid ${GOLD}`, paddingTop: "1.25rem" }}>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: "1.2rem",
                      color: DARK,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Work Sans',sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      lineHeight: "1.7",
                      color: MUTED,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: DARKER,
          padding: "4rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1400&h=400&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(1.8rem,4vw,2.75rem)",
              color: WHITE,
              marginBottom: "1rem",
            }}
          >
            Book a photography session
          </h2>
          <p
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontWeight: 300,
              fontSize: "1rem",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "2rem",
            }}
          >
            Commercial, portrait, or documentary — let's capture it right.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              style={{
                display: "inline-flex",
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.9rem 2.25rem",
                background: GOLD,
                color: WHITE,
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              Book Now →
            </Link>
            <a
              href={`https://wa.me/233502330663?text=${encodeURIComponent(
                "Hello iDESIGN! I would like to book a photography session."
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: 500,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.9rem 2rem",
                background: "transparent",
                color: WHITE,
                border: "1px solid rgba(255,255,255,0.35)",
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              WhatsApp Us 💬
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}
