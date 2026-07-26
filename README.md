# 🛠️ CartCraft — Industrial B2B Component Fulfillment Terminal

[![Webpack](https://img.shields.io/badge/Webpack-5.98-8DD6F9?style=flat-square&logo=webpack)](https://webpack.js.org/)
[![Babel](https://img.shields.io/badge/Babel-7.26-F9DC3E?style=flat-square&logo=babel)](https://babeljs.io/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Sass](https://img.shields.io/badge/Sass-7--1%20Architecture-CC6699?style=flat-square&logo=sass)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/License-MIT-green.style=flat-square)](LICENSE)

**CartCraft** is a high-performance, enterprise-grade B2B e-commerce platform and warehouse fulfillment terminal for industrial hardware components (Fasteners, Bearings, Structural Hardware, Electrical, Hydraulics). Built with a clean container/presentational React architecture, zero-dependency ES6 Cart model, hand-configured Webpack 5 + Babel build toolchain, advanced 7-1 SASS design system, and an authentic warm paper/ledger "Component Bin" aesthetic.

---

## ⚡ Key Features

- 📦 **Industrial Component Bin Catalog** — 100 SKUs procedurally generated across 5 core industrial departments with realistic materials, thread specs, ISO certifications, ratings, stock counts, and compare-at pricing.
- 🛠️ **Component Bin Cards** — Monospace SKU/bin codes (`BIN #FAST-1002`), CSS-generated barcode strip decorations, and clipped corner monospace price tags.
- 📋 **Persistent Desktop Cart Ledger** — Side-by-side warehouse cart ledger panel on desktop screens (`width >= 992px`) featuring dashed top borders, dotted line-item leaders, and monospace pricing throughout. Collapses into an interactive sheet on mobile (`width < 768px`).
- ⚡ **Instant Infinite Scroll** — Zero-click automatic product loading powered by `IntersectionObserver` with `800px` pre-fetching for 0 ms perceived scroll latency.
- 🛒 **In-Card Quantity Stepper** — Interactive `- {qty} in cart +` quantity control directly on component cards when added to cart.
- 🏷️ **Promo Code & Discount Engine** — Integrated discount calculation supporting `%` off, free shipping, and flat rate discounts (`DEMO10`, `FREESHIP`, `SAVE5`).
- ❤️ **Interactive Wishlist System** — Dedicated Wishlist view overriding department/brand filters so users never see unexpected blank states, complete with custom empty states.
- 📄 **B2B Checkout & Warehouse Pick Ticket** — Auto-formatted credit card inputs (`4242 4242 4242 4242`), instant order processing, and printable warehouse pick ticket generation.
- ⚙️ **Faceted Search & Filtering** — Real-time search across Name/SKU/Brand/Spec, multi-range price sliders, rating filters, brand checkboxes, in-stock, fast-dispatch, and clearable active chips.
- 🚀 **High-Performance Rendering** — Optimized with CSS `content-visibility: auto`, `contain-intrinsic-size`, `decoding="async"`, and native lazy image loading for silky-smooth 60fps rendering.

---

## 💻 Tech Stack & Build Toolchain

- **Build Pipeline**: Hand-configured **Webpack 5** + **Babel** (`@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`) using `babel-loader` for full JSX/TypeScript transpilation, `MiniCssExtractPlugin` for production CSS extraction, and `CopyWebpackPlugin` for static asset management.
- **Core Framework**: React 19, TypeScript 5.7
- **Styling**: Hand-rolled 7-1 SASS/SCSS design system (`_variables.scss` with warm paper/ledger card stock tones `#EDEAE2` / `#F7F5EF` and 0–2px flat industrial radii), Bootstrap 5 Grid Layout
- **State Management**: Framework-agnostic OOJS `Cart` ES6 Model (`models/Cart.js`) backed by `localStorage` persistence
- **Performance**: Native `IntersectionObserver`, CSS Content Visibility, Async Image Decoding

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v18.0.0+`
- npm `v9.0.0+`

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/KalashMaheshwari/CartCraft.git
cd cartcraft

# 2. Install dependencies
npm install

# 3. Start local development server (Webpack Dev Server)
npm run dev      # Server runs at http://localhost:5173
```

### Production Build & Local Preview

```bash
# Build production bundle with Webpack 5
npm run build    # Generates minified production bundle in dist/
```

---

## 🏗️ Architecture & Component Design

```
src/
├── components/          # Presentational UI components
│   ├── ControlBar.tsx    # Brand header bar, search & cart stat counters
│   ├── ProductCard.tsx   # Catalog card with quick view, wishlist & in-cart stepper
│   ├── ProductGrid.tsx   # Responsive grid layout with custom empty states
│   ├── FilterSidebar.tsx # Faceted left-rail filter panel
│   ├── QuickViewModal.tsx# Spec sheet modal with Buy Now & related items
│   ├── CheckoutModal.tsx # B2B billing form & printable pick ticket
│   ├── PickTicketSummary.tsx # Cart order math, promo code input & subtotal
│   └── ...
├── containers/          # Stateful business logic containers
│   ├── ProductListContainer.tsx # Filtering, sorting, infinite scroll & chips
│   └── CartContainer.tsx        # Slide-over drawer cart & drawer state
├── models/              # Framework-agnostic OOJS state models
│   └── Cart.js          # Map-backed cart state with persistence & events
├── styles/              # 7-1 Architecture SASS/SCSS design system
└── utils/               # Formatting, money math, totals & storage helpers
```

---

## 🏷️ Demo Promo Codes

Try these discount codes in the cart drawer or checkout summary:
- `DEMO10`: **10% OFF** subtotal
- `FREESHIP`: **Free Shipping** on any order
- `SAVE5`: **$5.00 OFF** subtotal

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).

