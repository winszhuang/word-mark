export function extractSentenceFromClick(targetElement: Element): string | null {
  let element: Element | null = targetElement
  let targetText = element.textContent?.trim() || ''

  // 如果文本是单个单词，则继续向上寻找直到找到完整句子
  while (element && !targetText.includes(' ') && element.parentElement) {
    element = element.parentElement as HTMLElement
    targetText = element.textContent?.trim() || ''
  }

  // 一旦找到包含多个单词的元素，尝试提取包含目标文本的完整句子
  if (targetText) {
    const sentenceRegex = new RegExp(`[^.!?]*${targetText}[^.!?]*[.!?]`, 'gi')
    const sentenceMatch = targetText.match(sentenceRegex)

    if (sentenceMatch && sentenceMatch.length > 0) {
      return sentenceMatch[0].trim()
    }
  }
  return null
}
