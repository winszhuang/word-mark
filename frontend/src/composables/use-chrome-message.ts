import {
  UpdateWordsMessage,
  RenderWordsMessage,
  ChromeMessage,
  AlertMessage
} from '@/types/message'
import { Subject } from 'rxjs'
import { Event } from '../enums/event.enum'
import { onMessage } from '../utils/chrome'

export function useChromeMessage() {
  const wordsUpdate$ = new Subject<UpdateWordsMessage>()
  const renderNotify$ = new Subject<RenderWordsMessage>()
  const alertNotify$ = new Subject<AlertMessage>()

  onMessage((req: ChromeMessage<any>) => {
    switch (req.event) {
      case Event.UPDATE_WORDS:
        wordsUpdate$.next(req)
        break
      case Event.RENDER_WORDS:
        renderNotify$.next(req)
        break
      case Event.ALERT:
        alertNotify$.next(req)
        break
    }
  })

  return {
    onWordsUpdate: wordsUpdate$,
    onRenderNotify: renderNotify$,
    onAlertNotify: alertNotify$
  }
}
