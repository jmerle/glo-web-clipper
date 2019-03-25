import { ActionResult, ActionsType } from 'hyperapp';
import { Clipper } from '../clippers/Clipper';
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

  runClipper: (clipper: Clipper) => (state: State) => ActionResult<State>;

  setIncludeLink: (includeLink: boolean) => (state: State) => ActionResult<State>;
  setCurrentImage: (currentImage: string) => (state: State) => ActionResult<State>;
}

export const actions: ActionsType<State, Actions> = {
  setVisible: (visible: boolean) => (state: State) => ({
    ...state,
    visible,
  }),

  setSettingsVisible: (settingsVisible: boolean) => (state: State) => ({
    ...state,
    settingsVisible,
  }),

  setAccessToken: (accessToken: string) => (state: State) => ({
    ...state,
    accessToken,
  }),

  setNewAccessToken: (newAccessToken: string) => (state: State) => ({
    ...state,
    newAccessToken,
  }),

  saveNewAccessToken: () => async (state: State, act: Actions) => {
    const { newAccessToken } = state;

    if (isAccessTokenValid(newAccessToken)) {
      act.setBoardReadState(StatusCheckState.Checking);
      act.setBoardWriteState(StatusCheckState.Checking);
      act.setAccessTokenChecksVisible(true);

      const hasBoardRead = await hasBoardReadScope(newAccessToken);
      act.setBoardReadState(hasBoardRead ? StatusCheckState.Success : StatusCheckState.Failed);

      const hasBoardWrite = await hasBoardWriteScope(newAccessToken);
      act.setBoardWriteState(hasBoardWrite ? StatusCheckState.Success : StatusCheckState.Failed);

      if (hasBoardRead && hasBoardWrite) {
        await config.setAccessToken(newAccessToken);
        act.setSettingsVisible(false);
      }
    }
  },

  setAccessTokenChecksVisible: (accessTokenChecksVisible: boolean) => (state: State) => ({
    ...state,
    accessTokenChecksVisible,
  }),

  setBoardReadState: (boardReadState: StatusCheckState) => (state: State) => ({
    ...state,
    boardReadState,
  }),

  setBoardWriteState: (boardWriteState: StatusCheckState) => (state: State) => ({
    ...state,
    boardWriteState,
  }),

  runClipper: (clipper: Clipper) => async (state: State, act: Actions) => {
    act.setVisible(false);
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const image = await clipper.getImage();
      act.setCurrentImage(image);
    } catch (err) {
      console.error(err);
    }

    act.setVisible(true);
  },

  setIncludeLink: includeLink => (state: State) => ({
    ...state,
    includeLink,
  }),

  setCurrentImage: (currentImage: string) => (state: State) => ({
    ...state,
    currentImage,
  }),
};
