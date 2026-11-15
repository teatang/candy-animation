/**
 * 糖果动画 (Candy Animation) - 各动画专属 Mermaid 架构时序图与流程图知识库
 */

export interface ModuleMermaidData {
  moduleId: string
  titleZh: string
  titleEn: string
  diagramTypeZh: string
  diagramTypeEn: string
  descriptionZh: string
  descriptionEn: string
  code: string
}

export const animationMermaidMap: Record<string, ModuleMermaidData> = {
  'tcp-handshake-wave': {
    moduleId: 'tcp-handshake-wave',
    titleZh: 'TCP 三次握手与四次挥手全生命周期时序图',
    titleEn: 'TCP 3-Way Handshake & 4-Way Wave Sequence Diagram',
    diagramTypeZh: '网络时序图 (Sequence Diagram)',
    diagramTypeEn: 'Sequence Diagram',
    descriptionZh: '严格遵循 RFC 793 规范，完整展现客户端与服务端的连接建立、数据传输以及双向安全断开全流程状态机迁移。',
    descriptionEn: 'Compliant with RFC 793, illustrating state machine transitions across connection setup, data flow, and 2MSL teardown.',
    code: `sequenceDiagram
    autonumber
    participant C as 客户端 (Client)
    participant S as 服务端 (Server)

    Note over C,S: ─── 阶段一：TCP 三次握手建立连接 ───
    Note over C: CLOSED
    Note over S: LISTEN
    C->>S: 1. SYN 报文 [seq=x, SYN=1]
    Note over C: SYN_SENT
    Note over S: 收到 SYN，分配缓存并迁移至 SYN_RCVD
    S->>C: 2. SYN+ACK 报文 [seq=y, ack=x+1, SYN=1, ACK=1]
    Note over C: 收到 SYN+ACK，状态迁移至 ESTABLISHED
    C->>S: 3. ACK 确认报文 [seq=x+1, ack=y+1, ACK=1]
    Note over S: 收到 ACK，双向可靠通道就绪，状态迁移至 ESTABLISHED

    Note over C,S: ─── 数据传输阶段 (全双工滑动窗口流转) ───
    C->>S: 双向字节流可靠有序传输 (带序列号与确认应答)

    Note over C,S: ─── 阶段二：TCP 四次挥手优雅断开 ───
    Note over C: 准备断开，状态迁移至 FIN_WAIT_1
    C->>S: 1. FIN 终止报文 [seq=u, FIN=1, ACK=1]
    Note over S: 收到 FIN，立即进入 CLOSE_WAIT (半关闭状态)
    S->>C: 2. ACK 确认报文 [seq=v, ack=u+1, ACK=1]
    Note over C: 收到 ACK，进入 FIN_WAIT_2 (等待服务端后续数据清空)
    Note over S: 服务端剩余数据发送完毕，准备彻底断开，进入 LAST_ACK
    S->>C: 3. FIN+ACK 终止报文 [seq=w, ack=u+1, FIN=1, ACK=1]
    Note over C: 收到 FIN，回复最后确认并进入 TIME_WAIT
    C->>S: 4. ACK 最终确认 [seq=u+1, ack=w+1, ACK=1]
    Note over S: 收到最终 ACK，彻底迁移至 CLOSED
    Note over C: 启动定时器等待 2MSL (最大报文段寿命)，超时后迁移至 CLOSED`,
  },

  'tcp-ip-protocol': {
    moduleId: 'tcp-ip-protocol',
    titleZh: 'TCP/IP 协议栈四层逐级封装与解封装架构图',
    titleEn: 'TCP/IP 4-Layer Protocol Stack Encapsulation Flowchart',
    diagramTypeZh: '分层流程图 (Flowchart)',
    diagramTypeEn: 'Flowchart',
    descriptionZh: '自顶向下解析业务数据从应用层向下追加传输层端口、网络层 IP 路由寻址、链路层 MAC 硬件帧头与 FCS 校验码的封装链路。',
    descriptionEn: 'Top-down breakdown of payload encapsulation through Transport, Network, and Link layers down to physical bits.',
    code: `flowchart TD
    subgraph L4 [1. 应用层 Application Layer]
        A["业务有效载荷 (HTTP / WebSocket 消息数据)"]
    end

    subgraph L3 [2. 传输层 Transport Layer]
        T_HDR["TCP 报头 (20 字节)<br/>源端口 / 目的端口 / 序列号(Seq) / 确认号(Ack) / 控制标志位(SYN/ACK/PSH)"]
        T_SEG["TCP 段 (Segment) = [TCP报头] + [应用数据]"]
    end

    subgraph L2 [3. 网络层 Network Layer]
        IP_HDR["IP 报头 (20 字节)<br/>源 IP 地址 / 目的 IP 地址 / 协议号 0x06(TCP) / TTL 生存时间 / 校验和"]
        IP_PKT["IP 数据报 (Packet) = [IP报头] + [TCP段]"]
    end

    subgraph L1 [4. 数据链路层 Link Layer]
        MAC_HDR["以太网 MAC 帧头 (14 字节)<br/>源 MAC 地址 / 目的网关 MAC / 协议类型 0x0800(IPv4)"]
        MAC_FCS["FCS 帧校验序列 (4 字节 CRC-32)"]
        ETH_FRAME["完整以太网帧 (Frame) = [MAC帧头] + [IP数据报] + [FCS校验]"]
    end

    subgraph L0 [5. 物理层 Physical Layer]
        PHY["网卡(NIC)数模转化: 光电脉冲信号在网线/光纤介质上传输"]
    end

    A -->|"传输层添加端口控制"| T_HDR
    T_HDR -.-> T_SEG
    T_SEG -->|"网络层添加端到端IP路由"| IP_HDR
    IP_HDR -.-> IP_PKT
    IP_PKT -->|"链路层添加局域网硬件寻址"| MAC_HDR
    MAC_HDR -.-> ETH_FRAME
    MAC_FCS -.-> ETH_FRAME
    ETH_FRAME -->|"网卡串行化驱动输出"| PHY`,
  },

  'websocket-protocol': {
    moduleId: 'websocket-protocol',
    titleZh: 'WebSocket 全双工升级握手与数据帧传输时序图',
    titleEn: 'WebSocket RFC 6455 Upgrade & Framing Sequence Diagram',
    diagramTypeZh: '全双工时序图 (Sequence Diagram)',
    diagramTypeEn: 'Sequence Diagram',
    descriptionZh: '展现基于 HTTP/1.1 Upgrade 协议平滑升级、客户端强制 32-bit 掩码异或加密、双向心跳保活与优雅关闭全流程。',
    descriptionEn: 'Covers HTTP Upgrade handshake, RFC 6455 client-side 32-bit masking, ping/pong keep-alive, and graceful teardown.',
    code: `sequenceDiagram
    autonumber
    participant C as 客户端 (Browser Client)
    participant S as 服务端 (WebSocket Server)

    Note over C,S: ─── 阶段一：HTTP 握手协议平滑升级 ───
    C->>S: GET /chat HTTP/1.1<br/>Upgrade: websocket<br/>Connection: Upgrade<br/>Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==<br/>Sec-WebSocket-Version: 13
    Note over S: 服务端结合 GUID: 258EAFA5-E914-47DA-95CA-C5AB0DC85B11<br/>计算 SHA-1 摘要并生成 Base64 凭证
    S->>C: HTTP/1.1 101 Switching Protocols<br/>Upgrade: websocket<br/>Connection: Upgrade<br/>Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
    Note over C,S: 握手成功！HTTP 通道正式转换为持久 WebSocket 全双工管道

    Note over C,S: ─── 阶段二：RFC 6455 协议数据帧全双工流转 ───
    Note over C: 客户端发帧强制加掩码 (防中间代理缓存污染)
    C->>S: 客户端数据帧: FIN=1 | Opcode=0x1(Text) | MASK=1 | Masking-Key(32bit) | Payload(XOR加密)
    Note over S: 服务端接收后根据 32bit 掩码执行异或还原出明文数据
    Note over S: 服务端向客户端回传数据帧：无需掩码 (MASK=0)
    S->>C: 服务端响应帧: FIN=1 | Opcode=0x1(Text) | MASK=0 | Payload(明文数据)

    Note over C,S: ─── 阶段三：长连接心跳保活机制 ───
    C->>S: Ping 探活控制帧 (Opcode 0x9)
    S->>C: Pong 响应应答帧 (Opcode 0xA)

    Note over C,S: ─── 阶段四：连接双向安全关闭 ───
    C->>S: Close 控制帧 (Opcode 0x8, 状态码 1000 正常关闭)
    S->>C: Close 确认帧 (Opcode 0x8)
    Note over C,S: 底层 TCP 连接安全释放`,
  },

  'https-handshake': {
    moduleId: 'https-handshake',
    titleZh: 'HTTPS (TLS 1.2/1.3) 安全握手与对称密钥协商时序图',
    titleEn: 'HTTPS TLS Handshake & Key Exchange Sequence Diagram',
    diagramTypeZh: '加密安全时序图 (Sequence Diagram)',
    diagramTypeEn: 'Sequence Diagram',
    descriptionZh: '系统化呈现客户端与服务器从 TCP 建立、ClientHello/ServerHello 协商、X.509 证书防篡改验证到对称会话密钥传输的全过程。',
    descriptionEn: 'Detailed sequence covering ClientHello/ServerHello, X.509 CA validation, Pre-Master Secret exchange, and symmetric session key derivation.',
    code: `sequenceDiagram
    autonumber
    participant C as 客户端 (Browser)
    participant S as 服务器 (Web Server)
    participant CA as 证书权威机构 (CA / Trust Store)

    Note over C,S: 0. TCP 三次握手成功建立基础传输通道 (Port 443)

    Note over C,S: ─── 阶段一：TLS 协商与密码套件交换 ───
    C->>S: 1. ClientHello (TLS版本, 密码套件列表CipherSuites, Client_Random)
    S->>C: 2. ServerHello (选定TLS版本, 选定密码套件, Server_Random)
    S->>C: 3. Certificate (包含服务器公钥与 CA 签名的 X.509 数字证书链)
    S->>C: 4. ServerKeyExchange (ECDHE 椭圆曲线公钥参数)
    S->>C: 5. ServerHelloDone (服务端初始握手协商阶段完毕)

    Note over C,CA: ─── 阶段二：证书防伪校验与预主密钥交换 ───
    C->>CA: 6. 验证证书真伪：使用受信任根证书公钥，验算数字签名与域名有效性
    Note over C: 证书校验通过！客户端在本地生成高熵随机数：预主密钥 Pre-Master Secret
    C->>S: 7. ClientKeyExchange (使用证书中的服务器公钥加密预主密钥后传输)
    C->>S: 8. ChangeCipherSpec (通知服务端后续全部报文将切换为加密通信)
    C->>S: 9. EncryptedHandshakeMessage / Finished (验证握手未被中间人篡改)

    Note over S: 服务端使用私钥解密获得 Pre-Master Secret
    Note over C,S: ─── 阶段三：主密钥派生与全量对称加密流转 ───
    Note over C,S: 双方本地使用伪随机函数 PRF 派生完全一致的对称会话密钥 (Session Key)
    S->>C: 10. ChangeCipherSpec + Finished (握手彻底就绪)
    C->>S: 11. 双向 HTTP 业务数据全量采用【对称会话密钥】高吞吐安全传输！
    S-->>C: 12. 加密 HTTP 响应报文实时回传`,
  },

  'sha256-algorithm': {
    moduleId: 'sha256-algorithm',
    titleZh: 'SHA-256 密码学安全散列算法运算流程图',
    titleEn: 'SHA-256 Cryptographic Hash Algorithm Flowchart',
    diagramTypeZh: '密码学流程图 (Flowchart)',
    diagramTypeEn: 'Flowchart',
    descriptionZh: '精确还原 FIPS 180-4 规范：512-bit 分组填充对齐、16 字扩展至 64 字消息调度、64 轮压缩循环 (Ch, Maj, Σ, σ) 与 256 位状态累加。',
    descriptionEn: 'FIPS 180-4 compliant flowchart depicting 512-bit padding, 64-word message schedule, compression rounds, and 256-bit digest output.',
    code: `flowchart TD
    Msg["原始输入明文 (任意长度位串 M)"] --> Pad["1. 填充对齐: 末尾追加 1 个二进制 '1' (0x80) 与若干 '0'<br/>满足 Length ≡ 448 (mod 512)"]
    Pad --> Len["2. 长度追加: 在最后 64 位写入原始数据大端序位长"]
    Len --> Blocks["3. 划分标准 512 位计算分组: M[0] ... M[N-1]"]

    subgraph COMPRESS_ENGINE ["4. 核心 64 轮压缩处理引擎 (针对每个 512 位块)"]
        direction TB
        InitVars["载入初始哈希寄存器 (前8个素数平方根小数前32位):<br/>H0..H7 赋值给工作变量 a, b, c, d, e, f, g, h"]
        
        subgraph SCHED ["消息字扩展调度"]
            direction TB
            W16["读取分组前 16 个 32-bit 字 W[0..15]"]
            W64["扩展为 64 个消息字 W[16..63]:<br/>W[t] = σ1(W[t-2]) + W[t-7] + σ0(W[t-15]) + W[t-16]"]
            W16 --> W64
        end

        subgraph ROUNDS ["64 轮深度非线性混淆迭代 (t = 0 到 63)"]
            direction TB
            T1["临时变量 T1 = h + Σ1(e) + Ch(e, f, g) + K[t] + W[t]"]
            T2["临时变量 T2 = Σ0(a) + Maj(a, b, c)"]
            Update["寄存器级联更新:<br/>h=g; g=f; f=e; e=d+T1; d=c; c=b; b=a; a=T1+T2"]
            T1 --> T2 --> Update
        end

        InitVars --> W16
        W64 --> T1
    end

    Blocks --> InitVars
    Update --> Accum["5. 向量模加累加状态更新:<br/>H0 = H0 + a; H1 = H1 + b; ... H7 = H7 + h (mod 2^32)"]
    Accum --> Out["6. 最终输出: 拼接 H0 ~ H7 为 256 位安全散列摘要 (64 个十六进制字符)"]`,
  },

  'md5-algorithm': {
    moduleId: 'md5-algorithm',
    titleZh: 'MD5 消息摘要算法运算架构流程图',
    titleEn: 'MD5 Message-Digest Algorithm Architecture Flowchart',
    diagramTypeZh: '算法架构图 (Flowchart)',
    diagramTypeEn: 'Flowchart',
    descriptionZh: '解析 RFC 1321 规范：512 位分组小端序填充、ABCD 初始幻数、4 轮 64 步非线性布尔函数混淆与雪崩效应扩散。',
    descriptionEn: 'RFC 1321 architecture flowchart illustrating little-endian padding, ABCD initial constants, and 4-round 64-step non-linear compression.',
    code: `flowchart TD
    Input["原始输入字符串 (任意位长)"] --> Step1["1. 填充对齐: 追加 1 个 '1' 与若干 '0'<br/>使数据位长满足 Length ≡ 448 (mod 512)"]
    Step1 --> Step2["2. 追加长度: 末尾追加 64 位小端序原始长度数值"]
    Step2 --> Group["3. 切割为 512 位标准计算块 (每块分解为 16 个 32位字 M[0..15])"]

    subgraph CORE_ENGINE ["4. 四轮 64 步高密度非线性压缩引擎"]
        direction TB
        InitRegs["初始化 4 个 32-bit 幻数寄存器:<br/>A = 0x67452301, B = 0xEFCDAB89<br/>C = 0x98BADCFE, D = 0x10325476<br/>复制备份至工作变量 a, b, c, d"]

        subgraph ROUNDS ["四轮 64 步非线性布尔变换"]
            direction TB
            R1["第一轮 (第 1-16 步): F(X, Y, Z) = (X & Y) | (~X & Z)"]
            R2["第二轮 (第 17-32 步): G(X, Y, Z) = (X & Z) | (Y & ~Z)"]
            R3["第三轮 (第 33-48 步): H(X, Y, Z) = X ^ Y ^ Z"]
            R4["第四轮 (第 49-64 步): I(X, Y, Z) = Y ^ (X | ~Z)"]
            Calc["每步通用迭代公式:<br/>a = b + ((a + Func(b,c,d) + M[k] + T[i]) <<< s)"]
            
            R1 --> R2 --> R3 --> R4 --> Calc
        end

        InitRegs --> R1
    end

    Group --> InitRegs
    Calc --> Add["5. 累加运算: A += a; B += b; C += c; D += d (mod 2^32)"]
    Add --> Out["6. 最终输出: 按小端序级联 A, B, C, D 形成 128 位哈希摘要 (32 位十六进制字符串)"]`,
  },
}

/**
 * 根据模块 ID 获取对应的 Mermaid 原理图数据
 */
export function getMermaidDiagram(moduleId: string): ModuleMermaidData | undefined {
  return animationMermaidMap[moduleId]
}
