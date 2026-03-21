# Sebring 2026 — Claude Code Prompts
## Version 1.0 — March 7, 2026

Paths:
- Site repo: `C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site`
- Events build: `C:/Users/TE/Documents/2026 Projects/WRL Data/events-build`
- Downloaded docs: `C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs`

---

## PROMPT 1 — Read PDFs and Extract Schedule Data (READ ONLY)

```
Read these PDFs and extract the information listed. Do not modify any files.

PDFs to read (all in C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs/):
- WT_Provisional_SR_012826.pdf
- 2026-IMSA-Provisional-Schedule-and-SR-M-O-IMPC-012826.pdf
- IMSA-AEC-Sebring-Official-Schedule-SR-225.pdf

Extract and print:
1. All on-track session times for all series (start time, end time, session name, series)
2. Load-in times and dates for each series
3. Transporter staging location and instructions
4. Driver briefing time and location if listed
5. Scrutineering/tech inspection times if listed
6. Paddock vacate deadlines

Print results clearly labeled by source PDF and section.
Do not download, modify, or create any files.
```

---

## PROMPT 2 — Inspect Arlington Dashboard Structure (READ ONLY)

```
Read the following files and report their contents. Do not modify anything.

1. List all files in: events-build/src/
2. Show full contents of: events-build/src/EventsPage.jsx
3. Show full contents of: events-build/vite.config.js
4. Show full contents of: tedderengineering-site/index.html
   (search for the events banner section — look for "Events Banner" or "arlington")

Do not modify any files. Just read and report.
```

---

## PROMPT 3 — Add Sebring Chip to Homepage

```
In tedderengineering-site/index.html, find the Arlington event chip.
It links to /events/arlington-2026/ and is labeled "Next" or "NEXT".

Immediately after the Arlington chip block, insert a second chip with:
- Label: UPCOMING
- Event name: Mobil 1 12 Hours of Sebring
- Date/location: Mar 18–21 · Sebring, FL
- href: /events/sebring-2026/

Do not modify the Arlington chip or any other HTML.
Copy the exact HTML structure of the Arlington chip.
Change only: href, label text, event name text, date/location text.

Then:
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" add index.html
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" commit -m "Add Sebring 2026 chip to homepage"
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" push origin main
```

---

## PROMPT 4 — Create Sebring Event Component (Copy Arlington Structure)

```
In events-build/src/EventsPage.jsx:

1. Find the ArlingtonWeekendSummary component function.
2. Add a new component function called SebringWeekendSummary immediately after it.
3. Copy the ENTIRE ArlingtonWeekendSummary structure exactly — same sections array,
   same card layout, same Racetrace/FindingGrip/Predictions card designs,
   same responsive classes, same inline style patterns.
4. In SebringWeekendSummary only, update the top-level event constants:
   - Event name: "Mobil 1 Twelve Hours of Sebring"
   - Eyebrow: "IMSA WeatherTech SportsCar Championship — Round 2"
   - Subtitle: "March 18–21, 2026 · Sebring, FL · Permanent Road Course"
   - Slug reference: sebring-2026
5. Leave ALL schedule data, circuit data, tire rules, and session times
   as Arlington placeholders — those will be updated in later prompts.
6. At the bottom of the file, update the router/switch to render
   SebringWeekendSummary when the path contains "sebring-2026".

Do not modify ArlingtonWeekendSummary or any existing code.
```

---

## PROMPT 5 — Populate On-Track Session Times

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Replace the onTrack session data arrays with the Sebring schedule below.
Do not change any styles, layout, or non-data code.

Use the mk() helper exactly as Arlington does.
All times are ET. Series: "WeatherTech", "MPC", "Lambo ST", "PCC", "Mustang"

WED 3/18:
mk("8:55 AM","9:25 AM","Practice 1","Mustang",30)
mk("9:40 AM","10:10 AM","Practice 1","PCC",30)
mk("10:25 AM","11:10 AM","Practice 1","Lambo ST",45)
mk("11:25 AM","12:25 PM","Practice 1","MPC",60)
mk("1:25 PM","1:55 PM","Practice 2","Mustang",30)
mk("2:10 PM","2:50 PM","Practice 2","PCC",40)
mk("3:05 PM","3:50 PM","Practice 2","Lambo ST",45)
mk("4:05 PM","4:20 PM","Qualifying","Mustang",15)

