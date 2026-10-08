import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { GOLD, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { Lightbox, type LightboxItem } from "@/app/components/Lightbox";
import graphicDesignBackground from "@/imports/background GD.jpg";
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
import glamourThree from "@/imports/Advertising/3mma’s Glamour/3mma’s Glamour 3.jpg";
import glamourAltBanner from "@/imports/Advertising/3mma’s Glamour/3mma’s Glamour Banner.jpg";
import glamourGetItThree from "@/imports/Advertising/3mma’s Glamour/3mma’s Glamour GET IT  3.jpg";
import glamourSticker from "@/imports/Advertising/3mma’s Glamour/3mma’s Glamour sticker 1.jpg";
import godHaveMercy from "@/imports/Advertising/God have mercy food joint/God have mercy food joint 2.jpg";
import iceCream from "@/imports/Advertising/Ice Cream/Ice Cream copy.jpg";
import effesCosmetics from "@/imports/Advertising/It's Effes cosmetic/IT’S EFFES COSMETICS 3a.jpg";
import janeNails from "@/imports/Advertising/Nails by Jane/Jane copy.jpg";
import janetNails from "@/imports/Advertising/Nails by Jane/Janet copy copy.jpg";
import openSoon from "@/imports/Advertising/Open Soon/open soon 1.jpg";
import owusuwaaLuxe from "@/imports/Advertising/Owusuwaa's Luxe/Owusuwaa’s Luxe copy copy.jpg";
import rbWedding from "@/imports/Advertising/R&B Wedding/wedding 1 copy.jpg";
import tinaBundle from "@/imports/Advertising/Tina Special Bundle/Tina-1.jpg";
import swgcMockup from "@/imports/Branding/SWGC/SWGC MOCKUP copy.jpg";
import ewurabasCoutureLogo from "@/imports/Branding/EC LOGO/EC LOGO png.png";
import ewurabasCoutureWallMockup from "@/imports/Branding/EC LOGO/3D Wall Logo MockUp 2.jpg";
import trailblazersEmblem from "@/imports/Branding/Trailblazers/TRAILBLAZERS .png";
import trailblazersWordmark from "@/imports/Branding/Trailblazers/TRAILBLAZERS 1.png";
import trailblazersFlag from "@/imports/Branding/Trailblazers/flags back.jpg";
import trailblazersPhoto from "@/imports/Branding/Trailblazers/Trailblazer.jpg";
import trailblazersPhotoTwo from "@/imports/Branding/Trailblazers/Trailblazer 2.jpg";
import trailblazersPhotoThree from "@/imports/Branding/Trailblazers/Trailblazer 3.jpg";
import trailblazersPhotoFour from "@/imports/Branding/Trailblazers/Trailblazer 4.jpg";
import trailblazersPhotoFive from "@/imports/Branding/Trailblazers/Trailblazer 5.jpg";
import newLifeOrionEmblem from "@/imports/Branding/New Life SDA Church/ORION.png";
import newLifeOrionFlag from "@/imports/Branding/New Life SDA Church/flag.jpg";
import oasisCampoutPoster from "@/imports/Advertising/Oasis Pathfinder Club UEW/UEW Campout 10.jpg";
import oasisCampoutRules from "@/imports/Advertising/Oasis Pathfinder Club UEW/camp rule 3.jpg";
import oasisCampoutDressCode from "@/imports/Advertising/Oasis Pathfinder Club UEW/dress code 7.jpg";
import oasisCampoutPackingList from "@/imports/Advertising/Oasis Pathfinder Club UEW/packing list 5.jpg";
import oasisCampoutThankYou from "@/imports/Advertising/Oasis Pathfinder Club UEW/thank you 2.jpg";
import citationAbora from "@/imports/Advertising/Citation/Commander Abora Emmanuel A4.jpg";
import citationAwuni from "@/imports/Advertising/Citation/Commander Awuni Gershon A4.jpg";
import citationAseidu from "@/imports/Advertising/Citation/Director Aseidu Justice A4.jpg";
import citationJoseph from "@/imports/Advertising/Citation/Director Joseph Asare 4.jpg";
import citationAndrews from "@/imports/Advertising/Citation/Doc Andrews Acquah A3 2.jpg";
import citationElizabeth from "@/imports/Advertising/Citation/Elizabeth Annor Treasurer A4.jpg";
import citationKelvin from "@/imports/Advertising/Citation/Kelvin Peter  Deputy Organizer.jpg";
import citationKen from "@/imports/Advertising/Citation/Ken Ndoli Organizer.jpg";
import citationMary from "@/imports/Advertising/Citation/MG MARY ASIMENG_.jpg";
import citationMaxwell from "@/imports/Advertising/Citation/Mr Maxwell Smith1.jpg";
import citationRansford from "@/imports/Advertising/Citation/Pastor Ransford Osarfo Gyasi_.jpg";
import citationDaniel from "@/imports/Advertising/Citation/Ps Daniel Amissah A3.jpg";
import citationThomas from "@/imports/Advertising/Citation/Thomas Owusu SYL Rep.jpg";
import blistavoCertificate from "@/imports/Advertising/Blistavo Events/Certificate of Honour.jpg";
import odorkorYouthCampPoster from "@/imports/Advertising/Odorkor District AYM Youth Camp/Youth Camp Poster.jpg";
import odorkorMountainJai from "@/imports/Advertising/Odorkor District AYM Youth Camp/Mountain Jai Excursion.jpg";
import odorkorDressCode from "@/imports/Advertising/Odorkor District AYM Youth Camp/Dress Code.jpg";
import odorkorPackingList from "@/imports/Advertising/Odorkor District AYM Youth Camp/Packing List.jpg";
import gnaasWelcome from "@/imports/Advertising/GNAAS TTU/Welcome to GNAAS TTU.jpg";
import gnaasFreshersDay from "@/imports/Advertising/GNAAS TTU/Freshers Day and Harvest.jpg";
import gnaasHarvestAppeal from "@/imports/Advertising/GNAAS TTU/Harvest Appeal Banner.jpg";
import gnaasZecMeeting from "@/imports/Advertising/GNAAS TTU/1st ZEC Meeting.jpg";
import gnaasFragranceOfPraise from "@/imports/Advertising/GNAAS TTU/The Fragrance of Praise.jpg";
import gnaasFriendToHave from "@/imports/Advertising/GNAAS TTU/The Friend to Have.jpg";
import djagoFullBlack from "@/imports/Branding/Djago Design & Build/Djago Full Logo Black.jpg";
import djagoLogotypeBlack from "@/imports/Branding/Djago Design & Build/Djago Logotype Black.jpg";
import djagoEmblemBlack from "@/imports/Branding/Djago Design & Build/Djago Emblem Black.jpg";
import djagoFullGold from "@/imports/Branding/Djago Design & Build/Djago Full Logo Gold.jpg";
import djagoLogotypeGold from "@/imports/Branding/Djago Design & Build/Djago Logotype Gold.jpg";
import djagoEmblemGold from "@/imports/Branding/Djago Design & Build/Djago Emblem Gold.jpg";
import bossLogo1 from "@/imports/Branding/Boss Clothing/Boss Logo 1.png";
import bossLogo2 from "@/imports/Branding/Boss Clothing/Boss Logo 2.png";
import bossCloth1 from "@/imports/Branding/Boss Clothing/Boss Cloth 1.jpg";
import bossCloth2 from "@/imports/Branding/Boss Clothing/Boss Cloth 2.jpg";
import bossShirtMockup1 from "@/imports/Branding/Boss Clothing/Shirt Mockup 1.jpg";
import bossShirtMockup2 from "@/imports/Branding/Boss Clothing/Shirt Mockup 2.jpg";
import bachelorParty1 from "@/imports/Advertising/Bachelor Party/Bachelor Party 1.jpg";
import bachelorParty2 from "@/imports/Advertising/Bachelor Party/Bachelor Party 2.jpg";
import bachelorParty3 from "@/imports/Advertising/Bachelor Party/Bachelor Party 3.jpg";
import bachelorParty4 from "@/imports/Advertising/Bachelor Party/Bachelor Party 4.jpg";
import adomBaRollup1 from "@/imports/Advertising/Adom Ba Cold Store/Adom Ba Cold Store Rollup 1.jpg";
import adomBaRollup2 from "@/imports/Advertising/Adom Ba Cold Store/Adom Ba Cold Store Rollup 2.png";
import adomBaHorizontalBanner from "@/imports/Advertising/Adom Ba Cold Store/Adom Ba Cold Store Horizontal Banner.jpg";

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
  | "swgc"
  | "trailblazers"
  | "ewurabas-couture"
  | "new-life-sda"
  | "oasis-campout"
  | "odorkor-youth-camp"
  | "gnaas-ttu"
  | "djago-design-build"
  | "boss-clothing"
  | "bachelor-party"
  | "adom-ba-cold-store"
  | "citation-series";
}

