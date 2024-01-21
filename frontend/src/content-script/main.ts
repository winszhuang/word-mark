import { createApp } from 'vue'
import ContentScript from './ContentScript.vue'
import { ROOT_ID } from './constants/constants'
import '../style.css'

const rootEl = createRootElement(ROOT_ID)
setupRootElementStyle(rootEl)
createApp(ContentScript).mount(`#${ROOT_ID}`)

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
