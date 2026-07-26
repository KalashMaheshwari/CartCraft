import type { Product } from "../types";

import bolt from "../assets/products/bolt.jpg";
import nut from "../assets/products/nut.jpg";
import washer from "../assets/products/washer.jpg";
import wrench from "../assets/products/wrench.jpg";
import driver from "../assets/products/driver.jpg";
import pliers from "../assets/products/pliers.jpg";
import bearing from "../assets/products/bearing.jpg";
import resistor from "../assets/products/resistor.jpg";
import switchImg from "../assets/products/switch.jpg";
import spring from "../assets/products/spring.jpg";

const IMG: Record<string, string> = {
  bolt,
  nut,
  washer,
  wrench,
  driver,
  pliers,
  bearing,
  resistor,
  switch: switchImg,
  spring,
};

const BRANDS_BY_CATEGORY: Record<string, string[]> = {
  Fasteners: ["ProForge", "AccuTech"],
  "Hand Tools": ["NorthPoint", "Ironclad"],
  "Bearings & Drivetrain": ["MechSpec"],
  Electrical: ["Voltline"],
  Hardware: ["MechSpec", "AccuTech"],
};

const STOCKS = [2400, 12, 180, 7, 64, 320, 9, 520, 38, 140, 3, 88, 22, 410, 16];

const SKU_BASE: Record<string, string> = {
  bolt: "91251A",
  nut: "91841A",
  washer: "90126A",
  wrench: "53085A",
  driver: "61000A",
  pliers: "30175A",
  bearing: "5708K",
  resistor: "6098K",
  switch: "6885K",
  spring: "94365A",
};

interface Variant {
  name: string;
  spec: string;
  price: number;
}

interface Template {
  part: string;
  category: string;
  make: (i: number) => Variant;
}

const pick = <T>(arr: T[], i: number): T => arr[((i % arr.length) + arr.length) % arr.length];

const money2 = (n: number) => Math.round(n * 100) / 100;

const TEMPLATES: Template[] = [
  {
    part: "bolt",
    category: "Fasteners",
    make: (i) => {
      const t = pick(["Hex Head Cap Screw", "Socket Head Cap Screw", "Flange Button Head Screw"], i);
      const s = pick(["M4", "M5", "M6", "M8", "M10"], i);
      const l = pick(["12", "16", "20", "25", "30", "40"], i);
      const m = pick(["Steel, Zinc-Plated", "Stainless 18-8", "Class 10.9, Black Oxide", "Titanium Grade 5"], i);
      return { name: `${t}, ${s} × ${l}mm`, spec: m, price: money2(0.14 + (i % 5) * 0.06 + (i % 4) * 0.04) };
    },
  },
  {
    part: "nut",
    category: "Fasteners",
    make: (i) => {
      const t = pick(["Hex Nut", "Nylon Lock Nut", "Cap Acorn Nut", "Wing Nut"], i);
      const s = pick(["M4", "M5", "M6", "M8", "M10"], i);
      const m = pick(["Stainless 18-8", "Steel, Zinc", "Brass"], i);
      return { name: `${t}, ${s}`, spec: m, price: money2(0.08 + (i % 4) * 0.05) };
    },
  },
  {
    part: "washer",
    category: "Fasteners",
    make: (i) => {
      const t = pick(["Flat Washer", "Lock Washer", "Fender Washer", "Split Washer"], i);
      const s = pick(["M4", "M5", "M6", "M8", "M10"], i);
      const pk = pick(["10", "50", "100"], i);
      return { name: `${t}, ${s} — ${pk} pk`, spec: "Steel, Zinc-Plated", price: money2(1 + (i % 4) * 1 + (i % 3) * 0.4) };
    },
  },
  {
    part: "wrench",
    category: "Hand Tools",
    make: (i) => {
      const t = pick(["Combination Wrench", "Open-End Wrench", "Ratcheting Wrench"], i);
      const s = pick(["8", "10", "11", "12", "13", "14", "17", "19"], i);
      const f = pick(["Chrome Vanadium", "Polished Chrome", "Black Industrial"], i);
      return { name: `${t}, ${s}mm`, spec: f, price: money2(6 + (i % 5) * 1.8 + (i % 3) * 0.6) };
    },
  },
  {
    part: "driver",
    category: "Hand Tools",
    make: (i) => {
      const t = pick(["Precision Driver Set", "Phillips Screwdriver", "Flat-Head Screwdriver", "Torx Screwdriver", "Hex Key Set"], i);
      const set = i % 4 !== 0 ? ` — ${pick(["6 pc", "8 pc", "12 pc"], i)}` : "";
      return { name: `${t}${set}`, spec: "Hardened Tips · Cushion Grip", price: money2(8 + (i % 5) * 2.5 + (i % 3) * 1.2) };
    },
  },
  {
    part: "pliers",
    category: "Hand Tools",
    make: (i) => {
      const t = pick(["Long-Nose Pliers", "Diagonal Cutters", "Slip-Joint Pliers", "Locking Pliers"], i);
      const s = pick(['6"', '7"', '8"', '10"'], i);
      return { name: `${t}, ${s}`, spec: "Forged · Cushion Grip", price: money2(9 + (i % 5) * 2) };
    },
  },
  {
    part: "bearing",
    category: "Bearings & Drivetrain",
    make: (i) => {
      const m = pick(["6201", "6202", "6203", "6204", "6303", "6002"], i);
      const seal = pick(["2RS", "ZZ"], i);
      return { name: `Ball Bearing, ${m}-${seal}`, spec: `${m} · ${seal} Seal · Steel`, price: money2(4 + (i % 5) * 1.5) };
    },
  },
  {
    part: "resistor",
    category: "Electrical",
    make: (i) => {
      const v = pick(["10Ω", "100Ω", "220Ω", "1kΩ", "4.7kΩ", "10kΩ", "100kΩ", "1MΩ"], i);
      const w = pick(["¼W", "½W"], i);
      const pk = pick(["100", "200", "500"], i);
      return { name: `${v} Resistor, ${w} — ${pk} pk`, spec: "Carbon Film · ±5%", price: money2(5 + (i % 3) * 1.5) };
    },
  },
  {
    part: "switch",
    category: "Electrical",
    make: (i) => {
      const t = pick(["Toggle Switch", "Rocker Switch", "Pushbutton Switch"], i);
      const c = pick(["SPST", "SPDT", "DPDT"], i);
      return { name: `${t}, ${c}`, spec: "Panel Mount · 15A · 125VAC", price: money2(2.5 + (i % 4) * 1.2) };
    },
  },
  {
    part: "spring",
    category: "Hardware",
    make: (i) => {
      const t = pick(["Compression Spring", "Extension Spring", "Torsion Spring"], i);
      const l = pick(['0.5"', '1.0"', '1.5"', '2.0"'], i);
      return { name: `${t}, ${l}`, spec: "Music Wire · Precision", price: money2(0.8 + (i % 4) * 0.5) };
    },
  },
];

