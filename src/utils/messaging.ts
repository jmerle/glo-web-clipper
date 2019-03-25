export interface Message {
  action: MessageAction;
  payload?: any;
}

export enum MessageAction {
  ToggleClipper,
  CapturePage,
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

export function capturePage(): Promise<string> {
  return new Promise(resolve => {
    const handleMessage = (message: Message | any, sender: browser.runtime.MessageSender) => {
      if (sender.tab) {
        return;
      }

      if (message.action === MessageAction.CapturePage) {
        browser.runtime.onMessage.removeListener(handleMessage);
        resolve(message.payload.data);
      }
    };

    browser.runtime.onMessage.addListener(handleMessage);

    sendToBackground(MessageAction.CapturePage);
  });
}
