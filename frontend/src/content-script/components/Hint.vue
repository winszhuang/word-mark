<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useElementHover } from '../../composables/use-element-hover.ts'

const props = defineProps<{
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

const highlightedSentenceSplit = computed(() => {
  let parts = props.word.sentence.toLowerCase().split(props.word.text)
  parts = parts.flatMap((part, index) =>
    index < parts.length - 1 ? [part, props.word.text] : [part]
  )
  return parts.map((part) => ({
    text: part,
    isHighlight: part === props.word.text
  }))
})
</script>

<template>
  <div
    ref="hint"
    :style="{ left: left + 'px', top: top + 'px', width: width + 'px' }"
    class="wds-absolute"
  >
    <!-- 佔位 -->
    <div :style="{ height: height + 'px', maxWidth: width + 'px' }"></div>

    <!-- 下滑線 -->
    <div
      style="z-index: -1; height: 1px; position: absolute; background-color: red"
      :style="{ width: width + 'px' }"
    ></div>

    <div style="line-height: 4px; opacity: 0">佔位用</div>

    <!-- 提示框區塊 -->
    <div
      v-show="isHover"
      class="wds-p-3 wds-rounded-md wds-shadow-sm wds-shadow-black wds-bg-white wds-text-black wds-min-w-52"
    >
      <!-- 單字 -->
      <h2 class="wds-font-bold wds-mb-1 wds-text-lg">
        {{ word.text }}
      </h2>
      <!-- 解釋 -->
      <ul class="wds-mb-3">
        <li v-for="(explain, index) in word.explains" :key="index">
          {{ explain }}
        </li>
      </ul>
      <!-- 例句 -->
      <div
        class="wds-text-sm wds-mb-3 wds-h-20 wds-max-h-28 wds-overflow-y-auto wds-text-slate-900 wds-shadow-inner"
      >
        <span
          :style="{ color: sentence.isHighlight ? 'red' : '' }"
          v-for="(sentence, index) in highlightedSentenceSplit"
          :key="index + sentence.text"
          >{{ sentence.text }}</span
        >
      </div>
      <button
        class="hover:wds-bg-red-500 wds-text-red-700 hover:wds-text-white wds-font-semibold wds-py-1 wds-px-4 wds-border wds-border-red-500 wds-rounded"
        @click="$emit('remove-word', word)"
      >
        remove word
      </button>
    </div>
  </div>
</template>
