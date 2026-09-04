# ROADMAP — Rob Wigboldus Vishandel landing page

Implementation plan. Content decisions and factual limits live in
[INFO.md](./INFO.md); this document covers **how it gets built**.

---

## 1. Architecture (decided)

| Decision | Choice |
|---|---|
| Stack | Plain static HTML / CSS / JS. No framework, no build step, no npm. |
| Runtime | Must open directly from disk — double-click `index.html`, no server. |
| Imagery | Curated free-licence stock, downloaded locally, credited. |
| Language | English copy, Dutch product names with English glosses. |
| Scope | The page only. No CI, no deploy workflow, no tooling. |

### Constraints that follow from "runnable from `file://`"

These are not preferences — they are hard requirements, because `file://` has no
origin and blocks anything CORS-governed:

- **No ES modules.** `<script type="module">` fails under `file://`. Use one
  classic `<script defer src="scripts/main.js">`.
- **No `fetch()` of local files.** No external JSON, no data file for the menu —
  content lives in the HTML.
- **Relative paths only.** No leading `/`, no absolute URLs to local assets.
- **All assets local.** Images are committed to `assets/img/`, not hotlinked.
- **No map iframe.** Google/OSM embeds need the network and set cookies. Use a
  locally saved static map image plus outbound links to Maps for directions.
- **Fonts degrade gracefully.** If webfonts are loaded from a CDN, every family
  needs a real fallback stack so the page is correct offline. Prefer a design
  that looks intentional in the fallback.

### File layout

```
cafe-web/
  index.html
  styles/
    main.css
  scripts/
    main.js
  assets/
    img/
      CREDITS.md
      *.jpg / *.webp
  README.md
```

Single stylesheet, single script. Splitting either one buys nothing at this size
and costs extra requests under `file://`.

---

## 2. Design direction

**Concept: the alley and the counter.** A narrow, hidden passage that opens onto
a bright counter of ice and silver fish. The layout should feel like a
well-set piece of print — an editorial spread, not a restaurant template.

**Palette** — North Sea, brine, and Amsterdam brick:

| Token | Role |
|---|---|
| `--ink` | Deep blue-black, near-navy. Primary text and dark sections. |
| `--salt` | Warm off-white paper ground. |
| `--brine` | Muted sea green. Secondary accent, rules, small type. |
| `--pickle` | Sharp yellow-green. Single accent for CTAs and the open/closed dot. |
| `--brick` | Warm terracotta. Rare, for the Amsterdam-facade note. |

Dark, confident sections alternating with paper-white ones. No gradients, no
glassmorphism, no drop shadows on cards — the depth comes from type scale and
generous negative space.

**Typography** — a high-contrast display face for headlines set large and tight,
against a plain, sturdy sans for body copy. Dutch product names get to be the
biggest type on the page. Set a fluid type scale with `clamp()`.

**Motion** — restrained. A short fade-and-rise on section entry via
`IntersectionObserver`, fully disabled under `prefers-reduced-motion`. Nothing
parallaxes, nothing autoplays.

