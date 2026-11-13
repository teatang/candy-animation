<div align="center">

# 🍬 糖果动画 (Candy Animation)

**具备电影镜头感的技术底层原理可视化 Web 动画平台**

[简体中文] | [English](./README.en.md)

[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?logo=greensock)](https://greensock.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.9-409eff?logo=elementplus)](https://element-plus.org/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-6e9f18?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## 📖 项目简介 (Overview)

**糖果动画 (Candy Animation)** 是一款由 Vue 3 生态、GSAP 核心动画引擎与 Tailwind CSS 构建的高性能、现代极简风格技术原理可视化平台。

本项目致力于通过**专业电影镜头感（Cinematic Camera Choreography）**、微交互动效与音画同步解说，打破枯燥的技术文档壁垒，将复杂抽象的网络协议、密码学及底层数据结构转化为直观、震撼的沉浸式视觉体验。

---

## ✨ 核心特性 (Key Features)

- 🎥 **电影级虚拟镜头系统 (Cinematic Camera Viewport)**:
  - 封装统一的 `useCamera` 镜头控制器，通过平滑的 GSAP 矩阵变换模拟真实摄影机的推（Zoom In）、拉（Zoom Out）、摇（Pan）、对焦（Focus）与微距特写。
  - 支持多端交互：支持桌面端鼠标拖拽平移、滚轮缩放，以及移动端单指拖拽、双指缩放（Pinch-to-Zoom）。
- ⏱️ **音画同步解说与全能播控台 (Synced Subtitle & Console)**:
  - 每个动画模块划分清晰的关键阶段（Chapters / Steps），状态机驱动时间轴。
  - 屏幕配备**实时同步字幕/解说卡片**，随进度动态解析底层技术细节，支持富文本高亮与公式。
  - 播控功能：**播放 / 暂停、上一步 / 下一步、时间轴拖拽（Scrubbing）、倍速切换（0.5x / 1x / 1.5x / 2x）、重置**。
  - 全局键盘快捷键：`Space`（播放/暂停）、`←` / `→`（单步前后跳转）、`R`（重置回原点）。
- 🌓 **三态自适应主题系统 (Day / Night / System)**:
  - 支持浅色（Light）、深色（Dark）、跟随操作系统（System）三种主题状态。
  - 深度联动 Tailwind CSS `dark:` 变体与 Element Plus 暗黑模式 CSS 变量（`element-plus/theme-chalk/dark/css-vars.css`）。
  - 动画舞台的所有线条、描边、光晕粒子与说明文字均实现平滑色彩过渡。
- 🌐 **双语国际化 (i18n)**:
  - 基于 `vue-i18n` 实现简体中文（`zh-CN`）与英文（`en-US`）无缝热切换（默认 `zh-CN`）。
  - 组件零硬编码文案，UI 标签、章节标题与步骤解说词 100% 保持双语对应。
- 🧪 **单元测试完备 (100% Pass)**:
  - 基于 Vitest + `@vue/test-utils`，覆盖密码学算法、主题管理、时间轴播控、相机姿态与国际化词条完整性。

---

## 🎬 首批内置动画模块 (Built-in Modules)

### 1. HTTPS 握手与加密传输原理 (`https-handshake`)
- **阶段 1（建立连接）**: 镜头展示客户端与服务端，动画演练 TCP 三次握手（`SYN` $\to$ `SYN+ACK` $\to$ `ACK`）建立全双工通道。
- **阶段 2（TLS 协商）**: 镜头微推进，客户端发送 `ClientHello`（包含随机数与加密套件），服务端回复 `ServerHello` 与 X.509 数字证书及公钥。
- **阶段 3（CA 证书校验）**: 镜头特写切入客户端内部密码学引擎，利用本地信任根 CA 验证签名合法性。
  - 🔴 **内置交互**: 支持一键切换**中间人攻击 (MITM)** 模拟，伪造证书即刻触发系统红色声光警报！
- **阶段 4（密钥派生与对称加密）**: 生成 `Pre-master Secret` 并公钥加密传输，双方共同派生出完全一致的对称会话密钥（Session Key，AES-GCM）；镜头拉远，展现 HTTP 数据包加密穿梭的全速通道。

### 2. MD5 摘要算法底层流程 (`md5-algorithm`)
- **阶段 1（消息填充 Padding）**: 演示任意长度明文位流追加单个 `1` 和若干 `0`，使得长度满足 $\equiv 448 \pmod{512}$，最后追加 64 位原始长度值，形成标准 512 位分组。
- **阶段 2（初始化缓冲区）**: 镜头特写展示 4 个 32 位初始幻数寄存器（`A=0x67452301`, `B=0xEFCDAB89`, `C=0x98BADCFE`, `D=0x10325476`）。
- **阶段 3（4 轮 64 步主循环）**: 展示 512 位分组切分为 16 个子块，密集演算 4 轮非线性布尔函数（`F, G, H, I`）、三角函数常数表 `T[i]`、循环左移 $\lll s$ 与模加运算的雪崩迭代。
- **阶段 4（级联输出与雪崩实验室）**: 拼接出 128 位（32 个十六进制字符）最终哈希值。
  - 🧪 **内置实验室**: 实时输入两组微小差异的明文，计算并以 128 个二进制点阵像素网格直观展现**雪崩效应 (Avalanche Effect)**（仅微调 1 个字符，导致约 50% 比特彻底反转）。

---

## 🛠️ 可扩展架构设计 (Extensible Architecture)

系统采用模块化插拔架构，新增一个技术可视化模块仅需 3 步：

1. **配置元数据**: 在 `src/modules/<new-module>/index.ts` 声明步骤信息、时长与推荐镜头机位姿态。
2. **构建舞台与时间轴**: 创建 `NewStage.vue` 与 `timeline.ts`，使用 GSAP 与 `useCamera` 进行运镜编排。
3. **注册入库**: 在 `src/modules/index.ts` 中调用 `registerModule(newModule)` 即可自动在全局导航、播控台与多语言体系生效。

---

## 📁 项目目录结构 (Directory Structure)

```text
candy-animation/
├── src/
│   ├── assets/              # 静态资源
│   ├── components/          # 全局通用 UI 组件
│   │   ├── CameraStage.vue       # 虚拟镜头渲染舞台与手势容器
│   │   ├── HeaderNav.vue         # 顶部导航栏 (模块切换/语言/主题)
│   │   ├── PlaybackControls.vue  # 全能播控控制台 (播放/进度拖拽/倍速)
│   │   └── SubtitleCard.vue      # 实时同步解说词卡片
│   ├── composables/         # 组合式函数
│   │   ├── useCamera.ts          # 电影摄影机运镜控制器 (GSAP 矩阵驱动)
│   │   ├── useGsapTimeline.ts    # GSAP 主时间轴与步骤状态机控制器
│   │   └── useTheme.ts           # 日/夜/系统三态主题联动管理器
│   ├── locales/             # 国际化语言包
│   │   ├── en-US.ts              # 英文词典 (与中文 100% 对应)
│   │   ├── index.ts              # i18n 实例与存储持久化
│   │   └── zh-CN.ts              # 简体中文词典
│   ├── modules/             # 可视化动画业务模块
│   │   ├── https-handshake/      # 模块 1: HTTPS 握手原理
│   │   │   ├── HttpsHandshakeStage.vue
│   │   │   ├── index.ts
│   │   │   └── timeline.ts
│   │   ├── md5-algorithm/        # 模块 2: MD5 算法底层实现
│   │   │   ├── Md5AlgorithmStage.vue
│   │   │   ├── index.ts
│   │   │   └── timeline.ts
│   │   └── index.ts              # 动画模块注册中心
│   ├── types/               # TypeScript 类型定义
│   │   └── animation.ts
│   ├── utils/               # 密码学与数学工具库
│   │   └── md5.ts                # 标准 MD5 纯 TS 算法与雪崩比对计算
│   ├── App.vue              # 根应用主视图
│   ├── main.ts              # 入口引导文件
│   └── style.css            # Tailwind + Element Plus 全局样式
├── tests/                   # 单元测试集
│   └── unit/
│       ├── i18n.spec.ts          # 国际化键名对称性与持久化测试
│       ├── md5.spec.ts           # MD5 标准向量与雪崩测试
│       ├── modules.spec.ts       # 模块注册规范测试
│       ├── useCamera.spec.ts     # 摄影机变换与手势测试
│       ├── useGsapTimeline.spec.ts # 时间轴控制器状态机测试
│       └── useTheme.spec.ts      # 主题切换与 DOM 变体测试
├── LICENSE                  # MIT 开源协议
├── README.md                # 简体中文文档
├── README.en.md             # 英文文档
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 启动与构建指南 (Getting Started)

### 1. 环境准备
确保本机安装了 Node.js (>= 18) 与 `pnpm`：
```bash
node -v
pnpm -v
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 启动本地开发服务
```bash
pnpm dev
```
启动后在浏览器打开 `http://localhost:5173` 体验。

### 4. 运行全量单元测试
```bash
pnpm test:unit
```

### 5. 生产构建打包
```bash
pnpm build
```

---

## ⌨️ 快捷键指南 (Keyboard Shortcuts)

| 快捷键 | 功能说明 |
| :--- | :--- |
| `Space` (空格) | 播放 / 暂停动画切换 |
| `←` (左方向键) | 跳转至上一个关键阶段 (Prev Step) |
| `→` (右方向键) | 跳转至下一个关键阶段 (Next Step) |
| `R` / `r` | 重置时间轴回到起点并复位摄影机视角 |

---

## 📄 开源协议 (License)

本项目基于 [MIT License](./LICENSE) 协议完全开源。欢迎提交 Issue 与 Pull Request！
