<script setup lang="ts">
import { ref, watch } from 'vue'
import { useElementHover } from '../../composables/use-element-hover.ts'

defineProps<{
  left: number
  top: number
  width: number
  height: number
  word: Word
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'hover', isHover: boolean): void
  (e: 'remove-word', word: Word): void
}>()

const hint = ref<HTMLElement | null>(null)
const isHover = useElementHover(hint)

watch(isHover, (isHover) => {
  emit('hover', isHover)
})
</script>

<template>
  <div
    ref="hint"
    :style="{ left: left + 'px', top: top + 'px', width: width + 'px' }"
    class="absolute"
  >
    <!-- 佔位 -->
    <div
      style="{ background: rgba(1, 1, 1, 0.2) }"
      :style="{ height: height + 'px', maxWidth: width + 'px' }"
    ></div>

    <!-- 下滑線 -->
    <hr class="border-red-500 absolute mb-1" style="z-index: -1" :style="{ width: width + 'px' }" />

    <div style="line-height: 4px; opacity: 0">佔位用</div>

    <!-- 提示框區塊 -->
    <div
      v-show="isHover"
      class="p-3 rounded-md shadow-sm shadow-black bg-white text-black min-w-52"
    >
      <!-- 單字 -->
      <h2 class="font-bold mb-1 text-lg">
        {{ word.text }}
      </h2>
      <!-- 解釋 -->
      <ul class="mb-3">
        <li v-for="(explain, index) in word.explains" :key="index">
          {{ explain }}
        </li>
      </ul>
      <!-- 例句 -->
      <div class="text-sm mb-3 h-20 max-h-28 overflow-y-auto text-slate-900 shadow-inner">
        {{ word.sentence }}
      </div>
      <button
        class="hover:bg-red-500 text-red-700 hover:text-white font-semibold py-1 px-4 border border-red-500 rounded"
        @click="$emit('remove-word', word)"
      >
        remove word
      </button>
    </div>
  </div>
</template>