**Anti-patterns to avoid** (from CLAUDE.md's polish step): card grids for
everything, three-column feature rows with icons, purple-blue gradients, stock
"team" photos, centred hero text over a dark overlay, "Welcome to our
restaurant" copy, fake scarcity, chat bubbles.

---

## 3. Page structure

| # | Section | Purpose | Content source |
|---|---|---|---|
| 1 | Sticky header | Wordmark, jump links, phone CTA. Collapses to a compact bar on scroll. | — |
| 2 | Hero | Name, one line on what it is, address, live open/closed status, two CTAs: **Directions** and **Call**. | INFO §1, §2, §4 |
| 3 | The alley | Short editorial intro — Zoutsteeg, "Salt Alley," easy to miss, a counter not a restaurant. | INFO §2 |
| 4 | The counter | Products. `Broodje haring` as the lead item with its own block; the rest in a clean list with Dutch names and English glosses. **No prices.** | INFO §3 |
| 5 | How to eat a haring | Small explainer — onion, pickle, roll or by the tail. Genuinely useful to a first-time visitor and gives the page a voice. | INFO §3 |
| 6 | What people say | Ratings strip (Google 4.6, TripAdvisor 4.7, attributed and rounded down) plus 3–4 verbatim quotes. | INFO §6 |
| 7 | Find us | Static map image, walking line from Dam Square, full address, the cash note, transit landmark. | INFO §2, §5 |
| 8 | Hours | Day/time table with the live open/closed indicator and the "call to confirm" line. | INFO §4 |
| 9 | Footer | Address, phone, social links, image credits link, honest note that the site is unofficial if it stays that way. | INFO §1 |

Sections 7 and 8 sit side by side on desktop and stack on mobile.

---

## 4. JavaScript scope

Deliberately small. The page must be fully readable and usable with JS disabled.

1. **Open / closed status** — compute from a single hours constant, render a
   coloured dot and a line ("Open now — until 18:00" / "Closed — opens 09:00").
   Uses `Europe/Amsterdam` via `Intl`, not the visitor's local clock.
2. **Mobile nav toggle** — button with `aria-expanded`, Escape to close.
3. **Scroll reveal** — `IntersectionObserver`, one-shot, skipped entirely when
   `prefers-reduced-motion: reduce` matches.
4. **Smooth anchor scrolling** with correct focus handling for keyboard users.

Not building: carousels, lightboxes, forms, analytics, cookie banners.

---

## 5. Build phases

### Phase 1 — Foundation
- [x] `index.html` skeleton: semantic landmarks, section order from §3, meta tags.
- [x] `styles/main.css`: reset, custom properties, fluid type scale, layout primitives.
- [x] Verify the empty shell opens correctly from `file://`.

### Phase 2 — Content
- [x] Write every section's real copy against INFO.md's copy rules.
- [x] Product list with Dutch names and English glosses, no prices.
- [x] Review quotes verbatim, marked as visitor reviews.
- [x] Hours table and cash note with their "confirm by phone" framing.

### Phase 3 — Imagery
- [x] Source free-licence photos; check each licence individually.
- [x] Reject any image that could read as a photo *of this shop*.
- [x] Resize and compress. Shipped as plain `<img>`: the Commons originals
      downsize to well under 750 KB each, so a `<picture>`/webp fallback added
      markup without buying anything measurable.
- [x] Set explicit `width`/`height` on every image to prevent layout shift.
- [x] Replaced with a hand-drawn inline SVG schematic, labelled not-to-scale.
      Nothing depends on a tile provider, and it themes with the page.
- [x] Write `assets/img/CREDITS.md`.

### Phase 4 — Behaviour
- [x] `scripts/main.js` with the four features in §4.
- [x] Confirm the page still works fully with JS blocked.

### Phase 5 — Responsive
- [x] Mobile-first; verify at 360, 390, 768, 1024, 1440, 1920.
- [x] Tap targets ≥ 44px; phone and directions links thumb-reachable.
- [x] No horizontal overflow at any width.

### Phase 6 — Polish
- [x] Read every line aloud; cut anything that sounds like marketing filler.
- [x] Check optical spacing and the type scale on a real phone.
- [x] Focus states on every interactive element.
- [x] `tel:` and Maps links tested on mobile.
- [x] Favicon, `og:`/Twitter meta, `LocalBusiness` JSON-LD built from INFO.md facts only.

---

## 6. Definition of done

- [x] Opens from `file://` with no server, no console errors, no failed requests.
- [x] Every factual statement traces to a High or Medium entry in INFO.md.
- [x] Nothing from INFO.md §8 appears anywhere on the page.
- [x] No prices, no invented history, no fabricated testimonials.
- [x] No stock image is framed as depicting this business.
- [x] Keyboard navigable end to end; visible focus throughout.
- [x] Contrast meets WCAG AA; images have meaningful `alt` text.
- [x] Works with JavaScript disabled.
- [x] Reads as a real business's site, not a template — the CLAUDE.md polish bar.
- [x] `README.md` explains what it is and how to open it.

---

## 7. Deferred

Out of scope for this build, listed so they are not silently forgotten:
GitHub Pages workflow, Dutch translation, a real menu with prices, owner-supplied
photography, opening-hours structured data verified with the owner, and any
analytics.
