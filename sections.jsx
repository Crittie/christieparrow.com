// sections.jsx — Work (AI projects), Creative, About (bio + certs + tools), Footer.

const { useState } = React;

// Resource map: at runtime, prefer the bundled blob URLs (window.__resources)
// if present, otherwise fall back to the relative asset paths so dev mode works.
const R = (typeof window !== "undefined" && window.__resources) || {};
const asset = (id, fallback) => R[id] || fallback;

const DANC3_COVERS = [
  { src: asset("cover1", "assets/cover-1.jpg"), alt: "DANC3 mixtape cover — neon-haired portrait", title: "DANC3 Mixtape — Crazy" },
  { src: asset("cover2", "assets/cover-2.jpg"), alt: "DANC3 mixtape I — moon and forest", title: "DANC3 Mixtape I" },
  { src: asset("cover3", "assets/cover-3.jpg"), alt: "Broey & Vivid Fever Dreams — day by day", title: "day by day · Broey & Vivid Fever Dreams" },
  { src: asset("cover4", "assets/cover-4.jpg"), alt: "Critical — neon cigar single cover", title: "Critical" },
  { src: asset("cover5", "assets/cover-5.gif"), alt: "$hippinfuk$ single cover", title: "$hippinfuk$", isGif: true },
  { src: asset("cover6", "assets/cover-6.jpg"), alt: "Honey ft. Betty Dawl single cover", title: "Honey ft. Betty Dawl" },
  { src: asset("cover7", "assets/cover-7.jpg"), alt: "Âchimowa ft. Zaterday", title: "Âchimowa ft. Zaterday" },
  { src: asset("cover8", "assets/cover-8.jpg"), alt: "Lost Your Number feat. Suave", title: "Lost Your Number feat. Suave" },
];

