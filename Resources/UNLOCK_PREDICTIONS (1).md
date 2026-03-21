# Unlock Predictions Section with Qualifying 1 Data

The Predictions card is currently locked/grayed out. Unlock it and populate it with Qualifying 1 results and analysis. All sector times below exclude Lap 1 S1 times (which are artificially fast due to pit exit).

## Step 1: Unlock the card

In the sections array, change the predictions entry from:
```jsx
{ id: "predictions", icon: "🔒", label: "Predictions", desc: "Lap time analysis — coming soon", locked: true },
```
to:
```jsx
{ id: "predictions", icon: "📊", label: "Race 1 Grid", desc: "Q1 results, sector analysis, and theoretical bests" },
```

Remove `locked: true`.

## Step 2: Add the data

Add this near the other data constants in EventsPage.jsx:

```jsx
const q1Results = [
  { pos: 1, num: "22", driver: "Jeremy Fletcher", team: "Copeland Motorsports", best: "2:07.149", gap: "—", laps: 7, s1: 59.787, s2: 40.837, s3: 26.525, theoretical: "2:07.149" },
  { pos: 2, num: "15", driver: "Spike Kohlbecker", team: "TechSport Racing", best: "2:07.311", gap: "+0.162", laps: 7, s1: 59.700, s2: 41.040, s3: 26.345, theoretical: "2:07.085" },
  { pos: 3, num: "2", driver: "Will Robusto", team: "RVA Graphics / Speed Syndicate", best: "2:07.581", gap: "+0.432", laps: 7, s1: 60.045, s2: 40.925, s3: 26.574, theoretical: "2:07.544" },
  { pos: 4, num: "42", driver: "Parker DeLong", team: "TechSport Racing", best: "2:07.688", gap: "+0.539", laps: 8, s1: 59.957, s2: 40.981, s3: 26.514, theoretical: "2:07.452" },
  { pos: 5, num: "5", driver: "Beltre Curtis", team: "Copeland Motorsports", best: "2:07.803", gap: "+0.654", laps: 7, s1: 59.630, s2: 41.067, s3: 26.631, theoretical: "2:07.328" },
  { pos: 6, num: "98", driver: "Max Schweid", team: "RVA Graphics / Speed Syndicate", best: "2:07.969", gap: "+0.820", laps: 7, s1: 60.151, s2: 41.132, s3: 26.666, theoretical: "2:07.949" },
  { pos: 7, num: "12", driver: "Joseph Maley", team: "Eagles Canyon w/ Fast Track", best: "2:08.163", gap: "+1.014", laps: 6, s1: 60.094, s2: 41.252, s3: 26.463, theoretical: "2:07.809" },
  { pos: 8, num: "17", driver: "Malbec Ramos", team: "TechSport Racing", best: "2:08.182", gap: "+1.033", laps: 7, s1: 60.124, s2: 41.380, s3: 26.493, theoretical: "2:07.997" },
  { pos: 9, num: "41", driver: "Jenson Sofronas", team: "Copeland / GMG Racing", best: "2:08.304", gap: "+1.155", laps: 7, s1: 60.087, s2: 41.125, s3: 26.659, theoretical: "2:07.871" },
  { pos: 10, num: "72", driver: "Ethan Goulart", team: "BSI Racing", best: "2:08.768", gap: "+1.619", laps: 6, s1: 60.342, s2: 41.558, s3: 26.810, theoretical: "2:08.710" },
  { pos: 11, num: "21", driver: "Michael Edwards", team: "Eagles Canyon w/ Fast Track", best: "2:09.110", gap: "+1.961", laps: 6, s1: 60.690, s2: 41.796, s3: 26.622, theoretical: "2:09.108" },
  { pos: 12, num: "3", driver: "Zach Hollingshead", team: "Hollingshead Performance", best: "2:09.274", gap: "+2.125", laps: 7, s1: 60.715, s2: 41.370, s3: 26.915, theoretical: "2:09.000" },
  { pos: 13, num: "812", driver: "Maite Caceres", team: "RAFA Racing Team", best: "2:09.345", gap: "+2.196", laps: 7, s1: 60.896, s2: 41.436, s3: 26.813, theoretical: "2:09.145" },
  { pos: 14, num: "865", driver: "Ryan Power", team: "BSI Racing", best: "2:09.547", gap: "+2.398", laps: 7, s1: 60.545, s2: 41.812, s3: 26.901, theoretical: "2:09.258" },
  { pos: 15, num: "93", driver: "Patrick Brunson", team: "Eagles Canyon w/ Fast Track", best: "2:09.662", gap: "+2.513", laps: 7, s1: 60.834, s2: 41.744, s3: 26.792, theoretical: "2:09.370" },
  { pos: 16, num: "041", driver: "Nathan Dupuis", team: "Copeland Motorsports", best: "2:09.988", gap: "+2.839", laps: 7, s1: 60.894, s2: 41.746, s3: 27.118, theoretical: "2:09.758" },
  { pos: 17, num: "85", driver: "Ava Schletz", team: "Eagles Canyon w/ Fast Track", best: "2:10.091", gap: "+2.942", laps: 7, s1: 61.221, s2: 41.638, s3: 26.802, theoretical: "2:09.661" },
  { pos: 18, num: "007", driver: "Amilio DiLauro", team: "BSI Racing", best: "2:10.244", gap: "+3.095", laps: 7, s1: 61.362, s2: 41.881, s3: 26.949, theoretical: "2:10.192" },
  { pos: 19, num: "55", driver: "Liam Harrison", team: "Blackdog Racing", best: "2:10.555", gap: "+3.406", laps: 7, s1: 60.793, s2: 42.261, s3: 26.883, theoretical: "2:09.937" },
  { pos: 20, num: "51", driver: "Massimo Sunseri", team: "BSI Racing", best: "2:10.632", gap: "+3.483", laps: 7, s1: 61.563, s2: 41.826, s3: 27.031, theoretical: "2:10.420" },
  { pos: 21, num: "90", driver: "Carter Wilson", team: "Eagles Canyon w/ Fast Track", best: "2:11.160", gap: "+4.011", laps: 6, s1: 61.280, s2: 42.377, s3: 27.285, theoretical: "2:10.942" },
  { pos: 22, num: "70", driver: "Jay Thomas", team: "Nitro Motorsports", best: "2:11.322", gap: "+4.173", laps: 7, s1: 61.976, s2: 42.106, s3: 27.003, theoretical: "2:11.085" },
  { pos: 23, num: "80", driver: "Paityn Feyen", team: "Copeland Motorsports", best: "2:11.601", gap: "+4.452", laps: 7, s1: 61.860, s2: 42.140, s3: 27.456, theoretical: "2:11.456" },
  { pos: 24, num: "33", driver: "Jason Kos", team: "Dream Machine @ Eagles Canyon", best: "2:11.820", gap: "+4.671", laps: 7, s1: 61.685, s2: 42.209, s3: 27.168, theoretical: "2:11.062" },
  { pos: 25, num: "91", driver: "Paul Wilson", team: "Dream Machine @ Eagles Canyon", best: "2:11.948", gap: "+4.799", laps: 7, s1: 61.807, s2: 42.467, s3: 27.663, theoretical: "2:11.937" },
  { pos: 26, num: "77", driver: "Alcyr Araujo", team: "BSI Racing", best: "2:12.953", gap: "+5.804", laps: 7, s1: 61.988, s2: 42.926, s3: 27.543, theoretical: "2:12.457" },
  { pos: 27, num: "57", driver: "Jeff Curry", team: "Dream Machine @ Eagles Canyon", best: "2:15.700", gap: "+8.551", laps: 6, s1: 63.575, s2: 43.812, s3: 28.313, theoretical: "2:15.700" },
];
```

