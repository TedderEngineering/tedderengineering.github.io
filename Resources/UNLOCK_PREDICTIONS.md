# Unlock Predictions with Q1 Results + Race Pace Analysis

## Step 1: Unlock the card

In the sections array, change predictions from:
```jsx
{ id: "predictions", icon: "🔒", label: "Predictions", desc: "Lap time analysis — coming soon", locked: true },
```
to:
```jsx
{ id: "predictions", icon: "📊", label: "Race 1 Grid", desc: "Q1 results, race pace analysis, and conditions" },
```

## Step 2: Add the data

Add near the other data constants:

```jsx
const q1Results = [
  { pos: 1, num: "22", driver: "Jeremy Fletcher", team: "Copeland Motorsports", best: "2:07.149", gap: "—", laps: 7, s1: 59.787, s2: 40.837, s3: 26.525, theoretical: "2:07.149", avgPace: "2:09.6", consistency: 6.18 },
  { pos: 2, num: "15", driver: "Spike Kohlbecker", team: "TechSport Racing", best: "2:07.311", gap: "+0.162", laps: 7, s1: 59.700, s2: 41.040, s3: 26.345, theoretical: "2:07.085", avgPace: "2:07.6", consistency: 0.85 },
  { pos: 3, num: "2", driver: "Will Robusto", team: "RVA Graphics / Speed Syndicate", best: "2:07.581", gap: "+0.432", laps: 7, s1: 60.045, s2: 40.925, s3: 26.574, theoretical: "2:07.544", avgPace: "2:08.7", consistency: 2.54 },
  { pos: 4, num: "42", driver: "Parker DeLong", team: "TechSport Racing", best: "2:07.688", gap: "+0.539", laps: 8, s1: 59.957, s2: 40.981, s3: 26.514, theoretical: "2:07.452", avgPace: "2:08.5", consistency: 3.48 },
  { pos: 5, num: "5", driver: "Beltre Curtis", team: "Copeland Motorsports", best: "2:07.803", gap: "+0.654", laps: 7, s1: 59.630, s2: 41.067, s3: 26.631, theoretical: "2:07.328", avgPace: "2:08.5", consistency: 1.30 },
  { pos: 6, num: "98", driver: "Max Schweid", team: "RVA Graphics / Speed Syndicate", best: "2:07.969", gap: "+0.820", laps: 7, s1: 60.151, s2: 41.132, s3: 26.666, theoretical: "2:07.949", avgPace: "2:09.0", consistency: 2.49 },
  { pos: 7, num: "12", driver: "Joseph Maley", team: "Eagles Canyon w/ Fast Track", best: "2:08.163", gap: "+1.014", laps: 6, s1: 60.094, s2: 41.252, s3: 26.463, theoretical: "2:07.809", avgPace: "2:09.9", consistency: 7.33 },
  { pos: 8, num: "17", driver: "Malbec Ramos", team: "TechSport Racing", best: "2:08.182", gap: "+1.033", laps: 7, s1: 60.124, s2: 41.380, s3: 26.493, theoretical: "2:07.997", avgPace: "2:08.7", consistency: 1.65 },
  { pos: 9, num: "41", driver: "Jenson Sofronas", team: "Copeland / GMG Racing", best: "2:08.304", gap: "+1.155", laps: 7, s1: 60.087, s2: 41.125, s3: 26.659, theoretical: "2:07.871", avgPace: "2:08.9", consistency: 2.06 },
  { pos: 10, num: "72", driver: "Ethan Goulart", team: "BSI Racing", best: "2:08.768", gap: "+1.619", laps: 6, s1: 60.342, s2: 41.558, s3: 26.810, theoretical: "2:08.710", avgPace: "2:09.4", consistency: 1.34 },
  { pos: 11, num: "21", driver: "Michael Edwards", team: "Eagles Canyon w/ Fast Track", best: "2:09.110", gap: "+1.961", laps: 6, s1: 60.690, s2: 41.796, s3: 26.622, theoretical: "2:09.108", avgPace: "—", consistency: 0 },
  { pos: 12, num: "3", driver: "Zach Hollingshead", team: "Hollingshead Performance", best: "2:09.274", gap: "+2.125", laps: 7, s1: 60.715, s2: 41.370, s3: 26.915, theoretical: "2:09.000", avgPace: "—", consistency: 0 },
  { pos: 13, num: "812", driver: "Maite Caceres", team: "RAFA Racing Team", best: "2:09.345", gap: "+2.196", laps: 7, s1: 60.896, s2: 41.436, s3: 26.813, theoretical: "2:09.145", avgPace: "—", consistency: 0 },
  { pos: 14, num: "865", driver: "Ryan Power", team: "BSI Racing", best: "2:09.547", gap: "+2.398", laps: 7, s1: 60.545, s2: 41.812, s3: 26.901, theoretical: "2:09.258", avgPace: "—", consistency: 0 },
  { pos: 15, num: "93", driver: "Patrick Brunson", team: "Eagles Canyon w/ Fast Track", best: "2:09.662", gap: "+2.513", laps: 7, s1: 60.834, s2: 41.744, s3: 26.792, theoretical: "2:09.370", avgPace: "—", consistency: 0 },
  { pos: 16, num: "041", driver: "Nathan Dupuis", team: "Copeland Motorsports", best: "2:09.988", gap: "+2.839", laps: 7, s1: 60.894, s2: 41.746, s3: 27.118, theoretical: "2:09.758", avgPace: "—", consistency: 0 },
  { pos: 17, num: "85", driver: "Ava Schletz", team: "Eagles Canyon w/ Fast Track", best: "2:10.091", gap: "+2.942", laps: 7, s1: 61.221, s2: 41.638, s3: 26.802, theoretical: "2:09.661", avgPace: "—", consistency: 0 },
  { pos: 18, num: "007", driver: "Amilio DiLauro", team: "BSI Racing", best: "2:10.244", gap: "+3.095", laps: 7, s1: 61.362, s2: 41.881, s3: 26.949, theoretical: "2:10.192", avgPace: "—", consistency: 0 },
  { pos: 19, num: "55", driver: "Liam Harrison", team: "Blackdog Racing", best: "2:10.555", gap: "+3.406", laps: 7, s1: 60.793, s2: 42.261, s3: 26.883, theoretical: "2:09.937", avgPace: "—", consistency: 0 },
  { pos: 20, num: "51", driver: "Massimo Sunseri", team: "BSI Racing", best: "2:10.632", gap: "+3.483", laps: 7, s1: 61.563, s2: 41.826, s3: 27.031, theoretical: "2:10.420", avgPace: "—", consistency: 0 },
  { pos: 21, num: "90", driver: "Carter Wilson", team: "Eagles Canyon w/ Fast Track", best: "2:11.160", gap: "+4.011", laps: 6, s1: 61.280, s2: 42.377, s3: 27.285, theoretical: "2:10.942", avgPace: "—", consistency: 0 },
  { pos: 22, num: "70", driver: "Jay Thomas", team: "Nitro Motorsports", best: "2:11.322", gap: "+4.173", laps: 7, s1: 61.976, s2: 42.106, s3: 27.003, theoretical: "2:11.085", avgPace: "—", consistency: 0 },
  { pos: 23, num: "80", driver: "Paityn Feyen", team: "Copeland Motorsports", best: "2:11.601", gap: "+4.452", laps: 7, s1: 61.860, s2: 42.140, s3: 27.456, theoretical: "2:11.456", avgPace: "—", consistency: 0 },
  { pos: 24, num: "33", driver: "Jason Kos", team: "Dream Machine @ Eagles Canyon", best: "2:11.820", gap: "+4.671", laps: 7, s1: 61.685, s2: 42.209, s3: 27.168, theoretical: "2:11.062", avgPace: "—", consistency: 0 },
  { pos: 25, num: "91", driver: "Paul Wilson", team: "Dream Machine @ Eagles Canyon", best: "2:11.948", gap: "+4.799", laps: 7, s1: 61.807, s2: 42.467, s3: 27.663, theoretical: "2:11.937", avgPace: "—", consistency: 0 },
  { pos: 26, num: "77", driver: "Alcyr Araujo", team: "BSI Racing", best: "2:12.953", gap: "+5.804", laps: 7, s1: 61.988, s2: 42.926, s3: 27.543, theoretical: "2:12.457", avgPace: "—", consistency: 0 },
  { pos: 27, num: "57", driver: "Jeff Curry", team: "Dream Machine @ Eagles Canyon", best: "2:15.700", gap: "+8.551", laps: 6, s1: 63.575, s2: 43.812, s3: 28.313, theoretical: "2:15.700", avgPace: "—", consistency: 0 },
];
```

