import { h, View } from 'hyperapp';
import { ClipperView } from '../components/views/ClipperView';
import { LoginView } from '../components/views/LoginView';
import { Actions } from './actions';
import { State } from './state';

export const view: View<State, Actions> = (state, actions) => (
  <div>
    <LoginView />
    <ClipperView />
  </div>
);
