# Tedder Engineering Events — Template & Operations Guide

## How This System Works

The Tedder Engineering events system is a set of React dashboards deployed as subdirectories of the static GitHub Pages site at tedderengineering.com. Each event gets its own URL, its own build, and its own folder in the repo.

**Architecture:**
```
tedderengineering.com/                    ← Static HTML site (GitHub Pages)
  index.html                              ← Main site with Events banner in hero
  events/
    index.html                            ← Redirects to current event
    arlington-2026/index.html             ← Arlington dashboard (React/Vite build)
    sonoma-2026/index.html                ← Next event (future)
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
| border | #4A4A4A | Borders |
| accent | #F0A848 | Primary accent (amber) |
| accentLight | #F5C070 | Secondary accent |
| white | #F0F0F0 | Primary text |
| grayLight | #C0C0C0 | Secondary text |
| gray | #949494 | Tertiary text |
| grayDark | #707070 | Muted text |
| teal | #38D9E8 | Racetrace brand |
| green | #6EC86E | Success/positive |
| red | #E86060 | Error/warning |
| blue | #70B0E0 | Technical Regulations accent |

**Font:** Barlow / Barlow Condensed from Google Fonts. Condensed for headings, regular for body.

---

## Lessons Learned (Critical for Claude Code)

### DO:
- Give Claude Code exact HTML to paste when working on the static site (index.html)
- Use separate image files instead of base64 for icons — base64 gets corrupted during file writes
- Use single-purpose prompts: one task per prompt
- Include the rebuild/deploy commands in every prompt
- Say "Do not modify" when providing exact HTML or code
- Break large tasks into steps with verification stops
- Use `FIXED_BANNER.html`-style approach: pre-build the HTML, have Claude Code paste it

### DON'T:
- Don't ask Claude Code to "fix" or "improve" existing code — it will rewrite everything
- Don't use sed for multi-line HTML changes — it mangles things
- Don't embed base64 image data in prompts — it gets truncated
- Don't combine too many changes in one prompt — things get lost
- Don't let Claude Code use CSS classes when inline styles are the pattern
- Don't ask Claude Code to convert JSX to HTML and interpret the design — give it the exact output

### Rebuild & Deploy Sequence (use every time):
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

## Event Data Template

Every event dashboard needs these data structures. Copy and fill in for a new event.

### 1. Event Constants
```jsx
// [TRACK LOCATION] is [TIMEZONE] (e.g., America/Chicago for CDT)
const EVENT_START = new Date("[YYYY]-[MM]-[DD]T[HH:MM]:00-[OFFSET]"); // P1 start
const RACE1_START = new Date("[YYYY]-[MM]-[DD]T[HH:MM]:00-[OFFSET]");
const RACE2_START = new Date("[YYYY]-[MM]-[DD]T[HH:MM]:00-[OFFSET]");
```

### 2. Dashboard Cards (sections array)
```jsx
const sections = [
  { id: "schedule", icon: "📅", label: "Schedule", desc: "Full weekend timeline, registration, load-in, track walk" },
  { id: "ontrack", icon: "🏁", label: "On-Track", desc: "Practice, qualifying, and race session times" },
  { id: "procedures", icon: "📋", label: "Procedures", desc: "Qualifying order, grids, flags, Parc Fermé" },
  { id: "tires", icon: "🔧", label: "Tires & Tech", desc: "Tire allocation, pressures, circuit specs" },
  { id: "rules", icon: "⚖️", label: "Rules Search", desc: "Search the Sporting and Technical Regulations" },
  { id: "live", icon: "📺", label: "Live Viewing", desc: "Watch sessions live — links coming soon" },
  { id: "racetrace", icon: "trace", label: "Racetrace", desc: "Every position. Every lap. Analyzed.", link: "https://racetrace.tedderengineering.com" },
  { id: "predictions", icon: "🔒", label: "Predictions", desc: "Lap time analysis — coming soon", locked: true },
];
```

### 3. Off-Track Schedule
```jsx
const offTrackData = [
  { day: "[Day] [M/D]", items: [
    { time: "[H:MM AM]", event: "[Event description]" },
    { time: "[H:MM AM]", event: "⚡ [New/updated item]", changed: true },
  ]},
  // Repeat for each day (load-in through load-out)
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
  mk("[start]", "[end]", "[Session Name]", "[Series]", [duration_min]),
  mk("9:05 AM", "9:35 AM", "Practice 1", "GR Cup", 30),  // GR Cup sessions get highlighted
  // ★ suffix on the session that sets qualifying order
];
// Repeat for Sat, Sun
```

### 5. Circuit Data
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

### 6. Tire Rules (usually same across events)
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

### 7. Day End Dates (for auto-strikethrough of past events)
```jsx
const dayEndDates = {
  "[Day] [M/D]": new Date("[YYYY]-[MM]-[DD]T23:59:00-[OFFSET]"),
  // One entry per day of the event week
};
```

### 8. Event-Specific Procedures
Each event may have unique procedures (like Arlington's P2-based qualifying order). Document these in the Procedures view with:
- Section reference (e.g., "Sporting Regulations §28.18")
- Full regulation text
- Plain-language summary
- Any warnings or critical notes

---

## Document Sources per Event

Gather these documents for each event. They feed the dashboard content:

| Document | Feeds | Where to get |
|----------|-------|--------------|
| Event Schedule (PDF) | Schedule tab, On-Track tab | SRO / grcupportal.com |
| Logistics Briefing (PDF) | Schedule tab (load-in, registration), Procedures | SRO / Teams call |
| Supplemental Regulations (PDF) | Procedures, circuit specs, officials | SRO / grcupportal.com |
| Scrutineering Timetable (PDF) | Schedule tab (Thursday) | SRO |
| Track Pack / Team Info Packet (PDF) | Circuit specs, registration, track map | SRO |
| Sporting Regulations (PDF) | Rules Search, Procedures | grcupportal.com (same all season) |
| Technical Regulations (PDF) | Rules Search, Tires & Tech | grcupportal.com (same all season) |
| Continental Tire Technical Data (PDF) | Tires & Tech | grcupportal.com (same all season) |
| Car Manual (PDF) | Reference only | grcupportal.com (same all season) |
| Track Map Image (URL or file) | On-Track tab link | IndyCar / circuit website |

---

## Claude Code Prompts

### PROMPT: Create a New Event

```
I need to create a new event dashboard for the Toyota GR Cup at [TRACK NAME].

