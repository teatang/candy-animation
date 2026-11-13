<div align="center">

# 🍬 Candy Animation

**Cinematic Web Platform for Visualizing Technical Principles & Algorithms**

[简体中文](./README.md) | [English]

[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?logo=greensock)](https://greensock.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.9-409eff?logo=elementplus)](https://element-plus.org/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-6e9f18?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## 📖 Overview

**Candy Animation** is a modern, high-performance visualization web platform built with Vue 3, GSAP (GreenSock Animation Platform), Tailwind CSS, and Element Plus.

It bridges the gap between dense technical specifications and human intuition through **Cinematic Camera Choreography**, interactive sandboxes, and frame-accurate synchronized subtitles—transforming complex networking protocols, cryptographic systems, and low-level computer science concepts into vivid, immersive visual journeys.

---

## ✨ Key Features

- 🎥 **Cinematic Camera Viewport**:
  - Encapsulates a unified `useCamera` controller simulating real-world cinematography: Zoom In, Zoom Out, Pan, Focus, and Macro Close-ups using GSAP matrix interpolations.
  - Multi-platform input support: Desktop mouse drag/wheel zoom alongside mobile single-finger pan and two-finger pinch-to-zoom.
- ⏱️ **Synchronized Subtitles & Comprehensive Playback Console**:
  - Each animation module is partitioned into clear chapters/steps driven by a finite state machine.
  - Fixed-position **Real-Time Subtitle Card** dynamically explains low-level technical principles with rich text and math syntax highlights.
  - Playback capabilities: **Play / Pause, Previous / Next Step, Scrubbing Slider, Speed Selection (0.5x / 1x / 1.5x / 2x), Reset**.
  - Global hotkeys: `Space` (Play/Pause), `←` / `→` (Step navigation), `R` (Reset).
- 🌓 **Tri-State Adaptive Theme System (Day / Night / System)**:
  - Three distinct modes: Light, Dark, and System (auto-detects `prefers-color-scheme`).
  - Deep two-way linkage between Tailwind CSS `dark:` utility variants and Element Plus dark CSS variables (`element-plus/theme-chalk/dark/css-vars.css`).
  - Smooth animated color transitions for all canvas paths, neon halos, particles, and typography.
- 🌐 **Seamless Internationalization (i18n)**:
  - Powered by `vue-i18n`, supporting instant zero-reload toggling between Simplified Chinese (`zh-CN`) and English (`en-US`) with `zh-CN` as default.
  - 100% parity across all UI strings, chapter badges, and technical explanations.
- 🧪 **Test-Driven Reliability (100% Pass Rate)**:
  - Built with Vitest + `@vue/test-utils`, covering cryptographic RFC test vectors, theme managers, timeline controllers, camera poses, and i18n dictionary completeness.

---

## 🎬 Built-in Animation Modules

### 1. HTTPS Handshake & Encryption Deep Dive (`https-handshake`)
- **Step 1 (Connection Setup)**: Camera establishes wide view between client and server, animating the TCP 3-way handshake (`SYN` $\to$ `SYN+ACK` $\to$ `ACK`) establishing a reliable full-duplex pipe.
- **Step 2 (TLS Negotiation)**: Camera glides forward as client transmits `ClientHello` (random byte sequence and supported cipher suites), followed by server's `ServerHello`, X.509 certificate, and public key.
- **Step 3 (CA Certificate Verification)**: Camera zooms into the client's internal cryptographic engine to verify the digital signature using pre-installed trusted Root CAs.
  - 🔴 **Interactive MITM Simulator**: Toggle Man-in-the-Middle tampering on the fly to witness an instant forged certificate alert with red siren indicators!
- **Step 4 (Key Derivation & Symmetric Transmission)**: Client generates `Pre-master Secret`, encrypts it using server public key; both parties derive identical symmetric Session Keys (AES-GCM); camera pulls back as subsequent encrypted HTTP packets flow at maximum throughput.

### 2. MD5 Algorithm Low-Level Pipeline (`md5-algorithm`)
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
3. **Register**: Import and call `registerModule(newModule)` inside `src/modules/index.ts` to automatically populate navigation, controls, and translations.

---

## 📁 Directory Structure

```text
candy-animation/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable UI components
│   │   ├── CameraStage.vue       # Virtual camera stage & gesture wrapper
│   │   ├── HeaderNav.vue         # Navbar (module / language / theme)
│   │   ├── PlaybackControls.vue  # Full-featured playback console
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
│   ├── types/               # TypeScript interfaces & types
│   │   └── animation.ts
│   ├── utils/               # Math & crypto utilities
│   │   └── md5.ts                # Pure TS RFC 1321 MD5 & bit diff comparator
│   ├── App.vue              # Root application layout
│   ├── main.ts              # Application bootstrap
│   └── style.css            # Tailwind + Element Plus global styles
├── tests/                   # Unit test suite
│   └── unit/
│       ├── i18n.spec.ts          # Localization parity & persistence tests
│       ├── md5.spec.ts           # MD5 RFC vectors & avalanche tests
│       ├── modules.spec.ts       # Module schema & registry tests
│       ├── useCamera.spec.ts     # Camera transform & gesture tests
│       ├── useGsapTimeline.spec.ts # Timeline controller tests
│       └── useTheme.spec.ts      # Theme switcher & DOM class tests
├── LICENSE                  # MIT License
├── README.md                # Chinese Documentation
├── README.en.md             # English Documentation
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

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
Open `http://localhost:5173` in your browser.

### 4. Run Unit Tests
```bash
pnpm test:unit
```

### 5. Build for Production
```bash
pnpm build
```

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
