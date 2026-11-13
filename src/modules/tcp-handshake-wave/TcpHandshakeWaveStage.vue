<template>
  <div
    ref="stageContainerRef"
    class="relative w-full h-full min-h-[480px] flex items-center justify-center select-none overflow-hidden"
  >
    <!-- 舞台核心画布 (响应镜头变换) -->
    <div
      ref="canvasRef"
      class="relative w-[920px] h-[500px] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl flex flex-col justify-between"
    >
      <!-- 顶部信息栏 -->
      <div class="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
          <span class="font-bold text-slate-800 dark:text-slate-200">
            TCP Connection & Teardown Protocol Stage
          </span>
          <span class="px-2 py-0.5 rounded font-mono text-[10px] bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 font-semibold border border-pink-500/30">
            RFC 793 / RFC 9293 Transmission Control Protocol
          </span>
        </div>
        <el-button
          type="primary"
          size="small"
          class="!rounded-lg !bg-pink-600 !border-pink-600 hover:!bg-pink-500"
          @click="showLabDialog = true"
        >
          {{ t('modules.tcphandshake.interactive.labTitle') }}
        </el-button>
      </div>

      <!-- 中央核心工作区：客户端 主机 / 网络信道 / 服务端 主机 -->
      <div class="relative flex-1 flex items-center justify-between py-4">
        <!-- 客户端 主机卡片 -->
        <div
          class="tcp-client-box w-[220px] p-4 rounded-xl border-2 border-pink-500/40 bg-pink-50/30 dark:bg-pink-950/20 backdrop-blur-sm flex flex-col gap-2.5 transition-all shadow-md"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <span>💻</span>
              Client (Active)
            </span>
            <span class="text-[10px] font-mono text-slate-500">192.168.1.100</span>
          </div>

          <div class="flex flex-col gap-1 p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-pink-500/20">
            <span class="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              {{ t('modules.tcphandshake.interactive.clientState') }}
            </span>
            <span class="client-state-text font-mono text-sm font-black text-pink-600 dark:text-pink-400 tracking-wider">
              CLOSED
            </span>
          </div>

          <div class="text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Port: 54321</span>
            <span>seq=x (1000)</span>
          </div>
        </div>

        <!-- 中间双向网络信道与报文飞行走廊 -->
        <div class="relative flex-1 h-[260px] mx-4 flex items-center justify-center">
          <!-- 背景网格与双向物理链路 -->
          <div class="absolute inset-x-0 h-1 bg-slate-200 dark:bg-slate-700/60 rounded-full top-[35%]"></div>
          <div class="absolute inset-x-0 h-1 bg-slate-200 dark:bg-slate-700/60 rounded-full top-[65%]"></div>

          <!-- 报文 1: SYN (握手 1) -->
          <div
            class="pkt-syn absolute top-[25%] left-2 px-3 py-1.5 rounded-lg bg-pink-500 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 z-20 pointer-events-none"
          >
            <span class="text-[10px]">▶</span>
            <span>SYN=1 | seq=x</span>
          </div>

          <!-- 报文 2: SYN + ACK (握手 2) -->
          <div
            class="pkt-syn-ack absolute top-[40%] left-2 px-3 py-1.5 rounded-lg bg-purple-600 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 z-20 pointer-events-none"
          >
            <span>SYN=1, ACK=1 | seq=y, ack=x+1</span>
            <span class="text-[10px]">◀</span>
          </div>

          <!-- 报文 3: ACK (握手 3) -->
          <div
            class="pkt-ack-3way absolute top-[55%] left-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 z-20 pointer-events-none"
          >
            <span class="text-[10px]">▶</span>
            <span>ACK=1 | seq=x+1, ack=y+1</span>
          </div>

          <!-- 连接建立就绪横幅 (ESTABLISHED) -->
          <div
            class="tcp-established-banner absolute px-6 py-2.5 rounded-xl border border-emerald-500 bg-emerald-500/15 backdrop-blur-md text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2 shadow-xl z-10"
          >
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>ESTABLISHED: Full-Duplex Byte Stream Active</span>
          </div>

          <!-- 报文 4: 挥手 1 FIN -->
          <div
            class="pkt-fin-1 absolute top-[25%] left-2 px-3 py-1.5 rounded-lg bg-rose-500 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 z-20 pointer-events-none"
          >
            <span class="text-[10px]">▶</span>
            <span>FIN=1 | seq=u</span>
          </div>

          <!-- 报文 5: 挥手 2 ACK (对端进入 CLOSE_WAIT) -->
          <div
            class="pkt-ack-fin1 absolute top-[40%] left-2 px-3 py-1.5 rounded-lg bg-amber-600 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 z-20 pointer-events-none"
          >
            <span>ACK=1 | seq=v, ack=u+1</span>
            <span class="text-[10px]">◀</span>
          </div>

          <!-- 报文 6: 挥手 3 FIN + ACK (服务端结束发送) -->
          <div
            class="pkt-fin-2 absolute top-[55%] left-2 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 z-20 pointer-events-none"
          >
            <span>FIN=1, ACK=1 | seq=w, ack=u+1</span>
            <span class="text-[10px]">◀</span>
          </div>

          <!-- 报文 7: 挥手 4 ACK (进入 TIME_WAIT) -->
          <div
            class="pkt-ack-fin2 absolute top-[70%] left-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 z-20 pointer-events-none"
          >
            <span class="text-[10px]">▶</span>
            <span>ACK=1 | seq=u+1, ack=w+1</span>
          </div>
        </div>

        <!-- 服务端 主机卡片 -->
        <div
          class="tcp-server-box w-[220px] p-4 rounded-xl border-2 border-purple-500/40 bg-purple-50/30 dark:bg-purple-950/20 backdrop-blur-sm flex flex-col gap-2.5 transition-all shadow-md"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <span>🖥️</span>
              Server (Passive)
            </span>
            <span class="text-[10px] font-mono text-slate-500">10.0.0.1</span>
          </div>

          <div class="flex flex-col gap-1 p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-purple-500/20">
            <span class="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              {{ t('modules.tcphandshake.interactive.serverState') }}
            </span>
            <span class="server-state-text font-mono text-sm font-black text-purple-600 dark:text-purple-400 tracking-wider">
              LISTEN
            </span>
          </div>

          <div class="text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Port: 443</span>
            <span>seq=y (5000)</span>
          </div>
        </div>
      </div>

      <!-- 底部 2MSL TIME_WAIT 状态与说明卡片 -->
      <div
        class="tcp-time-wait-box w-full p-3 rounded-xl border border-pink-500/40 bg-pink-500/10 backdrop-blur-sm flex items-center justify-between transition-opacity"
      >
        <div class="flex items-center gap-3">
          <span class="text-2xl">⏳</span>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-pink-700 dark:text-pink-300">
                {{ t('modules.tcphandshake.interactive.mslTimer') }}
              </span>
              <span class="msl-countdown-val font-mono text-xs font-extrabold text-pink-600 dark:text-pink-400">
                120s (2 × 60s MSL)
              </span>
            </div>
            <span class="text-[11px] text-slate-600 dark:text-slate-300">
              {{ t('modules.tcphandshake.interactive.mslHint') }}
            </span>
          </div>
        </div>

        <span class="px-2.5 py-1 rounded-md text-[10px] font-mono bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300 font-semibold border border-pink-500/20">
          2MSL = Maximum Segment Lifetime
        </span>
      </div>
    </div>

    <!-- 交互式演练器弹窗 -->
    <el-dialog
      v-model="showLabDialog"
      :title="t('modules.tcphandshake.interactive.labTitle')"
      width="90%"
      class="max-w-2xl !rounded-2xl"
    >
      <div class="space-y-4">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          {{ t('modules.tcphandshake.steps.step1.description').replace(/<[^>]+>/g, '') }}
        </p>

        <!-- 初始序列号设置 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {{ t('modules.tcphandshake.interactive.seqX') }}
            </label>
            <el-input-number v-model="simSeqX" :min="1" :max="999999" class="!w-full" />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {{ t('modules.tcphandshake.interactive.seqY') }}
            </label>
            <el-input-number v-model="simSeqY" :min="1" :max="999999" class="!w-full" />
          </div>
        </div>

        <!-- 序列号联动推导表格 -->
        <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden font-mono text-xs">
          <table class="w-full text-left">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th class="p-2.5">步骤</th>
                <th class="p-2.5">方向</th>
                <th class="p-2.5">标记 (Flags)</th>
                <th class="p-2.5">序列号 (seq)</th>
                <th class="p-2.5">确认号 (ack)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
              <tr>
                <td class="p-2.5 font-bold text-pink-600">握手 1</td>
                <td class="p-2.5">Client → Server</td>
                <td class="p-2.5"><span class="px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-900/50 text-pink-600 font-bold">SYN</span></td>
                <td class="p-2.5">{{ simSeqX }}</td>
                <td class="p-2.5 text-slate-400">-</td>
              </tr>
              <tr>
                <td class="p-2.5 font-bold text-purple-600">握手 2</td>
                <td class="p-2.5">Server → Client</td>
                <td class="p-2.5"><span class="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-600 font-bold">SYN + ACK</span></td>
                <td class="p-2.5">{{ simSeqY }}</td>
                <td class="p-2.5 font-bold text-emerald-600">{{ simSeqX + 1 }}</td>
              </tr>
              <tr>
                <td class="p-2.5 font-bold text-emerald-600">握手 3</td>
                <td class="p-2.5">Client → Server</td>
                <td class="p-2.5"><span class="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 font-bold">ACK</span></td>
                <td class="p-2.5">{{ simSeqX + 1 }}</td>
                <td class="p-2.5 font-bold text-emerald-600">{{ simSeqY + 1 }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 2MSL 交互倒计时模拟 -->
        <div class="p-3.5 rounded-xl border border-pink-500/30 bg-pink-50/50 dark:bg-pink-950/20 flex items-center justify-between">
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">
              {{ t('modules.tcphandshake.interactive.mslTimer') }} (2MSL = {{ timerSeconds }}s)
            </span>
            <span class="text-[11px] text-slate-500">
              {{ isCountingDown ? '倒计时中: 防止对端未收到最终 ACK 导致重传 FIN 报文' : '点击启动倒计时观察 TIME_WAIT 自动释放机制' }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <span class="font-mono text-lg font-bold text-pink-600 dark:text-pink-400 min-w-[48px] text-right">
              {{ timerSeconds }}s
            </span>
            <el-button
              type="danger"
              size="small"
              :disabled="isCountingDown"
              @click="startMslCountdown"
            >
              模拟 2MSL 倒计时
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { useCamera } from '@/composables/useCamera'
import { createTcpHandshakeWaveTimeline } from './timeline'

const { t } = useI18n()

const stageContainerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLElement | null>(null)

// 交互模拟器
const showLabDialog = ref<boolean>(false)
const simSeqX = ref<number>(1000)
const simSeqY = ref<number>(5000)
const timerSeconds = ref<number>(120)
const isCountingDown = ref<boolean>(false)
let countdownInterval: ReturnType<typeof setInterval> | null = null

function startMslCountdown(): void {
  if (isCountingDown.value) return
  isCountingDown.value = true
  timerSeconds.value = 120
  countdownInterval = setInterval(() => {
    if (timerSeconds.value > 0) {
      timerSeconds.value -= 10
      if (timerSeconds.value < 0) timerSeconds.value = 0
    } else {
      if (countdownInterval) clearInterval(countdownInterval)
      isCountingDown.value = false
      timerSeconds.value = 120
    }
  }, 250)
}

let activeTimeline: gsap.core.Timeline | null = null

/**
 * 初始化并挂载动画时间轴
 */
function initAnimation(camera: ReturnType<typeof useCamera>, onStepChange?: (step: number) => void): gsap.core.Timeline | null {
  if (!stageContainerRef.value) return null
  activeTimeline = createTcpHandshakeWaveTimeline(stageContainerRef.value, camera, {
    onStepChange,
  })
  return activeTimeline
}

defineExpose({
  initAnimation,
  getCanvasRef: () => canvasRef.value,
})
</script>
