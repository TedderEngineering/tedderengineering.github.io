# Update Arlington Event Dashboard — Pre-Event Drivers Briefing Corrections

The Pre-Event Drivers Briefing (dated 3/12/2026) and Updated Event Schedule (dated 3/6/2026) contain corrections and new information. Apply ALL changes below to events-build/src/EventsPage.jsx. Do not change any card styles, layout, or card order.

## CRITICAL CORRECTIONS

### 1. Formation Laps: Change from 2 to 1

The Drivers Briefing confirms (1) Formation Lap, not 2. Fix everywhere:

- In `circuitData` array: change `["Formation Laps", "2"]` to `["Formation Laps", "1"]`
- In the Procedures view "Key Race Notes" section: change "2 Formation Laps for each race" to "1 Formation Lap for each race"
- In the dashboard quick stats grid: if "Laps" / "2 Formation" appears, change to "1 Formation"

### 2. Post-Checkered Procedure: Replace TBC with confirmed procedure

In the Procedures view "Key Race Notes", find the item that says "Post-checkered procedure: TBC (will be confirmed at Thursday on-site briefing)".

Replace it with: "Post-checkered: Enter pit lane IMMEDIATELY at Alt S/F → proceed directly to Pit Out (do NOT stop in pit box) → double file behind Safety Car → follow SC to Paddock → Parc Fermé"

### 3. Track Walk: Update to allow golf carts

In the offTrackData, find the Thursday track walk item. Change "Track Walk (on foot only — no vehicles, bikes, or scooters)" to "Track Walk (golf carts, tuggers, and walking only — 2:00–4:00 PM)"

### 4. Event Title: Add Java House sponsor

Change all instances of "Grand Prix of Arlington" in the header/title area to "Java House Grand Prix of Arlington". This includes:
- The main event title in the ArlingtonWeekendSummary header
- Do NOT change the homepage banner — that can stay as "Grand Prix of Arlington" for simplicity

## NEW INFORMATION — Add to Procedures

In the Procedures view, find the "Key Race Notes" list. Add these NEW items to the list:

- "⚠️ Qualifying: Any unapproved work (Articles 42.35-36) results in loss of ALL previously set lap times"
- "🅿️ Qualifying: Cars must remain in pit lane until the conclusion of the session"
- "🚫 No mid-session re-entry to Paddock from the race track"

## NEW INFORMATION — Add Safety Car / FCY section to Procedures

After the "Key Race Notes" card in the Procedures view, add a NEW Card for Safety Car procedures:

```jsx
<Card style={{ marginBottom: 16 }}>
  <h3 style={{ margin: "0 0 12px", fontSize: 14, color: C.white, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: font }}>Safety Car / FCY Procedures</h3>
  {[
    ["🚗", "SC dispatches from Pit Exit"],
    ["📻", "FCY notification: Radio call, DID (Driver Info Display), timing screens, and marshal flags — redundant system"],
    ["⚠️", "Safety trucks / Medical car may be dispatched at time of FCY — Be Aware at all times, especially near incident"],
    ["💡", "Lights Out by: T10"],
    ["➡️", "SC pull away (leader maintains SC speed): T13 (Alt S/F)"],
    ["🟢", "Restart acceleration: Apex T14 — Green flag to follow acceleration, racing on display of green"],
    ["🚧", "Pit Exit closes when SC is perpendicular to first working pit box until main pack passes pit exit"],
  ].map(([icon, text], i) => (
    <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none", alignItems: "flex-start" }}>
      <span style={{ fontSize: 14, flexShrink: 0, width: 22 }}>{icon}</span>
      <span style={{ fontSize: 13, color: C.grayLight, lineHeight: 1.5 }}>{text}</span>
    </div>
  ))}
</Card>
```

## NEW INFORMATION — Add Formation Lap & Race Start details to Procedures

After the Safety Car card, add another Card:

```jsx
<Card style={{ marginBottom: 16 }}>
  <h3 style={{ margin: "0 0 12px", fontSize: 14, color: C.white, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: font }}>Formation Lap & Race Start</h3>
  {[
    ["1️⃣", "1 Formation Lap"],
    ["🔄", "Cars stalled or delayed on grid MAY retake positions unless entire field has passed them"],
    ["❌", "Cars that spin or stop on formation lap may NOT retake positions — start at back of field"],
    ["🚫", "No re-taking of positions after T12 on formation lap"],
    ["↔️", "Gaps must be maintained if a car loses their starting position"],
    ["🏁", "Start zone marked with white/orange signs on driver's left on pit wall"],
    ["⚠️", "Cars must not overtake within columns until crossing the start (control) line"],
  ].map(([icon, text], i) => (
    <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none", alignItems: "flex-start" }}>
      <span style={{ fontSize: 14, flexShrink: 0, width: 22 }}>{icon}</span>
      <span style={{ fontSize: 13, color: C.grayLight, lineHeight: 1.5 }}>{text}</span>
    </div>
  ))}
</Card>
```

## NEW INFORMATION — Add Autograph Session to Off-Track Schedule

In the offTrackData, find the Saturday ("Sat 3/14") entry. Add this item:

```jsx
{ time: "1:30 PM", event: "⚡ Autograph Session (until 2:15 PM) — GR Cup Paddock", changed: true }
```

## UPDATE — Footer date

Find the footer text that says "Updated 3/5/2026" and change it to "Updated 3/12/2026 (Pre-Event Drivers Briefing)"

## DO NOT CHANGE

- Any card styles, card order, or dashboard layout
- The on-track timetable (session times are confirmed unchanged)
- The Minute-by-Minute data
- The tire rules
- The Racetrace, Finding Grip, or Predictions cards
- The homepage banner

## Rebuild and deploy

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\arlington-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\arlington-2026"
git add -A
git commit -m "Update from Pre-Event Drivers Briefing 3/12 — formation laps, post-checkered, safety car, qualifying rules"
git push origin main
```
