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
  },
  theme: {
    light: 'Light Theme',
    dark: 'Dark Theme',
    system: 'Follow System',
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
  },
}
