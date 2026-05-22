# boAt Reimagined 🎧

A cinematic, high-performance concept redesign and architectural study for India's #1 audio brand, **boAt**. This project reimagines the e-commerce experience with immersive storytelling, advanced scroll-based animations, and dynamic ambient lighting.

![boAt Reimagined](public/videos/hero-earbud-poster.jpg)

## 🚀 Live Demo & Deployment
This project is built to be deployed on Vercel.

**To deploy locally via Vercel CLI:**
```bash
npx vercel --prod
```

## ✨ Key Features

- **Immersive Hero Experience**: A high-fidelity cinematic landing experience with smooth video integration.
- **"The Drop" Horizontal Showcase**: A complex scroll-jacked horizontal carousel powered by GSAP ScrollTrigger. Features rich atmospheric effects including dynamic warm/deep glows, expanding soundwave rings, and drifting dust particles mapped precisely to horizontal scroll progress.
- **Dynamic Product Detail Pages (PDP)**: 
  - Seamless image cross-fading using Framer Motion `popLayout`.
  - Advanced ambient background re-lighting that dynamically color-shifts based on the selected product color swatch.
- **State-of-the-Art Animations**: Uses GSAP `MatchMedia` for complex desktop-vs-mobile responsive animations and native smooth-scrolling synchronization.
- **Modern Tech Stack**: Fully typed and server-side rendered (SSG) for maximum performance and SEO.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP (GreenSock)](https://gsap.com/) + [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context (CartContext)
- **Deployment**: Vercel

## 💻 Local Development

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Architecture Highlights

- `app/` - Next.js App Router architecture with SSG product pages (`product/[slug]`).
- `components/sections/` - Modular UI sections including the complex `Drop.tsx` (horizontal GSAP scroll) and `ProductClientPage.tsx` (interactive variant switcher).
- `lib/products.ts` - Local data layer mapping products, variants, rich glow RGBAs, and associated image assets.
- `context/CartContext.tsx` - Lightweight, optimized global cart state.

## 🎨 Design Engineering

The project emphasizes **design engineering** — bridging the gap between static Figma designs and fluid, interactive web experiences. Complex techniques such as dynamic Z-index layering, hardware-accelerated transforms, and React reconciliation bridging (wiring GSAP progress into React state for pagination dots) are heavily utilized.
