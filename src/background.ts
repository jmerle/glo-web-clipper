import { MessageAction, sendToContent } from './utils/messaging';

browser.browserAction.onClicked.addListener(tab => {
  sendToContent(tab.id, MessageAction.ToggleClipper);
});
