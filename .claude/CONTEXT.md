# Landing Page SoyAlanTapia — Contexto del proyecto

> Este archivo lo lee cualquier agente Claude que trabaje en este repo.
> Paperclip Project ID: `a8616146-c05e-4da9-954f-7c74344b325c`
> Master Issue: `SOY-75`

## Qué es

Landing privada del Programa de Aceleración 1 a 1 de Alan Tapia. Solo se comparte por DM con prospectos calificados (no aparece en posts públicos). Tiene `noindex,nofollow` intencional.

- Live: https://soyalantapia.github.io/landing-page-soyalantapia/
- Repo: https://github.com/soyalantapia/landing-page-soyalantapia
- Local: `/Users/alannaimtapia/Desktop/Programacion/landing-page-soyalantapia/`
- Deploy: manual a rama `gh-pages` (NO usa GitHub Actions)

## Producto que se vende en la landing

- $500 USD/mes, 12 semanas iniciales (luego mes a mes)
- Sesión semanal 90 min 1 a 1 (presencial BA o virtual) + WhatsApp directo
- Diferencial: CEO operativo dando dirección estratégica + tech con IA. **No es coach ni mentor** (palabras prohibidas en `shared/COMUNICACION.md`).

## Stack

- React 18 + Vite 5 (sin Tailwind)
- Inline styles + `<style>` tag con CSS classes en LandingPage.jsx
- TODO el código en `src/LandingPage.jsx` (~987 líneas)
- Sin routing, sin context, sin otros componentes

## Convenciones

1. **Voseo argentino siempre** ("vos", "tenés", "querés"). Cero "tú".
2. **Tono directo, sin diplomacia, auténtico** ("qué carajo", "Sin vueltas"). No usar inglés innecesario.
3. **Reglas tipográficas** (ver `shared/COMUNICACION.md` sección "Reglas tipográficas"):
   - Cero comillas dobles
   - Cero guion simple como puntuación
   - Cero rayas largas / em-dashes
4. **Naturalidad de voz** (ver `shared/COMUNICACION.md` sección "Naturalidad de voz"): primera persona experiencial, frases cortas, léxico concreto.

## Comando de deploy (CRÍTICO)

**SIEMPRE** buildear con `GITHUB_ACTIONS=true` o el deploy queda roto (assets apuntan a `/assets/` en vez de `/landing-page-soyalantapia/assets/`).

```bash
cd ~/Desktop/Programacion/landing-page-soyalantapia && \
GITHUB_ACTIONS=true npx vite build && \
cd dist && touch .nojekyll && \
git init -q -b gh-pages && \
git add -A && \
git -c user.email=alan@soyalantapia.com -c user.name="Alan Tapia" commit -q -m "deploy: <descripción>" && \
git remote add origin https://github.com/soyalantapia/landing-page-soyalantapia.git && \
git push -f origin gh-pages && \
cd .. && rm -rf dist/.git
```

**Verificación pre-push obligatoria:**
```bash
grep 'src=' dist/index.html
# Debe decir /landing-page-soyalantapia/assets/... NUNCA /assets/...
```

## Pendientes (issues activos)

| Issue | Prioridad | Bloqueador | Resumen |
|---|---|---|---|
| SOY-76 LP-FOTOS | high | Alan | 6 fotos en `public/fotos/` (alan-portrait.jpg, alan-stage.jpg, alan-team.jpg, alan-meeting.jpg, alan-boxing.jpg, alan-avatar.jpg) |
| SOY-77 LP-VIDEOS | high | Alan | 3 IDs de YouTube reales para `LandingPage.jsx` línea ~721 (hoy 4 placeholders `AaQ_2e0FVuo`) |
| SOY-79 LP-SEO | medium | Alan | Decisión sobre `noindex,nofollow` + Schema.org markup |
| SOY-80 LP-TRACK | medium | - | UTM params en CTAs WhatsApp + decisión Plausible |
| SOY-81 LP-OG | low | LP-FOTOS | OG image con foto real, 1200x630 |
| SOY-82 LP-PERF | low | - | Code splitting + lazy YouTube + bundle <35KB gzip |
| SOY-83 LP-FORM | low | Alan | Decidir si agregar form opcional como alternativa al WA |
| SOY-78 LP-FIX | low | - | ✅ DONE — limpieza vite cache files + gitignore |

## Sistema de diseño

Paleta (constante `COLORS` en LandingPage.jsx):
- bg `#0A0A0F`, card `#12121A`
- accent: purple `#8B5CF6`, gold `#D4A853`
- text: white `#F5F5F7`, gray `#9CA3AF`

Tipografía: DM Sans (300-700) + Playfair Display italic (acentos).

Componente clave: `<Photo>` con fallback elegante (initials/emoji + glow). Usa `import.meta.env.BASE_URL`.

## Issues conocidos del entorno

1. **Sandbox de Claude.app rompe vite build** — usar `npx vite build` directo. Si cuelga: `pkill -9 -f vite/esbuild` y reintentar.
2. **Preview tool inestable** — verificar build con `grep 'src=' dist/index.html` o curl la URL live.
3. **Olvidar `GITHUB_ACTIONS=true` rompe deploy** — pantalla en blanco. Siempre verificar.

## Comunicación con el cliente (Alan)

- Es desarrollador, podés hablar técnico
- Prefiere respuestas concisas con plan claro + acción inmediata
- Cero consultas excesivas
- Si necesitás OK para acción reputacional (publicar contenido, cambiar precio, etc.), es Categoría B del CEO Decision Protocol (ver `shared/CEO-DECISION-PROTOCOL.md`)
