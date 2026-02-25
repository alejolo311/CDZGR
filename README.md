# Caídos del Zarzo – Gravel Race 2026

Sitio web oficial del evento de ciclismo **Caídos del Zarzo Gravel Race**, edición 2026.
Construido con **React + Vite + Tailwind CSS + Shadcn/ui**.

---

## Stack

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev) | UI y estado |
| [Vite 7](https://vitejs.dev) | Bundler / dev server |
| [Tailwind CSS 3](https://tailwindcss.com) | Estilos utilitarios |
| [Shadcn/ui](https://ui.shadcn.com) | Componentes accesibles (Radix UI) |
| [Lucide React](https://lucide.dev) | Iconografía |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/                    ← Componentes Shadcn (Radix UI)
│   │   ├── accordion.jsx
│   │   ├── badge.jsx
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── checkbox.jsx
│   │   ├── dialog.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── progress.jsx
│   │   ├── radio-group.jsx
│   │   ├── select.jsx
│   │   ├── separator.jsx
│   │   ├── tabs.jsx
│   │   └── textarea.jsx
│   │
│   └── sections/              ← Secciones de la página
│       ├── Navbar.jsx
│       ├── Hero.jsx           (+ StatsRibbon export)
│       ├── About.jsx          (+ SectionHeader export)
│       ├── Categories.jsx
│       ├── Route.jsx
│       ├── Schedule.jsx
│       ├── Prizes.jsx
│       ├── Registration.jsx
│       ├── FAQ.jsx
│       ├── Sponsors.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
│
├── hooks/
│   ├── useCountdown.js        ← Timer en tiempo real
│   └── useScrollY.js          ← Posición de scroll (navbar)
│
├── lib/
│   ├── constants.js           ← TODA la data del evento aquí
│   └── utils.js               ← cn() helper de Shadcn
│
├── App.jsx                    ← Composición principal
├── main.jsx                   ← Entry point
└── index.css                  ← Variables CSS (tema) + Tailwind
```

---

## Inicio rápido

```bash
# Clonar
git clone <url>
cd caidos-del-zarzo

# Instalar dependencias
npm install

# Dev server con hot reload
npm run dev          # http://localhost:5173

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## Personalización

### Cambiar datos del evento
Todo el contenido (fechas, precios, ruta, cronograma, premios, FAQ) está centralizado en **un solo archivo**:

```
src/lib/constants.js
```

Edita ahí y todos los componentes se actualizan automáticamente.

```js
// Cambiar fecha de la carrera (afecta el countdown)
export const EVENT = {
  date: '2026-06-14T06:30:00',
  dateLabel: '14 de Junio 2026',
  location: 'Plaza Central, Villa del Zarzo',
  // ...
}

// Cambiar precios
export const CATEGORIES = {
  gravel: { price: '$120.000 COP', ... },
  paseo:  { price: '$60.000 COP',  ... },
}
```

### Cambiar colores del tema
Variables CSS en `src/index.css`:
```css
:root {
  --primary: 24.6 95% 53.1%;   /* Naranja principal → cambiar aquí */
  --background: 0 0% 6%;       /* Fondo oscuro */
}
```

### Agregar Shadcn components
```bash
npx shadcn@latest add <component>
# Ej: npx shadcn@latest add toast
```

---

## Deploy

### GitHub Pages
```bash
# Instalar plugin
npm install -D vite-plugin-gh-pages

# En vite.config.js agregar: base: '/nombre-repo/'
# Luego:
npm run build
npx gh-pages -d dist
```

### Netlify (recomendado – más simple)
```bash
# Configurar en netlify.toml:
# [build]
#   command = "npm run build"
#   publish = "dist"

# O simplemente arrastrar la carpeta dist/ al panel de Netlify
```

### Vercel
```bash
npx vercel --prod
# Detecta Vite automáticamente, cero configuración
```

---

## Roadmap

### Alta prioridad
- [ ] **Backend de inscripciones** – Conectar formulario a Supabase, Firebase o API REST
- [ ] **Pasarela de pagos** – Integrar Wompi o Mercado Pago
- [ ] **Mapa GPX real** – Integrar Mapbox GL JS o Leaflet con el trazado oficial
- [ ] **Panel de administración** – Gestionar inscritos (React Admin + backend)

### Media prioridad
- [ ] **Resultados en tiempo real** – Tabla de clasificación conectada al sistema de cronometraje
- [ ] **Galería de fotos** – Lightbox con fotos del evento / ediciones anteriores
- [ ] **Sistema de notificaciones** – Toast para confirmaciones de formulario
- [ ] **PWA** – `vite-plugin-pwa` para instalación en móvil
- [ ] **i18n** – Versión en inglés con `react-i18next`

### Baja prioridad
- [ ] **Tests** – Vitest + React Testing Library para componentes críticos
- [ ] **E2E** – Playwright para el flujo de inscripción
- [ ] **Analytics** – Plausible (privacy-first) o GA4
- [ ] **SEO** – React Helmet + schema.org para eventos deportivos
- [ ] **Optimización imágenes** – `@unpic/react` o similar para fotos del evento

---

## Convenciones de commits

```
feat:     nueva funcionalidad
fix:      corrección de bug
style:    cambios de estilos/CSS
content:  actualización de textos, precios, fechas (en constants.js)
refactor: refactorización sin cambio de comportamiento
test:     añadir o corregir tests
chore:    mantenimiento, deps, config
```

---

## Ramas recomendadas

```
main          → producción (siempre deployable)
dev           → integración antes de main
feat/*        → nuevas funcionalidades
fix/*         → correcciones
content/*     → cambios en constants.js (contenido)
```

---

© 2026 Organización Zarzo SAS – Todos los derechos reservados.
# CDZGR
