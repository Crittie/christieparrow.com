// hero.jsx — Top nav + Hero with kinetic name + live status panel.

const { useEffect, useRef, useState } = React;

// ─── NAV ───────────────────────────────────────────────────────────────

function Nav({ active }) {
  return (
    <nav className="nav" aria-label="primary">
      <div className="nav-brand">
        <span className="nav-brand-glyph" aria-hidden="true" />
        <span>cp · /</span>
      </div>
      <a href="#hero"     className={"nav-link " + (active === "hero"     ? "active" : "")}>Index</a>
      <a href="#work"     className={"nav-link " + (active === "work"     ? "active" : "")}>Work</a>
      <a href="#creative" className={"nav-link " + (active === "creative" ? "active" : "")}>Creative</a>
      <a href="#about"    className={"nav-link " + (active === "about"    ? "active" : "")}>About</a>
      <div className="nav-cta">
        <a className="nav-icon-btn" href="https://github.com/crittie"
           data-cursor data-cursor-label="github"
           target="_blank" rel="noopener" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.4 22.9c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>
          </svg>
        </a>
        <a className="nav-icon-btn" href="https://www.linkedin.com/in/christine-parrow-pmp/"
           data-cursor data-cursor-label="linkedin"
           target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8h4.56v14H.22V8Zm7.3 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.2c0-1.48-.03-3.39-2.07-3.39-2.07 0-2.39 1.62-2.39 3.29V22H7.52V8Z"/>
          </svg>
        </a>
        <a className="nav-icon-btn" href="https://twitter.com/crittie"
           data-cursor data-cursor-label="twitter"
           target="_blank" rel="noopener" aria-label="X / Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2H21.5l-7.5 8.572L23 22h-6.86l-5.36-7.01L4.62 22H1.36l8.04-9.19L1 2h7.04l4.84 6.4L18.244 2Zm-1.2 18h1.86L7.04 4H5.05l11.994 16Z"/>
          </svg>
        </a>
      </div>
    </nav>
  );
}

// ─── KINETIC NAME ──────────────────────────────────────────────────────

function KineticName({ motion }) {
  const ref = useRef(null);

  useEffect(() => {
    if (motion !== "full") return;
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll(".letter:not(.space)"));

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      nodes.forEach((n) => {
        const li = parseFloat(n.dataset.li) || 0;
        const wave = Math.sin((dx * 2) + li * 0.4) * 6;
        const tilt = dy * 4;
        n.style.transform = `translateY(${wave + tilt}px) rotateX(${-dy * 6}deg)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      // Clear any leftover inline transforms when motion preference changes
      nodes.forEach((n) => { n.style.transform = ""; });
    };
  }, [motion]);

  const renderLine = (text, baseIdx) => {
    let li = baseIdx;
    return text.split("").map((ch, i) => {
      if (ch === " ") return <span key={i} className="letter space" />;
      li++;
      return (
        <span
          key={i}
          className="letter"
          data-li={li}
          style={{ "--li": li }}
        >
          {ch}
        </span>
      );
    });
  };

  return (
    <h1 className="kinetic-name" ref={ref}>
      <span className="line line-1">{renderLine("Christie", 0)}</span>
      <span className="line line-2">{renderLine("Parrow.", 8)}</span>
    </h1>
  );
}

// ─── LIVE STATUS ───────────────────────────────────────────────────────

function useClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function StatusCard() {
  const t = useClock();
  const opts = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  const time = t.toLocaleTimeString("en-US", opts);
  return (
    <div className="glass status-card" data-reveal>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="status-pill"><span className="pulse" /> Available now</span>
        <span className="label">live</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="status-row"><span className="k label">Local time</span><span className="v">{time}</span></div>
        <div className="status-row"><span className="k label">Location</span><span className="v">Miami, FL · UTC−4</span></div>
        <div className="status-row"><span className="k label">Role</span><span className="v">AI Transformation PM</span></div>
        <div className="status-row"><span className="k label">Focus</span><span className="v">AI Agents · MCP · Onchain</span></div>
      </div>
    </div>
  );
}

function NowCard() {
  return (
    <div className="glass now-card" data-reveal>
      <div className="now-h">
        <span className="label"><span className="dot" style={{
          display: "inline-block", width: 6, height: 6, borderRadius: "50%",
          background: "var(--accent)", marginRight: 8, verticalAlign: "middle",
          boxShadow: "0 0 8px var(--accent)"
        }} />Now</span>
        <span className="label" style={{ color: "var(--ink-40)" }}>05 · 26</span>
      </div>
      <p className="now-body" style={{ margin: 0 }}>
        Building agentic workflows with <em>MCP + Claude API</em>.
        Running <em>DANC3</em>. Finishing the Anthropic Claude Certified Architect cert.
      </p>
      <div className="ticker">last sync · 38s ago — health <span style={{ color: "var(--accent)" }}>● nominal</span></div>
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────

function Hero({ motion }) {
  return (
    <section id="hero" className="hero" data-screen-label="Hero">
      <div className="hero-meta">
        <div className="hero-meta-top">
          <span className="eyebrow" data-reveal><span className="dot" />Miami, FL · Available now</span>
          <span className="label" data-reveal style={{ color: "var(--ink-40)" }}>01 / Index</span>
        </div>

        <KineticName motion={motion} />

        <p className="hero-tagline" data-reveal>
          <em>AI Transformation Program Manager.</em>{" "}
          Creative Director · Onchain Builder · Community Architect.
          Sixteen years moving large systems forward — now building the AI ones.
        </p>
      </div>

      <div className="hero-side">
        <StatusCard />
        <NowCard />
      </div>

      <div className="hero-strip">
        <div className="glass stat" data-reveal>
          <div className="stat-v">16<sub>+ yrs</sub></div>
          <div className="stat-l">Driving transformation</div>
        </div>
        <div className="glass stat" data-reveal>
          <div className="stat-v">PMP</div>
          <div className="stat-l">Project Management Professional</div>
        </div>
        <div className="glass stat" data-reveal>
          <div className="stat-v">MCP</div>
          <div className="stat-l">Model Context Protocol builder</div>
        </div>
        <div className="glass stat" data-reveal>
          <div className="stat-v">DANC3</div>
          <div className="stat-l">Onchain collective, founder</div>
        </div>
        <div className="glass stat" data-reveal>
          <div className="stat-v">1.7K<sub>+</sub></div>
          <div className="stat-l">Followers on X · music + AI + culture</div>
        </div>
      </div>
    </section>
  );
}

window.Nav = Nav;
window.Hero = Hero;
