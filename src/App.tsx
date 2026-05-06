import { useCallback, useMemo, useState } from "react";
import "./App.css";

const EMBED_URL =
  import.meta.env.VITE_SETMAKER_EMBED_URL ??
  "https://staging.setmaker.co/embed/i-just-got-paid-crf1m";
const LOGO_URL =
  import.meta.env.VITE_SETMAKER_LOGO_URL ??
  "https://staging.setmaker.co/img/icon-logo.png";

function App() {
  const [launcherOpen, setLauncherOpen] = useState(false);

  const embedSrc = useMemo(() => EMBED_URL, []);
  const logoSrc = useMemo(() => LOGO_URL, []);

  const closeLauncher = useCallback(() => setLauncherOpen(false), []);

  return (
    <>
      <header className="lp-header">
        <div className="lp-header-inner">
          <a className="lp-brand" href="#top" aria-label="Partner site home">
            <span className="lp-brand-mark" aria-hidden="true" />
            <span className="lp-brand-name">Trail Museum</span>
          </a>
          <nav className="lp-nav" aria-label="Primary">
            <a href="#tour">Tour</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="lp-header-cta">
            <a className="lp-btn lp-btn--ghost" href="#tour">
              View tour
            </a>
            <button
              type="button"
              className="lp-btn lp-btn--solid"
              onClick={() => setLauncherOpen(true)}
            >
              Launch walkthrough
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="lp">
        <section className="lp-hero">
          <div className="lp-hero-grid">
            <div className="lp-hero-copy">
              <p className="lp-eyebrow">Partner embed demo</p>
              <h1 className="lp-title">An audio tour that lives on your site.</h1>
              <p className="lp-subtitle">
                This landing page shows how SetMaker’s <code>/embed</code> route
                can be embedded directly in a partner page with a clean, branded
                frame—no login required.
              </p>

              <div className="lp-actions">
                <a className="lp-btn lp-btn--solid" href="#tour">
                  Try the embed
                </a>
                <a className="lp-btn lp-btn--ghost" href="#how">
                  Learn more
                </a>
              </div>

              <div className="lp-meta">
                <div className="lp-pill">
                  <span className="lp-pill-k">Embed URL</span>
                  <span className="lp-pill-v">{EMBED_URL}</span>
                </div>
                <div className="lp-pill">
                  <span className="lp-pill-k">Logo</span>
                  <span className="lp-pill-v">{LOGO_URL}</span>
                </div>
              </div>
            </div>

            <div className="lp-hero-media" aria-label="Walkthrough preview">
              <div className="lp-hero-embed">
                <div style={{ width: "100%", maxWidth: "100%", margin: "1.25rem 0" }}>
                  <iframe
                    src={embedSrc}
                    title="SetMaker walkthrough"
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "100%",
                      height: "min(85dvh,720px)",
                      minHeight: "420px",
                      border: 0,
                      borderRadius: "12px",
                      background: "#0a0a0a",
                    }}
                    allow="autoplay; fullscreen"
                    loading="lazy"
                  />
                </div>
              </div>

              <p className="lp-hint">
                Optional env in <code>.env</code>:{" "}
                <code>VITE_SETMAKER_EMBED_URL</code>,{" "}
                <code>VITE_SETMAKER_LOGO_URL</code>
              </p>
            </div>
          </div>
        </section>

        <section id="tour" className="lp-section">
          <div className="lp-section-head">
            <h2>Embedded tour</h2>
            <p>
              Inline embed (map-embed style) plus an optional launcher button that
              opens the same walkthrough in an overlay.
            </p>
          </div>

          <div className="lp-embed-wide">
            <div className="lp-snippet-stack">
              <div className="lp-snippet-block">
                <div style={{ width: "100%", maxWidth: "100%", margin: "1.25rem 0" }}>
                  <iframe
                    src={embedSrc}
                    title="SetMaker walkthrough"
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "100%",
                      height: "min(85dvh,720px)",
                      minHeight: "420px",
                      border: 0,
                      borderRadius: "12px",
                      background: "#0a0a0a",
                    }}
                    allow="autoplay; fullscreen"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="lp-snippet-block">
                <div id="setmaker-embed-i-just-got-paid-crf1m">
                  <button
                    type="button"
                    className="setmaker-open"
                    aria-label="Open SetMaker walkthrough"
                    style={{
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      borderRadius: "12px",
                    }}
                    onClick={() => setLauncherOpen(true)}
                  >
                    <img
                      src={logoSrc}
                      alt=""
                      width={48}
                      height={48}
                      style={{ display: "block", borderRadius: "12px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="lp-section lp-section--split">
          <div className="lp-card">
            <h3>Why this works for partners</h3>
            <ul className="lp-list">
              <li>Drop-in iframe embed (no SDK required)</li>
              <li>Public route suitable for vulnerability scanning</li>
              <li>Modern CSP control via <code>frame-ancestors</code></li>
            </ul>
          </div>
          <div className="lp-card">
            <h3>Recommended sizing</h3>
            <ul className="lp-list">
              <li>Desktop: 600–720px tall</li>
              <li>Mobile: “tall” viewport (min 420px)</li>
              <li>Place near top of the page for discovery</li>
            </ul>
          </div>
        </section>

        <section id="faq" className="lp-section">
          <div className="lp-section-head">
            <h2>FAQ</h2>
            <p>Common questions when embedding SetMaker on third-party sites.</p>
          </div>

          <div className="lp-faq">
            <details className="lp-faq-item">
              <summary>Does the embed require authentication?</summary>
              <p>No—this demo assumes the embed route is public.</p>
            </details>
            <details className="lp-faq-item">
              <summary>What about iframe security headers?</summary>
              <p>
                Use CSP <code>frame-ancestors</code> to allow partner domains and
                avoid sending <code>X-Frame-Options: DENY</code>.
              </p>
            </details>
            <details className="lp-faq-item">
              <summary>Can we open it as an overlay instead?</summary>
              <p>
                Yes—click <strong>Launch walkthrough</strong> in the header to
                open the same embed in a lightbox.
              </p>
            </details>
          </div>
        </section>

        <footer className="lp-footer">
          <div className="lp-footer-inner">
            <div className="lp-footer-left">
              <div className="lp-footer-title">Trail Museum</div>
              <div className="lp-footer-sub">
                Powered by SetMaker embed demo
              </div>
            </div>
            <div className="lp-footer-right">
              <button
                type="button"
                className="lp-btn lp-btn--ghost"
                onClick={() => setLauncherOpen(true)}
              >
                Launch walkthrough
              </button>
            </div>
          </div>
        </footer>
      </main>

      {launcherOpen ? (
        <div
          className="setmaker-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLauncher();
          }}
        >
          <div className="setmaker-overlay-inner">
            <button
              type="button"
              className="setmaker-overlay-close"
              aria-label="Close walkthrough"
              onClick={closeLauncher}
            >
              Close
            </button>
            <div className="setmaker-iframe-shell setmaker-iframe-shell--overlay">
              <iframe
                src={embedSrc}
                title="SetMaker walkthrough (overlay)"
                loading="lazy"
                allow="autoplay; fullscreen"
              />
            </div>
            <div className="setmaker-overlay-foot">
              <img src={logoSrc} alt="" width={22} height={22} />
              <span>SetMaker</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
