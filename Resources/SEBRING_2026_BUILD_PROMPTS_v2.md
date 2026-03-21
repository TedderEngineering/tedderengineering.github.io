# Sebring 2026 — Full Build Prompts & Arlington Audit
## Version 2.0 — March 7, 2026

Paths:
- Site repo:     `C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site`
- Events build:  `C:/Users/TE/Documents/2026 Projects/WRL Data/events-build`
- Docs folder:   `C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs`
- Regulations:   `C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs/Regulations`

Standard rebuild/deploy sequence (referenced throughout as "BUILD"):
```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\sebring-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\sebring-2026"
git add -A
git commit -m "[message]"
git push origin main
```
After every deploy: restore vite.config.js base to `/events/arlington-2026/`
Do not rebuild Arlington — just restore the config line.

---
---

# PART 1 — ARLINGTON BLEED-THROUGH AUDIT

Every location in SebringWeekendSummary where Arlington data can survive
a copy-paste. Check each item before deploying.

## A. Event Identity
| Field | Arlington value | Sebring correct value |
|---|---|---|
| Event name | "Grand Prix of Arlington" | "Mobil 1 Twelve Hours of Sebring" |
| Eyebrow | "TOYOTA GR CUP NORTH AMERICA — ROUNDS 1 & 2" | "IMSA WEATHERTECH SPORTSCAR CHAMPIONSHIP" |
| Subtitle | "March 13–15, 2026 · Arlington, TX · Street Circuit" | "March 18–21, 2026 · Sebring, FL · Road Course" |
| Slug | arlington-2026 | sebring-2026 |
| Router path match | "arlington-2026" | "sebring-2026" |

## B. Countdown & Session Constants
| Field | Arlington value | Sebring correct value |
|---|---|---|
| EVENT_START | 2026-03-13 (Friday) | 2026-03-18T08:55:00-04:00 (Wed) |
| RACE1_START | GR Cup Race 1 time | 2026-03-20T13:55:00-04:00 (MPC) |
| RACE2_START | GR Cup Race 2 time | 2026-03-21T10:10:00-04:00 (12H) |
| Countdown label | "GRAND PRIX OF ARLINGTON" | "MOBIL 1 TWELVE HOURS OF SEBRING" |
| Countdown session ref | "Race 1 / Race 2" | "Alan Jay 120 / 12 Hours" |
| dayEndDates keys | THU 3/13 – SAT 3/15 | TUE 3/17 – SUN 3/22 |

## C. Circuit Stat Cards
| Field | Arlington value | Sebring correct value |
|---|---|---|
| Length | 1.722 mi | 3.74 mi / 6.02 km |
| Turns | 13 | 17 |
| Type | Street Circuit | Permanent Road Course |
| Surface | Asphalt | Asphalt / Concrete (mixed) |
| Direction | Clockwise | Counter-clockwise |
| FIA Grade | 3 (street) | 2 |
| Pit Lane side | Left | Right |
| Formation Laps | 1 | 2 |
| Race Duration | 2 × 40 min | 12 Hours (WT) / 2 Hours (MPC) |
| Pit Lane Speed | 37 mph | 37 mph / 60 km/h ✓ |

## D. Track Map
| Field | Arlington value | Sebring correct value |
|---|---|---|
| trackMapUrl | Arlington street circuit image | https://www.sebringraceway.com/wp-content/uploads/sites/1040/2024/10/02/flat-map_082223.png |

## E. On-Track Session Data (Full Weekend Schedule tab)
All session rows — series, times, durations — are GR Cup at Arlington.
Must be replaced entirely with IMSA Sebring schedule (see Prompt 5).
Watch for: series label "GR Cup" appearing anywhere in session rows.

## F. Off-Track / Logistics Schedule
All Arlington-specific:
- Load-in via Dallas gate
- Arlington paddock layout references
- GR Cup driver briefing times
Must be replaced entirely (see Prompt 6).

