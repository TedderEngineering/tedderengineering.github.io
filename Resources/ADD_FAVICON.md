Add the Tedder Engineering checkered flag favicon to both the main site and the events site.

## Part 1: Main site (tedderengineering.com)

1. Copy favicon.ico from the project resources into the root of the tedderengineering-site repo. Binary file — copy as binary.
2. Copy favicon-256.png from the project resources into the root of the tedderengineering-site repo. Binary file.
3. In index.html, find any existing favicon link tags in the head and replace them with:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="256x256" href="/favicon-256.png">
```

If there are no existing favicon tags, add those two lines inside the head.

## Part 2: Events site (tedderengineering.com/events/arlington-2026/)

1. Copy favicon.ico from the project resources into events-build/public/favicon.ico replacing the default Vite favicon. Binary file.
2. Copy favicon-256.png from the project resources into events-build/public/favicon-256.png. Binary file.
3. In events-build/index.html, find any existing favicon link tags in the head and replace them with:

```html
<link rel="icon" type="image/x-icon" href="/events/arlington-2026/favicon.ico">
<link rel="icon" type="image/png" sizes="256x256" href="/events/arlington-2026/favicon-256.png">
```

4. Rebuild the events site:
```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/events-build"
npm run build
```

5. Copy the build into the main site repo:
```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site"
rmdir /s /q events\arlington-2026
xcopy /E /I /Y "..\events-build\dist" ".\events\arlington-2026"
```

## Part 3: Commit and push everything together

```
cd "C:/Users/TE/Documents/2026 Projects/WRL Data/tedderengineering-site"
git add -A
git commit -m "Add checkered flag favicon to main site and events site"
git push origin main
```