Event details:
- Event name: [Full event name, e.g., "Grand Prix of Sonoma"]
- Dates: [e.g., "March 27-29, 2026"]
- Location: [City, State]
- Rounds: [e.g., "Rounds 3 & 4"]
- Timezone: [e.g., "America/Los_Angeles" for PDT]
- Track length: [e.g., "2.52 miles"]
- Turns: [N]
- Direction: [Clockwise/Counter-clockwise]
- URL slug: [e.g., "sonoma-2026"]

The event documents are in the project resources: [list the PDFs you've uploaded]

Using the Arlington event (events-build/src/EventsPage.jsx) as a template:

1. Create a new component function called [Event]WeekendSummary (e.g., SonomaWeekendSummary)
2. Copy the ArlingtonWeekendSummary structure exactly — same sections array, same card layout, same responsive classes
3. Replace ALL Arlington-specific data:
   - Event constants (dates, times, timezone)
   - offTrackData (from the event schedule and logistics briefing)
   - onTrackFri/Sat/Sun (from the event schedule)
   - circuitData (from the supplemental regulations and track pack)
   - dayEndDates (for auto-strikethrough)
   - Procedures section (event-specific procedures from supplemental regulations)
   - Track map link (find the official track map URL)
4. Keep the same tire rules (they don't change between events unless noted)
5. Keep the same Rules Search (regulations are the same all season)
6. Keep the Racetrace and Predictions cards unchanged

Update EventsPage.jsx to render the new component. Update vite.config.js base path to `/events/[slug]/`.

Build and deploy:
```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
mkdir events\[slug]
xcopy /E /I /Y "..\events-build\dist" ".\events\[slug]"
git add -A
git commit -m "Add [event name] event dashboard"
git push origin main
```

Do not change the Arlington event files.
```

---

### PROMPT: Promote an Event on the Homepage

```
Update the events banner on the tedderengineering.com homepage to promote the [EVENT NAME] event.

In index.html, find the events banner (search for "Events Banner" or "events-banner"). Change these values:

1. The href: change to "/events/[new-slug]/"
2. The "Upcoming" label: keep as "Upcoming" (or change to "This Weekend" if the event is within 7 days)
3. The event name: change "Grand Prix of Arlington" to "[New Event Name]"
4. The date text: change "Mar 13–15 · Arlington, TX" to "[New dates] · [New city, state]"

Do not change the card layout, font sizes, or styling. Only change the text content and link.

Commit and push:
```
git add index.html
git commit -m "Update homepage banner for [event name]"
git push origin main
```
```

---

### PROMPT: Update the /events/ Redirect

```
Update the events landing page redirect to point to the current event.

In tedderengineering-site/events/index.html, change the redirect URL:

From: /events/[old-slug]/
To: /events/[new-slug]/

Also update the link text to match the new event name.

Commit and push:
```
git add events/index.html
git commit -m "Update events redirect to [event name]"
git push origin main
```
```

---

### PROMPT: Retire/Archive a Completed Event

```
The [EVENT NAME] event is complete. Archive it and promote the next event.

Step 1: The completed event dashboard at /events/[old-slug]/ should remain accessible (don't delete it) but it should no longer be the featured event.

Step 2: If there is a next event ready:
- Update the homepage banner to promote the next event (change href, event name, dates, location)
- Update events/index.html redirect to point to the next event
- The countdown timer on the old event will naturally show "EVENT IN PROGRESS" or the countdown will have passed — this is fine, leave it

Step 3: If there is NO next event ready yet:
- Change the homepage banner text from "Upcoming" to "Recent"
- Keep it linking to the completed event
- Update events/index.html to still point to the completed event
- The dashboard will show past dates struck through — this is the intended behavior

Commit and push:
```
git add -A
git commit -m "Archive [old event], promote [new event / mark as recent]"
git push origin main
```
```

---

### PROMPT: Add Live Viewing Links (When Published)

```
The live streaming links for [EVENT NAME] have been published. Update the Live Viewing page.

In events-build/src/EventsPage.jsx, find the Live Viewing view section (search for `view === "live"`).

Replace the "Coming Soon" placeholder content with:

1. Keep the heading "Live Viewing"
2. Add a YouTube embed or link for each session:
   - Race 1: [YouTube URL]
   - Race 2: [YouTube URL]
   - (Add qualifying/practice links if available)
3. Each link should be a large, clickable card with the session name, date/time, and a "Watch Live" or "Watch Now" button
4. If the session hasn't started yet, show the scheduled time. If it's live, show a red "LIVE" badge.

Also in the sections array, update the live entry description:
From: "Watch sessions live — links coming soon"
To: "Watch sessions live on YouTube"

Rebuild and deploy.
```

---

### PROMPT: Update Event Schedule (When New Info Arrives)

```
Updated schedule information has been released for [EVENT NAME]. The updated documents are in the project resources.

In events-build/src/EventsPage.jsx, update the following data WITHOUT changing any card styles, layout, or existing functionality:

[List specific changes, e.g.:]
- Thursday registration now opens at 8:00 AM instead of 7:00 AM
- New mandatory briefing added: Friday 6:00 PM at [location]
- Race 2 moved from 8:00 AM to 9:00 AM

For any new or changed items, add `changed: true` to the item object so it highlights in amber.

Update the footer date reference to reflect the new document date.

Rebuild and deploy.
```

---

## New Event Checklist

When a new event approaches:

- [ ] Gather all event documents (schedule, logistics briefing, supplemental regulations, track pack, scrutineering timetable)
- [ ] Upload documents to Claude.ai project resources
- [ ] Use "Create a New Event" prompt with Claude Code
- [ ] Verify the dashboard locally (npm run dev)
- [ ] Build and deploy to /events/[slug]/
- [ ] Use "Promote an Event" prompt to update homepage banner
- [ ] Use "Update the /events/ Redirect" prompt
- [ ] If previous event is done, use "Retire/Archive" prompt
- [ ] When live streaming links are published, use "Add Live Viewing Links" prompt
- [ ] If schedule updates arrive, use "Update Event Schedule" prompt

---

## File Inventory

Files that should be kept in the Claude.ai project resources at all times:

**Templates & Docs:**
- `EVENTS_TEMPLATE_AND_OPS.md` (this file)
- `EVENTS_ARCHITECTURE.md`
- `RulesSearchDemo.jsx` (design spec for Rules Search)

**Season-long documents (same for all events):**
- Sporting Regulations PDF
- Technical Regulations PDF
- Continental Tire Technical Data PDF
- Car Manual PDF

**Per-event documents (replace for each event):**
- Event Schedule PDF
- Logistics Briefing PDF
- Supplemental Regulations PDF
- Scrutineering Timetable PDF
- Track Pack PDF

**Assets:**
- `favicon.ico`
- `favicon-256.png`
- `checkered-icon.png`
- Tedder Engineering logos (transparentimage.png, transparentimageblack.png)