## G. Minute by Minute Tab
Arlington mxmData carries over 1:1. Must be set to empty array
and replaced with placeholder until IMSA MxM PDF is published.
Status: ⚠️ CONFIRMED BUG — fixed in Prompt 13.

## H. Key Race Notes
All 9 Arlington/GR Cup specific notes carry over:
- "No Hardship Laps" (GR Cup rule, not IMSA)
- "Alternate Control Line per SR 28.4" (GR Cup SR)
- "Parc Fermé for Data Download" (GR Cup specific)
- "Fuel pump-out in Parc Fermé SR 37.16" (GR Cup specific)
Must be replaced entirely (see Prompt 14).

## I. Rules Search
All rule stubs are GR Cup regulations.
Class selector is GR Cup classes (GR Cup Amateur, GR Cup Pro, etc.).
Must be replaced with IMSA class selector + IMSA regulations (see Prompt 15–16).

## J. Tire Card
| Field | Arlington value | Sebring correct value |
|---|---|---|
| Tire brand | Continental | Michelin (varies by class) |
| Compound | Continental RC6 slick / wet | Class-specific Michelin |
| Dry pressure | 29 psi (GR Cup spec) | Class-specific |
| Wet pressure | 22 psi (GR Cup spec) | Class-specific |
| Allocation | GR Cup allocation rules | IMSA allocation per SR |
| Tire supplier contact | Continental GR Cup rep | Michelin IMSA rep |

## K. Live Streaming Card
| Field | Arlington value | Sebring correct value |
|---|---|---|
| Stream link label | SRO / Toyota Racing | Peacock Premium (12H) / YouTube (MPC) |
| Stream URL | SRO stream | https://www.peacocktv.com |
| Broadcast note | SRO TV schedule | NBC/Peacock/IMSA.tv |

## L. Finding Grip Card
No change needed — series-agnostic app. ✓

## M. Racetrace Card
No change needed — series-agnostic app. ✓

## N. Predictions Card
No change needed — locked/placeholder in both. ✓

## O. Footer
| Field | Arlington value | Sebring correct value |
|---|---|---|
| "Updated" date | March 2026 date | Update on each deploy |
| Support links | grcupportal.com / GRCup.Support | imsa.com/competitors + IMSA contacts |

## P. Homepage Chip (index.html)
| Field | Arlington value | Sebring correct value |
|---|---|---|
| Label | NEXT | UPCOMING |
| Event name | Grand Prix of Arlington | Mobil 1 12 Hours of Sebring |
| Date | Mar 13–15 · Arlington, TX | Mar 18–21 · Sebring, FL |
| href | /events/arlington-2026/ | /events/sebring-2026/ |

## Q. Vite Config
| Field | Arlington value | Sebring correct value |
|---|---|---|
| base | /events/arlington-2026/ | /events/sebring-2026/ |

## R. /events/ Redirect
| Field | Arlington value | Sebring correct value |
|---|---|---|
| meta refresh URL | /events/arlington-2026/ | /events/sebring-2026/ |
| link text | Arlington 2026 | Sebring 2026 |

---
---

# PART 2 — BUILD PROMPTS

---

## PROMPT 1 — Download All Regulations PDFs

