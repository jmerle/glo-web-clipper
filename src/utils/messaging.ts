export interface Message {
  action: MessageAction;
  payload?: any;
}

export enum MessageAction {
  ToggleClipper,
}

// tslint:disable no-empty
export function sendToBackground(action: MessageAction, payload: any = {}): void {
  browser.runtime
    .sendMessage({ action, payload })
    .then(() => {})
    .catch(() => {});
}

export function sendToContent(tabId: number, action: MessageAction, payload: any = {}): void {
  browser.tabs
    .sendMessage(tabId, { action, payload })
    .then(() => {})
    .catch(() => {});
}
// tslint:enable no-empty
