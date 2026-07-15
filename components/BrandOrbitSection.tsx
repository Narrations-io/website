/* eslint-disable @next/next/no-img-element */
// BrandOrbitSection — social-proof "brands we've worked with" block.
// Desktop/tablet: logos slowly orbit a fixed center headline inside a premium
// dark card. Mobile: a slow CSS marquee. No animation libraries — the motion is
// pure CSS keyframes defined in app/globals.css (bo-orbit-*, bo-marquee).
//
// Logos live in /public/brands/uniform/ as normalized tiles: every logo is
// recolored to one flat tone and centered in the same 400x200 transparent box
// (see scripts/normalize-brand-logos.mjs). To add/replace a brand later: drop
// the source logo in /public/brands/, add it to the script's LOGOS map, re-run
// the script, then add an entry below (name = used for alt text).
type Brand = { name: string; src: string };

// Two orbiting rings of uniform tiles — no per-logo size hacks needed.
// Geometry mirrors the iertqa reference (measured from its live DOM): two
// tight concentric rings (outer r ≈ 456px, inner ≈ 357px on a 1296px card),
// same logo size on both rings, wheel center at 85% of the card height so
// only the top arc shows.
// Ring 1 (inner) — the 8 flagship partners only, on the tighter orbit.
const INNER: Brand[] = [
  { name: "Binance", src: "/brands/uniform/binance.png" },
  { name: "Ledger", src: "/brands/uniform/ledger.png" },
  { name: "Sui", src: "/brands/uniform/sui.png" },
  { name: "Internet Computer Protocol", src: "/brands/uniform/internet-computer.png" },
  { name: "Skrill", src: "/brands/uniform/skrill.png" },
  { name: "M2", src: "/brands/uniform/m2.png" },
  { name: "Frankfurt School", src: "/brands/uniform/frankfurt-school.png" },
  { name: "Zonda", src: "/brands/uniform/zonda.png" },
];

// Ring 2 (outer) — everyone else, evenly spaced.
const OUTER: Brand[] = [
  { name: "Band Protocol", src: "/brands/uniform/band-protocol.png" },
  { name: "Tatum", src: "/brands/uniform/tatum.png" },
  { name: "LCX", src: "/brands/uniform/lcx.png" },
  { name: "Fractal", src: "/brands/uniform/fractal.png" },
  { name: "Cryptohopper", src: "/brands/uniform/cryptohopper.png" },
  { name: "Tachyon Protocol", src: "/brands/uniform/tachyon-protocol.png" },
  { name: "XanPool", src: "/brands/uniform/xanpool.png" },
  { name: "ChangeNOW", src: "/brands/uniform/changenow.png" },
  { name: "RegalX", src: "/brands/uniform/regalx.png" },
  { name: "Burency", src: "/brands/uniform/burency.png" },
  { name: "GlobalBlock", src: "/brands/uniform/globalblock.png" },
  { name: "Monfex", src: "/brands/uniform/monfex.png" },
  { name: "FXT", src: "/brands/uniform/fxt.png" },
  { name: "Invezz", src: "/brands/uniform/invezz.png" },
  { name: "CoinsPaid", src: "/brands/uniform/coinspaid.png" },
];

const STATS = [
  { value: "200+", label: "projects shaped since 2016" },
  { value: "50K+", label: "content assets across formats" },
  { value: "10+", label: "years in digital assets" },
  { value: "20+", label: "countries" },
];

// Deterministic per-logo "randomness" (SSR-stable — no Math.random). The
// reference's rings are not clean circles: measured radii scatter ~±6% within
// each ring and logo sizes vary, which is what makes it read as an organic
// constellation instead of a mechanical wheel. jitter01/scaleFor reproduce
// that from the logo's index alone.
// multiplier must NOT be ≡ ±small mod 19 (73 ≡ -3 made neighbors ramp in a
// 5-6 logo slide → the dome arc visibly tilted); 45 ≡ 7 makes them alternate
const jitter01 = (i: number) => ((i * 45 + 17) % 19) / 19;
const scaleFor = (i: number) => 0.85 + (((i * 53 + 7) % 17) / 17) * 0.33;

// Distribute n logos at even angles around the wheel (even ~30° spacing IS
// what the reference does), but with each logo's radius jittered ±6% so they
// don't sit on a visible circle. r is % of the SQUARE wheel wrapper. The ring
// spins continuously; the card's bottom mask hides whichever logos are
// currently in the lower half, so they appear to come from nowhere.
function arcPositions(n: number, r: number, startDeg: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((startDeg + (i / n) * 360) * Math.PI) / 180;
    const jr = r * (1 + (jitter01(i) - 0.5) * 0.08);
    return {
      x: 50 + jr * Math.cos(a),
      y: 50 + jr * Math.sin(a),
    };
  });
}

function CenterCopy() {
  return (
    <div className="relative z-20 mx-auto max-w-xl text-center">
      <h2 className="font-sans text-[1.7rem] font-light leading-[1.07] tracking-tight text-dtext-hi md:text-[2.6rem] lg:text-[3rem]">
        Brands we&apos;ve
        <br />
        worked with
      </h2>
      <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-dtext-mid">
        A decade shaping growth across the digital-asset industry, now built
        into AI systems for your team.
      </p>
    </div>
  );
}

