import { app } from 'hyperapp';
import { Actions, actions } from './app/actions';
import { state } from './app/state';
import { view } from './app/view';
import { StatusCheckState } from './components/form/StatusCheck';
import { config } from './utils/config';
import { Message, MessageAction } from './utils/messaging';

// tslint:disable-next-line no-var-requires
require('../styles/content.scss');

let main: Actions = null;
let initiating = false;

async function toggle(): Promise<void> {
  if (main == null && initiating) {
    return;
  }

  initiating = true;

  if (main === null) {
    state.accessToken = await config.getAccessToken();

    const containerElem = document.createElement('div');
    containerElem.setAttribute('id', 'glo-web-clipper');
    document.body.appendChild(containerElem);

    main = app(state, actions, view, containerElem);

    config.onAccessTokenChanged(accessToken => {
      main.setAccessToken(accessToken);

      if (accessToken !== null) {
        main.setSettingsVisible(false);
        main.resetClipper();
      }
    });

    if (state.accessToken !== null) {
      main.setAccessTokenChecksVisible(true);
      main.setBoardReadState(StatusCheckState.Success);
      main.setBoardWriteState(StatusCheckState.Success);
      main.setNewAccessToken(state.accessToken);
      main.resetClipper();
    }
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
