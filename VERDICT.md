# VERDICT

**Subject:** `index.html` — landing page for Rob Wigboldus Vishandel, Zoutsteeg 6, Amsterdam
**Reviewed:** 2026-09-04
**Method:** static read of `index.html` / `styles/main.css` / `scripts/main.js`, plus the rendered
page driven in Chrome at 1440px and in a 390px probe frame, with and without JavaScript.
`INFO.md` was taken as true and not re-verified.

---

## Score: 7 / 10

Craft is well above average — the typography, editorial voice and factual discipline are the work
of someone who knows what they are doing. It loses three points to a small set of concrete defects,
two of which break guarantees the project makes about itself in its own README.

| | |
|---|---|
| **Good or bad?** | **Good.** Genuinely good design and genuinely good research, with fixable engineering gaps. |
| **Sellable?** | **Not as it stands** — and not to anyone but the business itself. See below. |

### Sellable — the long answer

Three separate questions hide inside "sellable":

1. **Can it be sold to a third party?** No, and not because of quality. The page is built entirely
   around one named, real, identifiable business — its address, phone number, and reviews. It has no
   value to anyone else and cannot be resold as a template without gutting it.
2. **Can it be sold to Rob Wigboldus Vishandel?** Potentially yes, as a spec pitch — this is a
   legitimate way to win a client that has no website. But not in its current state. Every fact on
   the page is inferred from third-party aggregators; the five open questions at the end of
   `INFO.md` have to be answered by the owner before this can go live under the shop's name. Shipping
   unconfirmed hours as the shop's own canonical source of truth is worse than having no site.
3. **Is it sellable as evidence of skill — a portfolio piece?** Yes, comfortably. Fix the seven
   items in the spec table below and it is a strong sample.

The site is also honest about all of this: the footer disclaims affiliation, and the README frames
it as an unaffiliated experiment. That framing is correct and should stay.

---

## What is genuinely good

- **Editorial voice.** "Down an alley you'd walk straight past." The copy is specific, dry, and
  never inflates — exactly what `INFO.md` §10.8 asked for. "Not sure about the onion? Ask for it on
  the side. Nobody minds." is the kind of line most restaurant sites cannot write.
- **Factual restraint.** No prices, no founding year, no invented history, no fabricated
  testimonials, no ranking claims. Review quotes are verbatim and attributed to no individual.
  Ratings are rounded down and attributed to their platform. This is rarer than it should be.
- **Photography ethics.** No stock photo is framed as depicting the shop. `CREDITS.md` names every
  file, author and licence. The one genuine location photograph — the Zoutsteeg from the Damrak —
  carries the hero, and the 1983 Nationaal Archief herring-stall photograph is the single best
  image on the page.
- **Typography.** Fraunces against Archivo, an ink/paper/brine/pickle palette that reads as
  considered rather than defaulted. The hanging quotation marks on the review blockquotes and the
  `decimal-leading-zero` step numerals are real details.
- **Accessibility discipline.** Skip link, `:focus-visible` styling, `lang="nl"` on every Dutch
  term, a described SVG map with `<title>`/`<desc>`, correct heading order, 44px minimum touch
  targets, `prefers-reduced-motion` honoured, and a print stylesheet. Two contrast failures across
  the whole page, both in small print (below).
- **No build step.** Three files, no dependencies, runs off `file://`. That constraint is stated,
  justified, and actually held to.

---

## Specification and results

Criteria written for this review, then checked: **11 pass, 12 fail, 1 partial**, across 24 checks.

The fail count is high because the checklist is deliberately strict (WCAG AA on *every* element,
full no-JS parity, correct Open Graph, an image budget). Most of the failures sit in the polish
layer; three are correctness. The fundamentals underneath — voice, research method, semantics,
accessibility architecture — pass, which is what the 7 reflects.

### A. Correctness of stated facts

