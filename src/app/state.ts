import { Board } from '../api/models';
import { Clipper } from '../clippers/Clipper';
import { FullPageClipper } from '../clippers/FullPageClipper';
import { SelectionClipper } from '../clippers/SelectionClipper';
import { VisiblePageClipper } from '../clippers/VisiblePageClipper';
import { SelectItem } from '../components/form/Select';
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

  currentImage: string;
  includeLink: boolean;
  description: string;

  createNewCard: boolean;

  rawBoards: Board[];
  cardsDirty: boolean;
  savedCardUrl: string;

  boards: SelectItem[];
  boardsLoading: boolean;
  selectedBoard: string;

  columns: SelectItem[];
  columnsLoading: boolean;
  selectedColumn: string;

  cards: SelectItem[];
  cardsLoading: boolean;
  selectedCard: string;
  cardName: string;

  isSaving: boolean;
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

  currentImage: null,
  includeLink: false,
  description: null,

  createNewCard: true,

  rawBoards: [],
  cardsDirty: false,
  savedCardUrl: null,

  boards: [],
  boardsLoading: false,
  selectedBoard: null,

  columns: [],
  columnsLoading: false,
  selectedColumn: null,

  cards: [],
  cardsLoading: false,
  selectedCard: null,
  cardName: null,

  isSaving: false,
};
