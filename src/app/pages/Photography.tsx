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

// Portrait Campaign 4: Radiant Studio Lifestyle
import lifestyleBlueDress from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-1-baby-blue-dress.jpg";
import lifestyleOrangeDress from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-2-orange-pleated-dress.jpg";
import lifestyleYellowBlouse from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-3-yellow-blouse-pose.jpg";
import lifestyleFramePose from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-4-camera-frame-pose.jpg";
import lifestyleCushionPortrait from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-5-cushion-portrait-closeup.jpg";
import lifestyleAdded6 from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-6-added.jpg";
import lifestyleAdded7 from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-7-added.jpg";
import lifestyleAdded8 from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-8-added.jpg";
import lifestyleAdded9 from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-9-added.jpg";
import lifestyleAdded10 from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-10-added.jpg";

// Portrait Campaign 5: Coastal Serenity
import coastalImg1 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7004.jpg";
import coastalImg2 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7009.jpg";
import coastalImg3 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7015.jpg";
import coastalImg4 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7016.jpg";
import coastalImg5 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7038.jpg";
import coastalImg6 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7047.jpg";
import coastalImg7 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7049.jpg";
import coastalImg8 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7091.jpg";
import coastalImg9 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7117.jpg";
import coastalImg10 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7127.jpg";
import coastalImg11 from "@/imports/Photography/Portrait/Coastal Serenity/IMG_7129.jpg";

// Event Campaign: Contemporary Design & Arts Exhibition
import exhibitImg01 from "@/imports/Photography/Events/exhibition/IMG-0589.jpg";
import exhibitImg02 from "@/imports/Photography/Events/exhibition/IMG-0597.jpg";
import exhibitImg03 from "@/imports/Photography/Events/exhibition/IMG-0599.jpg";
import exhibitImg04 from "@/imports/Photography/Events/exhibition/IMG-0603.jpg";
import exhibitImg05 from "@/imports/Photography/Events/exhibition/IMG-0605.jpg";
import exhibitImg06 from "@/imports/Photography/Events/exhibition/IMG-0607.jpg";
import exhibitImg07 from "@/imports/Photography/Events/exhibition/IMG-0609.jpg";
import exhibitImg08 from "@/imports/Photography/Events/exhibition/IMG-0610.jpg";
import exhibitImg09 from "@/imports/Photography/Events/exhibition/IMG-0611.jpg";
import exhibitImg10 from "@/imports/Photography/Events/exhibition/IMG-0612.jpg";
import exhibitImg11 from "@/imports/Photography/Events/exhibition/IMG-0614.jpg";
import exhibitImg12 from "@/imports/Photography/Events/exhibition/IMG-0615.jpg";
import exhibitImg13 from "@/imports/Photography/Events/exhibition/IMG-0616.jpg";
import exhibitImg14 from "@/imports/Photography/Events/exhibition/IMG-0617.jpg";
import exhibitImg15 from "@/imports/Photography/Events/exhibition/IMG-0714.jpg";
import exhibitImg16 from "@/imports/Photography/Events/exhibition/IMG-0715.jpg";
import exhibitImg17 from "@/imports/Photography/Events/exhibition/IMG-0716.jpg";
import exhibitImg18 from "@/imports/Photography/Events/exhibition/IMG-0717.jpg";
import exhibitImg19 from "@/imports/Photography/Events/exhibition/IMG-0718.jpg";
import exhibitImg20 from "@/imports/Photography/Events/exhibition/IMG-0719.jpg";
import exhibitImg21 from "@/imports/Photography/Events/exhibition/IMG-0722.jpg";
import exhibitImg22 from "@/imports/Photography/Events/exhibition/IMG-0724.jpg";
import exhibitImg23 from "@/imports/Photography/Events/exhibition/IMG-0727.jpg";
import exhibitImg24 from "@/imports/Photography/Events/exhibition/IMG-0729.jpg";
import exhibitImg25 from "@/imports/Photography/Events/exhibition/IMG-0730.jpg";
import exhibitImg26 from "@/imports/Photography/Events/exhibition/IMG-0781.jpg";

// Event Campaign 2: The Graduate — Milestone Celebration
import gradImg01 from "@/imports/Photography/Events/graduation/IMG_5524.jpg";
import gradImg02 from "@/imports/Photography/Events/graduation/IMG_5530.jpg";
import gradImg03 from "@/imports/Photography/Events/graduation/IMG_5539.jpg";
import gradImg04 from "@/imports/Photography/Events/graduation/IMG_5552.jpg";
import gradImg05 from "@/imports/Photography/Events/graduation/IMG_5564.jpg";
import gradImg06 from "@/imports/Photography/Events/graduation/IMG_5586.jpg";
import gradImg07 from "@/imports/Photography/Events/graduation/IMG_5590.jpg";
import gradImg08 from "@/imports/Photography/Events/graduation/IMG_5606.jpg";
import gradImg09 from "@/imports/Photography/Events/graduation/IMG_5630.jpg";
import gradImg10 from "@/imports/Photography/Events/graduation/IMG_5643.jpg";