const PER_TEMPLATE = 10;

function build(): Product[] {
  const out: Product[] = [];
  let binIndex = 14;
  TEMPLATES.forEach((tpl) => {
    const seed = tpl.part.length;
    const brands = BRANDS_BY_CATEGORY[tpl.category] ?? ["ProForge"];
    for (let i = 0; i < PER_TEMPLATE; i++) {
      const v = tpl.make(i);
      const id = `${tpl.part}-${i + 1}`;
      const onSale = i % 4 === 0;
      const compareAt = onSale ? money2(v.price * (1.2 + (i % 3) * 0.06)) : undefined;
      const rating = Math.min(5, Math.round((3.7 + ((i * 7 + seed) % 14) / 10) * 10) / 10);
      const reviews = 30 + ((i * 173 + seed * 211) % 3200);
      const stock = STOCKS[(i + seed) % STOCKS.length];
      const badge = i % 9 === 0 ? "bestseller" : i % 13 === 0 ? "new" : null;
      out.push({
        id,
        name: v.name,
        sku: `${SKU_BASE[tpl.part]}${101 + i * 11}`,
        bin: "BIN-" + String(binIndex++).padStart(3, "0"),
        category: tpl.category,
        price: v.price,
        compareAt,
        stock,
        part: tpl.part,
        spec: v.spec,
        image: IMG[tpl.part],
        brand: pick(brands, i),
        rating,
        reviews,
        badge,
        fastShip: i % 5 !== 0,
        description: `${v.name} — ${v.spec}. A dependable ${tpl.category.toLowerCase()} staple, quality-checked and ready to dispatch from our fulfillment bins.`,
      });
    }
  });
  return out;
}

export const PRODUCTS: Product[] = build();

export const CATEGORIES: string[] = Array.from(new Set(PRODUCTS.map((p) => p.category)));
export const BRANDS: string[] = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
export const PRICE_MIN = 0;
export const PRICE_MAX = 25;
export const LOW_STOCK = 10;
export const PAGE_SIZE = 24;


export const productById = (id: string): Product | undefined => PRODUCTS.find((p) => p.id === id);
export const relatedProducts = (product: Product, n = 4): Product[] =>
  PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, n);

/** Category → product count, for the sidebar. */
export const categoryCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const p of PRODUCTS) counts[p.category] = (counts[p.category] ?? 0) + 1;
  return counts;
};
