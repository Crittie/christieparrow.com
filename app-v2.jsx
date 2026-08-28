// app-v2.jsx — christieparrow.com v2
// Editorial, quiet. Two visual modes via Tweaks. Mobile-first.

const { useState, useEffect, useRef } = React;

// ─── TWEAKS ────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "editorial",
  "accent": "rust",
  "resumeUrl": "assets/Christie-Parrow-Resume.pdf"
}/*EDITMODE-END*/;

// ─── BUNDLED-ASSET RESOLVER ────────────────────────────────────────

const R = (typeof window !== "undefined" && window.__resources) || {};
const asset = (id, fallback) => R[id] || fallback;

// ─── ICONS ─────────────────────────────────────────────────────────

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

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.4 22.9c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8h4.56v14H.22V8Zm7.3 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.2c0-1.48-.03-3.39-2.07-3.39-2.07 0-2.39 1.62-2.39 3.29V22H7.52V8Z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2H21.5l-7.5 8.572L23 22h-6.86l-5.36-7.01L4.62 22H1.36l8.04-9.19L1 2h7.04l4.84 6.4L18.244 2Zm-1.2 18h1.86L7.04 4H5.05l11.994 16Z"/>
  </svg>
);

// ─── NAV ───────────────────────────────────────────────────────────

