import { ActionResult, ActionsType } from 'hyperapp';
import { State } from './state';

export interface Actions {
  setVisible: (visible: boolean) => (state: State) => ActionResult<State>;
  setAccessToken: (accessToken: string) => (state: State) => ActionResult<State>;
}

export const actions: ActionsType<State, Actions> = {
  setVisible: visible => state => ({
    ...state,
    visible,
  }),

  setAccessToken: accessToken => state => ({
    ...state,
    accessToken,
  }),
};
