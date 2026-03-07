# Add Rules Search and Live Viewing to Events Dashboard

Add two new cards to the dashboard. They must look IDENTICAL to the existing cards (Schedule, On-Track, Procedures, Tires & Tech). Same border style, same font sizes, same padding, same layout. Do NOT change any existing card's style, text, icon, or position.

## Part 1: Add entries to the sections array

In events-build/src/EventsPage.jsx, find the `sections` array inside the ArlingtonWeekendSummary component. It currently has entries for schedule, ontrack, procedures, tires, racetrace, and predictions.

Add these two entries AFTER tires and BEFORE racetrace:

```jsx
{ id: "rules", icon: "⚖️", label: "Rules Search", desc: "Search the Sporting and Technical Regulations" },
{ id: "live", icon: "📺", label: "Live Viewing", desc: "Watch sessions live — links coming soon" },
```

Do NOT change any existing entries. The order should be: schedule, ontrack, procedures, tires, rules, live, racetrace, predictions.

## Part 2: Extract regulation text from PDFs

The regulation PDFs are image-based and need OCR. The files are in the project resources:
- `2026_Toyota_GR_Cup_Sporting_Regulations_CHRONOLOGICAL_DRAFT_260123.pdf` (84 pages)
- `2026_GR_Cup_Technical_Regulations_FINAL.pdf` (36 pages)

Write a Node or Python script that:
1. Renders each page as an image
2. OCRs each page
3. Parses the text into sections using the pattern: section numbers like "1.1", "15.3", "28.18" at the start of lines, grouped under chapter titles like "15. TIRES" (number followed by ALL CAPS title)
4. Outputs two JSON files with this structure:
```json
[
  { "section": "15.1", "title": "TIRES", "text": "Full text of section..." },
  { "section": "15.2", "title": "TIRES", "text": "Full text of section..." }
]
```

Save as `src/data/sporting-regulations.json` and `src/data/technical-regulations.json`.

If OCR is too difficult to set up, an alternative approach: use pdf-to-text tools like `pdf2json`, `pdfjs-dist`, or `pdf-parse`. Try those first — if the PDFs have any embedded text layer, that's faster than OCR.

## Part 3: Build the Rules Search view

Create the Rules Search component. The design spec is in the project resources as `RulesSearchDemo.jsx` — follow that design exactly. Key elements:

- Search input with Search button
- Results grouped: Sporting Regulations (amber #F0A848 accent) and Technical Regulations (blue #70B0E0 accent)
- Each result shows: section number badge (e.g. §15.3), chapter title, full section text
- Matched search terms highlighted with amber background
- Summary at bottom listing all matching section numbers from both documents
- Quick links to download full PDF documents (link to grcupportal.com or host the PDFs in the repo)

Add the view rendering in EventsPage.jsx where the other views are:
```jsx
{view === "rules" && (
  <div className="te-section-pad">
    <RulesSearch />
  </div>
)}
```

## Part 4: Build the Live Viewing view

Simple coming-soon placeholder. Add this view rendering:

```jsx
{view === "live" && (
  <div className="te-section-pad">
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📺</div>
      <h2 style={{ fontFamily: font, fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: C.white, margin: "0 0 8px" }}>Live Viewing</h2>
      <div style={{ fontSize: 13, color: C.gray, maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.7 }}>
        Live streaming links for each session will be posted here once the series publishes them. Toyota GR Cup races are streamed live on YouTube.
      </div>
      <Card>
        <div style={{ fontSize: 10, color: C.grayDark, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 4 }}>Race Weekend Sessions</div>
        <div style={{ fontSize: 13, color: C.grayLight, lineHeight: 1.8 }}>
          <div><strong style={{ color: C.white }}>Race 1:</strong> Saturday March 14, 11:20 AM CT</div>
          <div><strong style={{ color: C.white }}>Race 2:</strong> Sunday March 15, 8:00 AM CT</div>
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: C.grayDark, fontStyle: "italic" }}>Check back closer to the event for streaming links.</div>
      </Card>
    </div>
  </div>
)}
```

## Part 5: CRITICAL — Do not change existing cards

After making all changes, verify:
- The Schedule, On-Track, Procedures, Tires & Tech cards have the SAME icon, label, description text, border color, font size, and padding as before
- The Racetrace card still has teal accent, "OPEN APP" badge, and the SVG trace icon
- The Predictions card is still grayed out and locked
- The new Rules Search and Live Viewing cards match the style of Schedule/On-Track/Procedures/Tires (amber left border, same card background, same font sizes)

## Part 6: Rebuild and deploy

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\arlington-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\arlington-2026"
git add -A
git commit -m "Add Rules Search and Live Viewing cards"
git push origin main
```
