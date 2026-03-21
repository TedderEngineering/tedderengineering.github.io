# Tedder Engineering Events — Template & Operations Guide
## Version 2.0 — Updated March 7, 2026

---

## How This System Works

The Tedder Engineering events system is a set of React dashboards deployed as subdirectories of the static GitHub Pages site at tedderengineering.com. Each event gets its own URL, its own build, and its own folder in the repo.

**Architecture:**
```
tedderengineering.com/                         ← Static HTML site (GitHub Pages)
  index.html                                   ← Main site with Events banner in hero
  favicon.ico                                  ← Tedder Engineering checkered flag
  favicon-256.png
  images/
    checkered-icon.png                         ← Banner icon (if used)
  events/
    index.html                                 ← Redirects to current event
    arlington-2026/
      index.html                               ← Arlington dashboard (React/Vite build)
      findinggrip-icon.png                     ← Finding Grip app icon
      favicon.ico
      favicon-256.png
      assets/                                  ← Vite-built JS/CSS
    [next-event-slug]/                         ← Future events follow same pattern
```

**Tech stack:**
- Main site: Static HTML/CSS/JS, no build step, GitHub Pages
- Event dashboards: React + Vite, built locally, output copied into repo
- Repo: TedderEngineering/tedderengineering.github.io on GitHub
- Local build directory: `C:/Users/TE/Documents/2026 Projects/WRL Data/events-build`
- Repo directory: `C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site`

**Color palette (WCAG AA compliant, use for ALL events):**
| Token | Hex | Use |
|-------|-----|-----|
| bg | #2B2B2B | Page background |
| card | #333333 | Card surfaces |
| cardAlt | #3A3A3A | Elevated surfaces |
| border | #4A4A4A | Borders |
| borderLight | #585858 | Emphasized borders |
| accent | #F0A848 | Primary accent (amber) |
| accentLight | #F5C070 | Secondary accent / changed items |
| accentDark | #D89030 | Dark accent |
| white | #F0F0F0 | Primary text (~13:1 contrast) |
| grayLight | #C0C0C0 | Secondary text (~8:1) |
| gray | #949494 | Tertiary text (~4.5:1) |
| grayDark | #707070 | Muted text (~3:1, large text only) |
| teal | #38D9E8 | Racetrace brand |
| green | #6EC86E | Success / session start / green flag |
| red | #E86060 | Error / pre-grid close / urgent countdown |
| blue | #70B0E0 | Technical Regulations accent |
| findingGripOrange | #FF6B00 | Finding Grip brand |

**Font:** Barlow / Barlow Condensed from Google Fonts. Condensed for headings and labels, regular for body text.

---

## Lessons Learned — Claude Code Best Practices

### DO:
- Give Claude Code exact HTML to paste when working on the static site (index.html)
- Use separate image files instead of base64 for icons — base64 gets corrupted during file writes
- Use single-purpose prompts: one task per prompt
- Include the rebuild/deploy commands in every prompt
- Say "Do not modify" when providing exact code
- Break large tasks into steps with verification stops
- Pre-build HTML in a `FIXED_*.html` file and have Claude Code paste it
- Specify "Do not change any existing cards/styles" in every prompt
- Use `font` variable for Barlow Condensed references, `C` object for colors

### DON'T:
- Don't ask Claude Code to "fix" or "improve" existing code — it will rewrite everything
- Don't use sed for multi-line HTML changes — it mangles things
- Don't embed base64 image data in prompts — it gets truncated/corrupted
- Don't combine too many changes in one prompt — things get lost
- Don't let Claude Code use CSS classes when inline styles are the existing pattern
- Don't ask Claude Code to convert JSX to HTML and interpret the design — give it the exact output
- Don't suggest manual editing — Tedder uses one hand, Claude Code handles all file operations

### Rebuild & Deploy Sequence (include in EVERY prompt):
```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\[event-slug]
xcopy /E /I /Y "..\events-build\dist" ".\events\[event-slug]"
git add -A
git commit -m "[commit message]"
git push origin main
```

---

## Dashboard Cards — Full Inventory

Every event dashboard has these 10 cards on the home screen, in this exact order:

| # | ID | Icon | Label | Type | Description |
|---|-----|------|-------|------|-------------|
| 1 | schedule | 📅 | Schedule | Internal view | Full weekend timeline + Minute-by-Minute with live countdowns |
| 2 | ontrack | 🏁 | On-Track | Internal view | Practice, qualifying, race session timetable + track map link |
| 3 | procedures | 📋 | Procedures | Internal view | Qualifying order, grids, flags, Parc Fermé |
| 4 | tires | 🔧 | Tires & Tech | Internal view | Tire allocation, pressures, circuit specs |
| 5 | rules | ⚖️ | Rules Search | Internal view | Searchable Sporting & Technical Regulations |
| 6 | live | 📺 | Live Viewing | Internal view | YouTube links (coming soon → links when published) |
| 7 | racetrace | trace (SVG) | Racetrace | External link | Opens racetrace.tedderengineering.com (teal #38D9E8 accent) |
| 8 | findinggrip | grip (image) | Finding Grip | App store links on card | iPhone + Android buttons directly on card (orange #FF6B00 accent) |
| 9 | predictions | 🔒 | Predictions | Locked/grayed | Lap time analysis — coming soon |

### Special Card Designs:

**Racetrace** — Teal (#38D9E8) branded card with dark navy gradient background, SVG position trace icon (red/blue crossing lines + orange steady line), "OPEN APP ↗" badge, link to racetrace.tedderengineering.com

**Finding Grip** — Orange (#FF6B00) branded card with dark orange gradient background, actual Finding Grip app icon (findinggrip-icon.png), two app store buttons (iPhone/Android) directly on the card — no navigation to a separate page. Apple and Google Play SVG icons.

**Predictions** — Grayed out at 50% opacity, lock icon, not clickable, gray left border.

---

## Schedule System

The Schedule view has **two tabs**:

### Tab 1: Full Weekend Schedule
- Shows the full off-track timeline (load-in through load-out)
- Grouped by day (TUE 3/10, WED 3/11, etc.)
- New/updated items highlighted with ⚡ lightning bolt and amber (accentLight) color
- Past days auto-fade to 45% opacity with strikethrough
- Registration location card at bottom

### Tab 2: Minute by Minute
- Shows every GR Cup session broken into individual timed steps
- Data comes from the MxM PDF published by SRO
- Each line has a live countdown (updates every second): `6d 11h 23m 45s`
- Countdown colors: gray (>1hr), amber (<1hr), red (<10min)
- "⚡ Cars to Pre-Grid" lines injected automatically:
  - Practice/Qualifying: 10 minutes before Transit to Pit Lane
  - Races: 10 minutes before Pre-Grid Close
- Prominent countdown banner at top for next "Cars to Pre-Grid" moment
  - Shows DAYS, HRS, MIN, SEC in large format
  - Turns red and pulses when under 10 minutes
- Past sessions fade with strikethrough, marked "— completed"
- Style matches Full Weekend Schedule exactly (same day headers, row layout, fonts, spacing)

---

## On-Track View Features

- Track map link at top (large amber banner linking to official track map image)
- Quick summary cards (FRI/SAT/SUN with GR Cup sessions)
- Full timetable for all series, GR Cup sessions highlighted
- Session rows show: Start, End, Session name, Series badge, Duration

---

## Rules Search

- Text search across both Sporting and Technical Regulations
- Regulation text extracted via OCR from the PDFs (one-time process per season)
- Results grouped: Sporting (amber accent) vs Technical (blue accent)
- Each result shows: section badge (§15.3), chapter title, full section text
- Matched terms highlighted with amber background
- Summary at bottom counting matches and listing section numbers
- Quick links to download full regulation PDFs from SRO

---

## Browser History

The dashboard uses `window.history.pushState` so the browser back button navigates within the app (dashboard → section → dashboard) instead of leaving the site entirely.

---

## Event Data Template

Copy and fill in for each new event.

### 1. Event Constants
```jsx
const EVENT_START = new Date("[YYYY]-[MM]-[DD]T[HH:MM]:00-[UTC_OFFSET]"); // P1 start
const RACE1_START = new Date("[YYYY]-[MM]-[DD]T[HH:MM]:00-[UTC_OFFSET]");
const RACE2_START = new Date("[YYYY]-[MM]-[DD]T[HH:MM]:00-[UTC_OFFSET]");
```

### 2. Sections Array
```jsx
const sections = [
  { id: "schedule", icon: "📅", label: "Schedule", desc: "Full weekend timeline, registration, load-in, track walk" },
  { id: "ontrack", icon: "🏁", label: "On-Track", desc: "Practice, qualifying, and race session times" },
  { id: "procedures", icon: "📋", label: "Procedures", desc: "Qualifying order, grids, flags, Parc Fermé" },
  { id: "tires", icon: "🔧", label: "Tires & Tech", desc: "Tire allocation, pressures, circuit specs" },
  { id: "rules", icon: "⚖️", label: "Rules Search", desc: "Search the Sporting and Technical Regulations" },
  { id: "live", icon: "📺", label: "Live Viewing", desc: "Watch sessions live — links coming soon" },
  { id: "racetrace", icon: "trace", label: "Racetrace", desc: "Every position. Every lap. Analyzed.", link: "https://racetrace.tedderengineering.com" },
  { id: "findinggrip", icon: "grip", label: "Finding Grip", desc: "Tire pressures & damper tuning" },
  { id: "predictions", icon: "🔒", label: "Predictions", desc: "Lap time analysis — coming soon", locked: true },
];
```

### 3. Off-Track Schedule
```jsx
const offTrackData = [
  { day: "[DAY] [M/D]", items: [
    { time: "[H:MM AM]", event: "[Description]" },
    { time: "[H:MM AM]", event: "⚡ [New/updated item]", changed: true },
  ]},
];
```

### 4. On-Track Timetable
```jsx
const mk = (time, end, session, series, dur) => {
  const isGR = series === "GR Cup";
  const isQ = session.includes("Qualifying") || session.includes("Qualify");
  return { time, end, session, series, dur, isGR, isQ };
};

const onTrackFri = [
  mk("[start]", "[end]", "[Session]", "GR Cup", [dur]),  // GR Cup highlighted
  mk("[start]", "[end]", "[Session]", "IndyCar", [dur]),  // Other series not highlighted
  // ★ suffix on session that sets qualifying order
];
```

### 5. Minute-by-Minute Data
```jsx
const mxmData = [
  {
    day: "[DAY] [M/D]",
    dayDate: "[MM-DD]",
    sections: [
      {
        header: "[Session Name] ([duration] min)",
        items: [
          { time: t("[MM-DD]","[HH:MM]"), label: "Pre-Grid Open" },
          { time: minus(t("[MM-DD]","[HH:MM]"), 10), label: "⚡ Cars to Pre-Grid", alert: true },
          { time: t("[MM-DD]","[HH:MM]"), label: "Transit to Pit Lane" },
          { time: t("[MM-DD]","[HH:MM]"), label: "Start of Session", bold: true, green: true },
          { time: t("[MM-DD]","[HH:MM]"), label: "End of Session", bold: true },
        ],
      },
    ],
  },
];
```

For races, include additional items:
```jsx
{ time: t("[MM-DD]","[HH:MM]"), label: "Pre-Grid Close", bold: true, red: true },
{ time: t("[MM-DD]","[HH:MM]"), label: "Pit Equipment Transit to Pit Lane" },
{ time: t("[MM-DD]","[HH:MM]"), label: "Release Cars to Grid (Pit Lane)" },
{ time: t("[MM-DD]","[HH:MM:SS]"), label: "FIVE MINUTE WARNING", bold: true },
{ time: t("[MM-DD]","[HH:MM:SS]"), label: "3 Minute Warning" },
{ time: t("[MM-DD]","[HH:MM:SS]"), label: "1 Minute Warning", bold: true },
{ time: t("[MM-DD]","[HH:MM:SS]"), label: "DSYE COMMAND", bold: true },
{ time: t("[MM-DD]","[HH:MM]"), label: "Start of Formation Lap" },
{ time: t("[MM-DD]","[HH:MM]"), label: "GREEN FLAG", bold: true, green: true },
{ time: t("[MM-DD]","[HH:MM]"), label: "CHECKERED FLAG (Approx)", bold: true },
```

### 6. Circuit Data
```jsx
const circuitData = [
  ["Length", "[X.XX] mi / [X.XX] km"],
  ["Turns", "[N]"],
  ["Longest Straight", "[X.X] miles"],
  ["Type", "[Permanent / Temporary Street Circuit]"],
  ["Surface", "[description]"],
  ["Direction", "[Clockwise / Counter-clockwise]"],
  ["Pole Position", "Drivers [RIGHT/LEFT]"],
  ["Pit Lane", "[description]"],
  ["Pit Exit", "[relative to S/F]"],
  ["FIA Grade", "[N]"],
  ["Formation Laps", "[N]"],
];
```

### 7. Tire Rules (usually same across events)
```jsx
const tireRules = [
  ["New dry sets per event", "2 sets (8 tires)"],
  ["Qualifying & Race tires", "Only registered sets or wets"],
  ["Practice tires", "Unmonitored — new or used carryovers"],
  ["Joker tire", "1 per event (use it or lose it)"],
  ["Wet tires", "Unlimited quantity"],
  ["Tire warmers", "Prohibited"],
  ["TPMS", "Prohibited"],
  ["Min pressure (dry)", "20 psi / 1.38 bar"],
  ["Min pressure (wet)", "22 psi / 1.51 bar"],
];
```

### 8. Day End Dates (for auto-strikethrough)
```jsx
const dayEndDates = {
  "[DAY] [M/D]": new Date("[YYYY]-[MM]-[DD]T23:59:00-[OFFSET]"),
};
```

### 9. Track Map Link
```jsx
// URL to official track map image (IndyCar, circuit website, etc.)
const trackMapUrl = "[URL]";
```

### 10. Event-Specific Procedures
Document per-event rules in the Procedures view:
- Section reference (e.g., "Sporting Regulations §28.18")
- Full regulation text
- Plain-language summary
- Warnings or critical notes

---

## Document Sources per Event

| Document | Feeds | Where to get |
|----------|-------|--------------|
| Event Schedule (PDF) | Schedule tab, On-Track tab | SRO / grcupportal.com |
| Minute-by-Minute Schedule (PDF) | MxM tab with live countdowns | SRO |
| Logistics Briefing (PDF) | Schedule (load-in, registration), Procedures | SRO / Teams call |
| Supplemental Regulations (PDF) | Procedures, circuit specs, officials | SRO / grcupportal.com |
| Scrutineering Timetable (PDF) | Schedule (Thursday) | SRO |
| Track Pack / Team Info Packet (PDF) | Circuit specs, registration, track map | SRO |
| Sporting Regulations (PDF) | Rules Search, Procedures | grcupportal.com (same all season) |
| Technical Regulations (PDF) | Rules Search, Tires & Tech | grcupportal.com (same all season) |
| Continental Tire Technical Data (PDF) | Tires & Tech | grcupportal.com (same all season) |
| Car Manual (PDF) | Reference only | grcupportal.com (same all season) |
| Track Map Image (URL) | On-Track tab link | IndyCar / circuit website |

---

## Claude Code Prompts

### PROMPT: Create a New Event

```
I need to create a new event dashboard for the Toyota GR Cup at [TRACK NAME].

Event details:
- Event name: [e.g., "Grand Prix of Sonoma"]
- Dates: [e.g., "March 27-29, 2026"]
- Location: [City, State]
- Rounds: [e.g., "Rounds 3 & 4"]
- Timezone: [e.g., "America/Los_Angeles" for PDT, offset "-07:00"]
- Track length: [e.g., "2.52 miles"]
- Turns: [N]
- Direction: [Clockwise/Counter-clockwise]
- URL slug: [e.g., "sonoma-2026"]
- Track map URL: [URL to official track map image]

The event documents are in the project resources: [list the PDFs]

Using the Arlington event as a template:

1. In events-build/src/EventsPage.jsx, create a new component function called [Event]WeekendSummary
2. Copy ArlingtonWeekendSummary structure exactly — same sections array, same card layout, same responsive classes, same Racetrace/Finding Grip/Predictions card designs
3. Replace ALL event-specific data (dates, times, schedule, circuit specs, procedures)
4. Keep the same: tire rules, Rules Search, Racetrace card, Finding Grip card, Predictions card
5. Update the Vite base path in vite.config.js to /events/[slug]/
6. Copy findinggrip-icon.png into public/ if not already there
7. Build and deploy to events/[slug]/

Do not change the Arlington event files.

Deploy:
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
mkdir events\[slug]
xcopy /E /I /Y "..\events-build\dist" ".\events\[slug]"
git add -A
git commit -m "Add [event name] dashboard"
git push origin main
```

---

### PROMPT: Promote an Event on the Homepage

```
Update the events banner on tedderengineering.com to promote [EVENT NAME].

In tedderengineering-site/index.html, find the events banner (search for "Events Banner" or "events-banner"). Change ONLY these values:

1. href: change to "/events/[new-slug]/"
2. Event name text: change to "[New Event Name]"
3. Date text: change to "[New dates] · [City, State]"

Do not change the card layout, font sizes, or styling. Only change text and the link.

git add index.html
git commit -m "Update homepage banner for [event name]"
git push origin main
```

---

### PROMPT: Update the /events/ Redirect

```
Update events/index.html to redirect to the current event.

In tedderengineering-site/events/index.html, change the redirect URL from /events/[old-slug]/ to /events/[new-slug]/. Also update the link text.

git add events/index.html
git commit -m "Update events redirect to [event name]"
git push origin main
```

---

### PROMPT: Retire/Archive a Completed Event

```
The [EVENT NAME] event is complete.

Step 1: Keep the old event dashboard at /events/[old-slug]/ — do not delete it. The countdown will have passed and past dates will show strikethrough automatically.

Step 2: If there is a next event ready:
- Update the homepage banner href, event name, and dates
- Update events/index.html redirect to the next event

Step 3: If there is NO next event ready:
- Change the homepage banner "Upcoming" label to "Recent"
- Keep linking to the completed event

git add -A
git commit -m "Archive [old event], promote [new event]"
git push origin main
```

---

### PROMPT: Add Live Viewing Links

```
Live streaming links for [EVENT NAME] have been published.

In events-build/src/EventsPage.jsx, find the Live Viewing view (search for view === "live").

Replace the "Coming Soon" content with clickable YouTube links:
- Race 1: [YouTube URL] — [Date] at [Time] CT
- Race 2: [YouTube URL] — [Date] at [Time] CT
- [Add any other sessions with links]

Each link should be a large card with session name, date/time, and the YouTube URL.

Update the sections array live entry description from "links coming soon" to "Watch sessions live on YouTube".

Do not change anything else. Rebuild and deploy.
```

---

### PROMPT: Update Event Schedule

```
Updated schedule information for [EVENT NAME]. Updated documents are in the project resources.

In events-build/src/EventsPage.jsx, update these specific items WITHOUT changing any styles or layout:

[List specific changes, e.g.:]
- Thursday registration now opens at 8:00 AM instead of 7:00 AM
- New mandatory briefing: Friday 6:00 PM at [location]
- Race 2 moved from 8:00 AM to 9:00 AM

For new or changed items, add `changed: true` so they highlight with ⚡ in amber.

If the MxM schedule changed, update the mxmData array times as well.

Do not change anything else. Rebuild and deploy.
```

---

### PROMPT: Add Minute-by-Minute Data (when MxM PDF is released)

```
The minute-by-minute schedule for [EVENT NAME] has been released. The PDF is in the project resources.

Read the MxM PDF and populate the mxmData array in EventsPage.jsx with the timed steps for each GR Cup session.

For each session, include all timed items from the PDF. Add "⚡ Cars to Pre-Grid" alert items:
- Practice/Qualifying: 10 min before Transit to Pit Lane
- Races: 10 min before Pre-Grid Close

Make sure the Minute by Minute tab is enabled (not grayed out).

Do not change anything else. Rebuild and deploy.
```

---

## New Event Checklist

- [ ] Gather all event documents (schedule, logistics, supplemental regs, track pack, scrutineering timetable)
- [ ] Upload documents to Claude.ai project resources
- [ ] Use "Create a New Event" prompt
- [ ] Verify locally (npm run dev)
- [ ] Build and deploy to /events/[slug]/
- [ ] Use "Promote an Event" prompt to update homepage banner
- [ ] Use "Update the /events/ Redirect" prompt
- [ ] If previous event is done, use "Retire/Archive" prompt
- [ ] When MxM PDF arrives, use "Add Minute-by-Minute Data" prompt
- [ ] When live streaming links are published, use "Add Live Viewing Links" prompt
- [ ] When schedule updates arrive, use "Update Event Schedule" prompt

---

## File Inventory — Project Resources

### Always keep (reusable across events):
- `EVENTS_TEMPLATE_AND_OPS.md` (this file)
- `RulesSearchDemo.jsx` (design spec for Rules Search)
- `MinuteByMinuteDemo.jsx` (design spec for MxM schedule)
- `findinggrip-icon.png` (Finding Grip app icon)
- `favicon.ico` and `favicon-256.png` (Tedder Engineering checkered flag)
- `checkered-icon.png` (for homepage banner, if used)
- Sporting Regulations PDF (same all season)
- Technical Regulations PDF (same all season)
- Continental Tire Technical Data PDF (same all season)
- Car Manual PDF (same all season)

### Replace per event:
- Event Schedule PDF
- Minute-by-Minute Schedule PDF
- Logistics Briefing PDF
- Supplemental Regulations PDF
- Scrutineering Timetable PDF
- Track Pack / Team Info Packet PDF

### Homepage (static HTML in main repo):
- `FIXED_BANNER.html` (pre-built banner HTML for the homepage)
