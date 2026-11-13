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

- 🏠 **Cinematic Home View & Categorized Showcase**:
  - Interactive constellation particle canvas with dynamic cursor gravity/repulsion and seamless day/night theme palette.
  - GSAP fluid entrance choreography orchestrating hero badges, frosted typography, metric boards, and category cards.
  - All 6 built-in modules structured into two primary domains: **Networking & Communication Protocols** and **Modern Cryptography & Hash Algorithms** with direct step deep-linking chips.
- 🧭 **Responsive Categorized Sidebar Navigation**:
  - Clean collapsible sidebar navigation on desktop (with 1-click icon-only mini mode) maximizing stage real estate.
  - Mobile adaptive lightweight header with smooth slide-over touch drawer.
  - Houses the complete category tree, home entry, theme toggling, bilingual switching, and 1-click direct link copy.
- 🔗 **Dedicated URLs & Direct Deep-Linking**:
  - Each technical animation possesses a standard direct URL (e.g. `/https-handshake`, `/md5-algorithm`, `/websocket-protocol`, `/tcp-ip-protocol`, `/sha256-algorithm`, `/tcp-handshake-wave`) with full browser history support.
  - Step-level deep-linking via `?step=N` query parameter (e.g. `/https-handshake?step=3` or `/sha256-algorithm?step=2`) allows users to share direct references to specific concept phases.
  - Built-in **1-click direct link copy button (🔗 Copy Direct Link)** in the sidebar and cards.
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
  - Built with Vitest + `@vue/test-utils` across 13 complete test suites and 51 test cases covering cryptographic RFC test vectors (MD5/SHA-256), TCP 3-way handshake & 4-way wave state machines, WebSocket XOR masking, TCP/IP encapsulation overhead, sidebar navigation, and home view rendering.

---

## 🎬 Core Built-in Animation Modules

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

### 3. WebSocket Full-Duplex Protocol Deep Dive (`websocket-protocol`)
- **Dedicated Direct URL**: `/websocket-protocol` (e.g. `/websocket-protocol?step=2`)
- **Step 1 (Upgrade Handshake)**: Client sends `Upgrade: websocket` and `Sec-WebSocket-Key` via HTTP/1.1; server computes SHA-1 digest with RFC GUID and returns `101 Switching Protocols` to morph into a bidirectional socket.
- **Step 2 (Frame & Masking)**: Camera zooms into RFC 6455 binary frame headers (`FIN`, `Opcode`, `MASK`, payload length); demonstrates client 32-bit random key XOR obfuscation preventing proxy cache poisoning.
- **Step 3 (Full-Duplex & Heartbeat)**: Camera pulls back to reveal simultaneous upload/download pipelines and millisecond-latency `Ping (0x9)` / `Pong (0xA)` keepalive detection.
- **Step 4 (Graceful Closure)**: Either party dispatches an `0x8` Close Frame with code `1000 Normal Closure`, followed by clean TCP socket release.
  - 🧪 **Interactive Frame & Masking Lab**: Input custom messages to generate live 32-bit random mask keys, inspect XOR transformed bytes, and dispatch Ping/Pong heartbeats.

### 4. TCP/IP Protocol Stack Layering & Encapsulation (`tcp-ip-protocol`)
- **Dedicated Direct URL**: `/tcp-ip-protocol` (e.g. `/tcp-ip-protocol?step=3`)
- **Step 1 (Transport Encapsulation)**: Application payload (HTTP GET) moves down to Transport layer; prepends 20-byte **TCP Header** (Ports, Seq, Ack, Flags) to form a **TCP Segment**.
- **Step 2 (Network Encapsulation)**: Transport segment moves to Network layer; prepends 20-byte **IP Header** (Source/Dest IP, TTL, Protocol 0x06) to form an **IP Packet (Datagram)**.
- **Step 3 (Data Link Framing)**: NIC prepends 14-byte **Ethernet MAC Header** and appends 4-byte **FCS (CRC-32)** trailer; pulses travel across physical transmission media.
- **Step 4 (Receiver Decapsulation)**: Destination host validates FCS, peeling Ethernet, IP, and TCP headers layer by layer to deliver pure data to listening server processes (Nginx/Node.js).
  - 🔍 **Interactive Packet Inspector**: Adjust payloads and ports to compute total Ethernet frame size and protocol overhead ratios in real time.

### 5. SHA-256 Secure Hash Algorithm Deep Dive (`sha256-algorithm`)
- **Dedicated Direct URL**: `/sha256-algorithm` (e.g. `/sha256-algorithm?step=3`)
- **Step 1 (Padding & 64-bit Length Append)**: Appends a single bit `1` and zeroes to satisfy $448 \pmod{512}$, then appends 64-bit big-endian original bit length to form 512-bit message blocks.
- **Step 2 (Initialize 8x 32-bit Hash Registers)**: Zooms in on 8 hash state variables (`H0 ~ H7`, working registers `a ~ h`) derived from fractional square roots of the first 8 prime numbers (2 to 19).
- **Step 3 (Message Schedule & 64 Compression Rounds)**: Expands 16 words into 64 words $W[0..63]$ using $\sigma_0, \sigma_1$; iterates through 64 rounds using round constants $K[t]$, conditional function $Ch$, majority function $Maj$, and rotations $\Sigma_0, \Sigma_1$.
- **Step 4 (Cascade Output & 256-bit Avalanche Lab)**: Accumulates state registers into previous hashes and outputs 256-bit (64 hex characters) digest.
  - 🛡️ **Interactive Avalanche Matrix**: 16×16 (256-bit) live pixel matrix demonstrating ~50% bit flip diffusion upon a single character change.