## Step 3: Build the view

The predictions view should have these sections in order. Use the same Card component and styling as other views:

### 3A: Race Info Bar
A horizontal card showing key race facts:
- **Race 1** · Saturday March 14 · Green Flag 11:20 AM CT
- **Duration:** 45 minutes
- **Estimated Laps:** ~19
- **Cars:** 27
- **Formation Laps:** 1

### 3B: Conditions Card
A Card with weather and track info:

**Weather:**
- Saturday forecast: Sunny, high ~83°F. South wind 10-15 mph, gusts to 30 mph.
- At race time (11:20 AM): ~75-80°F, breezy. DRY conditions expected.

**Track Conditions:**
- Street circuit — more rubber on the surface than qualifying. Grip should improve.
- Breezy south wind could affect handling in exposed sections.

**Tire Status:**
- Starting on USED qualifying tires (~7 laps of wear)
- No tire changes during 45-minute sprint race
- 2 sets per event total — both sets now have qualifying laps on them
- Expect 1-2s per lap degradation by end of race vs qualifying pace
- Continental spec tire has a wide operating window but street circuit abrasion is high

### 3C: Race Pace Prediction
A Card titled "RACE PACE ANALYSIS" showing the top 10 drivers ranked by expected race pace, NOT qualifying position. Show this as a compact table:

