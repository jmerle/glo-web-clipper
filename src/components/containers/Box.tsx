import { Component, h } from 'hyperapp';
import { Actions } from '../../app/actions';
import { State } from '../../app/state';

export const Box: Component<{}, State, Actions> = ({}, children) => (state: State, actions: Actions) => (
  <div class={`gwc-box${state.visible ? '' : ' gwc-box-hidden'}`}>
    <span className="gwc-close-btn" onclick={() => actions.setVisible(false)}>
      ✕
    </span>

    {children}
  </div>
);
