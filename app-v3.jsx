// app-v3.jsx , christieparrow.com v3
// The status report: charter header, KPI dashboard, WBS tree + dictionary,
// Gantt timeline, appendices. Light, crisp, one page.

const { useState, useEffect } = React;

const R = (typeof window !== "undefined" && window.__resources) || {};
const asset = (id, fallback) => R[id] || fallback;

const RESUME_URL = "assets/Christie-Parrow-Resume.pdf";

// ─── SMALL PIECES ──────────────────────────────────────────────────

const ArrowUR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const ArrowDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v14M5 13l7 7 7-7" />
  </svg>
);

function Pill({ kind, children }) {
  return (
    <span className={"pill " + kind}>
      <span className="pill-dot" />{children}
    </span>
  );
}

function SectionHead({ index, title, side }) {
  return (
    <div className="sec-head">
      <span className="sec-index">{index}</span>
      <h2 className="sec-title">{title}</h2>
      <span className="sec-side">{side}</span>
    </div>
  );
}

// ─── HEADER / CHARTER ──────────────────────────────────────────────

function TopBar({ stamp }) {
  return (
    <div className="topbar">
      <span>CHRISTIEPARROW.COM</span>
      <span className="topbar-mid">PORTFOLIO · STATUS REPORT · REV 3.0</span>
      <span>UPDATED {stamp}</span>
    </div>
  );
}

function Charter() {
  return (
    <header className="charter" data-screen-label="01 Charter">
      <div className="charter-main">
        <div className="charter-kicker">
          <span>PROJECT MANAGER · PROGRAM OPERATIONS · AI WORKFLOWS</span>
          <Pill kind="open">OPEN TO WORK</Pill>
        </div>
        <h1 className="charter-name">CHRISTIE<br />PARROW</h1>
        <p className="charter-sub">
          Sixteen years running complex programs at the IRS and FEMA.
          An operator who efficiently runs and translates complex
          programs, now applying the same discipline to AI work.
        </p>
        <dl className="charter-meta">
          <div><dt>BASE</dt><dd>Venice, FL</dd></div>
          <div><dt>TENURE</dt><dd>16 yrs, U.S. Treasury</dd></div>
          <div><dt>CLEARANCE</dt><dd>Public Trust</dd></div>
          <div><dt>AVAILABILITY</dt><dd>Immediate</dd></div>
        </dl>
        <div className="charter-ctas">
          <a className="btn primary" href={RESUME_URL} download>
            Download résumé <span className="arr"><ArrowDown /></span>
          </a>
          <a className="btn ghost" href="mailto:christineparrow@gmail.com">
            christineparrow@gmail.com <span className="arr"><ArrowUR /></span>
          </a>
        </div>
      </div>
      <figure className="charter-photo">
        <img src={asset("christiePortrait", "assets/christie-portrait.jpg")}
             alt="Christie Parrow at sunset over Barcelona, holding her dog on the steps of Montjuïc" />
        <figcaption>
          <span>PROJECT LEAD</span>
          <span className="cap-place">Barcelona · Montjuïc</span>
        </figcaption>
      </figure>
    </header>
  );
}

// ─── KPI DASHBOARD ─────────────────────────────────────────────────

const KPIS = [
  { v: "16", unit: "YRS", cap: "Federal program service", blue: false },
  { v: "400", unit: "+", cap: "Technology requests processed", blue: false },
  { v: "−40", unit: "%", cap: "Manual volume, intake redesign", blue: true },
  { v: "−30", unit: "%", cap: "Cycle time across those requests", blue: true },
  { v: "100", unit: "+", cap: "Active requests tracked on dashboards", blue: false },
];

function Kpis() {
  return (
    <section className="kpis" aria-label="Headline metrics" data-screen-label="02 Metrics">
      {KPIS.map((k) => (
        <div className="kpi" key={k.cap}>
          <div className={"kpi-v" + (k.blue ? " blue" : "")}>
            {k.v}<span className="kpi-unit">{k.unit}</span>
          </div>
          <div className="kpi-cap">{k.cap}</div>
        </div>
      ))}
    </section>
  );
}

// ─── WBS ───────────────────────────────────────────────────────────

