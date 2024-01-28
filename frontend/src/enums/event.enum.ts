export enum Event {
  UPDATE_WORDS = 'UPDATE_WORDS',
  RENDER_WORDS = 'RENDER_WORDS',
  ALERT = 'ALERT',
  GLOBAL_ENABLE = 'GLOBAL_ENABLE',
  TAB_ENABLE = 'TAB_ENABLE'
}

export enum EventSource {
  CONTENT_SCRIPT = 'CONTENT_SCRIPT',
  BACKGROUND = 'BACKGROUND',
  POPUP = 'POPUP'
}
