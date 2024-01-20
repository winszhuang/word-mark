export function allLeafNodes(node: Node, filter: (node: Node) => boolean) {
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

export function getTextBoundingClientRect(node: Node, text: string) {
  if (node.nodeType !== Node.TEXT_NODE) {
    throw new Error('Node must be a text node')
  }

  const textContent = node.textContent
  if (!textContent) {
    throw new Error('Text node has no text content')
  }
  const index = textContent.indexOf(text)

  if (index === -1) {
    throw new Error('Text not found in node')
  }

  const range = document.createRange()
  range.setStart(node, index)
  range.setEnd(node, index + text.length)

  return range.getBoundingClientRect()
}