const WBS_TREE = [
  {
    id: "1.0", name: "FEDERAL PROGRAM OPERATIONS", org: "IRS · U.S. TREASURY",
    kids: [
      ["1.1", "Intake redesign"],
      ["1.2", "Self-service intake site"],
      ["1.3", "Delivery dashboards"],
      ["1.4", "Executive briefings"],
      ["1.5", "Vendor trial · ShowRack"],
      ["1.6", "FEMA detail · Irma"],
    ],
  },
  {
    id: "2.0", name: "AI & DATA WORK", org: "2025 · PRESENT",
    kids: [
      ["2.1", "micro1 · AI training"],
      ["2.2", "Luminous Pulse"],
      ["2.3", "Verification pipeline"],
      ["2.4", "Open source builds"],
    ],
  },
  {
    id: "3.0", name: "CREATIVE PRACTICE", org: "FOUNDER · CURATOR",
    kids: [
      ["3.1", "DANC3 collective"],
      ["3.2", "glimmers · memoir"],
      ["3.3", "Fragments of Perception"],
      ["3.4", "Mixtape · curation"],
    ],
  },
];

const WBS_ROWS = [
  { id: "1.1", name: "Technology intake redesign", org: "IRS", period: "Program tenure", status: ["done", "COMPLETE"],
    outcome: "Intake and triage for 400+ technology work requests. Manual volume down 40%, cycle time down 30%." },
  { id: "1.2", name: "Self-service intake website", org: "IRS", period: "Program tenure", status: ["done", "COMPLETE"],
    outcome: "Designed and launched. Requestors self-serve instead of emailing the team." },
  { id: "1.3", name: "Delivery dashboards", org: "IRS", period: "Program tenure", status: ["done", "COMPLETE"],
    outcome: "Live tracking of 100+ active requests for program leadership." },
  { id: "1.4", name: "Executive briefing program", org: "IRS", period: "Monthly", status: ["done", "COMPLETE"],
    outcome: "Briefing materials prepared for monthly CTO reviews." },
  { id: "1.5", name: "ShowRack vendor trial", org: "IRS", period: "Evaluation", status: ["done", "COMPLETE"],
    outcome: "Change management for the trial. Adoption gaps captured against AutoCAD, cost-risk case briefed." },
  { id: "1.6", name: "Disaster recovery detail", org: "FEMA", period: "Hurricane Irma", status: ["done", "COMPLETE"],
    outcome: "Recovery operations support under live disaster timelines." },
  { id: "2.1", name: "AI training & evaluation", org: "micro1", period: "2025 · present", status: ["active", "ACTIVE"],
    outcome: "Contract training and annotation work on robotics programs." },
  { id: "2.2", name: "Luminous Pulse", org: "Founder", period: "2026 · present", status: ["active", "ACTIVE"],
    outcome: "AI operations practice for established Florida businesses. Consulting plus a data partnership program." },
  { id: "2.3", name: "Verification pipeline", org: "Luminous Pulse", period: "2026 · present", status: ["active", "ACTIVE"],
    outcome: "AI research comes in, human-verified operations go out. Every claim checked before it is used." },
  { id: "3.1", name: "DANC3", org: "Founder", period: "Ongoing", status: ["active", "ACTIVE"],
    outcome: "Onchain music collective. 100+ artists, 2,500+ collectors, 100% onchain distribution." },
  { id: "3.2", name: "glimmers", org: "Personal", period: "In progress", status: ["prog", "IN PROGRESS"],
    outcome: "A memoir in progress. Beauty in the mundane, strangers, companionship, almost lovers." },
  { id: "3.3", name: "Fragments of Perception", org: "Celosphere", period: "Minted", status: ["done", "COMPLETE"],
    outcome: "Three generative pieces on how a face fractures under perception. Celo Foundation × Rarible." },
];

