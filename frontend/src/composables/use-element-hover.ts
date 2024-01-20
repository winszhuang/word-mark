import { Ref, ref, watch } from 'vue'

// reference
// https://vueuse.org/core/useElementHover/#useelementhover
export interface UseElementHoverOptions {
  delayEnter?: number
  delayLeave?: number
}

export function useElementHover(
  el: Ref<HTMLElement | null>,
  options: UseElementHoverOptions = {}
): Ref<boolean> {
  const { delayEnter = 0, delayLeave = 0 } = options

  const isHovered = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const toggle = (entering: boolean) => {
    const delay = entering ? delayEnter : delayLeave
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }

    if (delay) {
      timer = setTimeout(() => (isHovered.value = entering), delay)
    } else {
      isHovered.value = entering
    }
  }

  if (!window) return isHovered

  const stopWatch = watch(
    () => el.value,
    (element) => {
      if (!element) return
      element.addEventListener('mouseenter', () => toggle(true), {
        passive: true
      })
      element.addEventListener('mouseleave', () => toggle(false), {
        passive: true
      })
      stopWatch()
    }
  )

  return isHovered
}
