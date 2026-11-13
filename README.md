<div align="center">

# 🍬 糖果动画 (Candy Animation)

**具备电影镜头感的技术底层原理可视化 Web 动画平台**

[简体中文] | [English](./README.en.md)

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

## 📖 项目简介 (Overview)

**糖果动画 (Candy Animation)** 是一款由 Vue 3 生态、GSAP 核心动画引擎与 Tailwind CSS 构建的高性能、现代极简风格技术原理可视化平台。

本项目致力于通过**专业电影镜头感（Cinematic Camera Choreography）**、微交互动效与音画同步解说，打破枯燥的技术文档壁垒，将复杂抽象的网络协议、密码学及底层数据结构转化为直观、震撼的沉浸式视觉体验。原生支持**一键部署至 Cloudflare Workers 全球边缘网络**，并且每个动画均分配了**独立的专属直达 URL**，支持精准步骤深链（Deep-linking）。

---

## ✨ 核心特性 (Key Features)

- 🏠 **酷炫粒子视觉首页与深度分类总览 (Cinematic Home View & Categorized Showcase)**:
  - 首页集成交互式 Canvas 动态粒子星网（支持光标动态引力/排斥交互、自适应日夜配色）。
  - GSAP 电影级流式入场动效编排（徽章、磨砂字、核心指标看板与分类卡片平滑梯次推进）。
  - 将全部 6 个内置技术动画清晰归集为 **网络通信与传输协议** 与 **现代密码学与散列算法** 两大专业板块，卡片直观透出各步骤深链跳转锚点。
- 🧭 **响应式全功能侧边导航栏 (Responsive Categorized Sidebar Navigation)**:
  - 采用现代极简侧边导航设计，支持桌面端一键折叠（Mini 紧凑图标模式）与展开，最大化释放动画舞台的交互视野。
  - 移动端自动转为轻量级顶部工具条并搭配触控滑出式抽屉（Drawer）。
  - 侧边栏集成分类树状目录、首页直达入口、主题快速切换、中英文热切与独立直达链接一键复制。
- 🔗 **专属独立 URL 与步骤深链直达 (Dedicated URLs & Deep-linking)**:
  - 每个技术动画均享有规范的独立直达路径（如 `/https-handshake`、`/md5-algorithm`、`/websocket-protocol`、`/tcp-ip-protocol`、`/sha256-algorithm`、`/tcp-handshake-wave`），支持浏览器无刷新前进/后退。
  - 支持 `?step=N` 步骤定位参数（例如 `/https-handshake?step=3` 或 `/sha256-algorithm?step=2`），直接打开即可跳转至目标原理解析步骤。
  - 侧边栏与卡片内置**一键复制直达链接（🔗 复制直达链接）**，方便快速分享教学与技术演示。
- ☁️ **Cloudflare Workers 全球边缘托管支持 (Cloudflare Workers Ready)**:
  - 开箱即用支持部署至 Cloudflare Workers 静态资产引擎（Static Assets with SPA Fallback）。
  - 内置 `wrangler.jsonc` 规范配置与 `src/worker.ts` 入口代理，一条命令即可完成全球边缘极速分发。
- 🎥 **电影级虚拟镜头系统 (Cinematic Camera Viewport)**:
  - 封装统一的 `useCamera` 镜头控制器，通过平滑的 GSAP 矩阵变换模拟真实摄影机的推（Zoom In）、拉（Zoom Out）、摇（Pan）、对焦（Focus）与微距特写。
  - 支持多端交互：桌面端鼠标拖拽平移、滚轮缩放，移动端单指滑动画布与双指缩放（Pinch-to-Zoom）。
- ⏱️ **音画同步解说与全能播控台 (Synced Subtitle & Console)**:
  - 每个动画模块划分清晰的关键阶段（Chapters / Steps），状态机驱动时间轴。
  - 屏幕配备**实时同步字幕/解说卡片**，随进度动态解析底层技术细节，支持富文本高亮与公式。
  - 播控功能：**播放 / 暂停、上一步 / 下一步、时间轴拖拽（Scrubbing）、阶段标记点（Marks）、倍速切换（0.5x / 1x / 1.5x / 2x）、重置**。
  - 全局键盘快捷键：`Space`（播放/暂停）、`←` / `→`（单步前后跳转）、`R`（重置回原点）。
