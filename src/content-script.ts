import { buffer, debounceTime, filter, fromEvent, map } from 'rxjs'
import { createApp, h, ref } from 'vue'
import Tooltip from './components/Tooltip.vue'

const ROOT_ID = 'words_root'

const rootEl = createRootElement(ROOT_ID)
setupRootElementStyle(rootEl)

createApp({
  setup() {
    const word = ref('')
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

    doubleClick$.subscribe(({ text, event }) => {
      showTooltip.value = true
      word.value = text!
      const e = event as PointerEvent
      tooltipPosition.value = {
        left: e.clientX,
        top: e.clientY + window.scrollY
      }
    })

    return () =>
      h(Tooltip, {
        left: tooltipPosition.value.left,
        top: tooltipPosition.value.top,
        word: word.value,
        sentence: 'just a test',
        show: showTooltip.value
      })
  }
}).mount(`#${ROOT_ID}`)

function createRootElement(id: string) {
  const root = document.createElement('div')
  root.id = id
  document.body.appendChild(root)
  return root
}

function setupRootElementStyle(el: HTMLElement) {
  el.style.position = 'absolute'
  el.style.left = '0'
  el.style.top = '0'
  el.style.zIndex = '1000'
}