```
Create a Python script at:
C:/Users/TE/Documents/2026 Projects/WRL Data/download_sebring_regs.py

Download these IMSA 2026 regulations to:
C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs/Regulations/

BASE = "https://www.imsa.com/wp-content/uploads/sites/32/"

files = {
  "IWSC_Sporting_Regs.pdf": BASE+"2026/01/23/2026-IMSA-SPORTING-REGULATIONS-and-SSR-IWSC-Redline-012326.pdf",
  "IWSC_Tech_Regs_LMP2.pdf": BASE+"2025/10/28/TR-IWSC-2026-LMP2-Technical-Regulations-BLACKLINE-10292025.pdf",
  "IWSC_Tech_Regs_GTD.pdf": BASE+"2025/10/28/TR-IWSC-2026-GTD-Technical-Regulations-BLACKLINE-10292025.pdf",
  "IMPC_Sporting_Regs.pdf": BASE+"2025/12/03/2026-IMSA-SPORTING-REGULATIONS-and-SSR-IMPC-Redline-120325.pdf",
  "IMPC_Tech_Regs_GS.pdf": BASE+"2025/12/17/TR-IMPC-2026-GS-Technical-Regulations-BLACKLINE-12172025.pdf",
  "IMPC_Tech_Regs_TCR.pdf": BASE+"2025/12/10/TR-IMPC-2026-TCR-Technical-Regulations-REDLINE-12102025.pdf",
  "LST_Sporting_Regs.pdf": BASE+"2025/04/23/2026-LST-Sporting-Regulations-042325.pdf",
  "PCCNA_Sporting_Regs.pdf": BASE+"2026/02/06/2026-PCCNA-Sporting-Regulations-020626.pdf",
  "MC_Sporting_Regs.pdf": BASE+"2025/11/25/2026-MC-Sporting-Regulations-112525.pdf",
}

Use requests. Skip files already downloaded. Print each result.
Then use Playwright to scrape https://www.imsa.com/competitors/2026-imsa-rules-regulations/
Find any additional PDFs with names containing: IWSC, IMPC, LST, PCCNA, MC,
GTP, GTD, LMP2, TCR, GS, Mustang, Lamborghini, Porsche, Technical, Sporting
Download any not already in the folder. Print full summary at the end.

Run the script immediately and show complete output.
```

---

## PROMPT 2 — Read PDFs and Extract Schedule Data (READ ONLY)

```
Read these PDFs and extract the information listed. Do not modify any files.

PDFs in C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs/:
- WT_Provisional_SR_012826.pdf
- 2026-IMSA-Provisional-Schedule-and-SR-M-O-IMPC-012826.pdf
- IMSA-AEC-Sebring-Official-Schedule-SR-225.pdf

Extract and print:
1. All on-track session times — start, end, series, session name
2. Load-in times per series and staging location
3. Driver briefing time and location
4. Scrutineering/tech inspection times
5. Paddock vacate deadlines per series

Print results clearly labeled by source PDF and section.
Do not download, modify, or create any files.
```

---

## PROMPT 3 — Inspect Arlington Structure (READ ONLY)

```
Read the following files and report their contents. Do not modify anything.

1. List all files in: events-build/src/
2. Show full contents of: events-build/src/EventsPage.jsx
3. Show full contents of: events-build/vite.config.js
4. In tedderengineering-site/index.html, show the full events
   banner/chip section (search for "arlington" or "Events Banner")

Do not modify any files. Just read and report.
```

---

## PROMPT 4 — Add Sebring Chip to Homepage

```
In tedderengineering-site/index.html, find the Arlington event chip.
It links to /events/arlington-2026/.

Immediately after the Arlington chip block, add a new chip:
- Label: UPCOMING
- Event name: Mobil 1 12 Hours of Sebring
- Date/location: Mar 18–21 · Sebring, FL
- href: /events/sebring-2026/

Copy the exact HTML structure of the Arlington chip.
Change only: href, label, event name, date/location text.
Do not modify the Arlington chip or anything else.

git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" add index.html
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" commit -m "Add Sebring 2026 chip to homepage"
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" push origin main
```

---

## PROMPT 5 — Create SebringWeekendSummary Component