- 🌓 **三态自适应主题系统 (Day / Night / System)**:
  - 支持浅色（Light）、深色（Dark）、跟随操作系统（System）三种主题状态。
  - 深度联动 Tailwind CSS `dark:` 变体与 Element Plus 暗黑模式 CSS 变量（`element-plus/theme-chalk/dark/css-vars.css`）。
  - 动画舞台的所有线条、描边、光晕粒子与说明文字均实现平滑色彩过渡。
- 🌐 **双语国际化 (i18n)**:
  - 基于 `vue-i18n` 实现简体中文（`zh-CN`）与英文（`en-US`）无缝热切换（默认 `zh-CN`）。
  - 组件零硬编码文案，UI 标签、章节标题与步骤解说词 100% 保持双语对应。
- 🧪 **单元测试完备 (100% Pass)**:
  - 基于 Vitest + `@vue/test-utils`，拥有 13 个完整测试套件共 51 项测试用例，覆盖密码学 RFC 向量（MD5/SHA-256）、TCP 三次握手/四次挥手状态机、WebSocket XOR 掩码、TCP/IP 分层封装开销、侧边栏导航分类与首页渲染。

---

## 🎬 核心内置动画模块 (Built-in Modules)

### 1. HTTPS 握手与加密传输原理 (`https-handshake`)
- **专属直达 URL**: `/https-handshake` (深链支持如 `/https-handshake?step=3`)
- **阶段 1（建立连接）**: 镜头展示客户端与服务端，动画演练 TCP 三次握手（`SYN` $\to$ `SYN+ACK` $\to$ `ACK`）建立全双工通道。
- **阶段 2（TLS 协商）**: 镜头微推进，客户端发送 `ClientHello`（包含随机数与加密套件），服务端回复 `ServerHello` 与 X.509 数字证书及公钥。
- **阶段 3（CA 证书校验）**: 镜头特写切入客户端内部密码学引擎，利用本地信任根 CA 验证签名合法性。
  - 🔴 **内置交互**: 支持一键切换**中间人攻击 (MITM)** 模拟，伪造证书即刻触发系统红色声光警报！
- **阶段 4（密钥派生与对称加密）**: 生成 `Pre-master Secret` 并公钥加密传输，双方共同派生出完全一致的对称会话密钥（Session Key，AES-GCM）；镜头拉远，展现 HTTP 数据包加密穿梭的全速通道。

### 2. MD5 摘要算法底层流程 (`md5-algorithm`)
- **专属直达 URL**: `/md5-algorithm` (深链支持如 `/md5-algorithm?step=4`)
- **阶段 1（消息填充 Padding）**: 演示任意长度明文位流追加单个 `1` 和若干 `0`，使得长度满足 $\equiv 448 \pmod{512}$，最后追加 64 位原始长度值，形成标准 512 位分组。
- **阶段 2（初始化缓冲区）**: 镜头特写展示 4 个 32 位初始幻数寄存器（`A=0x67452301`, `B=0xEFCDAB89`, `C=0x98BADCFE`, `D=0x10325476`）。
- **阶段 3（4 轮 64 步主循环）**: 展示 512 位分组切分为 16 个子块，密集演算 4 轮非线性布尔函数（`F, G, H, I`）、三角函数常数表 `T[i]`、循环左移 $\lll s$ 与模加运算的雪崩迭代。
- **阶段 4（级联输出与雪崩实验室）**: 拼接出 128 位（32 个十六进制字符）最终哈希值。
  - 🧪 **内置实验室**: 实时输入两组微小差异的明文，计算并以 128 个二进制点阵像素网格直观展现**雪崩效应 (Avalanche Effect)**（仅微调 1 个字符，导致约 50% 比特彻底反转）。

