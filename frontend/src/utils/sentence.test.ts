import { describe, it, expect } from 'vitest'
import { extractSentenceFromClick } from './sentence'
import { createHTMLElementFromHTML } from '../utils/html'

// html formatter https://webformatter.com/html

describe('extractSentenceFromClick', () => {
  it('點擊包含完整句子的元素', () => {
    const htmlStr = `
    <div class="VwiC3b yXK7lf lVm3ye r025kc hJNv6b Hdw6tb" style="-webkit-line-clamp: 2;">
        <span>There are a few ways to include these <em class="t55VCb">buttons</em> in your page: 1. Include the <em class="t55VCb">Tailwind</em> JIT in your page. ... 2. Add to your TailwindCSS Project. Copy &amp; Paste the&nbsp;...</span>
    </div>
    `

    const element = createHTMLElementFromHTML(htmlStr)
    const targetEl = element!.querySelector('.t55VCb')!

    const result = extractSentenceFromClick(targetEl)
    expect(result).toBe('There are a few ways to include these buttons in your page')
  })

  it('點擊只包含單字的元素', () => {
    const parentElement = document.createElement('div')
    parentElement.textContent = 'This is a full sentence. And another sentence.'

    const childElement = document.createElement('span')
    childElement.textContent = 'sentence'
    parentElement.appendChild(childElement)

    const result = extractSentenceFromClick(childElement)
    expect(result).toBe('This is a full sentence.')
  })

  // more testcase
})