```
In events-build/src/EventsPage.jsx:

1. Find ArlingtonWeekendSummary.
2. Add SebringWeekendSummary immediately after it.
3. Copy the ENTIRE structure — all views, cards, helpers, layout.
4. In SebringWeekendSummary ONLY change these top-level constants:
   EVENT_NAME = "Mobil 1 Twelve Hours of Sebring"
   EYEBROW = "IMSA WEATHERTECH SPORTSCAR CHAMPIONSHIP"
   SUBTITLE = "March 18–21, 2026 · Sebring, FL · Road Course"
   SLUG = "sebring-2026"
5. Leave all data arrays as Arlington placeholders for now.
   They will be replaced in subsequent prompts.
6. Update the router to render SebringWeekendSummary for "sebring-2026".

Do not modify ArlingtonWeekendSummary or anything else.
```

---

## PROMPT 6 — Populate On-Track Session Times

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Replace ALL onTrack session arrays. Use mk() exactly as Arlington does.
All times ET. Do not change any styles or layout.

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

## PROMPT 7 — Populate Off-Track / Logistics Schedule

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Replace offTrackData entirely. Do not change styles or layout.

const offTrackData = [
  { day: "TUE 3/17", items: [
    { time: "1:00 PM", event: "Non-GTP load-in begins from Lakeshore Mall staging" },
    { time: "1:30 PM", event: "Non-GTP transporters staged: 901 US-27 N, Sebring" },
    { time: "1:30 PM", event: "GTP staged in Midway area at SIR" },
  ]},
  { day: "WED 3/18", items: [
    { time: "8:55 AM", event: "First on-track session — all paddock areas open" },
  ]},
  { day: "THU 3/19", items: [
    { time: "8:00 AM", event: "First on-track session" },
  ]},
  { day: "FRI 3/20", items: [
    { time: "10:20 AM", event: "First on-track session" },
    { time: "11:59 PM", event: "MPC / LST / PCC / MC must vacate paddock by midnight" },
  ]},
  { day: "SAT 3/21", items: [
    { time: "10:10 AM", event: "🏁 Mobil 1 Twelve Hours of Sebring — Green Flag" },
    { time: "10:10 PM", event: "🏆 Checkered Flag (approximate)" },
  ]},
  { day: "SUN 3/22", items: [
    { time: "1:00 PM", event: "All transporters must vacate SIR property" },
  ]},
];
```

---

## PROMPT 8 — Populate Circuit Data and Event Constants

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Replace ALL of the following. Do not change styles or layout.

const EVENT_START = new Date("2026-03-18T08:55:00-04:00");
const RACE1_START = new Date("2026-03-20T13:55:00-04:00");
const RACE2_START = new Date("2026-03-21T10:10:00-04:00");

const circuitData = [
  ["Length", "3.74 mi / 6.02 km"],
  ["Turns", "17"],
  ["Type", "Permanent Road Course"],
  ["Surface", "Asphalt / Concrete (mixed)"],
  ["Direction", "Counter-clockwise"],
  ["FIA Grade", "2"],
  ["Pit Lane", "Right side"],
  ["Formation Laps", "2 (WeatherTech) / 1 (others)"],
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

const trackMapUrl = "https://www.sebringraceway.com/wp-content/uploads/sites/1040/2024/10/02/flat-map_082223.png";
```

---

## PROMPT 9 — Fix Minute by Minute Tab

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the mxmData array and replace it with: const mxmData = [];

Then find the Minute by Minute tab render section.
When mxmData.length === 0, render this placeholder instead of
the countdown banner and session rows:

<div style={{
  textAlign:"center", padding:"48px 20px",
  background:C.card, borderRadius:8,
  border:`1px solid ${C.border}`, marginTop:4
}}>
  <div style={{fontSize:32, marginBottom:12}}>📋</div>
  <div style={{
    fontFamily:font, fontSize:18, fontWeight:700,
    color:C.white, marginBottom:8, letterSpacing:"0.04em"
  }}>Schedule Not Yet Published</div>
  <div style={{fontSize:13, color:C.gray, lineHeight:1.6}}>
    The minute-by-minute schedule will be added<br/>
    once IMSA publishes it — typically 5–7 days before the event.
  </div>
</div>

