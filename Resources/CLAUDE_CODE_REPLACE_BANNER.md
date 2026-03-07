# URGENT FIX: Events Banner — Replace Entirely

The Events banner has been "fixed" multiple times but the checkered flag icon is STILL not rendering correctly. It appears as a tiny dark smudge in an amber box. The EVENTS text is still too small. The proportions are still wrong.

**DO NOT try to edit the existing banner HTML.** Instead, DELETE the entire events banner `<a>` element and ALL its contents from the hero section, then paste in the EXACT HTML below. Do not modify this HTML in any way.

## Step 1: Find and DELETE the existing events banner

Search `index.html` for the events banner — it's an `<a>` tag linking to `events.tedderengineering.com` inside the hero section. Delete it entirely, including all child elements.

## Step 2: Paste this EXACT HTML in its place

Insert this block in the hero section, below the orange accent bar, above the scroll-down chevron. **Copy this exactly — do not modify any values:**

```html
<div style="width:100%;display:flex;justify-content:center;padding:0 16px;box-sizing:border-box;margin-top:40px;">
  <a href="https://events.tedderengineering.com" target="_blank" rel="noopener noreferrer"
     id="events-banner"
     style="display:block;text-decoration:none;max-width:520px;width:100%;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px 20px;cursor:pointer;transition:all 0.25s ease;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);"
     onmouseenter="this.style.background='rgba(255,255,255,0.06)';this.style.borderColor='rgba(240,168,72,0.4)';this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 20px rgba(0,0,0,0.3)';document.getElementById('events-arrow').style.color='#F0A848';document.getElementById('events-arrow').style.transform='translateX(3px)';"
     onmouseleave="this.style.background='rgba(255,255,255,0.03)';this.style.borderColor='rgba(255,255,255,0.08)';this.style.transform='translateY(0)';this.style.boxShadow='none';document.getElementById('events-arrow').style.color='rgba(255,255,255,0.25)';document.getElementById('events-arrow').style.transform='translateX(0)';">
    <!-- Top row: icon + EVENTS + arrow -->
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
      <div style="display:flex;align-items:center;justify-content:center;background:rgba(240,168,72,0.12);border:1px solid rgba(240,168,72,0.2);border-radius:8px;padding:6px;flex-shrink:0;width:56px;height:42px;">
        <img src="data:image/png;base64,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" alt="" style="width:40px;height:27px;opacity:0.9;">
      </div>
      <div style="flex:1;">
        <div style="font-size:26px;font-weight:800;color:#F0A848;font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:2px;line-height:1;">EVENTS</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:2px;letter-spacing:0.3px;">Race weekend info &amp; schedules</div>
      </div>
      <div id="events-arrow" style="font-size:20px;color:rgba(255,255,255,0.25);transition:color 0.25s,transform 0.25s;flex-shrink:0;">→</div>
    </div>
    <!-- Bottom: upcoming event -->
    <div style="display:flex;flex-direction:row;gap:16px;align-items:center;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:10px 12px;">
      <div style="flex:1;">
        <div style="font-size:9px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:2px;">Upcoming</div>
        <div style="font-size:14px;color:#F0F0F0;font-weight:700;font-family:'Barlow Condensed',sans-serif;">Grand Prix of Arlington</div>
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,0.5);font-weight:500;white-space:nowrap;">Mar 13–15 · Arlington, TX</div>
    </div>
  </a>
</div>
```

## Step 3: Make sure Barlow Condensed font is loaded

Check that somewhere in the `<head>` of `index.html`, this Google Font is loaded. If it's not already there, add it:

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&display=swap" rel="stylesheet">
```

If the site already loads Barlow Condensed, skip this step.

## Step 4: Mobile responsive

Add this CSS either in the existing `<style>` block or as a new `<style>` block in the `<head>`:

```css
@media (max-width: 480px) {
  #events-banner {
    max-width: 100% !important;
  }
  #events-banner img {
    width: 32px !important;
    height: 22px !important;
  }
}
```

## Step 5: Commit and push

```
git add -A
git commit -m "Fix events banner - complete replacement with correct design"
git push origin main
```

## CRITICAL RULES
1. **DO NOT modify the HTML above.** Paste it exactly.
2. **DO NOT try to "improve" or "clean up" the HTML.** Use it as-is.
3. **DO NOT change the base64 image data.** It is correct and complete.
4. **The entire base64 string starts with `iVBORw0KGgo` and ends with `CYII=`.** If the string in the committed file does not start and end with these exact values, something was truncated.
5. After committing, verify the base64 string length in the HTML file is approximately 6,652 characters (for the image data portion only, not including the `data:image/png;base64,` prefix).
