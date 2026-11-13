<template>
  <div
    ref="stageContainerRef"
    class="relative w-full h-full min-h-[480px] flex items-center justify-center select-none overflow-hidden"
  >
    <!-- 舞台核心画布 (支持虚拟镜头缩放与位移) -->
    <div
      ref="canvasRef"
      class="relative w-[860px] h-[460px] flex items-center justify-between px-8 py-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl"
    >
      <!-- 背景通信导轨 SVG -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 860 460">
        <defs>
          <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- 基础物理通信光缆 -->
        <path
          d="M 210 230 L 650 230"
          stroke="currentColor"
          class="text-slate-300 dark:text-slate-700"
          stroke-width="4"
          stroke-linecap="round"
        />

        <!-- TCP 握手就绪后点亮的逻辑通道 -->
        <path
          d="M 210 230 L 650 230"
          stroke="url(#pipeGrad)"
          stroke-width="5"
          stroke-linecap="round"
          filter="url(#glow)"
          class="tcp-pipe-line"
        />

        <!-- 阶段 4 建立的加密高速流 -->
        <path
          d="M 210 230 L 650 230"
          stroke="#10b981"
          stroke-width="6"
          stroke-dasharray="16 8"
          stroke-linecap="round"
          class="encrypted-stream opacity-0 pointer-events-none"
        />
      </svg>

      <!-- 客户端终端节点 (Client Node) -->
      <div
        class="client-node relative z-10 w-[210px] p-4 rounded-xl border border-cyan-500/30 bg-slate-50/90 dark:bg-slate-800/90 shadow-lg flex flex-col gap-3 transition-colors"
      >
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></span>
            <span class="font-bold text-xs tracking-wider text-cyan-600 dark:text-cyan-400">CLIENT</span>
          </div>
          <span class="client-status-text font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300">
            CLOSED
          </span>
        </div>

        <!-- 客户端参数存储状态 -->
        <div class="client-vault space-y-2 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60">
          <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
            {{ t('modules.https.interactive.clientRandom') }}:
            <span class="font-mono text-cyan-600 dark:text-cyan-300">0x7a8fc91</span>
          </div>
          <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
            {{ t('modules.https.interactive.preMaster') }}:
            <span class="font-mono text-purple-600 dark:text-purple-300">0x91d2ef4</span>
          </div>
          <div class="session-key-client opacity-0 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-1.5 rounded flex items-center gap-1">
            <span>🔑</span>
            <span>{{ t('modules.https.interactive.sessionKey') }} (AES-GCM)</span>
          </div>
        </div>

        <!-- 客户端受信任根 CA 校验指示 -->
        <div
          class="cert-badge opacity-0 text-[10px] p-2 rounded-lg border border-emerald-500/50 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex flex-col gap-1"
        >
          <div class="flex items-center gap-1 font-bold">
            <span>🛡️</span>
            <span>Root CA: DigiTrust Global</span>
          </div>
          <div class="text-[9px] opacity-80">
            {{ isTampered ? t('modules.https.interactive.certInvalid') : t('modules.https.interactive.certValid') }}
          </div>
        </div>
      </div>

      <!-- 中间网络管道流动报文 (动态绝对定位) -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <!-- TCP: SYN -->
        <div class="packet-syn absolute px-3 py-1.5 rounded-full bg-cyan-500 text-white text-xs font-mono font-bold shadow-lg shadow-cyan-500/40 flex items-center gap-1">
          <span>📤</span>
          <span>SYN (seq=100)</span>
        </div>

        <!-- TCP: SYN+ACK -->
        <div class="packet-syn-ack absolute px-3 py-1.5 rounded-full bg-purple-500 text-white text-xs font-mono font-bold shadow-lg shadow-purple-500/40 flex items-center gap-1">
          <span>📥</span>
          <span>SYN+ACK (seq=300, ack=101)</span>
        </div>

        <!-- TCP: ACK -->
        <div class="packet-ack absolute px-3 py-1.5 rounded-full bg-indigo-500 text-white text-xs font-mono font-bold shadow-lg shadow-indigo-500/40 flex items-center gap-1">
          <span>📤</span>
          <span>ACK (ack=301)</span>
        </div>

        <!-- TLS: ClientHello -->
        <div class="packet-client-hello absolute px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-mono font-bold shadow-xl flex flex-col items-center">
          <div class="flex items-center gap-1">
            <span>🌐</span>
            <span>ClientHello (TLS 1.3)</span>
          </div>
          <span class="text-[9px] opacity-90">CipherSuites + R_client</span>
        </div>

        <!-- TLS: ServerHello + Certificate -->
        <div class="packet-server-hello absolute px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-mono font-bold shadow-xl flex flex-col items-center">
          <div class="flex items-center gap-1">
            <span>📜</span>
            <span>ServerHello + X.509 Cert</span>
          </div>
          <span class="text-[9px] opacity-90">Selected Suite + K_pub + R_server</span>
        </div>

        <!-- TLS: Pre-Master Secret Encrypted -->
        <div class="packet-pre-master absolute px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-mono font-bold shadow-xl flex flex-col items-center">
          <div class="flex items-center gap-1">
            <span>🔒</span>
            <span>K_pub{ Pre-Master Secret }</span>
          </div>
          <span class="text-[9px] opacity-90">Encrypted with Server Public Key</span>
        </div>

        <!-- 中间人篡改警报框 -->
        <div
          class="mitm-alert-box opacity-0 absolute px-4 py-2.5 rounded-xl border-2 border-red-500 bg-red-600/90 text-white text-xs font-bold shadow-2xl flex items-center gap-2 z-30"
        >
          <span class="text-xl animate-bounce">🚨</span>
          <div>
            <div>{{ t('modules.https.interactive.tamperedStatus') }}</div>
            <div class="text-[10px] opacity-90 font-mono">MITM_SIGNATURE_MISMATCH_ALERT</div>
          </div>
        </div>
      </div>

      <!-- 服务端节点 (Server Node) -->
      <div
        class="server-node relative z-10 w-[210px] p-4 rounded-xl border border-purple-500/30 bg-slate-50/90 dark:bg-slate-800/90 shadow-lg flex flex-col gap-3 transition-colors"
      >
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></span>
            <span class="font-bold text-xs tracking-wider text-purple-600 dark:text-purple-400">SERVER</span>
          </div>
          <span class="server-status-text font-mono text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
            LISTEN
          </span>
        </div>

        <!-- 服务端密码学密钥库 -->
        <div class="space-y-2 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60">
          <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-between">
            <span>{{ t('modules.https.interactive.serverRandom') }}:</span>
            <span class="font-mono text-purple-600 dark:text-purple-300">0x3c19b48</span>
          </div>
          <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-between">
            <span>Server K_priv:</span>
            <span class="font-mono text-rose-500 dark:text-rose-400">🔒 Secret HSM</span>
          </div>
          <div class="session-key-server opacity-0 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-1.5 rounded flex items-center gap-1">
            <span>🔑</span>
            <span>{{ t('modules.https.interactive.sessionKey') }} (AES-GCM)</span>
          </div>
        </div>

        <div class="text-[10px] p-2 rounded-lg border border-purple-500/20 bg-purple-50/50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300">
          <div class="font-mono">Host: candy.visual.dev</div>
          <div class="text-[9px] opacity-75">TLS 1.3 / HTTP 2 Ready</div>
        </div>
      </div>
    </div>

    <!-- 交互模拟器浮动悬浮工具条 -->
    <div
      class="absolute bottom-3 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur"
    >
      <span class="text-xs text-slate-600 dark:text-slate-300">{{ t('modules.https.interactive.tamperToggle') }}:</span>
      <el-switch
        v-model="isTampered"
        size="small"
        active-color="#ef4444"
        inactive-color="#10b981"
        @change="handleTamperToggle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue'
