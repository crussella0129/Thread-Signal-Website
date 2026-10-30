// Sample job shown in every YardUluv figure. Illustration only: sample prices, not an offer.
// \u00a0 is a no-break space: a number never wraps away from its unit.
// Units are the trade's: LF, SF, CY and EA. A plant is written the way ANSI Z60.1 (American
// Standard for Nursery Stock) asks: plant size first, then the "#" container class, never gallons.
export const SAMPLE_BED = { areaSqFt: 324, depthIn: 3 } as const;
export type LineKey = "haul" | "edging" | "shrub" | "bed";
export interface SampleLine {
  key: LineKey;
  item: string;
  qty: number;
  qtyLabel: string;
  qtyNote?: string;
  rateCents: number;
  rateLabel: string;
  hoursPerUnit: number;
  hoursRateLabel: string;
}
export const SAMPLE_LINES: SampleLine[] = [
  {
    key: "haul",
    item: "Haul-off, old sod",
    qty: 2,
    qtyLabel: "2\u00a0loads",
    rateCents: 17500,
    rateLabel: "$175.00/load",
    hoursPerUnit: 1,
    hoursRateLabel: "1.0\u00a0h/load",
  },
  {
    key: "edging",
    item: "Steel edging, 3/16\u00a0in.",
    qty: 56,
    qtyLabel: "56\u00a0LF",
    rateCents: 1200,
    rateLabel: "$12.00/LF",
    hoursPerUnit: 0.05,
    hoursRateLabel: "0.05\u00a0h/LF",
  },
  {
    key: "shrub",
    item: "Shrubs, 18\u00a0in. ht., #3",
    qty: 6,
    qtyLabel: "6\u00a0EA",
    rateCents: 6500,
    rateLabel: "$65.00/EA",
    hoursPerUnit: 0.5,
    hoursRateLabel: "0.5\u00a0h/EA",
  },
  {
    key: "bed",
    item: "Hardwood mulch, 3\u00a0in. deep",
    qty: 3,
    qtyLabel: "3\u00a0CY",
    qtyNote: "over 324\u00a0SF",
    rateCents: 9000,
    rateLabel: "$90.00/CY",
    hoursPerUnit: 1,
    hoursRateLabel: "1.0\u00a0h/CY",
  },
];
export const lineCents = (l: SampleLine) => Math.round(l.qty * l.rateCents);
export const lineHours = (l: SampleLine) =>
  (Math.round(l.qty * l.hoursPerUnit * 10) / 10).toFixed(1);
export const totalCents = SAMPLE_LINES.reduce((s, l) => s + lineCents(l), 0); // 168200
export const totalHours = (
  Math.round(
    SAMPLE_LINES.reduce((s, l) => s + l.qty * l.hoursPerUnit, 0) * 10,
  ) / 10
).toFixed(1); // "10.8"
export const usd = (cents: number) =>
  "$" +
  (cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