// Event Campaign 3: Investiture Services
import investitureImg01 from "@/imports/Photography/Events/Investiture Services/IMG_0419.jpg";
import investitureImg02 from "@/imports/Photography/Events/Investiture Services/IMG_0423.jpg";
import investitureImg03 from "@/imports/Photography/Events/Investiture Services/IMG_0432.jpg";
import investitureImg04 from "@/imports/Photography/Events/Investiture Services/IMG_0433.jpg";
import investitureImg05 from "@/imports/Photography/Events/Investiture Services/IMG_0453.jpg";
import investitureImg06 from "@/imports/Photography/Events/Investiture Services/IMG_0461.jpg";
import investitureImg07 from "@/imports/Photography/Events/Investiture Services/IMG_0517.jpg";
import investitureImg08 from "@/imports/Photography/Events/Investiture Services/IMG_0518.jpg";
import investitureImg09 from "@/imports/Photography/Events/Investiture Services/IMG_0536.jpg";
import investitureImg10 from "@/imports/Photography/Events/Investiture Services/IMG_0573.jpg";
import investitureImg11 from "@/imports/Photography/Events/Investiture Services/IMG_1071.jpg";
import investitureImg12 from "@/imports/Photography/Events/Investiture Services/IMG_1110.jpg";
import investitureImg13 from "@/imports/Photography/Events/Investiture Services/IMG_1124.jpg";
import investitureImg14 from "@/imports/Photography/Events/Investiture Services/IMG_1149.jpg";
import investitureImg15 from "@/imports/Photography/Events/Investiture Services/IMG_1152.jpg";
import investitureImg16 from "@/imports/Photography/Events/Investiture Services/IMG_1191.jpg";
import investitureImg17 from "@/imports/Photography/Events/Investiture Services/IMG_1197.jpg";
import investitureImg18 from "@/imports/Photography/Events/Investiture Services/IMG_1201.jpg";
import investitureImg19 from "@/imports/Photography/Events/Investiture Services/IMG_1210.jpg";
import investitureImg20 from "@/imports/Photography/Events/Investiture Services/IMG_1212.jpg";

// Documentary Campaign: Ghana Month — Heritage & Cultural Pride
import ghanaMonthImg01 from "@/imports/Photography/Documentary/Ghana Month/IMG_6339.jpg";
import ghanaMonthImg02 from "@/imports/Photography/Documentary/Ghana Month/IMG_6374.jpg";
import ghanaMonthImg03 from "@/imports/Photography/Documentary/Ghana Month/IMG_6386.jpg";
import ghanaMonthImg04 from "@/imports/Photography/Documentary/Ghana Month/IMG_63871.jpg";
import ghanaMonthImg05 from "@/imports/Photography/Documentary/Ghana Month/IMG_6403.jpg";
import ghanaMonthImg06 from "@/imports/Photography/Documentary/Ghana Month/IMG_6414.jpg";
import ghanaMonthImg07 from "@/imports/Photography/Documentary/Ghana Month/IMG_6429.jpg";
import ghanaMonthImg08 from "@/imports/Photography/Documentary/Ghana Month/IMG_6437.jpg";
import ghanaMonthImg09 from "@/imports/Photography/Documentary/Ghana Month/IMG_6442.jpg";
import ghanaMonthImg10 from "@/imports/Photography/Documentary/Ghana Month/IMG_6475.jpg";
import ghanaMonthImg11 from "@/imports/Photography/Documentary/Ghana Month/IMG_6482.jpg";
import ghanaMonthImg12 from "@/imports/Photography/Documentary/Ghana Month/IMG_6503.jpg";

// Commercial Campaign: The Engineer — Bold & Professional
import engineerImg01 from "@/imports/Photography/Engineer & Studio Glam/IMG_6838.jpg";
import engineerImg02 from "@/imports/Photography/Engineer & Studio Glam/IMG_6865.jpg";
import engineerImg03 from "@/imports/Photography/Engineer & Studio Glam/IMG_6882.jpg";

