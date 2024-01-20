export function extractSentenceFromClick(targetElement: Element): string {
  let element: Element = targetElement
  for (let index = 0; index < 5; index++) {
    const onlyOneWord = isSingleWord(targetElement.textContent || '')
    if (!onlyOneWord || !element.parentElement) {
      return targetElement.textContent || ''
    }
    element = element.parentElement
  }
  return element.textContent || ''
}

function isSingleWord(input: string): boolean {
  return /^\S+$/.test(input)
}