### 3. WebSocket 全双工通信协议原理 (`websocket-protocol`)
- **专属直达 URL**: `/websocket-protocol` (深链支持如 `/websocket-protocol?step=2`)
- **阶段 1（升级协商握手）**: 演示客户端通过 HTTP/1.1 携带 `Upgrade: websocket` 与 `Sec-WebSocket-Key` 发起请求，服务端结合特定 GUID 计算 SHA-1 并回传 `101 Switching Protocols`，将单工 HTTP 平滑切换为双向全双工通道。
- **阶段 2（数据帧掩码机制）**: 镜头特写切入 RFC 6455 二进制帧结构：解析 `FIN`、`Opcode`、`MASK` 与载荷长度，演示客户端通过 32-bit 随机掩码进行 XOR 异或混淆以防止中间代理缓存污染。
- **阶段 3（全双工并发与心跳保活）**: 镜头拉远展现上下行双车道同时并发收发消息，演示 `Ping (0x9)` 与 `Pong (0xA)` 毫秒级心跳保活机制。
- **阶段 4（优雅关闭握手）**: 发送 `0x8` 关闭控制帧（携带 `1000 Normal Closure`），对端应答关闭帧后安全释放底层 TCP 套接字。
  - 🧪 **内置实验室**: 实时输入消息，动态生成 32-bit 随机掩码，可视化 XOR 编码与还原过程，并支持触发实时 Ping/Pong 心跳探测。

### 4. TCP/IP 协议栈分层与数据包封装原理 (`tcp-ip-protocol`)
- **专属直达 URL**: `/tcp-ip-protocol` (深链支持如 `/tcp-ip-protocol?step=3`)
- **阶段 1（传输层封装）**: 应用层数据（HTTP 请求）移交传输层，追加 20 字节 **TCP 报头**（端口号、Seq、Ack、控制标志），打包为 **TCP 段 (Segment)**。
- **阶段 2（网络层封装）**: 传输层段向下移交网络层，追加 20 字节 **IP 报头**（源/目的 IP、TTL、协议号 0x06），打包为 **IP 数据报 (Packet)** 实现逻辑寻址。
- **阶段 3（链路层以太网帧）**: 网卡驱动在前端添加 14 字节 **以太网 MAC 帧头**，在尾部追加 4 字节 **FCS (CRC-32)** 帧校验序列，打包为 **以太网帧 (Frame)** 并转化为电光信号在物理链路飞速传输。
- **阶段 4（接收端逐层解封装）**: 镜头切至目的主机网络栈，物理网卡验证 FCS 校验并逐层剥离以太网头、IP 头与 TCP 头，最终将纯净载荷精准交付至监听对应端口的应用程序（Nginx/Node.js）。
  - 🔍 **内置报文拆解器**: 可自由调整明文载荷与端口，实时测算 TCP/IP 报头额外开销占比（Overhead Ratio）与总以太网帧长。

### 5. SHA-256 安全散列算法底层原理 (`sha256-algorithm`)
- **专属直达 URL**: `/sha256-algorithm` (深链支持如 `/sha256-algorithm?step=3`)
- **阶段 1（消息填充与 64 位大端长度追加）**: 演示对任意输入追加单比特 `1` 与若干个 `0` 填充至 $448 \pmod{512}$ 位，随后追加 64 位大端序原始位长，规范构建 512-bit 分组。
- **阶段 2（初始化 8 个 32-bit 哈希向量）**: 镜头推近呈现取自自然界前 8 个素数（2 到 19）平方根小数部分前 32 位构成的哈希状态累加器（`H0 ~ H7`，对应工作变量 `a ~ h`）。
- **阶段 3（消息调度扩展与 64 轮压缩循环）**: 呈现 16 个输入字经由 $\sigma_0$ 与 $\sigma_1$ 扩展为 64 个消息字 $W[0..63]$，并结合轮常数 $K[t]$、条件函数 $Ch$、多数表决函数 $Maj$ 与大写旋转函数 $\Sigma_0, \Sigma_1$ 进行 64 轮状态深度混淆。
- **阶段 4（累加输出与 256 位雪崩实验室）**: 各状态字模加累加并大端序拼接输出为 256 位（64 位十六进制）摘要。
  - 🛡️ **内置实验室**: 16×16 共 256 像素二进制点阵，输入微调 1 个字符即时可视化 256 位二进制雪崩反转全貌。

