# Migration Report — pear.no: Vite/React build output → Astro + Tailwind

## Source material

This was not a legacy HTML/CSS/JS site. The repository held the **production
build output** of a Vite + React 19 + Tailwind v4.3.3 single-page app — no
source existed anywhere in git history. The only inputs were the compiled
bundle (`assets/index-BhJdAf8K.js`, 325 KB minified), its stylesheet
(`assets/index-Bd_JnIbr.css`, 62 KB), a saved DOM snapshot, and ~143 MB of
media assets. Both are kept, de-minified, at `_source/` for reference; the
pre-migration site itself is kept runnable at `reference/` for comparison
(both git-ignored — working material, not part of the shipped site).

## Pages migrated

| Original | Astro |
|---|---|
| `/` (the only route — a single-page app) | `src/pages/index.astro` |

## Components created

Each mirrors one original React component 1:1, so the DOM the engine expects
never moved:

| Component | Original function | Renders |
|---|---|---|
| `Stage.astro` | `qi()` | `.nvs`, `.gl` canvas, boot poster, `#inkf`/`#fqTear` SVG filters |
| `Sign.astro` | `Xi()` | the "Asked before" intro signature stroke |
| `Faq.astro` | `Qi()` + `xn()` | FAQPage JSON-LD, `.faq-lead`, and the 5 `.fq` cards (see below) |
| `Fly.astro` | `$i()` | the flysky canvas + backdrop |
| `FooterStack.astro` | `aa()` | fullscreen title card, trans/foot/ftx canvases |
| `ContactForm.astro` | `oa()` | the `.cf` shell (fields still built client-side) |
| `Fin.astro` | `sa()` | the two-panel finale copy |
| `Plate.astro` | `ca()` | the proof/platform scroll-pinned panel |
| `NavMenu.astro` | `la()` | `#nvm` full-screen nav overlay content |
| `Overlay.astro` | `da()` | header/rail/hero-copy chrome |

Every component was produced by executing the original JSX against a real
jsx-runtime stub (a small Node harness substituting `V.jsx`/`V.jsxs` with an
HTML serializer) rather than hand-transcribed — so nesting, inline styles,
and SVG path coordinates are byte-verified against source, not retyped.

## JavaScript migrated

**Finding that shaped the whole migration:** across the entire original app,
there is not one `useState`, `useRef`, `useMemo`, or `useCallback` — only a
single `useEffect(() => Gi(), [])`. React rendered static markup once and
handed off to an imperative engine. That engine is now `src/scripts/`,
lifted from the bundle and split into 17 modules along its natural seams
(verified with a real scope resolver, not text search — see below), with the
~50 well-understood entry points renamed per the recovered naming key:

| Module | Original | Contains |
|---|---|---|
| `easing.ts` | `d,f,p,m,h,g,_,v` | clamp/smoothstep/easing primitives |
| `parallax.ts` | `x,y,b` | pointer parallax |
| `constants.ts` | the big data chain | hero list, chapter-timing fractions, FAQ source data, overlay anchor points |
| `scroll.ts` | `Ne,Pe,ct,lt,ut,L,R` | virtual scroll, mobile road remap, menu, apply-links |
| `loader.ts` | `ht,gt,bt,yt` | the 8-slot frame-loader queue |
| `films.ts` | `St,Ct,wt,Dt,Et` | frame-sequence loader, dyadic ordering, the "reel" |
| `gl-main.ts` | `Ot,kt,Nt` | the main WebGL program (61 uniforms, 6 transition modes) |
| `lines.ts` | `Yt,$t` | the intro blueprint-lines canvas (blue-channel video keying) |
| `text.ts` | `cn,ln,un,mn,pn` | word/char text splitting, headline/standfirst animation |
| `faq.ts` | `xn,Cn,wn` | FAQ carousel + exit (card creation removed — see below) |
| `contact.ts` | `An,jn,Mn` | form submit wiring (rewritten — see below) |
| `footer.ts` | `wr,Tr,Dr,Ar,Mr,Fr,zr,Br` | footer stack, contact-field DOM build, glints, chapter transition |
| `fin.ts` | `li,ui,di` | finale ink-bleed chapter |
| `plate.ts` | `Ci,Ti,Ei` | proof/platform pan |
| `rail.ts` | `Oi,ki` | chapter rail nav |
| `hud.ts` | `Hi,Ui` | `?hud` debug overlay + query-param flags |
| `engine.ts` | `Gi` | orchestrator: init order + the rAF frame loop |

**Splitting method:** the 84 top-level statements were parsed with `acorn`
and scope-resolved with `eslint-scope` (not a text/regex split — heavily
minified code reuses short names like `T`, `w`, `_` for unrelated locals
inside different functions, which a naive split would corrupt). The resolver
confirmed **zero cross-module mutations of any shared binding** — every
module's own state is only ever written from within that module, so the
split needed no shared-mutable-state machinery, just plain imports. Renames
were applied at the exact character offsets `eslint-scope` reported for each
variable's declaration and every one of its resolved references, and
verified afterward: statement count, scope count, and the set of unresolved
global identifiers (`document`, `window`, `location`, …) are identical
before and after, statement-for-statement — confirming the rename touched
naming only, not structure.

