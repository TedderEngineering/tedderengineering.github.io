import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#2B2B2B", card: "#333333", cardAlt: "#3A3A3A",
  border: "#4A4A4A", borderLight: "#585858",
  accent: "#F0A848", accentLight: "#F5C070", accentDark: "#D89030",
  green: "#6EC86E", red: "#E86060", blue: "#70B0E0",
  white: "#F0F0F0", grayLight: "#C0C0C0", gray: "#949494", grayDark: "#707070",
};
const font = "'Barlow Condensed', sans-serif";

// All times CDT (UTC-5)
const tz = "-05:00";
const t = (dateStr, timeStr) => {
  const secs = timeStr.split(":").length === 3 ? "" : ":00";
  return new Date(`2026-${dateStr}T${timeStr}${secs}${tz}`);
};
const minus = (date, mins) => new Date(date.getTime() - mins * 60000);

// ── DATA: Same format as offTrackData on the full schedule ──
// Grouped by day, each item has time + event label
// alert: true = "Cars to Pre-Grid" items get ⚡ lightning bolt like changed items on full schedule
// bold: true = key moments (session start, green flag, etc.)
// green: true = session start / green flag
// red: true = pre-grid close

const mxmData = [
  {
    day: "FRI 3/13",
    dayDate: "03-13",
    sections: [
      {
        header: "Practice 1 (30 min)",
        items: [
          { time: t("03-13","08:10"), label: "Pre-Grid Open (Cars & Pit Equipment)" },
          { time: minus(t("03-13","08:45"), 10), label: "⚡ Cars to Pre-Grid", alert: true },
          { time: t("03-13","08:45"), label: "Pit Equipment Transit to Pit Lane" },
          { time: t("03-13","09:05"), label: "Start of Session", bold: true, green: true },
          { time: t("03-13","09:35"), label: "End of Session", bold: true },
        ],
      },
      {
        header: "Practice 2 ★ (30 min)",
        items: [
          { time: t("03-13","11:40"), label: "Pre-Grid Open (Cars & Pit Equipment)" },
          { time: minus(t("03-13","12:15"), 10), label: "⚡ Cars to Pre-Grid", alert: true },
          { time: t("03-13","12:15"), label: "Pit Equipment Transit to Pit Lane" },
          { time: t("03-13","12:35"), label: "Start of Session", bold: true, green: true },
          { time: t("03-13","13:05"), label: "End of Session", bold: true },
        ],
      },
      {
        header: "Qualifying 1 → Race 1 Grid (15 min)",
        items: [
          { time: t("03-13","15:50"), label: "Pre-Grid Open" },
          { time: minus(t("03-13","16:25"), 10), label: "⚡ Cars to Pre-Grid", alert: true },
          { time: t("03-13","16:25"), label: "Transit to Pit Lane" },
          { time: t("03-13","16:45"), label: "Start of Session", bold: true, green: true },
          { time: t("03-13","17:00"), label: "End of Session", bold: true },
        ],
      },
    ],
  },
  {
    day: "SAT 3/14",
    dayDate: "03-14",
    sections: [
      {
        header: "Race 1 (45 min)",
        items: [
          { time: t("03-14","10:10"), label: "Pre-Grid Open" },
          { time: minus(t("03-14","10:40"), 10), label: "⚡ Cars to Pre-Grid", alert: true },
          { time: t("03-14","10:40"), label: "Pre-Grid Close", bold: true, red: true },
          { time: t("03-14","10:50"), label: "Pit Equipment Transit to Pit Lane" },
          { time: t("03-14","11:00"), label: "Release Cars to Grid (Pit Lane)" },
          { time: t("03-14","11:10:45"), label: "FIVE MINUTE WARNING", bold: true },
          { time: t("03-14","11:12:45"), label: "3 Minute Warning" },
          { time: t("03-14","11:14:45"), label: "1 Minute Warning", bold: true },
          { time: t("03-14","11:15:45"), label: "DSYE COMMAND", bold: true },
          { time: t("03-14","11:16"), label: "Start of Formation Lap" },
          { time: t("03-14","11:20"), label: "GREEN FLAG", bold: true, green: true },
          { time: t("03-14","12:05"), label: "CHECKERED FLAG (Approx)", bold: true },
        ],
      },
      {
        header: "Qualifying 2 → Race 2 Grid (15 min)",
        items: [
          { time: t("03-14","15:25"), label: "Pre-Grid Open" },
          { time: minus(t("03-14","16:00"), 10), label: "⚡ Cars to Pre-Grid", alert: true },
          { time: t("03-14","16:00"), label: "Transit to Pit Lane" },
          { time: t("03-14","16:20"), label: "Start of Session", bold: true, green: true },
          { time: t("03-14","16:35"), label: "End of Session", bold: true },
        ],
      },
    ],
  },
  {
    day: "SUN 3/15",
    dayDate: "03-15",
    sections: [
      {
        header: "Race 2 (45 min)",
        items: [
          { time: t("03-15","06:50"), label: "Pre-Grid Open" },
          { time: minus(t("03-15","07:20"), 10), label: "⚡ Cars to Pre-Grid", alert: true },
          { time: t("03-15","07:20"), label: "Pre-Grid Close", bold: true, red: true },
          { time: t("03-15","07:30"), label: "Pit Equipment Transit to Pit Lane" },
          { time: t("03-15","07:40"), label: "Release Cars to Grid (Pit Lane)" },
          { time: t("03-15","07:50:45"), label: "FIVE MINUTE WARNING", bold: true },
          { time: t("03-15","07:52:45"), label: "3 Minute Warning" },
          { time: t("03-15","07:54:45"), label: "1 Minute Warning", bold: true },
          { time: t("03-15","07:55:45"), label: "DSYE COMMAND", bold: true },
          { time: t("03-15","07:56"), label: "Start of Formation Lap" },
          { time: t("03-15","08:00"), label: "GREEN FLAG", bold: true, green: true },
          { time: t("03-15","08:45"), label: "CHECKERED FLAG (Approx)", bold: true },
        ],
      },
    ],
  },
];

