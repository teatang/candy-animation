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
  },
  theme: {
    light: '浅色明亮',
    dark: '深邃夜间',
    system: '跟随系统',
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
  },
}
