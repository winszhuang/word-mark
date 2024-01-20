chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: 'options.html'
  })
})

chrome.storage.local.onChanged.addListener(async (change) => {
  // use for testing
  console.warn('此次storage的更新 : ')
  console.warn(change)
  console.warn('此次storage的更新 ---')
})