const CATEGORIES = [
  "All",
  "Branding & Identity",
  "Advertising & Flyers",
  "Banners & Signage",
  "Packaging & Labels",
  "Typography",
];
const DISCIPLINES = CATEGORIES;

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

const TRAILBLAZERS_GALLERY: LightboxItem[] = [
  {
    img: trailblazersEmblem,
    title: "Trailblazers Pathfinder Club Emblem",
    category: "Branding & Identity",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    description: "Club emblem that combines a mountain trail, compass, and explorer silhouette to represent adventure and service.",
  },
  {
    img: trailblazersWordmark,
    title: "Trailblazers Pathfinder Club Wordmark",
    category: "Branding & Identity",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    description: "Primary club wordmark and tagline: Adventurous and willing to serve.",
  },
  {
    img: trailblazersFlag,
    title: "Trailblazers Pathfinder Club Flag",
    category: "Branding & Identity",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    description: "Flag mockup showing the Pathfinder Club identity applied in a physical setting.",
  },
  {
    img: trailblazersPhoto,
    title: "Trailblazers Pathfinder Club — In the Field",
    category: "Branding & Identity",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    description: "Members of the Trailblazers Pathfinder Club proudly wearing the club identity in action.",
  },
  {
    img: trailblazersPhotoTwo,
    title: "Trailblazers Pathfinder Club — Group II",
    category: "Branding & Identity",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    description: "Group photo showcasing the Trailblazers brand identity worn by club members.",
  },
  {
    img: trailblazersPhotoThree,
    title: "Trailblazers Pathfinder Club — Group III",
    category: "Branding & Identity",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    description: "Club members in uniform demonstrating the Trailblazers visual identity in a real-world context.",
  },
  {
    img: trailblazersPhotoFour,
    title: "Trailblazers Pathfinder Club — Group IV",
    category: "Branding & Identity",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    description: "Trailblazers club members assembled, displaying the branding applied to club apparel and flags.",
  },
  {
    img: trailblazersPhotoFive,
    title: "Trailblazers Pathfinder Club — Group V",
    category: "Branding & Identity",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    description: "Final group shot of Trailblazers Pathfinder Club members, celebrating unity and adventure.",
  },
];