Do not touch ArlingtonWeekendSummary or any other component.
```

---

## PROMPT 10 — Fix Key Race Notes

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the keyRaceNotes array. Replace it entirely with:

const keyRaceNotes = [
  { icon:"⏱️", text:"Session clock does NOT stop for Full Course Yellows (FCY)" },
  { icon:"🏎️", text:"2 formation laps — WeatherTech 12H only; 1 lap for all other series" },
  { icon:"👥", text:"Minimum 2 drivers per WeatherTech car — each must complete min. 65 minutes" },
  { icon:"⛽", text:"Pit lane speed limit: 37 mph / 60 km/h enforced all sessions all series" },
  { icon:"🌙", text:"Night practice Thu 3/19 7:45–9:15 PM ET — headlights required" },
  { icon:"📍", text:"Non-GTP transporter staging: Lakeshore Mall, 901 US-27 N, Sebring" },
  { icon:"📡", text:"Transporter convoy communication: CB channel 40" },
  { icon:"🏆", text:"Michelin Endurance Cup points awarded at 4-hour and 8-hour race intervals" },
  { icon:"📋", text:"All transporters must vacate SIR property by Sun 3/22 at 1:00 PM" },
];

Do not modify ArlingtonWeekendSummary or any other component.
```

---

## PROMPT 11 — Fix Tire Card

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the tireData object or tires section. Replace entirely with:

const tireData = {
  supplier: "Michelin",
  supplierUrl: "https://www.michelinmotorsport.com",
  note: "Tire specifications vary by class. Select your class for details.",
  classes: {
    "GTP":     { compound:"Michelin Pilot Sport GT", allocation:"Per BoP bulletin" },
    "LMP2":    { compound:"Michelin LMP2 Spec", allocation:"Per SR" },
    "GTD PRO": { compound:"Michelin Pilot Sport GT", allocation:"Per BoP bulletin" },
    "GTD":     { compound:"Michelin Pilot Sport GT", allocation:"Per BoP bulletin" },
    "GS":      { compound:"Michelin Pilot Sport GT3", allocation:"Per IMPC SR" },
    "TCR":     { compound:"Michelin TCR Spec", allocation:"Per IMPC SR" },
    "Lambo ST":{ compound:"Pirelli P Zero (LST spec)", allocation:"Per LST SR" },
    "PCC":     { compound:"Michelin Pilot Sport Cup 2 R (PCCNA spec)", allocation:"Per PCCNA SR" },
    "Mustang": { compound:"Michelin (MC spec)", allocation:"Per MC SR" },
  },
  pressureNote: "See class-specific Technical Regulations for required pressures.",
  contact: "Michelin Motorsport IMSA Rep — contact via imsa.com/competitors",
};