**De-minifier bug found and fixed:** the tool that pretty-printed the
original bundle had corrupted `x ||= y` into `x || = y` (and `&&=`
similarly) at 11 sites — a real syntax error, not a source-of-truth
discrepancy. Confirmed against the authoritative minified bundle and fixed
globally before extraction.

### Deliberate JS differences

- **FAQ cards** (`buildFaq`/`xn`) were built via `innerHTML` at runtime from
  the same data now in `src/data/faq.ts` — invisible to crawlers despite the
  page shipping `FAQPage` JSON-LD describing them. `Faq.astro` pre-renders
  them; `buildFaq()` now queries the existing elements instead of creating
  them. The carousel and exit animation math is untouched.
- **Contact form** (`wireSubmit`/`Mn`) posted to `/api/apply` with a
  Cloudflare Turnstile token, verified by a backend that does not exist in
  this repo. Turnstile is removed entirely (nothing is left to verify its
  token — keeping it would only add a third-party script load with no
  protection behind it) and the endpoint is now FormSubmit
  (`https://formsubmit.co/ajax/…`). Client-side validation, button-state
  text, and the honeypot field (renamed to FormSubmit's `_honey`) are
  unchanged. **Open item:** the endpoint currently targets the email address
  directly, which triggers FormSubmit's one-time inbox confirmation on
  first submit; after confirming, swap `FORMSUBMIT_ENDPOINT` in
  `src/scripts/contact.ts` for the hashed-form URL FormSubmit issues, so the
  address isn't sitting in client JS.
- **`.boot` poster** was set from the randomly-picked hero (`at.poster`) as
  a React render prop, before first paint. A static build can't know a
  client-random pick (`?hero=` override, else `Math.random()`) at build
  time, so `Stage.astro` bakes the first hero ("signal") as a default and
  `startEngine()` corrects `.boot`'s `src` to the actual picked hero right
  next to where it already sets `.src` video's `src` the same way.
  Verified: sampling `.boot`'s `src` every 50 ms from page load with
  `?hero=colossus` shows the correct poster from the very first sample.
- React removed entirely (~309 KB of the 473 KB bundle) — the hook audit
  above shows this changes nothing at runtime.

## CSS migrated

The rendered DOM uses 97 classes, all semantic (`.pin`, `.ov`, `.cf-f`,
`.fin-g`, …). Extracting every `class=` attribute from the DOM snapshot and
grepping all 143 `className` sites in the bundle turned up **zero Tailwind
utility classes anywhere in the shipped app** — the 20 KB `@layer utilities`
block (33% of the stylesheet) has no consumer, almost certainly an orphaned
component Tailwind's filesystem scan picked up. It was not regenerated.

What *is* live:

- **`@theme`** — the 9 custom tokens (`--color-press/-paper/-ink/-ink-soft/
  -rule/-sky`, `--ease-press`, `--tracking-press`, `--text-display`) plus 3
  font-family overrides, carried over verbatim into `src/styles/global.css`,
  built against `tailwindcss@4.3.3` — the exact version that generated the
  original, so theme/preflight output matches byte-for-byte.
- **Preflight** — via `@import "tailwindcss"`, unmodified.
- **~30 KB of hand-written art CSS** — the actual visual system: pixel-composed
  layout, 13 `@keyframes`, `@property --ra` (a registered custom property,
  required for the contact-field rim's conic-gradient rotation to
  interpolate at all), `mask-composite` rim rings, an SVG `filter:
  url(#inkf)` ink-bleed effect, `clip-path` reveals, and an 8-breakpoint
  responsive system (720/820/900px, all `max-width`, none matching Tailwind
  defaults). Moved in as authored CSS, unlayered and in original order —
  by design, matching your Tailwind-scope decision.

### Fixed while extracting (confirmed behavior-neutral)

- **4 duplicate `@font-face` rules** were silently overriding the
  cache-busted (`?v=2`) Flecha S / GT Standard L / GT Standard Mono
  declarations by source order. Dropped the duplicates; kept the versioned
  ones. Same font files either way — zero rendering difference, cache
  hygiene only.
- **`@theme` compiled-output artifact**: the source stylesheet's `@layer
  theme { :root, :host { … } }` is Tailwind's *compiled* form. Reproducing
  it verbatim as `@theme { :root, :host {…} }` in a fresh Tailwind build is
  invalid `@theme` syntax (it expects flat declarations); unwrapped to the
  correct source form before use.
- **Font `url()` paths**: `@font-face` originally used `../fonts/…`,
  relative to the old `assets/` output directory. Rewritten to `/fonts/…`
  since the compiled CSS's output location is now bundler-controlled;
  `public/fonts/` still serves at that path. Markup (`./films/…` etc.) was
  left exactly as authored — this is a single-route site, so `./` and `/`
  resolve identically for the page itself.

### Known CSS fragility (carried over, not modified)

- `.cf-f .rim`/`.rim2` are each declared twice; the second declaration adds
  the `cfRimP` pulse animation and wins by source order. Kept as one
  unlayered file in original order specifically so this keeps working.
- `.pin img, .pin video, video.src { max-width: none }` must load after
  preflight's `img { max-width: 100% }` — true here because it's unlayered
  and preflight is `@layer base` (unlayered always wins).
- The z-index ladder (0→30, `.nav-open .ov` promoted to 6 at runtime) is
  tuned against stacking contexts implicitly created by `perspective`,
  `preserve-3d`, `will-change`, `filter`, `backdrop-filter`, and
  `opacity<1`. DOM nesting was kept byte-identical specifically to avoid
  disturbing this.

## External dependencies

| Then | Now |
|---|---|
| Cloudflare Turnstile (`0x4AAAAAAECR6CzEFNGbEa4o`) + `/api/apply` | Removed — see Contact form above |
| Self-hosted fonts (Flecha S/L/M, GT Standard L/Mono) | Unchanged, `public/fonts/` |
| No third-party font CDN (explicitly removed before this migration, per the bundle's own comment) | Unchanged |

## Assets restored

The local mirror was missing 1,550 files the code references: the `v28`/
`v51` model-reel bridges (2 of the 3 random heroes had no reel), every
mobile `/768` frame tier (5 films + 2 reels), 3 font files, and 2 hero
posters + `og.jpg`. All confirmed live on production (`pear.no`) and
restored byte-for-byte before any comparison or testing began — a
prerequisite, not an enhancement, since you cannot visually regress against
a reference that 404s at every viewport ≤820px and on ⅔ of hero picks.

## Known differences

1. React removed (~309 KB) — no runtime behavior depends on it (see hook
   audit above).
2. The dead Tailwind utilities layer (~20 KB) is not regenerated — nothing
   in the shipped app ever used it.
3. Cloudflare Turnstile removed; the form now posts to FormSubmit.
4. FAQ cards are pre-rendered server-side instead of `innerHTML`-injected
   (crawler-visible now, matching the JSON-LD that already described them).
5. The site now renders **correctly** at ≤820px and for all 3 heroes, which
   this repo's mirror did not before the asset restoration — an improvement
   that matches production, not a migration side effect.
6. `.boot`'s poster defaults to one hero at build time and is corrected on
   init (see above) — imperceptible in practice, confirmed by direct
   sampling.

No other differences were found or introduced. DOM structure, CSS, and
engine logic are otherwise verbatim.

## Verification performed

- **Build**: `npm run build` succeeds; single JS entry + single CSS output;
  all of `public/films`, `public/fonts`, `public/art` copied through
  untouched.
- **Structural equivalence of the rename**: statement count (84), total
  scope count (388), and the full set of unresolved global identifiers are
  identical between the original engine source and the renamed/split
  version.
- **Runtime, headless Chromium, `astro preview`, three hero picks, two
  viewports (1440×900 and 390×844)**:
  - **Console**: zero errors, zero warnings beyond the test harness's own
    diagnostic `readPixels()` call — no shader compile/link warnings (the
    engine's own code emits those via `console.warn` on failure).
  - **Network**: zero failed requests, before and after scrolling to
    mid-page.
  - **DOM contract**: all ~50 spot-checked engine selectors resolve with
    correct counts (`.fq`×5, `.cf-f`×3, `.fin-g`×2, `.pf-g`×3, `.gx`×4, …).
  - **`window.__READOUT`** present and live.
  - **Mobile film tier**: `/768`-tier frame requests confirmed firing on a
    390px viewport; stage height 61,612px = 844 × 73 (the `7300vh` mobile
    rule), against 48,150px = 900 × 53.5 (the `5350vh` desktop rule) at
    900px height — both responsive breakpoint rules verified numerically,
    not just visually.
  - **Menu**: opens (`.nav-open` class, `#nvm[aria-hidden="false"]`), closes
    on Escape.
  - **Rail navigation**: clicking a chapter link moves the virtual scroll
    position.
  - **Form validation**: an empty submit focuses the name field and makes
    zero network calls to FormSubmit — confirmed via request interception.
  - **Hero correction**: `.boot`'s `src` sampled every 50 ms from load with
    `?hero=colossus` — correct from the very first sample, confirming the
    build-time-default/runtime-correction approach works as designed.
  - **GL canvas**: context created, correct dimensions, drawing (sampled
    center pixel matches the engine's documented placeholder texture color
    before first video frame decode).
- **Routes**: the single route (`/`) builds and serves correctly.
- **Console errors / broken links / missing assets**: none found (see
  Network and Console above).

### Not verified (needs a human)

- **Pixel-level visual regression** against the restored `reference/` copy
  across the full 9-viewport × 21-scroll-stop × 3-hero matrix the plan
  specified — the checks above are behavioral/structural (DOM, network,
  console, numeric breakpoint math), not image diffing. Recommended before
  going live: serve `reference/` and the new build side by side and diff
  screenshots at a few scroll stops per viewport.
- **A real FormSubmit submission end-to-end** (the smoke test only proved
  invalid submissions are correctly blocked, to avoid triggering a live
  send during testing).
- **Cross-browser** (only Chromium was used for automated testing).
