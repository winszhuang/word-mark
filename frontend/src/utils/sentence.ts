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

export function isSingleWord(input: string): boolean {
  input = input.trim()
  return /^[A-Za-z]+$/.test(input)
}

export function isSentence(str: string): boolean {
  str = str.trim()
  const chunks = str.split(' ')
  if (chunks.length <= 1) {
    return false
  }

  for (const chunk of chunks) {
    if (!isSingleWord(chunk.trim())) {
      return false
    }
  }
  return true
}