// Portrait Campaign: Studio Glam Editorial — African Haute Couture
import glamImg01 from "@/imports/Photography/Engineer & Studio Glam/IMG_6892.jpg";
import glamImg02 from "@/imports/Photography/Engineer & Studio Glam/IMG_6912.jpg";
import glamImg03 from "@/imports/Photography/Engineer & Studio Glam/IMG_6920.jpg";
import glamImg04 from "@/imports/Photography/Engineer & Studio Glam/IMG_6922.jpg";
import glamImg05 from "@/imports/Photography/Engineer & Studio Glam/IMG_6929.jpg";
import glamImg06 from "@/imports/Photography/Engineer & Studio Glam/IMG_6936.jpg";
import glamImg07 from "@/imports/Photography/Engineer & Studio Glam/IMG_6949.jpg";
import glamImg08 from "@/imports/Photography/Engineer & Studio Glam/IMG_6955.jpg";
import glamImg09 from "@/imports/Photography/Engineer & Studio Glam/IMG_69552.jpg";

// Portrait Campaign: Urban Chic & Sisterhood — Studio Editorial
import urbanChicImg01 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0817.jpg";
import urbanChicImg02 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0823.jpg";
import urbanChicImg03 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0827.jpg";
import urbanChicImg04 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0832-1.jpg";
import urbanChicImg05 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0854.jpg";
import urbanChicImg06 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0855.jpg";
import urbanChicImg07 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0886.jpg";
import urbanChicImg08 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0906.jpg";
import urbanChicImg09 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0910.jpg";
import urbanChicImg10 from "@/imports/Photography/Portrait/Urban Chic & Sisterhood/IMG_0912.jpg";

const CATEGORIES = ["All", "Product", "Food", "Commercial", "Portrait", "Event", "Documentary", "Still Life"];

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

/* ─── Gallery 10: Radiant Studio Lifestyle (Portrait) ───────────────── */
const STUDIO_LIFESTYLE_GALLERY: LightboxItem[] = [
  {
    img: lifestyleBlueDress,
    title: "Radiant Lifestyle — Pastel Blue Elegance",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description:
      "Joyful high-key studio portrait seated on a velvet ottoman in a textured powder-blue summer dress, accented with golden floral arrangement.",
  },
  {
    img: lifestyleOrangeDress,
    title: "Radiant Lifestyle — Sun-Stripe Poise",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description:
      "Vibrant full-length studio fashion study in an orange-and-white ribbed pleated dress, featuring natural smile and delicate hand gestures.",
  },
  {
    img: lifestyleFramePose,
    title: "Radiant Lifestyle — The Viewfinder Frame",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description:
      "Playful candid close-up framing eyes through a camera viewfinder gesture in a sunny yellow cold-shoulder ruffle blouse.",
  },
  {
    img: lifestyleYellowBlouse,
    title: "Radiant Lifestyle — Yellow Ruffle Chic",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description:
      "Expressive contemporary studio portrait pairing a bright sunshine ruffle top with classic blue denim and luminous lighting.",
  },
  {
    img: lifestyleCushionPortrait,
    title: "Radiant Lifestyle — Intimate Studio Warmth",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description:
      "Intimate beauty close-up resting on soft studio cushions, capturing genuine eye contact and radiant warmth.",
  },
  {
    img: lifestyleAdded6,
    title: "Radiant Lifestyle — Studio Portrait 6",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description: "Elegant and radiant studio lifestyle editorial capture showcasing personal style.",
  },
  {
    img: lifestyleAdded7,
    title: "Radiant Lifestyle — Studio Portrait 7",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description: "Elegant and radiant studio lifestyle editorial capture showcasing personal style.",
  },
  {
    img: lifestyleAdded8,
    title: "Radiant Lifestyle — Studio Portrait 8",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description: "Elegant and radiant studio lifestyle editorial capture showcasing personal style.",
  },
  {
    img: lifestyleAdded9,
    title: "Radiant Lifestyle — Studio Portrait 9",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description: "Elegant and radiant studio lifestyle editorial capture showcasing personal style.",
  },
  {
    img: lifestyleAdded10,
    title: "Radiant Lifestyle — Studio Portrait 10",
    category: "Portrait",
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description: "Elegant and radiant studio lifestyle editorial capture showcasing personal style.",
  },
];

