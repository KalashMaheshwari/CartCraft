# 🛠️ CartCraft — Industrial B2B Component Fulfillment Terminal

[![Vite](https://img.shields.io/badge/Vite-7.3.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Sass](https://img.shields.io/badge/Sass-7--1%20Architecture-CC6699?style=flat-square&logo=sass)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/License-MIT-green.style=flat-square)](#license)

**CartCraft** is a high-performance, enterprise-grade B2B e-commerce platform and warehouse fulfillment terminal for industrial hardware components (Fasteners, Bearings, Structural Hardware, Electrical, Hydraulics). Built with a clean container/presentational React architecture, zero-dependency ES6 Cart model, advanced SASS design system, and modern web performance optimizations.

---

## ⚡ Key Features

- 📦 **Industrial Component Catalog** — 100 SKUs procedurally generated across 5 core industrial departments with realistic materials, thread specs, ISO certifications, ratings, stock counts, and compare-at pricing.
- ⚡ **Instant Infinite Scroll** — Zero-click automatic product loading powered by `IntersectionObserver` with `800px` pre-fetching for 0 ms perceived scroll latency.
- 🛒 **In-Card Quantity Stepper** — Interactive `- {qty} in cart +` quantity control directly on component cards when added to cart.
- 🏷️ **Promo Code & Discount Engine** — Integrated discount calculation supporting `%` off, free shipping, and flat rate discounts (`DEMO10`, `FREESHIP`, `SAVE5`).
- ❤️ **Interactive Wishlist System** — Dedicated Wishlist view overriding department/brand filters so users never see unexpected blank states, complete with custom empty states.
- 📄 **B2B Checkout & Warehouse Pick Ticket** — Auto-formatted credit card inputs (`4242 4242 4242 4242`), instant order processing, and printable warehouse pick ticket generation.
- ⚙️ **Faceted Search & Filtering** — Real-time search across Name/SKU/Brand/Spec, multi-range price sliders, rating filters, brand checkboxes, in-stock, fast-dispatch, and clearable active chips.
- 🚀 **High-Performance Rendering** — Optimized with CSS `content-visibility: auto`, `contain-intrinsic-size`, `decoding="async"`, and native lazy image loading for silky-smooth 60fps rendering.
- 🎨 **Market-Ready Branding** — Official transparent vector logo mark, inverted browser tab favicons (`favicon.png` & `favicon.ico`), dark-mode compatibility, and enterprise B2B fulfillment guarantee section.

---

## 💻 Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Hand-rolled 7-1 SASS/SCSS design system, Bootstrap 5 Grid Layout
- **State Management**: OOJS `Cart` ES6 Model backed by `localStorage` persistence
- **Performance**: Native `IntersectionObserver`, CSS Content Visibility, Async Image Decoding

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v18.0.0+`
- npm `v9.0.0+`

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cartcraft.git
cd cartcraft

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev      # Server runs at http://localhost:5173
```

### Production Build

```bash
# Build production bundle
npm run build    # Generates single-file production bundle in dist/

# Preview production build locally
npm run preview
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

