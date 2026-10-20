// app-v4.jsx , christieparrow.com v4
// The dashboard: dark, single viewport, five color-coded sections.
// Content carried over from v3 verbatim; presentation is new.
// React state swaps the panel in place; hash links give deep links
// and working back/forward navigation.

const { useState, useEffect, useRef } = React;

const R = (typeof window !== "undefined" && window.__resources) || {};
const asset = (id, fallback) => R[id] || fallback;

const RESUME_URL = "assets/Christie-Parrow-Resume.pdf";
const EMAIL = "christineparrow@gmail.com";

// ─── CONTENT ───────────────────────────────────────────────────────
// One data structure for the whole site. Facts, names, outcomes and
// links are v3's own words; only the arrangement is new.

const KPIS = [
  { v: "16", unit: "YRS", cap: "Federal program service" },
  { v: "400", unit: "+", cap: "Technology requests processed" },
  { v: "−40", unit: "%", cap: "Manual volume, intake redesign" },
  { v: "−30", unit: "%", cap: "Cycle time across those requests" },
  { v: "100", unit: "+", cap: "Active requests tracked on dashboards" },
];

const SECTIONS = [
  {
    id: "ai-automation",
    label: "AI & AUTOMATION",
    title: "AI & Automation",
    color: "#C1F17B",
    intro: "AI & data work · 2025 · present",
    projects: [
      { name: "AI training & evaluation", org: "micro1", period: "2025 · present",
        status: ["active", "ACTIVE"],
        desc: "Contract training and annotation work on robotics programs." },
      { name: "Verification pipeline", org: "Luminous Pulse", period: "2026 · present",
        status: ["active", "ACTIVE"],
        desc: "AI research comes in, human-verified operations go out. Every claim checked before it is used." },
      { name: "Family Preserves, by Cielito Mercado Vivas", org: "AI consulting", period: "2025 · present",
        status: ["active", "ACTIVE"],
        desc: "AI consulting behind the book's Kickstarter campaign. Helped raise $30,000 within 60 days." },
      { name: "GenAI workflow projects", period: "2025 · present" },
    ],
    note: "Currently finishing the Anthropic Architect track, and building agent workflows on MCP and the Claude API.",
  },
  {
    id: "project-management",
    label: "PROJECT MANAGEMENT",
    title: "Project Management",
    color: "#B4A0FA",
    intro: "Federal program operations · IRS · U.S. Treasury",
    stats: KPIS,
    projects: [
      { name: "Technology intake redesign", org: "IRS", period: "Program tenure",
        status: ["done", "COMPLETE"],
        desc: "Intake and triage for 400+ technology work requests. Manual volume down 40%, cycle time down 30%." },
      { name: "Delivery dashboards", org: "IRS", period: "Program tenure",
        status: ["done", "COMPLETE"],
        desc: "Live tracking of 100+ active requests for program leadership." },
      { name: "Executive briefing program", org: "IRS", period: "Monthly",
        status: ["done", "COMPLETE"],
        desc: "Briefing materials prepared for monthly CTO reviews." },
      { name: "ShowRack vendor trial", org: "IRS", period: "Evaluation",
        status: ["done", "COMPLETE"],
        desc: "Change management for the trial. Adoption gaps captured against AutoCAD, cost-risk case briefed." },
      { name: "Disaster recovery detail", org: "FEMA", period: "Hurricane Irma",
        status: ["done", "COMPLETE"],
        desc: "Recovery operations support under live disaster timelines." },
    ],
  },
  {
    id: "creative-studio",
    label: "CREATIVE STUDIO",
    title: "Creative Studio",
    color: "#F5A2C7",
    intro: "Creative practice · Founder · Curator",
    projects: [
      { name: "DANC3", org: "Founder", period: "2023 · present",
        status: ["active", "ACTIVE"],
        desc: "Onchain music collective. 100+ artists, 2,500+ collectors, 100% onchain distribution." },
      { name: "glimmers", org: "Personal", period: "In progress",
        status: ["prog", "IN PROGRESS"],
        desc: "A memoir about grief, written in glimmers: the small bright moments that keep showing up inside the loss." },
      { name: "Fragments of Perception", org: "Celosphere", period: "Minted",
        status: ["done", "COMPLETE"],
        desc: "Three generative pieces on how a face fractures under perception. Celo Foundation × Rarible." },
      { name: "Mixtape · curation", org: "DANC3",
        href: "https://danc3.musictribes.xyz/", linkLabel: "DANC3 · mixtape" },
    ],
  },
  {
    id: "digital-products",
    label: "DIGITAL PRODUCTS",
    title: "Digital Products",
    color: "#90C9F3",
    intro: "Open source · github.com/crittie · plus products and ventures",
    projects: [
      { name: "openclaw", org: "Open source", period: "GitHub",
        href: "https://github.com/crittie/openclaw", linkLabel: "github.com/crittie/openclaw",
        desc: "A personal agent that paper-trades prediction markets.", tags: "Python · Agent · Polymarket" },
      { name: "productforge", org: "Open source", period: "GitHub",
        href: "https://github.com/crittie/productforge", linkLabel: "github.com/crittie/productforge",
        desc: "A chatbot that builds PDFs. Describe the layout, download the document.", tags: "Python · LLM" },
      { name: "luminous-pulse", org: "Open source", period: "GitHub",
        href: "https://github.com/crittie/luminous-pulse", linkLabel: "github.com/crittie/luminous-pulse",
        desc: "A content engine on the Claude API. Research, copy, product descriptions.", tags: "Claude API · MCP" },
      { name: "wayfinder-paths-sdk", org: "Open source", period: "GitHub",
        href: "https://github.com/crittie/wayfinder-paths-sdk", linkLabel: "github.com/crittie/wayfinder-paths-sdk",
        desc: "Contributor. A framework for how AI agents plan and execute multi-step work.", tags: "AI Agents · OSS" },
      { name: "Self-service intake website", org: "IRS", period: "Program tenure",
        status: ["done", "COMPLETE"],
        desc: "Designed and launched. Requestors self-serve instead of emailing the team." },
      { name: "Family Preserves, by Cielito Mercado Vivas", org: "AI consulting", period: "2025 · present",
        status: ["active", "ACTIVE"],
        desc: "AI consulting behind the book's Kickstarter campaign. Helped raise $30,000 within 60 days." },
      { name: "Luminous Pulse", org: "Founder", period: "2026 · present",
        status: ["active", "ACTIVE"],
        desc: "AI operations practice for established Florida businesses. Consulting plus a data partnership program." },
    ],
  },
  {
    id: "about",
    label: "ABOUT / EXPERIENCE",
    title: "About / Experience",
    color: "#F4C579",
    intro: "The operator behind the dashboard",
    about: true,
  },
];

