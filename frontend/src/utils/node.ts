export function allLeafNodes(node: Node, filter: (node: Node) => boolean = () => true) {
  const leafNodes: Node[] = []

  // 遞歸函數來遍歷所有子節點
  function traverse(currentNode: Node) {
    // 檢查當前節點是否是葉子節點
    if (!currentNode.hasChildNodes()) {
      // 應用過濾函數
      if (filter(currentNode)) {
        leafNodes.push(currentNode)
      }
    } else {
      // 遞歸處理每個子節點
      currentNode.childNodes.forEach(traverse)
    }
  }

  traverse(node)
  return leafNodes
}

export function getTextBoundingClientRects(node: Node, text: string) {
  if (node.nodeType !== Node.TEXT_NODE) {
    // eslint-disable-next-line no-debugger
    debugger
    throw new Error('Node must be a text node')
  }

  const textContent = node.textContent
  if (!textContent) {
    throw new Error('Text node has no text content')
  }

  let startIndex = 0
  const rects: DOMRect[] = []
  while (startIndex < textContent.length) {
    const index = textContent.indexOf(text, startIndex)
    if (index === -1) {
      break // No more matches
    }

    const range = document.createRange()
    range.setStart(node, index)
    range.setEnd(node, index + text.length)
    rects.push(range.getBoundingClientRect())

    startIndex = index + text.length // Update the start index
  }

  if (rects.length === 0) {
    throw new Error('Text not found in node')
  }

  return rects
}
