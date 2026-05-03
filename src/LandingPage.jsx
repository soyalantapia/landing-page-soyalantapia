import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0A0A0F",
  bgCard: "#12121A",
  bgCardHover: "#1A1A25",
  purple: "#8B5CF6",
  purpleLight: "#A78BFA",
  purpleDark: "#6D28D9",
  gold: "#D4A853",
  goldLight: "#E8C97A",
  goldDark: "#B8922E",
  white: "#F5F5F7",
  gray: "#9CA3AF",
  grayLight: "#D1D5DB",
  grayDark: "#4B5563",
  border: "rgba(139,92,246,0.15)",
  whatsapp: "#25D366",
  whatsappDark: "#128C7E",
  // Light theme tokens (para secciones invertidas que rompen monotonia)
  bgLight: "#F4F4F7",
  bgLightCard: "#FFFFFF",
  textOnLight: "#0A0A0F",
  textOnLightSecondary: "#475569",
  borderOnLight: "rgba(15,23,42,0.08)",
  borderOnLightAccent: "rgba(139,92,246,0.22)",
};

function WhatsAppIcon({ size = 18, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
    </svg>
  );
}

function FadeIn({ children, delay = 0, className = "", instant = false }) {
  const ref = useRef(null);
  // Si instant=true (hero / above-the-fold), arranca visible para no dejar pantalla vacía.
  const [visible, setVisible] = useState(instant);
  const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (instant || reduced) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduced, instant]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: reduced ? "none" : `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ children, theme = "dark" }) {
  const isLight = theme === "light";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 16px",
        borderRadius: "100px",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: isLight ? COLORS.goldDark : COLORS.gold,
        border: `1px solid ${isLight ? COLORS.goldDark + "40" : COLORS.gold + "40"}`,
        background: isLight ? COLORS.goldDark + "12" : COLORS.gold + "10",
      }}
    >
      {children}
    </span>
  );
}

function PhaseCard({ number, title, weeks, description, deliverable, delay, theme = "dark" }) {
  const isLight = theme === "light";
  return (
    <FadeIn delay={delay}>
      <div
        style={{
          background: isLight ? COLORS.bgLightCard : COLORS.bgCard,
          border: `1px solid ${isLight ? COLORS.borderOnLight : COLORS.border}`,
          borderRadius: "16px",
          padding: "32px",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: isLight ? "0 1px 2px rgba(15,23,42,0.04)" : "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = isLight ? COLORS.purple + "55" : COLORS.purple + "60";
          if (isLight) e.currentTarget.style.boxShadow = "0 16px 40px -16px rgba(139,92,246,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = isLight ? COLORS.borderOnLight : COLORS.border;
          if (isLight) e.currentTarget.style.boxShadow = "0 1px 2px rgba(15,23,42,0.04)";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span
            style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: 700, color: "#fff",
            }}
          >
            {number}
          </span>
          <span style={{ fontSize: "12px", color: isLight ? COLORS.textOnLightSecondary : COLORS.gray, fontWeight: 500, letterSpacing: "0.5px" }}>
            {weeks}
          </span>
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: isLight ? COLORS.textOnLight : COLORS.white, marginBottom: "12px", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: "15px", color: isLight ? COLORS.textOnLightSecondary : COLORS.gray, lineHeight: 1.7, marginBottom: "16px", fontWeight: isLight ? 450 : 400 }}>
          {description}
        </p>
        <div
          style={{
            padding: "12px 16px", borderRadius: "10px",
            background: isLight ? COLORS.purple + "0F" : COLORS.purple + "08",
            border: `1px solid ${isLight ? COLORS.purple + "22" : COLORS.purple + "15"}`,
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 600, color: isLight ? COLORS.purpleDark : COLORS.purpleLight, letterSpacing: "1px", textTransform: "uppercase" }}>
            Lo que te llevás
          </span>
          <p style={{ fontSize: "14px", color: isLight ? COLORS.textOnLight : COLORS.grayLight, marginTop: "4px", lineHeight: 1.5 }}>
            {deliverable}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

function IncludeItem({ icon, title, desc, theme = "dark" }) {
  const isLight = theme === "light";
  return (
    <div
      style={{
        display: "flex", gap: "16px", alignItems: "flex-start",
        padding: "22px 24px", borderRadius: "14px",
        background: isLight ? COLORS.bgLightCard : COLORS.bgCard,
        border: `1px solid ${isLight ? COLORS.borderOnLight : COLORS.border}`,
        height: "100%",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: isLight ? "0 1px 2px rgba(15,23,42,0.04)" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isLight ? COLORS.purple + "40" : COLORS.purple + "40";
        if (isLight) e.currentTarget.style.boxShadow = "0 12px 30px -12px rgba(139,92,246,0.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isLight ? COLORS.borderOnLight : COLORS.border;
        if (isLight) e.currentTarget.style.boxShadow = "0 1px 2px rgba(15,23,42,0.04)";
      }}
    >
      <div
        style={{
          width: "44px", height: "44px", minWidth: "44px", borderRadius: "12px",
          background: isLight ? COLORS.purple + "12" : COLORS.purple + "15",
          border: `1px solid ${isLight ? COLORS.purple + "22" : COLORS.purple + "20"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px",
        }}
      >
        {icon}
      </div>
      <div>
        <h4 style={{ fontSize: "16px", fontWeight: 600, color: isLight ? COLORS.textOnLight : COLORS.white, marginBottom: "6px" }}>{title}</h4>
        <p style={{ fontSize: "14px", color: isLight ? COLORS.textOnLightSecondary : COLORS.gray, lineHeight: 1.6, fontWeight: isLight ? 450 : 400 }}>{desc}</p>
      </div>
    </div>
  );
}