| Rank | Grid | # | Driver | Avg Pace | Consistency | Notes |
|------|------|---|--------|----------|-------------|-------|
| 1 | P2 | 15 | Kohlbecker | 2:07.6 | 0.85s ★ | Best avg, most consistent, minimal deg |
| 2 | P5 | 5 | Curtis | 2:08.5 | 1.30s | Fast avg, very consistent, flat deg |
| 3 | P10 | 72 | Goulart | 2:09.4 | 1.34s | Very consistent, potential mover |
| 4 | P8 | 17 | Ramos | 2:08.7 | 1.65s | Solid pace, consistent |
| 5 | P9 | 41 | Sofronas | 2:08.9 | 2.06s | Good avg, moderate consistency |
| 6 | P6 | 98 | Schweid | 2:09.0 | 2.49s | Decent avg, some variance |
| 7 | P3 | 2 | Robusto | 2:08.7 | 2.54s | Strong avg, moderate consistency |
| 8 | P4 | 42 | DeLong | 2:08.5 | 3.48s | Fast but inconsistent |
| 9 | P1 | 22 | Fletcher | 2:09.6 | 6.18s ⚠️ | POLE but worst consistency of top 10 |
| 10 | P7 | 12 | Maley | 2:09.9 | 7.33s ⚠️ | Large variance, late-stint struggles |

Consistency column: green accent for <1.5s, amber for 1.5-3s, red for >3s. Star (★) for best consistency, warning (⚠️) for worst.

### 3D: Race Grid (full results table)
Same table as before — all 27 drivers. Columns: POS, #, DRIVER, TEAM (hide mobile), BEST LAP, GAP, THEORETICAL (hide mobile). Pole row gets amber left border.

### 3E: Best Sector Times
Three cards side by side (stack mobile):
- **Best S1:** #5 Curtis — 59.630s
- **Best S2:** #22 Fletcher — 40.837s
- **Best S3:** #15 Kohlbecker — 26.345s
Green accent for each.

### 3F: Key Insights
Card with amber left border:

- "Kohlbecker (P2) has the best race pace of the field — 2:07.6 average with just 0.85s variation. If he gets past Fletcher off the start, he'll be hard to catch."
- "Fletcher (Pole) is a fast qualifier but the least consistent in the top 10 — 6.18s range with a 2:09.6 average. He may struggle under pressure from more consistent runners."
- "Curtis (P5) and Goulart (P10) are potential movers — both show strong, consistent race pace that could carry them forward."
- "DeLong (P4) and Maley (P7) have the raw pace but high variance — expect exciting but unpredictable drives."
- "Starting on used qualifying tires adds an unknown — drivers who managed their rubber in Q1 have an advantage. Late-stint degradation could shuffle the top 10."
- "Estimated ~19 racing laps. With a 45-minute race on a street circuit, tire management and avoiding incidents at Turn 1 will decide the winner."

## Step 4: Do NOT change any other cards, views, or styles.

## Step 5: Rebuild and deploy

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\arlington-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\arlington-2026"
git add -A
git commit -m "Unlock Race 1 Grid with results, race pace analysis, and conditions"
git push origin main
```
