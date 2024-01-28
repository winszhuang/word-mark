import { Subject } from 'rxjs'
import { Event } from '../enums/event.enum'
import { onMessage } from '../utils/chrome'

export function useChromeMessageEvent() {
  const wordsUpdate$ = new Subject<UpdateWordsMessage>()
  const renderNotify$ = new Subject<RenderWordsMessage>()
  const alertNotify$ = new Subject<AlertMessage>()
  const enableUpdate$ = new Subject<EnableMessage>()
  const tabEnableUpdate$ = new Subject<EnableMessage>()

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
      case Event.GLOBAL_ENABLE:
        enableUpdate$.next(req)
        break
      case Event.TAB_ENABLE:
        tabEnableUpdate$.next(req)
        break
    }
  })

  return {
    onWordsUpdate: wordsUpdate$,
    onRenderNotify: renderNotify$,
    onAlertNotify: alertNotify$,
    onEnableUpdate: enableUpdate$,
    onTabEnableUpdate: tabEnableUpdate$
  }
}