/* ─── Gallery 11: Coastal Serenity (Portrait) ───────────────────────── */
const COASTAL_SERENITY_GALLERY: LightboxItem[] = [
  {
    img: coastalImg1,
    title: "Coastal Serenity — Shoreline Stroll",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "A calming outdoor beach portrait capturing a gentle stroll along the sandy shores.",
  },
  {
    img: coastalImg2,
    title: "Coastal Serenity — Horizon Gaze",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Looking out toward the horizon, blending portraiture with expansive coastal beauty.",
  },
  {
    img: coastalImg3,
    title: "Coastal Serenity — Sun-Kissed Shore",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Natural golden sunlight illuminating expressive beach portraiture.",
  },
  {
    img: coastalImg4,
    title: "Coastal Serenity — Seaside Breeze",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Dynamic lifestyle portrait capturing movement and ocean breeze.",
  },
  {
    img: coastalImg5,
    title: "Coastal Serenity — Ocean Horizon Focus",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Atmospheric portrait framed against gentle seaside swells and open skies.",
  },
  {
    img: coastalImg6,
    title: "Coastal Serenity — Beach Front Candid",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Authentic, relaxed lifestyle portrait at the water's edge.",
  },
  {
    img: coastalImg7,
    title: "Coastal Serenity — Intimate Beach Detail",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Close-up portrait emphasizing serenity, warmth, and natural light.",
  },
  {
    img: coastalImg8,
    title: "Coastal Serenity — Coastal Chic Attire",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Fashion-forward portraiture harmonized with minimalist beach landscapes.",
  },
  {
    img: coastalImg9,
    title: "Coastal Serenity — Atlantic Tide Motion",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Striking composition with crashing waves creating an organic backdrop.",
  },
  {
    img: coastalImg10,
    title: "Coastal Serenity — Golden Sand Glow",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Warm, textured sand aesthetic framing intimate editorial portraiture.",
  },
  {
    img: coastalImg11,
    title: "Coastal Serenity — Ocean Twilight Horizon",
    category: "Portrait",
    client: "Coastal Serenity Editorial",
    year: "2026",
    description: "Thoughtful seaside editorial capture immersed in calm oceanic tones.",
  },
];

/* ─── Gallery 12: Contemporary Design & Arts Exhibition (Event) ──────── */
const EXHIBITION_GALLERY: LightboxItem[] = [
  {
    img: exhibitImg01,
    title: "Exhibition Prelude — Gallery Ambiance",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Opening moments of the contemporary arts exhibition, capturing the spacious gallery layout and natural architectural lighting.",
  },
  {
    img: exhibitImg02,
    title: "Curated Showcase — Form & Texture",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Detailed exhibition display highlighting handcrafted textures, dimensional sculptures, and bespoke artisan craft.",
  },
  {
    img: exhibitImg03,
    title: "Gallery Walkthrough — Spatial Harmony",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Wide environmental capture exploring guest interactions with installations and ambient gallery architecture.",
  },
  {
    img: exhibitImg04,
    title: "Artisan Installation — Textile & Structure",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Close-up perspective on sculptural installations exploring heritage weaving and contemporary structural design.",
  },
  {
    img: exhibitImg05,
    title: "Creative Dialogue — Artist & Attendees",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Engaging conversations between artists, patrons, and collectors immersed in the creative dialogue of the showcase.",
  },
  {
    img: exhibitImg06,
    title: "Sculptural Perspectives — Shadow & Angle",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Angular study of sculptural centerpieces with interplay of gallery spotlights and geometric shadows.",
  },
  {
    img: exhibitImg07,
    title: "Curatorial Grandeur — Main Pavilion",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Grand wide-angle perspective showcasing the bustling exhibition pavilion with visitors engaging across exhibits.",
  },
  {
    img: exhibitImg08,
    title: "Exquisite Craftsmanship — Fine Art Details",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Intimate macro study of meticulous craftsmanship, pigments, and nuanced surfaces.",
  },
  {
    img: exhibitImg09,
    title: "Visual Symphony — Wall Gallery Display",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Curated wall arrangement featuring contemporary prints, graphic typography, and balanced framing.",
  },
  {
    img: exhibitImg10,
    title: "The Observer — Contemplative Moments",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Candid capture of an art enthusiast deeply immersed in the nuances of a featured design piece.",
  },
  {
    img: exhibitImg11,
    title: "Illuminated Horizons — Accent Lighting",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Warm directional lighting illuminating featured artisan works on exhibition plinths.",
  },
  {
    img: exhibitImg12,
    title: "Contemporary Heritage — Cultural Artistry",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "A blend of traditional craft elements reinterpreted through modern architectural design principles.",
  },
  {
    img: exhibitImg13,
    title: "Dynamic Exchange — Collective Energy",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Atmospheric social energy as creators and audiences exchange ideas throughout the exhibition hall.",
  },
  {
    img: exhibitImg14,
    title: "Architectural Symmetry — Exhibition Space",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Clean lines and harmonious spatial proportions framing featured art installations.",
  },
  {
    img: exhibitImg15,
    title: "Vibrant Palette — Expressive Canvas",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Bold color stories and rich tactile mediums commanding attention in the gallery wing.",
  },
  {
    img: exhibitImg16,
    title: "Artisanal Grace — Masterwork Showcase",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Highlighted masterwork exhibition piece demonstrating world-class design refinement.",
  },
  {
    img: exhibitImg17,
    title: "The Collector's Eye — Curated Appreciation",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Appreciative moments as patrons examine fine artistic textures under museum-grade illumination.",
  },
  {
    img: exhibitImg18,
    title: "Exhibition Flora & Accents — Atmospheric Design",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Tasteful floral and environmental styling enhancing the modern exhibition environment.",
  },
  {
    img: exhibitImg19,
    title: "Creative Vanguard — Signature Pieces",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Signature pieces presented with elegance, creating focal points across the exhibition gallery.",
  },
  {
    img: exhibitImg20,
    title: "Interactive Engagement — The Arts in Motion",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Attendees experiencing dynamic art forms and sensory installation elements firsthand.",
  },
  {
    img: exhibitImg21,
    title: "Reflections & Glass — Dimensional Exhibit",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Reflective glass cases and ambient gallery lighting creating layered depth and visual intrigue.",
  },
  {
    img: exhibitImg22,
    title: "Curatorial Narrative — Exhibition Panels",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Informative curatorial statements guiding visitors through the inspiration and cultural significance of the work.",
  },
  {
    img: exhibitImg23,
    title: "Celebration of Craft — Evening Reception",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "Evening light cascading into the gallery, elevating the celebratory atmosphere of the exhibition opening.",
  },
  {
    img: exhibitImg24,
    title: "Harmonic Display — Synergy of Arts",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "A cohesive grouping of diverse artistic mediums presenting a unified creative vision.",
  },
  {
    img: exhibitImg25,
    title: "Enthusiast Gathering — Community & Culture",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "A vibrant gathering celebrating creative community, design innovation, and cultural expression.",
  },
  {
    img: exhibitImg26,
    title: "Exhibition Finale — Lasting Impressions",
    category: "Event",
    client: "Design & Arts Pavilion",
    year: "2026",
    description: "A memorable closing perspective capturing the essence and lasting impact of the contemporary exhibition.",
  },
];

