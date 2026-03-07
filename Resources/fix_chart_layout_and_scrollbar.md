# Chart Page Layout Fixes — Two Prompts
# Save this file to resources/ and run prompts in order.
# Run PROMPT 1 first, verify, commit, then run PROMPT 2.

===================================================================
PROMPT 1 — Fix Right Panel: Opens Outside Chart, Pushes Chart Left
===================================================================
RISK: Medium | VERIFY: Panel slides in from right edge, chart narrows

DISCOVER: Find the layout component that contains the chart and the
right-side panels (Position Change, Gap Evolution, H2H, Pit Cycle).
Run:
```bash
grep -rn "sidePanel\|rightPanel\|RightPanel\|PassEventPanel\|GapEvolution\|HeadToHead\|PitCycle\|panel.*width\|panel.*position\|absolute\|fixed.*right" client/src --include="*.tsx" --include="*.ts" -l
```

Read the chart page layout component. Report:
- The exact CSS positioning of the right panel container (absolute?
  fixed? relative? inside a flex row?)
- Whether the chart and right panel share a flex row parent or whether
  the panel is positioned over the chart with absolute/fixed positioning
- The left sidebar component — how does it push the chart left? (flex
  row with sidebar + chart as siblings, or transform/margin on chart?)
- The current width of the right panel when open

CHANGE: Make the right panel behave identically to the left sidebar —
it sits as a flex sibling to the chart, not overlaid on top of it.

1. Wrap the chart area and right panel in a flex row (if not already):
   ```
   [left sidebar] [chart flex:1] [right panel 480px]
   ```
   The right panel has width 0 when closed (overflow hidden) and 480px
   when open, with a slide-in transition (0.18s ease-out) — identical
   pattern to the left sidebar.

2. Remove any absolute or fixed positioning on the right panel container.
   It must be a normal flex child so the chart naturally narrows when
   the panel opens.

3. The right panel should be anchored to the right edge of the viewport,
   full height of the chart area (from below the tab bar to above the
   bottom data bar).

4. Do not change the left sidebar behavior. Do not touch chart rendering.

VERIFY:
- Click any bottom bar zone that opens a panel → panel slides in from
  the right edge of the screen, chart narrows to the left
- Chart content is not hidden under the panel
- Left sidebar still pushes chart right when opened
- Both panels open simultaneously: chart narrows from both sides
- Panel closes: chart expands back to full width smoothly
Run: npm run build — zero TypeScript errors.
Git commit: "fix: right side panels open outside chart area, push chart left"

===================================================================
PROMPT 2 — Fix Duplicate Scrollbar
===================================================================
RISK: Low | VERIFY: Only one scrollbar visible on chart page

DISCOVER: Find the container causing the inner/left scrollbar. Run:
```bash
grep -rn "overflow.*auto\|overflow.*scroll\|overflowY" client/src --include="*.tsx" --include="*.ts" --include="*.css" | grep -v node_modules
```

Read the chart page layout component. Report:
- Every container that has overflow-y: auto, overflow-y: scroll, or
  overflow: auto/scroll set
- Which container is the correct one that should scroll (the page root)
- Which container is the inner one creating the duplicate scrollbar
- Whether the inner container has a fixed or min height forcing it to
  scroll independently

CHANGE: Remove the inner scrollbar.

On the container identified as the source of the inner/left scrollbar:
- Change overflow-y: auto or overflow-y: scroll to overflow-y: visible
  or overflow: hidden — whichever does not break the layout
- If the container needs to fill height without scrolling, ensure it
  uses height: 100% or flex: 1 rather than a fixed pixel height

Do not change the outermost page scroll container.
Do not change any chart rendering logic.

VERIFY:
- Chart page shows only one scrollbar (browser native, rightmost)
- Page still scrolls normally
- No content clipped or hidden
- Both sidebars still open and close correctly
Run: npm run build — zero TypeScript errors.
Git commit: "fix: remove duplicate inner scrollbar on chart page"
