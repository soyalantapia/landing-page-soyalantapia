# landing-page-soyalantapia

Landing page privada de venta para el programa de aceleración 1 a 1 de Alan Tapia.
$500 USD/mes · 3 meses · CTA directo a WhatsApp.

> Esta landing es una pieza de **cierre**, no de atracción. Se envía por DM a prospectos calificados.

## Stack

- React 18 + Vite
- Inline styles (sin Tailwind)
- Google Fonts: DM Sans + Playfair Display

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:5173
```

## Build

```bash
npm run build        # genera dist/
npm run preview      # sirve dist/ local
```

## Deploy

Deployable directo en Vercel o Netlify (sin config extra). Apuntar a la carpeta del proyecto, build command `npm run build`, output `dist`.

## Estructura

```
src/
├── main.jsx          # entry point
├── App.jsx           # wrapper
└── LandingPage.jsx   # componente principal (V1)
```

## Notas

- WhatsApp configurado a `+54 9 11 5459 6266` en `src/LandingPage.jsx`.
- `noindex,nofollow` activado en `index.html` (landing privada).
