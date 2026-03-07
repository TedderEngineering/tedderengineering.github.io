# Claude Code Kickoff Prompts — Tedder Engineering Events

These prompts are designed to be pasted into Claude Code sequentially. Each prompt is self-contained and references the resource files in this project.

---

## Prompt 1: Reconnaissance — Understand the existing site

```
Examine the tedderengineering.com codebase. I need you to understand:

1. What framework is this built with? (Next.js, React, plain HTML, etc.)
2. What's the file/folder structure?
3. Where does the homepage content live?
4. How are components organized?
5. How is the site deployed? (Check for vercel.json, netlify.toml, package.json scripts, etc.)
6. Is there an existing routing setup?

Don't make any changes yet. Just report back what you find so we can plan the integration.
```

---

## Prompt 2: Integrate the Events Banner into the Hero

```
I need to add an Events banner to the tedderengineering.com homepage hero section. The component is in the project resources as `EventsHomepageChip.jsx` (exported as `EventsBanner`).

Here's what to do:

1. Copy EventsHomepageChip.jsx into the appropriate components directory for this project
2. Adapt it to match the project's conventions:
   - If this is a Next.js project, make sure imports and component patterns match
   - If there's a global font setup, remove the inline Google Fonts <link> tag and use the existing font system
   - If there's a CSS module or Tailwind setup, the inline styles can stay as-is (they're self-contained)
3. Import and place the EventsBanner component INSIDE the hero section on the homepage
   - It should go below the tagline "Precision Engineering. Race-Proven Performance." and the orange accent bar
   - It must be visible on first load without scrolling — this is above-the-fold content
   - The banner uses semi-transparent backgrounds with backdrop-blur so the site's checkered texture shows through — make sure it's positioned within the hero container, not outside it
4. It links to events.tedderengineering.com (external link, new tab)
5. Mobile responsiveness is built in — the component has its own CSS media queries at 480px

The component is self-contained with all styles inline. The checkered flag icon is base64-encoded inside the file. No external dependencies beyond React.

Reference the EVENTS_ARCHITECTURE.md file in the project resources for the full spec.
```

---

## Prompt 3: Set up the events subdomain project

```
I need to set up events.tedderengineering.com as a new deployment. The full app is in the project resources as `EventsPage.jsx`.

Here's the plan:

1. Create a new project directory for the events subdomain
2. Set it up as a minimal React app (Vite or Next.js, whichever matches the main tedderengineering.com site for consistency)
3. Install dependencies: just React and ReactDOM
4. Copy EventsPage.jsx as the main/index page component
5. There is one production adaptation needed: the component uses `window.storage.get()` and `window.storage.set()` for persisting the user's last-visited section. Replace these with `localStorage`:
   - `window.storage.get("arlington_last_section")` → `localStorage.getItem("arlington_last_section")`  
   - `window.storage.set("arlington_last_section", id)` → `localStorage.setItem("arlington_last_section", id)`
   - Keep the try/catch wrappers around both calls
   - The return format changes: localStorage.getItem returns the string directly (or null), not `{value: string}`
6. Set up the build/deploy config:
   - If using Vercel: create vercel.json with the events subdomain config
   - If using Netlify: create netlify.toml
   - If using the same hosting as the main site: set up as a route or subdomain
7. Add a proper <head> with:
   - Title: "Events | Tedder Engineering"
   - Meta description: "Race weekend dashboards, schedules, and technical info for Tedder Engineering events"
   - Favicon (use the checkered flag or Tedder Engineering favicon)
   - Open Graph tags for social sharing

The component is entirely self-contained — no external API calls, no database, no auth. It's a static React app with all data hardcoded.

Reference the EVENTS_ARCHITECTURE.md file in the project resources for the full architecture spec including color palette, component hierarchy, and future expansion notes.
```

---

## Prompt 4: DNS and deployment verification

```
I've deployed the events site. Help me verify everything is working:

1. Check that events.tedderengineering.com resolves correctly
2. Verify the EventsBanner on tedderengineering.com is visible in the hero section without scrolling
3. Verify the banner links to events.tedderengineering.com correctly
4. Test that the localStorage persistence works (navigate to a section, refresh, check for the "pick up where you left off" banner)
5. Verify the countdown timer is showing correct time relative to March 13, 2026 9:05 AM Central Time
6. Check that the Racetrace card links to racetrace.tedderengineering.com correctly
7. Mobile responsiveness — verify at 375px width (iPhone) and 390px width (iPhone Pro):
   - Hero banner should be full-width and readable
   - Dashboard stat grid should be 2 columns
   - Navigation cards should stack to single column
   - Countdown numbers should scale down
   - Header logo should shrink appropriately
   - All tables should scroll horizontally without breaking layout
   - Section padding should be tighter (14px)
8. Test on a real phone if possible — the events dashboard is the primary mobile use case

If any of these fail, fix them.
```

---

## Prompt 5: Future — Adding a new event

```
I need to add [EVENT NAME] to the events portal. Here's the info:

- Event: [name]
- Dates: [dates]  
- Location: [city, state]
- Rounds: [round numbers]

Using ArlingtonWeekendSummary as the template:

1. Create a new component function called [Event]WeekendSummary following the same pattern
2. Add the event to the EVENTS array in EventsPage.jsx
3. Add routing/selection logic so users can switch between events
4. If the Arlington event is now complete, move it to the pastEvents array and enable the "Past Events" button
5. Update the EventsHomepageChip on tedderengineering.com to show the new event as "Next Event"

I'll provide the schedule, procedures, and technical data for the new event separately.
```

---

## Notes

- **Prompt 1** must be run first — the answers determine how Prompts 2 and 3 are executed
- **Prompt 2** (homepage chip) and **Prompt 3** (events subdomain) can be done in parallel or in either order
- **Prompt 4** is post-deployment verification
- **Prompt 5** is a reusable template for future events — save it but don't run it now

All three resource files (`EventsHomepageChip.jsx`, `EventsPage.jsx`, `EVENTS_ARCHITECTURE.md`) should be in the project resources before running any prompts.