const TIMELINE = [
  { name: "IRS · Program operations", note: "2009 – 2025", cls: "c-blue" },
  { name: "FEMA · Hurricane Irma detail", note: "Milestone · 2017", cls: "c-ink" },
  { name: "DANC3 · Onchain collective", note: "2023 – present", cls: "c-orange" },
  { name: "micro1 · AI training", note: "2025 – present", cls: "c-purple" },
  { name: "Family Preserves · AI consulting", note: "2025 – present", cls: "c-green" },
  { name: "GenAI workflow projects", note: "2025 – present", cls: "c-yellow" },
  { name: "Luminous Pulse", note: "2026 – present", cls: "c-red" },
];

const CREDENTIALS = [
  ["Education", "B.A. Psychology, George Mason University"],
  ["Graduate", "Master's Certificate, IT Project Management, GWU, 2012"],
  ["PMP", "Earned 2014"],
  ["ITIL", "Foundation, 2012"],
  ["Awards", "Special Act Award, 2011 · Enterprise Operations MVP, 2012"],
];

const STACK = ["MS Project", "Smartsheet", "Jira", "SharePoint", "Office 365", "Notion", "Figma",
  "Claude API", "MCP", "GitHub", "DaVinci Resolve"];

const CHANNELS = [
  ["LinkedIn", "https://www.linkedin.com/in/christine-parrow-pmp/"],
  ["GitHub · crittie", "https://github.com/crittie"],
  ["X · @crittie", "https://twitter.com/crittie"],
  ["YouTube · musicurator", "https://www.youtube.com/@crittiep"],
];

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

