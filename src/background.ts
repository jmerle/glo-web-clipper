import { Message, MessageAction, sendToContent } from './utils/messaging';

function onBrowserActionClicked(tab: browser.tabs.Tab): void {
  sendToContent(tab.id, MessageAction.ToggleClipper);
}

async function handleMessage(message: Message | any, sender: browser.runtime.MessageSender): Promise<void> {
  if (!sender.tab) {
    return;
  }

  switch (message.action) {
    case MessageAction.CapturePage:
      const data = await browser.tabs.captureVisibleTab(null, { format: 'png', quality: 100 });
      sendToContent(sender.tab.id, MessageAction.CapturePage, { data });
      break;
  }
}

browser.browserAction.onClicked.addListener(onBrowserActionClicked);
browser.runtime.onMessage.addListener(handleMessage);
