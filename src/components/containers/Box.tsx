import { Component, h } from 'hyperapp';
import { Actions } from '../../app/actions';
import { State } from '../../app/state';

interface Attributes {
  showSettingsButton?: boolean;
}

export const Box: Component<Attributes, State, Actions> = ({ showSettingsButton = true }, children) => (
  state,
  actions,
) => (
  <div class={`gwc-box${state.visible ? '' : ' gwc-box-hidden'}`}>
    {showSettingsButton && (
      <span className="gwc-box-btn gwc-login-btn" onclick={() => actions.setSettingsVisible(true)}>
        Settings
      </span>
    )}

    <span className="gwc-box-btn gwc-close-btn" onclick={() => actions.setVisible(false)}>
      Close
    </span>

    {children}
  </div>
);