// One orbiting ring of logos. The ring container spins (orbitClass); each logo
// counter-rotates at the matching duration (counterClass) so it stays upright.
// Positions are % of the square wheel wrapper.
function Ring({
  brands,
  r,
  startDeg,
  sizeClass,
  dimClass,
  orbitClass,
  counterClass,
}: {
  brands: Brand[];
  r: number;
  startDeg: number;
  sizeClass: string;
  dimClass: string;
  orbitClass: string;
  counterClass: string;
}) {
  const pts = arcPositions(brands.length, r, startDeg);
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${orbitClass}`}
      aria-hidden="true"
    >
      {brands.map((b, i) => (
        <span
          key={b.name}
          className="absolute"
          style={{
            left: `${pts[i].x}%`,
            top: `${pts[i].y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className={`block ${counterClass}`}>
            {/* per-logo scale (0.85–1.18) mirrors the reference's varied logo
                sizes; scale (not height) so the responsive sizeClass stays.
                max-w-none: preflight's img{max-width:100%} squeezes logos
                positioned near the wheel's right edge to ~0 width. */}
            <img
              src={b.src}
              alt=""
              className={`w-auto max-w-none object-contain ${sizeClass} ${dimClass}`}
              style={{ transform: `scale(${scaleFor(i)})` }}
            />
          </span>
        </span>
      ))}
    </div>
  );
}

export default function BrandOrbitSection() {
  const marquee = [...INNER, ...OUTER];
  return (
    <section className="bg-green-800 py-20 md:py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        {/* ---------- Desktop / tablet: brand-arc card ---------- */}
        <div className="relative hidden overflow-hidden rounded-[20px] border border-dborder bg-dbg md:block md:min-h-[640px] lg:min-h-[650px]">
          {/* faint green core dropping off to near-black at the edges/corners,
              matching the iertqa reference (much darker than a teal glow) */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(55% 68% at 50% 42%, #1b332e 0%, #0c1613 52%, #060b09 100%)",
            }}
            aria-hidden="true"
          />

          {/* two orbiting rings, masked so logos fade out around the headline
              and the card edge clips the bottom arc (wheel center sits at 85%
              height, like the reference). The mask lives on this static wrapper
              so it stays fixed while the rings spin inside it. Rings live in a
              centered SQUARE wrapper so they render as true circles whatever
              the card's aspect ratio. */}
          <div
            className="absolute inset-0 z-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 48%, transparent 88%)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 48%, transparent 88%)",
            }}
          >
            {/* wheel center at 85% height. Rings are deliberately far apart
                (outer 50% / inner 34.5% of the 990px wheel ≈ 153px gap) so the
                two dome arcs read as distinct bands; inner kept at 34.5%+ so
                logos clear the center headline. */}
            {/* top as inline style: the JIT silently dropped top-[85%] and the
                wheel fell back to an old 66% — inline can't break that way */}
            <div
              className="absolute left-1/2 aspect-square w-[76%] max-w-[990px] -translate-x-1/2 -translate-y-1/2"
              style={{ top: "85%" }}
            >
              <Ring
                brands={OUTER}
                r={50}
                startDeg={0}
                sizeClass="h-[41.8px] md:h-[49.4px]"
                dimClass="opacity-[0.5]"
                orbitClass="bo-ring-outer"
                counterClass="bo-counter-outer"
              />
              <Ring
                brands={INNER}
                r={34.5}
                startDeg={105}
                sizeClass="h-11 md:h-12"
                dimClass="opacity-[0.5]"
                orbitClass="bo-ring-inner"
                counterClass="bo-counter-inner"
              />
            </div>
          </div>

          {/* scrim behind the headline so logos passing near it never hurt
              readability — sits over the straddle zone around the cut line */}
          <div
            className="absolute left-1/2 top-[72%] z-10 h-[340px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(14,36,32,0.96) 0%, rgba(14,36,32,0.75) 48%, rgba(14,36,32,0) 76%)",
            }}
            aria-hidden="true"
          />

          {/* headline + copy — straddles the 66% cut line so logos emerge to its
              left and right at that line (highest) */}
          <div className="absolute inset-x-0 bottom-0 top-[58%] z-20 flex items-start justify-center px-6">
            <CenterCopy />
          </div>
        </div>

        {/* ---------- Mobile: headline → marquee → (stats below) ---------- */}
        <div className="rounded-[28px] border border-[rgba(255,255,255,0.07)] bg-[rgba(5,20,17,0.95)] px-6 py-12 md:hidden">
          <CenterCopy />
          <div className="bo-marquee-mask mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="bo-marquee-track flex w-max items-center gap-10">
              {marquee.map((b) => (
                <img
                  key={`a-${b.name}`}
                  src={b.src}
                  alt={b.name}
                  className="h-8 w-auto shrink-0 object-contain opacity-60"
                />
              ))}
              {/* duplicate set for a seamless loop (hidden when motion is reduced) */}
              {marquee.map((b) => (
                <img
                  key={`b-${b.name}`}
                  src={b.src}
                  alt=""
                  aria-hidden="true"
                  className="bo-marquee-dup h-8 w-auto shrink-0 object-contain opacity-60"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Stats row (shared) ---------- */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:mt-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-dbg px-6 py-7 text-center">
              <div className="font-sans text-3xl font-bold text-dtext-hi md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs leading-5 text-dtext-low">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
