export default {
  app: {
    title: '糖果动画',
    subTitle: 'Candy Animation',
    slogan: '具备电影镜头感的技术底层原理可视化平台',
    github: 'GitHub 仓库',
  },
  nav: {
    selectModule: '选择可视化技术模块',
    theme: '主题切换',
    language: '语言切换',
    modulesList: '动画索引',
    copyDirectUrl: '复制直达链接',
    copySuccess: '动画直达链接已复制到剪贴板！',
    copyFailed: '复制失败，请手动复制浏览器地址栏',
    searchPlaceholder: '搜索动画、算法或步骤 (Ctrl+K)',
    searchButton: '搜索动画',
  },
  search: {
    title: '全局动画搜索',
    placeholder: '输入关键词搜索动画、算法或步骤阶段 (按 ESC 关闭)...',
    shortcut: 'Ctrl+K',
    shortcutMac: '⌘K',
    noResults: '未找到匹配的动画或步骤',
    noResultsHint: '可尝试搜索 "TCP", "HTTPS", "SHA", "握手", "哈希", "加密", "WebSocket" 等',
    typeModule: '动画模块',
    typeStep: '阶段步骤',
    typeCategory: '分类目录',
    navigateHint: '导航选择',
    selectHint: '确认跳转',
    closeHint: '关闭弹窗',
    resultsCount: '找到 {count} 个相关结果',
    clear: '清空搜索',
  },
  categoryPage: {
    breadcrumbHome: '首页',
    breadcrumbCategories: '动画分类',
    allCategories: '全部技术分类',
    backHome: '返回平台首页',
    modulesCount: '{count} 个技术动画模块',
    stepsCount: '{count} 个关键解构阶段',
    totalDuration: '总演算耗时约 {sec} 秒',
    explorePrompt: '点击卡片直接进入全屏交互动画，或点击下方阶段深链定位特定环节：',
    switchCategory: '切换至其他分类：',
    noModules: '该分类下暂无已注册动画模块',
  },
  theme: {
    light: '浅色明亮',
    dark: '深邃夜间',
    system: '跟随系统',
  },
  sidebar: {
    home: '首页概览',
    categories: '技术动画分类',
    collapse: '收起侧边栏',
    expand: '展开侧边栏',
    directUrl: '复制直达链接',
    viewSource: 'GitHub 仓库',
  },
  categories: {
    network: {
      title: '网络通信与传输协议',
      description: '涵盖 TCP 三次握手与四次挥手、TCP/IP 分层封装、WebSocket 全双工与 HTTPS 加密协商等现代计算机网络核心通信机制。',
    },
    crypto: {
      title: '现代密码学与散列算法',
      description: '深入散列摘要微观世界，解析 SHA-256 与 MD5 算法中的填充对齐、消息调度、多轮非线性函数深度混淆与雪崩效应。',
    },
  },
  home: {
    heroBadge: '✨ 探索技术底层的电影级视觉解构',
    heroTitle: '糖果动画',
    heroSubtitle: 'Candy Animation',
    heroDesc: '基于电影级摄影机运镜编排、音画同步技术解说与微交互实验，打破抽象枯燥的代码文档，直观呈现网络协议栈与密码学算法的底层运转黑盒。',
    startExplore: '🚀 立即启程探索',
    browseCategories: '🌐 浏览技术分类',
    stats: {
      modules: '个硬核技术模块',
      steps: '个关键运镜阶段',
      tests: '项自动化单元测试',
      openSource: 'MIT 协议开源保障',
    },
    features: {
      cameraTitle: '电影级虚拟摄影机',
      cameraDesc: '平滑的推拉摇移与焦点锁定，从宏观双机通信自如推进至微观位运算特写。',
      timelineTitle: '音画同步全能播控',
      timelineDesc: '状态机时间轴联动动态字幕，支持任意步进拖拽、阶段标记点与多倍速播放。',
      labTitle: '深度交互式演练器',
      labDesc: '内置 256 位雪崩点阵、中间人篡改警报、WebSocket 掩码器与 2MSL 倒计时。',
    },
    categorySectionTitle: '技术动画分类总览',
    categorySectionSubtitle: '按技术领域深度分类，每个动画模块均支持独立 URL 直达与阶段深链定位。',
    launchModule: '进入动画',
    stepDeepLink: '步骤 {step}',
    totalDuration: '{sec} 秒完整演算',
    stepsCount: '{count} 个关键阶段',
  },
  playback: {
    play: '播放',
    pause: '暂停',
    prevStep: '上一步',
    nextStep: '下一步',
    reset: '重置',
    speed: '倍速',
    progress: '时间进度',
    currentStep: '当前阶段',
    totalSteps: '总阶段数',
    cameraReset: '重置镜头视角',
    cameraHint: '可拖拽舞台移动视角，滚轮或双指缩放画布',
    interactiveMode: '交互实验室',
    stepMarker: '第 {step} 步',
    status: {
      idle: '未开始',
      playing: '正在播放',
      paused: '已暂停',
      completed: '播放完成',
    },
  },
  modules: {
    https: {
      title: 'HTTPS 握手与加密传输原理',
      summary: '揭秘客户端与服务器从 TCP 握手、TLS 协商、CA 证书防篡改验证到对称会话密钥传输的全过程。',
      category: '计算机网络与安全',
      steps: {
        step1: {
          title: 'TCP 三次握手建立基础通信通道',
          badge: 'TCP 握手',
          description:
            '在进行 TLS 加密握手前，客户端与服务器必须先建立可靠的传输层连接。客户端向服务器发送 <code>SYN</code> 报文（同步序列号），服务器回复 <code>SYN + ACK</code> 确认报文，最后客户端发送 <code>ACK</code> 确认。至此，三次握手完成，双向可靠的 TCP 通道正式建立。',
        },
        step2: {
          title: 'TLS ClientHello 与 ServerHello 协商',
          badge: 'TLS 协商',
          description:
            '客户端向服务端发起 <code>ClientHello</code>，携带支持的 TLS 版本、加密套件列表及客户端随机数 <code>Client_Random</code>。服务端回应 <code>ServerHello</code>，选定加密套件，回传 <code>Server_Random</code>，并发送包含服务器公钥的数字证书（X.509 Certificate）。',
        },
        step3: {
          title: 'CA 证书合法性链式校验与防篡改',
          badge: '证书校验',
          description:
            '镜头推入客户端内部密码学引擎：客户端使用内置受信任的根 CA 公钥，解密证书签名并比对哈希值，严格核验域名、有效期与证书颁发机构链。若中间人试图拦截替换公钥，数字签名将无法匹配，触发系统安全红牌警报！',
        },
        step4: {
          title: '密钥派生与对称加密安全传输',
          badge: '对称加密',
          description:
            '客户端在本地生成预主密钥 <code>Pre-Master Secret</code>，用服务器公钥加密后发送给服务端。双方结合两个随机数派生出完全一致的对称会话密钥（Session Key）。镜头拉远，后续 HTTP 请求与响应报文均通过该会话密钥全量对称加密，在公网高效安全流转。',
        },
      },
      interactive: {
        tamperTitle: '中间人攻击 (MITM) 模拟',
        tamperToggle: '注入中间人篡改攻击',
        normalStatus: '安全状态：证书由权威根 CA 签发且签名合法',
        tamperedStatus: '警报！检测到非法伪造证书，签名校验失败！',
        clientRandom: '客户端随机数',
        serverRandom: '服务器随机数',
        preMaster: '预主密钥 (Pre-Master)',
        sessionKey: '对称会话密钥 (Session Key)',
        certValid: '证书状态: 校验通过 (Valid)',
        certInvalid: '证书状态: 校验失败 (Untrusted)',
      },
    },
    md5: {
      title: 'MD5 摘要算法底层运算全流程',
      summary: '直观剖析 MD5 的二进制填充、幻数缓冲区初始化、64步主循环非线性变换与雪崩效应。',
      category: '密码学与哈希算法',
      steps: {
        step1: {
          title: '消息填充（Padding）与长度追加',
          badge: '消息填充',
          description:
            '对于任意长度的原始输入字符串，首先在二进制末尾填充一个 <code>1</code>，接着填充若干个 <code>0</code>，使得数据位长恰好满足 <code>Length ≡ 448 (mod 512)</code>。最后，在末尾追加 64 位的原始数据长度（小端序存储），刚好拼接为一个或多个完整的 512 位分组。',
        },
        step2: {
          title: '初始化 4 个 32-bit 幻数缓冲区',
          badge: '幻数寄存器',
          description:
            'MD5 算法预置了 4 个经典的 32 位初始幻数寄存器：<code>A = 0x67452301</code>、<code>B = 0xEFCDAB89</code>、<code>C = 0x98BADCFE</code>、<code>D = 0x10325476</code>。它们构成了哈希运算的核心累加状态向量。',
        },
        step3: {
          title: '512 位分组与 4 轮 (共 64 步) 主循环运算',
          badge: '主循环运算',
          description:
            '每个 512 位分组被划分为 16 个 32 位的子块 <code>M[0..15]</code>。算法经历 4 轮各 16 步（共 64 步）的密集计算。每轮采用不同的非线性布尔函数：<code>F(B,C,D)</code>、<code>G(B,C,D)</code>、<code>H(B,C,D)</code>、<code>I(B,C,D)</code>，配合三角正弦常量表 <code>T[i]</code>、模 2^32 加法以及循环左移 <code><<< s</code>，产生剧烈的雪崩扩散。',
        },
        step4: {
          title: '级联拼接输出 128 位十六进制摘要',
          badge: '摘要输出',
          description:
            '经过所有分组的循环累加后，将最终寄存器 A, B, C, D 分别按小端序转换为十六进制字符拼接，生成长度为 128 位（32 个十六进制字符）的标准 MD5 摘要值。下方实验室可实时输入文本，体验“仅修改 1 位引发整个摘要雪崩”的震撼效果。',
        },
      },
      interactive: {
        labTitle: '雪崩效应 (Avalanche Effect) 实时对比实验室',
        inputA: '原始明文 A',
        inputB: '微变明文 B (微调 1 个字符)',
        hashA: 'MD5 摘要 A',
        hashB: 'MD5 摘要 B',
        diffBits: '二进制不同位数量',
        diffRatio: '雪崩扩散率',
        flipHint: '观察仅 1 个字符的差异如何使约 50% 的二进制位彻底颠覆！',
        runRoundSim: '单步演算 64 步状态寄存器流转',
      },
    },
    websocket: {
      title: 'WebSocket 全双工通信协议原理',
      summary: '深入拆解从 HTTP 协议升级协商 (101 Switching Protocols)、数据帧二进制结构与客户端掩码混淆，到双向全双工与心跳保活全流程。',
      category: '网络通信与实时协议',
      steps: {
        step1: {
          title: 'HTTP 升级协商与 Sec-WebSocket 握手',
          badge: '升级握手',
          description:
            '客户端通过常规 HTTP/1.1 发起连接，携带头部 <code>Upgrade: websocket</code>、<code>Connection: Upgrade</code> 以及随机生成的 <code>Sec-WebSocket-Key</code>。服务端结合固定的 GUID 字符串计算 SHA-1 摘要并回传 <code>101 Switching Protocols</code> 与 <code>Sec-WebSocket-Accept</code>，正式将单向 HTTP 通信平滑切换为双向全双工的 WebSocket 管道。',
        },
        step2: {
          title: '数据帧结构解析与客户端掩码机制',
          badge: '数据帧掩码',
          description:
            '镜头推入数据帧微观二进制层：帧头包含 <code>FIN</code>（1 bit 分片标识）、<code>Opcode</code>（4 bit 操作码，如 0x1 文本、0x2 二进制）、<code>MASK</code> 标志与负载长度。为防止中间代理缓存污染攻击（Proxy Cache Poisoning），RFC 6455 强制规定**所有客户端发往服务端的帧必须使用 32-bit 随机掩码通过 XOR 异或加密负载**，而服务端响应帧则不加掩码。',
        },
        step3: {
          title: '双向全双工并发流与心跳保活 (Ping/Pong)',
          badge: '全双工保活',
          description:
            '镜头拉至宏观通信高速公路：客户端与服务端各自拥有独立的发送与接收信道，无需等待“请求-响应”循环即可同时自由互发消息，延迟大幅降至毫秒级。同时，内置的 <code>Ping (0x9)</code> / <code>Pong (0xA)</code> 控制帧定期探测连接可用性，保持防火墙穿透并及时发现网络断链。',
        },
        step4: {
          title: '连接优雅关闭握手 (Close Handshake)',
          badge: '优雅关闭',
          description:
            '任一方希望断开连接时，均会向对端发送一个操作码为 <code>0x8</code> 的关闭控制帧，携带预定义的状态码（如 <code>1000 Normal Closure</code>）与原因短语。对端收到后回复相同的关闭帧，随后安全释放底层的 TCP 套接字资源，完成双向优雅退出。',
        },
      },
      interactive: {
        labTitle: 'WebSocket 数据帧编解码与掩码实验室',
        inputMsg: '明文消息内容',
        maskKey: '32-Bit 随机掩码 (Hex)',
        maskedBytes: '掩码后载荷 (XOR Encoded)',
        unmaskedBytes: '服务端还原载荷',
        sendFrame: '发送客户端数据帧',
        triggerPing: '发送心跳探测 (Ping)',
        statusConnected: '状态: WebSocket 连接就绪 (OPEN)',
        statusClosed: '状态: 连接已关闭 (CLOSED)',
        pingPongSuccess: '心跳正常: Ping 发送 -> 收到 Pong 响应 (RTT < 2ms)',
      },
    },
    tcpip: {
      title: 'TCP/IP 协议栈分层与数据包封装原理',
      summary: '直观展现网络数据在应用层、传输层 (TCP)、网络层 (IP) 到数据链路层 (Ethernet) 的“俄罗斯套娃”式逐层封装与接收端解封装全过程。',
      category: '网络体系结构与底层协议栈',
      steps: {
        step1: {
          title: '应用层数据生成与传输层 (TCP) 段封装',
          badge: '传输层封装',
          description:
            '应用层（如浏览器 HTTP/HTTPS）产生用户数据载荷 <code>Payload</code>。进入传输层后，操作系统为其追加 20 字节的 <strong>TCP 报头</strong>，写入源端口、目的端口、序列号（Seq）、确认号（Ack）以及控制标记（SYN, ACK, PSH 等），形成 <strong>TCP 段 (Segment)</strong>，赋予数据可靠重传与流量控制能力。',
        },
        step2: {
          title: '网络层 (IP) 数据报封装与逻辑寻址',
          badge: '网络层封装',
          description:
            '镜头跟进数据向下移交至网络层：协议栈为 TCP 段追加 20 字节的 <strong>IP 报头</strong>，填入源 IP 地址（本地设备）、目的 IP 地址（服务器）、协议号 <code>0x06 (TCP)</code>、TTL 生存时间以及报头校验和，将其封装为 <strong>IP 数据报 (Packet / Datagram)</strong>，确定全球互联网的端到端路由路径。',
        },
        step3: {
          title: '数据链路层 (Ethernet) 帧封装与物理链路传输',
          badge: '以太网帧传输',
          description:
            '数据到达网卡（NIC）驱动：在头部添加 14 字节的 <strong>以太网 MAC 帧头</strong>（源 MAC、目的 MAC 网关、协议类型 <code>0x0800 IPv4</code>），在尾部追加 4 字节的 <strong>FCS (CRC-32 帧校验序列)</strong>，形成完整 <strong>以太网帧 (Frame)</strong>。镜头拉远，网卡将数据转化为电光脉冲信号，在物理介质上高速奔向下一跳路由器。',
        },
        step4: {
          title: '目的主机逐层解封装与上层交付',
          badge: '解封装交付',
          description:
            '镜头推进至服务端网络栈：网卡接收物理比特流，验证 FCS 校验无误后剥除以太网帧头；网络层检查目的 IP 并剥离 IP 报头；传输层校验端口与序列号并剥去 TCP 报头；最终将纯净的应用层数据准确交付给监听目标端口的 Web 服务进程（Nginx/Node.js），完成经典的分层通信闭环！',
        },
      },
      interactive: {
        inspectorTitle: 'TCP/IP 协议栈分层报文深度拆解器',
        layerApp: '应用层 (HTTP / Data)',
        layerTcp: '传输层 (TCP Segment)',
        layerIp: '网络层 (IP Packet)',
        layerEth: '数据链路层 (Ethernet Frame)',
        srcPort: '源端口',
        dstPort: '目的端口',
        srcIp: '源 IP 地址',
        dstIp: '目的 IP 地址',
        totalSize: '帧总长度',
        overheadRatio: '协议报头开销占比',
      },
    },
    sha256: {
      title: 'SHA-256 安全散列算法底层原理',
      summary: '直观剖析 512 位分组填充、64 字消息扩展调度 W[t]、8 个初始哈希向量与 64 轮非线性压缩循环。',
      category: '密码学与哈希算法',
      steps: {
        step1: {
          title: '消息位填充与 64-bit 大端长度追加',
          badge: '位填充',
          description:
            '对于任意长度的输入明文，首先在尾部填充一个二进制位 <code>1</code>（0x80），随后填充若干个 <code>0</code>，使位长满足 <code>Length ≡ 448 (mod 512)</code>。最后在末尾追加 64 位的大端序原始长度数值，构建为 512 位的标准计算分组。',
        },
        step2: {
          title: '初始化 8 个 32-bit 哈希状态寄存器',
          badge: '初始哈希向量',
          description:
            '算法采用前 8 个素数（2 到 19）平方根的小数部分前 32 位作为初始哈希状态 <code>H0 ~ H7</code>（对标工作变量 <code>a, b, c, d, e, f, g, h</code>），构建紧凑的密码学状态累加器。',
        },
        step3: {
          title: '消息调度扩展 (W0..W63) 与 64 轮压缩循环',
          badge: '压缩循环',
          description:
            '将当前 512 位分组的 16 个字通过非线性函数 <code>γ0</code> 与 <code>γ1</code> 扩展为 64 个消息字 <code>W[0..63]</code>。每轮迭代结合常数 <code>K[t]</code>、条件函数 <code>Ch</code>、多数函数 <code>Maj</code> 以及旋转函数 <code>Σ0</code> 与 <code>Σ1</code> 进行状态深度混淆。',
        },
        step4: {
          title: '累加输出 256 位摘要与雪崩实验室',
          badge: '散列输出',
          description:
            '将各轮运算后的变量与初始哈希向量模加累加：<code>H_i = H_i + var_i</code>，按大端序拼接输出为 256 位（64 个十六进制字符）的安全散列摘要。下方实验室可实时比对修改 1 个字符引发的 256 位雪崩震荡。',
        },
      },
      interactive: {
        labTitle: 'SHA-256 256位雪崩效应实时对比实验室',
        inputA: '原始明文 A',
        inputB: '微变明文 B (微调 1 个字符)',
        hashA: 'SHA-256 摘要 A',
        hashB: 'SHA-256 摘要 B',
        diffBits: '二进制不同位数量',
        diffRatio: '雪崩扩散率',
        flipHint: '观察仅 1 个字符差异如何引发 256 个二进制位中约 50% 的剧烈反转！',
      },
    },
    tcphandshake: {
      title: 'TCP 协议三次握手与四次挥手原理',
      summary: '全景呈现 TCP 传输层连接建立（三次握手）与连接断开（四次挥手）的完整有限状态机迁移与序列号同步。',
      category: '传输层与网络协议',
      steps: {
        step1: {
          title: '连接建立：客户端 SYN 与服务端 SYN+ACK',
          badge: '握手前两步',
          description:
            '客户端由 <code>CLOSED</code> 切换至 <code>SYN_SENT</code>，向服务端发出带有同步序列号 <code>seq=x</code> 的 <code>SYN</code> 报文。处于 <code>LISTEN</code> 状态的服务端收到后回复 <code>SYN + ACK</code>（<code>seq=y, ack=x+1</code>），状态进入 <code>SYN_RCVD</code>。',
        },
        step2: {
          title: '握手确立：客户端 ACK 与连接双向 ESTABLISHED',
          badge: '连接就绪',
          description:
            '客户端收到后回发 <code>ACK</code> 确认报文（<code>ack=y+1</code>），客户端进入 <code>ESTABLISHED</code>。服务端收到该确认后也进入 <code>ESTABLISHED</code>。至此，三次握手全部完成，双向全双工字节流通道正式贯通。',
        },
        step3: {
          title: '连接释放：客户端主动发起 FIN 与半关闭 (CLOSE_WAIT)',
          badge: '挥手前两步',
          description:
            '数据传输完毕后，客户端主动发送 <code>FIN</code> 报文（<code>seq=u</code>），状态转为 <code>FIN_WAIT_1</code>。服务端收到后立即回复 <code>ACK</code>（<code>ack=u+1</code>）并转入 <code>CLOSE_WAIT</code>；客户端收到后进入 <code>FIN_WAIT_2</code>。此时进入“半关闭”状态，服务端仍可单向发送剩余数据。',
        },
        step4: {
          title: '完全关闭：服务端 FIN 与 2MSL TIME_WAIT 保护期',
          badge: '完全断开',
          description:
            '服务端数据发送完毕后，发出 <code>FIN + ACK</code> 报文并转入 <code>LAST_ACK</code>。客户端确认并回复 <code>ACK</code> 后进入关键的 <code>TIME_WAIT</code> 状态，倒计时等待 <code>2MSL</code>（最大报文段生存时间）以防止最后确认报文丢失重发，并消除网络中残留的延迟报文。计时结束后彻底回到 <code>CLOSED</code>。',
        },
      },
      interactive: {
        labTitle: 'TCP 状态机与报文序号交互演练器',
        clientState: '客户端状态',
        serverState: '服务端状态',
        seqX: '客户端初始序列号 (seq=x)',
        seqY: '服务端初始序列号 (seq=y)',
        mslTimer: '2MSL 倒计时计时器',
        mslHint: 'TIME_WAIT 保持 2MSL 确保网络中迷途的重复分组全部消逝',
      },
    },
  },
}