Then update the tire card UI to show the supplier name and note,
and display class-specific info once a class is selected.
Do not modify ArlingtonWeekendSummary or any other component.
```

---

## PROMPT 12 — Replace Rules Search with IMSA Class Selector

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the rules view (view === "rules"). Replace entirely.

Add state: const [selectedClass, setSelectedClass] = useState(null);

STEP 1 UI — class not selected — show grid of class buttons:

WeatherTech Championship:  GTP | LMP2 | GTD PRO | GTD
Michelin Pilot Challenge:  GS | TCR
Single-Make:  Lamborghini Super Trofeo | Porsche Carrera Cup NA | Mustang Challenge

Each button: class name large, series label small below.
Selected class: accent border + background tint.

STEP 2 UI — class selected — show:
- "[CLASS] — [SERIES]" header with "Change class" link (sets selectedClass to null)
- Search input + Sporting / Technical / Both toggle
- Rules list filtered to selectedClass

const rulesData = [
  // ALL CLASSES
  { id:"ALL-1", type:"sporting", classes:"all",
    title:"Pit Lane Speed Limit",
    text:"Maximum speed in pit lane: 37 mph (60 km/h). Enforced all sessions." },
  { id:"ALL-2", type:"sporting", classes:"all",
    title:"Full Course Yellow",
    text:"No overtaking under FCY. Maintain position. Session clock continues." },
  { id:"ALL-3", type:"sporting", classes:"all",
    title:"Red Flag",
    text:"Reduce speed immediately. Return to pit lane. Await instructions." },
  { id:"ALL-4", type:"sporting", classes:"all",
    title:"Black Flag",
    text:"Report to pit lane immediately on the lap the flag is shown." },
  // WEATHERTECH
  { id:"WT-1", type:"sporting", classes:["GTP","LMP2","GTD PRO","GTD"],
    title:"Minimum Driver Time (12H)",
    text:"Each driver must complete a minimum of 65 minutes of race time." },
  { id:"WT-2", type:"sporting", classes:["GTP","LMP2","GTD PRO","GTD"],
    title:"Formation Laps",
    text:"2 formation laps for the Mobil 1 Twelve Hours of Sebring." },
  { id:"WT-3", type:"technical", classes:["GTP","LMP2","GTD PRO","GTD"],
    title:"Balance of Performance",
    text:"BoP applies per pre-event Technical Bulletin. Check latest TB." },
  // IMPC
  { id:"MPC-1", type:"sporting", classes:["GS","TCR"],
    title:"Race Distance",
    text:"2-hour race (Alan Jay Automotive 120). Fixed duration, not laps." },
  { id:"MPC-2", type:"sporting", classes:["GS","TCR"],
    title:"Mandatory Pit Stop",
    text:"Mandatory pit stop required. Driver change must occur. Min 3 min stationary." },
  { id:"MPC-3", type:"technical", classes:["GS","TCR"],
    title:"Balance of Performance",
    text:"BoP applies per pre-event Technical Bulletin IMPC #26-03/04." },
  // SINGLE-MAKE
  { id:"SM-1", type:"sporting", classes:["Lamborghini Super Trofeo","Porsche Carrera Cup NA","Mustang Challenge"],
    title:"Race Format",
    text:"Two separate races this weekend (Race 1 of 2 / Race 2 of 2)." },
  { id:"SM-2", type:"sporting", classes:["Lamborghini Super Trofeo","Porsche Carrera Cup NA","Mustang Challenge"],
    title:"Grid",
    text:"Grid determined by qualifying lap times from that series' qualifying session." },
  { id:"SM-3", type:"sporting", classes:["Lamborghini Super Trofeo","Porsche Carrera Cup NA","Mustang Challenge"],
    title:"Formation Laps",
    text:"1 formation lap for all single-make series races." },
];

Filter: show ALL rules where classes === "all", plus rules where
classes array includes selectedClass.

Footer note below results:
"For complete regulations visit imsa.com/competitors — 2026 Rules & Regulations"
link to: https://www.imsa.com/competitors/2026-imsa-rules-regulations/

Do not modify ArlingtonWeekendSummary or any other component.
```

---

## PROMPT 13 — Load Regulations PDFs Into Rules Search

```
Regulations PDFs are in:
C:/Users/TE/Documents/2026 Projects/WRL Data/Sebring 2026 Docs/Regulations/

For each of these PDFs, read it and extract:
- The 10 most important sporting regulation rules for that class
- The 10 most important technical regulation rules for that class

PDFs to read:
- IWSC_Sporting_Regs.pdf (covers GTP, LMP2, GTD PRO, GTD)
- IWSC_Tech_Regs_LMP2.pdf (LMP2)
- IWSC_Tech_Regs_GTD.pdf (GTD / GTD PRO)
- IMPC_Sporting_Regs.pdf (GS, TCR)
- IMPC_Tech_Regs_GS.pdf (GS)
- IMPC_Tech_Regs_TCR.pdf (TCR)
- LST_Sporting_Regs.pdf (Lamborghini Super Trofeo)
- PCCNA_Sporting_Regs.pdf (Porsche Carrera Cup NA)
- MC_Sporting_Regs.pdf (Mustang Challenge)

For each rule extracted, format as:
{ id:"[CLASS]-[N]", type:"sporting"|"technical",
  classes:["class name"],
  section:"Article X.X.X", title:"Rule Title",
  text:"Full verbatim rule text from PDF." }

Print all extracted rules to the terminal so I can review them.
Do not modify any code files yet.
```

