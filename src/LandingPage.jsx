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
};

function WhatsAppIcon({ size = 18, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
    </svg>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduced]);
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

function Badge({ children }) {
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
        color: COLORS.gold,
        border: `1px solid ${COLORS.gold}40`,
        background: `${COLORS.gold}10`,
      }}
    >
      {children}
    </span>
  );
}

function PhaseCard({ number, title, weeks, description, deliverable, delay }) {
  return (
    <FadeIn delay={delay}>
      <div
        style={{
          background: COLORS.bgCard,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "16px",
          padding: "32px",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.3s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = COLORS.purple + "60"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = COLORS.border}
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
          <span style={{ fontSize: "12px", color: COLORS.gray, fontWeight: 500, letterSpacing: "0.5px" }}>
            {weeks}
          </span>
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: COLORS.white, marginBottom: "12px", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: "15px", color: COLORS.gray, lineHeight: 1.7, marginBottom: "16px" }}>
          {description}
        </p>
        <div
          style={{
            padding: "12px 16px", borderRadius: "10px",
            background: `${COLORS.purple}08`, border: `1px solid ${COLORS.purple}15`,
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 600, color: COLORS.purpleLight, letterSpacing: "1px", textTransform: "uppercase" }}>
            Lo que te llevás
          </span>
          <p style={{ fontSize: "14px", color: COLORS.grayLight, marginTop: "4px", lineHeight: 1.5 }}>
            {deliverable}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

function IncludeItem({ icon, title, desc }) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <div
        style={{
          width: "44px", height: "44px", minWidth: "44px", borderRadius: "12px",
          background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px",
        }}
      >
        {icon}
      </div>
      <div>
        <h4 style={{ fontSize: "16px", fontWeight: 600, color: COLORS.white, marginBottom: "4px" }}>{title}</h4>
        <p style={{ fontSize: "14px", color: COLORS.gray, lineHeight: 1.6 }}>{desc}</p>
      </div>
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
        .at-fit-wide { max-width: 880px; margin-left: auto; margin-right: auto; }
        .at-phases { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .at-phases { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1100px) { .at-phases { grid-template-columns: repeat(4, 1fr); } }
        .at-fit-grid { display: grid; gap: 24px; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .at-fit-grid { grid-template-columns: 1fr 1fr; } }
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
      `}</style>

      {/* NOISE TEXTURE */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* NAV */}
      <nav
        style={{
          position: "fixed", top: "16px", left: "50%", transform: "translateX(-50%)",
          zIndex: 100, padding: "12px 28px", borderRadius: "100px",
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          border: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "min(600px, 90vw)", transition: "all 0.4s ease",
        }}
      >
        <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "0.5px", color: COLORS.white }}>ALAN TAPIA</span>
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
        <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}12 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}08 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: "720px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <Badge>Programa de aceleración 1 a 1</Badge>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.1, marginTop: "28px", letterSpacing: "-1px" }}>
              12 semanas con un{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                CEO
              </span>{" "}
              empujando tu negocio.
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: COLORS.gray, lineHeight: 1.7, marginTop: "24px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
              Trabajo codo a codo con emprendedores que quieren crecer más rápido. Sesiones semanales, dirección estratégica real, y toda mi experiencia operando 3 empresas al servicio de la tuya.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div style={{ display: "flex", gap: "clamp(24px, 5vw, 56px)", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
              {[["3", "empresas"], ["+70", "personas"], ["11", "años emprendiendo"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, lineHeight: 1, background: `linear-gradient(135deg, ${COLORS.purpleLight}, ${COLORS.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                  <div style={{ fontSize: "12px", color: COLORS.gray, marginTop: "8px", letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
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
              Quiero saber más ↓
            </a>
          </FadeIn>
        </div>
      </section>

      {/* PROBLEMA */}
      <section style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn>
          <Badge>El problema</Badge>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
            Tu negocio podría facturar mucho más.{" "}
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.gold }}>Y vos lo sabés.</span>
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "36px" }}>
          {[
            "Sabés que hay oportunidades que se te escapan pero no tenés claro cuáles priorizar.",
            "Tomás decisiones importantes solo, sin alguien que te desafíe o te dé perspectiva.",
            "Ves a otros emprendedores que crecen más rápido y no entendés qué están haciendo distinto.",
            "Conseguís clientes pero de forma irregular, sin un proceso que funcione solo.",
            "Sentís que estás dejando plata sobre la mesa todos los meses.",
          ].map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "16px 20px", borderRadius: "12px", background: `${COLORS.bgCard}`, border: `1px solid ${COLORS.border}` }}>
                <span style={{ color: COLORS.purpleLight, fontSize: "18px", marginTop: "1px" }}>→</span>
                <p style={{ fontSize: "15px", color: COLORS.grayLight, lineHeight: 1.6 }}>{t}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p style={{ fontSize: "17px", color: COLORS.white, lineHeight: 1.7, marginTop: "32px", fontWeight: 500 }}>
            No te falta talento. Te falta alguien con experiencia que se siente al lado tuyo, mire tu negocio con ojos frescos, y te diga exactamente qué mover para crecer.
          </p>
        </FadeIn>
      </section>

      {/* DIVIDER */}
      <div style={{ maxWidth: "200px", margin: "0 auto", height: "1px", background: `linear-gradient(90deg, transparent, ${COLORS.purple}40, transparent)` }} />

      {/* PROPUESTA */}
      <section style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn>
          <Badge>La propuesta</Badge>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
            ¿Qué es esto?
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontSize: "17px", color: COLORS.grayLight, lineHeight: 1.8, marginTop: "24px" }}>
            Es tener a un <strong style={{ color: COLORS.white }}>CEO de 3 empresas trabajando con vos</strong>, semana a semana, durante 12 semanas intensivas para hacer crecer tu negocio.
          </p>
          <p style={{ fontSize: "17px", color: COLORS.grayLight, lineHeight: 1.8, marginTop: "16px" }}>
            No es un curso. No es un programa grabado. No es coaching motivacional. Es <strong style={{ color: COLORS.white }}>trabajo real, sobre tu negocio real</strong>, con alguien que opera empresas todos los días y pone toda esa experiencia al servicio de la tuya.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div
            style={{
              marginTop: "32px", padding: "24px 28px", borderRadius: "16px",
              background: `linear-gradient(135deg, ${COLORS.purple}10, ${COLORS.gold}08)`,
              border: `1px solid ${COLORS.gold}25`,
            }}
          >
            <p style={{ fontSize: "16px", color: COLORS.grayLight, lineHeight: 1.7 }}>
              Por <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: "18px" }}>$500/mes</span> tenés acceso a la experiencia, los frameworks, las herramientas y la dirección estratégica de alguien que lidera +70 personas y ha trabajado con marcas como <strong style={{ color: COLORS.white }}>Zara, Aerolíneas Argentinas, EPEC y YPF</strong>.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* QUIÉN SOY */}
      <section style={{ padding: "80px 24px", background: `linear-gradient(180deg, ${COLORS.bgCard}80 0%, ${COLORS.bg} 100%)` }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <FadeIn>
            <Badge>Quién va a estar al lado tuyo</Badge>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              Alan Tapia
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ fontSize: "16px", color: COLORS.grayLight, lineHeight: 1.8, marginTop: "24px" }}>
              Emprendí a los 13 años. Con lo poco que tenía compré 100 paños multiusos y armé un equipo de 27 personas. Hoy tengo 24 años y soy fundador y CEO de 3 empresas:
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginTop: "24px" }}>
            {[
              ["Xnod", "Software factory + IA"],
              ["Deenex", "App gastronómica · +250 locales"],
              ["ZutaEstudio", "Estructura comercial B2B"],
            ].map(([n, r], i) => (
              <FadeIn key={n} delay={0.2 + i * 0.1}>
                <CompanyTag name={n} role={r} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "24px" }}>
              {["EPEC", "YPF", "Zara", "Aerolíneas Argentinas", "Medbot"].map((c) => (
                <span key={c} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, color: COLORS.gray, background: `${COLORS.bgCard}`, border: `1px solid ${COLORS.border}` }}>
                  {c}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p style={{ fontSize: "16px", color: COLORS.gray, lineHeight: 1.7, marginTop: "24px", fontStyle: "italic", borderLeft: `3px solid ${COLORS.gold}40`, paddingLeft: "20px" }}>
              "No te voy a dar teoría de un libro. Te voy a dar lo que uso todos los días para operar mis propias empresas."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* QUÉ VAS A RECIBIR */}
      <section style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn>
          <Badge>Qué vas a recibir</Badge>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
            12 semanas de trabajo{" "}
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: COLORS.purpleLight }}>intensivo</span>
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "36px" }}>
          {[
            ["🎯", "Sesión semanal de 90 min, 1 a 1", "Presencial en Buenos Aires o virtual. No son charlas. Son sesiones de trabajo donde analizamos tu negocio, tomamos decisiones juntos, y definimos qué hacer la próxima semana."],
            ["⚡", "Feedback directo y honesto", "Te digo lo que funciona y lo que no. Sin vueltas, sin diplomacia innecesaria. Como lo haría un socio que tiene tus mismos intereses."],
            ["🧭", "Dirección estratégica", "Qué priorizar, qué dejar, qué cambiar. Basado en experiencia real de operar 3 empresas, no en frameworks teóricos."],
            ["🤖", "Herramientas tech e IA", "Soy desarrollador y fundé una software factory. Te muestro herramientas que la mayoría de los emprendedores no conocen y que te ahorran horas cada semana."],
            ["💬", "Soporte por WhatsApp", "Si surge algo urgente entre sesiones, me escribís y te respondo en menos de 24 horas."],
            ["📋", "Plan de acción semanal", "Cada sesión termina con metas claras. No salís sin saber qué hacer."],
          ].map(([icon, title, desc], i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <IncludeItem icon={icon} title={title} desc={desc} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* LAS 4 FASES */}
      <section style={{ padding: "80px 24px" }}>
        <div className="at-fit-wide">
          <FadeIn>
            <Badge>Cómo funciona</Badge>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              4 fases. 12 semanas. Resultados concretos.
            </h2>
          </FadeIn>

          <div className="at-phases" style={{ marginTop: "36px" }}>
            <PhaseCard number="1" title="Mapa del negocio" weeks="Semanas 1–3" description="Entendemos exactamente dónde estás, dónde estás perdiendo oportunidades, y cuáles son las 3 palancas que más rápido van a mover tu facturación." deliverable="Mapa de situación + Plan de acción con 3 prioridades claras." delay={0.1} />
            <PhaseCard number="2" title="Motor de ventas" weeks="Semanas 4–6" description="Armamos tu proceso comercial para que consigas clientes de forma predecible. Propuesta de valor, mensaje, canales, y primeras acciones de captación funcionando." deliverable="Proceso comercial documentado y en funcionamiento." delay={0.2} />
            <PhaseCard number="3" title="Operación autónoma" weeks="Semanas 7–9" description="Construimos los procesos para que puedas delegar sin que se rompa todo. Automatizamos lo repetitivo. Liberamos tu tiempo para lo estratégico." deliverable="3 procesos documentados + automatizaciones con IA." delay={0.3} />
            <PhaseCard number="4" title="Plan de escala" weeks="Semanas 10–12" description="Definimos exactamente cómo vas a crecer en los próximos 90 días. Métricas, modelo financiero, y un roadmap claro." deliverable="Roadmap trimestral + métricas de seguimiento." delay={0.4} />
          </div>

          <FadeIn delay={0.5}>
            <p style={{ fontSize: "16px", color: COLORS.gray, textAlign: "center", marginTop: "28px", lineHeight: 1.7 }}>
              En 12 semanas comprimimos lo que solo te tomaría años de prueba y error.
              <br />
              <strong style={{ color: COLORS.white }}>Y después seguimos trabajando juntos para que el crecimiento no pare.</strong>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* POR QUÉ FUNCIONA */}
      <section style={{ padding: "80px 24px", background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgCard}60 50%, ${COLORS.bg} 100%)` }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <FadeIn>
            <Badge>Por qué funciona</Badge>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginTop: "20px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              Esto no es un curso.
            </h2>
          </FadeIn>

          <div style={{ display: "grid", gap: "20px", marginTop: "36px" }}>
            {[
              ["Es tener a un CEO al lado.", "No un profesor, no un coach, no un motivador. Un CEO que opera 3 empresas todos los días y pone esa experiencia al servicio de la tuya."],
              ["Es trabajo, no teoría.", "Cada sesión es sobre tu negocio. Tus números, tus clientes, tus decisiones. No hay módulos pregrabados ni contenido genérico."],
              ["Incluye tech real.", "La mayoría de los mentores te enseñan estrategia y mentalidad. Yo te muestro cómo automatizar procesos con IA y usar tecnología para ganar velocidad."],
              ["Tiene presión.", "No es un espacio cómodo donde te digo lo que querés escuchar. Es un espacio de trabajo donde te empujo a tomar las decisiones que sabés que tenés que tomar."],
            ].map(([t, d], i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: "24px", borderRadius: "14px", background: COLORS.bgCard, border: `1px solid ${COLORS.border}` }}>
                  <h4 style={{ fontSize: "17px", fontWeight: 700, color: COLORS.purpleLight, marginBottom: "8px" }}>{t}</h4>
                  <p style={{ fontSize: "15px", color: COLORS.gray, lineHeight: 1.7 }}>{d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INVERSIÓN */}
      <section style={{ padding: "100px 24px", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(700px, 90vw)", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}08 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeIn>
            <Badge>Inversión</Badge>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              style={{
                marginTop: "32px", padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)", borderRadius: "24px",
                background: `linear-gradient(155deg, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%)`,
                border: `1px solid ${COLORS.gold}40`,
                boxShadow: `0 30px 80px -20px ${COLORS.gold}15, 0 0 0 1px ${COLORS.gold}10 inset`,
                position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-100px", left: "-80px", width: "260px", height: "260px", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}10 0%, transparent 70%)`, pointerEvents: "none" }} />

              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "14px", marginBottom: "6px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "18px", color: COLORS.grayDark, textDecoration: "line-through", textDecorationColor: `${COLORS.grayDark}80`, fontWeight: 500 }}>$5.000+/mes</span>
                  <span style={{ fontSize: "11px", color: COLORS.grayDark, letterSpacing: "0.5px", textTransform: "uppercase" }}>consultora tradicional</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "6px" }}>
                  <span style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: COLORS.gold, marginTop: "clamp(14px, 2vw, 20px)" }}>$</span>
                  <span style={{ fontSize: "clamp(72px, 12vw, 110px)", fontWeight: 700, lineHeight: 0.9, background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-3px" }}>500</span>
                </div>
                <div style={{ fontSize: "15px", color: COLORS.gray, marginTop: "8px", letterSpacing: "0.5px" }}>USD · por mes</div>

                <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${COLORS.gold}30, transparent)`, margin: "32px 0" }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", fontSize: "15px", color: COLORS.grayLight, textAlign: "left", maxWidth: "380px", margin: "0 auto" }}>
                  {[
                    "1 sesión semanal de 90 min, 1 a 1",
                    "Soporte por WhatsApp entre sesiones",
                    "Frameworks, herramientas y plantillas",
                    "Compromiso inicial: 3 meses",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: "16px", lineHeight: 1.4 }}>✓</span>
                      <span style={{ lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "14px", color: COLORS.gray, marginTop: "32px", lineHeight: 1.6, fontStyle: "italic" }}>
                  Después de las 12 semanas, seguimos trabajando juntos mes a mes.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: "28px", padding: "20px 24px", borderRadius: "14px", background: `${COLORS.bgCard}60`, border: `1px solid ${COLORS.border}` }}>
              <p style={{ fontSize: "14px", color: COLORS.grayLight, lineHeight: 1.7 }}>
                Contratar a alguien con esta experiencia como empleado te costaría <strong style={{ color: COLORS.white }}>10x más</strong>.<br />
                Una aceleradora seria, <strong style={{ color: COLORS.white }}>5x–50x más</strong> — y ni siquiera sería 1 a 1.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
              {["Transferencia", "MercadoPago", "USDT", "PayPal"].map((m) => (
                <span key={m} style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "11px", color: COLORS.gray, border: `1px solid ${COLORS.border}`, letterSpacing: "0.3px" }}>
                  {m}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, lineHeight: 1.2 }}>
            Esto es para vos si...
          </h2>
        </FadeIn>
        <div className="at-fit-grid" style={{ marginTop: "28px" }}>
          <FadeIn delay={0.1}>
            <div style={{ padding: "24px", borderRadius: "14px", background: `${COLORS.purple}08`, border: `1px solid ${COLORS.purple}25` }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: COLORS.purpleLight, marginBottom: "16px", letterSpacing: "1px", textTransform: "uppercase" }}>Sí es para vos</p>
              {[
                "Ya tenés un negocio funcionando y facturando",
                "Querés crecer más rápido pero no sabés qué palanca mover",
                "Estás dispuesto a trabajar duro durante 12 semanas",
                "Valorás tener a alguien con experiencia empujando con vos",
                "Querés resultados, no teoría",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ color: COLORS.purpleLight, fontWeight: 700, fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: COLORS.grayLight, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ padding: "24px", borderRadius: "14px", background: `${COLORS.bgCard}80`, border: `1px solid ${COLORS.border}` }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: COLORS.gray, marginBottom: "16px", letterSpacing: "1px", textTransform: "uppercase" }}>No es para vos si...</p>
              {[
                "Todavía estás en la etapa de idea sin clientes",
                "Buscás fórmulas mágicas o atajos",
                "Querés que alguien haga el trabajo por vos",
                "No podés dedicar 90 min semanales",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ color: COLORS.grayDark, fontWeight: 700, fontSize: "16px" }}>✗</span>
                  <span style={{ fontSize: "14px", color: COLORS.grayDark, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" style={{ padding: "100px 24px 60px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
              ¿Querés un{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                CEO
              </span>{" "}
              empujando tu negocio?
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
              Sin presión. Si no es para vos, cero problema.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="at-hero-pad-bottom" style={{ padding: "40px 24px", borderTop: `1px solid ${COLORS.border}`, textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: COLORS.grayDark }}>
          Alan Tapia · Xnod · Deenex · ZutaEstudio
        </p>
        <p style={{ fontSize: "12px", color: COLORS.grayDark, marginTop: "4px", opacity: 0.6 }}>
          Buenos Aires, Argentina
        </p>
      </footer>
    </div>
  );
}