function Danc3Orbit() {
  // 8 covers evenly spaced. Start at top (-90°) and go clockwise.
  const floatDurations = [6, 7.2, 5.6, 6.8, 7.6, 5.8, 6.4, 7.0];
  const floatDelays    = [0, 1.1, 2.2, 0.6, 3.0, 1.7, 2.5, 0.3];
  const tilts          = [2, -3, 2.5, -2, 3, -2.5, 2, -3];

  return (
    <div className="danc3-vis">
      <div className="danc3-orbit-ring r1" aria-hidden="true" />
      <div className="danc3-orbit-ring r2" aria-hidden="true" />

      <div className="danc3-mark">
        <img src={asset("danc3Icon", "assets/danc3-icon.jpg")} alt="DANC3 — onchain music collective" />
      </div>

      {DANC3_COVERS.map((c, i) => {
        const angle = -90 + i * 45;
        return (
          <div
            key={c.src}
            className="danc3-cover"
            style={{ "--angle": `${angle}deg` }}
            title={c.title || c.alt}
          >
            <div
              className="danc3-cover-inner"
              style={{
                "--float-dur": `${floatDurations[i]}s`,
                "--float-delay": `${floatDelays[i]}s`,
                "--tilt": `${tilts[i]}deg`,
              }}
            >
              <img src={c.src} alt={c.alt} loading="lazy" />
            </div>
            <span className="num">0{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
}

function SectionHead({ idx, title, kicker, right }) {
  return (
    <div className="section-head">
      <div className="section-head-l">
        <span className="eyebrow" data-reveal><span className="dot" />{kicker}</span>
        <h2 className="section-h" data-reveal>{title}</h2>
      </div>
      <div className="section-head-r" data-reveal>
        <span className="idx">{idx}</span>{right}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ─── WORK / AI PROJECTS ────────────────────────────────────────────────

const WORK = [
  {
    glyph: "{ }",
    iconCls: "",
    name: "productforge",
    href: "https://github.com/crittie/productforge",
    desc: "Chatbot-guided ebook PDF generator. Configure the design, pour in your content, and download a polished PDF — all through a conversational interface.",
    tags: [
      { l: "Python", cls: "accent" },
      { l: "Live", cls: "live" },
      { l: "LLM-powered", cls: "" },
    ],
  },
  {
    glyph: "∿",
    iconCls: "alt",
    name: "luminous-pulse",
    href: "https://github.com/crittie/luminous-pulse",
    desc: "AI-powered content and strategy engine. Generates research, copy, product descriptions, and video strategy — built on Claude commands and structured AI workflows.",
    tags: [
      { l: "Claude API", cls: "alt" },
      { l: "Python", cls: "accent" },
      { l: "MCP", cls: "" },
    ],
  },
  {
    glyph: "◈",
    iconCls: "green",
    name: "wayfinder-paths-sdk",
    href: "https://github.com/crittie/wayfinder-paths-sdk",
    desc: "Contributing to an AI-agent path-planning framework — exploring how agents navigate decisions and execute multi-step workflows across environments.",
    tags: [
      { l: "AI Agents", cls: "" },
      { l: "Python", cls: "accent" },
      { l: "Open source", cls: "" },
    ],
  },
];

function WorkCard({ p }) {
  return (
    <a className="glass work-card"
       href={p.href}
       target="_blank" rel="noopener"
       data-cursor data-cursor-label="open repo"
       data-reveal>
      <div className="work-card-head">
        <span className={"work-icon " + p.iconCls}>{p.glyph}</span>
        <span className="ext" aria-hidden="true"><ArrowIcon /></span>
      </div>
      <div className="wname">{p.name}</div>
      <div className="wdesc">{p.desc}</div>
      <div className="wtags">
        {p.tags.map((t) => (
          <span key={t.l} className={"tag " + t.cls}>{t.l}</span>
        ))}
      </div>
    </a>
  );
}

function Work() {
  return (
    <section id="work" className="section" data-screen-label="Work">
      <SectionHead idx="02" kicker="What I build · Open source" title="AI projects & tools."
                   right="github.com/crittie" />
      <div className="work-grid">
        {WORK.map((p) => <WorkCard key={p.name} p={p} />)}
      </div>

      <div className="glass work-demo" data-reveal style={{ marginTop: 18 }}>
        <span className="play"><PlayIcon /></span>
        <span className="p1">AI Workflow Demo</span>
        <span className="p2">coming soon — live walkthrough of mcp + claude api agent pipeline</span>
      </div>
    </section>
  );
}

// ─── CREATIVE ──────────────────────────────────────────────────────────

function Creative() {
  return (
    <section id="creative" className="section" data-screen-label="Creative">
      <SectionHead idx="03" kicker="Beyond the PM" title="Creative work."
                   right="Onchain · Music · Visuals" />

      <div className="creative-grid">
        {/* DANC3 — feature card, full width */}
        <div className="glass creative-card cc-full" data-reveal>
          <div className="cc-headrow">
            <div>
              <span className="ckicker">Onchain music collective · Founder · Creative Director</span>
              <div className="ctitle">DANC3</div>
            </div>
            <div className="ctags" style={{ alignSelf: "flex-start" }}>
              <span className="tag">Founder</span>
              <span className="tag alt">Onchain</span>
              <span className="tag">Brand Strategy</span>
              <a className="tag accent tag-link"
                 href="https://danc3.musictribes.xyz/"
                 target="_blank" rel="noopener"
                 data-cursor data-cursor-label="open mixtape">
                Listen to the mixtape ↗
              </a>
            </div>
          </div>
          <div className="cdesc">
            Founded and creative-directed DANC3 — an onchain music collective
            releasing music, visuals, and brand work exclusively on-chain. Built
            the creative strategy, visual identity, and community from scratch.
            The mixtape lives at <em style={{ fontStyle: "normal", color: "var(--ink-100)" }}>danc3.musictribes.xyz</em>.
          </div>

          <div className="danc3-stats">
            <div className="d3-stat">
              <div className="d3-stat-v">100<sup>+</sup></div>
              <div className="d3-stat-l">Music artists supported</div>
            </div>
            <div className="d3-stat">
              <div className="d3-stat-v">2,500<sup>+</sup></div>
              <div className="d3-stat-l">Collectors in the community</div>
            </div>
            <div className="d3-stat">
              <div className="d3-stat-v">100<span className="d3-pct">%</span></div>
              <div className="d3-stat-l">Onchain · zero web2 distribution</div>
            </div>
          </div>

          <Danc3Orbit />
        </div>

        {/* Fragments of Perception — gen art, full width */}
        <a className="glass creative-card cc-full"
           href="https://x.com/Celo/status/1827000630365544789?s=20"
           target="_blank" rel="noopener"
           data-cursor data-cursor-label="view on x"
           data-reveal>
          <div className="cc-headrow">
            <div>
              <span className="ckicker">Generative art collection · Celosphere</span>
              <div className="ctitle">Fragments of Perception</div>
            </div>
            <div className="ctags" style={{ alignSelf: "flex-start" }}>
              <span className="tag">Gen Art</span>
              <span className="tag" style={{ color: "#22c97a", borderColor: "rgba(34,201,122,0.3)", background: "rgba(34,201,122,0.12)" }}>Celo</span>
              <span className="tag">Rarible</span>
              <span className="tag accent">View on X ↗</span>
            </div>
          </div>
          <div className="cdesc">
            A three-piece on-chain collection — abstract portraiture exploring
            how the face fractures under perception. Minted on Celosphere,
            the Celo Foundation × Rarible gen-art platform, and featured by
            <em style={{ fontStyle: "normal", color: "var(--ink-100)" }}> @Celo</em>.
          </div>
          <div className="fragments-grid">
            <figure className="fragment">
              <img src={asset("fragments1", "assets/fragments-1.jpg")} alt="Fragments of Perception, piece 01 — yellow-faced portrait amid swirling pastel brushwork" loading="lazy" />
              <figcaption><span className="fr-n">01</span><span className="fr-t">Fragments of Perception</span></figcaption>
            </figure>
            <figure className="fragment">
              <img src={asset("fragments2", "assets/fragments-2.jpg")} alt="Fragments of Perception, piece 02 — partial face with single blue eye and slashing brushstrokes" loading="lazy" />
              <figcaption><span className="fr-n">02</span><span className="fr-t">Fragments of Perception</span></figcaption>
            </figure>
            <figure className="fragment">
              <img src={asset("fragments3", "assets/fragments-3.jpg")} alt="Fragments of Perception, piece 03 — two faces in motion, teal and orange palette" loading="lazy" />
              <figcaption><span className="fr-n">03</span><span className="fr-t">Fragments of Perception</span></figcaption>
            </figure>
          </div>
        </a>

        {/* YouTube */}
        <div className="glass creative-card" data-reveal>
          <span className="ckicker">YouTube · musicurator live</span>
          <div className="ctitle">Live music curation</div>
          <div className="cdesc">
            Building community at the intersection of music discovery and culture.
            Live sets, conversations, and curation.
          </div>
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
          <a className="x-btn"
             href="https://www.youtube.com/watch?v=EY0MZvbdhyc"
             target="_blank" rel="noopener"
             data-cursor data-cursor-label="watch"
             style={{ marginTop: 4 }}>
            Watch on YouTube
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* X / Twitter */}
        <div className="glass x-card" data-reveal>
          <span className="ckicker">Twitter / X</span>
          <div className="x-big">1,700<sup>+</sup></div>
          <div className="x-sub">
            Followers built organically around music, AI, and culture. Real
            conversations, not metrics.
          </div>
          <a className="x-btn" href="https://twitter.com/crittie" target="_blank" rel="noopener"
             data-cursor data-cursor-label="follow">
            Follow on X
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="section" data-screen-label="About">
      <SectionHead idx="04" kicker="The full picture" title="Operator. Builder. Curator."
                   right="Identity / Profile" />

      <div className="about">
        <div className="glass about-bio" data-reveal>
          <p>
            I've spent <em>16 years driving transformation</em> — at the IRS,
            at FEMA during Hurricane Irma, and now in the AI space. I know
            what it takes to move large systems forward, and I know what it
            takes to build something new from scratch.
          </p>
          <p>
            Right now I'm <em>building AI agents</em>, deploying workflow
            automations with MCP and the Claude API, and completing the
            Anthropic Claude Certified Architect certification. I'm the
            person who can run your executive readout in the morning and
            prototype your next AI workflow in the afternoon.
          </p>
          <p>
            Outside the PM work, I founded <em>DANC3</em>, a fully on-chain
            music collective — 100+ artists supported, 2,500+ collectors in
            the community. I mint generative art. I curate music. Above all,
            <em> I build communities</em>. These aren't hobbies — they're how
            I stay ahead of where culture and technology are going.
          </p>

          <div className="label" style={{ marginTop: 6 }}>Certifications</div>
          <div className="cert-bar">
            <span className="cert">PMP</span>
            <span className="cert">ITIL Foundation</span>
            <span className="cert">M.Cert. IT PM · GWU</span>
            <span className="cert active">Claude Certified Architect — in progress</span>
          </div>

          <div className="label" style={{ marginTop: 16 }}>Tools & Stack</div>
          <div className="tools-row">
            <span className="tag">Claude API</span>
            <span className="tag">MCP</span>
            <span className="tag">OpenClaw</span>
            <span className="tag">GitHub</span>
            <span className="tag">Google AI Studio</span>
            <span className="tag">ElevenLabs</span>
            <span className="tag">Lovable</span>
            <span className="tag">Midjourney</span>
            <span className="tag">Runway ML</span>
            <span className="tag">JIRA</span>
            <span className="tag">Notion</span>
            <span className="tag">Figma</span>
          </div>
        </div>

        <div className="glass about-card" data-reveal>
          <div className="portrait portrait-photo">
            <img src={asset("christiePortrait", "assets/christie-portrait.jpg")}
                 alt="Christie Parrow — black and white close-up of a tattooed hand resting on a wood table" />
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
            <span className="badge">
              <span style={{
                display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                background: "var(--accent)", boxShadow: "0 0 8px var(--accent)"
              }} />
              christie · miami
            </span>
          </div>

          <div className="values">
            <div className="value-row"><span className="num">01</span><span className="txt"><em style={{ fontStyle: "normal", color: "var(--ink-100)" }}>16 years</em> moving large systems forward.</span></div>
            <div className="value-row"><span className="num">02</span><span className="txt">Now <em style={{ fontStyle: "normal", color: "var(--accent)" }}>building AI agents</em> — MCP, Claude API, on the Architect track.</span></div>
            <div className="value-row"><span className="num">03</span><span className="txt"><em style={{ fontStyle: "normal", color: "var(--ink-100)" }}>I build communities</em> — DANC3, music, on-chain culture.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER / CONNECT ──────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="footer-grid">
        <div data-reveal>
          <h3 className="label">Reach out</h3>
          <p className="footer-cta">
            <a href="mailto:christineparrow@gmail.com"
               data-cursor data-cursor-label="email">
              christineparrow@gmail.com
            </a>
          </p>
          <p className="muted" style={{ maxWidth: "44ch", fontSize: 14, margin: 0 }}>
            Building at the intersection of AI and culture? Let's talk.
            Open to full-time roles, consulting, and creative collaborations.
          </p>
        </div>

        <div data-reveal>
          <h3 className="label">Channels</h3>
          <ul>
            <li><a href="https://www.linkedin.com/in/christine-parrow-pmp/" target="_blank" rel="noopener"
                   data-cursor data-cursor-label="open">LinkedIn ↗</a></li>
            <li><a href="https://github.com/crittie" target="_blank" rel="noopener"
                   data-cursor data-cursor-label="open">github / crittie ↗</a></li>
            <li><a href="https://twitter.com/crittie" target="_blank" rel="noopener"
                   data-cursor data-cursor-label="open">X · @crittie ↗</a></li>
          </ul>
        </div>

        <div data-reveal>
          <h3 className="label">Elsewhere</h3>
          <ul>
            <li><a href="https://danc3.musictribes.xyz/" target="_blank" rel="noopener"
                   data-cursor data-cursor-label="visit">DANC3 · mixtape ↗</a></li>
            <li><a href="https://x.com/Celo/status/1827000630365544789?s=20" target="_blank" rel="noopener"
                   data-cursor data-cursor-label="visit">Fragments of Perception · Celosphere ↗</a></li>
            <li><a href="https://www.youtube.com/@crittiep" target="_blank" rel="noopener"
                   data-cursor data-cursor-label="watch">musicurator live · YouTube ↗</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bot">
        <span>© 2026 · Christie Parrow · Miami, FL</span>
        <span>Built with intent · v2.6</span>
        <span>Last deploy: today</span>
      </div>
    </footer>
  );
}

window.Work = Work;
window.Creative = Creative;
window.About = About;
window.Footer = Footer;
