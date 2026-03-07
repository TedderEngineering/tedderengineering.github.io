In EventsPage.jsx (in events-build/src/), find the On-Track section. It starts with:

```jsx
{view === "ontrack" && (
```

Right after the `<SectionTitle>On-Track Timetable</SectionTitle>` line and BEFORE the gray description text, add this block:

```jsx
<a href="https://www.indynxt.com/-/media/IndyCar/Schedules/TrackMaps/Arlington_TrackMap.jpg"
   target="_blank" rel="noopener noreferrer"
   style={{
     display: "flex", alignItems: "center", justifyContent: "space-between",
     background: "rgba(240,168,72,0.08)", border: `1px solid ${C.accent}40`,
     borderRadius: 8, padding: "14px 18px", marginBottom: 20,
     textDecoration: "none", cursor: "pointer",
     transition: "all 0.2s ease",
   }}
   onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,168,72,0.15)"; e.currentTarget.style.borderColor = C.accent; }}
   onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,168,72,0.08)"; e.currentTarget.style.borderColor = C.accent + "40"; }}
>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ fontSize: 22 }}>🗺️</span>
    <div>
      <div style={{ fontSize: 18, fontWeight: 800, color: C.accent, fontFamily: font, textTransform: "uppercase", letterSpacing: 1.5 }}>Official Track Map</div>
      <div style={{ fontSize: 11, color: C.grayLight, marginTop: 2 }}>Arlington Street Circuit — 2.73 mi / 14 turns</div>
    </div>
  </div>
  <span style={{ fontSize: 18, color: C.accent }}>↗</span>
</a>
```

Then rebuild and redeploy:

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events
xcopy /E /I /Y "..\events-build\dist" ".\events"
git add -A
git commit -m "Add official track map link to on-track page"
git push origin main
```
