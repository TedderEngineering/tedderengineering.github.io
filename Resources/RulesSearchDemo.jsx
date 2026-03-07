import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#2B2B2B", card: "#333333", border: "#4A4A4A", borderLight: "#585858",
  accent: "#F0A848", accentLight: "#F5C070", white: "#F0F0F0",
  grayLight: "#C0C0C0", gray: "#949494", grayDark: "#707070",
  teal: "#38D9E8",
};
const font = "'Barlow Condensed', sans-serif";

const SPORTING_REGS = [
  { section: "15.1", title: "Tire Allocation", text: "Each Competitor will be allocated two (2) sets of new dry tires per Event (8 tires total). Only registered tire sets (or wet tires) may be used during Qualifying and Race sessions. Practice tire usage is unmonitored and may include new or used carryover sets." },
  { section: "15.5", title: "Joker Tire", text: "One (1) Joker tire per Event may be authorized by Continental to replace a damaged tire. The Joker tire allocation lapses if unused at the conclusion of the Event." },
  { section: "15.7", title: "Minimum Tire Pressure", text: "The minimum starting tire pressure for dry (slick) tires is 20 psi (1.38 bar). The minimum starting tire pressure for wet tires is 22 psi (1.51 bar). Tire warmers and TPMS are prohibited." },
  { section: "28.18", title: "Qualifying Order (Arlington)", text: "For the ARLINGTON event only: Drivers will line up in the Fast Lane at pit exit based on P2 Practice times (fastest to slowest). The same qualifying line-up order will be used for both qualifying sessions." },
  { section: "37.16", title: "Fuel Pump Out", text: "Competitors may be required to complete a fuel pump-out in Parc Ferme prior to scrutineering. Two crew members are required when pumping out, one to operate the fuel pump and another to operate the fire extinguisher." },
  { section: "42.1", title: "Pit Lane Speed", text: "The pit lane speed limit shall be 60 km/h (37 mph) unless otherwise specified in the Supplemental Regulations. All cars must engage the pit speed limiter when entering the pit lane." },
];

const TECHNICAL_REGS = [
  { section: "4.1", title: "Fuel Requirements", text: "Only SRO100 racing fuel is permitted for use during all official sessions. The use of 93 octane pump fuel is permitted for testing purposes only when the appropriate UIM engine fuel map is selected." },
  { section: "6.2", title: "Wheel and Tire Specifications", text: "Only Continental tires supplied through the official tire program are permitted. Tire specifications include dry slick and wet compound options. Wheel specifications must match the homologated dimensions." },
  { section: "7.1", title: "Minimum Weight", text: "The minimum weight of the car, including the driver and all equipment, shall be as specified in the technical bulletin. Cars may be weighed at any time during the Event." },
  { section: "8.1", title: "Safety Equipment", text: "All cars must be equipped with an FIA-approved fire suppression system, six-point racing harness, window net, and head restraint system. The fire suppression system must be inspected and certified annually." },
  { section: "10.1", title: "Suspension", text: "Spring rates, damper settings, and alignment parameters may be adjusted within the ranges specified in the Car Manual. Aftermarket suspension components are prohibited. Anti-roll bar adjustment is permitted." },
];

function RulesSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const search = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const sr = SPORTING_REGS.filter(s => s.text.toLowerCase().includes(q) || s.title.toLowerCase().includes(q));
    const tr = TECHNICAL_REGS.filter(s => s.text.toLowerCase().includes(q) || s.title.toLowerCase().includes(q));
    setResults({ sr, tr, query: query.trim() });
  };

  const hl = (text, q) => {
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.split(re).map((p, i) =>
      re.test(p) ? <mark key={i} style={{ background: C.accent + "40", color: C.white, padding: "0 2px", borderRadius: 2 }}>{p}</mark> : p
    );
  };

  const total = results ? results.sr.length + results.tr.length : 0;

  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && search()}
            placeholder="Search the regulations... (e.g. tire, fuel, pit lane, weight)"
            style={{ flex: 1, padding: "12px 16px", fontSize: 15, fontFamily: "'Barlow', sans-serif", background: "#2B2B2B", border: `1px solid ${C.borderLight}`, borderRadius: 6, color: C.white, outline: "none" }} />
          <button onClick={search} style={{ padding: "12px 24px", fontSize: 14, fontWeight: 700, fontFamily: font, textTransform: "uppercase", letterSpacing: 1, background: C.accent, color: "#1a1a1a", border: "none", borderRadius: 6, cursor: "pointer" }}>Search</button>
        </div>
        <div style={{ fontSize: 11, color: C.grayDark, marginTop: 8 }}>Enter a word, phrase, or topic. Results show every matching section from both the Sporting and Technical Regulations.</div>
      </div>

      {results && (
        <div>
          <div style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>
            Found <strong style={{ color: C.white }}>{total}</strong> section{total !== 1 ? "s" : ""} matching "<strong style={{ color: C.accent }}>{results.query}</strong>"
          </div>

          {results.sr.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.accent, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: font, marginBottom: 10, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                Sporting Regulations — {results.sr.length} match{results.sr.length !== 1 ? "es" : ""}
              </div>
              {results.sr.map((s, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 10, borderLeft: `4px solid ${C.accent}` }}>
                  <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Section {s.section} — {s.title}</div>
                  <div style={{ fontSize: 13, color: C.grayLight, lineHeight: 1.7 }}>{hl(s.text, results.query)}</div>
                </div>
              ))}
            </div>
          )}

          {results.tr.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.accentLight, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: font, marginBottom: 10, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                Technical Regulations — {results.tr.length} match{results.tr.length !== 1 ? "es" : ""}
              </div>
              {results.tr.map((s, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 10, borderLeft: `4px solid ${C.accentLight}` }}>
                  <div style={{ fontSize: 11, color: C.accentLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Section {s.section} — {s.title}</div>
                  <div style={{ fontSize: 13, color: C.grayLight, lineHeight: 1.7 }}>{hl(s.text, results.query)}</div>
                </div>
              ))}
            </div>
          )}

          {total > 0 && (
            <div style={{ background: "#2A2D30", border: `1px solid ${C.borderLight}`, borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.white, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: font, marginBottom: 10 }}>Summary</div>
              <div style={{ fontSize: 13, color: C.grayLight, lineHeight: 1.8 }}>
                {results.sr.length > 0 && <p style={{ margin: "0 0 10px" }}><strong style={{ color: C.accent }}>Sporting Regulations:</strong> "{results.query}" appears in {results.sr.length} section{results.sr.length !== 1 ? "s" : ""}: {results.sr.map(s => `§${s.section} (${s.title})`).join(", ")}.</p>}
                {results.tr.length > 0 && <p style={{ margin: 0 }}><strong style={{ color: C.accentLight }}>Technical Regulations:</strong> "{results.query}" appears in {results.tr.length} section{results.tr.length !== 1 ? "s" : ""}: {results.tr.map(s => `§${s.section} (${s.title})`).join(", ")}.</p>}
              </div>
            </div>
          )}

          {total === 0 && (
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 16, color: C.grayDark, marginBottom: 8 }}>No results found</div>
              <div style={{ fontSize: 12, color: C.grayDark }}>Try a different search. Common terms: tire, fuel, pit lane, weight, safety, suspension</div>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, textAlign: "center", cursor: "pointer" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 1, fontFamily: font }}>Sporting Regulations</div>
          <div style={{ fontSize: 10, color: C.grayDark, marginTop: 4 }}>Full PDF ↗</div>
        </div>
        <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, textAlign: "center", cursor: "pointer" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accentLight, textTransform: "uppercase", letterSpacing: 1, fontFamily: font }}>Technical Regulations</div>
          <div style={{ fontSize: 10, color: C.grayDark, marginTop: 4 }}>Full PDF ↗</div>
        </div>
      </div>
    </div>
  );
}

// Cards layout
const cards = [
  { id: "schedule", icon: "📅", label: "Schedule", desc: "Full weekend timeline" },
  { id: "ontrack", icon: "🏁", label: "On-Track", desc: "Session times" },
  { id: "procedures", icon: "📋", label: "Procedures", desc: "Qualifying, grids, flags" },
  { id: "tires", icon: "🔧", label: "Tires & Tech", desc: "Pressures, specs" },
  { id: "rules", icon: "📖", label: "Rules", desc: "Search Sporting & Technical Regs" },
  { id: "live", icon: "📺", label: "Live Viewing", desc: "Watch sessions live — links posted closer to event", locked: true },
  { id: "racetrace", icon: "RT", label: "Racetrace", desc: "Every position. Every lap. Analyzed.", link: true },
  { id: "predictions", icon: "🔒", label: "Predictions", desc: "Lap time analysis — coming soon", locked: true },
];

export default function Demo() {
  const [view, setView] = useState("dashboard");
  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: C.bg, color: C.white, minHeight: "100vh", maxWidth: 920, margin: "0 auto", padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {view === "dashboard" && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: font, color: C.accent, marginBottom: 16 }}>Dashboard — Updated Card Layout</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {cards.map(s => (
              <div key={s.id} onClick={s.locked ? undefined : s.link ? undefined : s.id === "rules" ? () => setView("rules") : undefined} style={{
                background: s.locked ? "#353535" : s.link ? "linear-gradient(135deg, #1A2030, #333)" : C.card,
                border: `1px solid ${s.locked ? "#444" : s.link ? C.teal + "60" : C.border}`,
                borderRadius: 10, padding: "20px 18px",
                cursor: s.locked ? "not-allowed" : "pointer",
                opacity: s.locked ? 0.5 : 1,
                borderLeft: s.locked ? `4px solid ${C.grayDark}` : s.link ? `4px solid ${C.teal}` : `4px solid ${C.accent}`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: s.locked ? C.grayDark : s.link ? C.teal : C.white, fontFamily: font, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: s.locked ? C.grayDark : C.gray, marginTop: 4, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "rules" && (
        <div>
          <div onClick={() => setView("dashboard")} style={{ fontSize: 11, color: C.accent, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, fontFamily: font, marginBottom: 16 }}>← Dashboard</div>
          <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: font, color: C.white, marginBottom: 16, borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>📖 Rules Search</h2>
          <RulesSearch />
        </div>
      )}
    </div>
  );
}
