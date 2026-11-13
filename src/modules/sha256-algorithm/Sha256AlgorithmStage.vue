<template>
  <div
    ref="stageContainerRef"
    class="relative w-full h-full min-h-[480px] flex items-center justify-center select-none overflow-hidden"
  >
    <!-- 舞台核心画布 (响应镜头变换) -->
    <div
      ref="canvasRef"
      class="relative w-[900px] h-[480px] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl flex flex-col justify-between"
    >
      <!-- ================= 阶段 1: 消息填充与大端长度追加 ================= -->
      <div
        class="sha-padding-section w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/70 flex flex-col gap-2 transition-opacity"
      >
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            SHA-256 512-bit Block Padding Pipeline
          </span>
          <span class="sha-total-512-badge opacity-0 px-2 py-0.5 rounded font-mono text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30">
            512 bits = 16 words × 32 bits (Big-Endian)
          </span>
        </div>

        <div class="flex items-center gap-1.5 font-mono text-xs overflow-x-auto py-1">
          <!-- 原始数据 -->
          <div class="sha-bit-original px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-300 flex flex-col items-center">
            <span class="text-[9px] uppercase tracking-wider font-sans font-semibold">Message M</span>
            <span class="font-bold">40 bits ("Candy")</span>
          </div>

          <span class="text-slate-400 font-bold">+</span>

          <!-- 填充 1 (0x80) -->
          <div class="sha-bit-one px-2 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/50 text-rose-600 dark:text-rose-400 font-bold flex flex-col items-center">
            <span class="text-[9px] uppercase tracking-wider font-sans">Single '1' (0x80)</span>
            <span>0b10000000</span>
          </div>

          <span class="text-slate-400 font-bold">+</span>

          <!-- 填充 0 至 448 位 -->
          <div class="sha-bit-zeros px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 flex flex-col items-center">
            <span class="text-[9px] uppercase tracking-wider font-sans font-semibold">Zeroes Padding</span>
            <span class="font-bold">0b000... (407 bits) -> 448 bits</span>
          </div>

          <span class="text-slate-400 font-bold">+</span>

          <!-- 原始长度 64 位大端序 -->
          <div class="sha-bit-length px-2.5 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/50 text-purple-600 dark:text-purple-400 font-bold flex flex-col items-center">
            <span class="text-[9px] uppercase tracking-wider font-sans">Big-Endian Length</span>
            <span>40 (0x00...0028)</span>
          </div>
        </div>
      </div>

      <!-- ================= 阶段 2: 8 个 32-bit 初始哈希寄存器 ================= -->
      <div
        class="sha-registers-section w-full grid grid-cols-4 md:grid-cols-8 gap-2 transition-opacity"
      >
        <div
          v-for="(reg, idx) in hashRegisters"
          :key="reg.name"
          class="sha-reg-card p-2 rounded-xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col items-center gap-0.5 shadow-sm"
        >
          <div class="text-[10px] font-bold text-amber-600 dark:text-amber-400">
            H{{ idx }} ({{ reg.name }})
          </div>
          <span class="font-mono text-[10px] font-bold text-slate-800 dark:text-slate-100">
            {{ reg.val }}
          </span>
          <span class="text-[8px] text-slate-400 font-mono">√{{ reg.prime }} frac</span>
        </div>
      </div>

      <!-- ================= 阶段 3: 64 轮压缩核心公式 ================= -->
      <div
        class="sha-round-section w-full p-3 rounded-xl border border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/20 flex items-center justify-between transition-opacity"
      >
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="sha-active-func-badge px-2.5 py-1 rounded-md bg-amber-600 text-white text-xs font-mono font-bold shadow-md">
              Schedule: W[t] = σ1(W[t-2]) + W[t-7] + σ0(W[t-15]) + W[t-16]
            </span>
            <span class="sha-round-step-counter text-xs font-mono font-semibold text-amber-700 dark:text-amber-300">
              Round: 01 / 64
            </span>
          </div>
          <div class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            Compression: T1 = h + Σ1(e) + Ch(e,f,g) + K[t] + W[t] | T2 = Σ0(a) + Maj(a,b,c)
          </div>
        </div>

        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-300">
          <span class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">W[t]</span>
          <span>+</span>
          <span class="px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-700 dark:text-amber-300">K[t]</span>
          <span>→</span>
          <span class="px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-700 dark:text-rose-300 font-bold">Ch / Maj</span>
          <span>→</span>
          <span class="px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold">New a, e</span>
        </div>
      </div>

      <!-- ================= 阶段 4: 256 位十六进制散列输出 ================= -->
      <div
        class="sha-cascade-section w-full flex flex-col items-center gap-2 transition-opacity"
      >
        <div
          class="sha-final-digest-box w-full p-3 rounded-xl border-2 border-amber-500/60 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 backdrop-blur-md shadow-xl flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <span class="text-xl">🛡️</span>
            <div class="flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                256-Bit SHA-256 Digest (64 Hex Characters)
              </span>
              <span class="font-mono text-xs md:text-sm font-extrabold text-slate-800 dark:text-white tracking-wider break-all select-all">
                2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
              </span>
            </div>
          </div>
          <el-button
            type="warning"
            size="small"
            class="!rounded-lg"
            @click="showLabDialog = true"
          >
            {{ t('modules.sha256.interactive.labTitle') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 交互式雪崩效应实时对比实验室 -->
    <el-dialog
      v-model="showLabDialog"
      :title="t('modules.sha256.interactive.labTitle')"
      width="90%"
      class="max-w-2xl !rounded-2xl"
    >
      <div class="space-y-4">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          {{ t('modules.sha256.interactive.flipHint') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {{ t('modules.sha256.interactive.inputA') }}
            </label>
            <el-input v-model="textA" placeholder="Input A" @input="updateHashes" />
            <div class="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 break-all select-all">
              {{ hashA }}
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {{ t('modules.sha256.interactive.inputB') }}
            </label>
            <el-input v-model="textB" placeholder="Input B" @input="updateHashes" />
            <div class="font-mono text-[10px] p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 break-all select-all">
              {{ hashB }}
            </div>
          </div>
        </div>

        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <div>
            <div class="text-xs text-slate-500 dark:text-slate-400">{{ t('modules.sha256.interactive.diffBits') }}</div>
            <div class="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">
              {{ avalancheResult.diffCount }} / 256
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs text-slate-500 dark:text-slate-400">{{ t('modules.sha256.interactive.diffRatio') }}</div>
            <div class="text-lg font-bold font-mono text-rose-500 dark:text-rose-400">
              {{ avalancheResult.diffRatio.toFixed(1) }}%
            </div>
          </div>
        </div>

        <!-- 256 位二进制点阵像素网格 (16x16) -->
        <div class="space-y-1">
          <div class="text-[11px] font-semibold text-slate-500">256-Bit Avalanche Diff Matrix (16×16 Red = Flipped)</div>
          <div class="grid grid-cols-16 gap-1 p-2 rounded-lg bg-slate-900 border border-slate-700">
            <div
              v-for="(bitA, index) in avalancheResult.bitsA"
              :key="index"
              class="w-full aspect-square rounded-[2px] transition-colors"
              :class="bitA === avalancheResult.bitsB[index] ? 'bg-emerald-500/80' : 'bg-rose-500 animate-pulse'"
              :title="`Bit ${index}: A=${bitA} vs B=${avalancheResult.bitsB[index]}`"
            ></div>
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
import { computeSha256, compareSha256Avalanche } from '@/utils/sha256'
import { createSha256Timeline } from './timeline'

const { t } = useI18n()

const stageContainerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLElement | null>(null)

// 初始 8 个素数平方根哈希向量
const hashRegisters = [
  { name: 'a', val: '0x6a09e667', prime: 2 },
  { name: 'b', val: '0xbb67ae85', prime: 3 },
  { name: 'c', val: '0x3c6ef372', prime: 5 },
  { name: 'd', val: '0xa54ff53a', prime: 7 },
  { name: 'e', val: '0x510e527f', prime: 11 },
  { name: 'f', val: '0x9b05688c', prime: 13 },
  { name: 'g', val: '0x1f83d9ab', prime: 17 },
  { name: 'h', val: '0x5be0cd19', prime: 19 },
]

// 交互实验室数据
const showLabDialog = ref<boolean>(false)
const textA = ref<string>('Candy')
const textB = ref<string>('candy')
const hashA = ref<string>(computeSha256('Candy'))
const hashB = ref<string>(computeSha256('candy'))
const avalancheResult = ref(compareSha256Avalanche(hashA.value, hashB.value))

function updateHashes(): void {
  hashA.value = computeSha256(textA.value)
  hashB.value = computeSha256(textB.value)
  avalancheResult.value = compareSha256Avalanche(hashA.value, hashB.value)
}

let activeTimeline: gsap.core.Timeline | null = null

/**
 * 初始化并挂载动画时间轴
 */
function initAnimation(camera: ReturnType<typeof useCamera>, onStepChange?: (step: number) => void): gsap.core.Timeline | null {
  if (!stageContainerRef.value) return null
  activeTimeline = createSha256Timeline(stageContainerRef.value, camera, {
    onStepChange,
  })
  return activeTimeline
}

defineExpose({
  initAnimation,
  getCanvasRef: () => canvasRef.value,
})
</script>

<style scoped>
.grid-cols-16 {
  grid-template-columns: repeat(16, minmax(0, 1fr));
}
</style>