---

## PROMPT 14 — Insert Full Regulation Rules Into Component

```
ONLY run this after Prompt 13 output has been reviewed and approved.

In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the rulesData array added in Prompt 12.
Append all the reviewed rules from Prompt 13 to the end of the array.
Do not replace or remove the existing stub rules — append only.
Do not change any styles, layout, or other data.

Then run BUILD sequence:
git commit -m "Add full IMSA regulations to Sebring rules search"
```

---

## PROMPT 15 — Fix Live Streaming Card

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the live streaming view (view === "live").
Replace any Arlington/GR Cup/SRO stream references with:

const liveStreams = [
  {
    series: "IMSA Michelin Pilot Challenge",
    session: "Alan Jay Automotive 120",
    date: "Friday, March 20 at 1:55 PM ET",
    platform: "IMSA.tv (free)",
    url: "https://www.imsa.com/imsa-tv/",
    note: "YouTube link will be added when published by IMSA"
  },
  {
    series: "IMSA WeatherTech Championship",
    session: "Mobil 1 Twelve Hours of Sebring",
    date: "Saturday, March 21 at 10:10 AM ET",
    platform: "Peacock Premium",
    url: "https://www.peacocktv.com",
    note: "Also available on NBC for portions of the race"
  },
];

Render each as a large card: series name, session name, date/time,
platform name, and a full-width button linking to the URL in a new tab.
Show the note below the button in gray text.

Do not modify ArlingtonWeekendSummary or any other component.
```

---

## PROMPT 16 — Fix Footer Support Links

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the footer section.

Replace any GR Cup support links (grcupportal.com, GRCup.Support@toyota.com)
with these IMSA contacts:

Primary: https://www.imsa.com/competitors/2026-imsa-rules-regulations/
Support:  https://www.imsa.com/competitors/2026-team-portal/
Label: "imsa.com/competitors"

Do not modify ArlingtonWeekendSummary, the site-wide footer, or anything else.
```

---

## PROMPT 17 — Update Vite Config, Build, and Deploy

```
1. In events-build/vite.config.js, change:
   base: '/events/sebring-2026/',

2. Confirm events-build/public/ contains findinggrip-icon.png.
   If not, copy it from tedderengineering-site/events/arlington-2026/

3. Run BUILD:
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\sebring-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\sebring-2026"
git add -A
git commit -m "Deploy Sebring 2026 — full IMSA dashboard"
git push origin main

4. After push: restore vite.config.js base to /events/arlington-2026/
   Do not rebuild Arlington.
```

---

## PROMPT 18 — Update /events/ Redirect

```
In tedderengineering-site/events/index.html, find the meta refresh
redirect and link text pointing to arlington-2026.

Change ONLY:
- Redirect URL → /events/sebring-2026/
- Link text → Sebring 2026

Do not change anything else in the file.

git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" add events/index.html
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" commit -m "Update events redirect to Sebring 2026"
git -C "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site" push origin main
```

---
---

# PART 3 — FUTURE PROMPTS (run when docs are published)

---

## PROMPT 19 — Add MxM Data (~March 13–14)

```
The minute-by-minute schedule PDF is now in Sebring 2026 Docs/.

Read the PDF. Extract all timed steps for MPC sessions:
Practice 2 (Thu 3/19), Qualifying (Thu 3/19), Race (Fri 3/20).

In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Replace mxmData with extracted data using t() and minus() helpers.
Add ⚡ Cars to Pre-Grid: 10 min before Transit to Pit Lane (P/Q)
or 10 min before Pre-Grid Close (race).
Remove the placeholder div. Enable the MxM tab.

Run BUILD: git commit -m "Add Sebring MxM schedule"
```

