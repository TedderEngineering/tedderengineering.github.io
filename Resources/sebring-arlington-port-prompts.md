# Sebring ← Arlington Improvement Port
## Sequential Claude Code Prompts — Run in Order

**Do not run Prompt 6 until Prompts 1–5 complete without errors.**
**Items 7 and 8 from the diff (tire picker, live viewing cards) are intentionally skipped — Sebring's versions are already more advanced.**

---

## Prompt 1 — Smart Countdown + Quick Links

```
Read: C:/Users/TE/Documents/2026 Projects/WRL Data/events-build/src/EventsPage.jsx

Find the Arlington component. Locate the grCupSessions array and the countdown logic
that iterates it to find the next upcoming session by name. Copy that entire pattern.

Find the Sebring component. Replace its single fixed countdown target with the same
session-aware countdown pattern, using Sebring's actual session list from its
onTrackData. The countdown label should display the next upcoming session name.

Also in the Sebring countdown card: add the same 3 quick-link buttons that Arlington
has embedded there — Live Viewing, Live Timing, and MxM. Use the same styling.
Live Timing button should link to imsaresults.com. The other two should trigger the
same card-open behavior Arlington uses.

Do NOT change anything outside the Sebring countdown section.
Do NOT rebuild or deploy yet.
Print "Prompt 1 done" when complete.
```

---

## Prompt 2 — Remove Predictions Card

```
Read: C:/Users/TE/Documents/2026 Projects/WRL Data/events-build/src/EventsPage.jsx

Find the Sebring component's card grid. Locate the locked Predictions card (9th card,
lock icon, gray border, "coming soon" description). Delete it entirely.

Verify the remaining card count is 8. The order must be:
Schedule, On-Track, Procedures, Tires & Tech, Rules Search, Live Viewing,
Racetrace, Finding Grip.

Do NOT change any other card. Do NOT rebuild or deploy yet.
Print "Prompt 2 done" when complete.
```

---

## Prompt 3 — MxM System

```
Read: C:/Users/TE/Documents/2026 Projects/WRL Data/events-build/src/EventsPage.jsx

Find the Arlington component. Copy exactly:
- The mxmData structure and all associated state/hooks
- The NextSessionBanner component or equivalent
- The per-item countdown logic
- The pulse animation on the active step
- The logic that moves completed steps to the bottom with strikethrough/dimming

Apply all of it to the Sebring component. Sebring's mxmData is already [] — leave
it as []. The system should work correctly when data is added later. The MxM tab
should show the "not yet published" placeholder when mxmData is empty, exactly as
Arlington does when its array is empty.

Add the window.__sebringMxmDefault deep-link support (equivalent to Arlington's
window.__arlingtonMxmDefault) so the MxM tab can be targeted from the countdown
quick links.

Do NOT rebuild or deploy yet.
Print "Prompt 3 done" when complete.
```

---

## Prompt 4 — Schedule Day Sorting + ScheduleView Refactor

```
Read: C:/Users/TE/Documents/2026 Projects/WRL Data/events-build/src/EventsPage.jsx

Find the Arlington component's ScheduleView — it is extracted as a named function
component, not an IIFE. It splits days into upcoming and past with a "Completed"
divider and applies strikethrough styling to past days.

In the Sebring component:
1. Extract the inline IIFE schedule view into an equivalent named function component
2. Port the upcoming/past day split logic using Sebring's dayEndDates
3. Apply the same "Completed" divider and strikethrough/dimming to past days

Do NOT change the data in onTrackData or offTrackData.
Do NOT change anything else in the Sebring component.
Do NOT rebuild or deploy yet.
Print "Prompt 4 done" when complete.
```

---

## Prompt 5 — Rules Search Component

```
Read: C:/Users/TE/Documents/2026 Projects/WRL Data/events-build/src/EventsPage.jsx

Find the shared RulesSearch component used by the Arlington component.
Find the Sebring component's inline rules engine.

If RulesSearch accepts a rulesData prop and handles class filtering internally:
  Replace Sebring's inline rules engine JSX with <RulesSearch rulesData={rulesData} />.
  Keep Sebring's existing rulesData array exactly as-is — do not touch the data.

If RulesSearch does NOT support the class-based filtering Sebring needs:
  Leave Sebring's inline rules engine unchanged and print:
  "SKIP: RulesSearch component does not support Sebring's class-filter requirements"

Do NOT rebuild or deploy yet.
Print "Prompt 5 done" when complete.
```

---

## Prompt 6 — Build and Deploy

**Run this only after Prompts 1–5 complete without errors.**

```
Read: C:/Users/TE/Documents/2026 Projects/WRL Data/events-build/vite.config.js
Confirm the base path is set to the Sebring event slug. If it is not, set it now.

Then run:

cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build

cd "../tedderengineering-site"
rmdir /s /q events\[sebring-slug]
xcopy /E /I /Y "..\events-build\dist" ".\events\[sebring-slug]"

git add -A
git commit -m "Sebring: port Arlington improvements — smart countdown, quick links, MxM system, schedule day sorting, remove Predictions card"
git push origin main

After push: restore vite.config.js base to the Arlington event slug locally.
Do NOT commit or push that restore.
Print "Deploy complete" when done.
```