THU 3/19:
mk("8:00 AM","9:00 AM","Practice 2","MPC",60)
mk("9:15 AM","9:45 AM","Qualifying","PCC",30)
mk("10:05 AM","11:35 AM","Practice 1","WeatherTech",90)
mk("11:55 AM","12:30 PM","Qualifying","Lambo ST",35)
mk("1:05 PM","1:50 PM","Race 1 of 2","Mustang",45)
mk("2:10 PM","2:45 PM","Qualifying ★","MPC",35)
mk("3:00 PM","3:40 PM","Race 1 of 2","PCC",40)
mk("4:00 PM","5:45 PM","Practice 2","WeatherTech",105)
mk("6:10 PM","7:00 PM","Race 1 of 2","Lambo ST",50)
mk("7:45 PM","9:15 PM","Practice 3 (Night)","WeatherTech",90)

FRI 3/20:
mk("10:20 AM","11:05 AM","Race 2 of 2","Mustang",45)
mk("11:20 AM","12:40 PM","Qualifying ★","WeatherTech",80)
mk("1:55 PM","4:00 PM","Alan Jay Automotive 120 🏁","MPC",125)
mk("4:30 PM","5:25 PM","Race 2 of 2","Lambo ST",55)
mk("5:40 PM","6:25 PM","Race 2 of 2","PCC",45)

SAT 3/21:
mk("10:10 AM","10:10 PM","Mobil 1 Twelve Hours of Sebring 🏆","WeatherTech",720)
```

---

## PROMPT 6 — Populate Off-Track Weekend Schedule

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Replace the offTrackData array with the Sebring schedule below.
Do not change any styles, layout, or non-data code.

const offTrackData = [
  { day: "TUE 3/17", items: [
    { time: "1:30 PM", event: "Non-GTP transporters staged at Lakeshore Mall" },
    { time: "1:00 PM", event: "Non-GTP load-in begins from Lakeshore Mall" },
    { time: "1:30 PM", event: "GTP staged in Midway area at SIR" },
  ]},
  { day: "WED 3/18", items: [
    { time: "8:55 AM", event: "First on-track session — Paddock open" },
  ]},
  { day: "THU 3/19", items: [
    { time: "8:00 AM", event: "First on-track session" },
  ]},
  { day: "FRI 3/20", items: [
    { time: "10:20 AM", event: "First on-track session" },
    { time: "11:59 PM", event: "MPC/LST/PCC/MC must vacate paddock by midnight" },
  ]},
  { day: "SAT 3/21", items: [
    { time: "10:10 AM", event: "🏁 Mobil 1 Twelve Hours of Sebring — Green Flag" },
    { time: "10:10 PM", event: "🏆 Checkered Flag (approx.)" },
  ]},
  { day: "SUN 3/22", items: [
    { time: "1:00 PM", event: "All transporters must vacate SIR property" },
  ]},
];
```

---

## PROMPT 7 — Populate Circuit Data and Event Constants

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Replace the circuitData array and EVENT_START/RACE constants.
Do not change any styles, layout, or non-data code.

const EVENT_START = new Date("2026-03-18T08:55:00-04:00");
const RACE1_START = new Date("2026-03-20T13:55:00-04:00"); // MPC race
const RACE2_START = new Date("2026-03-21T10:10:00-04:00"); // 12 Hours green flag

const circuitData = [
  ["Length", "3.74 mi / 6.02 km"],
  ["Turns", "17"],
  ["Type", "Permanent Road Course"],
  ["Surface", "Asphalt / Concrete (mixed)"],
  ["Direction", "Counter-clockwise"],
  ["FIA Grade", "2"],
  ["Pit Lane", "Right side"],
  ["Formation Laps", "2"],
  ["Race Duration", "12 Hours (WeatherTech) / 2 Hours (MPC)"],
  ["Pit Lane Speed", "37 mph / 60 km/h"],
];

const dayEndDates = {
  "TUE 3/17": new Date("2026-03-17T23:59:00-04:00"),
  "WED 3/18": new Date("2026-03-18T23:59:00-04:00"),
  "THU 3/19": new Date("2026-03-19T23:59:00-04:00"),
  "FRI 3/20": new Date("2026-03-20T23:59:00-04:00"),
  "SAT 3/21": new Date("2026-03-21T23:59:00-04:00"),
  "SUN 3/22": new Date("2026-03-22T23:59:00-04:00"),
};

