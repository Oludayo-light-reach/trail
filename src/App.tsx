import { useCallback, useMemo, useState } from "react";
import "./App.css";

const EMBED_URL =
  import.meta.env.VITE_SETMAKER_EMBED_URL ??
  "https://staging.setmaker.co/embed/i-just-got-paid-crf1m";
const LOGO_URL =
  import.meta.env.VITE_SETMAKER_LOGO_URL ??
  "https://staging.setmaker.co/img/icon-logo.png";

function parseEmbedSlug(url: string): string | null {
  try {
    const { pathname } = new URL(url);
    const m = pathname.match(/\/embed\/([^/]+)\/?$/);
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

/** Turn `i-just-got-paid-crf1m` → "I Just Got Paid" by dropping trailing id-like segments */
function titleFromSlug(slug: string): string {
  const parts = slug.split("-").filter(Boolean);
  while (
    parts.length > 1 &&
    /^[a-z0-9]{3,10}$/i.test(parts[parts.length - 1]!) &&
    /\d/.test(parts[parts.length - 1]!)
  ) {
    parts.pop();
  }
  return parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

const IFRAME_PROPS = {
  allow: "autoplay; fullscreen",
  loading: "lazy" as const,
};

function App() {
  const [launcherOpen, setLauncherOpen] = useState(false);

  const embedSrc = useMemo(() => EMBED_URL, []);
  const logoSrc = useMemo(() => LOGO_URL, []);

  const setSlug = useMemo(() => parseEmbedSlug(EMBED_URL), []);
  const setTitle = useMemo(
    () =>
      import.meta.env.VITE_DEMO_SET_TITLE?.trim() ||
      (setSlug ? titleFromSlug(setSlug) : "Featured set"),
    [setSlug],
  );

  const closeLauncher = useCallback(() => setLauncherOpen(false), []);

  return (
    <>
      <header className="lp-header">
        <div className="lp-header-inner">
          <a className="lp-brand" href="#top" aria-label="Demo home">
            <span className="lp-brand-mark" aria-hidden="true" />
            <span className="lp-brand-name">Northside Creative</span>
          </a>
          <nav className="lp-nav" aria-label="Primary">
            <a href="#set">The set</a>
            <a href="#experience">Experience</a>
            <a href="#embed">For your site</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="lp-header-cta">
            <a className="lp-btn lp-btn--ghost" href="#set">
              Preview
            </a>
            <button
              type="button"
              className="lp-btn lp-btn--solid"
              onClick={() => setLauncherOpen(true)}
            >
              Open full player
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="lp">
        <section className="lp-hero lp-hero--set">
          <div className="lp-hero-grid">
            <div className="lp-hero-copy">
              <p className="lp-eyebrow">SetMaker · client demo</p>
              <h1 className="lp-title">
                Your flagship set,
                <span className="lp-title-accent">
                  {" "}
                  embedded where fans already are.
                </span>
              </h1>
              <p className="lp-subtitle">
                Below is a real SetMaker <strong>set</strong>—structured cues,
                scenes, and playback—running inside your page. No hand-rolled
                audio UI: just the embed, styled to feel native to this landing.
              </p>

              <div className="lp-set-chip" aria-label="Featured set">
                <span className="lp-set-chip-label">Now showcasing</span>
                <span className="lp-set-chip-title">{setTitle}</span>
              </div>

              <div className="lp-stat-row" role="list">
                <div className="lp-stat" role="listitem">
                  <span className="lp-stat-k">Format</span>
                  <span className="lp-stat-v">Cue-driven set</span>
                </div>
                <div className="lp-stat" role="listitem">
                  <span className="lp-stat-k">Delivery</span>
                  <span className="lp-stat-v">Secure iframe</span>
                </div>
                <div className="lp-stat" role="listitem">
                  <span className="lp-stat-k">Visitor flow</span>
                  <span className="lp-stat-v">Play in-page</span>
                </div>
              </div>

              <div className="lp-actions">
                <a className="lp-btn lp-btn--solid" href="#set">
                  Jump to the embed
                </a>
                <button
                  type="button"
                  className="lp-btn lp-btn--ghost"
                  onClick={() => setLauncherOpen(true)}
                >
                  Lightbox mode
                </button>
              </div>
            </div>

            <div className="lp-hero-media" aria-label="Set preview">
              <div className="lp-embed-frame">
                <div className="lp-embed-frame-head">
                  <span className="lp-embed-dots" aria-hidden="true" />
                  <span className="lp-embed-frame-title">{setTitle}</span>
                </div>
                <div className="lp-embed-frame-body">
                  <iframe
                    src={embedSrc}
                    title={`${setTitle} — SetMaker embed`}
                    className="lp-embed-iframe"
                    {...IFRAME_PROPS}
                  />
                </div>
              </div>
              <p className="lp-hint">
                This frame mirrors how the set appears on your properties—dark
                stage, focused controls, your brand around it.
              </p>
            </div>
          </div>
        </section>

        <section id="set" className="lp-section lp-section--set">
          <div className="lp-section-head lp-section-head--wide">
            <h2>Inside {setTitle}</h2>
            <p>
              Sets are not single files—they are journeys. Each cue advances the
              story: context, beat drops, and payoffs. The embed keeps that
              structure intact so listeners get the intended experience, not a
              loose playlist.
            </p>
          </div>

          <div className="lp-cue-grid">
            <article className="lp-cue-card">
              <span className="lp-cue-num">01</span>
              <h3>Scene: clock-out energy</h3>
              <p>
                Opens with the “finally Friday” lift—setting tone before the
                hook lands. Perfect for brands that want instant emotional
                recognition.
              </p>
            </article>
            <article className="lp-cue-card">
              <span className="lp-cue-num">02</span>
              <h3>Cue: the payoff hit</h3>
              <p>
                The moment the title line lands—designed as a peak in the set,
                not a random skip point. SetMaker keeps timing and intent
                consistent everywhere.
              </p>
            </article>
            <article className="lp-cue-card">
              <span className="lp-cue-num">03</span>
              <h3>Outro: loop-friendly</h3>
              <p>
                Closes clean for replays or hand-off to your next CTA—tickets,
                sign-ups, or merch—without breaking the page flow.
              </p>
            </article>
          </div>
        </section>

        <section id="experience" className="lp-section">
          <div className="lp-spotlight">
            <div className="lp-spotlight-copy">
              <h2>Two ways to surface the same set</h2>
              <p>
                Most partners keep the embed inline for discovery. For
                campaigns, a launcher opens the identical experience in a
                focused overlay—same URL, same cues, zero duplicate production.
              </p>
              <ul className="lp-checklist">
                <li>
                  Inline embed for scroll-stopping hero or article placement
                </li>
                <li>
                  Launcher chip for subtle entry points (nav, footer, sticky
                  CTA)
                </li>
              </ul>
              <div className="lp-launcher-row">
                <button
                  type="button"
                  className="lp-launcher-chip"
                  onClick={() => setLauncherOpen(true)}
                  aria-label={`Open ${setTitle} in overlay`}
                >
                  <img src={logoSrc} alt="" width={40} height={40} />
                  <span className="lp-launcher-chip-text">
                    <span className="lp-launcher-chip-k">Play</span>
                    <span className="lp-launcher-chip-v">{setTitle}</span>
                  </span>
                </button>
              </div>
            </div>
            <div className="lp-spotlight-embed">
              <div className="lp-embed-frame lp-embed-frame--soft">
                <div className="lp-embed-frame-head">
                  <span className="lp-embed-dots" aria-hidden="true" />
                  <span className="lp-embed-frame-title">Inline embed</span>
                </div>
                <div className="lp-embed-frame-body">
                  <iframe
                    src={embedSrc}
                    title={`${setTitle} — inline embed`}
                    className="lp-embed-iframe lp-embed-iframe--tall"
                    {...IFRAME_PROPS}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="embed"
          className="lp-section lp-section--split lp-section--tech"
        >
          <div className="lp-card lp-card--accent">
            <h3>Why teams choose SetMaker sets</h3>
            <ul className="lp-list">
              <li>
                <strong>Structured storytelling</strong> — cues and scenes, not
                a flat player dumped on the page
              </li>
              <li>
                <strong>One URL to maintain</strong> — update the set in
                SetMaker; every embed reflects it
              </li>
              <li>
                <strong>Partner-safe framing</strong> — CSP{" "}
                <code>frame-ancestors</code> lists your domains explicitly
              </li>
            </ul>
          </div>
          <div className="lp-card">
            <h3>Sizing that feels intentional</h3>
            <ul className="lp-list">
              <li>Hero: ~720px tall on desktop, min 420px on small screens</li>
              <li>Editorial: full column width with 12px–16px corner radius</li>
              <li>
                Place above the fold when the set is the campaign centerpiece
              </li>
            </ul>
          </div>
        </section>

        <section className="lp-section lp-section--mono">
          <div className="lp-section-head">
            <h2>Embed reference</h2>
            <p>
              For your developers—drop in the iframe <code>src</code> you
              approve.
            </p>
          </div>
          <pre className="lp-code-block" tabIndex={0}>
            <code>{`<iframe
  src="${EMBED_URL}"
  title="${setTitle}"
  style="width:100%;max-width:720px;height:min(85dvh,720px);border:0;border-radius:12px"
  allow="autoplay; fullscreen"
  loading="lazy"
/>`}</code>
          </pre>
        </section>

        <section id="faq" className="lp-section">
          <div className="lp-section-head">
            <h2>FAQ</h2>
            <p>Answers we give before procurement asks them.</p>
          </div>

          <div className="lp-faq">
            <details className="lp-faq-item">
              <summary>Is the embed the full set experience?</summary>
              <p>
                Yes—the same cues, progression, and playback you publish in
                SetMaker. Partners wrap it in their layout; we keep the
                performance and structure inside the frame.
              </p>
            </details>
            <details className="lp-faq-item">
              <summary>Do visitors need a SetMaker account?</summary>
              <p>
                For public sets, no. If you gate paid sets, checkout and sign-in
                can open in the top window while preserving the embed context
                where configured.
              </p>
            </details>
            <details className="lp-faq-item">
              <summary>How do we allow our domain in the iframe?</summary>
              <p>
                Your team adds approved parent origins via CSP{" "}
                <code>frame-ancestors</code> (and avoids blanket{" "}
                <code>X-Frame-Options: DENY</code>
                ). We coordinate the exact hostnames during onboarding.
              </p>
            </details>
          </div>
        </section>

        <footer className="lp-footer">
          <div className="lp-footer-inner">
            <div className="lp-footer-left">
              <div className="lp-footer-title">Northside Creative</div>
              <div className="lp-footer-sub">
                Demo page · set: {setTitle} · powered by SetMaker
              </div>
            </div>
            <div className="lp-footer-right">
              <button
                type="button"
                className="lp-btn lp-btn--ghost"
                onClick={() => setLauncherOpen(true)}
              >
                Open full player
              </button>
            </div>
          </div>
        </footer>
      </main>

      {launcherOpen ? (
        <div
          className="setmaker-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${setTitle} player`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLauncher();
          }}
        >
          <div className="setmaker-overlay-inner">
            <button
              type="button"
              className="setmaker-overlay-close"
              aria-label="Close player"
              onClick={closeLauncher}
            >
              Close
            </button>
            <div className="setmaker-iframe-shell setmaker-iframe-shell--overlay">
              <iframe
                src={embedSrc}
                title={`${setTitle} — overlay`}
                {...IFRAME_PROPS}
              />
            </div>
            <div className="setmaker-overlay-foot">
              <img src={logoSrc} alt="" width={22} height={22} />
              <span>
                {setTitle} · <strong>SetMaker</strong>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
