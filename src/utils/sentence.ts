export function extractSentenceFromClick(e: PointerEvent): string | null {
  if (e.target && e.target instanceof Element) {
    let element: Element | null = e.target
    let targetText = element.textContent?.trim() || ''
    console.log('targetText', targetText)

    while (element && !targetText.includes(' ') && element.parentElement) {
      element = element.parentElement
      targetText = element.textContent?.trim() || ''
    }

    if (targetText) {
      const sentenceRegex = new RegExp(`[^.!?]*${targetText}[^.!?]*[.!?]`, 'gi')
      const sentenceMatch = targetText.match(sentenceRegex)

      if (sentenceMatch && sentenceMatch.length > 0) {
        return sentenceMatch[0].trim()
      }
    }
  }
  return null
}