import { useI18n } from 'vue-i18n'
import type { useCamera } from '@/composables/useCamera'
import { createHttpsTimeline } from './timeline'

const { t } = useI18n()

const stageContainerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLElement | null>(null)

// 是否开启中间人攻击模拟
const isTampered = ref<boolean>(false)

let activeTimeline: gsap.core.Timeline | null = null

/**
 * 初始化并挂载动画时间轴
 */
function initAnimation(camera: ReturnType<typeof useCamera>, onStepChange?: (step: number) => void): gsap.core.Timeline | null {
  if (!stageContainerRef.value) return null
  activeTimeline = createHttpsTimeline(stageContainerRef.value, camera, {
    isTampered: () => isTampered.value,
    onStepChange,
  })
  return activeTimeline
}

function handleTamperToggle(): void {
  // 如果当前处于阶段 3，动态触发警报效果
  if (activeTimeline && stageContainerRef.value) {
    const mitmAlert = stageContainerRef.value.querySelector('.mitm-alert-box')
    const clientStatus = stageContainerRef.value.querySelector('.client-status-text')
    if (mitmAlert && clientStatus) {
      if (isTampered.value) {
        mitmAlert.classList.remove('opacity-0')
        clientStatus.textContent = 'ALERT: TAMPERED'
      } else {
        mitmAlert.classList.add('opacity-0')
        clientStatus.textContent = 'ESTABLISHED'
      }
    }
  }
}

defineExpose({
  initAnimation,
  getCanvasRef: () => canvasRef.value,
})
</script>
