import { ref } from 'vue'
import { extractSentenceFromClick } from '../utils/sentence'
import { translate } from '../utils/google-translate'
import { useWords } from './use-words'
import { buffer, debounceTime, filter, fromEvent, map } from 'rxjs'
import { ROOT_ID } from '../content-script/constants/constants'
import Swal from 'sweetalert2'

export function useTooltip() {
  const { wordHandler } = useWords()
  const currentWord = ref<Word>({ text: '', sentence: '', explains: [] })
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
        text: cleanText.trim(),
        event: clickArray[1] // 第二次點擊的事件
      }
    })
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
    currentWord.value = {
      text: result.text,
      sentence: extractSentenceFromClick(event.target as HTMLElement) || '',
      explains: result.detailed ? result.detailed : result.result || []
    }
    const e = event as PointerEvent
    tooltipPosition.value = { left: e.clientX, top: e.clientY + window.scrollY }
    showTooltip.value = true
  })

  const onSave = (word: Word) => {
    wordHandler.add(word)
  }

  return {
    tooltipPosition,
    showTooltip,
    currentWord,
    onSave
  }
}