### 6. TCP 协议三次握手与四次挥手原理 (`tcp-handshake-wave`)
- **专属直达 URL**: `/tcp-handshake-wave` (深链支持如 `/tcp-handshake-wave?step=1`)
- **阶段 1（连接建立：客户端 SYN 与服务端 SYN+ACK）**: 客户端从 `CLOSED` 迁至 `SYN_SENT` 并发出 `SYN` (`seq=x`)，处于 `LISTEN` 的服务端接收后回复 `SYN + ACK` (`seq=y, ack=x+1`) 并转入 `SYN_RCVD`。
- **阶段 2（握手确立：客户端 ACK 与连接双向 ESTABLISHED）**: 客户端应答 `ACK` (`ack=y+1`) 进入 `ESTABLISHED`，服务端收到后也进入 `ESTABLISHED`，全双工通道就绪。
- **阶段 3（连接释放：客户端主动发起 FIN 与半关闭 CLOSE_WAIT）**: 客户端发送 `FIN` (`seq=u`) 进入 `FIN_WAIT_1`，服务端确认并应答 `ACK` (`ack=u+1`) 进入 `CLOSE_WAIT`；客户端收到后进入 `FIN_WAIT_2` 半关闭状态。
- **阶段 4（完全关闭：服务端 FIN 与 2MSL TIME_WAIT 保护期）**: 服务端发送完毕后发出 `FIN + ACK` 并转入 `LAST_ACK`，客户端确认回复 `ACK` 并进入关键的 `TIME_WAIT` 状态，倒计时维持 2MSL 消除网络残留分组后彻底恢复 `CLOSED`。
  - ⏱️ **内置演练器**: 自定义客户端与服务端初始序列号（`seq=x` 与 `seq=y`），自动推导各阶段报文标记与确认号，并提供 2MSL 保护期倒计时动态模拟。

---

## 🛠️ 可扩展架构设计 (Extensible Architecture)

系统采用模块化插拔架构，新增一个技术可视化模块仅需 3 步：

1. **配置元数据**: 在 `src/modules/<new-module>/index.ts` 声明步骤信息、时长与推荐镜头机位姿态。
2. **构建舞台与时间轴**: 创建 `Stage.vue` 与 `timeline.ts`，使用 GSAP 与 `useCamera` 进行运镜编排。
3. **注册入库**: 在 `src/modules/index.ts` 中调用 `registerModule(newModule)` 即可自动在全局路由、导航栏、播控台与多语言体系生效。

---

## 📁 项目目录结构 (Directory Structure)

