<div align="center">

# 🍬 Candy Animation

**Cinematic Web Platform for Visualizing Technical Principles & Algorithms**

[简体中文](./README.md) | [English]

[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?logo=greensock)](https://greensock.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.9-409eff?logo=elementplus)](https://element-plus.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Ready-f38020?logo=cloudflare)](https://workers.cloudflare.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-6e9f18?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## 📖 Overview

**Candy Animation** is a modern, high-performance visualization web platform built with Vue 3, GSAP (GreenSock Animation Platform), Tailwind CSS, and Element Plus.

It bridges the gap between dense technical specifications and human intuition through **Cinematic Camera Choreography**, interactive sandboxes, and frame-accurate synchronized subtitles—transforming complex networking protocols, cryptographic systems, and low-level computer science concepts into vivid, immersive visual journeys.

Natively designed with **Cloudflare Workers global edge deployment** and **dedicated direct URLs** for each animation module with step-level deep-linking.

---

## ✨ Key Features

- 🔗 **Dedicated URLs & Direct Deep-Linking**:
  - Each technical animation possesses a standard direct URL (e.g. `/https-handshake`, `/md5-algorithm`) with full browser history support.
  - Step-level deep-linking via `?step=N` query parameter (e.g. `/https-handshake?step=3`) allows users to share direct references to specific concept phases.
  - Built-in **1-click direct link copy button (🔗 Copy Direct Link)** in the top navigation bar.
- ☁️ **Cloudflare Workers Global Edge Hosting Ready**:
  - Out-of-the-box support for Cloudflare Workers Static Assets with seamless SPA fallback (`not_found_handling = "single-page-application"`).
  - Configured with `wrangler.jsonc` and `src/worker.ts` proxy entrypoint for instant global edge deployment.
- 🎥 **Cinematic Camera Viewport**:
  - Encapsulates a unified `useCamera` controller simulating real-world cinematography: Zoom In, Zoom Out, Pan, Focus, and Macro Close-ups using GSAP matrix interpolations.
  - Multi-platform input support: Desktop mouse drag/wheel zoom alongside mobile single-finger pan and two-finger pinch-to-zoom.
- ⏱️ **Synchronized Subtitles & Comprehensive Playback Console**:
  - Each animation module is partitioned into clear chapters/steps driven by a finite state machine.
  - Fixed-position **Real-Time Subtitle Card** dynamically explains low-level technical principles with rich text and math syntax highlights.
  - Playback capabilities: **Play / Pause, Previous / Next Step, Scrubbing Slider, Chapter Marks, Speed Selection (0.5x / 1x / 1.5x / 2x), Reset**.
  - Global hotkeys: `Space` (Play/Pause), `←` / `→` (Step navigation), `R` (Reset).
- 🌓 **Tri-State Adaptive Theme System (Day / Night / System)**:
  - Three distinct modes: Light, Dark, and System (auto-detects `prefers-color-scheme`).
  - Deep two-way linkage between Tailwind CSS `dark:` utility variants and Element Plus dark CSS variables (`element-plus/theme-chalk/dark/css-vars.css`).
  - Smooth animated color transitions for all canvas paths, neon halos, particles, and typography.
- 🌐 **Seamless Internationalization (i18n)**:
  - Powered by `vue-i18n`, supporting instant zero-reload toggling between Simplified Chinese (`zh-CN`) and English (`en-US`) with `zh-CN` as default.
  - 100% parity across all UI strings, chapter badges, and technical explanations.
- 🧪 **Test-Driven Reliability (100% Pass Rate)**:
  - Built with Vitest + `@vue/test-utils` across 8 complete test suites and 31 test cases covering cryptographic RFC test vectors, timeline duration finiteness, and direct routing.

---

## 🎬 Built-in Animation Modules

### 1. HTTPS Handshake & Encryption Deep Dive (`https-handshake`)
- **Dedicated Direct URL**: `/https-handshake` (e.g. `/https-handshake?step=3`)
- **Step 1 (Connection Setup)**: Camera establishes wide view between client and server, animating the TCP 3-way handshake (`SYN` $\to$ `SYN+ACK` $\to$ `ACK`) establishing a reliable full-duplex pipe.
- **Step 2 (TLS Negotiation)**: Camera glides forward as client transmits `ClientHello` (random byte sequence and supported cipher suites), followed by server's `ServerHello`, X.509 certificate, and public key.
- **Step 3 (CA Certificate Verification)**: Camera zooms into the client's internal cryptographic engine to verify the digital signature using pre-installed trusted Root CAs.
  - 🔴 **Interactive MITM Simulator**: Toggle Man-in-the-Middle tampering on the fly to witness an instant forged certificate alert with red siren indicators!
- **Step 4 (Key Derivation & Symmetric Transmission)**: Client generates `Pre-master Secret`, encrypts it using server public key; both parties derive identical symmetric Session Keys (AES-GCM); camera pulls back as subsequent encrypted HTTP packets flow at maximum throughput.

### 2. MD5 Algorithm Low-Level Pipeline (`md5-algorithm`)
- **Dedicated Direct URL**: `/md5-algorithm` (e.g. `/md5-algorithm?step=4`)
- **Step 1 (Message Padding)**: Demonstrates appending a single bit `1` followed by `0` bits until length $\equiv 448 \pmod{512}$, then appending the 64-bit original length to assemble a clean 512-bit block.
- **Step 2 (Initialize Buffers)**: Macro closeup inspecting the four 32-bit magic state registers (`A=0x67452301`, `B=0xEFCDAB89`, `C=0x98BADCFE`, `D=0x10325476`).
- **Step 3 (64-Step Main Loop)**: Splits the 512-bit chunk into 16 words; step counter ticks through 4 rounds of non-linear functions (`F, G, H, I`), sinusoidal constant injection `T[i]`, modular addition, and circular left shift $\lll s$.
- **Step 4 (Cascade Output & Avalanche Lab)**: Concatenates final registers into a 128-bit (32 hexadecimal characters) digest.
  - 🧪 **Interactive Avalanche Lab**: Modify plaintexts in real time to observe the **Avalanche Effect** across a 128-bit pixel matrix (flipping just 1 character reverses ~50% of the entire output bits).

---

## 🛠️ Extensible Architecture

Adding a new technical animation module requires only 3 straightforward steps:

1. **Declare Metadata**: Define chapter steps, duration, and recommended camera keyframe coordinates in `src/modules/<new-module>/index.ts`.
2. **Build Stage & Timeline**: Create `Stage.vue` and `timeline.ts`, orchestrating visual elements with GSAP and `useCamera`.
3. **Register**: Import and call `registerModule(newModule)` inside `src/modules/index.ts` to automatically populate navigation, direct routing, controls, and translations.

---

## 📁 Directory Structure

```text
candy-animation/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable UI components
│   │   ├── CameraStage.vue       # Virtual camera stage & gesture wrapper
│   │   ├── HeaderNav.vue         # Navbar (direct URLs / share / language / theme)
│   │   ├── PlaybackControls.vue  # Full-featured playback console (scrubber/marks)
│   │   └── SubtitleCard.vue      # Synced explanation subtitle card
│   ├── composables/         # Vue 3 composables
│   │   ├── useCamera.ts          # Cinematic camera controller (GSAP matrix)
│   │   ├── useGsapTimeline.ts    # GSAP timeline & step state machine
│   │   └── useTheme.ts           # Light/dark/system theme sync
│   ├── locales/             # Internationalization files
│   │   ├── en-US.ts              # English locale dictionary
│   │   ├── index.ts              # i18n instance & localStorage persistence
│   │   └── zh-CN.ts              # Simplified Chinese dictionary
│   ├── modules/             # Visualization animation modules
│   │   ├── https-handshake/      # Module 1: HTTPS Handshake
│   │   │   ├── HttpsHandshakeStage.vue
│   │   │   ├── index.ts
│   │   │   └── timeline.ts
│   │   ├── md5-algorithm/        # Module 2: MD5 Internal Pipeline
│   │   │   ├── Md5AlgorithmStage.vue
│   │   │   ├── index.ts
│   │   │   └── timeline.ts
│   │   └── index.ts              # Central module registry
│   ├── router/              # Vue Router configuration
│   │   └── index.ts              # Dedicated URL routing & fallback
│   ├── types/               # TypeScript interfaces & types
│   │   └── animation.ts
│   ├── utils/               # Math & crypto utilities
│   │   └── md5.ts                # Pure TS RFC 1321 MD5 & bit diff comparator
│   ├── views/               # Route views
│   │   └── AnimationStageView.vue # Animation stage view & ?step=N deep-linking
│   ├── App.vue              # Root application layout
│   ├── main.ts              # Application bootstrap
│   ├── style.css            # Tailwind + Element Plus global styles
│   └── worker.ts            # Cloudflare Workers entrypoint (SPA proxy)
├── tests/                   # Unit test suite
│   └── unit/
│       ├── i18n.spec.ts          # Localization parity & persistence tests
│       ├── md5.spec.ts           # MD5 RFC vectors & avalanche tests
│       ├── modules.spec.ts       # Module schema & registry tests
│       ├── router.spec.ts        # Direct URLs & deep-linking tests
│       ├── timelineDuration.spec.ts # Timeline duration & progress tests
│       ├── useCamera.spec.ts     # Camera transform & gesture tests
│       ├── useGsapTimeline.spec.ts # Timeline controller tests
│       └── useTheme.spec.ts      # Theme switcher & DOM class tests
├── LICENSE                  # MIT License
├── README.md                # Chinese Documentation
├── README.en.md             # English Documentation
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc           # Cloudflare Workers configuration file
```

---

## 🚀 Getting Started & Cloudflare Workers Deployment

### 1. Prerequisites
Ensure you have Node.js (>= 18) and `pnpm` installed:
```bash
node -v
pnpm -v
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Start Development Server
```bash
pnpm dev
```
Open `http://localhost:5173` or jump directly to `http://localhost:5173/https-handshake` or `http://localhost:5173/md5-algorithm?step=2`.

### 4. Run Unit Tests
```bash
pnpm test:unit
```

### 5. Build for Production
```bash
pnpm build
```

### 6. Deploy to Cloudflare Workers
Authenticate with Cloudflare (`pnpm wrangler login`), then run:
```bash
# Preview build & asset packaging (Dry-run)
pnpm deploy:dry-run

# Deploy to Cloudflare Workers Global Edge Network
pnpm deploy
```
Once deployed, Cloudflare generates a global URL (e.g. `https://candy-animation.<subdomain>.workers.dev`), and every direct animation link (like `/https-handshake`, `/md5-algorithm`) is served seamlessly through Workers Static Assets SPA fallback!

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Description |
| :--- | :--- |
| `Space` | Toggle Play / Pause |
| `←` (Left Arrow) | Jump to Previous Step |
| `→` (Right Arrow) | Jump to Next Step |
| `R` / `r` | Reset Timeline and Camera View |

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE). Contributions and pull requests are warmly welcome!
