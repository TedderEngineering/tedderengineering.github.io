Update the Finding Grip card on the events dashboard to match the new design. The Finding Grip icon image is in the project resources as `findinggrip-icon.png`.

## Step 1: Copy the icon image

Copy `findinggrip-icon.png` from the project resources into `events-build/public/findinggrip-icon.png` as a binary file.

## Step 2: Update the sections array

In events-build/src/EventsPage.jsx, find the findinggrip entry in the sections array. Make sure the order is: schedule, ontrack, procedures, tires, rules, live, racetrace, findinggrip, predictions.

The findinggrip entry should be:
```jsx
{ id: "findinggrip", icon: "grip", label: "Finding Grip", desc: "Tire pressures & damper tuning" },
```

## Step 3: Replace the Finding Grip card rendering

In the sections.map block where nav cards render, the Finding Grip card must be a special case — it contains app store links directly on the card, no navigation to a separate view.

Find where the findinggrip card renders. Replace it so that when `s.id === "findinggrip"`, it renders this instead of the normal card:

```jsx
<div key={s.id} style={{
  background: "linear-gradient(135deg, #1A0D00 0%, #2D1A0A 40%, #333333 100%)",
  border: "1px solid rgba(255,107,0,0.35)",
  borderRadius: 10, padding: "20px 18px",
  borderLeft: "4px solid #FF6B00",
}}>
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
    <img src="/events/arlington-2026/findinggrip-icon.png" alt="" style={{ width: 40, height: 40, borderRadius: 10 }} />
    <div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#FF6B00", fontFamily: font, textTransform: "uppercase", letterSpacing: 1.5, lineHeight: 1 }}>Finding Grip</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>Tire pressures & damper tuning</div>
    </div>
  </div>
  <div style={{ display: "flex", gap: 8 }}>
    <a href="https://apps.apple.com/us/app/finding-grip/id6737082707" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: 8, padding: "12px 14px", textDecoration: "none", cursor: "pointer" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#F0F0F0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
      <span style={{ fontSize: 14, color: "#F0F0F0", fontWeight: 700, fontFamily: font }}>iPhone</span>
    </a>
    <a href="https://play.google.com/store/apps/details?id=com.findinggrip&hl=en_US" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: 8, padding: "12px 14px", textDecoration: "none", cursor: "pointer" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#F0F0F0"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.56.69.56 1.19s-.22.92-.56 1.19l-1.97 1.13-2.5-2.5 2.5-2.5 1.97 1.49zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/></svg>
      <span style={{ fontSize: 14, color: "#F0F0F0", fontWeight: 700, fontFamily: font }}>Android</span>
    </a>
  </div>
</div>
```

## Step 4: Remove the Finding Grip view page

If there is a `{view === "findinggrip" && (...)}` block, delete it entirely. The card links directly to the app stores — no separate view page needed.

## Step 5: Do not change anything else

Do not change any other cards, styles, views, or the Racetrace card.

## Step 6: Rebuild and deploy

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
cd "../tedderengineering-site"
rmdir /s /q events\arlington-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\arlington-2026"
git add -A
git commit -m "Update Finding Grip card with app icon and store buttons"
git push origin main
```