| # | Spec | Result | Evidence |
|---|---|---|---|
| A1 | No fact is asserted that `INFO.md` does not support | **FAIL** | Small unsourced additions: "Rokin · **Dam Square**" as nearest stop (`INFO.md` §2 lists Rokin only); "Mackerel, **smoked**" (§3 lists makreel with no preparation); kibbeling "**fried to order, with sauce**". None is likely to be wrong, but §10.1 says never state what the dossier does not carry, and these were not run back through it |
| A2 | Directions given are geographically correct | **FAIL** | "Coming up the Damrak from Centraal Station, it is a narrow gap on your **left**." Centraal is north of the shop, so that walk heads south; the Zoutsteeg opens west, i.e. on the walker's **right**. The page's own schematic map draws it correctly (Nieuwendijk west of Damrak, Dam to the south), so the copy contradicts the graphic beside it |
| A3 | Unverified facts are hedged, not asserted | **PARTIAL** | The Find-us panel hedges well ("Worth a call before a long detour", "Cash is the safest bet"). The hero badge does not: it states "Open now — until 18:00 today" as flat fact, computed from hours `INFO.md` flags as the #1 unconfirmed item, with no closing days and no holidays. It will confidently say "Open now" on Christmas morning |
| A4 | Structured data is no more confident than the visible copy | **FAIL** | The JSON-LD asserts `openingHoursSpecification` 09:00–18:00 all seven days and `paymentAccepted: "Cash"` as machine-readable truth with no hedge. This is what feeds a Google knowledge panel — a stronger claim than `INFO.md` §10.6 permits |
| A5 | Alt text matches what the image actually shows | **FAIL** | `gerookte-zalm.jpg` is described as "Thin slices of smoked salmon" but shows a garnished restaurant plate with tomato and salad. `alley-zoutsteeg.jpg`'s alt leads with "The Zoutsteeg street sign" when the sign is a small element at the frame edge and the subject is the alley |
| A6 | Ratings attributed and rounded down | **PASS** | 4.6 / "over 1,600", 4.7 / "over 850", both credited on-page |
| A7 | Review quotes verbatim, unattributed to individuals | **PASS** | Four quotes, all matching `INFO.md` §6, all labelled "Visitor review" |
| A8 | No prices, founding year, rankings, or invented history | **PASS** | None present; the counter section points at the board in the shop instead |
| A9 | Non-affiliation disclosed | **PASS** | Footer fine print and README both state it plainly |

### B. Engineering

