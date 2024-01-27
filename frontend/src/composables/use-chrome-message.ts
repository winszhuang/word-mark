import { UpdateWordsMessage, RenderWordsMessage, ChromeMessage } from '@/types/message'
import { Subject } from 'rxjs'
import { useChrome } from './use-chrome'
import { Event } from '../enums/event.enum'

export function useChromeMessage() {
  const { onMessageUpdate } = useChrome()
  const wordsUpdate$ = new Subject<UpdateWordsMessage>()
  const renderNotify$ = new Subject<RenderWordsMessage>()

  onMessageUpdate.subscribe((req: ChromeMessage<any>) => {
    switch (req.event) {
      case Event.UPDATE_WORDS:
        wordsUpdate$.next(req)
        break
      case Event.RENDER_WORDS:
        renderNotify$.next(req)
        break
    }
  })

  return {
    onWordsUpdate: wordsUpdate$,
    onRenderNotify: renderNotify$
  }
}