const trackMapUrl = "https://www.sebringraceway.com/the-track";
```

---

## PROMPT 8 — Update Vite Config and Build + Deploy

```
1. In events-build/vite.config.js, change the base path to /events/sebring-2026/
   Find the line that sets `base:` and change it to:
   base: '/events/sebring-2026/',

2. Copy findinggrip-icon.png from events/arlington-2026/ into events-build/public/
   if it isn't already there.

3. Build and deploy:
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\sebring-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\sebring-2026"
git add -A
git commit -m "Add Sebring 2026 event dashboard"
git push origin main

4. After push succeeds, restore vite.config.js base back to /events/arlington-2026/
   so the Arlington build still works.
   Do not rebuild Arlington — just restore the config file.
```

---

## PROMPT 9 — Update /events/ Redirect

```
In tedderengineering-site/events/index.html, find the meta refresh redirect
and the link text that currently points to arlington-2026.

Change ONLY:
- The redirect URL from /events/arlington-2026/ to /events/sebring-2026/
- The link text to reflect Sebring 2026

Do not change anything else in the file.

git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" add events/index.html
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" commit -m "Update events redirect to Sebring 2026"
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" push origin main
```

---

## FUTURE PROMPTS (run when documents are published, ~March 10–14)

---

## PROMPT 10 — Add MxM Data (when MxM PDF is released)

```
The minute-by-minute schedule PDF for Sebring is now in:
C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs/

Read the PDF and extract all timed steps for the MPC sessions only
(Practice 2 Thu 3/19, Qualifying Thu 3/19, Race Fri 3/20).

In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Replace the mxmData array with the extracted data using the t() and minus() helpers.
Add ⚡ Cars to Pre-Grid items: 10 min before Transit to Pit Lane (P/Q)
or 10 min before Pre-Grid Close (race).
Enable the MxM tab (remove any grayed-out or disabled state).

Rebuild and deploy using the Prompt 8 build sequence.
```

---

## PROMPT 11 — Update Schedule When Official SR Drops

```
The official Schedule & SR for Sebring 12H is now in:
C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs/

Re-run the download script first:
python "C:/Users/TE/Documents/2026 Projects/WRL Data/download_sebring_docs.py"

Read the new official SR PDF and compare session times to what is currently
in SebringWeekendSummary in events-build/src/EventsPage.jsx.

List every time that changed. Then update only those specific values.
For any changed item, add changed: true to highlight with ⚡ in the UI.
Do not change any styling or layout.

Rebuild and deploy using the Prompt 8 build sequence.
```

---

## PROMPT 12 — Add Live Streaming Links

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the Live Viewing view (search for view === "live").

Replace the "Coming Soon" content with these links:

MPC Race — Alan Jay Automotive 120:
  Date: Friday March 20, 2026 at 1:55 PM ET
  Stream: [PASTE YouTube URL when published by IMSA]

12 Hours of Sebring:
  Date: Saturday March 21, 2026 at 10:10 AM ET
  Stream: Peacock Premium — https://www.peacocktv.com

Each link should be a large card with session name, date/time, and a
clickable button opening the stream URL in a new tab.

Update the live card description from "links coming soon" to
"Watch sessions live on Peacock and YouTube".

Rebuild and deploy using the Prompt 8 build sequence.
```

---

## Checklist

- [ ] Prompt 1 — Extract schedule data from PDFs
- [ ] Prompt 2 — Inspect Arlington structure
- [ ] Prompt 3 — Add chip to homepage
- [ ] Prompt 4 — Create SebringWeekendSummary component
- [ ] Prompt 5 — Populate on-track session times
- [ ] Prompt 6 — Populate off-track schedule
- [ ] Prompt 7 — Circuit data and event constants
- [ ] Prompt 8 — Build and deploy
- [ ] Prompt 9 — Update /events/ redirect
- [ ] Prompt 10 — Add MxM data (when PDF drops ~Mar 13–14)
- [ ] Prompt 11 — Update with official SR times (when posted ~Mar 10–11)
- [ ] Prompt 12 — Add live streaming links (when published ~Mar 15–17)
