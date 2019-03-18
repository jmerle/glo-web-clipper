import { View } from 'hyperapp';
import { Actions } from './actions';
import { State } from './state';

export const view: View<State, Actions> = (state, actions) => (
  <div id="glo-web-clipper-container">
    <h1>Glo Web Clipper</h1>
  </div>
);