const EWURABAS_COUTURE_GALLERY: LightboxItem[] = [
  {
    img: ewurabasCoutureLogo,
    title: "Ewuraba's Couture Logo",
    category: "Branding & Identity",
    client: "Ewuraba's Couture",
    year: "2024",
    description: "Fashion logo identity combining a needle, thread, and silhouette to express bespoke dressmaking.",
  },
  {
    img: ewurabasCoutureWallMockup,
    title: "Ewuraba's Couture 3D Wall Sign",
    category: "Branding & Identity",
    client: "Ewuraba's Couture",
    year: "2024",
    description: "3D wall-sign mockup demonstrating the Ewuraba's Couture identity in a physical retail setting.",
  },
];

const NEW_LIFE_SDA_GALLERY: LightboxItem[] = [
  {
    img: newLifeOrionEmblem,
    title: "Orion Pathfinder Club Emblem",
    category: "Branding & Identity",
    client: "New Life SDA Church",
    year: "2024",
    description: "A bold Pathfinder Club emblem featuring the Orion star and club colours for New Life SDA Church.",
  },
  {
    img: newLifeOrionFlag,
    title: "Orion Pathfinder Club Flag",
    category: "Branding & Identity",
    client: "New Life SDA Church",
    year: "2024",
    description: "Flag application of the Orion Pathfinder Club identity for New Life SDA Church.",
  },
];

const OASIS_CAMPOUT_GALLERY: LightboxItem[] = [
  {
    img: oasisCampoutPoster,
    title: "Oasis Pathfinder Club Campout 2024",
    category: "Advertising & Flyers",
    client: "GNAAS UEW-Ajumako AYM",
    year: "2024",
    description: "Key campaign poster for the Oasis Pathfinder Club Campout, themed Dare to Be Different.",
  },
  {
    img: oasisCampoutRules,
    title: "Campout Rules",
    category: "Advertising & Flyers",
    client: "GNAAS UEW-Ajumako AYM",
    year: "2024",
    description: "Information design outlining rules and guidance for Campout 2024 participants.",
  },
  {
    img: oasisCampoutDressCode,
    title: "Campout Dress Code",
    category: "Advertising & Flyers",
    client: "GNAAS UEW-Ajumako AYM",
    year: "2024",
    description: "A clear visual dress-code guide created for Campout 2024.",
  },
  {
    img: oasisCampoutPackingList,
    title: "Campout Packing List",
    category: "Advertising & Flyers",
    client: "GNAAS UEW-Ajumako AYM",
    year: "2024",
    description: "Pre-event packing checklist designed for Campout 2024 attendees.",
  },
  {
    img: oasisCampoutThankYou,
    title: "Campout Thank You",
    category: "Advertising & Flyers",
    client: "GNAAS UEW-Ajumako AYM",
    year: "2024",
    description: "Closing appreciation graphic created for Campout 2024 participants and supporters.",
  },
];

