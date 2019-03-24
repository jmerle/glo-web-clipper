import { Clipper } from '../clippers/Clipper';
import { FullPageClipper } from '../clippers/FullPageClipper';
import { SelectionClipper } from '../clippers/SelectionClipper';
import { VisiblePageClipper } from '../clippers/VisiblePageClipper';
import { StatusCheckState } from '../components/form/StatusCheck';

export interface State {
  visible: boolean;
  settingsVisible: boolean;

  accessToken: string;
  newAccessToken: string;
  accessTokenChecksVisible: boolean;

  boardReadState: StatusCheckState;
  boardWriteState: StatusCheckState;

  clippers: Clipper[];

  includeLink: boolean;
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

  clippers: [new VisiblePageClipper(), new FullPageClipper(), new SelectionClipper()],

  includeLink: false,
  currentImage: null,
};