```text
candy-animation/
├── src/
│   ├── assets/              # 静态资源
│   ├── components/          # 全局通用 UI 组件
│   │   ├── CameraStage.vue       # 虚拟镜头渲染舞台与手势容器
│   │   ├── PlaybackControls.vue  # 全能播控控制台 (播放/进度拖拽/阶段标记/倍速)
│   │   ├── SidebarNav.vue        # 响应式折叠侧边导航栏 (分类树/深链/语言/主题)
│   │   └── SubtitleCard.vue      # 实时同步解说词卡片
│   ├── composables/         # 组合式函数
│   │   ├── useCamera.ts          # 电影摄影机运镜控制器 (GSAP 矩阵驱动)
│   │   ├── useGsapTimeline.ts    # GSAP 主时间轴与步骤状态机控制器
│   │   └── useTheme.ts           # 日/夜/系统三态主题联动管理器
│   ├── locales/             # 国际化语言包
│   │   ├── en-US.ts              # 英文词典 (100% 对齐)
│   │   ├── index.ts              # i18n 实例与存储持久化
│   │   └── zh-CN.ts              # 简体中文词典 (默认)
│   ├── modules/             # 可视化动画业务模块
│   │   ├── https-handshake/      # 模块 1: HTTPS 握手原理 (网络通信)
│   │   ├── md5-algorithm/        # 模块 2: MD5 算法底层实现 (密码学)
│   │   ├── websocket-protocol/   # 模块 3: WebSocket 协议原理 (网络通信)
│   │   ├── tcp-ip-protocol/      # 模块 4: TCP/IP 协议栈分层与数据包封装 (网络通信)
│   │   ├── sha256-algorithm/     # 模块 5: SHA-256 安全散列算法 (密码学)
│   │   ├── tcp-handshake-wave/   # 模块 6: TCP 三次握手与四次挥手 (网络通信)
│   │   └── index.ts              # 动画模块与分类注册中心
│   ├── router/              # Vue Router 路由配置
│   │   └── index.ts              # 首页与各模块独立 URL 直达
│   ├── types/               # TypeScript 类型定义
│   │   └── animation.ts
│   ├── utils/               # 密码学与数学工具库
│   │   ├── md5.ts                # 标准 MD5 纯 TS 算法与雪崩比对计算
│   │   ├── sha256.ts             # 标准 SHA-256 纯 TS 算法与 256 位雪崩计算
│   │   └── websocket.ts          # RFC 6455 掩码与帧编解码计算
│   ├── views/               # 路由视图
│   │   ├── HomeView.vue           # 平台酷炫视觉首页 (动态粒子网格/分类导览)
│   │   └── AnimationStageView.vue # 动画舞台视图与 ?step=N 参数同步
│   ├── App.vue              # 根应用主视图 (侧边栏与主舞台布局)
│   ├── main.ts              # 入口引导文件
│   ├── style.css            # Tailwind + Element Plus 全局样式
│   └── worker.ts            # Cloudflare Workers 入口文件 (SPA Fallback 代理)
├── tests/                   # 单元测试集
│   └── unit/
│       ├── i18n.spec.ts          # 国际化键名对称性与持久化测试
│       ├── md5.spec.ts           # MD5 标准向量与雪崩测试
│       ├── modules.spec.ts       # 模块注册与分类规范测试
│       ├── router.spec.ts        # 首页与独立 URL 深链路由测试
│       ├── sha256.spec.ts        # SHA-256 标准向量与 256 位雪崩网格测试
│       ├── sidebarAndHome.spec.ts # 侧边栏导航分类与首页展示组件测试
│       ├── tcphandshake.spec.ts  # TCP 握手与挥手状态机及 2MSL 测试
│       ├── tcpip.spec.ts         # TCP/IP 分层封装计算与时间轴测试
│       ├── timelineDuration.spec.ts # 时间轴总时长与进度条联动测试
│       ├── useCamera.spec.ts     # 摄影机变换与手势测试
│       ├── useGsapTimeline.spec.ts # 时间轴控制器状态机测试
│       ├── useTheme.spec.ts      # 主题切换与 DOM 变体测试
│       └── websocket.spec.ts     # WebSocket 掩码与时间轴测试
├── LICENSE                  # MIT 开源协议
├── README.md                # 简体中文文档
├── README.en.md             # 英文文档
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc           # Cloudflare Workers 部署配置文件
```

---

## 🚀 启动、测试与 Cloudflare Workers 部署指南

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
启动后在浏览器打开 `http://localhost:5173` 体验，可通过访问：
- `http://localhost:5173/https-handshake`
- `http://localhost:5173/md5-algorithm`
- `http://localhost:5173/websocket-protocol`
- `http://localhost:5173/tcp-ip-protocol`
- `http://localhost:5173/sha256-algorithm`
- `http://localhost:5173/tcp-handshake-wave`

### 4. 运行全量单元测试
```bash
pnpm test:unit
```

### 5. 生产构建打包
```bash
pnpm build
```

### 6. 发布至 Cloudflare Workers
确保已登录 Cloudflare 账号（`pnpm wrangler login`），然后直接执行：
```bash
# 演练打包检查 (Dry-run)
pnpm deploy:dry-run

# 正式发布至 Cloudflare Workers 全球边缘
pnpm deploy
```
发布成功后，Cloudflare 会生成 `https://candy-animation.<your-subdomain>.workers.dev` 访问地址，访问任意动画直达链接均能通过 Workers Static Assets 自动回退渲染！

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
