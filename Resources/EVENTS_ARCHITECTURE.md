# Tedder Engineering Events — Architecture & Component Spec

## Overview

The Tedder Engineering Events system consists of two deployable pieces:

1. **Events Homepage Chip** — A React component embedded on `tedderengineering.com` that links visitors to the events portal
2. **Events Page** — A standalone React app deployed at `events.tedderengineering.com` that hosts race weekend dashboards

Both components are self-contained `.jsx` files with all styles inline (no external CSS dependencies). They share the Barlow / Barlow Condensed font family loaded from Google Fonts.

---

## Component: EventsHomepageChip.jsx (EventsBanner)

**Purpose:** Hero-integrated event banner for the tedderengineering.com homepage. Designed to sit inside the hero section, below the tagline and orange accent bar — visible on first load without scrolling.

**Deployment target:** `tedderengineering.com` — inside the existing hero/landing section

**Design:** Semi-transparent glassmorphism card with backdrop blur, matching the site's dark checkered-pattern aesthetic. Uses `rgba()` backgrounds so the site's texture shows through.

**Mobile-first:** Uses CSS media queries at 480px breakpoint. Icon, text, and layout all scale down for phone screens. The component is full-width on mobile with proper padding.

**Integration:**
```jsx
import EventsBanner from './EventsHomepageChip';

// Place inside hero section, below tagline/accent bar
<EventsBanner />
```

**Dependencies:** React, no other libraries. Google Fonts loaded via `<link>` tag inside the component.

**Updating for future events:** Change the "Next Event" block text inside the component — the event name, date, and location are hardcoded strings (not from an API).

---

## Component: EventsPage.jsx

**Purpose:** The events portal at `events.tedderengineering.com`.

**Deployment target:** `events.tedderengineering.com` (new subdomain)

**Architecture:**
```
EventsPage (export default)
├── Site Header (Tedder Engineering Events branding + Past Events button)
├── ArlingtonWeekendSummary (child function component)
│   ├── Dashboard view (home — countdown, nav cards, resume banner)
│   ├── ScheduleView (sub-component with tabs)
│   │   ├── "Full Weekend Schedule" tab (active)
│   │   └── "Minute by Minute" tab (grayed out, tooltip on hover)
│   ├── On-Track view
│   ├── Procedures view
│   └── Tires & Tech view
└── (Future event components go here)
```

**Key features:**
- Live countdown to event start (Practice 1) using America/Chicago timezone
- Persistent "pick up where you left off" via `window.storage` API (Claude.ai artifact storage — will need replacement for production deployment)
- Past-event auto-strikethrough based on current date vs Arlington CT
- Racetrace external link card (`racetrace.tedderengineering.com`)
- Predictions tab grayed out / locked
- Minute-by-minute schedule tab grayed out with tooltip

**Data sources:** All event data (schedules, procedures, tire rules, circuit specs) is hardcoded in the component from official series documents. No API calls.

**Color palette (WCAG AA compliant):**
| Token | Hex | Purpose |
|-------|-----|---------|
| bg | #2B2B2B | Page background |
| card | #333333 | Card surfaces |
| accent | #F0A848 | Primary accent (amber) |
| accentLight | #F5C070 | Secondary accent |
| white | #F0F0F0 | Primary text (~13:1 contrast) |
| grayLight | #C0C0C0 | Secondary text (~8:1) |
| gray | #949494 | Tertiary text (~4.5:1) |
| grayDark | #707070 | Muted/captions (~3:1, large text) |
| teal | #38D9E8 | Racetrace brand accent |

**Embedded assets:** The Tedder Engineering logo (white version, trimmed) and checkered flag icon are base64-encoded directly in the file — no external image dependencies.

**Mobile responsiveness:** All layouts use CSS class-based media queries at the 600px breakpoint:
| Element | Desktop | Mobile (≤600px) |
|---------|---------|-----------------|
| Stats grid | 4 columns | 2 columns |
| Nav cards | 2 columns | 1 column (stacked) |
| On-track summary | 3 columns | 1 column |
| Circuit specs | 2 columns | 1 column |
| Tire strategy | 2 columns | 1 column |
| Countdown numbers | 36px | 28px |
| Header title | 30px | 22px |
| Header logo | 56px | 36px |
| Section padding | 20px | 14px |
| Site header | 14px 24px | 10px 14px |

---

## Production Deployment Notes

### Storage API replacement
The artifact uses `window.storage.get()` and `window.storage.set()` which is a Claude.ai artifact API. For production, replace with one of:
- `localStorage.getItem()` / `localStorage.setItem()` — simplest
- A cookie-based approach
- A backend session store if user accounts exist

Search for `window.storage` in EventsPage.jsx — there are exactly 2 calls to replace.

### Subdomain setup
- `events.tedderengineering.com` needs DNS and hosting configured
- Can be deployed as a static single-page React app (Vercel, Netlify, S3+CloudFront, etc.)
- Or as a route within an existing Next.js / Remix app if tedderengineering.com already uses one

### Adding future events
1. Create a new component function (e.g., `SonomaWeekendSummary`) following the same pattern as `ArlingtonWeekendSummary`
2. Add the event to the `EVENTS` array at the top of EventsPage.jsx
3. Add state logic to switch between event components based on selection or URL routing
4. Move completed events to a `pastEvents` array to enable the "Past Events" button

### Adding the minute-by-minute schedule
When SRO publishes the detailed timetable, update the `ScheduleView` component:
1. Add a `scheduleTab` state variable
2. Create a second data array with the minute-by-minute entries
3. Remove the `cursor: "not-allowed"` and `opacity: 0.5` from the tab
4. Conditionally render the appropriate data based on `scheduleTab`

---

## File Manifest

| File | Size | Purpose |
|------|------|---------|
| `EventsHomepageChip.jsx` | ~7 KB | Homepage embed component |
| `EventsPage.jsx` | ~95 KB | Full events portal (includes ~70 KB of embedded logo/icon base64) |
| `ArlingtonWeekendSummary.jsx` | ~95 KB | Standalone version (same as embedded in EventsPage, but with its own export default) |

All three files are in the project resources.