/* ─── Gallery 13: Ghana Month — Heritage & Cultural Pride (Documentary) ── */
const GHANA_MONTH_GALLERY: LightboxItem[] = [
  {
    img: ghanaMonthImg01,
    title: "Ghana Month — Heritage Awakening",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Opening cultural portraiture celebrating Ghana Month with authentic traditional garments and dignified presence.",
  },
  {
    img: ghanaMonthImg02,
    title: "Ghana Month — Royal Splendor & Textures",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Intricate weaves and authentic adornments honoring timeless Ghanaian cultural traditions.",
  },
  {
    img: ghanaMonthImg03,
    title: "Ghana Month — Pride of Identity",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Expressive editorial capture celebrating heritage pride, generational craftsmanship, and cultural storytelling.",
  },
  {
    img: ghanaMonthImg04,
    title: "Ghana Month — Cultural Resilience",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Striking heritage portrait capturing deep dignity, poise, and rich indigenous textile patterns.",
  },
  {
    img: ghanaMonthImg05,
    title: "Ghana Month — Ancestral Elegance",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Warm natural lighting highlighting delicate traditional jewelry, beads, and artisanal embellishments.",
  },
  {
    img: ghanaMonthImg06,
    title: "Ghana Month — Independence Spirit",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "A celebration of Ghanaian independence and sovereignty expressed through authentic regional fashion.",
  },
  {
    img: ghanaMonthImg07,
    title: "Ghana Month — Modern Heritage Fusion",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Bridging ancestral custom with contemporary youth identity during nationwide Ghana Month commemorations.",
  },
  {
    img: ghanaMonthImg08,
    title: "Ghana Month — Vibrant Threads of Unity",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Rich color harmonies and symbolic motifs showcasing the diverse cultural tapestry across Ghanaian regions.",
  },
  {
    img: ghanaMonthImg09,
    title: "Ghana Month — Dignity & Grace",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Serene cultural portrait reflecting honor, community values, and maternal heritage.",
  },
  {
    img: ghanaMonthImg10,
    title: "Ghana Month — The Sovereign Look",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Authoritative and celebratory framing embodying Ghanaian cultural leadership and majesty.",
  },
  {
    img: ghanaMonthImg11,
    title: "Ghana Month — Golden Heritage Reflection",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "Radiant golden hour illumination accentuating traditional regal regalia and ceremonial jewelry.",
  },
  {
    img: ghanaMonthImg12,
    title: "Ghana Month — Everlasting Legacy",
    category: "Documentary",
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description: "A poignant finale portrait capturing the enduring pride and vibrant future of Ghanaian cultural heritage.",
  },
];