## Step 3: Build the Predictions view

Add a view block for `view === "predictions"` with this content:

### 3A: Session summary bar
A Card at the top with key stats in a horizontal row (wrapping on mobile):
- **Pole:** Jeremy Fletcher #22
- **Pole Time:** 2:07.149
- **Cars:** 27
- **Top 5 Spread:** 0.654s
- **Top 10 Spread:** 1.619s

### 3B: Full results table
Style to match the On-Track timetable. Table header row with column labels in gray uppercase. Columns:

| Column | Width | Style |
|--------|-------|-------|
| POS | narrow | Bold, amber for top 10 |
| # | narrow | White |
| DRIVER | flex | Bold white |
| TEAM | flex | Gray, smaller — hide on mobile |
| BEST LAP | fixed | White, tabular-nums |
| GAP | fixed | Gray |
| THEORETICAL | fixed | Amber — hide on mobile |

Row 1 (pole) gets amber left border. Each row has a subtle bottom border matching the schedule row style.

### 3C: Best sector times
Three cards in a row (stacking on mobile):

- **Best S1:** #5 Curtis — 59.630s (green accent)
- **Best S2:** #22 Fletcher — 40.837s (green accent)
- **Best S3:** #15 Kohlbecker — 26.345s (green accent)

### 3D: Key insights
A Card with amber left border containing these observations:

- "Fletcher put together a perfect lap — his theoretical best equals his actual best (2:07.149). No time left on the table."
- "Kohlbecker's theoretical (2:07.085) is 0.064s faster than pole — he had the pace but couldn't combine his best sectors on one lap."
- "Curtis posted the fastest S1 (59.630s) but couldn't match it in S2/S3 — watch for him to challenge off the start."
- "DeLong (P4) and Maley (P7) both show theoretical bests inside the top 5 — potential movers in the race."
- "Top 5 separated by just 0.654s — expect close racing into Turn 1."

## Step 4: Do NOT change any other cards, views, or styles.

## Step 5: Rebuild and deploy

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\arlington-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\arlington-2026"
git add -A
git commit -m "Unlock Race 1 Grid with Q1 results and sector analysis"
git push origin main
```
