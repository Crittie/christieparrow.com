// app.jsx — Mounts the page, manages Tweaks state, accent CSS vars, and scroll-spy.

const { useEffect, useState, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "iris",
  "background": "aurora",
  "density": "regular",
  "motion": "full"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  iris:    { a: "#8B7CFF", b: "#06D6FF", label: "Iris × Cyan"   },
  cyan:    { a: "#06D6FF", b: "#8B7CFF", label: "Cyan × Iris"   },
  amber:   { a: "#FFB86B", b: "#FF6B6B", label: "Amber × Coral" },
  lime:    { a: "#B4E33D", b: "#06D6FF", label: "Lime × Cyan"   },
  magenta: { a: "#E879F9", b: "#06D6FF", label: "Magenta × Cyan"},
};

// Scroll-spy returns the id of the section closest to the top of the viewport
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handle = () => {
      const probe = window.innerHeight * 0.35;
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

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const active = useScrollSpy(["hero", "work", "creative", "about"]);

  // Toggle the ready class on mount so the reveal transition runs.
  // Using a transition (not animation) keeps the target state correct
  // even if the document is hidden during the transition window.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      document.body.classList.add("cp-ready");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Apply accent vars + body data attrs
  useEffect(() => {
    const accent = ACCENT_MAP[t.accent] || ACCENT_MAP.iris;
    document.documentElement.style.setProperty("--accent", accent.a);
    document.documentElement.style.setProperty("--accent-2", accent.b);
    document.documentElement.style.setProperty(
      "--accent-soft",
      `color-mix(in oklab, ${accent.a} 32%, transparent)`
    );
    document.body.dataset.bg = t.background;
    document.body.dataset.density = t.density;
    document.body.dataset.motion = t.motion;
  }, [t.accent, t.background, t.density, t.motion]);

  return (
    <React.Fragment>
      <div className="bg-stage" />
      <div className="bg-grid" />
      <div className="bg-noise" />

      <BootOverlay />
      <CustomCursor />

      <Nav active={active} />

      <main className="shell">
        <Hero motion={t.motion} />
        <Work />
        <Creative />
        <About />
        <Footer />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent palette" />
        <TweakColor
          label="Accent"
          value={ACCENT_MAP[t.accent]?.a}
          options={Object.values(ACCENT_MAP).map((m) => m.a)}
          onChange={(hex) => {
            const key = Object.keys(ACCENT_MAP).find((k) => ACCENT_MAP[k].a === hex);
            if (key) setTweak("accent", key);
          }}
        />

        <TweakSection label="Environment" />
        <TweakRadio
          label="Background"
          value={t.background}
          options={["aurora", "grid", "minimal"]}
          onChange={(v) => setTweak("background", v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "airy"]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Motion" />
        <TweakRadio
          label="Intensity"
          value={t.motion}
          options={["off", "subtle", "full"]}
          onChange={(v) => setTweak("motion", v)}
        />
        <TweakButton
          label="Replay boot sequence"
          onClick={() => { try { sessionStorage.removeItem("cp_booted"); } catch {} window.location.reload(); }}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