### 6. TCP 3-Way Handshake & 4-Way Wave Termination (`tcp-handshake-wave`)
- **Dedicated Direct URL**: `/tcp-handshake-wave` (e.g. `/tcp-handshake-wave?step=1`)
- **Step 1 (Connection Setup: Client SYN & Server SYN+ACK)**: Client shifts from `CLOSED` to `SYN_SENT` sending `SYN` (`seq=x`); server in `LISTEN` replies with `SYN + ACK` (`seq=y, ack=x+1`) and transitions to `SYN_RCVD`.
- **Step 2 (Connection Established: Client ACK & ESTABLISHED)**: Client sends `ACK` (`ack=y+1`) entering `ESTABLISHED`; server receives and transitions to `ESTABLISHED`, opening the reliable bidirectional pipe.
- **Step 3 (Teardown Initiation: Client FIN & Half-Close CLOSE_WAIT)**: Client transmits `FIN` (`seq=u`) entering `FIN_WAIT_1`; server returns `ACK` (`ack=u+1`) entering `CLOSE_WAIT`, while client enters `FIN_WAIT_2` half-close state.
- **Step 4 (Complete Teardown: Server FIN & 2MSL TIME_WAIT Protection)**: Server sends `FIN + ACK` entering `LAST_ACK`; client replies with final `ACK` and enters `TIME_WAIT` for 2MSL to absorb duplicate packets before reverting to `CLOSED`.
  - ⏱️ **Interactive Inspector**: Custom initial sequence numbers (`seq=x`, `seq=y`), automatic sequence deduction table, and live 2MSL countdown simulator.

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
│   │   ├── PlaybackControls.vue  # Full-featured playback console (scrubber/marks)
│   │   ├── SidebarNav.vue        # Responsive categorized sidebar navigation
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
│   │   ├── https-handshake/      # Module 1: HTTPS Handshake (Networking)
│   │   ├── md5-algorithm/        # Module 2: MD5 Internal Pipeline (Crypto)
│   │   ├── websocket-protocol/   # Module 3: WebSocket Protocol (Networking)
│   │   ├── tcp-ip-protocol/      # Module 4: TCP/IP Stack Encapsulation (Networking)
│   │   ├── sha256-algorithm/     # Module 5: SHA-256 Hash Algorithm (Crypto)
│   │   ├── tcp-handshake-wave/   # Module 6: TCP 3-Way Handshake & 4-Way Wave (Networking)
│   │   └── index.ts              # Module and category registry
│   ├── router/              # Vue Router configuration
│   │   └── index.ts              # Home view and dedicated URL routing
│   ├── types/               # TypeScript interfaces & types
│   │   └── animation.ts
│   ├── utils/               # Math & crypto utilities
│   │   ├── md5.ts                # Pure TS RFC 1321 MD5 & bit diff comparator
│   │   ├── sha256.ts             # Pure TS SHA-256 algorithm & 256-bit avalanche
│   │   └── websocket.ts          # RFC 6455 frame & XOR masking calculator
│   ├── views/               # Route views
│   │   ├── HomeView.vue           # Cinematic platform home page (particle mesh & categories)
│   │   └── AnimationStageView.vue # Animation stage view & ?step=N deep-linking
│   ├── App.vue              # Root application layout (sidebar + main stage)
│   ├── main.ts              # Application bootstrap
│   ├── style.css            # Tailwind + Element Plus global styles
│   └── worker.ts            # Cloudflare Workers entrypoint (SPA proxy)
├── tests/                   # Unit test suite
│   └── unit/
│       ├── i18n.spec.ts          # Localization parity & persistence tests
│       ├── md5.spec.ts           # MD5 RFC vectors & avalanche tests
│       ├── modules.spec.ts       # Module schema & category tests
│       ├── router.spec.ts        # Direct URLs & deep-linking tests
│       ├── sha256.spec.ts        # SHA-256 standard vectors & 256-bit matrix tests
│       ├── sidebarAndHome.spec.ts # Sidebar navigation & Home page rendering tests
│       ├── tcphandshake.spec.ts  # TCP handshake/wave state machine & 2MSL tests
│       ├── tcpip.spec.ts         # TCP/IP layering & overhead tests
│       ├── timelineDuration.spec.ts # Timeline duration & progress tests
│       ├── useCamera.spec.ts     # Camera transform & gesture tests
│       ├── useGsapTimeline.spec.ts # Timeline controller tests
│       ├── useTheme.spec.ts      # Theme switcher & DOM class tests
│       └── websocket.spec.ts     # WebSocket XOR masking & frame tests
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
Open `http://localhost:5173` or jump directly to:
- `http://localhost:5173/https-handshake`
- `http://localhost:5173/md5-algorithm`
- `http://localhost:5173/websocket-protocol`
- `http://localhost:5173/tcp-ip-protocol`
- `http://localhost:5173/sha256-algorithm`
- `http://localhost:5173/tcp-handshake-wave`

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
Once deployed, Cloudflare generates a global URL (e.g. `https://candy-animation.<subdomain>.workers.dev`), and every direct animation link is served seamlessly through Workers Static Assets SPA fallback!

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
