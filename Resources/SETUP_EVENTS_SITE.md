# Set Up tedderengineering.com/events

The events portal is a React app that will live at tedderengineering.com/events as a subdirectory of the existing GitHub Pages site. No new repo, no DNS changes needed.

## Step 1: Create the Vite project

Create a temp build directory:

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data"
npm create vite@latest events-build -- --template react
cd events-build
npm install
```

## Step 2: Install the app component

1. Delete `src/App.css`, `src/index.css`, and the default content of `src/App.jsx`
2. Copy `EventsPage.jsx` from the project resources into `src/EventsPage.jsx`
3. Replace `src/App.jsx` with:

```jsx
import EventsPage from './EventsPage'
export default function App() {
  return <EventsPage />
}
```

4. Update `index.html` in the project root:
   - Title: `Events | Tedder Engineering`
   - Meta description: `Race weekend dashboards, schedules, and technical info for Tedder Engineering events`
   - Add to body tag: `style="background:#232323;margin:0"`
   - Remove any default CSS link tags

## Step 3: Fix the storage API

There are exactly 2 occurrences of `window.storage` in EventsPage.jsx.

Find occurrence 1 (inside a useEffect):
```jsx
const r = await window.storage.get("arlington_last_section");
if (r && r.value) setLastVisited(r.value);
```
Replace with:
```jsx
const r = localStorage.getItem("arlington_last_section");
if (r) setLastVisited(r);
```
Remove `async` from the wrapping arrow function.

Find occurrence 2 (inside navigateTo):
```jsx
await window.storage.set("arlington_last_section", id);
```
Replace with:
```jsx
localStorage.setItem("arlington_last_section", id);
```
Remove `async` from navigateTo if it was only async for this.

## Step 4: Set the base path and build

In `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/events/',
})
```

The `base: '/events/'` is critical — it tells Vite that all assets will be served from the /events/ subdirectory.

Build:
```
npm run build
```

## Step 5: Deploy to the existing site

Copy the built files into the main site repo:

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site"
```

If an `events` directory already exists, delete it first. Then:

```
cp -r "../events-build/dist" "./events"
```

Or on Windows:
```
xcopy /E /I /Y "..\events-build\dist" ".\events"
```

Then commit and push:
```
git add events/
git commit -m "Add events portal at /events"
git push origin main
```

GitHub Pages will deploy automatically. The events app will be live at tedderengineering.com/events within about 60 seconds.

## Step 6: Update the homepage banner link

In index.html, find the events banner link:
```
href="https://events.tedderengineering.com"
```
Change it to:
```
href="/events/"
```
Also change `target="_blank"` to remove it (or keep it — your choice, since it's the same site now).

Commit and push again.

## Step 7: Verify

- tedderengineering.com/events loads the dashboard
- Countdown timer is running
- All 4 sections work (Schedule, On-Track, Procedures, Tires & Tech)
- Racetrace card links to racetrace.tedderengineering.com
- Predictions card is grayed out
- Homepage banner links to /events/
- Mobile responsive at 375px width

Report results.