const ODORKOR_YOUTH_CAMP_GALLERY: LightboxItem[] = [
  {
    img: odorkorYouthCampPoster,
    title: "Youth Camp 2025 — Main Poster",
    category: "Advertising & Flyers",
    client: "Odorkor District Youth Ministry",
    year: "2025",
    description: "Key event poster for the Odorkor District AYM Youth Camp 2025, themed Righteousness: The Story of Noah and the Flood.",
  },
  {
    img: odorkorMountainJai,
    title: "Mountain Jai Hike & Excursion",
    category: "Advertising & Flyers",
    client: "Odorkor District Youth Ministry",
    year: "2025",
    description: "Promotional graphic for the Mountain Jai hike and excursion on 26th December 2025, highlighting tourist attractions.",
  },
  {
    img: odorkorDressCode,
    title: "Youth Camp Dress Codes",
    category: "Advertising & Flyers",
    client: "Odorkor District Youth Ministry",
    year: "2025",
    description: "Visual dress-code guide for each day of the Youth Camp, designed for clarity and camp identity.",
  },
  {
    img: odorkorPackingList,
    title: "Righteousness Packing List",
    category: "Advertising & Flyers",
    client: "Odorkor District Youth Ministry",
    year: "2025",
    description: "Pre-event packing checklist designed for Youth Camp 2025 attendees, themed around the Righteousness campaign.",
  },
];

const CITATION_SERIES_GALLERY: LightboxItem[] = [
  [citationAbora, "Commander Abora Emmanuel"],
  [citationAwuni, "Commander Awuni Gershon"],
  [citationAseidu, "Director Aseidu Justice"],
  [citationJoseph, "Director Joseph Asare"],
  [citationAndrews, "Doc Andrews Acquah"],
  [citationElizabeth, "Elizabeth Annor"],
  [citationKelvin, "Kelvin Peter"],
  [citationKen, "Ken Ndoli"],
  [citationMary, "MG Mary Asimeng"],
  [citationMaxwell, "Mr Maxwell Smith"],
  [citationRansford, "Pastor Ransford Osarfo Gyasi"],
  [citationDaniel, "Ps Daniel Amissah"],
  [citationThomas, "Thomas Owusu"],
].map(([img, recipient]) => ({
  img,
  title: `Citation in Honour of ${recipient}`,
  category: "Advertising & Flyers",
  client: "GNAAS-UEW Adventist Youth Ministry",
  year: "2024",
  description: `Recognition citation design created in honour of ${recipient}.`,
}));

const GNAAS_TTU_GALLERY: LightboxItem[] = [
  {
    img: gnaasWelcome,
    title: "Welcome to GNAAS TTU",
    category: "Advertising & Flyers",
    client: "GNAAS TTU",
    year: "2025",
    description: "Official welcome banner for Ghana National Association of Adventist Students (Takoradi Technical University Chapter) ushering in the 2024/2025 academic year.",
  },
  {
    img: gnaasFreshersDay,
    title: "Fresher's Day & Harvest",
    category: "Advertising & Flyers",
    client: "GNAAS TTU",
    year: "2025",
    description: "Event promotional flyer for GNAAS TTU Fresher's Day & Harvest fundraiser held at TTU Rooftop.",
  },
  {
    img: gnaasHarvestAppeal,
    title: "Harvest Appeal & Fundraising Ticket",
    category: "Advertising & Flyers",
    client: "GNAAS TTU",
    year: "2025",
    description: "Fundraising campaign banner and card in aid of acquiring a keyboard, microphones, and mixer for campus worship.",
  },
  {
    img: gnaasZecMeeting,
    title: "1st ZEC Meeting 2025",
    category: "Advertising & Flyers",
    client: "GNAAS SWGC Zone",
    year: "2025",
    description: "Executive Council promotional flyer for GNAAS South West Ghana Conference Zone held at UMaT Essikado Campus.",
  },
  {
    img: gnaasFragranceOfPraise,
    title: "The Fragrance of Praise",
    category: "Advertising & Flyers",
    client: "GNAAS TTU",
    year: "2024",
    description: "Thematic afternoon service graphic exploring 2 Corinthians 2:15 and 'The Church and Dressing' at TTU Rooftop.",
  },
  {
    img: gnaasFriendToHave,
    title: "The Friend to Have",
    category: "Advertising & Flyers",
    client: "GNAAS TTU",
    year: "2024",
    description: "Afternoon fellowship and sermon graphic based on Proverbs 12:26 addressing 'The Two Faces of Kindness'.",
  },
];

