import { app } from 'hyperapp';
import { Actions, actions } from './app/actions';
import { state } from './app/state';
import { view } from './app/view';
import { Message, MessageAction } from './utils/messaging';

// tslint:disable-next-line no-var-requires
require('../styles/content.scss');

let main: Actions = null;

function toggle(): void {
  if (main === null) {
    const containerElem = document.createElement('div');

    containerElem.setAttribute('id', 'glo-web-clipper');
    document.body.appendChild(containerElem);

    main = app(state, actions, view, containerElem);
  } else {
    main.setVisible(true);
  }
}

function handleMessage(message: Message | any, sender: browser.runtime.MessageSender): void {
  if (sender.tab) {
    return;
  }

  switch (message.action) {
    case MessageAction.ToggleClipper:
      toggle();
      break;
  }
}

browser.runtime.onMessage.addListener(handleMessage);