// Tile icons, one per section, drawn in the section color.
const ICONS = {
  "ai-automation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="4.5" cy="5.5" r="1.7" /><circle cx="19.5" cy="5.5" r="1.7" />
      <circle cx="4.5" cy="18.5" r="1.7" /><circle cx="19.5" cy="18.5" r="1.7" />
      <path d="M6 7l3.5 3M18 7l-3.5 3M6 17l3.5-3M18 17l-3.5-3" />
    </svg>
  ),
  "project-management": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5.5" y="4.5" width="13" height="17" rx="2" />
      <path d="M9.5 4.5a2.5 2.5 0 0 1 5 0" />
      <path d="M9 11.5l1.8 1.8 3.4-3.6M9 17.5l1.8 1.8 3.4-3.6" />
    </svg>
  ),
  "creative-studio": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.9 2-1.9 0-.8-.5-1.3-.5-2.1 0-1 .8-1.8 2-1.8h1.6a3.9 3.9 0 0 0 3.9-3.9c0-3.5-4-6.8-9-6.8z" />
      <circle cx="7.6" cy="10.4" r="1.15" /><circle cx="11" cy="6.9" r="1.15" />
      <circle cx="15.6" cy="8.4" r="1.15" />
    </svg>
  ),
  "digital-products": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5l9 5-9 5-9-5 9-5z" />
      <path d="M3.8 13.4l8.2 4.6 8.2-4.6M3.8 17.4l8.2 4.6 8.2-4.6" />
    </svg>
  ),
  "about": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="9.6" r="3" />
      <path d="M5.9 19.3a6.4 6.4 0 0 1 12.2 0" />
    </svg>
  ),
};

// ─── HEADER ────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="top">
      <div className="top-id">
        <div className="top-kicker">PROJECT MANAGER · PROGRAM OPERATIONS · AI WORKFLOWS</div>
        <div className="top-name-row">
          <span className="top-name">CHRISTIE PARROW</span>
          <Pill kind="open">OPEN TO WORK</Pill>
        </div>
      </div>
      <p className="top-tag">Building systems. Creating experiences.</p>
      <div className="top-actions">
        <a className="btn" href={RESUME_URL} download>
          <span className="arr"><ArrowDown /></span> Download résumé
        </a>
        <a className="top-contact" href={"mailto:" + EMAIL}>
          Contact <span className="arr"><ArrowUR /></span>
        </a>
      </div>
    </header>
  );
}

// ─── NAV TILES ─────────────────────────────────────────────────────