const DJAGO_BRANDING_GALLERY: LightboxItem[] = [
  {
    img: djagoFullBlack,
    title: "Djago Design & Build — Primary Brand Identity",
    category: "Branding & Identity",
    client: "Djago Design & Build",
    year: "2026",
    description: "Primary visual identity for Djago Design & Build featuring architectural monogram mark, corporate logotype, and design/engineering/interiors discipline markers.",
  },
  {
    img: djagoLogotypeBlack,
    title: "Djago Design & Build — Logotype Lockup",
    category: "Branding & Identity",
    client: "Djago Design & Build",
    year: "2026",
    description: "Logotype lockup version in onyx black and accent gold, crafted for site boards, architectural drawings, and company collateral.",
  },
  {
    img: djagoEmblemBlack,
    title: "Djago Monogram Emblem — Minimalist Mark",
    category: "Branding & Identity",
    client: "Djago Design & Build",
    year: "2026",
    description: "Standalone architectural monogram emblem fusing the initial 'D' with pitched roofline, mullioned window, and rising skyscrapers.",
  },
  {
    img: djagoFullGold,
    title: "Djago Design & Build — Gold Edition Full Lockup",
    category: "Branding & Identity",
    client: "Djago Design & Build",
    year: "2026",
    description: "Luxury metallic gold and crisp white identity system engineered specifically for dark surfaces, corporate presentations, and luxury dossiers.",
  },
  {
    img: djagoLogotypeGold,
    title: "Djago Design & Build — Gold Edition Logotype",
    category: "Branding & Identity",
    client: "Djago Design & Build",
    year: "2026",
    description: "Refined gold lockup delivering high-contrast prestige on dark backgrounds and luxury presentation collateral.",
  },
  {
    img: djagoEmblemGold,
    title: "Djago Monogram Emblem — Gold Edition",
    category: "Branding & Identity",
    client: "Djago Design & Build",
    year: "2026",
    description: "Iconic metallic gold monogram symbol for app icons, hard hats, stamps, site wear, and architectural watermarks.",
  },
];

const BOSS_CLOTHING_GALLERY: LightboxItem[] = [
  {
    img: bossLogo1,
    title: "Boss Clothing — Primary Logo",
    category: "Branding & Identity",
    client: "Boss Clothing",
    year: "2024",
    description: "Primary logotype mark for Boss Clothing, designed with bold typographic confidence to communicate premium streetwear identity.",
  },
  {
    img: bossLogo2,
    title: "Boss Clothing — Secondary Logo Variant",
    category: "Branding & Identity",
    client: "Boss Clothing",
    year: "2024",
    description: "Secondary logo variation offering layout flexibility across different apparel placements and brand touchpoints.",
  },
  {
    img: bossCloth1,
    title: "Boss Clothing — Collection Look 1",
    category: "Branding & Identity",
    client: "Boss Clothing",
    year: "2024",
    description: "First garment from the Boss Clothing collection, styled to showcase the brand's premium streetwear aesthetic.",
  },
  {
    img: bossCloth2,
    title: "Boss Clothing — Collection Look 2",
    category: "Branding & Identity",
    client: "Boss Clothing",
    year: "2024",
    description: "Second garment from the Boss Clothing collection, reinforcing the bold and refined visual language of the brand.",
  },
  {
    img: bossShirtMockup1,
    title: "Boss Clothing — Shirt Mockup I",
    category: "Branding & Identity",
    client: "Boss Clothing",
    year: "2024",
    description: "Branded shirt mockup demonstrating how the Boss logo applies to button-up apparel for client presentation.",
  },
  {
    img: bossShirtMockup2,
    title: "Boss Clothing — Shirt Mockup II",
    category: "Branding & Identity",
    client: "Boss Clothing",
    year: "2024",
    description: "Second shirt mockup variant exploring alternate colourways and logo placement for the Boss Clothing identity system.",
  },
];

const BACHELOR_PARTY_GALLERY: LightboxItem[] = [
  {
    img: bachelorParty1,
    title: "Bachelor Party — Flyer Design I",
    category: "Advertising & Flyers",
    client: "Bachelor Party Event",
    year: "2023",
    description: "First in a series of bachelor party event flyers, combining bold typography with a premium celebratory aesthetic.",
  },
  {
    img: bachelorParty2,
    title: "Bachelor Party — Flyer Design II",
    category: "Advertising & Flyers",
    client: "Bachelor Party Event",
    year: "2023",
    description: "Second flyer variant for the bachelor party campaign, maintaining visual consistency with dynamic layout energy.",
  },
  {
    img: bachelorParty3,
    title: "Bachelor Party — Flyer Design III",
    category: "Advertising & Flyers",
    client: "Bachelor Party Event",
    year: "2023",
    description: "Third design in the bachelor party flyer series, reinforcing the event's brand tone and guest appeal.",
  },
  {
    img: bachelorParty4,
    title: "Bachelor Party — Flyer Design IV",
    category: "Advertising & Flyers",
    client: "Bachelor Party Event",
    year: "2023",
    description: "Final flyer design in the bachelor party campaign, completing a cohesive four-piece promotional suite.",
  },
];

