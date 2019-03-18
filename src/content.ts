import { Message, MessageAction } from './utils/messaging';

function handleMessage(message: Message | any, sender: browser.runtime.MessageSender): void {
  if (sender.tab) {
    return;
  }

  switch (message.action) {
    case MessageAction.ToggleClipper:
      console.log('Toggling!');
      alert(browser.runtime.getURL('/callback.html'));
      break;
  }
}

browser.runtime.onMessage.addListener(handleMessage);
