---
version: alpha
name: gravelscope.website
description: >-
  GravelScope's design language — a light-primary, SEO-focused utility/tool
  site. A near-white canvas (#fafafa) carries a single white calculator card
  divided into an inputs pane and a soft-canvas results pane, with Geist for
  UI and Geist Mono for technical labels. Composition is Vercel Geist
  (token names, radii, elevation), with two documented extensions: tabular
  figures for every numeric result (from Stripe) and a 40–48px form-control
  ladder with an explicit breakpoint table (from Cal.com). Dark mode is a
  token swap, not a second system.
source: >-
  Consolidated from opendesignmd.com designs/vercel (tokens, type, elevation),
  designs/stripe (tabular numerics), designs/cal (form controls, breakpoints).
  Colors, radii and type are already implemented in assets/styles.css.

colors:
  # --- Brand & text (light) ---
  primary: "#171717"          # ink; primary CTA fill — the conversion target
  on-primary: "#ffffff"
  ink: "#171717"              # headings, input text, strong values
  body: "#4d4d4d"             # paragraphs
  mute: "#8f8f8f"             # secondary labels, help text
  faint: "#a1a1a1"            # placeholders, breadcrumb separators
  # --- Surfaces (light) ---
  canvas: "#fafafa"           # page background
  surface: "#ffffff"          # cards, inputs, elevated panels
  surface-2: "#f2f2f2"        # results pane, quick-calculator band, chips
  hairline: "#ebebeb"         # 1px borders and dividers
  hairline-strong: "#a1a1a1"
  # --- Interactive ---
  link: "#0070f3"             # inline links, focus ring
  link-deep: "#0761d1"        # link hover / active
  link-bg-soft: "#d3e5ff"
  focus-ring: "rgba(0,112,243,0.12)"  # input focus halo
  # --- Feedback ---
  danger: "#ee0000"
  danger-bg: "rgba(238,0,0,0.05)"
  danger-line: "rgba(238,0,0,0.25)"
  success: "#0070f3"
  warning: "#f5a623"
  # --- Dark-mode overrides ([data-theme=dark]) ---
  dark:
    canvas: "#0a0a0a"
    surface: "#111111"
    surface-2: "#1b1b1b"
    ink: "#ededed"
    body: "#a1a1a1"
    mute: "#8f8f8f"
    faint: "#6f6f6f"
    hairline: "#333333"
    primary: "#ededed"
    on-primary: "#111111"
    danger: "#ff4242"
    link: "#3291ff"
    link-deep: "#5aa9ff"

typography:
  font-sans: "Geist, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
  font-mono: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
  display-xl:               # page / hero h1
    fontFamily: Geist
    fontSize: "clamp(2.25rem, 5vw, 3rem)"   # 36→48px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.05em
  display-lg:               # section h2
    fontFamily: Geist
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.025em
  display-md:               # card h2
    fontFamily: Geist
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  title-md:                 # card titles
    fontFamily: Geist
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: -0.01em
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  caption-mono:             # eyebrows, kickers, article meta
    fontFamily: Geist Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.4
    textTransform: uppercase
    letterSpacing: 0.06em
  code:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  numeric:                  # EXTENSION (Stripe): money / quantity cells
    fontFamily: Geist
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
    fontFeature: "'tnum' 1, 'cv01' 1"
  numeric-lg:               # primary result figure
    fontFamily: Geist
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.04em
    fontFeature: "'tnum' 1"

rounded:
  xs: 4px
  sm: 6px
  md: 12px
  lg: 16px
  pill: 100px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 48px
  4xl: 64px

shadow:
  whisper: "0 1px 1px rgba(0,0,0,0.04)"
  floating: "0 2px 2px rgba(0,0,0,0.03), 0 8px 16px -4px rgba(0,0,0,0.08)"
  dark-whisper: "0 1px 1px rgba(0,0,0,0.4)"
  dark-floating: "0 2px 2px rgba(0,0,0,0.35), 0 8px 16px -4px rgba(0,0,0,0.5)"

layout:
  max-width: 1120px
  article-width: 820px
  card-gap: 16px

components:
  site-header:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderBottom: "1px solid {colors.hairline}"
    position: sticky
    height: 60px
  nav-link:
    textColor: "{colors.body}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 8px 12px
    hoverBackground: "{colors.surface-2}"
    hoverTextColor: "{colors.ink}"
    activeTextColor: "{colors.ink}"
    minTouchTarget: 44px
  brand-mark:
    background: "{colors.ink}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    size: 32px
  theme-toggle:
    size: 36px
    rounded: "{rounded.sm}"
    border: "1px solid {colors.hairline}"
    background: "{colors.surface}"
  eyebrow:
    typography: "{typography.caption-mono}"
    textColor: "{colors.mute}"
    background: "{colors.surface}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  calculator-card:
    background: "{colors.surface}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    shadow: "{shadow.whisper}"
    overflow: hidden
    width: "{layout.max-width}"
  calculator-head:
    padding: "{spacing.lg}"
    borderBottom: "1px solid {colors.hairline}"
  calculator-body:
    layout: "grid 1.04fr / 0.96fr"
  inputs-pane:
    padding: "{spacing.lg}"
    borderRight: "1px solid {colors.hairline}"
  results-pane:
    padding: "{spacing.lg}"
    background: "{colors.surface-2}"
  unit-toggle:
    background: "{colors.surface-2}"
    rounded: 8px
    padding: 3px
  unit-toggle-button:
    textColor: "{colors.mute}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 7px 13px
    height: 36px
  unit-toggle-button-active:
    background: "{colors.surface}"
    textColor: "{colors.ink}"
    shadow: "{shadow.whisper}"
  field-label:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    marginBottom: 7px
  text-input:
    background: "{colors.surface}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
    height: 44px               # EXTENSION (Cal.com): 40–48px ladder
    placeholderColor: "{colors.faint}"
  text-input-focused:
    border: "1px solid {colors.link}"
    boxShadow: "0 0 0 3px {colors.focus-ring}"
  text-input-with-unit:
    paddingRight: 58px
  unit-suffix:
    textColor: "{colors.mute}"
    typography: "{typography.caption}"
    position: absolute-right
  field-help:
    textColor: "{colors.mute}"
    typography: "{typography.caption}"
    marginTop: 6px
  shape-button:
    background: "{colors.surface}"
    textColor: "{colors.body}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.sm}"
    padding: 10px 8px
    minTouchTarget: 46px
  shape-button-active:
    borderColor: "{colors.ink}"
    textColor: "{colors.ink}"
    background: "{colors.surface-2}"
  button-primary:            # "Calculate gravel" — 100px pill
    background: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: 48px
    padding: 0 14px
    width: 100%
    hoverOpacity: 0.85
  button-secondary:
    background: "{colors.surface}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    height: 44px
  error-box:
    textColor: "{colors.danger}"
    background: "{colors.danger-bg}"
    border: "1px solid {colors.danger-line}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  results-kicker:
    typography: "{typography.caption-mono}"
    textColor: "{colors.mute}"
  primary-result:
    typography: "{typography.numeric-lg}"
    textColor: "{colors.ink}"
    unitLine: "{typography.body-sm} {colors.mute}"
  result-grid:
    layout: "grid 2 columns, gap 10px"
  result-box:
    background: "{colors.surface}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
    padding: 14px
    label: "{typography.caption} {colors.mute}"
    value: "{typography.numeric} {colors.ink}"   # tabular figures
  result-note:
    textColor: "{colors.mute}"
    typography: "{typography.caption}"
  table-wrap:
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
    background: "{colors.surface}"
    overflowX: auto
  data-table:
    minWidth: 560px
    th: "{typography.label} {colors.ink}"
    td: "{typography.body-sm} {colors.body}"
    cellPadding: 12px
    numericCells: "{typography.numeric}"      # tnum on quantity/cost columns
  guide-card:
    background: "{colors.surface}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    hoverShadow: "{shadow.floating}"
    kicker: "{typography.caption-mono} {colors.mute}"
    title: "{typography.title-md} {colors.ink}"
    body: "{typography.body-sm} {colors.body}"
  quick-calculators-band:
    background: "{colors.surface-2}"
    borderTop: "1px solid {colors.hairline}"
    borderBottom: "1px solid {colors.hairline}"
    padding: 48px 24px
  quick-card:
    background: "{colors.surface}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
    padding: 20px 16px
    align: center
    hoverShadow: "{shadow.floating}"
  breadcrumbs:
    typography: "{typography.caption}"
    linkColor: "{colors.mute}"
    hoverColor: "{colors.link}"
    currentColor: "{colors.ink}"
    separator: "/ {colors.faint}"
    minTouchTarget: 44px
  article-meta-chip:
    background: "{colors.surface-2}"
    rounded: "{rounded.sm}"
    padding: 5px 10px
    typography: "{typography.caption-mono}"
    textColor: "{colors.mute}"
  article-nav:
    background: "{colors.surface}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
    padding: 20px
    linkColor: "{colors.link}"
  faq-disclosure:
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
    background: "{colors.surface}"
    summaryMinHeight: 48px
  site-footer:
    background: "{colors.canvas}"
    borderTop: "1px solid {colors.hairline}"
    textColor: "{colors.mute}"
    typography: "{typography.caption}"
    padding: 40px 24px
  skip-link:
    background: "{colors.ink}"
    textColor: "{colors.on-primary}"
    rounded: "0 0 {rounded.sm} 0"
    zIndex: 999
---

# GravelScope — DESIGN.md

Design system for **gravelscope.website**, a free browser-based gravel
calculator and gravel-planning guide hub. This file is the single source of
truth for any coding agent working in this repository.

## Provenance

This system is **Vercel Geist** at its core. The color, type, radius,
spacing and elevation tokens above match the `vercel.com` DESIGN.md from
[OpenDesignMD](https://opendesignmd.com/designs/vercel/DESIGN.md) and are
already implemented in `assets/styles.css`. Two deliberate extensions were
added:

1. **Tabular numerics** (from `stripe.com`) — every number the calculator
   renders uses `font-variant-numeric: tabular-nums` so digits align in a
   column and the results pane reads like financial data. See
   `{typography.numeric}` and `{typography.numeric-lg}`.
2. **Form-control + breakpoint spec** (from `cal.com`) — inputs hold a
   44px height on desktop scaling to 48px on mobile, and the layout follows
   the breakpoint table below.

Do **not** import Stripe's indigo/navy palette or the Cal Sans face. Colors
and the sans face stay Geist.

## Design principles

- **Ink is the CTA.** `{colors.primary}` (`#171717`) fills exactly one button
  per view — the Calculate button. Nothing else is solid black.
- **Mono is the voice of measurement.** Every eyebrow, kicker, article-meta
  chip and unit label uses `{typography.caption-mono}` / `{typography.code}`.
  Body copy never does.
- **Numbers are tabular.** Any value the calculator produces uses
  `{typography.numeric}`. This is the one rule borrowed from outside Vercel
  and it is not optional.
- **One card, two panes.** The calculator is a single
  `{component.calculator-card}` split into `{component.inputs-pane}` (the
  question) and `{component.results-pane}` (the answer). The
  `{colors.surface-2}` results pane is the depth cue.
- **Elevation is calm.** Stacked small offsets plus a hairline border —
  never a single heavy drop-shadow. Hover lifts a card from
  `{shadow.whisper}` to `{shadow.floating}`.
- **Sentence case, negative tracking.** Headlines are weight 600, sentence
  case, with negative letter-spacing. Never all-caps display, never weight 700.
- **Two radii scales coexist deliberately.** Marketing-scale actions
  (Calculate) use `{rounded.pill}` 100px; every control, chip and card uses
  `{rounded.sm}` 6px → `{rounded.lg}` 16px.

## Numeric formatting (extension)

- Apply `font-variant-numeric: tabular-nums` to `.primary-result strong`,
  `.result-box strong` and every numeric `<td>`.
- Always render a unit beside the number: `12.4 yd³`, `16.7 t`, `1,240 kg`,
  `$620`.
- One decimal place for tons and cubic yards above 10, two below 10.
- Never render a bare number in the results pane without its unit label.

## Responsive behavior

### Breakpoints

| Name | Width | Key changes |
|---|---|---|
| Mobile | ≤ 620px | Header nav trims to brand + toggle + 1 link; `.calculator-body` single column; inputs get a bottom border instead of a right border; `input`/`select` min-height 48px; nav/footer links min 44px tall; results grid stays 2-up with the last box spanning both columns; `table` min-width 620px |
| Tablet | 621–820px | `.calculator-body` collapses to a single column; card header stacks; hero top padding reduces |
| Desktop | 821–1120px | Full 2-column calculator body; 2-up guide grid; 3-up shape row; 3-up quick-calculator grid |
| Wide | > 1120px | Content caps at `{layout.max-width}` 1120px; more outer breathing room only |

### Touch targets

- Interactive controls are at least 44×44px; nav links, breadcrumbs and
  footer links explicitly grow to 44px on mobile.
- `{component.button-primary}` (Calculate) is 48px on desktop, 52px on mobile.
- Inputs are 44px on desktop, 48px on mobile with 16px text (prevents iOS zoom).
- `{component.shape-button}` is at least 46px tall on mobile.

### Collapsing strategy

- The calculator's `grid 1.04fr / 0.96fr` becomes one column at 820px.
- Guide grid 2-up → 1-up; quick-calculator grid auto-fit → 2-up.
- Result grid stays 2-up; the final box spans both columns on mobile so no
  box is orphaned.
- Tables never shrink below their `min-width` — `.table-wrap` scrolls
  horizontally.

## Dark mode

Dark mode is a **token swap** on `[data-theme=dark]`, never a second design
system. Only the `{colors.dark.*}` values change; component structure,
spacing, radii and type stay identical. The toggle is a 36px control in the
header and persists the user's choice.

## Do's and Don'ts

### Do

- Reserve `{colors.primary}` (`#171717`) for the primary CTA. It is the
  conversion target.
- Set every technical label — eyebrows, result kickers, article meta, unit
  suffixes — in `{typography.caption-mono}` / `{typography.code}`.
- Use `tabular-nums` on every numeric result cell.
- Cycle surfaces `{colors.canvas}` → `{colors.surface}` → `{colors.surface-2}`
  so the results pane and the quick-calculator band read as depth.
- Keep display type at weight 600 with negative tracking.
- Bind each calculator output to a matching guide page via
  `{component.guide-card}`.

### Don't

- Don't add a fifth accent color. The palette is ink + gray + blue link +
  red error.
- Don't render headings in all-caps or at weight 700.
- Don't put body paragraphs in Geist Mono.
- Don't pile a single heavy drop-shadow on a card.
- Don't render a result number without its unit.
- Don't shrink table columns below `min-width` — let `.table-wrap` scroll.

## File map

- `assets/styles.css` — all tokens and components above.
- `assets/app.js` — calculator logic; DOM hooks must not be renamed.
- `index.html`, `guides/**/index.html`, `about/`, `contact/`,
  `privacy-policy/`, `terms/`, `disclaimer/` — pages using this system.
- `DESIGN.md` — this file.

## Iteration guide

1. Change one component at a time and reference it by its key here.
2. Use `{token.refs}` — never inline a hex value in new CSS.
3. Document only default and active/pressed states; do not spec hover.
4. When a new value is needed, ask first whether it can be expressed with
   the existing Geist token set. It usually can.