function Wbs() {
  return (
    <section id="wbs" className="section" data-screen-label="03 WBS">
      <SectionHead index="03" title="WORK BREAKDOWN STRUCTURE" side="Career program · all work packages" />

      <div className="wbs-tree" aria-label="Work breakdown structure diagram">
        <div className="wbs-root">
          <span className="wbs-root-id">0.0</span>
          <span className="wbs-root-name">CAREER PROGRAM · C. PARROW, OPERATOR</span>
        </div>
        <div className="wbs-branches">
          {WBS_TREE.map((b) => (
            <div className="wbs-branch" key={b.id}>
              <div className="wbs-node">
                <span className="wbs-node-id">{b.id}</span>
                <span className="wbs-node-name">{b.name}</span>
                <span className="wbs-node-org">{b.org}</span>
              </div>
              <ul className="wbs-kids">
                {b.kids.map((k) => (
                  <li key={k[0]}><span className="wbs-kid-id">{k[0]}</span>{k[1]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="dict-wrap">
        <table className="dict">
          <thead>
            <tr>
              <th className="c-id">WBS</th>
              <th>Work package</th>
              <th className="c-org">Owner</th>
              <th className="c-per">Period</th>
              <th className="c-st">Status</th>
              <th className="c-out">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {WBS_ROWS.map((r) => (
              <tr key={r.id}>
                <td className="c-id">{r.id}</td>
                <td className="d-name">{r.name}<span className="d-org-inline"> · {r.org}</span></td>
                <td className="c-org">{r.org}</td>
                <td className="c-per">{r.period}</td>
                <td className="c-st"><Pill kind={r.status[0]}>{r.status[1]}</Pill></td>
                <td className="c-out">{r.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── GANTT ─────────────────────────────────────────────────────────

// Axis: 2009 → 2027 (18 years). left/width in percent.
const AXIS_START = 2009, AXIS_SPAN = 18;
const pct = (yr) => ((yr - AXIS_START) / AXIS_SPAN) * 100;

const GANTT = [
  { name: "IRS · Program operations", note: "2009 – 2025", from: 2009, to: 2025, cls: "" },
  { name: "FEMA · Hurricane Irma detail", note: "Milestone · 2017", mile: 2017.75 },
  { name: "DANC3 · Onchain collective", note: "2024 – present", from: 2024, to: 2027, cls: "lite" },
  { name: "micro1 · AI training", note: "2025 – present", from: 2025, to: 2027, cls: "" },
  { name: "GenAI workflow projects", note: "2025 – present", from: 2025, to: 2027, cls: "lite" },
  { name: "Luminous Pulse", note: "2026 – present", from: 2026, to: 2027, cls: "" },
];
const TICKS = [2009, 2012, 2015, 2018, 2021, 2024, 2027];

function Gantt() {
  return (
    <section id="timeline" className="section" data-screen-label="04 Timeline">
      <SectionHead index="04" title="PROJECT TIMELINE" side="Gantt · 2009 → present" />
      <div className="gantt">
        {GANTT.map((g) => (
          <div className="g-row" key={g.name}>
            <div className="g-label">
              <span className="g-name">{g.name}</span>
              <span className="g-note">{g.note}</span>
            </div>
            <div className="g-track">
              {g.mile ? (
                <span className="g-mile" style={{ left: pct(g.mile) + "%" }} title={g.note}>◆</span>
              ) : (
                <span className={"g-bar " + g.cls}
                      style={{ left: pct(g.from) + "%", width: (pct(g.to) - pct(g.from)) + "%" }} />
              )}
            </div>
          </div>
        ))}
        <div className="g-axis" aria-hidden="true">
          <div className="g-label" />
          <div className="g-ticks">
            {TICKS.map((t) => (
              <span key={t} style={{ left: pct(t) + "%" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── APPENDICES ────────────────────────────────────────────────────

const OSS = [
  { name: "openclaw", href: "https://github.com/crittie/openclaw",
    desc: "A personal agent that paper-trades prediction markets.", tags: "Python · Agent · Polymarket" },
  { name: "productforge", href: "https://github.com/crittie/productforge",
    desc: "A chatbot that builds PDFs. Describe the layout, download the document.", tags: "Python · LLM" },
  { name: "luminous-pulse", href: "https://github.com/crittie/luminous-pulse",
    desc: "A content engine on the Claude API. Research, copy, product descriptions.", tags: "Claude API · MCP" },
  { name: "wayfinder-paths-sdk", href: "https://github.com/crittie/wayfinder-paths-sdk",
    desc: "Contributor. A framework for how AI agents plan and execute multi-step work.", tags: "AI Agents · OSS" },
];

function Appendices() {
  return (
    <section id="appendix" className="section" data-screen-label="05 Appendices">
      <SectionHead index="05" title="APPENDICES" side="Open source · credentials · stack" />
      <div className="appx-grid">
        <div className="appx">
          <h3 className="appx-h">A · OPEN SOURCE <span>github.com/crittie</span></h3>
          <ul className="oss">
            {OSS.map((p) => (
              <li key={p.name}>
                <a href={p.href} target="_blank" rel="noopener">
                  <span className="oss-name">{p.name}</span>
                  <span className="oss-arr"><ArrowUR /></span>
                </a>
                <p>{p.desc}</p>
                <span className="oss-tags">{p.tags}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="appx">
          <h3 className="appx-h">B · CREDENTIALS</h3>
          <table className="kv">
            <tbody>
              <tr><td>Education</td><td>B.A. Psychology, George Mason University</td></tr>
              <tr><td>Graduate</td><td>Master's Certificate, IT Project Management, GWU, 2012</td></tr>
              <tr><td>PMP</td><td>Earned 2014</td></tr>
              <tr><td>ITIL</td><td>Foundation, 2012</td></tr>
              <tr><td>Awards</td><td>Special Act Award, 2011 · Enterprise Operations MVP, 2012</td></tr>
            </tbody>
          </table>
          <h3 className="appx-h" style={{ marginTop: 26 }}>C · STACK</h3>
          <div className="chips">
            {["MS Project", "Smartsheet", "Jira", "SharePoint", "Office 365", "Notion", "Figma",
              "Claude API", "MCP", "GitHub", "DaVinci Resolve"].map((t) => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </div>
          <p className="appx-note">
            Currently finishing the Anthropic Architect track, and
            building agent workflows on MCP and the Claude API.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="footer-rule">
        <span>END OF REPORT</span>
        <span className="footer-mid">Questions go to the operator</span>
        <span>REV 3.0</span>
      </div>
      <div className="footer-grid">
        <div>
          <div className="footer-h">CONTACT</div>
          <a className="footer-email" href="mailto:christineparrow@gmail.com">
            christineparrow@gmail.com <span className="arr"><ArrowUR /></span>
          </a>
          <p className="footer-blurb">
            Making something and need someone who can run it well?
            Open to full-time roles, consulting, and collaborations.
          </p>
        </div>
        <div>
          <div className="footer-h">CHANNELS</div>
          <ul className="footer-links">
            <li><a href="https://www.linkedin.com/in/christine-parrow-pmp/" target="_blank" rel="noopener">LinkedIn <span className="arr"><ArrowUR /></span></a></li>
            <li><a href="https://github.com/crittie" target="_blank" rel="noopener">GitHub · crittie <span className="arr"><ArrowUR /></span></a></li>
            <li><a href="https://twitter.com/crittie" target="_blank" rel="noopener">X · @crittie <span className="arr"><ArrowUR /></span></a></li>
            <li><a href="https://www.youtube.com/@crittiep" target="_blank" rel="noopener">YouTube · musicurator <span className="arr"><ArrowUR /></span></a></li>
          </ul>
        </div>
        <div>
          <div className="footer-h">DOCUMENTS</div>
          <ul className="footer-links">
            <li><a href={RESUME_URL} download>Résumé · PDF <span className="arr"><ArrowDown /></span></a></li>
            <li><a href="https://danc3.musictribes.xyz/" target="_blank" rel="noopener">DANC3 · mixtape <span className="arr"><ArrowUR /></span></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bot">
        <span>© 2026 Christie Parrow · Venice, FL</span>
        <span className="serif-note">an operator's report, kept current</span>
      </div>
    </footer>
  );
}

// ─── APP ───────────────────────────────────────────────────────────

function App() {
  const [stamp, setStamp] = useState("OCT 2026");
  useEffect(() => {
    const d = new Date();
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    setStamp(months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear());
  }, []);

  return (
    <React.Fragment>
      <TopBar stamp={stamp} />
      <main className="sheet">
        <Charter />
        <Kpis />
        <Wbs />
        <Gantt />
        <Appendices />
      </main>
      <Footer />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