| # | Spec | Result | Evidence |
|---|---|---|---|
| B1 | The page is complete and usable with JavaScript disabled (README's own claim) | **FAIL** | At mobile width with scripts off, `.nav` stays `position: absolute; top: 100%` and renders as a permanently-open 294px panel that covers the eyebrow, **the entire H1**, and the first two lines of the lead — with no way to dismiss it. Verified in a sandboxed 390px frame. The `.js`-gating handles the toggle button correctly but never returns the panel to static flow |
| B2 | Image payload suits the stated audience — mobile, slow connection | **FAIL** | 3.2 MB of JPEG. `gerookte-paling.jpg` is 707 KB at 985px wide to fill a 112px thumbnail; `haring-plate.jpg` 495 KB and `kibbeling.jpg` 278 KB likewise. The LCP hero is 534 KB. No `srcset`, no `<picture>`, no WebP/AVIF. Roughly 1.6 MB is spent on five thumbnails that need under 100 KB |
| B3 | No layout shift from images | **PASS** | Every `<img>` carries `width`/`height`, and all seven match the files on disk (checked with `sips`) |
| B4 | No horizontal overflow at 390px | **PASS** | `scrollWidth - innerWidth === 0`. Note `body { overflow-x: hidden }` is a blunt instrument that would mask a real overflow rather than surface it |
| B5 | Social share card renders | **FAIL** | `og:image` is the relative path `assets/img/broodje-haring.jpg`; the Open Graph spec requires an absolute URL, so most scrapers will resolve nothing. It is also 1280×2276 portrait behind `twitter:card=summary_large_image`, which wants ~1.91:1. No `og:url`, no `rel=canonical` |
| B6 | Internal links resolve | **FAIL** | README links `.github/notes/ROADMAP.md`, which does not exist in the repo. The footer's "Image credits" link serves `text/markdown`, which Chrome downloads rather than renders — and that file is the only place the CC BY-SA attribution lives |
| B7 | Console clean, no runtime errors | **PASS** | No errors across a full scroll and a nav open/close cycle |
| B8 | Progressive enhancement is real, not decorative | **PASS** | Status badge ships correct static copy ("Open 09:00–18:00, seven days a week") and is only upgraded by JS; hero deliberately excluded from the reveal observer; `Intl` failure falls back silently |

### C. Design and accessibility

| # | Spec | Result | Evidence |
|---|---|---|---|
| C1 | All text meets WCAG AA contrast | **FAIL** | Two failures, measured across every visible text-bearing element with proper alpha compositing against the composited background: the footer fine print at **3.73:1** (12.5px, needs 4.5) and the map caption at **4.09:1** (11.8px). `.quotes footer` and `.scores__l small` scrape by at 4.54:1 |
| C2 | Touch targets ≥ 44px | **PASS** | Zero elements under 44px high; phone links are explicitly given `min-height: 44px` |
| C3 | Heading order is correct and unique | **PASS** | One H1, no skipped levels, visually-hidden H2s where the design has no visible heading |
| C4 | Reduced motion honoured | **PASS** | Transitions neutralised, smooth scroll disabled, reveals forced visible |
| C5 | Layout holds at 1440px | **FAIL** | The "Also on the ice" rows are the weak point: `.menu__body` fills the row but its text caps at 40ch, leaving ~650px of dead space between the dish name and its thumbnail at the far right. Each row reads as two disconnected islands. The footer divider also over-runs the content columns by the wrapper padding on both sides |
| C6 | Scroll reveals do not leave blank screens | **FAIL** | They do. `.menu` and `.hero-item` are each a single tall observer target, so a fast scroll lands on a fully empty viewport for the ~500ms fade — caught twice in testing. The code comment claims the 12% `rootMargin` prevents exactly this; it does not, because the margin is far smaller than the targets |
| C7 | Imagery is strong enough to carry a food page | **FAIL** | The alley photograph and the 1983 archive shot are excellent. The food photography is not: the hero `broodje-haring.jpg` is a flat, harshly-lit snapshot on a white background, given the largest image slot on the page as "the one to order". It is the single biggest gap between the page's ambition and its execution, and it is a sourcing problem, not a coding one — `INFO.md` §7 already identifies real photography as the fix |

---

## Fix list, in order

1. **Correct the wayfinding sentence.** It is the one error that actively sends a visitor the wrong
   way, on a page whose entire premise is finding a hidden alley. (A2)
2. **Make the no-JS nav `position: static`.** One CSS rule; it currently hides the headline. (B1)
3. **Hedge the hero status badge**, or drop the live open/closed logic until the owner confirms
   hours. Same for the JSON-LD hours. (A3, A4)
4. **Resize the images.** Thumbnails to ~256px, hero to ~1600px, add WebP. This is a 90% payload cut
   for an afternoon's work. (B2)
5. **Absolute `og:image`, landscape crop, add `og:url` and canonical.** (B5)
6. **Raise the two failing contrast values** — `.45` → `.62` and `.5` → `.62` alpha does it. (C1)
7. **Render credits as HTML**, not a downloaded `.md`, since it is the licence attribution. Add the
   missing `ROADMAP.md` or unlink it. (B6)

Items 1–3 are correctness and should block any use of this under the shop's name. Items 4–7 are
polish.

---

## Bottom line

This is a well-made page let down by a short list of specific, cheap-to-fix defects. The research
methodology behind it is better than the code, and the code is better than the food photography.

As an unaffiliated concept it is honest and defensible. As a pitch to the business it needs items
1–3 fixed and the five `INFO.md` questions answered by the owner first. As proof that whoever built
it can build a website, it already works.