function Nav({ active, resumeUrl }) {
  const item = (id, label) => (
    <a href={"#" + id}
       className={"nav-link " + (active === id ? "active" : "")}>
      {label}
    </a>
  );
  return (
    <nav className="nav" aria-label="primary">
      <div className="nav-inner">
        <a href="#top" className="nav-brand" aria-label="Christine Parrow — home">
          <strong>Christine Parrow</strong>
          <span className="index">/ index</span>
        </a>
        <div className="nav-links">
          {item("work", "Work")}
          {item("creative", "Creative")}
          {item("about", "About")}
        </div>
        <div className="nav-cta">
          <a className="nav-icon" href="https://github.com/crittie"
             target="_blank" rel="noopener" aria-label="GitHub"><GithubIcon /></a>
          <a className="nav-icon" href="https://www.linkedin.com/in/christine-parrow-pmp/"
             target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a className="btn sm" href={resumeUrl} download>
            Résumé <span className="arr"><ArrowDown /></span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────

function useClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Hero({ resumeUrl }) {
  const t = useClock();
  const time = t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return (
    <section id="top" className="hero" data-screen-label="01 Hero">
      <div className="hero-head">
        <div className="hero-meta" data-reveal>
          <span className="eyebrow"><span className="dot" />Christine "Crittie" Parrow</span>
          <span className="label">01 / Index · {time} ET</span>
        </div>

        <h1 className="hero-name" data-reveal>
          Christie
          <span className="last">Parrow</span>
        </h1>

        <p className="hero-tagline" data-reveal>
          <em>Senior project manager.</em> Sixteen years moving large systems
          forward — at the IRS, at FEMA during Hurricane Irma, now in AI.
          PMP-certified, MCP-fluent, on the Anthropic Architect track.
          Based in Sarasota.
        </p>

        <div className="hero-ctas" data-reveal>
          <a className="btn primary" href={resumeUrl} download>
            Download résumé <span className="arr"><ArrowDown /></span>
          </a>
          <a className="btn ghost" href="mailto:christineparrow@gmail.com">
            christineparrow@gmail.com <span className="arr"><ArrowUR /></span>
          </a>
        </div>
      </div>

      <div className="hero-grid">
        <div className="fact" data-reveal>
          <span className="fact-k">Tenure</span>
          <span className="fact-v">16<sub>yrs</sub></span>
          <span className="fact-d">Public sector, healthcare, fintech, AI.</span>
        </div>
        <div className="fact" data-reveal>
          <span className="fact-k">Credential</span>
          <span className="fact-v">PMP</span>
          <span className="fact-d">Project Management Professional · PMI.</span>
        </div>
        <div className="fact" data-reveal>
          <span className="fact-k">Current focus</span>
          <span className="fact-v">MCP</span>
          <span className="fact-d">Agentic workflows on the Claude API.</span>
        </div>
        <div className="fact" data-reveal>
          <span className="fact-k">Outside the PM work</span>
          <span className="fact-v serif">DANC3</span>
          <span className="fact-d">Onchain music collective, founder.</span>
        </div>
      </div>
    </section>
  );
}

// ─── WORK ──────────────────────────────────────────────────────────

const WORK = [
  {
    name: "openclaw",
    href: "https://github.com/crittie/openclaw",
    desc: "First agent. Personal assistant and prediction-market analyst — paper-trades on Polymarket. Python, running on a VPS.",
    tags: [{ l: "Python" }, { l: "Agent", cls: "accent" }, { l: "Polymarket" }],
  },
  {
    name: "productforge",
    href: "https://github.com/crittie/productforge",
    desc: "Chatbot-guided PDF generator. Configure layout, pour in content, download the document.",
    tags: [{ l: "Python" }, { l: "LLM", cls: "accent" }, { l: "Live", cls: "live" }],
  },
  {
    name: "luminous-pulse",
    href: "https://github.com/crittie/luminous-pulse",
    desc: "Content and strategy engine. Generates research, copy, product descriptions, and video strategy via structured Claude workflows.",
    tags: [{ l: "Claude API", cls: "accent" }, { l: "Python" }, { l: "MCP" }],
  },
  {
    name: "wayfinder-paths-sdk",
    href: "https://github.com/crittie/wayfinder-paths-sdk",
    desc: "Contributor. AI-agent path-planning framework — how agents navigate decisions and execute multi-step work across environments.",
    tags: [{ l: "AI Agents" }, { l: "Python" }, { l: "OSS" }],
  },
];

function Work() {
  return (
    <section id="work" className="section" data-screen-label="02 Work">
      <div className="section-head">
        <span className="section-num"><strong>02</strong> · Work</span>
        <h2 className="section-title">
          Open source, in the open. <em>github.com/crittie.</em>
        </h2>
        <span className="section-side">4 projects · ongoing</span>
      </div>

      <div className="work-list">
        {WORK.map((p, i) => (
          <a className="work-row" key={p.name}
             href={p.href} target="_blank" rel="noopener" data-reveal>
            <span className="work-num">0{i + 1}</span>
            <div>
              <div className="work-name">{p.name}</div>
              <div className="work-meta" style={{ marginTop: 8 }}>
                {p.tags.map((t) => (
                  <span key={t.l} className={"tag " + (t.cls || "")}>{t.l}</span>
                ))}
              </div>
            </div>
            <div className="work-desc">{p.desc}</div>
            <span className="work-arr"><ArrowUR /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── CREATIVE ──────────────────────────────────────────────────────

const DANC3_COVERS = [
  { src: asset("cover1", "assets/cover-1.jpg"), alt: "DANC3 mixtape cover — neon-haired portrait" },
  { src: asset("cover2", "assets/cover-2.jpg"), alt: "DANC3 mixtape I — moon and forest" },
  { src: asset("cover3", "assets/cover-3.jpg"), alt: "Broey & Vivid Fever Dreams — day by day" },
  { src: asset("cover4", "assets/cover-4.jpg"), alt: "Critical — single cover" },
  { src: asset("cover5", "assets/cover-5.gif"), alt: "$hippinfuk$ single cover" },
  { src: asset("cover6", "assets/cover-6.jpg"), alt: "Honey ft. Betty Dawl" },
  { src: asset("cover7", "assets/cover-7.jpg"), alt: "Âchimowa ft. Zaterday" },
  { src: asset("cover8", "assets/cover-8.jpg"), alt: "Lost Your Number feat. Suave" },
];

function Creative() {
  return (
    <section id="creative" className="section" data-screen-label="03 Creative">
      <div className="section-head">
        <span className="section-num"><strong>03</strong> · Creative</span>
        <h2 className="section-title">
          A second practice — <em>music, onchain, visuals.</em>
        </h2>
        <span className="section-side">Founder · Curator</span>
      </div>

      <div className="creative">
        {/* DANC3 feature */}
        <div className="feature" data-reveal>
          <div className="feature-meta">
            <span className="card-kicker">Onchain music collective · Founder & Creative Director</span>
            <h3>DANC3.</h3>
            <p>
              An onchain music collective releasing music, visuals, and brand
              work exclusively on-chain. Built the creative strategy, identity,
              and community from scratch. The mixtape lives at{" "}
              <a className="alink" href="https://danc3.musictribes.xyz/"
                 target="_blank" rel="noopener">danc3.musictribes.xyz</a>.
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href="https://danc3.musictribes.xyz/"
                 target="_blank" rel="noopener">
                Listen to the mixtape <span className="arr"><ArrowUR /></span>
              </a>
            </div>
            <div className="feature-stats">
              <div className="feature-stat">
                <span className="v">100<sup>+</sup></span>
                <span className="l">Artists supported</span>
              </div>
              <div className="feature-stat">
                <span className="v">2,500<sup>+</sup></span>
                <span className="l">Community collectors</span>
              </div>
              <div className="feature-stat">
                <span className="v">100<sup>%</sup></span>
                <span className="l">Onchain distribution</span>
              </div>
            </div>
          </div>

          <div className="cover-wall" aria-label="DANC3 release covers">
            {DANC3_COVERS.map((c, i) => (
              <div className="cover" key={i}>
                <img src={c.src} alt={c.alt} loading="lazy" />
                <span className="n">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fragments of Perception */}
        <div className="feature" data-reveal style={{ display: "block" }}>
          <div className="feature-meta" style={{ marginBottom: 20 }}>
            <span className="card-kicker">Generative art · Celosphere</span>
            <h3>Fragments of Perception.</h3>
            <p>
              A three-piece on-chain collection — abstract portraiture exploring
              how the face fractures under perception. Minted on{" "}
              <a className="alink"
                 href="https://x.com/Celo/status/1827000630365544789"
                 target="_blank" rel="noopener">Celosphere</a>, the Celo
              Foundation × Rarible gen-art platform.
            </p>
          </div>
          <div className="frag-grid">
            <figure className="frag">
              <img src={asset("fragments1", "assets/fragments-1.jpg")}
                   alt="Fragments of Perception 01" loading="lazy" />
              <figcaption>01 · Fragments</figcaption>
            </figure>
            <figure className="frag">
              <img src={asset("fragments2", "assets/fragments-2.jpg")}
                   alt="Fragments of Perception 02" loading="lazy" />
              <figcaption>02 · Fragments</figcaption>
            </figure>
            <figure className="frag">
              <img src={asset("fragments3", "assets/fragments-3.jpg")}
                   alt="Fragments of Perception 03" loading="lazy" />
              <figcaption>03 · Fragments</figcaption>
            </figure>
          </div>
        </div>

        {/* YouTube + X */}
        <div className="creative-pair">
          <div className="card" data-reveal>
            <span className="card-kicker">YouTube · musicurator live</span>
            <h3 className="card-title">Live music curation.</h3>
            <div className="yt-frame">
              <iframe
                src="https://www.youtube.com/embed/EY0MZvbdhyc?rel=0"
                title="musicurator live — featured set"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="card-body">
              Sets, conversations, and curation at the intersection of music
              discovery and culture.
            </p>
            <div>
              <a className="btn ghost" href="https://www.youtube.com/@crittiep"
                 target="_blank" rel="noopener">
                Channel <span className="arr"><ArrowUR /></span>
              </a>
            </div>
          </div>

          <div className="card" data-reveal>
            <span className="card-kicker">X / Twitter · @crittie</span>
            <h3 className="card-title">A small, real audience.</h3>
            <div className="bignum">1,700<sup>+</sup></div>
            <p className="card-body">
              Followers built organically around music, AI, and culture.
              Conversations, not metrics.
            </p>
            <div>
              <a className="btn ghost" href="https://twitter.com/crittie"
                 target="_blank" rel="noopener">
                Follow on X <span className="arr"><ArrowUR /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────

const CERTS = [
  { l: "PMP", active: false },
  { l: "ITIL Foundation", active: false },
  { l: "M.Cert. IT PM · GWU", active: false },
  { l: "Claude Certified Architect · in progress", active: true },
];

const TOOLS = [
  "Claude API", "MCP", "GitHub", "Google AI Studio",
  "ElevenLabs", "Midjourney", "Runway ML",
  "JIRA", "Notion", "Figma", "Lovable",
];

function About({ resumeUrl }) {
  return (
    <section id="about" className="section" data-screen-label="04 About">
      <div className="section-head">
        <span className="section-num"><strong>04</strong> · About</span>
        <h2 className="section-title">
          Operator, builder, <em>curator.</em>
        </h2>
        <span className="section-side">Profile</span>
      </div>

      <div className="about">
        <div className="about-body" data-reveal>
          <p>
            Sixteen years moving large systems forward. <em>At the IRS</em>,
            running modernization programs against legacy infrastructure.
            <em> At FEMA during Hurricane Irma</em>, coordinating disaster
            recovery operations under time pressure. Now in the AI space,
            running programs and prototyping the things they're trying to ship.
          </p>
          <p>
            I'm <em>building AI agents</em>, deploying workflow automations on
            MCP and the Claude API, and finishing the Anthropic Claude
            Certified Architect track. The work is part PM, part engineer,
            part communicator — running an executive readout in the morning
            and shipping the agent pipeline in the afternoon.
          </p>
          <p>
            Outside that, I founded <em>DANC3</em>, a fully onchain music
            collective — 100+ artists supported, 2,500+ collectors. I mint
            generative art. I curate music. <em>I build communities.</em> Not
            a side project — it's how I stay close to where culture and
            technology are pointing next.
          </p>

          <h4 className="subhead" style={{ marginTop: 28 }}>Certifications</h4>
          <div className="chips">
            {CERTS.map((c) => (
              <span key={c.l} className={"chip " + (c.active ? "active" : "")}>{c.l}</span>
            ))}
          </div>

          <h4 className="subhead" style={{ marginTop: 24 }}>Stack</h4>
          <div className="chips">
            {TOOLS.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        <div className="about-side" data-reveal>
          <figure className="portrait" style={{ margin: 0 }}>
            <img src={asset("christiePortrait", "assets/christie-portrait.jpg")}
                 alt="Christie Parrow at sunset over Barcelona, holding her dog on the steps of Montjuïc" />
            <figcaption>Barcelona · Montjuïc</figcaption>
          </figure>

          <div className="kvlist">
            <div className="row"><span className="k">Based</span><span className="v">Sarasota, FL · UTC−4</span></div>
            <div className="row"><span className="k">Status</span><span className="v">Available</span></div>
            <div className="row"><span className="k">Role</span><span className="v">AI Transformation PM</span></div>
            <div className="row"><span className="k">Open to</span><span className="v">FT · Consulting · Collab</span></div>
          </div>

          <div className="resume-block">
            <div>
              <h4 className="rt">Résumé.</h4>
              <p className="rs">Full work history, certifications, references.</p>
            </div>
            <a className="btn primary" href={resumeUrl} download>
              Download résumé <span className="arr"><ArrowDown /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer shell" data-screen-label="Footer">
      <div className="footer-grid">
        <div data-reveal>
          <h4>Reach out</h4>
          <p className="footer-email">
            <a href="mailto:christineparrow@gmail.com">
              christineparrow@gmail.com <span className="arr"><ArrowUR /></span>
            </a>
          </p>
          <p className="footer-blurb">
            Building at the intersection of AI and culture? Open to full-time
            roles, consulting, and creative collaborations.
          </p>
        </div>

        <div data-reveal>
          <h4>Channels</h4>
          <ul>
            <li><a href="https://www.linkedin.com/in/christine-parrow-pmp/" target="_blank" rel="noopener">LinkedIn <span className="arr"><ArrowUR /></span></a></li>
            <li><a href="https://github.com/crittie" target="_blank" rel="noopener">github / crittie <span className="arr"><ArrowUR /></span></a></li>
            <li><a href="https://twitter.com/crittie" target="_blank" rel="noopener">X · @crittie <span className="arr"><ArrowUR /></span></a></li>
          </ul>
        </div>

        <div data-reveal>
          <h4>Elsewhere</h4>
          <ul>
            <li><a href="https://danc3.musictribes.xyz/" target="_blank" rel="noopener">DANC3 · mixtape <span className="arr"><ArrowUR /></span></a></li>
            <li><a href="https://x.com/Celo/status/1827000630365544789" target="_blank" rel="noopener">Fragments · Celo <span className="arr"><ArrowUR /></span></a></li>
            <li><a href="https://www.youtube.com/@crittiep" target="_blank" rel="noopener">musicurator · YouTube <span className="arr"><ArrowUR /></span></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bot">
        <span>© 2026 · Christie Parrow · Sarasota, FL</span>
        <span>v2 · index</span>
      </div>
    </footer>
  );
}

// ─── SCROLL SPY ────────────────────────────────────────────────────

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handle = () => {
      const probe = window.innerHeight * 0.3;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe) cur = id;
      }
      setActive(cur);
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [ids]);
  return active;
}

// ─── APP ───────────────────────────────────────────────────────────

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const active = useScrollSpy(["top", "work", "creative", "about"]);

  useEffect(() => {
    const id = requestAnimationFrame(() => document.body.classList.add("cp-ready"));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = t.mode || "editorial";
    document.documentElement.dataset.accent = t.accent || "rust";
  }, [t.mode, t.accent]);

  const resumeUrl = t.resumeUrl || "assets/Christie-Parrow-Resume.pdf";

  return (
    <React.Fragment>
      <Nav active={active} resumeUrl={resumeUrl} />

      <main className="shell">
        <Hero resumeUrl={resumeUrl} />
        <Work />
        <Creative />
        <About resumeUrl={resumeUrl} />
      </main>

      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Visual mode" />
        <TweakRadio
          label="Mode"
          value={t.mode}
          options={["editorial", "lights-out"]}
          onChange={(v) => setTweak("mode", v)}
        />

        <TweakSection label="Accent" />
        <TweakColor
          label="Accent"
          value={accentToHex(t.accent, t.mode)}
          options={Object.keys(ACCENT_HEX).map((k) => accentToHex(k, t.mode))}
          onChange={(hex) => {
            const key = Object.keys(ACCENT_HEX).find(
              (k) => accentToHex(k, t.mode) === hex
            );
            if (key) setTweak("accent", key);
          }}
        />

        <TweakSection label="Résumé" />
        <TweakText
          label="Résumé file path"
          value={t.resumeUrl}
          onChange={(v) => setTweak("resumeUrl", v)}
        />
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.5,
          color: "var(--ink-60)", margin: "4px 0 0", maxWidth: 220,
        }}>
          Drop your PDF in <code>assets/</code> and reference it here.
        </p>
      </TweaksPanel>
    </React.Fragment>
  );
}

// Mapping of accent token → hex per mode (for the color swatch picker)
const ACCENT_HEX = {
  rust:     { editorial: "#B5483C", "lights-out": "#D97757" },
  ink:      { editorial: "#1F4FBF", "lights-out": "#6E9BFF" },
  moss:     { editorial: "#4A6A3E", "lights-out": "#8FB174" },
  charcoal: { editorial: "#2A2520", "lights-out": "#C8C2B5" },
};
function accentToHex(name, mode) {
  return (ACCENT_HEX[name] || ACCENT_HEX.rust)[mode === "lights-out" ? "lights-out" : "editorial"];
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
