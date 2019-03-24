import { ActionResult, ActionsType } from 'hyperapp';
import { StatusCheckState } from '../components/form/StatusCheck';
import { hasBoardReadScope, hasBoardWriteScope, isAccessTokenValid } from '../utils/api';
import { config } from '../utils/config';
import { State } from './state';

export interface Actions {
  setVisible: (visible: boolean) => (state: State) => ActionResult<State>;
  setSettingsVisible: (settingsVisible: boolean) => (state: State) => ActionResult<State>;
  setAccessToken: (accessToken: string) => (state: State) => ActionResult<State>;
  setNewAccessToken: (newAccessToken: string) => (state: State) => ActionResult<State>;
  saveNewAccessToken: () => (state: State) => ActionResult<State>;
  setAccessTokenChecksVisible: (accessTokenChecksVisible: boolean) => (state: State) => ActionResult<State>;
  setBoardReadState: (boardReadState: StatusCheckState) => (state: State) => ActionResult<State>;
  setBoardWriteState: (boardWriteState: StatusCheckState) => (state: State) => ActionResult<State>;
}

export const actions: ActionsType<State, Actions> = {
  setVisible: visible => state => ({
    ...state,
    visible,
  }),

  setSettingsVisible: settingsVisible => state => ({
    ...state,
    settingsVisible,
  }),

  setAccessToken: accessToken => state => ({
    ...state,
    accessToken,
  }),

  setNewAccessToken: newAccessToken => state => ({
    ...state,
    newAccessToken,
  }),

  saveNewAccessToken: () => async (state, currentActions) => {
    const { newAccessToken } = state;

    if (isAccessTokenValid(newAccessToken)) {
      currentActions.setBoardReadState(StatusCheckState.Checking);
      currentActions.setBoardWriteState(StatusCheckState.Checking);
      currentActions.setAccessTokenChecksVisible(true);

      const hasBoardRead = await hasBoardReadScope(newAccessToken);
      currentActions.setBoardReadState(hasBoardRead ? StatusCheckState.Success : StatusCheckState.Failed);

      const hasBoardWrite = await hasBoardWriteScope(newAccessToken);
      currentActions.setBoardWriteState(hasBoardWrite ? StatusCheckState.Success : StatusCheckState.Failed);

      if (hasBoardRead && hasBoardWrite) {
        await config.setAccessToken(newAccessToken);
        currentActions.setSettingsVisible(false);
      }
    }
  },

  setAccessTokenChecksVisible: accessTokenChecksVisible => state => ({
    ...state,
    accessTokenChecksVisible,
  }),

  setBoardReadState: boardReadState => state => ({
    ...state,
    boardReadState,
  }),

  setBoardWriteState: boardWriteState => state => ({
    ...state,
    boardWriteState,
  }),
};
