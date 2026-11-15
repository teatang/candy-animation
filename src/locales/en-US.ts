export default {
  app: {
    title: 'Candy Animation',
    subTitle: 'Candy Animation',
    slogan: 'Cinematic Technical Principles Visualization Platform',
    github: 'GitHub Repository',
  },
  nav: {
    selectModule: 'Select Visualization Module',
    theme: 'Toggle Theme',
    language: 'Switch Language',
    modulesList: 'Module Directory',
    copyDirectUrl: 'Copy Direct Link',
    copySuccess: 'Direct animation link copied to clipboard!',
    copyFailed: 'Failed to copy, please copy from address bar',
    searchPlaceholder: 'Search animations, steps (Ctrl+K)',
    searchButton: 'Search Animations',
  },
  search: {
    title: 'Global Animation Search',
    placeholder: 'Type keywords to search animations or steps (Press ESC to close)...',
    shortcut: 'Ctrl+K',
    shortcutMac: '⌘K',
    noResults: 'No matching animations or steps found',
    noResultsHint: 'Try searching "TCP", "HTTPS", "SHA", "handshake", "hash", "crypto", "WebSocket", etc.',
    typeModule: 'Module',
    typeStep: 'Step',
    typeCategory: 'Category',
    navigateHint: 'Navigate',
    selectHint: 'Select',
    closeHint: 'Close',
    resultsCount: 'Found {count} results',
    clear: 'Clear search',
  },
  categoryPage: {
    breadcrumbHome: 'Home',
    breadcrumbCategories: 'Categories',
    allCategories: 'All Categories',
    backHome: 'Back to Home',
    modulesCount: '{count} Animation Modules',
    stepsCount: '{count} Key Stages',
    totalDuration: '~{sec}s Total Duration',
    explorePrompt: 'Click any card to start full animation, or jump directly via step tags below:',
    switchCategory: 'Switch Category:',
    noModules: 'No animation modules found in this category',
  },
  theme: {
    light: 'Light Theme',
    dark: 'Dark Theme',
    system: 'Follow System',
  },
  sidebar: {
    home: 'Home Overview',
    categories: 'Animation Categories',
    collapse: 'Collapse Sidebar',
    expand: 'Expand Sidebar',
    directUrl: 'Copy Direct URL',
    viewSource: 'GitHub Source',
  },
  categories: {
    network: {
      title: 'Networking & Communication Protocols',
      description: 'Explore fundamental network foundations including TCP 3-way handshake & 4-way wave, TCP/IP stack encapsulation, WebSocket full-duplex pipelines, and HTTPS TLS encryption.',
    },
    crypto: {
      title: 'Modern Cryptography & Hash Algorithms',
      description: 'Delve into cryptographic digest engines: MD5 64-step non-linear operations, SHA-256 512-bit message schedule, 64-round compression, and 256-bit avalanche diffusion.',
    },
  },
  home: {
    heroBadge: '✨ Cinematic Deconstruction of Technical Underpinnings',
    heroTitle: 'Candy Animation',
    heroSubtitle: 'Visualizing Technical Underpinnings',
    heroDesc: 'Bridging abstract code and human intuition through cinematic camera choreography, frame-accurate synchronized subtitles, and interactive sandbox experiments.',
    startExplore: '🚀 Start Exploring',
    browseCategories: '🌐 Browse Categories',
    stats: {
      modules: 'Core Modules',
      steps: 'Animated Chapters',
      tests: 'Automated Tests',
      openSource: 'MIT Open Source',
    },
    features: {
      cameraTitle: 'Cinematic Camera',
      cameraDesc: 'Smooth pan, zoom, and macro focus transitions moving from host networks down to bitwise register details.',
      timelineTitle: 'Synced Subtitles & Console',
      timelineDesc: 'State machine driven timelines with scrubbable progress bar, chapter marks, and multi-speed controls.',
      labTitle: 'Interactive Technical Labs',
      labDesc: 'Built-in 256-bit avalanche matrix, MITM tampering alert, WebSocket mask encoder, and 2MSL timer simulation.',
    },
    categorySectionTitle: 'Technical Animation Categories',
    categorySectionSubtitle: 'Systematically categorized by technical domain. Every module features a dedicated direct URL and step deep-linking.',
    launchModule: 'Launch Animation',
    stepDeepLink: 'Step {step}',
    totalDuration: '{sec}s Total Duration',
    stepsCount: '{count} Steps',
  },
  playback: {
    play: 'Play',
    pause: 'Pause',
    prevStep: 'Previous Step',
    nextStep: 'Next Step',
    reset: 'Reset',
    speed: 'Speed',
    progress: 'Timeline Progress',
    currentStep: 'Current Step',
    totalSteps: 'Total Steps',
    cameraReset: 'Reset Camera View',
    cameraHint: 'Drag to pan viewport, scroll or pinch to zoom canvas',
    interactiveMode: 'Interactive Lab',
    stepMarker: 'Step {step}',
    status: {
      idle: 'Not Started',
      playing: 'Playing',
      paused: 'Paused',
      completed: 'Completed',
    },
  },
  modules: {
    https: {
      title: 'HTTPS Handshake & Encryption Deep Dive',
      summary: 'Explore the full journey from TCP 3-way handshake, TLS negotiation, CA tamper-proof verification, to symmetric session key transfer.',
      category: 'Network & Security',
      steps: {
        step1: {
          title: 'TCP 3-Way Handshake Connection Establishment',
          badge: 'TCP Handshake',
          description:
            'Before TLS encryption begins, client and server must establish a reliable transport layer connection. Client sends <code>SYN</code>, server replies with <code>SYN + ACK</code>, and client finalizes with <code>ACK</code>. The bidirectional reliable TCP stream is now active.',
        },
        step2: {
          title: 'TLS ClientHello & ServerHello Negotiation',
          badge: 'TLS Negotiation',
          description:
            'Client initiates <code>ClientHello</code> carrying supported TLS versions, cipher suites, and <code>Client_Random</code>. Server responds with <code>ServerHello</code>, choosing the cipher suite, providing <code>Server_Random</code>, and delivering its X.509 digital certificate containing the server public key.',
        },
        step3: {
          title: 'CA Certificate Chain Verification & Anti-Tampering',
          badge: 'Cert Verification',
          description:
            'The camera zooms into the client cryptographic engine: the client verifies the digital signature using trusted root CA public keys pre-installed in the OS, strictly checking domain names, expiration, and issuer chains. If an attacker intercepts and swaps the key, signature mismatch triggers an immediate security alert!',
        },
        step4: {
          title: 'Key Derivation & Fast Symmetric Encryption',
          badge: 'Symmetric Cipher',
          description:
            'The client generates a <code>Pre-Master Secret</code>, encrypts it with the server public key, and sends it over. Both parties compute the identical symmetric Session Key using both randoms. The camera zooms out: subsequent HTTP requests and responses are fully encrypted and transmitted at lightning speed.',
        },
      },
      interactive: {
        tamperTitle: 'Man-in-the-Middle (MITM) Tamper Simulation',
        tamperToggle: 'Inject Man-in-the-Middle Attack',
        normalStatus: 'Secure: Certificate issued by trusted Root CA with valid signature.',
        tamperedStatus: 'Alert! Rogue forged certificate detected! Signature validation failed!',
        clientRandom: 'Client Random',
        serverRandom: 'Server Random',
        preMaster: 'Pre-Master Secret',
        sessionKey: 'Symmetric Session Key',
        certValid: 'Certificate Status: Valid',
        certInvalid: 'Certificate Status: Untrusted (Alert)',
      },
    },
    md5: {
      title: 'MD5 Hash Algorithm Internal Architecture',
      summary: 'Deconstruct bit padding, magic buffer initialization, 64-step nonlinear loop transformations, and the avalanche effect.',
      category: 'Cryptography & Hashing',
      steps: {
        step1: {
          title: 'Message Bit Padding & Length Appending',
          badge: 'Bit Padding',
          description:
            'For any input bitstream, a single <code>1</code> bit is appended, followed by <code>0</code> bits until the bit length satisfies <code>Length ≡ 448 (mod 512)</code>. Finally, a 64-bit integer representing original length (little-endian) is appended to form exact 512-bit blocks.',
        },
        step2: {
          title: 'Initialize 4x 32-Bit Magic Registers',
          badge: 'Magic Registers',
          description:
            'MD5 utilizes four predefined 32-bit state registers: <code>A = 0x67452301</code>, <code>B = 0xEFCDAB89</code>, <code>C = 0x98BADCFE</code>, <code>D = 0x10325476</code>. They act as the state accumulation vectors for subsequent rounds.',
        },
        step3: {
          title: '512-Bit Chunk & 4 Rounds (64 Steps) Main Loop',
          badge: 'Main Loop',
          description:
            'Each 512-bit block is split into 16x 32-bit sub-words <code>M[0..15]</code>. The algorithm undergoes 4 rounds of 16 steps each (64 total). Each round utilizes different boolean functions: <code>F(B,C,D)</code>, <code>G(B,C,D)</code>, <code>H(B,C,D)</code>, <code>I(B,C,D)</code>, constant table <code>T[i]</code>, mod 2^32 addition, and circular left shift <code><<< s</code>.',
        },
        step4: {
          title: 'Cascade Output & 128-Bit Digest Formation',
          badge: 'Digest Output',
          description:
            'After all blocks are processed, the registers A, B, C, D are rendered in little-endian hexadecimal format and concatenated into a 128-bit (32 hex characters) MD5 digest. Try the interactive lab below to witness how a 1-bit text change triggers massive avalanche diffusion!',
        },
      },
      interactive: {
        labTitle: 'Avalanche Effect Real-time Comparison Lab',
        inputA: 'Original Plaintext A',
        inputB: 'Slightly Altered Plaintext B (1 character changed)',
        hashA: 'MD5 Digest A',
        hashB: 'MD5 Digest B',
        diffBits: 'Differing Bits in Binary',
        diffRatio: 'Avalanche Diffusion Ratio',
        flipHint: 'Notice how changing only 1 bit flips nearly 50% of the entire output hash!',
        runRoundSim: 'Step-by-step 64-round register evolution',
      },
    },
    websocket: {
      title: 'WebSocket Full-Duplex Protocol Deep Dive',
      summary: 'Explore HTTP protocol upgrade negotiation (101 Switching Protocols), binary frame framing, client XOR masking obfuscation, and full-duplex heartbeat channels.',
      category: 'Real-Time Communication Protocols',
      steps: {
        step1: {
          title: 'HTTP Upgrade Negotiation & Sec-WebSocket Handshake',
          badge: 'Upgrade Handshake',
          description:
            'The client initiates a connection via HTTP/1.1 carrying <code>Upgrade: websocket</code>, <code>Connection: Upgrade</code>, and a random base64 <code>Sec-WebSocket-Key</code>. The server concatenates a fixed GUID string, computes the SHA-1 digest, and responds with <code>101 Switching Protocols</code> and <code>Sec-WebSocket-Accept</code>, seamlessly transforming the one-way HTTP pipe into a bidirectional WebSocket channel.',
        },
        step2: {
          title: 'Frame Binary Framing & Client Masking Obfuscation',
          badge: 'Frame & Masking',
          description:
            'The camera zooms into the microscopic binary layer of a WebSocket frame: examining <code>FIN</code> (1-bit final fragment), <code>Opcode</code> (4-bit: 0x1 text, 0x2 binary), <code>MASK</code> flag, and payload length. To prevent proxy cache poisoning attacks, RFC 6455 strictly requires that **all client-to-server frames must XOR mask their payload with a 32-bit random key**, while server-to-client frames remain unmasked.',
        },
        step3: {
          title: 'Bidirectional Full-Duplex Concurrency & Heartbeat (Ping/Pong)',
          badge: 'Full-Duplex Flow',
          description:
            'The camera pulls back to the bidirectional communication highway: client and server operate independent upload and download streams without waiting for request-response loops, slashing latency to single-digit milliseconds. Dedicated <code>Ping (0x9)</code> / <code>Pong (0xA)</code> control frames probe health and maintain NAT/firewall keepalive.',
        },
        step4: {
          title: 'Graceful Connection Closure Handshake',
          badge: 'Graceful Closure',
          description:
            'When either party desires to terminate, it dispatches an <code>Opcode 0x8</code> Close Frame with a designated status code (e.g. <code>1000 Normal Closure</code>) and a reason phrase. The peer acknowledges with a corresponding Close Frame, after which the underlying TCP socket cleanly closes.',
        },
      },
      interactive: {
        labTitle: 'WebSocket Frame Encoder & Masking Lab',
        inputMsg: 'Plaintext Message',
        maskKey: '32-Bit Random Mask Key (Hex)',
        maskedBytes: 'Masked Payload (XOR Encoded)',
        unmaskedBytes: 'Server Reconstructed Payload',
        sendFrame: 'Send Client Frame',
        triggerPing: 'Trigger Heartbeat (Ping)',
        statusConnected: 'Status: WebSocket OPEN',
        statusClosed: 'Status: WebSocket CLOSED',
        pingPongSuccess: 'Heartbeat Normal: Ping dispatched -> Pong received (RTT < 2ms)',
      },
    },
    tcpip: {
      title: 'TCP/IP Protocol Stack Layering & Encapsulation',
      summary: 'Visually uncover how data moves through Application, Transport (TCP), Network (IP), and Data Link (Ethernet) layers via nested encapsulation and receiver decapsulation.',
      category: 'Network Architecture & Protocol Stack',
      steps: {
        step1: {
          title: 'Application Data & Transport Layer (TCP) Segment Packaging',
          badge: 'Transport Encapsulation',
          description:
            'Application layer protocols generate raw user payloads (e.g. HTTP <code>GET /data</code>). Moving down into the Transport layer, the OS prepends a 20-byte <strong>TCP Header</strong> specifying source port, destination port, sequence numbers, acknowledgment numbers, and flags (SYN, ACK, PSH) to form a <strong>TCP Segment</strong> with reliable flow control.',
        },
        step2: {
          title: 'Network Layer (IP) Datagram Encapsulation & Routing',
          badge: 'Network Encapsulation',
          description:
            'The camera tracks data moving to the Network Layer: the protocol stack wraps the TCP segment with a 20-byte <strong>IP Header</strong> containing source IP, destination IP, protocol ID <code>0x06 (TCP)</code>, TTL (Time to Live), and header checksum, converting it into an <strong>IP Packet (Datagram)</strong> for internet routing.',
        },
        step3: {
          title: 'Data Link Layer (Ethernet) Framing & Physical Transmission',
          badge: 'Ethernet Framing',
          description:
            'At the Network Interface Card (NIC), the IP packet is framed by a 14-byte <strong>Ethernet MAC Header</strong> (Source MAC, Gateway MAC, EtherType <code>0x0800 IPv4</code>) and a 4-byte <strong>FCS (CRC-32 checksum)</strong> trailer. The camera pulls back as the NIC modulates the frame into optical/electrical pulses traveling over the physical medium.',
        },
        step4: {
          title: 'Destination Host Decapsulation & Layer-by-Layer Delivery',
          badge: 'Decapsulation Delivery',
          description:
            'The camera shifts to the server stack: the NIC validates FCS checksum and strips the Ethernet header; the Network layer validates IP destination and strips the IP header; the Transport layer matches ports and strips the TCP header; cleanly delivering the pure application payload to the listening Web server process (Nginx/Node.js).',
        },
      },
      interactive: {
        inspectorTitle: 'TCP/IP Layered Packet Protocol Inspector',
        layerApp: 'Application Layer (HTTP / Data)',
        layerTcp: 'Transport Layer (TCP Segment)',
        layerIp: 'Network Layer (IP Packet)',
        layerEth: 'Data Link Layer (Ethernet Frame)',
        srcPort: 'Source Port',
        dstPort: 'Destination Port',
        srcIp: 'Source IP Address',
        dstIp: 'Destination IP Address',
        totalSize: 'Total Frame Size',
        overheadRatio: 'Protocol Overhead Ratio',
      },
    },
    sha256: {
      title: 'SHA-256 Cryptographic Hash Algorithm',
      summary: 'Explore 512-bit message padding, 64-word message schedule expansion W[t], 8 initial hash vectors, and the 64-round compression loop.',
      category: 'Cryptography & Hashing',
      steps: {
        step1: {
          title: 'Message Bit Padding & 64-bit Length Appending',
          badge: 'Bit Padding',
          description:
            'For any input text, a single bit <code>1</code> (0x80) is appended, followed by <code>0</code> bits until the bit length satisfies <code>Length ≡ 448 (mod 512)</code>. Finally, a 64-bit big-endian integer representing original bit length is appended to assemble 512-bit computation blocks.',
        },
        step2: {
          title: 'Initialize 8x 32-bit Hash State Registers',
          badge: 'Initial Vectors',
          description:
            'The algorithm initializes 8 state registers <code>H0 ~ H7</code> using the first 32 bits of the fractional parts of the square roots of the first 8 prime numbers (2 through 19), representing working variables <code>a, b, c, d, e, f, g, h</code>.',
        },
        step3: {
          title: 'Message Schedule Expansion (W0..W63) & 64 Rounds',
          badge: 'Compression Loop',
          description:
            'The 16 words of the 512-bit block are expanded into 64 words <code>W[0..63]</code> via nonlinear functions <code>γ0</code> and <code>γ1</code>. Each round applies constants <code>K[t]</code>, conditional function <code>Ch</code>, majority function <code>Maj</code>, and rotation functions <code>Σ0</code> and <code>Σ1</code> for deep diffusion.',
        },
        step4: {
          title: 'Cumulative 256-bit Digest Output & Avalanche Lab',
          badge: 'Digest Output',
          description:
            'The working variables are added modulo 2^32 into the previous hash values: <code>H_i = H_i + var_i</code> and concatenated as a 256-bit (64 hex characters) secure digest. Try the live lab below to watch 256-bit avalanche diffusion from a single character modification.',
        },
      },
      interactive: {
        labTitle: 'SHA-256 256-Bit Avalanche Effect Real-time Lab',
        inputA: 'Original Plaintext A',
        inputB: 'Slightly Altered Plaintext B (1 character changed)',
        hashA: 'SHA-256 Digest A',
        hashB: 'SHA-256 Digest B',
        diffBits: 'Differing Bits in Binary',
        diffRatio: 'Avalanche Diffusion Ratio',
        flipHint: 'Notice how a 1-character difference flips nearly 50% of the entire 256 output bits!',
      },
    },
    tcphandshake: {
      title: 'TCP 3-Way Handshake & 4-Way Wave Termination',
      summary: 'Complete state machine visualization of transport layer connection setup (3-way handshake) and teardown (4-way termination) with sequence synchronization.',
      category: 'Transport Layer Protocols',
      steps: {
        step1: {
          title: 'Connection Setup: Client SYN & Server SYN+ACK',
          badge: 'Handshake 1 & 2',
          description:
            'The client moves from <code>CLOSED</code> to <code>SYN_SENT</code>, sending a <code>SYN</code> packet with initial sequence number <code>seq=x</code>. The server in <code>LISTEN</code> replies with <code>SYN + ACK</code> (<code>seq=y, ack=x+1</code>) and transitions to <code>SYN_RCVD</code>.',
        },
        step2: {
          title: 'Handshake Established: Client ACK & ESTABLISHED',
          badge: 'Connection Open',
          description:
            'The client replies with an <code>ACK</code> packet (<code>ack=y+1</code>) and moves into <code>ESTABLISHED</code>. Upon arrival, the server also enters <code>ESTABLISHED</code>, finalizing the 3-way handshake and opening the bidirectional reliable stream.',
        },
        step3: {
          title: 'Teardown Initiation: Client FIN & Half-Close (CLOSE_WAIT)',
          badge: 'Teardown 1 & 2',
          description:
            'Upon completing data transmission, the client sends a <code>FIN</code> packet (<code>seq=u</code>) and moves to <code>FIN_WAIT_1</code>. The server returns <code>ACK</code> (<code>ack=u+1</code>) and enters <code>CLOSE_WAIT</code>, while client enters <code>FIN_WAIT_2</code> in half-close state.',
        },
        step4: {
          title: 'Full Teardown: Server FIN & 2MSL TIME_WAIT Protection',
          badge: 'Final Closure',
          description:
            'The server finishes pending outbound packets, sends <code>FIN + ACK</code>, and enters <code>LAST_ACK</code>. The client acknowledges with <code>ACK</code> and enters the crucial <code>TIME_WAIT</code> state for <code>2MSL</code> to guard against lost packets before finally resetting to <code>CLOSED</code>.',
        },
      },
      interactive: {
        labTitle: 'TCP State Machine & Sequence Inspector',
        clientState: 'Client State',
        serverState: 'Server State',
        seqX: 'Client Initial Seq (seq=x)',
        seqY: 'Server Initial Seq (seq=y)',
        mslTimer: '2MSL Countdown Timer',
        mslHint: 'TIME_WAIT holds for 2MSL to absorb lingering duplicate segments from the network',
      },
    },
  },
}