function Rail({ active, onSelect }) {
  const refs = useRef([]);
  const onKey = (e, i) => {
    let j = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (i + 1) % SECTIONS.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = (i - 1 + SECTIONS.length) % SECTIONS.length;
    if (j !== null) {
      e.preventDefault();
      refs.current[j] && refs.current[j].focus();
    }
  };
  return (
    <nav className="rail" aria-label="Portfolio sections">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          ref={(el) => { refs.current[i] = el; }}
          type="button"
          className={"tile" + (active === s.id ? " sel" : "")}
          style={{ "--c": s.color }}
          aria-pressed={active === s.id}
          aria-current={active === s.id ? "true" : undefined}
          onClick={() => onSelect(s.id)}
          onKeyDown={(e) => onKey(e, i)}
        >
          <span className="t-ic">{ICONS[s.id]}</span>
          <span className="t-label">{s.label}</span>
          <span className="t-idx">{String(i + 1).padStart(2, "0")}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── PANEL PIECES ──────────────────────────────────────────────────

function PanelHead({ section, index }) {
  return (
    <div className="p-head">
      <span className="p-idx">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h2 className="p-title">{section.title}</h2>
        <p className="p-intro">{section.intro}</p>
      </div>
    </div>
  );
}

function StatRow({ stats }) {
  return (
    <div className="stats" aria-label="Headline metrics">
      {stats.map((k) => (
        <div className="stat" key={k.cap}>
          <div className="stat-v">{k.v}<span className="stat-unit">{k.unit}</span></div>
          <div className="stat-cap">{k.cap}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ p }) {
  const meta = [p.org, p.period].filter(Boolean).join(" · ");
  return (
    <article className="card">
      <div className="card-top">
        <h3 className="card-name">{p.name}</h3>
        {p.status && <Pill kind={p.status[0]}>{p.status[1]}</Pill>}
      </div>
      {meta && <div className="card-meta">{meta}</div>}
      {p.desc && <p className="card-desc">{p.desc}</p>}
      {p.tags && <div className="card-tags">{p.tags}</div>}
      {p.href && (
        <a className="card-link" href={p.href} target="_blank" rel="noopener">
          {p.linkLabel} <span className="arr"><ArrowUR /></span>
        </a>
      )}
    </article>
  );
}

function SectionPanel({ section, index }) {
  return (
    <React.Fragment>
      <PanelHead section={section} index={index} />
      {section.stats && <StatRow stats={section.stats} />}
      <div className="cards">
        {section.projects.map((p) => <ProjectCard key={p.name} p={p} />)}
      </div>
      {section.note && <p className="p-note">{section.note}</p>}
    </React.Fragment>
  );
}

// ─── ABOUT PANEL ───────────────────────────────────────────────────

function AboutPanel({ section, index }) {
  return (
    <React.Fragment>
      <PanelHead section={section} index={index} />
      <div className="about-grid">
        <div className="about-left">
          <figure className="about-photo">
            <img src={asset("christiePortrait", "assets/christie-portrait.jpg")}
                 alt="Christie Parrow at sunset over Barcelona, holding her dog on the steps of Montjuïc" />
            <figcaption>
              <span>PROJECT LEAD</span>
              <span className="cap-place">Barcelona · Montjuïc</span>
            </figcaption>
          </figure>
          <dl className="about-meta">
            <div><dt>BASE</dt><dd>Venice, FL</dd></div>
            <div><dt>TENURE</dt><dd>16 yrs, U.S. Treasury</dd></div>
            <div><dt>CLEARANCE</dt><dd>Public Trust</dd></div>
            <div><dt>AVAILABILITY</dt><dd>Immediate</dd></div>
          </dl>
        </div>
        <div className="about-right">
          <p className="about-bio">
            Sixteen years running complex programs at the IRS and FEMA.
            An operator who efficiently runs and translates complex
            programs, now applying the same discipline to AI work.
          </p>

          <h3 className="sub-h">Experience</h3>
          <ul className="timeline">
            {TIMELINE.map((t) => (
              <li key={t.name}>
                <span className={"tl-dot " + t.cls} />
                <span className="tl-name">{t.name}</span>
                <span className="tl-note">{t.note}</span>
              </li>
            ))}
          </ul>

          <h3 className="sub-h">Credentials</h3>
          <table className="kv">
            <tbody>
              {CREDENTIALS.map((row) => (
                <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td></tr>
              ))}
            </tbody>
          </table>

          <h3 className="sub-h">Stack</h3>
          <div className="chips">
            {STACK.map((t) => <span className="chip" key={t}>{t}</span>)}
          </div>

          <h3 className="sub-h">Contact</h3>
          <a className="about-email" href={"mailto:" + EMAIL}>
            {EMAIL} <span className="arr"><ArrowUR /></span>
          </a>
          <p className="about-blurb">
            Making something and need someone who can run it well?
            Open to full-time roles, consulting, and collaborations.
          </p>
          <ul className="about-links">
            {CHANNELS.map((c) => (
              <li key={c[0]}>
                <a href={c[1]} target="_blank" rel="noopener">
                  {c[0]} <span className="arr"><ArrowUR /></span>
                </a>
              </li>
            ))}
            <li>
              <a href={RESUME_URL} download>
                Résumé · PDF <span className="arr"><ArrowDown /></span>
              </a>
            </li>
            <li>
              <a href="https://danc3.musictribes.xyz/" target="_blank" rel="noopener">
                DANC3 · mixtape <span className="arr"><ArrowUR /></span>
              </a>
            </li>
          </ul>
          <p className="about-foot">© 2026 Christie Parrow · Venice, FL</p>
        </div>
      </div>
    </React.Fragment>
  );
}

// ─── APP ───────────────────────────────────────────────────────────

const SLUGS = SECTIONS.map((s) => s.id);
const DEFAULT_SECTION = "project-management";

function fromHash() {
  const h = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
  return SLUGS.indexOf(h) >= 0 ? h : DEFAULT_SECTION;
}

function App() {
  const [active, setActive] = useState(fromHash);
  const panelRef = useRef(null);

  useEffect(() => {
    const onHash = () => setActive(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [active]);

  const select = (id) => {
    if ("#/" + id === window.location.hash) {
      setActive(id);
    } else {
      window.location.hash = "/" + id;
    }
  };

  const index = SLUGS.indexOf(active);
  const section = SECTIONS[index];

  return (
    <div className="dash">
      <Header />
      <div className="stage">
        <Rail active={active} onSelect={select} />
        <main className="panel" ref={panelRef} aria-label={section.title}>
          <div className="panel-inner" key={active} style={{ "--c": section.color }}>
            {section.about
              ? <AboutPanel section={section} index={index} />
              : <SectionPanel section={section} index={index} />}
          </div>
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
