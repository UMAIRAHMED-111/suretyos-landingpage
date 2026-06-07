<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: SuretyOS Landing Page
description: Demand-validation and founding-agency lead capture for a surety bond operating system
colors:
  navy: "#1A3A5C"
  teal: "#0E7C86"
  mint: "#02C39A"
  filing-grey: "#EEF3F8"
  white: "#FFFFFF"
  ink: "#1F1F2E"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.03em"
---

# Design System: SuretyOS Landing Page

## 1. Overview

**Creative North Star: "The Vetted Professional"**

SuretyOS targets owners and producers who have spent years navigating county-specific bond forms, multi-carrier portals, and renewal spreadsheets. They are skeptical of software and immune to SaaS enthusiasm. The visual system earns trust the same way the product does: through specificity, restraint, and structural clarity. Nothing decorates. Everything signals.

The palette is navy-anchored, not blue-generic. Deep Surety Navy (#1A3A5C) provides the structural ground — the color of a good letterhead. Agency Teal (#0E7C86) marks every action, every CTA, every interactive element — a single clear voice for "click here." Action Mint (#02C39A) appears only as confirmation and emphasis. The neutrals are bone-white and filing-grey — the paper you've already seen. This system references Stripe and Mercury: whitespace-heavy, type-forward, financial-grade trust.

The system explicitly rejects two failure modes: the generic SaaS startup aesthetic (cream or beige body, emoji bullet lists, "streamline your workflow" copy) and the legacy insurance portal aesthetic (heavy clip art, dated form UI, corporate gray). Both read as either dishonest or amateur to a surety professional. The design's credibility comes from doing less, more precisely.

**Key Characteristics:**
- Navy as a structural anchor, not a splash of color
- A single teal voice for every call to action — never two different button colors on one page
- Type-forward hierarchy: the headline IS the design element
- Flat surfaces, near-zero ornamentation
- Responsive motion only: state feedback and transitions, no entrance choreography

## 2. Colors: The Surety Palette

A full-palette strategy with four named color roles, each with a clear function.

### Primary
- **Deep Surety Navy** (#1A3A5C): The structural backbone. Used as the hero background, navbar, section dividers, and heading color on light backgrounds. It reads as authority without aggression — the color of a law firm letterhead or a bond underwriter's manual. Never applied as a gradient.

### Secondary
- **Agency Teal** (#0E7C86): The single action voice. Every CTA button, every interactive link, every form submit is this color. Its scarcity is the point — when it appears, it means "do something." Never used decoratively.

### Tertiary
- **Action Mint** (#02C39A): Confirmation and emphasis only. Success states, checkmarks in the founding-member benefit list, active tab indicators, subtle highlight on a key statistic. Applied to ≤5% of any screen surface.

### Neutral
- **Clean White** (#FFFFFF): Card surfaces, form backgrounds, and the primary reading surface inside light sections.
- **Filing Grey** (#EEF3F8): Alternate section backgrounds to create rhythm without heavy borders. The color of a copied bond form.
- **Near-Black** (#1F1F2E): Body copy, primary text. Not pure black — softened to reduce harshness while maintaining ≥7:1 contrast on white.

### Named Rules
**The One Voice Rule.** Agency Teal (#0E7C86) is the only CTA color. One button color, one link color, one interactive accent. If a second color competes for "click this," one of them is wrong.

**The Mint Ceiling Rule.** Action Mint (#02C39A) appears on no more than 5% of any screen. It marks success and emphasis; saturation kills the signal.

## 3. Typography

**Body Font:** Inter (system-ui, sans-serif fallback)
**Display Font:** Inter (same family, heavier weight and tighter tracking for visual contrast)

Inter is the single typeface. Weight contrast creates all hierarchy — no secondary display serif, no secondary sans. This matches the Mercury/Stripe reference: one family, disciplined application, no flourish.

**Character:** Precise and legible. The weight jump from body (400) to headline (700) to display (800) creates clear hierarchy without relying on a second typeface. Tight letter-spacing on display and headline keeps large text structured, not ballooning.

### Hierarchy
- **Display** (800 weight, clamp(2.75rem, 5vw, 4.5rem), line-height 1.05, tracking -0.025em): Hero headline only — one per page. The single headline that names the product and the pain.
- **Headline** (700, clamp(1.75rem, 3.5vw, 2.5rem), line-height 1.1, tracking -0.02em): Section headings. Never more than one level of heading nesting in a section.
- **Title** (600, 1.25rem, line-height 1.3): Card headings, step labels, FAQ questions. The mid-hierarchy voice.
- **Body** (400, 1.0625rem, line-height 1.65): Primary reading text. Max line length 68ch — enforced. Never run body copy full-width on desktop.
- **Label** (500, 0.8125rem, tracking 0.03em): Form labels, metadata, fine print. Short only. No all-caps body copy — reserve uppercase labels for ≤4 word tags.

### Named Rules
**The 68-Character Rule.** Body copy never exceeds 68ch per line. Surety professionals read long bond forms all day; the landing page is a rest stop, not a document.

**The Weight Jump Rule.** Hierarchy is created by weight contrast (400 → 600 → 700 → 800), not by using more than one typeface family. Three weights minimum between any adjacent hierarchy levels.

## 4. Elevation

This system is flat by default. Depth is conveyed through background color alternation (white vs. filing-grey sections) and typographic hierarchy, not box shadows. The only permitted shadows are structural: a single low-lift shadow on form cards and floating nav when scrolled.

### Shadow Vocabulary
- **Card Lift** (`box-shadow: 0 2px 12px rgba(26, 58, 92, 0.08)`): Applied to the signup form container and any card that requires visual separation from a white background. Uses the navy hue, not black, so shadows feel brand-consistent.
- **Scrolled Nav** (`box-shadow: 0 1px 0 #EEF3F8, 0 2px 16px rgba(26, 58, 92, 0.06)`): Applied to the sticky navbar once scrolled. Signals separation from content without heaviness.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The Card Lift shadow appears only when a surface needs explicit separation from its background. Never apply shadows to elements sitting on a colored or dark background — they disappear or look accidental.

## 5. Components

[to be populated on first scan-mode run once code exists]

Primitive components to synthesize at implementation, consistent with this seed:

**Buttons:** Rounded (6px), Agency Teal (#0E7C86) fill, white text, 500 weight, 14px label tracking. Hover: 8% darker. Full-width on mobile. The secondary ghost variant uses navy border + navy text, no fill.

**Inputs:** 1px border (#D0DAE8), white background, 6px radius, 0.5rem–1rem internal padding. Focus: 2px Agency Teal border, no glow. Error: border shifts to a desaturated red; never mint or teal for errors.

**Section alternation:** White → Filing Grey (#EEF3F8) → Navy → White. The dark navy section (hero + founder note + final CTA) anchors the page top, middle-bottom, and bottom. Light sections carry the reading content.

**Form card:** White surface, Card Lift shadow, 12px radius, generous internal padding (40px desktop, 24px mobile). The most important element on the page — deserves the most visual care.

## 6. Do's and Don'ts

### Do:
- **Do** use Agency Teal (#0E7C86) for every CTA button. One teal voice, always the same action: become a founding agency.
- **Do** lead section headings with specific surety language: "probate bond," "power of attorney," "court cover sheet." Specificity IS the credibility signal.
- **Do** cap body copy at 68ch line length on desktop using `max-width` on prose containers.
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on multi-line body paragraphs.
- **Do** alternate sections via background color (white / filing-grey / navy) for rhythm — not borders or card grids.
- **Do** apply `@media (prefers-reduced-motion: reduce)` to every animated element.
- **Do** verify ≥4.5:1 contrast for all body text. Near-Black (#1F1F2E) on white passes; ensure mint and teal used as text or icons on navy pass as well.

### Don't:
- **Don't** use a cream, beige, sand, or warm-tinted body background. The warm-neutral band (beige / paper / linen / parchment) is the saturated 2024–2026 AI landing page aesthetic. SuretyOS uses white and filing-grey — the paper you've already worked with, not a cozy editorial palette.
- **Don't** use the Applied Epic or EZLynx visual register: heavy clip art, stock photography of agents shaking hands, dated form UI chrome, corporate gray palette. This is exactly what the target audience already has and already resents.
- **Don't** use gradient text (`background-clip: text` with a gradient fill). Single solid color, always.
- **Don't** use uppercase kickers above every section heading ("ABOUT US," "THE SOLUTION," "PRICING"). If a section label is needed, run it as a small-caps body label — but use it once, not as a site-wide scaffold.
- **Don't** use a second button color. Not green-for-success, not orange-for-urgency. One CTA, one color.
- **Don't** write "streamline," "empower," "seamless," "next-generation," "game-changing," "world-class," or "leverage." Pick a specific noun and the verb that describes what the product literally does.
- **Don't** place glowing teal/mint gradients behind section headings as decorative background elements. Color is used as surface and accent, not as decoration.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on any card or callout. Full border, background tint, or nothing.