// Day end dates for strikethrough (same pattern as full schedule)
const dayEndDates = {
  "FRI 3/13": new Date("2026-03-13T23:59:00-05:00"),
  "SAT 3/14": new Date("2026-03-14T23:59:00-05:00"),
  "SUN 3/15": new Date("2026-03-15T23:59:00-05:00"),
};

// ── FORMAT TIME ──
function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
}

// ── INLINE COUNTDOWN (right side of each row) ──
function Countdown({ target }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  parts.push(`${String(hrs).padStart(2, "0")}h`);
  parts.push(`${String(mins).padStart(2, "0")}m`);
  parts.push(`${String(secs).padStart(2, "0")}s`);

  const urgent = diff < 600000;
  const soon = diff < 3600000;

  return (
    <span style={{
      fontSize: 12, fontFamily: font, fontVariantNumeric: "tabular-nums",
      color: urgent ? C.red : soon ? C.accent : C.gray,
      fontWeight: urgent ? 800 : 600,
      whiteSpace: "nowrap",
    }}>
      T-{parts.join(" ")}
    </span>
  );
}

// ── NEXT SESSION BANNER ──
function NextSessionBanner({ sectionHeader, alertItem, dayLabel }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = alertItem.time.getTime() - now.getTime();
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const urgent = diff < 600000;

  return (
    <div style={{
      background: urgent ? `${C.red}20` : `${C.accent}15`,
      border: `2px solid ${urgent ? C.red : C.accent}`,
      borderRadius: 10, padding: "20px 24px", marginBottom: 20,
      textAlign: "center",
      animation: urgent ? "pulse 1.5s ease-in-out infinite" : "none",
    }}>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.85; } }`}</style>
      <div style={{ fontSize: 10, color: urgent ? C.red : C.accent, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>
        {urgent ? "⚠️ CARS TO PRE-GRID NOW" : "⚡ Next Up — Cars to Pre-Grid"}
      </div>
      <div style={{ fontSize: 16, color: C.white, fontWeight: 700, fontFamily: font, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
        {sectionHeader}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {[
          [days, "DAYS"],
          [hrs, "HRS"],
          [mins, "MIN"],
          [secs, "SEC"],
        ].map(([val, label]) => (
          <div key={label} style={{ minWidth: 52 }}>
            <div style={{
              fontSize: 32, fontWeight: 800, fontFamily: font, lineHeight: 1,
              color: urgent ? C.red : C.accent,
              fontVariantNumeric: "tabular-nums",
            }}>
              {String(val).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 9, color: C.grayDark, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 2, fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: C.gray, marginTop: 10 }}>
        {dayLabel} · {formatTime(alertItem.time)} CT
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──
// Layout matches the Full Weekend Schedule EXACTLY:
// - Day headers: amber, uppercase, bold, 3px left border, same font
// - Rows: 120px time column | event text | countdown on right
// - ⚡ prefix on alert items (same as changed items on full schedule)
// - Past items: strikethrough + faded
// - Session sub-headers within each day

export default function MinuteByMinute() {
  const [now, setNow] = useState(new Date());
  const nextRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (nextRef.current) {
      nextRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Find next upcoming "Cars to Pre-Grid" alert
  let nextAlert = null;
  let nextSectionHeader = null;
  let nextDayLabel = null;
  let nextSectionKey = null;
  outer: for (const day of mxmData) {
    for (const section of day.sections) {
      const alertItem = section.items.find(it => it.alert);
      if (alertItem && alertItem.time.getTime() > now.getTime()) {
        nextAlert = alertItem;
        nextSectionHeader = section.header;
        nextDayLabel = day.day;
        nextSectionKey = `${day.day}-${section.header}`;
        break outer;
      }
    }
  }

  return (
    <div>
      {/* Prominent countdown banner for next Cars to Pre-Grid */}
      {nextAlert && (
        <NextSessionBanner
          sectionHeader={nextSectionHeader}
          alertItem={nextAlert}
          dayLabel={nextDayLabel}
        />
      )}

      {/* Schedule — matching Full Weekend Schedule layout exactly */}
      {mxmData.map((day, di) => {
        const dayPast = dayEndDates[day.day] && now > dayEndDates[day.day];

        return (
          <div key={di} style={{ marginBottom: 20, opacity: dayPast ? 0.45 : 1, transition: "opacity 0.3s" }}>
            {/* Day header — IDENTICAL to full schedule */}
            <div style={{
              fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5,
              marginBottom: 6, paddingLeft: 10, fontFamily: font,
              color: dayPast ? C.grayDark : C.accent,
              borderLeft: `3px solid ${dayPast ? C.grayDark : C.accent}`,
            }}>
              {day.day} {dayPast && <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: 0.5, marginLeft: 8, textTransform: "none" }}>— completed</span>}
            </div>

            {/* Sessions within this day */}
            {day.sections.map((section, si) => {
              const lastItem = section.items[section.items.length - 1];
              const sectionPast = lastItem.time.getTime() <= now.getTime();
              const isNextSection = nextSectionKey === `${day.day}-${section.header}`;

              return (
                <div
                  key={si}
                  ref={isNextSection ? nextRef : undefined}
                  style={{ marginBottom: 12 }}
                >
                  {/* Session sub-header */}
                  <div style={{
                    padding: "6px 0 4px 16px", fontSize: 11, fontWeight: 700,
                    color: sectionPast ? C.grayDark : C.white,
                    textTransform: "uppercase", letterSpacing: 1,
                    borderBottom: `1px solid ${C.border}`,
                  }}>
                    {section.header}
                  </div>

                  {/* Items — same row layout as full schedule */}
                  {section.items.map((item, ii) => {
                    const isPast = item.time.getTime() <= now.getTime();

                    return (
                      <div key={ii} style={{
                        display: "flex", gap: 16, padding: "5px 0 5px 16px",
                        borderBottom: `1px solid ${dayPast ? "#3A3A3A" : C.border}`,
                        alignItems: "center",
                      }}>
                        {/* Time — 120px, same as full schedule */}
                        <span style={{
                          width: 120, fontSize: 12, fontVariantNumeric: "tabular-nums", flexShrink: 0,
                          color: isPast ? C.grayDark : C.gray,
                          textDecoration: isPast && dayPast ? "line-through" : "none",
                        }}>
                          {formatTime(item.time)}
                        </span>

                        {/* Event label — same styling as full schedule, ⚡ for alerts like changed items */}
                        <span style={{
                          flex: 1, fontSize: 13,
                          color: isPast ? C.grayDark
                            : item.alert ? C.accentLight
                            : item.green ? C.green
                            : item.red ? C.red
                            : item.bold ? C.white
                            : C.grayLight,
                          fontWeight: (item.alert || item.bold) ? 600 : 400,
                          textDecoration: isPast && dayPast ? "line-through" : "none",
                        }}>
                          {item.label}
                        </span>

                        {/* Countdown — only for future items */}
                        {!isPast && (
                          <Countdown target={item.time} />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}

      <div style={{ fontSize: 11, color: C.grayDark, marginTop: 12, fontStyle: "italic" }}>
        All times Arlington, TX local (Central Time). Per MxM schedule dated 3/6/2026. ⚡ = Cars to Pre-Grid (10 min before transit/grid close).
      </div>
    </div>
  );
}
