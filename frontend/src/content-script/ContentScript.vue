<script setup lang="ts">
import Tooltip from './components/Tooltip.vue'
import Hint from './components/Hint.vue'
import { onMounted, ref, shallowRef, watch } from 'vue'
import { useTooltip } from '../composables/use-tooltip'
import { useWords } from '../composables/use-words.ts'
import { useChromeMessage } from '../composables/use-chrome-message'
import { allLeafNodes, getTextBoundingClientRects } from '../utils/node.ts'
import Swal from 'sweetalert2'

const { tooltipPosition, showTooltip, currentWord } = useTooltip()

type HintInfo = {
  left: number
  top: number
  width: number
  height: number
  word: Word
  isShow: boolean
}

const wordStore = useWords()
const hints = ref<HintInfo[]>([])
const words = shallowRef<Record<string, Word>>({})
const allTextNodes = allLeafNodes(
  document.body,
  (n) => n.textContent?.trim().length !== 0 && n.nodeName !== '#comment'
)

function mountHints(wordMap: Record<string, Word>) {
  hints.value = []
  allTextNodes.forEach((node) => {
    const textContent = node.textContent
    if (!textContent || textContent.length === 0) return

    Object.entries(wordMap).forEach(([text, word]) => {
      const isTextInSentence = textContent.toLowerCase().includes(text)
      if (isTextInSentence && node.parentElement) {
        const rects = getTextBoundingClientRects(node, text)
        const nodeHints = rects.map((rect) => {
          const { left, top, width, height } = rect
          return {
            left,
            top: top + window.scrollY,
            width,
            height,
            isShow: true,
            word
          }
        })
        hints.value.push(...nodeHints)
      }
    })
  })
}

async function onRemoveWord(word: Word) {
  const isSuccess = await wordStore.delete(word.text)
  Swal.fire({
    title: '刪除單字',
    text: isSuccess ? '刪除成功' : '刪除失敗',
    icon: isSuccess ? 'success' : 'error',
    confirmButtonText: '確認'
  })
}

async function onSave(word: Word) {
  const isSuccess = await wordStore.add(word)
  Swal.fire({
    title: '新增單字',
    text: isSuccess ? '新增單字成功' : '新增單字失敗',
    icon: isSuccess ? 'success' : 'error',
    confirmButtonText: '確認'
  })
}

onMounted(() => {
  wordStore.getAll().then((w) => {
    words.value = w
  })
})

const { onWordsUpdate, onRenderNotify, onAlertNotify } = useChromeMessage()
onWordsUpdate.subscribe((res) => {
  words.value = res.data
})
onRenderNotify.subscribe(() => {
  mountHints(words.value)
})
onAlertNotify.subscribe((res) => {
  const { title, text, icon, confirmButtonText } = res.data
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText
  })
})

watch(words, (w) => {
  mountHints(w)
})
</script>

<template>
  <Tooltip
    :left="tooltipPosition.left"
    :top="tooltipPosition.top"
    :show="showTooltip"
    :word="currentWord"
    @save="onSave"
  />
  <section class="wds-absolute">
    <Hint
      v-for="(hint, index) in hints"
      :key="index"
      :left="hint.left"
      :top="hint.top"
      :width="hint.width"
      :height="hint.height"
      :word="hint.word"
      @remove-word="onRemoveWord"
    />
  </section>
  <section class="wds-absolute"></section>
</template>
../composables/use-chrome-message.ts
