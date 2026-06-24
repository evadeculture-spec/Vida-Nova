export type DropStatus = "live" | "upcoming" | "soldout" | "archive";

export type Drop = {
  id: string;
  index: string;
  name: string;
  collection: string;
  blurb: string;
  image: string;
  /** Offset in ms from "now" used to derive a stable launch time client-side. */
  offsetMs: number;
  units: number;
  unitsLeft: number;
  status: DropStatus;
  /** Access code for the protected entry flow (case-insensitive). */
  accessCode?: string;
  earlyAccessMs?: number;
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1600`;

const DAY = 86400000;
const HOUR = 3600000;

export const drops: Drop[] = [
  {
    id: "reborn-coat",
    index: "04",
    name: "The Reborn Coat",
    collection: "Faith",
    blurb:
      "A numbered run of the Faith Wool Overcoat. Double-faced Italian wool, hand-finished, ecclesiastical length.",
    image: img("1539109136881-3be0616acf4b"),
    offsetMs: 9 * DAY + 7 * HOUR,
    units: 200,
    unitsLeft: 200,
    status: "upcoming",
    accessCode: "REBORN26",
    earlyAccessMs: 2 * HOUR,
  },
  {
    id: "obsidian-bomber",
    index: "03",
    name: "Obsidian Bomber",
    collection: "Reborn",
    blurb:
      "Weather-sealed technical shell with a brushed interior. Built for the in-between seasons.",
    image: img("1551028719-00167b16eac5"),
    offsetMs: -2 * DAY,
    units: 300,
    unitsLeft: 0,
    status: "soldout",
  },
  {
    id: "legacy-cargo",
    index: "02",
    name: "Legacy Cargo",
    collection: "Legacy",
    blurb: "Dry organic ripstop, articulated knee, numbered against a run of 200.",
    image: img("1473966968600-fa801b869a1a"),
    offsetMs: -16 * DAY,
    units: 200,
    unitsLeft: 0,
    status: "archive",
  },
  {
    id: "essentials-genesis",
    index: "01",
    name: "Essentials — Genesis",
    collection: "Essentials",
    blurb: "The foundation capsule that started the movement.",
    image: img("1521572163474-6864f9cf17ab"),
    offsetMs: -40 * DAY,
    units: 500,
    unitsLeft: 0,
    status: "archive",
  },
];

export const featuredDrop = drops[0];
