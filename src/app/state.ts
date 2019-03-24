import { StatusCheckState } from '../components/form/StatusCheck';

export interface State {
  visible: boolean;
  settingsVisible: boolean;
  accessToken: string;
  newAccessToken: string;
  accessTokenChecksVisible: boolean;
  boardReadState: StatusCheckState;
  boardWriteState: StatusCheckState;
  currentImage: string;
}

export const state: State = {
  visible: true,
  settingsVisible: false,
  accessToken: null,
  newAccessToken: null,
  accessTokenChecksVisible: false,
  boardReadState: StatusCheckState.Checking,
  boardWriteState: StatusCheckState.Checking,
  currentImage: null,
};
