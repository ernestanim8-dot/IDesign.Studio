import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { GOLD, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { Lightbox, type LightboxItem } from "@/app/components/Lightbox";
import callCardBack from "@/imports/Branding/IDesign/call card back.jpg";
import callCardFront from "@/imports/Branding/IDesign/call card front.jpg";
import clockMockup from "@/imports/Branding/IDesign/Clock.jpg";
import mugMockup from "@/imports/Branding/IDesign/Mug.jpg";
import notebookTwo from "@/imports/Branding/IDesign/Notebook 2.jpg";
import notebook from "@/imports/Branding/IDesign/Notebook.jpg";
import penTwo from "@/imports/Branding/IDesign/Pen 2.jpg";
import pen from "@/imports/Branding/IDesign/Pen.jpg";
import shirtTwo from "@/imports/Branding/IDesign/Shirt 2.jpg";
import shirt from "@/imports/Branding/IDesign/Shirt.jpg";
import funeralTShirtFour from "@/imports/Branding/Funeral Branding/T-Shirt 4.jpg";
import funeralTShirt from "@/imports/Branding/Funeral Branding/T-Shirt.jpg";
import oneVoice from "@/imports/Branding/OneVoice27/onevoice.jpg";
import speakLordTwo from "@/imports/Branding/Speak Lord/Speak Lord 2.jpg";
import speakLord from "@/imports/Branding/Speak Lord/Speak Lord.jpg";
import stickerFood from "@/imports/Advertising/Food Sticker/Sticker food.jpg";
import stickerFoodOne from "@/imports/Advertising/Food Sticker/Sticker food1.jpg";
import dutchBraids from "@/imports/Advertising/dutch braids/Mary's Braids copy copy.jpg";
import glamourGateOne from "@/imports/Advertising/3mma’s Glamour Banner/3mma's Glamour gate 1.jpg";
import glamourGateTwo from "@/imports/Advertising/3mma’s Glamour Banner/3mma's Glamour gate 2.jpg";
import glamourBanner from "@/imports/Advertising/3mma’s Glamour Banner/3mma’s Glamour Banner copy copy copy.jpg";
import glamourPolished from "@/imports/Advertising/3mma’s Glamour Banner/3mma’s Glamour GET IT POLISHED 4.jpg";
import glamourSlideB from "@/imports/Advertising/3mma’s Glamour Banner/3mma’s Glamour glass slide 3b.png";
import glamourSlideC from "@/imports/Advertising/3mma’s Glamour Banner/3mma’s Glamour glass slide 3c.png";
import glamourSlideD from "@/imports/Advertising/3mma’s Glamour Banner/3mma’s Glamour glass slide 3d.png";
import glamourSlideE from "@/imports/Advertising/3mma’s Glamour Banner/3mma’s Glamour glass slide 3e.png";
import glamourOneMonth from "@/imports/Advertising/3mma’s Glamour Banner/3mma’s Glamour one month class 1ac.jpg";
import adomBeauty from "@/imports/Advertising/Adom Beauty/Adom Beauty copy.jpg";
import fashion from "@/imports/Advertising/Fashion/Fashion copy.jpg";
import glamourThree from "@/imports/3mma’s Glamour/3mma’s Glamour 3.jpg";
import glamourAltBanner from "@/imports/3mma’s Glamour/3mma’s Glamour Banner.jpg";
import glamourGetItThree from "@/imports/3mma’s Glamour/3mma’s Glamour GET IT  3.jpg";
import glamourSticker from "@/imports/3mma’s Glamour/3mma’s Glamour sticker 1.jpg";
import godHaveMercy from "@/imports/God have mercy food joint/God have mercy food joint 2.jpg";
import iceCream from "@/imports/Ice Cream/Ice Cream copy.jpg";
import effesCosmetics from "@/imports/It's Effes cosmetic/IT’S EFFES COSMETICS 3a.jpg";
import janeNails from "@/imports/Nails by Jane/Jane copy.jpg";
import janetNails from "@/imports/Nails by Jane/Janet copy copy.jpg";
import openSoon from "@/imports/Open Soon/open soon 1.jpg";
import owusuwaaLuxe from "@/imports/Owusuwaa's Luxe/Owusuwaa’s Luxe copy copy.jpg";
import rbWedding from "@/imports/R&B Wedding/wedding 1 copy.jpg";
import tinaBundle from "@/imports/Tina Special Bundle/Tina-1.jpg";
import swgcMockup from "@/imports/Branding/SWGC/SWGC MOCKUP copy.jpg";

interface DesignProject extends LightboxItem {
  id: number;
  client: string;
  year: string;
  wide: boolean;
  discipline: string;
  gallery?:
    | "idesign"
    | "funeral"
    | "onevoice"
    | "speaklord"
    | "foodsticker"
    | "dutchbraids"
    | "glamour"
    | "adombeauty"
    | "fashion"
    | "nailsbyjane"
    | "icecream"
    | "effes"
    | "owusuwaa"
    | "godhavemercy"
    | "wedding"
    | "tinabundle"
    | "opensoon"
    | "swgc";
}

const DISCIPLINES = ["All", "Branding", "Typography", "Packaging", "Advertising"];

const BRANDING_GALLERY: LightboxItem[] = [
  {
    img: callCardFront,
    title: "iDESIGN Call Card Front",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Front-facing business card design for the iDESIGN visual identity.",
  },
  {
    img: callCardBack,
    title: "iDESIGN Call Card Back",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Back-facing business card layout with brand contact details.",
  },
  {
    img: shirt,
    title: "iDESIGN Shirt",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Branded shirt mockup showing the identity in context.",
  },
  {
    img: shirtTwo,
    title: "iDESIGN Shirt II",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Second shirt mockup variation for branded apparel.",
  },
  {
    img: mugMockup,
    title: "iDESIGN Mug",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Branded mug mockup for studio merchandise and presentation.",
  },
  {
    img: notebook,
    title: "iDESIGN Notebook",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Notebook brand application for stationery and office materials.",
  },
  {
    img: notebookTwo,
    title: "iDESIGN Notebook II",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Second notebook mockup variation for brand collateral.",
  },
  {
    img: pen,
    title: "iDESIGN Pen",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Pen mockup showing the identity on everyday brand materials.",
  },
  {
    img: penTwo,
    title: "iDESIGN Pen II",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Second pen mockup variation for brand collateral.",
  },
  {
    img: clockMockup,
    title: "iDESIGN Clock",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Clock mockup with the brand identity applied to interior decor.",
  },
];

const FUNERAL_BRANDING_GALLERY: LightboxItem[] = [
  {
    img: funeralTShirt,
    title: "Funeral Brand T-Shirt",
    category: "Funeral Branding",
    client: "Funeral Brand",
    year: "2026",
    description: "Memorial T-shirt design created as part of the funeral branding set.",
  },
  {
    img: funeralTShirtFour,
    title: "Funeral Brand T-Shirt II",
    category: "Funeral Branding",
    client: "Funeral Brand",
    year: "2026",
    description: "Second funeral T-shirt mockup variation for the memorial brand package.",
  },
];

const ONEVOICE_BRANDING_GALLERY: LightboxItem[] = [
  {
    img: oneVoice,
    title: "OneVoice27 Brand Identity",
    category: "Branding & Identity",
    client: "OneVoice27",
    year: "2026",
    description: "OneVoice27 brand artwork prepared for a bold, unified visual presence.",
  },
];

const SPEAK_LORD_BRANDING_GALLERY: LightboxItem[] = [
  {
    img: speakLord,
    title: "Speak Lord Brand Identity",
    category: "Branding & Identity",
    client: "Speak Lord",
    year: "2026",
    description: "Speak Lord brand artwork created for a clear faith-centered identity.",
  },
  {
    img: speakLordTwo,
    title: "Speak Lord Brand Identity II",
    category: "Branding & Identity",
    client: "Speak Lord",
    year: "2026",
    description: "Second Speak Lord brand presentation artwork for the identity set.",
  },
];

const FOOD_STICKER_ADVERTISING_GALLERY: LightboxItem[] = [
  {
    img: stickerFood,
    title: "Food Sticker Advertising",
    category: "Advertising Design",
    client: "Food Sticker",
    year: "2024",
    description: "Food-focused promotional sticker artwork designed for eye-catching advertising.",
  },
  {
    img: stickerFoodOne,
    title: "Food Sticker Advertising II",
    category: "Advertising Design",
    client: "Food Sticker",
    year: "2024",
    description: "Second food sticker advertising layout for the campaign set.",
  },
];

const DUTCH_BRAIDS_ADVERTISING_GALLERY: LightboxItem[] = [
  {
    img: dutchBraids,
    title: "Dutch Braids Advertising",
    category: "Advertising Design",
    client: "Dutch Braids",
    year: "2024",
    description: "Promotional braid design artwork created for a beauty advertising campaign.",
  },
];

const GLAMOUR_ADVERTISING_GALLERY: LightboxItem[] = [
  {
    img: glamourBanner,
    title: "3mma's Glamour Banner",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Promotional banner artwork created for 3mma's Glamour.",
  },
  {
    img: glamourGateOne,
    title: "3mma's Glamour Gate I",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Outdoor gate advertising artwork for the 3mma's Glamour campaign.",
  },
  {
    img: glamourGateTwo,
    title: "3mma's Glamour Gate II",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Second outdoor gate advertising layout for the campaign set.",
  },
  {
    img: glamourPolished,
    title: "Get It Polished",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Promotional class artwork for beauty training and service awareness.",
  },
  {
    img: glamourSlideB,
    title: "Glamour Glass Slide I",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Social advertising slide for the 3mma's Glamour visual campaign.",
  },
  {
    img: glamourSlideC,
    title: "Glamour Glass Slide II",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Second social advertising slide for the campaign.",
  },
  {
    img: glamourSlideD,
    title: "Glamour Glass Slide III",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Third social advertising slide for the campaign.",
  },
  {
    img: glamourSlideE,
    title: "Glamour Glass Slide IV",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Fourth social advertising slide for the campaign.",
  },
  {
    img: glamourOneMonth,
    title: "One Month Class",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Beauty class advertising artwork for a one-month training promotion.",
  },
  {
    img: glamourThree,
    title: "3mma's Glamour Showcase",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Campaign artwork showcasing beauty services and visual branding.",
  },
  {
    img: glamourAltBanner,
    title: "3mma's Glamour Full Banner",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Wide-format outdoor promotional banner design.",
  },
  {
    img: glamourGetItThree,
    title: "3mma's Glamour Get It Polished",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Promotional campaign design for premium nail and beauty polishing services.",
  },
  {
    img: glamourSticker,
    title: "3mma's Glamour Sticker",
    category: "Advertising Design",
    client: "3mma's Glamour",
    year: "2025",
    description: "Custom branded promotional sticker layout for packaging and giveaways.",
  },
];

const ADOM_BEAUTY_ADVERTISING_GALLERY: LightboxItem[] = [
  {
    img: adomBeauty,
    title: "Adom Beauty Advertising",
    category: "Advertising Design",
    client: "Adom Beauty",
    year: "2025",
    description: "Beauty advertising artwork created for Adom Beauty's promotional campaign.",
  },
];

const FASHION_ADVERTISING_GALLERY: LightboxItem[] = [
  {
    img: fashion,
    title: "Fashion Advertising",
    category: "Advertising Design",
    client: "Fashion",
    year: "2025",
    description: "Fashion advertising artwork created for a stylish promotional campaign.",
  },
];

const NAILS_BY_JANE_GALLERY: LightboxItem[] = [
  {
    img: janeNails,
    title: "Nails by Jane Promo",
    category: "Advertising Design",
    client: "Nails by Jane",
    year: "2025",
    description: "Promotional advertisement and service showcase artwork for Nails by Jane.",
  },
  {
    img: janetNails,
    title: "Nails by Jane Feature",
    category: "Advertising Design",
    client: "Nails by Jane",
    year: "2025",
    description: "Editorial advertising artwork highlighting bespoke nail artistry.",
  },
];

const ICE_CREAM_GALLERY: LightboxItem[] = [
  {
    img: iceCream,
    title: "Artisanal Ice Cream Branding & Packaging",
    category: "Packaging",
    client: "Sweet Treats Co.",
    year: "2025",
    description: "Vibrant and mouth-watering ice cream packaging and promotional advertising design.",
  },
];

const EFFES_COSMETICS_GALLERY: LightboxItem[] = [
  {
    img: effesCosmetics,
    title: "It's Effes Cosmetics Campaign",
    category: "Advertising Design",
    client: "It's Effes Cosmetic",
    year: "2025",
    description: "Beauty and cosmetics advertising poster highlighting product elegance and quality.",
  },
];

const OWUSUWAA_LUXE_GALLERY: LightboxItem[] = [
  {
    img: owusuwaaLuxe,
    title: "Owusuwaa's Luxe Brand Campaign",
    category: "Advertising Design",
    client: "Owusuwaa's Luxe",
    year: "2025",
    description: "High-end luxury beauty and hair promotional artwork with refined typography.",
  },
];

const GOD_HAVE_MERCY_GALLERY: LightboxItem[] = [
  {
    img: godHaveMercy,
    title: "God Have Mercy Food Joint Banner",
    category: "Advertising Design",
    client: "God Have Mercy Food Joint",
    year: "2025",
    description: "Appetizing outdoor commercial banner and signage artwork for a local eatery.",
  },
];

const RB_WEDDING_GALLERY: LightboxItem[] = [
  {
    img: rbWedding,
    title: "R&B Wedding Invitation & Stationery",
    category: "Branding & Identity",
    client: "R&B Wedding",
    year: "2025",
    description: "Custom celebratory wedding stationery, monogram layout, and floral invitation design.",
  },
];

const TINA_BUNDLE_GALLERY: LightboxItem[] = [
  {
    img: tinaBundle,
    title: "Tina Special Bundle Campaign",
    category: "Advertising Design",
    client: "Tina Special Bundle",
    year: "2025",
    description: "Eye-catching promotional flyer artwork advertising an exclusive product bundle offer.",
  },
];

const OPEN_SOON_GALLERY: LightboxItem[] = [
  {
    img: openSoon,
    title: "Opening Soon Teaser Banner",
    category: "Advertising Design",
    client: "Grand Opening Campaign",
    year: "2025",
    description: "Anticipation-building 'Opening Soon' promotional graphic for retail launch.",
  },
];

const SWGC_MOCKUP_GALLERY: LightboxItem[] = [
  {
    img: swgcMockup,
    title: "SWGC Brand Apparel & Collateral",
    category: "Branding & Identity",
    client: "SWGC",
    year: "2024",
    description: "Merchandise and corporate apparel identity mockup for SWGC.",
  },
];

const PROJECTS: DesignProject[] = [
  {
    id: 1,
    title: "iDESIGN Brand Identity",
    client: "iDESIGN Studio",
    year: "2026",
    img: callCardFront,
    wide: true,
    discipline: "Branding",
    gallery: "idesign",
    category: "Branding & Identity",
    description:
      "A curated identity set featuring the studio's logo variations and brand artwork. Click to view the full branding gallery.",
  },
  {
    id: 2,
    title: "Oblivion Typeface",
    client: "Foundry Release",
    year: "2023",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&h=1200&fit=crop&auto=format",
    wide: false,
    discipline: "Typography",
    category: "Typography",
    description:
      "Bespoke geometric display typeface engineered with razor-sharp terminal angles and dual optical weights.",
  },
  {
    id: 3,
    title: "Prism Botanicals Packaging",
    client: "Prism Goods",
    year: "2023",
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1400&h=1200&fit=crop&auto=format",
    wide: false,
    discipline: "Packaging",
    category: "Packaging",
    description:
      "Sustainable embossed carton packaging with foil accents designed for an artisanal skincare line.",
  },
  {
    id: 4,
    title: "Food Sticker",
    client: "Food Sticker",
    year: "2024",
    img: stickerFood,
    wide: true,
    discipline: "Advertising",
    gallery: "foodsticker",
    category: "Advertising Design",
    description:
      "Food-focused sticker advertising visuals created for bold promotional impact. Click to view the Food Sticker gallery.",
  },
  {
    id: 5,
    title: "Dutch Braids",
    client: "Dutch Braids",
    year: "2024",
    img: dutchBraids,
    wide: false,
    discipline: "Advertising",
    gallery: "dutchbraids",
    category: "Advertising Design",
    description:
      "A beauty-focused advertising visual for Dutch Braids. Click to view the Dutch Braids gallery.",
  },
  {
    id: 6,
    title: "3mma's Glamour Banner",
    client: "3mma's Glamour",
    year: "2025",
    img: glamourBanner,
    wide: false,
    discipline: "Advertising",
    gallery: "glamour",
    category: "Advertising Design",
    description:
      "A beauty advertising campaign with banners, social slides, and training promotions. Click to view the 3mma's Glamour gallery.",
  },
  {
    id: 11,
    title: "Adom Beauty",
    client: "Adom Beauty",
    year: "2025",
    img: adomBeauty,
    wide: false,
    discipline: "Advertising",
    gallery: "adombeauty",
    category: "Advertising Design",
    description:
      "A beauty advertising visual for Adom Beauty. Click to view the Adom Beauty gallery.",
  },
  {
    id: 12,
    title: "Fashion",
    client: "Fashion",
    year: "2025",
    img: fashion,
    wide: false,
    discipline: "Advertising",
    gallery: "fashion",
    category: "Advertising Design",
    description:
      "A fashion-focused advertising visual for a stylish promotional campaign. Click to view the Fashion gallery.",
  },
  {
    id: 13,
    title: "iDESIGN Brand Assets",
    client: "iDESIGN Studio",
    year: "2022",
    img: shirt,
    wide: false,
    discipline: "Branding",
    gallery: "idesign",
    category: "Brand Guidelines",
    description:
      "Logo systems, regional marks, and visual assets packaged for a consistent brand presence.",
  },
  {
    id: 10,
    title: "Lume Festival Poster Series",
    client: "Lume Festival",
    year: "2021",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=1200&fit=crop&auto=format",
    wide: false,
    discipline: "Typography",
    category: "Poster & Print",
    description:
      "Silk-screened limited edition promotional poster set for international light and contemporary art biennial.",
  },
  {
    id: 7,
    title: "Funeral Brand",
    client: "Memorial Identity",
    year: "2024",
    img: funeralTShirt,
    wide: false,
    discipline: "Branding",
    gallery: "funeral",
    category: "Funeral Branding",
    description:
      "A respectful memorial branding set featuring custom apparel designs. Click to view the funeral brand gallery.",
  },
  {
    id: 8,
    title: "OneVoice27",
    client: "OneVoice27",
    year: "2024",
    img: oneVoice,
    wide: false,
    discipline: "Branding",
    gallery: "onevoice",
    category: "Branding & Identity",
    description:
      "A focused brand identity piece for OneVoice27. Click to view the OneVoice27 branding gallery.",
  },
  {
    id: 9,
    title: "Speak Lord",
    client: "Speak Lord",
    year: "2024",
    img: speakLord,
    wide: false,
    discipline: "Branding",
    gallery: "speaklord",
    category: "Branding & Identity",
    description:
      "A faith-centered brand identity set for Speak Lord. Click to view the Speak Lord branding gallery.",
  },
  {
    id: 14,
    title: "Nails by Jane",
    client: "Nails by Jane",
    year: "2025",
    img: janeNails,
    wide: false,
    discipline: "Advertising",
    gallery: "nailsbyjane",
    category: "Advertising Design",
    description:
      "Vibrant nail art and beauty advertising visuals. Click to view the Nails by Jane gallery.",
  },
  {
    id: 15,
    title: "Ice Cream Packaging",
    client: "Sweet Treats Co.",
    year: "2025",
    img: iceCream,
    wide: false,
    discipline: "Packaging",
    gallery: "icecream",
    category: "Packaging",
    description:
      "Delicious artisanal ice cream packaging and promotional branding. Click to view the gallery.",
  },
  {
    id: 16,
    title: "It's Effes Cosmetics",
    client: "It's Effes Cosmetic",
    year: "2025",
    img: effesCosmetics,
    wide: false,
    discipline: "Advertising",
    gallery: "effes",
    category: "Advertising Design",
    description:
      "Elegantly crafted beauty cosmetics promotion and branding visual. Click to view the gallery.",
  },
  {
    id: 17,
    title: "Owusuwaa's Luxe",
    client: "Owusuwaa's Luxe",
    year: "2025",
    img: owusuwaaLuxe,
    wide: false,
    discipline: "Advertising",
    gallery: "owusuwaa",
    category: "Advertising Design",
    description:
      "Sophisticated luxury hair and beauty brand advertising. Click to view the gallery.",
  },
  {
    id: 18,
    title: "God Have Mercy Food Joint",
    client: "God Have Mercy Food Joint",
    year: "2025",
    img: godHaveMercy,
    wide: true,
    discipline: "Advertising",
    gallery: "godhavemercy",
    category: "Advertising Design",
    description:
      "Appetizing outdoor commercial banner and promotional design. Click to view the gallery.",
  },
  {
    id: 19,
    title: "R&B Wedding Suite",
    client: "R&B Wedding",
    year: "2025",
    img: rbWedding,
    wide: false,
    discipline: "Branding",
    gallery: "wedding",
    category: "Branding & Identity",
    description:
      "Custom wedding stationery and elegant monogram invitation design. Click to view the gallery.",
  },
  {
    id: 20,
    title: "Tina Special Bundle",
    client: "Tina Special Bundle",
    year: "2025",
    img: tinaBundle,
    wide: false,
    discipline: "Advertising",
    gallery: "tinabundle",
    category: "Advertising Design",
    description:
      "High-converting promotional marketing flyer for an exclusive bundle offer. Click to view the gallery.",
  },
  {
    id: 21,
    title: "Opening Soon Teaser",
    client: "Grand Opening Campaign",
    year: "2025",
    img: openSoon,
    wide: false,
    discipline: "Advertising",
    gallery: "opensoon",
    category: "Advertising Design",
    description:
      "Attention-commanding launch banner and teaser artwork. Click to view the gallery.",
  },
  {
    id: 22,
    title: "SWGC Apparel & Merch",
    client: "SWGC",
    year: "2024",
    img: swgcMockup,
    wide: false,
    discipline: "Branding",
    gallery: "swgc",
    category: "Branding & Identity",
    description:
      "Corporate apparel and merchandise branding mockup. Click to view the gallery.",
  },
];

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

export function GraphicDesign() {
  useEffect(() => {
    document.title = "Graphic Design & Brand Systems — iDESIGN Studio";
  }, []);

  const [hovered, setHovered] = useState<number | null>(null);
  const [activeDiscipline, setActiveDiscipline] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>(PROJECTS);

  const filteredProjects = useMemo(() => {
    if (activeDiscipline === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.discipline === activeDiscipline);
  }, [activeDiscipline]);

  return (
    <>
      {/* Page hero */}
      <section
        style={{
          position: "relative",
          padding: "7rem 2rem 5rem",
          background: DARKER,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=1800&h=700&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
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
              marginBottom: "1rem",
            }}
          >
            — Selected Projects
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
              marginBottom: "1.25rem",
            }}
          >
            Graphic Design
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "520px",
              margin: "0 auto 2rem",
            }}
          >
            Logos, packaging, advertising layouts, and brand systems that communicate your values with confidence and
            lasting style. Click any project to open detailed view.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              style={{
                display: "inline-flex",
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.9rem 2rem",
                background: GOLD,
                color: WHITE,
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              Start a Project →
            </Link>
            <a
              href={`https://wa.me/233502330663?text=${encodeURIComponent(
                "Hello iDESIGN! I would like to discuss a graphic design project."
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
              WhatsApp Consultation 💬
            </a>
          </motion.div>
        </div>
      </section>

      {/* Discipline filter */}
      <section style={{ padding: "3rem 2rem 1rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="flex flex-wrap justify-center gap-2">
          {DISCIPLINES.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDiscipline(d)}
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.45rem 1.2rem",
                border: `1px solid ${activeDiscipline === d ? GOLD : BORDER}`,
                background: activeDiscipline === d ? GOLD : "transparent",
                color: activeDiscipline === d ? WHITE : MUTED,
                cursor: "pointer",
                borderRadius: "3px",
                transition: "all 0.2s",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio grid */}
      <section style={{ padding: "3rem 2rem 5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}>
          {filteredProjects.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.08}>
              <motion.div
                className={p.wide ? "md:col-span-2" : ""}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: SURFACE,
                  borderRadius: "6px",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(26,24,20,0.08)",
                  border: `1px solid ${BORDER}`,
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  if (p.gallery === "nailsbyjane") {
                    setLightboxItems(NAILS_BY_JANE_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "icecream") {
                    setLightboxItems(ICE_CREAM_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "effes") {
                    setLightboxItems(EFFES_COSMETICS_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "owusuwaa") {
                    setLightboxItems(OWUSUWAA_LUXE_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "godhavemercy") {
                    setLightboxItems(GOD_HAVE_MERCY_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "wedding") {
                    setLightboxItems(RB_WEDDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "tinabundle") {
                    setLightboxItems(TINA_BUNDLE_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "opensoon") {
                    setLightboxItems(OPEN_SOON_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "swgc") {
                    setLightboxItems(SWGC_MOCKUP_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "fashion") {
                    setLightboxItems(FASHION_ADVERTISING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "adombeauty") {
                    setLightboxItems(ADOM_BEAUTY_ADVERTISING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "glamour") {
                    setLightboxItems(GLAMOUR_ADVERTISING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "dutchbraids") {
                    setLightboxItems(DUTCH_BRAIDS_ADVERTISING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "foodsticker") {
                    setLightboxItems(FOOD_STICKER_ADVERTISING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "speaklord") {
                    setLightboxItems(SPEAK_LORD_BRANDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "onevoice") {
                    setLightboxItems(ONEVOICE_BRANDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "funeral") {
                    setLightboxItems(FUNERAL_BRANDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "idesign") {
                    setLightboxItems(BRANDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  setLightboxItems(filteredProjects);
                  setLightboxIndex(i);
                }}
              >
                <div style={{ paddingBottom: p.wide ? "46%" : "68%", position: "relative" }}>
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    animate={{
                      scale: hovered === p.id ? 1.06 : 1,
                      filter: hovered === p.id ? "brightness(0.38)" : "brightness(0.92)",
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Corner indicator badge */}
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 2 }}>
                    <motion.span
                      animate={{ opacity: hovered === p.id ? 1 : 0.8 }}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        background: "rgba(13, 12, 9, 0.75)",
                        color: GOLD,
                        border: "1px solid rgba(200, 165, 74, 0.4)",
                        backdropFilter: "blur(6px)",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "3px",
                      }}
                    >
                      {p.discipline}
                    </motion.span>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.75rem",
                    }}
                  >
                    <motion.p
                      animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 8 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: GOLD,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {p.client} — {p.year}
                    </motion.p>
                    <motion.h3
                      animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 10 }}
                      transition={{ duration: 0.28, delay: 0.04 }}
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontSize: "1.45rem",
                        color: WHITE,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {p.title}
                    </motion.h3>
                    <motion.p
                      animate={{ opacity: hovered === p.id ? 0.9 : 0, y: hovered === p.id ? 0 : 6 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.82rem",
                        color: "#d8d3cb",
                        lineHeight: "1.5",
                        maxWidth: "600px",
                      }}
                    >
                      {p.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ background: SURFACE, padding: "5rem 2rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
                — How We Work
              </p>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem,4vw,2.75rem)", color: DARK }}>
                Our Design Process
              </h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: "01", title: "Discover", desc: "We learn your brand, goals, and audience before opening any tools." },
              { n: "02", title: "Concept", desc: "We explore multiple directions and refine into the strongest solution." },
              { n: "03", title: "Craft", desc: "Every detail is considered — typography, colour, spacing, and feel." },
              { n: "04", title: "Deliver", desc: "Final files packaged for print, digital, and future use." },
            ].map(({ n, title, desc }, i) => (
              <FadeUp key={n} delay={i * 0.1}>
                <div style={{ borderTop: `2px solid ${GOLD}`, paddingTop: "1.25rem" }}>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: "2rem",
                      color: GOLD,
                      opacity: 0.35,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {n}
                  </p>
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
      <section style={{ background: GOLD, padding: "4rem 2rem", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: "clamp(1.8rem,4vw,2.75rem)",
            color: WHITE,
            marginBottom: "1rem",
          }}
        >
          Ready to build your visual identity?
        </h2>
        <p
          style={{
            fontFamily: "'Work Sans',sans-serif",
            fontWeight: 300,
            fontSize: "1rem",
            color: "rgba(255,255,255,0.85)",
            marginBottom: "2rem",
          }}
        >
          Let's create something that lasts.
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
              background: WHITE,
              color: GOLD,
              textDecoration: "none",
              borderRadius: "3px",
            }}
          >
            Get In Touch →
          </Link>
          <a
            href={`https://wa.me/233502330663?text=${encodeURIComponent(
              "Hello iDESIGN! I'm interested in building a new visual identity."
            )}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Work Sans',sans-serif",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "0.9rem 2rem",
              background: DARKER,
              color: WHITE,
              textDecoration: "none",
              borderRadius: "3px",
            }}
          >
            Chat on WhatsApp 💬
          </a>
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
