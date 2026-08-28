// cursor.jsx — Custom cursor (dot + ring + contextual label) and Boot overlay.

const { useEffect, useRef, useState, useCallback } = React;

function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const pos = useRef({ x: -100, y: -100, rx: -100, ry: -100 });
  const target = useRef({ hot: false, label: "" });
  const raf = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const onOver = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        target.current.hot = true;
        target.current.label = el.getAttribute("data-cursor-label") || "";
        if (ringRef.current) ringRef.current.classList.add("hot");
        if (labelRef.current) {
          if (target.current.label) {
            labelRef.current.textContent = target.current.label;
            labelRef.current.classList.add("on");
          } else {
            labelRef.current.classList.remove("on");
          }
        }
      } else {
        target.current.hot = false;
        target.current.label = "";
        if (ringRef.current) ringRef.current.classList.remove("hot");
        if (labelRef.current) labelRef.current.classList.remove("on");
      }
    };

    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = 0;
      if (dotRef.current) dotRef.current.style.opacity = 0;
      if (labelRef.current) labelRef.current.classList.remove("on");
    };
    const onEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = 1;
      if (dotRef.current) dotRef.current.style.opacity = 1;
    };

    const loop = () => {
      const p = pos.current;
      // dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      }
      // ring lags
      p.rx += (p.x - p.rx) * 0.18;
      p.ry += (p.y - p.ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${p.rx}px, ${p.ry}px) translate(-50%, -50%)`;
      }
      if (labelRef.current && target.current.label) {
        labelRef.current.style.transform =
          `translate(${p.x + 26}px, ${p.y - 26}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-label" ref={labelRef}>OPEN</div>
    </React.Fragment>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Boot overlay — shown once per session, ~1.2s, then fades.

function BootOverlay() {
  const [done, setDone] = useState(() => {
    try { return sessionStorage.getItem("cp_booted") === "1"; }
    catch { return false; }
  });
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  const lines = [
    { label: "boot",       value: "loading kernel …",       wait: 180 },
    { label: "identity",   value: "auth: christine.parrow", wait: 220 },
    { label: "interface",  value: "rendering spatial UI",   wait: 240 },
    { label: "status",     value: "online",                 wait: 240 },
  ];

  useEffect(() => {
    if (done) return;
    let cancelled = false;
    let acc = 0;
    const total = lines.reduce((s, l) => s + l.wait, 0);

    const advance = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, lines[i].wait));
        acc += lines[i].wait;
        setLineIdx(i + 1);
        setProgress((acc / total) * 100);
      }
      setTimeout(() => {
        try { sessionStorage.setItem("cp_booted", "1"); } catch {}
        setDone(true);
      }, 240);
    };
    advance();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done && progress === 0) return null;

  return (
    <div className={"boot " + (done ? "fade" : "")} aria-hidden={done}>
      <div className="boot-inner">
        <div className="boot-tag">
          <span>christieparrow · system</span>
          <span className="right">v2.6 — online</span>
        </div>
        <div className="boot-bar"><i style={{ width: `${progress}%` }} /></div>
        <div className="boot-lines">
          {lines.slice(0, lineIdx).map((l, i) => (
            <div key={i}>
              <span style={{ color: "var(--ink-40)" }}>0{i + 1}  </span>
              <span style={{ color: "var(--ink-60)" }}>{l.label.padEnd(10, " ")}</span>
              <span className="acc">→</span>{" "}
              <em>{l.value}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.CustomCursor = CustomCursor;
window.BootOverlay = BootOverlay;
