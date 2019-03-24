import { h, View } from 'hyperapp';
import { ClipperView } from '../components/views/ClipperView';
import { SettingsView } from '../components/views/SettingsView';
import { Actions } from './actions';
import { State } from './state';

export const view: View<State, Actions> = (state, actions) => (
  <div>{state.accessToken === null || state.settingsVisible ? <SettingsView /> : <ClipperView />}</div>
);
