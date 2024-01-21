import { describe, it, expect } from 'vitest'
import { isSingleWord, isSentence } from './sentence'

// html formatter https://webformatter.com/html

describe('isSingleWord', () => {
  it('one word', () => {
    expect(isSingleWord('Podcasts')).toBe(true)
  })

  it('no word', () => {
    expect(isSingleWord('')).toBe(false)
  })

  it('no word2', () => {
    expect(isSingleWord('\n\n    ')).toBe(false)
  })

  it('multi words', () => {
    expect(isSingleWord('Welcome to the SimpleWeb')).toBe(false)
  })

  it('number', () => {
    expect(isSingleWord('560')).toBe(false)
  })

  // it('url not ', () => {
  //   expect(isSingleWord('https://www.simpleweb.org/')).toBe(false)
  // })
  // more testcase
})

describe('isSentence', () => {
  it('single word', () => {
    expect(isSentence('Tutorials')).toBe(false)
  })
  it('no word', () => {
    expect(isSentence('')).toBe(false)
  })
  it('sentence', () => {
    expect(isSentence(' Network traces are available at the Simpleweb repository. ')).toBe(true)
  })
  it('sentence2', () => {
    expect(isSentence('A demonstration of what can be accomplished through ')).toBe(true)
  })
  it('sentence3', () => {
    expect(isSentence('"CSS Zen Garden"')).toBe(true)
  })
  it('sentence4', () => {
    expect(isSentence('\n\n    ')).toBe(false)
  })
  it('sentence5', () => {
    expect(
      isSentence('-based design. Select any style sheet from the list to load it into this page.')
    ).toBe(true)
  })
  it('sentence6', () => {
    expect(isSentence('\n' + '\t\t\t\t\t\t\t\tView All Designs\t\t\t\t\t\t\t')).toBe(true)
  })
  it('sentence6', () => {
    expect(
      isSentence(
        'Littering a dark and dreary road lay the past relics of browser-specific tags, incompatible '
      )
    ).toBe(true)
  })
  // it('sentence5', () => {
  //   expect(isSentence('"CSS Zen Garden"')).toBe(true)
  // })
})