---

## PROMPT 20 — Update with Official SR Times (~March 10–11)

```
Run download script first:
python "C:/Users/TE/Documents/2026 Projects/WRL Data/download_sebring_docs.py"

Read the new official SR PDF. Compare all session times to current
values in SebringWeekendSummary in events-build/src/EventsPage.jsx.

List every changed time. Update only those values.
For each changed item add changed:true to highlight with ⚡.
Do not change any styling or layout.

Run BUILD: git commit -m "Update Sebring schedule — official SR times"
```

---

## PROMPT 21 — Add Live YouTube Link (~March 15–17)

```
In events-build/src/EventsPage.jsx, find SebringWeekendSummary.
Find the MPC stream card (series: "IMSA Michelin Pilot Challenge").
Replace the url with the IMSA YouTube stream URL: [PASTE URL]
Replace the note with: "Live on YouTube — free, no login required"

Run BUILD: git commit -m "Add Sebring MPC live stream link"
```

---
---

# PART 4 — PRE-DEPLOY CHECKLIST

Run through this list before every `git push` for Sebring.

### Identity
- [ ] Event name: "Mobil 1 Twelve Hours of Sebring"
- [ ] Eyebrow: "IMSA WEATHERTECH SPORTSCAR CHAMPIONSHIP"
- [ ] Subtitle: March 18–21, 2026 · Sebring, FL · Road Course
- [ ] Router renders SebringWeekendSummary for /sebring-2026/

### Countdown
- [ ] EVENT_START: 2026-03-18T08:55:00-04:00
- [ ] RACE1_START: 2026-03-20T13:55:00-04:00 (MPC)
- [ ] RACE2_START: 2026-03-21T10:10:00-04:00 (12H)
- [ ] dayEndDates keys: TUE 3/17 through SUN 3/22
- [ ] No "Arlington" or "GR Cup" in countdown label

### Schedule
- [ ] All session times are IMSA Sebring schedule
- [ ] No "GR Cup" series label anywhere in session rows
- [ ] offTrackData references Lakeshore Mall, SIR, correct dates
- [ ] MxM tab shows placeholder (or real data once published)

### Circuit
- [ ] Length: 3.74 mi / 6.02 km
- [ ] Turns: 17
- [ ] trackMapUrl: sebringraceway.com flat-map URL

### Rules
- [ ] Class selector shows IMSA classes only
- [ ] No GR Cup class names (Amateur, Pro) anywhere
- [ ] No GR Cup regulation text (SR 28.4, SR 37.16, etc.)
- [ ] Footer link goes to imsa.com/competitors

### Tires
- [ ] Supplier: Michelin (not Continental)
- [ ] No "Continental RC6" reference anywhere
- [ ] No GR Cup pressure specs (29 psi dry, 22 psi wet)

### Key Race Notes
- [ ] No "Hardship Laps" (GR Cup rule)
- [ ] No "Alternate Control Line per SR 28.4"
- [ ] No "Parc Fermé for Data Download"
- [ ] No "Fuel pump-out per SR 37.16"

### Live Streaming
- [ ] No SRO/Toyota Racing stream references
- [ ] Peacock link present for 12H
- [ ] IMSA.tv link present for MPC

### Footer
- [ ] No grcupportal.com link
- [ ] No GRCup.Support@toyota.com
- [ ] imsa.com/competitors link present

### Site
- [ ] Homepage chip: UPCOMING / Mobil 1 12 Hours / Mar 18–21
- [ ] vite.config.js base: /events/sebring-2026/ (during build only)
- [ ] vite.config.js restored to /events/arlington-2026/ after deploy
- [ ] /events/index.html redirects to /events/sebring-2026/
