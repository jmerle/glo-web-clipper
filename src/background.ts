import { Message, MessageAction, sendToContent } from './utils/messaging';

const isChrome = window.navigator.userAgent.toLowerCase().includes('chrome');

// Taken from Evernote Web Clipper
const forbiddenUrlPrefixes = [
  'https://safari-extensions.apple.com',
  'ms-appx-web://',
  'https://addons.mozilla.org/',
  'chrome://',
  'about:',
  'https://addons.opera.com',
  'https://chrome.google.com/extensions',
  'https://chrome.google.com/webstore',
  'https://www.msn.com/spartan/ntp',
];

function onBrowserActionClicked(tab: browser.tabs.Tab): void {
  if (tab.url && forbiddenUrlPrefixes.some(prefix => tab.url.startsWith(prefix))) {
    const message = 'Due to restrictions set by the browser, you cannot clip this page.';

    console.error(message);

    // alert'ing in the background script only shows an alert message on Chrome
    if (isChrome) {
      alert(message);
    }
  } else {
    sendToContent(tab.id, MessageAction.ToggleClipper);
  }
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