/* ─── Gallery 14: The Graduate — Milestone Celebration (Event) ──────── */
const GRADUATION_GALLERY: LightboxItem[] = [
  {
    img: gradImg01,
    title: "The Graduate — Milestone Portraiture",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Celebratory graduation portrait capturing the joy and pride of academic achievement and milestone success.",
  },
  {
    img: gradImg02,
    title: "The Graduate — Cap & Gown Honor",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Regal academic regalia study highlighted with crisp outdoor studio rim lighting and proud posture.",
  },
  {
    img: gradImg03,
    title: "The Graduate — Scholarly Poise",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Classic commemorative portrait commemorating years of dedication, discipline, and excellence.",
  },
  {
    img: gradImg04,
    title: "The Graduate — Joyful Radiance",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Warm, candid smile capturing the unforgettable excitement of commencement day.",
  },
  {
    img: gradImg05,
    title: "The Graduate — Tassel & Triumph",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Expressive outdoor graduation capture framing the mortarboard tassel and victorious celebration.",
  },
  {
    img: gradImg06,
    title: "The Graduate — Golden Horizon",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Looking forward to future ambitions with radiant natural backlighting and academic distinction.",
  },
  {
    img: gradImg07,
    title: "The Graduate — The Degree in Hand",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Proud moment holding the diploma scroll, honoring family heritage and personal accomplishment.",
  },
  {
    img: gradImg08,
    title: "The Graduate — Confident Ambition",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Empowered, modern editorial portrait reflecting readiness for leadership and professional triumph.",
  },
  {
    img: gradImg09,
    title: "The Graduate — Festive Jubilation",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "Dynamic outdoor celebration capturing the vibrant energy of friends, family, and graduation day.",
  },
  {
    img: gradImg10,
    title: "The Graduate — Stepping into the Future",
    category: "Event",
    client: "Commencement Honors Commission",
    year: "2026",
    description: "An inspiring closing portrait embodying hope, resilience, and the beginning of a remarkable journey.",
  },
];

/* ─── Gallery 15: The Engineer — Bold & Professional (Commercial) ── */
const INVESTITURE_SERVICES_GALLERY: LightboxItem[] = [
  investitureImg01, investitureImg02, investitureImg03, investitureImg04, investitureImg05,
  investitureImg06, investitureImg07, investitureImg08, investitureImg09, investitureImg10,
  investitureImg11, investitureImg12, investitureImg13, investitureImg14, investitureImg15,
  investitureImg16, investitureImg17, investitureImg18, investitureImg19, investitureImg20,
].map((img, index) => ({
  img,
  title: `Investiture Services - Ceremony Moment ${String(index + 1).padStart(2, "0")}`,
  category: "Event",
  client: "Investiture Services",
  year: "2026",
  description: "A considered event photograph documenting the ceremony, its people, and the significance of the occasion.",
}));

const ENGINEER_GALLERY: LightboxItem[] = [
  {
    img: engineerImg01,
    title: "The Engineer — Vision & Precision",
    category: "Commercial",
    client: "Industrial & Engineering Commission",
    year: "2026",
    description: "Vibrant high-key commercial portrait celebrating women in STEM and civil engineering, framed against warm industrial amber.",
  },
  {
    img: engineerImg02,
    title: "The Engineer — Poised for Leadership",
    category: "Commercial",
    client: "Industrial & Engineering Commission",
    year: "2026",
    description: "Striking studio portrait highlighting precision engineering leadership against a bold cobalt backdrop.",
  },
  {
    img: engineerImg03,
    title: "The Engineer — Authority & Resolve",
    category: "Commercial",
    client: "Industrial & Engineering Commission",
    year: "2026",
    description: "Commanding corporate and industrial editorial portrait capturing dedication, technical mastery, and professional pride.",
  },
];

