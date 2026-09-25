"use client";

import { TintedLogo } from "@/components/brand";
import { DrawLine } from "@/components/motion/primitives";

type Logo = {
  name: string;
  src: string;
  /** Intrinsic size of the file in /public. */
  width: number;
  height: number;
  /** Visible region in source pixels: trims transparent padding and taglines. */
  crop?: { x: number; y: number; w: number; h: number };
  /** Optical correction on top of the area-normalised size. */
  scale?: number;
};

const LOGOS: Logo[] = [
  // Rounded, heavy strokes read larger than their area; thin Unacademy strokes read smaller.
  { name: "Veranda Learning", src: "/VerandaLearning.png", width: 670, height: 372, crop: { x: 75, y: 105, w: 527, h: 119 }, scale: 0.92 },
  { name: "Unacademy", src: "/Unacademy.png", width: 309, height: 68, crop: { x: 11, y: 14, w: 288, h: 43 }, scale: 1.08 },
  // Drops the "Power Ahead" tagline, which would render as illegible specks.
  { name: "Great Learning", src: "/GreatLearning.png", width: 749, height: 333, crop: { x: 45, y: 39, w: 653, h: 204 } },
  // Wordmark and rule only; drops the "Values over value" tagline.
  { name: "Anarock", src: "/Anarock.png", width: 800, height: 214, crop: { x: 14, y: 4, w: 776, h: 152 } },
  { name: "CIEL HR", src: "/CIEL.png", width: 790, height: 316, crop: { x: 36, y: 55, w: 723, h: 210 }, scale: 1.1 },
  // Thin ring + open counters read lighter than solid wordmarks.
  { name: "Motilal Oswal", src: "/MotilalOswal.png", width: 1533, height: 625, scale: 1.12 },
  { name: "Razorpay", src: "/Razorpay.svg", width: 1896, height: 401 },
  { name: "Swiggy", src: "/Swiggy.webp", width: 3840, height: 1145, crop: { x: 18, y: 18, w: 3803, h: 1108 } },
];

/**
 * Logos have very different aspect ratios, so a shared height makes wide
 * wordmarks look huge next to stacked ones. Instead every logo gets roughly
 * the same visual area (px²), which is how logo walls are balanced optically.
 */
const LOGO_AREA = 2600;

function displayHeight(logo: Logo) {
  const box = logo.crop ?? { w: logo.width, h: logo.height };
  const aspect = box.w / box.h;
  return Math.round(Math.sqrt(LOGO_AREA / aspect) * (logo.scale ?? 1));
}

export default function LogoBar() {
  return (
    <section
      aria-label="Trusted by"
      className="relative w-full overflow-hidden bg-[#FDFBF7] pt-6 pb-20 md:pb-24"
    >
      <div className="mx-auto mb-12 flex max-w-[1200px] items-center gap-6 px-6 lg:px-8">
        <DrawLine className="flex-1" from="end" />
        <span className="shrink-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#78716C]">
          Trusted by developer teams at
        </span>
        <DrawLine className="flex-1" />
      </div>

      <div
        className="marquee group relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max">
          {[0, 1, 2].map((set) => (
            <ul
              key={set}
              aria-hidden={set > 0 ? true : undefined}
              className="flex shrink-0 items-center gap-16 pr-16 md:gap-20 md:pr-20"
            >
              {LOGOS.map((logo) => (
                <li
                  key={`${logo.name}-${set}`}
                  className="flex h-10 items-center justify-center text-[#78716C] opacity-60 transition-[opacity,color] duration-300 hover:text-[#4A3B33] hover:opacity-100"
                >
                  <TintedLogo
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    crop={logo.crop}
                    displayHeight={displayHeight(logo)}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
