<script setup lang="ts">
import { buffer, debounceTime, filter, fromEvent, map } from 'rxjs'
import { ref } from 'vue'
import { translate } from '../utils/google-translate'
import { extractSentenceFromClick } from '../utils/sentence'
import { ROOT_ID } from './constants/constants'
import Swal from 'sweetalert2'
import Tooltip from './components/Tooltip.vue'

const word = ref<Word>({ text: '', sentence: '', explains: [] })
const showTooltip = ref(false)
const tooltipPosition = ref({ left: 0, top: 0 })
const click$ = fromEvent(document, 'click')

const clickOutsideTooltip$ = click$.pipe(
  filter((e) => {
    const el = e.target as HTMLElement
    const isTooltipEl = el.closest(`#${ROOT_ID}`)
    return !isTooltipEl
  })
)

clickOutsideTooltip$.subscribe(() => {
  showTooltip.value = false
})

const doubleClick$ = click$.pipe(
  buffer(click$.pipe(debounceTime(250))),
  filter((clickArray) => clickArray.length === 2),
  map((clickArray) => {
    const selectedText = window.getSelection()?.toString() || ''
    const cleanText = selectedText.replace(/[^a-zA-Z\s]/g, '')
    return {
      text: cleanText.trim().length > 0 ? cleanText : null,
      event: clickArray[1] // 第二次點擊的事件
    }
  }),
  filter((result) => result.text !== null)
)

doubleClick$.subscribe(async ({ text, event }) => {
  const result = await translate({ text: text! })
  if (!result) {
    Swal.fire({
      title: 'Error',
      text: 'fail to get translate data!!',
      icon: 'error',
      confirmButtonText: 'confirm'
    })
    return
  }
  word.value = {
    text: result.text,
    sentence: extractSentenceFromClick(event.target as HTMLElement) || '',
    explains: result.detailed ? result.detailed : result.result || []
  }
  console.log('word.value', word.value)
  const e = event as PointerEvent
  tooltipPosition.value = {
    left: e.clientX,
    top: e.clientY + window.scrollY
  }
  showTooltip.value = true
})

const onSave = (word: Word) => {
  Swal.fire({
    title: 'Save Word Success!',
    text: `you save the word [${word.text}] success!`,
    icon: 'success',
    confirmButtonText: 'confirm'
  })
}
</script>

<template>
  <Tooltip
    :left="tooltipPosition.left"
    :top="tooltipPosition.top"
    :show="showTooltip"
    :word="word"
    @save="onSave"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