/* ─── Gallery 16: Studio Glam Editorial — African Haute Couture (Portrait) ── */
const STUDIO_GLAM_GALLERY: LightboxItem[] = [
  {
    img: glamImg01,
    title: "Studio Glam — Heritage in Motion",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "Vibrant ankara wax print ball gown flowing against a rich cobalt studio sweep, celebrating contemporary African fashion design.",
  },
  {
    img: glamImg02,
    title: "Studio Glam — Timeless Elegance",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "Conceptual haute couture portrait exploring timeless beauty with an ornate gilded clock prop and dramatic lighting.",
  },
  {
    img: glamImg03,
    title: "Studio Glam — Sisterhood & Synergy",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "Dual-model fashion editorial celebrating complementary silhouette styling, poise, and unity in luxury African textiles.",
  },
  {
    img: glamImg04,
    title: "Studio Glam — The Flared Silhouette",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "Full-figure studio study highlighting structural tailoring, tiered flare detailing, and vibrant blue-gold print patterns.",
  },
  {
    img: glamImg05,
    title: "Studio Glam — Gilded Serenity",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "Intimate studio beauty portrait focusing on radiant complexion, sculpted angles, and intricate artisanal fabric texture.",
  },
  {
    img: glamImg06,
    title: "Studio Glam — Regal Fluidity",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "Expressive studio movement capturing the grand volume and dynamic flow of handcrafted African couture.",
  },
  {
    img: glamImg07,
    title: "Studio Glam — Sovereign Presence",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "Stately fashion portrait embodying grace, poise, and modern African high-fashion identity.",
  },
  {
    img: glamImg08,
    title: "Studio Glam — The Daily Chronicle",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "Conceptual editorial narrative pairing vintage journalism with bold contemporary couture styling.",
  },
  {
    img: glamImg09,
    title: "Studio Glam — The Grand Finale",
    category: "Portrait",
    client: "Haute Couture Editorial",
    year: "2026",
    description: "A showstopping editorial finale capturing elegance, heritage pride, and high-fashion exuberance.",
  },
];