const ADOM_BA_COLD_STORE_GALLERY: LightboxItem[] = [
  {
    img: adomBaHorizontalBanner,
    title: "Adom Ba Cold Store — Horizontal Storefront Banner",
    category: "Banners & Signage",
    client: "Adom Ba Cold Store",
    year: "2024",
    description: "Storefront signage and horizontal banner for Adom Ba Cold Store, highlighting wholesale and retail meat, poultry, and fish offerings.",
  },
  {
    img: adomBaRollup1,
    title: "Adom Ba Cold Store — Roll-Up Display Banner I",
    category: "Banners & Signage",
    client: "Adom Ba Cold Store",
    year: "2024",
    description: "Promotional roll-up display banner showcasing available cold store products with clear pricing units and contact information.",
  },
  {
    img: adomBaRollup2,
    title: "Adom Ba Cold Store — Roll-Up Display Banner II",
    category: "Banners & Signage",
    client: "Adom Ba Cold Store",
    year: "2024",
    description: "Alternate vertical roll-up banner design emphasizing wholesale & retail services with composite product imagery.",
  },
];

const PROJECTS: DesignProject[] = [
  {
    id: 34,
    title: "Adom Ba Cold Store Signage Suite",
    client: "Adom Ba Cold Store",
    year: "2024",
    img: adomBaHorizontalBanner,
    wide: true,
    discipline: "Banners & Signage",
    gallery: "adom-ba-cold-store",
    category: "Banners & Signage",
    description:
      "A complete commercial signage suite for Adom Ba Cold Store, featuring wide-format storefront fascia banners and vertical roll-up promotional displays. Click to view the full collection.",
  },
  {
    id: 33,
    title: "Bachelor Party Campaign",
    client: "Bachelor Party Event",
    year: "2023",
    img: bachelorParty1,
    wide: false,
    discipline: "Advertising & Flyers",
    gallery: "bachelor-party",
    category: "Advertising & Flyers",
    description:
      "A four-piece promotional flyer suite for a bachelor party event, featuring bold typography, high-energy layouts, and a premium celebratory visual theme. Click to view the full campaign.",
  },
  {
    id: 32,
    title: "Boss Clothing Brand Identity",
    client: "Boss Clothing",
    year: "2024",
    img: bossLogo1,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "boss-clothing",
    category: "Branding & Identity",
    description:
      "A full brand identity system for Boss Clothing — a premium streetwear label. Covers logo design, typographic lockups, and apparel mockups across two distinct colourways. Click to view the complete identity.",
  },
  {
    id: 31,
    title: "Djago Design & Build Identity",
    client: "Djago Design & Build",
    year: "2026",
    img: djagoFullBlack,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "djago-design-build",
    category: "Branding & Identity",
    description:
      "A complete corporate identity suite for Djago Design & Build, featuring architectural monogram marks, logotype lockups, discipline markers, and luxury gold editions for print and digital applications. Click to view the full identity system.",
  },
  {
    id: 30,
    title: "GNAAS TTU Campus Ministry Campaign",
    client: "GNAAS TTU",
    year: "2025",
    img: gnaasWelcome,
    wide: false,
    discipline: "Advertising & Flyers",
    gallery: "gnaas-ttu",
    category: "Advertising & Flyers",
    description:
      "A comprehensive design suite for the Ghana National Association of Adventist Students (Takoradi Technical University), featuring the 2024/2025 academic welcome poster, Fresher's Day & Harvest fundraiser, ZEC leadership conference, and fellowship campaign graphics. Click to view the full collection.",
  },
  {
    id: 29,
    title: "Odorkor District AYM Youth Camp 2025",
    client: "Odorkor District Youth Ministry",
    year: "2025",
    img: odorkorYouthCampPoster,
    wide: false,
    discipline: "Advertising & Flyers",
    gallery: "odorkor-youth-camp",
    category: "Advertising & Flyers",
    description:
      "A four-piece event campaign for the Odorkor District AYM Youth Camp 2025, including the main poster, Mountain Jai excursion graphic, dress codes, and packing list. Click to view the full campaign.",
  },
  {
    id: 28,
    title: "Blistavo Events Certificate of Honour",
    client: "Blistavo Events",
    year: "2024",
    img: blistavoCertificate,
    wide: false,
    discipline: "Advertising & Flyers",
    category: "Advertising & Flyers",
    description:
      "A bespoke Certificate of Honour designed for Blistavo Events to celebrate dedicated service and meritorious commitment with luxury event framing, regal seal, and celebratory typography.",
  },
  {
    id: 27,
    title: "Adventist Youth Ministry Citation Series",
    client: "GNAAS-UEW Adventist Youth Ministry",
    year: "2024",
    img: citationAbora,
    wide: false,
    discipline: "Advertising & Flyers",
    gallery: "citation-series",
    category: "Advertising & Flyers",
    description:
      "A 13-piece recognition citation series designed to honour leaders and contributors in the Adventist Youth Ministry. Click to view the complete series.",
  },
  {
    id: 26,
    title: "Oasis Pathfinder Club Campout",
    client: "GNAAS UEW-Ajumako AYM",
    year: "2024",
    img: oasisCampoutPoster,
    wide: false,
    discipline: "Advertising & Flyers",
    gallery: "oasis-campout",
    category: "Advertising & Flyers",
    description:
      "A five-piece event campaign for the Oasis Pathfinder Club Campout, including the event poster, rules, dress code, packing list, and thank-you graphic. Click to view the full campaign.",
  },
  {
    id: 25,
    title: "Orion Pathfinder Club",
    client: "New Life SDA Church",
    year: "2024",
    img: newLifeOrionEmblem,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "new-life-sda",
    category: "Branding & Identity",
    description:
      "A complete Pathfinder Club identity for New Life SDA Church, including an emblem and flag application. Click to view the full branding gallery.",
  },
  {
    id: 24,
    title: "Trailblazers Pathfinder Club",
    client: "Trailblazers Pathfinder Club",
    year: "2024",
    img: trailblazersEmblem,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "trailblazers",
    category: "Branding & Identity",
    description:
      "A complete Pathfinder Club identity featuring an emblem, wordmark, and flag application. Click to view the full branding gallery.",
  },
  {
    id: 23,
    title: "Ewuraba's Couture Logo",
    client: "Ewuraba's Couture",
    year: "2024",
    img: ewurabasCoutureLogo,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "ewurabas-couture",
    category: "Branding & Identity",
    description:
      "A fashion-focused logo identity for Ewuraba's Couture, with a 3D wall-sign application. Click to view the full branding gallery.",
  },
  {
    id: 1,
    title: "iDESIGN Brand Identity",
    client: "iDESIGN Studio",
    year: "2026",
    img: callCardFront,
    wide: true,
    discipline: "Branding & Identity",
    gallery: "idesign",
    category: "Branding & Identity",
    description:
      "A curated identity set featuring the studio's logo variations and brand artwork. Click to view the full branding gallery.",
  },
  {
    id: 4,
    title: "Food Sticker",
    client: "Food Sticker",
    year: "2024",
    img: stickerFood,
    wide: true,
    discipline: "Advertising & Flyers",
    gallery: "foodsticker",
    category: "Advertising & Flyers",
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
    discipline: "Advertising & Flyers",
    gallery: "dutchbraids",
    category: "Advertising & Flyers",
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
    discipline: "Banners & Signage",
    gallery: "glamour",
    category: "Banners & Signage",
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
    discipline: "Advertising & Flyers",
    gallery: "adombeauty",
    category: "Advertising & Flyers",
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
    discipline: "Advertising & Flyers",
    gallery: "fashion",
    category: "Advertising & Flyers",
    description:
      "A fashion-focused advertising visual for a stylish promotional campaign. Click to view the Fashion gallery.",
  },
  {
    id: 13,
    title: "iDESIGN Brand Assets",
    client: "iDESIGN Studio",
    year: "2026",
    img: shirt,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "idesign",
    category: "Branding & Identity",
    description:
      "Logo systems, regional marks, and visual assets packaged for a consistent brand presence.",
  },

  {
    id: 7,
    title: "Funeral Brand",
    client: "Memorial Identity",
    year: "2026",
    img: funeralTShirt,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "funeral",
    category: "Branding & Identity",
    description:
      "A respectful memorial branding set featuring custom apparel designs. Click to view the funeral brand gallery.",
  },
  {
    id: 8,
    title: "OneVoice27",
    client: "OneVoice27",
    year: "2026",
    img: oneVoice,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "onevoice",
    category: "Branding & Identity",
    description:
      "A focused brand identity piece for OneVoice27. Click to view the OneVoice27 branding gallery.",
  },
  {
    id: 9,
    title: "Speak Lord",
    client: "Speak Lord",
    year: "2026",
    img: speakLord,
    wide: false,
    discipline: "Branding & Identity",
    gallery: "speaklord",
    category: "Branding & Identity",
    description:
      "A faith-centered brand identity set for Speak Lord. Click to view the Speak Lord branding gallery.",
  },
  {
    id: 14,
    title: "Nails by Jane",
    client: "Nails by Jane",
    year: "2026",
    img: janeNails,
    wide: false,
    discipline: "Advertising & Flyers",
    gallery: "nailsbyjane",
    category: "Advertising & Flyers",
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
    discipline: "Packaging & Labels",
    gallery: "icecream",
    category: "Packaging & Labels",
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
    discipline: "Advertising & Flyers",
    gallery: "effes",
    category: "Advertising & Flyers",
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
    discipline: "Advertising & Flyers",
    gallery: "owusuwaa",
    category: "Advertising & Flyers",
    description:
      "Sophisticated luxury hair and beauty brand advertising. Click to view the gallery.",
  },
  {
    id: 18,
    title: "God Have Mercy Food Joint",
    client: "God Have Mercy Food Joint",
    year: "2026",
    img: godHaveMercy,
    wide: true,
    discipline: "Banners & Signage",
    gallery: "godhavemercy",
    category: "Banners & Signage",
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
    discipline: "Branding & Identity",
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
    discipline: "Advertising & Flyers",
    gallery: "tinabundle",
    category: "Advertising & Flyers",
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
    discipline: "Advertising & Flyers",
    gallery: "opensoon",
    category: "Advertising & Flyers",
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
    discipline: "Branding & Identity",
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
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "iDESIGN Studio delivers bespoke graphic design and brand identity systems in Accra, Ghana — logos, stationery, packaging, and full visual identities for startups and established brands.");
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>(PROJECTS);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;
      const matchesQuery =
        p.title.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        p.discipline.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => Number(b.year) - Number(a.year));
  }, [activeCategory, searchQuery]);

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
            backgroundImage: `url(${graphicDesignBackground})`,
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
              href={`https://wa.me/233502310663?text=${encodeURIComponent(
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

      {/* Discipline filter & Search Bar */}
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
              placeholder="Search by client, title, packaging, banner..."
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
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1.1rem",
                  border: `1px solid ${activeCategory === cat ? GOLD : BORDER}`,
                  background: activeCategory === cat ? GOLD : "transparent",
                  color: activeCategory === cat ? WHITE : MUTED,
                  cursor: "pointer",
                  borderRadius: "3px",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span>{cat}</span>
                <span
                  style={{
                    opacity: 0.8,
                    fontSize: "0.6rem",
                    padding: "0.1rem 0.35rem",
                    borderRadius: "10px",
                    background: activeCategory === cat ? "rgba(0,0,0,0.18)" : "rgba(13,12,9,0.06)",
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
            Showing {filteredProjects.length} of {PROJECTS.length} showcase projects
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

      {/* Portfolio grid */}
      <section style={{ padding: "3rem 2rem 5rem", maxWidth: "1280px", margin: "0 auto" }}>
        {filteredProjects.length === 0 ? (
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
              No showcase projects found
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
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}>
            {filteredProjects.map((p, i) => (

              <FadeUp key={p.id} delay={Math.min(i * 0.04, 0.25)}>
                <div
                  className={`group relative overflow-hidden rounded-[6px] cursor-pointer shadow-[0_4px_20px_rgba(26,24,20,0.08)] ${p.wide ? "md:col-span-2" : ""}`}
                  style={{
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                  }}
                  onClick={() => {
                    if (p.gallery === "citation-series") {
                      setLightboxItems(CITATION_SERIES_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "oasis-campout") {
                      setLightboxItems(OASIS_CAMPOUT_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "new-life-sda") {
                      setLightboxItems(NEW_LIFE_SDA_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "ewurabas-couture") {
                      setLightboxItems(EWURABAS_COUTURE_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "trailblazers") {
                      setLightboxItems(TRAILBLAZERS_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

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

                    if (p.gallery === "odorkor-youth-camp") {
                      setLightboxItems(ODORKOR_YOUTH_CAMP_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "gnaas-ttu") {
                      setLightboxItems(GNAAS_TTU_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "djago-design-build") {
                      setLightboxItems(DJAGO_BRANDING_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "boss-clothing") {
                      setLightboxItems(BOSS_CLOTHING_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "bachelor-party") {
                      setLightboxItems(BACHELOR_PARTY_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    if (p.gallery === "adom-ba-cold-store") {
                      setLightboxItems(ADOM_BA_COLD_STORE_GALLERY);
                      setLightboxIndex(0);
                      return;
                    }

                    setLightboxItems(filteredProjects);
                    setLightboxIndex(i);
                  }}
                >
                  <div style={{ paddingBottom: p.wide ? "46%" : "68%", position: "relative", overflow: "hidden" }}>
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{
                        filter: "brightness(0.92)",
                        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease",
                      }}
                    />

                    <div
                      className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
                      aria-hidden="true"
                      style={{ zIndex: 1 }}
                    />

                    {/* Corner indicator badge */}
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 2 }}>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          background: "rgba(13, 12, 9, 0.78)",
                          color: GOLD,
                          border: "1px solid rgba(200, 165, 74, 0.4)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "3px",
                        }}
                      >
                        {p.discipline}
                      </span>
                    </div>

                    <div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "1.75rem",
                        zIndex: 2,
                      }}
                    >
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p
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
                        </p>
                        <h3
                          style={{
                            fontFamily: "'DM Serif Display',serif",
                            fontSize: "1.45rem",
                            color: WHITE,
                            marginBottom: "0.25rem",
                          }}
                        >
                          {p.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'Work Sans', sans-serif",
                            fontSize: "0.82rem",
                            color: "#d8d3cb",
                            lineHeight: "1.5",
                            maxWidth: "600px",
                          }}
                        >
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
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
            href={`https://wa.me/233502310663?text=${encodeURIComponent(
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