function Photo({ src, alt, aspectRatio = "3/4", fallbackInitials = "AT", fallbackLabel, fallbackSubLabel, accentColor = "purple", style = {}, fitContain = false }) {
  const [errored, setErrored] = useState(false);
  const accent = accentColor === "gold" ? COLORS.gold : COLORS.purple;
  const baseUrl = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL) || "/";
  const fullSrc = src ? `${baseUrl.replace(/\/$/, "")}/${src.replace(/^\//, "")}` : null;
  return (
    <div
      style={{
        position: "relative", width: "100%", aspectRatio,
        borderRadius: "20px", overflow: "hidden",
        background: `radial-gradient(circle at 30% 20%, ${accent}25, ${COLORS.bgCard} 70%)`,
        border: `1px solid ${COLORS.gold}40`,
        boxShadow: `0 30px 80px -30px ${accent}50, 0 0 0 1px ${COLORS.gold}15 inset`,
        ...style,
      }}
    >
      {fullSrc && !errored ? (
        <img
          src={fullSrc}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: fitContain ? "contain" : "cover", display: "block" }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "20px" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(48px, 9vw, 96px)", fontWeight: 700, lineHeight: 1, background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{fallbackInitials}</div>
          {fallbackLabel && <div style={{ fontSize: "12px", color: COLORS.gray, marginTop: "12px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>{fallbackLabel}</div>}
          {fallbackSubLabel && <div style={{ fontSize: "11px", color: COLORS.grayDark, marginTop: "4px" }}>{fallbackSubLabel}</div>}
        </div>
      )}
    </div>
  );
}

function CompanyTag({ name, role }) {
  return (
    <div
      style={{
        padding: "12px 20px", borderRadius: "12px",
        background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "15px", fontWeight: 700, color: COLORS.white }}>{name}</div>
      <div style={{ fontSize: "12px", color: COLORS.gray, marginTop: "2px" }}>{role}</div>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const whatsappLink = "https://wa.me/5491154596266?text=Hola%20Alan%2C%20vi%20la%20propuesta%20y%20me%20interesa%20hablar.";

  return (
    <div style={{ background: COLORS.bg, color: COLORS.white, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${COLORS.purple}40; color: #fff; }
        body { background: ${COLORS.bg}; -webkit-tap-highlight-color: transparent; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
        .at-cta-pulse { animation: at-pulse 2.4s ease-in-out infinite; }
        @keyframes at-pulse {
          0%, 100% { box-shadow: 0 4px 30px ${COLORS.whatsapp}40; }
          50% { box-shadow: 0 4px 50px ${COLORS.whatsapp}80; }
        }
        .at-btn-tap:active { transform: scale(0.97) !important; }
        .at-fit { max-width: 720px; margin-left: auto; margin-right: auto; }
        .at-fit-wide { max-width: 1080px; margin-left: auto; margin-right: auto; }
        .at-fit-xl { max-width: 1200px; margin-left: auto; margin-right: auto; }
        .at-hero-text { max-width: 760px; margin-left: auto; margin-right: auto; }
        @media (min-width: 1024px) { .at-hero-text { max-width: 1000px; } }
        .at-phases { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .at-phases { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1100px) { .at-phases { grid-template-columns: repeat(4, 1fr); } }
        .at-fit-grid { display: grid; gap: 24px; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .at-fit-grid { grid-template-columns: 1fr 1fr; } }
        .at-2col { display: grid; gap: 24px; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .at-2col { grid-template-columns: 1fr 1fr; gap: 32px; } }
        .at-section-pad { padding: 80px 24px; }
        @media (min-width: 1024px) { .at-section-pad { padding: 120px 48px; } }
        .at-bio-grid { display: grid; gap: 40px; grid-template-columns: 1fr; align-items: start; }
        @media (min-width: 900px) { .at-bio-grid { grid-template-columns: 320px 1fr; gap: 56px; } }
        .at-portrait {
          position: relative; width: 100%; aspect-ratio: 3/4;
          border-radius: 20px; overflow: hidden;
          background: radial-gradient(circle at 30% 20%, ${COLORS.purple}25, ${COLORS.bgCard} 70%);
          border: 1px solid ${COLORS.gold}40;
          box-shadow: 0 30px 80px -30px ${COLORS.purple}50, 0 0 0 1px ${COLORS.gold}15 inset;
        }
        .at-biz-card {
          padding: 24px 28px; border-radius: 14px;
          background: ${COLORS.bgCard};
          border: 1px solid ${COLORS.border};
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .at-biz-card:hover { border-color: ${COLORS.gold}40; transform: translateY(-2px); }
        .at-prop-grid { display: grid; gap: 40px; grid-template-columns: 1fr; align-items: center; }
        @media (min-width: 900px) { .at-prop-grid { grid-template-columns: 1.2fr 1fr; gap: 56px; } }
        .at-reason-card {
          padding: 24px; border-radius: 14px;
          background: ${COLORS.bgCard};
          border: 1px solid ${COLORS.border};
          height: 100%;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .at-reason-card:hover { border-color: ${COLORS.purple}40; transform: translateY(-2px); }
        .at-gallery-grid { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
        @media (min-width: 900px) { .at-gallery-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
        .at-testimonial-grid { display: grid; gap: 20px; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .at-testimonial-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1100px) { .at-testimonial-grid { grid-template-columns: repeat(4, 1fr); } }
        .at-testimonial-layout { display: grid !important; gap: 32px !important; grid-template-columns: 1fr !important; }
        @media (min-width: 900px) { .at-testimonial-layout { grid-template-columns: minmax(320px, 400px) 1fr !important; gap: 40px !important; align-items: start !important; } }
        .at-quote-grid { grid-template-columns: 1fr !important; }
        @media (min-width: 720px) { .at-quote-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (min-width: 1100px) { .at-quote-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        .at-sticky-cta {
          position: fixed; left: 0; right: 0; bottom: 0;
          padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
          background: linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.92) 35%, rgba(10,10,15,0.98) 100%);
          backdrop-filter: blur(12px);
          z-index: 90;
          display: flex; justify-content: center;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .at-sticky-cta > a { pointer-events: auto; }
        @media (min-width: 768px) { .at-sticky-cta { display: none; } }
        .at-hero-pad-bottom { padding-bottom: 80px; }
        @media (max-width: 767px) { .at-hero-pad-bottom { padding-bottom: 100px; } }
        .at-nav-links { display: none; }
        @media (min-width: 720px) { .at-nav-links { display: flex !important; } }
        .at-section-light {
          background: ${COLORS.bgLight};
          color: ${COLORS.textOnLight};
        }
        html { scroll-padding-top: 80px; }
      `}</style>

      {/* NOISE TEXTURE */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* NAV — always visible para no romper layout cuando hero arranca grande */}
      <nav
        style={{
          position: "fixed", top: "16px", left: "50%", transform: "translateX(-50%)",
          zIndex: 100, padding: "10px 14px 10px 24px", borderRadius: "100px",
          background: scrolled ? "rgba(10,10,15,0.92)" : "rgba(10,10,15,0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${scrolled ? COLORS.border : "rgba(255,255,255,0.08)"}`,
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.45)" : "0 4px 20px rgba(0,0,0,0.25)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "20px",
          width: "min(820px, 94vw)", transition: "all 0.4s ease",
        }}
      >
        <a
          href="#top"
          style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.5px", color: COLORS.white, textDecoration: "none", whiteSpace: "nowrap" }}
        >
          ALAN TAPIA
        </a>

        <div className="at-nav-links" style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {[
            ["Programa", "#programa"],
            ["Fases", "#fases"],
            ["Inversión", "#inversion"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: COLORS.grayLight,
                textDecoration: "none",
                letterSpacing: "0.2px",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.white; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.grayLight; }}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="at-btn-tap"
          style={{
            padding: "8px 18px", borderRadius: "100px", fontSize: "13px", fontWeight: 600,
            background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
            color: "#fff", textDecoration: "none", letterSpacing: "0.3px",
            transition: "transform 0.2s, box-shadow 0.2s",
            display: "inline-flex", alignItems: "center", gap: "8px",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.purple}40`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <WhatsAppIcon size={14} />
          Hablemos
        </a>
      </nav>

      {/* STICKY MOBILE CTA */}
      <div
        className="at-sticky-cta"
        style={{
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0)" : "translateY(20px)",
        }}
        aria-hidden={!scrolled}
      >
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="at-btn-tap at-cta-pulse"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
            width: "100%", maxWidth: "420px",
            padding: "16px 24px", borderRadius: "100px",
            fontSize: "15px", fontWeight: 700,
            background: `linear-gradient(135deg, ${COLORS.whatsapp}, ${COLORS.whatsappDark})`,
            color: "#fff", textDecoration: "none", letterSpacing: "0.3px",
            border: `1px solid ${COLORS.gold}40`,
          }}
        >
          <WhatsAppIcon size={18} />
          Escribime por WhatsApp
        </a>
      </div>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 24px 80px" }}>
        {/* Glow */}
        <div style={{ position: "absolute", top: "-15%", left: "50%", transform: "translateX(-50%)", width: "min(900px, 90vw)", height: "min(900px, 90vw)", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}15 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "8%", right: "5%", width: "420px", height: "420px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}10 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "5%", width: "380px", height: "380px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}08 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div className="at-hero-text" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn instant>
            <Badge>Programa de aceleración 1 a 1</Badge>
          </FadeIn>

          <FadeIn instant delay={0.15}>
            <h1 style={{ fontSize: "clamp(40px, 7.5vw, 96px)", fontWeight: 700, lineHeight: 1.05, marginTop: "32px", letterSpacing: "-2px" }}>
              12 semanas con un{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                CEO
              </span>{" "}
              empujando tu negocio.
            </h1>
          </FadeIn>

          <FadeIn instant delay={0.3}>
            <p style={{ fontSize: "clamp(16px, 1.6vw, 22px)", color: COLORS.gray, lineHeight: 1.65, marginTop: "32px", maxWidth: "740px", marginLeft: "auto", marginRight: "auto" }}>
              No es acompañamiento genérico. Es sentarme con vos, mirar tus números, y decidir juntos qué mover esta semana para que tu negocio facture más.
            </p>
          </FadeIn>

          <FadeIn instant delay={0.45}>
            <div style={{ display: "flex", gap: "clamp(24px, 5vw, 56px)", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
              {[["3", "empresas"], ["+70", "personas"], ["11", "años emprendiendo"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, lineHeight: 1, background: `linear-gradient(135deg, ${COLORS.purpleLight}, ${COLORS.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                  <div style={{ fontSize: "12px", color: COLORS.gray, marginTop: "8px", letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn instant delay={0.6}>
            <a
              href="#cta"
              style={{
                display: "inline-block", marginTop: "36px", padding: "16px 40px",
                borderRadius: "100px", fontSize: "15px", fontWeight: 600,
                background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
                color: "#fff", textDecoration: "none", letterSpacing: "0.3px",
                boxShadow: `0 4px 30px ${COLORS.purple}30`,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = `0 4px 40px ${COLORS.purple}50`; }}
              onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = `0 4px 30px ${COLORS.purple}30`; }}
            >
              Ver cómo funciona ↓
            </a>
          </FadeIn>
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="programa" className="at-section-pad at-section-light">
        <div className="at-fit-wide">
          <FadeIn>
            <Badge theme="light">El problema</Badge>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px", color: COLORS.textOnLight }}>
              Tu negocio podría facturar mucho más.{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.goldDark }}>Y vos lo sabés.</span>
            </h2>
          </FadeIn>

          <div className="at-2col" style={{ marginTop: "36px" }}>
            {[
              "Sabés que hay oportunidades que se te escapan pero no tenés claro cuáles priorizar.",
              "Tomás decisiones importantes solo, sin alguien que te desafíe o te dé perspectiva.",
              "Ves competidores que crecen más rápido con menos producto y te preguntás qué carajo estás haciendo mal.",
              "Conseguís clientes pero de forma irregular, sin un proceso que funcione solo.",
              "Trabajás más horas que nunca pero la facturación no crece al mismo ritmo.",
              "Sentís que estás dejando plata sobre la mesa todos los meses.",
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "18px 22px", borderRadius: "12px", background: COLORS.bgLightCard, border: `1px solid ${COLORS.borderOnLight}`, height: "100%", boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}>
                  <span style={{ color: COLORS.purple, fontSize: "18px", marginTop: "1px", flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: "15px", color: COLORS.textOnLightSecondary, lineHeight: 1.6, fontWeight: 450 }}>{t}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div
              style={{
                marginTop: "56px",
                padding: "32px 36px",
                borderLeft: `4px solid ${COLORS.goldDark}`,
                background: `linear-gradient(90deg, ${COLORS.goldDark}10 0%, transparent 70%)`,
                borderRadius: "0 14px 14px 0",
                maxWidth: "880px",
              }}
            >
              <p style={{ fontSize: "clamp(20px, 2.4vw, 26px)", color: COLORS.textOnLight, lineHeight: 1.45, fontWeight: 600, letterSpacing: "-0.3px" }}>
                No te falta talento.{" "}
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.goldDark, fontWeight: 700 }}>
                  Te falta alguien con experiencia
                </span>{" "}
                que se siente al lado tuyo, mire tu negocio con ojos frescos, y te diga exactamente qué mover para crecer.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROPUESTA */}
      <section className="at-section-pad at-section-light" style={{ paddingTop: "0", borderTop: `1px solid ${COLORS.borderOnLight}` }}>
        <div className="at-fit-wide" style={{ paddingTop: "clamp(60px, 8vw, 100px)" }}>
          <div className="at-prop-grid">
            <div>
              <FadeIn>
                <Badge theme="light">La propuesta</Badge>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px", color: COLORS.textOnLight }}>
                  Un socio estratégico por 12 semanas.
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p style={{ fontSize: "17px", color: COLORS.textOnLightSecondary, lineHeight: 1.8, marginTop: "24px", fontWeight: 450 }}>
                  Es tener a un <strong style={{ color: COLORS.textOnLight, fontWeight: 600 }}>CEO de 3 empresas trabajando con vos</strong>, semana a semana, durante 12 semanas intensivas para hacer crecer tu negocio.
                </p>
                <p style={{ fontSize: "17px", color: COLORS.textOnLightSecondary, lineHeight: 1.8, marginTop: "16px", fontWeight: 450 }}>
                  No es un curso. No es un programa grabado. No es un gurú que solo factura vendiendo cursos. Es <strong style={{ color: COLORS.textOnLight, fontWeight: 600 }}>trabajo real, sobre tu negocio real</strong>, con alguien que opera empresas todos los días y pone toda esa experiencia al servicio de la tuya.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.3}>
              <div
                style={{
                  padding: "32px 32px", borderRadius: "16px",
                  background: `linear-gradient(135deg, ${COLORS.purple}10, ${COLORS.gold}10)`,
                  border: `1px solid ${COLORS.gold}40`,
                  height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
                  boxShadow: "0 16px 40px -16px rgba(212,168,83,0.25)",
                }}
              >
                <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, fontWeight: 700, marginBottom: "16px" }}>
                  Marcas con las que trabajé
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px", marginBottom: "20px" }}>
                  {["Zara", "Aerolíneas Argentinas", "EPEC", "YPF", "Mercedes-Benz"].map((m) => (
                    <span
                      key={m}
                      style={{
                        padding: "6px 14px", borderRadius: "8px",
                        background: COLORS.bgLightCard, border: `1px solid ${COLORS.borderOnLight}`,
                        fontSize: "13px", fontWeight: 600, color: COLORS.textOnLight,
                        boxShadow: "0 1px 2px rgba(15,23,42,0.05)",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: "15px", color: COLORS.textOnLightSecondary, lineHeight: 1.7, fontWeight: 450 }}>
                  Lidero +70 personas en 3 empresas y llevo todo eso a tu mesa cada semana. <strong style={{ color: COLORS.textOnLight, fontWeight: 600 }}>La experiencia que normalmente cuesta una consultora top tier, en una sesión semanal con vos.</strong>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* QUIÉN SOY */}
      <section className="at-section-pad" style={{ background: `linear-gradient(180deg, ${COLORS.bgCard}80 0%, ${COLORS.bg} 100%)` }}>
        <div className="at-fit-wide">
          <FadeIn>
            <Badge>Mi historia</Badge>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.1, letterSpacing: "-1px" }}>
              Empecé con{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>100 paños multiusos</span>.
              <br />Hoy lidero{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.purpleLight }}>3 empresas</span>.
            </h2>
          </FadeIn>

          <div className="at-bio-grid" style={{ marginTop: "48px" }}>
            <FadeIn delay={0.15}>
              <Photo
                src="fotos/alan-portrait.jpg"
                alt="Alan Tapia"
                aspectRatio="3/4"
                fallbackInitials="AT"
                fallbackLabel="Alan Tapia"
                fallbackSubLabel="Founder & CEO · 24 años"
                accentColor="gold"
              />
            </FadeIn>

            <div>
              <FadeIn delay={0.2}>
                <p style={{ fontSize: "17px", color: COLORS.grayLight, lineHeight: 1.8 }}>
                  Vengo de una familia de <strong style={{ color: COLORS.white }}>clase baja baja</strong>, sin recursos ni contactos. El esfuerzo diario nunca fue una elección — era la única manera de no terminar como veía a mi familia luchando para sobrevivir.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p style={{ fontSize: "17px", color: COLORS.grayLight, lineHeight: 1.8, marginTop: "20px" }}>
                  A los <strong style={{ color: COLORS.gold }}>13 años</strong> ahorré lo que pude, compré una bolsa de 100 paños multiusos y salí a la calle a venderlos. Reinvertí todo y fundé mi primera empresa: <em style={{ color: COLORS.white }}>Distribuidora Innamorati</em>. Mi primera socia fue mi hermana de 11. Llegamos a tener <strong style={{ color: COLORS.white }}>27 vendedores</strong> a comisión vendiendo artículos de limpieza puerta a puerta.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p style={{ fontSize: "17px", color: COLORS.grayLight, lineHeight: 1.8, marginTop: "20px" }}>
                  Desde ese día <strong style={{ color: COLORS.white }}>nunca paré</strong>. Fundé proyectos, fracasé en algunos, aprendí, volví a empezar, y nunca dejé de capacitarme para convertirme en el empresario que de chico no me animaba a imaginar.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* TIMELINE EMPRESAS */}
          <div style={{ marginTop: "64px" }}>
            <FadeIn>
              <p style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.purpleLight, fontWeight: 600, marginBottom: "20px" }}>Las 3 empresas que opero hoy</p>
            </FadeIn>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  year: "2014",
                  name: "ZutaEstudio",
                  tagline: "Primera agencia de community managers de LATAM. Hoy, estructura comercial B2B para startups tech, especialmente en España.",
                  clients: ["Zara", "TodoModa", "Quevana", "Aerolíneas Argentinas"],
                },
                {
                  year: "2016",
                  name: "Xnod",
                  tagline: "Software factory enfocada en soluciones de inteligencia artificial para grandes empresas.",
                  clients: ["Mercedes-Benz", "Banco de Panamá", "Isuzu", "EPEC", "YPF"],
                },
                {
                  year: "2020",
                  name: "Deenex",
                  tagline: "Tecnología para el sector gastronómico. Empezamos con 6 socios en un nicho hipercompetitivo. Hoy somos 2, con +250 locales activos.",
                  clients: ["+250 locales gastronómicos", "Foco LATAM"],
                },
              ].map((biz, i) => (
                <FadeIn key={biz.name} delay={i * 0.1}>
                  <div className="at-biz-card">
                    <div style={{ display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap", marginBottom: "10px" }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "22px", color: COLORS.gold, fontWeight: 700 }}>{biz.year}</span>
                      <span style={{ fontSize: "22px", fontWeight: 700, color: COLORS.white, letterSpacing: "-0.3px" }}>{biz.name}</span>
                    </div>
                    <p style={{ fontSize: "15px", color: COLORS.grayLight, lineHeight: 1.7 }}>{biz.tagline}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                      {biz.clients.map((c) => (
                        <span key={c} style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, color: COLORS.gray, background: `${COLORS.bg}`, border: `1px solid ${COLORS.border}` }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* OBJETIVO ACTUAL + QUOTE */}
          <FadeIn delay={0.3}>
            <div style={{ marginTop: "56px", padding: "32px", borderRadius: "16px", background: `linear-gradient(135deg, ${COLORS.purple}10, ${COLORS.gold}06)`, border: `1px solid ${COLORS.gold}25` }}>
              <p style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.gold, fontWeight: 600, marginBottom: "16px" }}>Mi objetivo hoy</p>
              <p style={{ fontSize: "17px", color: COLORS.grayLight, lineHeight: 1.8 }}>
                Convertirme en <strong style={{ color: COLORS.white }}>referente del sector empresarial</strong> en LATAM, ayudar a emprendedores a hacer lo que tanto sueñan, y — fuera de los negocios — convertirme en el próximo <strong style={{ color: COLORS.white }}>campeón argentino de boxeo</strong>. No es metáfora. Entreno todos los días.
              </p>
              <p style={{ fontSize: "16px", color: COLORS.gray, lineHeight: 1.7, marginTop: "24px", fontStyle: "italic", borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: "20px" }}>
                "No te voy a dar teoría de un libro. Te voy a dar exactamente lo que uso todos los días para operar mis propias empresas y ganar peleas."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GALERÍA EN ACCIÓN — oculta hasta tener fotos reales (LP-FOTOS SOY-76).
          Cuando lleguen alan-stage.jpg, alan-team.jpg, alan-meeting.jpg, alan-boxing.jpg en public/fotos/,
          quitar el comentario y se muestra automáticamente.
      <section className="at-section-pad" style={{ paddingTop: "60px" }}>
        <div className="at-fit-wide">
          <FadeIn>
            <p style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.purpleLight, fontWeight: 600, textAlign: "center", marginBottom: "32px" }}>En acción</p>
          </FadeIn>
          <div className="at-gallery-grid">
            <FadeIn delay={0.05}>
              <Photo src="fotos/alan-stage.jpg" alt="Alan Tapia hablando en escenario" aspectRatio="3/4" fallbackInitials="🎤" fallbackLabel="Conferencias" accentColor="purple" />
            </FadeIn>
            <FadeIn delay={0.15}>
              <Photo src="fotos/alan-team.jpg" alt="Alan Tapia con su equipo" aspectRatio="3/4" fallbackInitials="👥" fallbackLabel="Equipo" accentColor="gold" />
            </FadeIn>
            <FadeIn delay={0.25}>
              <Photo src="fotos/alan-meeting.jpg" alt="Alan Tapia en reunión 1 a 1" aspectRatio="3/4" fallbackInitials="💼" fallbackLabel="Sesión 1 a 1" accentColor="purple" />
            </FadeIn>
            <FadeIn delay={0.35}>
              <Photo src="fotos/alan-boxing.jpg" alt="Alan Tapia entrenando boxeo" aspectRatio="3/4" fallbackInitials="🥊" fallbackLabel="Entrenamiento" accentColor="gold" />
            </FadeIn>
          </div>
        </div>
      </section>
      */}

      {/* QUÉ VAS A RECIBIR */}
      <section className="at-section-pad at-section-light">
        <div className="at-fit-wide">
        <FadeIn>
          <Badge theme="light">Qué vas a recibir</Badge>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px", color: COLORS.textOnLight }}>
            12 semanas de trabajo{" "}
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.purple }}>intensivo</span>
          </h2>
        </FadeIn>

        <div className="at-2col" style={{ marginTop: "44px", gap: "32px" }}>
          {[
            ["🎯", "Sesión semanal de 90 min, 1 a 1", "Presencial en Buenos Aires o virtual. No son charlas. Son sesiones de trabajo donde analizamos tu negocio, tomamos decisiones juntos, y definimos qué hacer la próxima semana."],
            ["⚡", "Feedback directo y honesto", "Te digo lo que funciona y lo que no. Sin vueltas, sin diplomacia innecesaria. Como haría un socio que se juega lo mismo que vos."],
            ["🧭", "Dirección estratégica", "Qué priorizar, qué dejar, qué cambiar. Basado en experiencia real de operar 3 empresas, no en frameworks teóricos."],
            ["🤖", "Herramientas tech e IA", "Soy desarrollador y fundé una software factory. Te muestro herramientas que la mayoría de los emprendedores no conocen y que te ahorran horas cada semana."],
            ["💬", "Soporte por WhatsApp", "Si surge algo urgente entre sesiones, me escribís y te respondo en menos de 24 horas."],
            ["📋", "Plan de acción semanal", "Cada sesión termina con metas claras. No salís sin saber qué hacer."],
          ].map(([icon, title, desc], i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <IncludeItem icon={icon} title={title} desc={desc} theme="light" />
            </FadeIn>
          ))}
        </div>
        </div>
      </section>

      {/* LAS 4 FASES */}
      <section id="fases" className="at-section-pad at-section-light" style={{ paddingTop: "0", borderTop: `1px solid ${COLORS.borderOnLight}` }}>
        <div className="at-fit-wide" style={{ paddingTop: "clamp(60px, 8vw, 100px)" }}>
          <FadeIn>
            <Badge theme="light">Cómo funciona</Badge>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px", color: COLORS.textOnLight }}>
              4 fases. 12 semanas. Resultados concretos.
            </h2>
          </FadeIn>

          <div className="at-phases" style={{ marginTop: "44px" }}>
            <PhaseCard theme="light" number="1" title="Mapa del negocio" weeks="Semanas 1–3" description="Entendemos exactamente dónde estás, dónde estás perdiendo oportunidades, y cuáles son las 3 palancas que más rápido van a mover tu facturación." deliverable="Mapa de situación + Plan de acción con 3 prioridades claras." delay={0.1} />
            <PhaseCard theme="light" number="2" title="Motor de ventas" weeks="Semanas 4–6" description="Armamos tu proceso comercial para que consigas clientes de forma predecible. Propuesta de valor, mensaje, canales, y primeras acciones de captación funcionando." deliverable="Proceso comercial documentado y en funcionamiento." delay={0.2} />
            <PhaseCard theme="light" number="3" title="Operación autónoma" weeks="Semanas 7–9" description="Construimos los procesos para que puedas delegar sin que se rompa todo. Automatizamos lo repetitivo. Liberamos tu tiempo para lo estratégico." deliverable="3 procesos documentados + automatizaciones con IA." delay={0.3} />
            <PhaseCard theme="light" number="4" title="Plan de escala" weeks="Semanas 10–12" description="Definimos exactamente cómo vas a crecer en los próximos 90 días. Métricas, modelo financiero, y un roadmap claro." deliverable="Roadmap trimestral + métricas de seguimiento." delay={0.4} />
          </div>

          <FadeIn delay={0.5}>
            <p style={{ fontSize: "16px", color: COLORS.textOnLightSecondary, textAlign: "center", marginTop: "28px", lineHeight: 1.7, fontWeight: 450 }}>
              En 12 semanas comprimimos lo que de otra forma te llevaría años de prueba y error.
              <br />
              <strong style={{ color: COLORS.textOnLight, fontWeight: 600 }}>Y después seguimos trabajando juntos para que el crecimiento no pare.</strong>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* POR QUÉ FUNCIONA */}
      <section className="at-section-pad" style={{ background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgCard}60 50%, ${COLORS.bg} 100%)` }}>
        <div className="at-fit-wide">
          <FadeIn>
            <Badge>Por qué funciona</Badge>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              Diferente a todo lo que probaste.
            </h2>
          </FadeIn>

          <div className="at-2col" style={{ marginTop: "44px" }}>
            {[
              ["Tenés a alguien que juega el mismo juego.", "No un profesor, no un coach, no un motivador. Alguien que lidera equipos, cierra deals y resuelve problemas operativos todos los días — igual que vos."],
              ["Es trabajo, no teoría.", "Cada sesión es sobre tu negocio. Tus números, tus clientes, tus decisiones. No hay módulos pregrabados ni contenido genérico."],
              ["Incluye tech real.", "La mayoría de los coaches te enseñan estrategia y mentalidad. Yo te muestro cómo automatizar procesos con IA y usar tecnología para ganar velocidad."],
              ["Tiene presión.", "No es un espacio cómodo donde te digo lo que querés escuchar. Es un espacio de trabajo donde te empujo a tomar las decisiones que sabés que tenés que tomar."],
            ].map(([t, d], i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="at-reason-card">
                  <h4 style={{ fontSize: "17px", fontWeight: 700, color: COLORS.purpleLight, marginBottom: "8px" }}>{t}</h4>
                  <p style={{ fontSize: "15px", color: COLORS.gray, lineHeight: 1.7 }}>{d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS — 4 videos en grid + 3 quotes escritos abajo.
          Reemplazar los 4 video IDs cuando lleguen los reales (LP-VIDEOS SOY-77). */}
      <section className="at-section-pad">
        <div className="at-fit-wide">
          <FadeIn>
            <Badge>Lo que dicen los que ya están adentro</Badge>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              Escuchalos a{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.purpleLight }}>ellos</span>.
            </h2>
          </FadeIn>

          {/* Grid 4 videos */}
          <div className="at-testimonial-grid" style={{ marginTop: "44px" }}>
            {[
              { videoId: "AaQ_2e0FVuo", label: "Manuel S.", role: "Agencia digital" },
              { videoId: "AaQ_2e0FVuo", label: "Agustín G.", role: "SaaS B2B" },
              { videoId: "AaQ_2e0FVuo", label: "Julián R.", role: "Profesional construyendo" },
              { videoId: "AaQ_2e0FVuo", label: "Sofía M.", role: "Educadora / creadora" },
            ].map((v, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  style={{
                    borderRadius: "16px", overflow: "hidden",
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.bgCard,
                    transition: "border-color 0.3s, transform 0.3s",
                    height: "100%", display: "flex", flexDirection: "column",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.purple + "40"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ position: "relative", width: "100%", paddingBottom: "177.78%", background: "#000" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${v.videoId}`}
                      title={`Testimonio ${v.label}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                    />
                  </div>
                  <div style={{ padding: "14px 16px", borderTop: `1px solid ${COLORS.border}` }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: COLORS.white }}>{v.label}</p>
                    <p style={{ fontSize: "12px", color: COLORS.gray, marginTop: "2px" }}>{v.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* 3 quotes escritos en grid simétrico */}
          <div
            style={{
              marginTop: "48px",
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "1fr",
            }}
            className="at-quote-grid"
          >
            {[
              {
                initials: "MS",
                name: "Manuel S.",
                role: "Founder de agencia digital · Buenos Aires",
                accent: "gold",
                quote: "Cuando arranqué con Alan estaba quemado, atendiendo todo yo. En 6 semanas armamos el proceso comercial y el sistema de delegación. Hoy mi agencia factura más sin que yo esté en cada llamada.",
              },
              {
                initials: "AG",
                name: "Agustín G.",
                role: "Founder de SaaS B2B · Córdoba",
                accent: "purple",
                quote: "No es coaching motivacional. Cada sesión salgo con 3 cosas concretas para hacer la semana siguiente. Alan opera 3 empresas, no te habla desde un libro, te habla desde lo que vive todos los días.",
              },
              {
                initials: "JR",
                name: "Julián R.",
                role: "Profesional construyendo su propio proyecto",
                accent: "gold",
                quote: "Pagaba una consultora top tier al mes y recibía un PowerPoint cada quincena. Con Alan paso una hora y media a la semana resolviendo problemas reales. Es otra liga.",
              },
            ].map((t, i) => {
              const accent = t.accent === "gold" ? COLORS.gold : COLORS.purpleLight;
              return (
                <FadeIn key={t.name} delay={0.45 + i * 0.08}>
                  <div
                    style={{
                      padding: "24px 26px",
                      borderRadius: "16px",
                      background: COLORS.bgCard,
                      border: `1px solid ${COLORS.border}`,
                      transition: "border-color 0.3s, transform 0.3s",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent + "55"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <p style={{ fontSize: "15px", color: COLORS.grayLight, lineHeight: 1.65, fontWeight: 450, marginBottom: "20px", flex: 1 }}>
                      {t.quote}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "40px", height: "40px", minWidth: "40px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${accent}40, ${accent}15)`,
                          border: `1px solid ${accent}50`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Playfair Display', serif",
                          fontStyle: "italic", fontWeight: 700,
                          color: accent, fontSize: "15px",
                        }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: COLORS.white }}>{t.name}</p>
                        <p style={{ fontSize: "12px", color: COLORS.gray }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* INVERSIÓN */}
      <section id="inversion" className="at-section-pad at-section-light" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(800px, 90vw)", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}10 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div className="at-fit-wide" style={{ position: "relative" }}>
          <FadeIn>
            <Badge theme="light">Inversión</Badge>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px", color: COLORS.textOnLight }}>
              ¿Cuánto te cuesta{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.goldDark }}>no tener dirección</span>?
            </h2>
          </FadeIn>

          <div className="at-prop-grid" style={{ marginTop: "44px" }}>
            {/* COLUMNA IZQUIERDA — Anclaje y valor */}
            <div>
              <FadeIn delay={0.1}>
                <p style={{ fontSize: "17px", color: COLORS.textOnLightSecondary, lineHeight: 1.8, fontWeight: 450 }}>
                  Cada mes sin una estrategia clara estás perdiendo clientes, tiempo y plata. <strong style={{ color: COLORS.textOnLight, fontWeight: 600 }}>Eso tiene un costo real</strong>, aunque no lo veas en una factura.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { label: "Consultora estratégica", price: "$3.000–$10.000/mes", note: "Genérica, sin foco en tu negocio" },
                    { label: "Aceleradora seria", price: "$2.000–$5.000/mes + equity", note: "Grupal, sin atención 1 a 1" },
                    { label: "Director comercial freelance", price: "$4.000–$8.000/mes", note: "Solo ventas, sin visión integral" },
                  ].map((comp, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderRadius: "12px", background: COLORS.bgLightCard, border: `1px solid ${COLORS.borderOnLight}`, gap: "16px", flexWrap: "wrap", boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}>
                      <div>
                        <span style={{ fontSize: "15px", fontWeight: 600, color: COLORS.textOnLight }}>{comp.label}</span>
                        <p style={{ fontSize: "12px", color: COLORS.textOnLightSecondary, marginTop: "2px" }}>{comp.note}</p>
                      </div>
                      <span style={{ fontSize: "15px", fontWeight: 500, color: COLORS.textOnLightSecondary, textDecoration: "line-through", textDecorationColor: "rgba(71,85,105,0.5)", whiteSpace: "nowrap" }}>{comp.price}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p style={{ fontSize: "15px", color: COLORS.textOnLightSecondary, lineHeight: 1.7, marginTop: "24px", fontStyle: "italic", borderLeft: `3px solid ${COLORS.goldDark}55`, paddingLeft: "16px" }}>
                  ¿Y si pudieras tener todo eso, estrategia, operación, tech y presión, por una fracción del costo, con alguien que realmente opera empresas?
                </p>
              </FadeIn>
            </div>

            {/* COLUMNA DERECHA — Price card (queda dark para impacto premium del precio) */}
            <FadeIn delay={0.25}>
              <div
                style={{
                  padding: "clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px)", borderRadius: "24px",
                  background: `linear-gradient(155deg, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%)`,
                  border: `1px solid ${COLORS.gold}40`,
                  boxShadow: `0 40px 90px -25px rgba(212,168,83,0.45), 0 0 0 1px ${COLORS.gold}10 inset`,
                  position: "relative", overflow: "hidden", textAlign: "center",
                }}
              >
                <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}18 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}10 0%, transparent 70%)`, pointerEvents: "none" }} />

                <div style={{ position: "relative" }}>
                  <p style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.gold, fontWeight: 600, marginBottom: "20px" }}>Programa completo</p>

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "4px" }}>
                    <span style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: COLORS.gold, marginTop: "clamp(10px, 1.5vw, 16px)" }}>$</span>
                    <span style={{ fontSize: "clamp(64px, 10vw, 96px)", fontWeight: 700, lineHeight: 0.9, background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-3px" }}>500</span>
                  </div>
                  <div style={{ fontSize: "15px", color: COLORS.gray, marginTop: "8px" }}>USD · por mes · 3 meses</div>

                  <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${COLORS.gold}30, transparent)`, margin: "28px 0" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "14px", fontSize: "14px", color: COLORS.grayLight, textAlign: "left" }}>
                    {[
                      ["🎯", "12 sesiones de 90 min, 1 a 1"],
                      ["💬", "WhatsApp directo entre sesiones"],
                      ["🧠", "Frameworks y plantillas probadas"],
                      ["🤖", "Setup de herramientas con IA"],
                      ["📋", "Plan de acción semanal"],
                      ["🔄", "Después de los 3 meses, seguimos mes a mes"],
                    ].map(([icon, text]) => (
                      <div key={text} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <span style={{ fontSize: "16px", width: "24px", textAlign: "center", flexShrink: 0 }}>{icon}</span>
                        <span style={{ lineHeight: 1.5 }}>{text}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="at-btn-tap"
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      width: "100%", marginTop: "28px", padding: "16px 24px",
                      borderRadius: "100px", fontSize: "15px", fontWeight: 700,
                      background: `linear-gradient(135deg, ${COLORS.whatsapp}, ${COLORS.whatsappDark})`,
                      color: "#fff", textDecoration: "none",
                      boxShadow: `0 4px 30px ${COLORS.whatsapp}30`,
                      border: `1px solid ${COLORS.gold}30`,
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = `0 8px 40px ${COLORS.whatsapp}50`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 4px 30px ${COLORS.whatsapp}30`; }}
                  >
                    <WhatsAppIcon size={18} />
                    Quiero empezar
                  </a>

                  <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "16px", flexWrap: "wrap" }}>
                    {["Transferencia", "MercadoPago", "USDT", "PayPal"].map((m) => (
                      <span key={m} style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "10px", color: COLORS.grayDark, border: `1px solid ${COLORS.border}`, letterSpacing: "0.3px" }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PARA QUIÉN — 6 vs 6 simétrico */}
      <section className="at-section-pad" style={{ background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgCard}40 50%, ${COLORS.bg} 100%)` }}>
        <div className="at-fit-wide">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <Badge>Filtro de claridad</Badge>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px", textAlign: "center", maxWidth: "780px", marginLeft: "auto", marginRight: "auto" }}>
              ¿Es para vos?{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.gold }}>Decidí en 30 segundos.</span>
            </h2>
            <p style={{ fontSize: "16px", color: COLORS.gray, lineHeight: 1.7, marginTop: "16px", textAlign: "center", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}>
              Esto no es para todos. Si te identificás con la columna de la izquierda, hablemos.
            </p>
          </FadeIn>

          <div className="at-2col" style={{ marginTop: "44px", alignItems: "stretch" }}>
            <FadeIn delay={0.1}>
              <div
                style={{
                  padding: "32px 28px",
                  borderRadius: "18px",
                  background: `linear-gradient(180deg, ${COLORS.purple}10 0%, ${COLORS.bgCard} 100%)`,
                  border: `1px solid ${COLORS.purple}40`,
                  height: "100%",
                  boxShadow: `0 30px 60px -30px ${COLORS.purple}40`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <span style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: "16px", fontWeight: 700,
                  }}>✓</span>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: COLORS.purpleLight, letterSpacing: "1.5px", textTransform: "uppercase" }}>Sí es para vos</p>
                </div>
                {[
                  "Ya tenés un negocio funcionando y facturando",
                  "Querés crecer más rápido pero no sabés qué palanca mover",
                  "Tomás decisiones importantes solo y querés un par senior al lado",
                  "Estás dispuesto a trabajar duro durante 12 semanas",
                  "Valorás feedback directo más que palmadas en la espalda",
                  "Querés resultados concretos, no teoría",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "14px", alignItems: "flex-start" }}>
                    <span style={{ color: COLORS.purpleLight, fontWeight: 700, fontSize: "15px", marginTop: "1px", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "15px", color: COLORS.grayLight, lineHeight: 1.6, fontWeight: 450 }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div
                style={{
                  padding: "32px 28px",
                  borderRadius: "18px",
                  background: `${COLORS.bgCard}80`,
                  border: `1px solid ${COLORS.border}`,
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <span style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: `${COLORS.grayDark}30`,
                    border: `1px solid ${COLORS.grayDark}60`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: COLORS.gray, fontSize: "16px", fontWeight: 700,
                  }}>✗</span>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: COLORS.gray, letterSpacing: "1.5px", textTransform: "uppercase" }}>No es para vos si...</p>
                </div>
                {[
                  "Todavía estás en la etapa de idea sin clientes",
                  "Buscás fórmulas mágicas o atajos rápidos",
                  "Querés que alguien haga el trabajo por vos",
                  "No podés dedicar 90 minutos por semana al menos",
                  "Esperás resultados sin ejecutar lo que charlamos",
                  "Te molesta que te digan lo que no querés escuchar",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "14px", alignItems: "flex-start" }}>
                    <span style={{ color: COLORS.grayDark, fontWeight: 700, fontSize: "15px", marginTop: "1px", flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: "15px", color: COLORS.gray, lineHeight: 1.6, fontWeight: 450 }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" className="at-section-pad" style={{ background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgCard}40 50%, ${COLORS.bg} 100%)` }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ width: "96px", height: "96px", margin: "0 auto 24px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${COLORS.gold}60`, boxShadow: `0 10px 40px ${COLORS.purple}30` }}>
              <Photo src="fotos/alan-avatar.jpg" alt="Alan Tapia" aspectRatio="1/1" fallbackInitials="AT" accentColor="gold" style={{ borderRadius: 0, border: "none", boxShadow: "none" }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
              Tu negocio en{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                90 días
              </span>{" "}
              puede ser otro.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p style={{ fontSize: "16px", color: COLORS.gray, lineHeight: 1.7, marginTop: "20px" }}>
              Escribime. Agendamos una Sesión de Diagnóstico Estratégico de 30 minutos, analizamos tu negocio, y vemos si tiene sentido trabajar juntos.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="at-btn-tap"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "12px",
                marginTop: "36px", padding: "20px 44px",
                borderRadius: "100px", fontSize: "17px", fontWeight: 700,
                background: `linear-gradient(135deg, ${COLORS.whatsapp}, ${COLORS.whatsappDark})`,
                color: "#fff", textDecoration: "none", letterSpacing: "0.3px",
                boxShadow: `0 8px 40px ${COLORS.whatsapp}30, 0 0 0 1px ${COLORS.gold}30 inset`,
                border: `1px solid ${COLORS.gold}40`,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 12px 60px ${COLORS.whatsapp}50, 0 0 0 1px ${COLORS.gold}50 inset`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 8px 40px ${COLORS.whatsapp}30, 0 0 0 1px ${COLORS.gold}30 inset`; }}
            >
              <WhatsAppIcon size={22} />
              Escribime por WhatsApp
            </a>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p style={{ fontSize: "13px", color: COLORS.grayDark, marginTop: "16px" }}>
              La llamada es gratis. Lo único que perdés son 30 minutos.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="at-hero-pad-bottom" style={{ padding: "40px 24px", borderTop: `1px solid ${COLORS.border}`, textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: COLORS.grayDark }}>
          Alan Tapia · Xnod · Deenex · ZutaEstudio
        </p>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: COLORS.gray, marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
          <WhatsAppIcon size={12} color={COLORS.gray} /> +54 9 11 5459-6266
        </a>
        <p style={{ fontSize: "12px", color: COLORS.grayDark, marginTop: "6px", opacity: 0.6 }}>
          Buenos Aires, Argentina
        </p>
      </footer>
    </div>
  );
}