/* ─── Gallery 17: Urban Chic & Sisterhood — Studio Editorial (Portrait) ── */
const URBAN_CHIC_SISTERHOOD_GALLERY: LightboxItem[] = [
  {
    img: urbanChicImg01,
    title: "Urban Chic — Mint Ruffle Elegance",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Serene studio portrait in a pastel mint cocktail dress with sculptural floral organza applique against sky-blue backdrop.",
  },
  {
    img: urbanChicImg02,
    title: "Urban Chic — Streetwear Silhouette & Poise",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "High-contrast urban streetwear fashion featuring graphic pullover, marble-pattern cargo pants, and crisp white stiletto heels on a studio stool.",
  },
  {
    img: urbanChicImg03,
    title: "Urban Chic — Contemplative Power",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Relaxed seated editorial pose highlighting modern urban styling, intricate braids, and calm inner confidence.",
  },
  {
    img: urbanChicImg04,
    title: "Urban Chic — The Daily Gazette Narrative",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Conceptual editorial centerpiece featuring custom print 'The Daily Gazette' newspaper detailing artistic vision, creativity, and discipline.",
  },
  {
    img: urbanChicImg05,
    title: "Urban Chic — Studio Floor Elegance",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Relaxed low-angle floor composition with stiletto heel accents and minimalist gold geometric architectural frame.",
  },
  {
    img: urbanChicImg06,
    title: "Urban Chic — Playful Perspective",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Spontaneous, joyful expression capturing authentic personality and creative framing through playful gesture.",
  },
  {
    img: urbanChicImg07,
    title: "Sisterhood & Couture — Botanical Flare & Timepiece",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Regal floor study in vibrant purple and gold floral ankara dress, framed with vintage alarm clock and white stilettos.",
  },
  {
    img: urbanChicImg08,
    title: "Sisterhood & Couture — Gilded Reflection",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Intimate portrait focusing on radiant smile, thoughtful gaze, and handcrafted floral textile detailing.",
  },
  {
    img: urbanChicImg09,
    title: "Sisterhood & Couture — Unified Radiance",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Celebratory dual-portrait showcasing sisterhood, shared ambition, and harmonious color-blocked African print styling.",
  },
  {
    img: urbanChicImg10,
    title: "Sisterhood & Couture — Joyful Affection",
    category: "Portrait",
    client: "Urban Chic Editorial",
    year: "2026",
    description: "Candid, affectionate moment celebrating bond, laughter, and authentic warmth between lifelong friends.",
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
  {
    id: 10,
    title: "Radiant Studio Lifestyle — Elegance & Expression",
    cat: "Portrait",
    category: "Portrait",
    img: lifestyleBlueDress,
    tall: true,
    client: "Studio Lifestyle Editorial",
    year: "2026",
    description:
      "A 10-image vibrant high-key studio series capturing relaxed elegance, playful expressive gestures, and sunlit color palettes across summer dresses and contemporary casuals.",
    gallery: "studiolifestyle",
    galleryItems: STUDIO_LIFESTYLE_GALLERY,
    galleryCount: 10,
  },
  {
    id: 11,
    title: "Coastal Serenity — Seaside Lifestyle Editorial",
    cat: "Portrait",
    category: "Portrait",
    img: coastalImg1,
    tall: true,
    client: "Coastal Serenity Editorial",
    year: "2026",
    description:
      "An 11-image serene lifestyle portrait campaign capturing calm coastal vibes, ocean horizons, and sun-kissed natural tones along the coast.",
    gallery: "coastalserenity",
    galleryItems: COASTAL_SERENITY_GALLERY,
    galleryCount: 11,
  },

  {
    id: 24,
    title: "Studio Glam — From Hard Hats to High Fashion",
    cat: "Portrait",
    category: "Portrait",
    img: glamImg01,
    tall: true,
    client: "Haute Couture Editorial",
    year: "2026",
    description:
      "A 9-image vibrant studio fashion editorial celebrating African haute couture, dramatic tiered ankara gowns, conceptual narrative props, and regal beauty.",
    gallery: "studioglam",
    galleryItems: STUDIO_GLAM_GALLERY,
    galleryCount: 9,
  },
  {
    id: 25,
    title: "Urban Chic & Sisterhood — Studio Editorial",
    cat: "Portrait",
    category: "Portrait",
    img: urbanChicImg04,
    tall: true,
    client: "Urban Chic Editorial",
    year: "2026",
    description:
      "A 10-image dynamic studio editorial blending urban streetwear chic, custom newsprint narrative art, vibrant African floral couture, and playful sisterhood portraits.",
    gallery: "urbanchic",
    galleryItems: URBAN_CHIC_SISTERHOOD_GALLERY,
    galleryCount: 10,
  },

  /* ── Grouped Campaigns: Event ─────────────────────── */
  {
    id: 12,
    title: "Contemporary Design & Arts Exhibition",
    cat: "Event",
    category: "Event",
    img: exhibitImg07,
    tall: true,
    client: "Design & Arts Pavilion",
    year: "2026",
    description:
      "A 26-image comprehensive event editorial documenting opening night ambiance, curated artisan installations, patron dialogues, and sculptural craft.",
    gallery: "exhibition",
    galleryItems: EXHIBITION_GALLERY,
    galleryCount: 26,
  },
  {
    id: 13,
    title: "The Graduate — Milestone Celebration",
    cat: "Event",
    category: "Event",
    img: gradImg01,
    tall: true,
    client: "Commencement Honors Commission",
    year: "2026",
    description:
      "A 10-image celebratory event editorial documenting commencement honors, academic regalia, triumphant smiles, and milestone accomplishments.",
    gallery: "graduation",
    galleryItems: GRADUATION_GALLERY,
    galleryCount: 10,
  },
  {
    id: 24,
    title: "Investiture Services",
    cat: "Event",
    category: "Event",
    img: investitureImg01,
    tall: true,
    client: "Investiture Services",
    year: "2026",
    description:
      "A 20-image event editorial documenting the ceremony, formal proceedings, distinguished guests, and the defining moments of investiture day.",
    gallery: "investiture-services",
    galleryItems: INVESTITURE_SERVICES_GALLERY,
    galleryCount: 20,
  },

  /* ── Grouped Campaigns: Documentary ─────────────────── */
  {
    id: 14,
    title: "Ghana Month — Heritage & Cultural Pride",
    cat: "Documentary",
    category: "Documentary",
    img: ghanaMonthImg02,
    tall: true,
    client: "Ghana Cultural Heritage Initiative",
    year: "2026",
    description:
      "A 12-image cultural documentary editorial celebrating Ghana Month, traditional textiles, ancestral pride, and sovereign national heritage.",
    gallery: "ghanamonth",
    galleryItems: GHANA_MONTH_GALLERY,
    galleryCount: 12,
  },

  /* ── Grouped Campaigns: Commercial ─────────────────── */
  {
    id: 23,
    title: "The Engineer — Bold & Professional",
    cat: "Commercial",
    category: "Commercial",
    img: engineerImg01,
    tall: true,
    client: "Industrial & Engineering Commission",
    year: "2026",
    description:
      "A 3-image commercial studio campaign celebrating women in STEM and engineering leadership, featuring high-visibility gear, crisp precision lighting, and bold color backdrops.",
    gallery: "engineer",
    galleryItems: ENGINEER_GALLERY,
    galleryCount: 3,
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
          <div
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
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.35), ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "4px",
                  background: SURFACE,
                  cursor: "pointer",
                  willChange: "transform",
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => openCard(p, i)}
              >
                <div style={{ paddingBottom: p.tall ? "120%" : "75%", position: "relative" }}>
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
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
          </div>
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
              href={`https://wa.me/233502310663?text=${encodeURIComponent(
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
