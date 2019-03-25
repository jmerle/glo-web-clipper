import { ActionResult, ActionsType } from 'hyperapp';
import { Board } from '../api/models';
import { Clipper } from '../clippers/Clipper';
import { SelectItem } from '../components/form/Select';
import { StatusCheckState } from '../components/form/StatusCheck';
import {
  createAttachment,
  createCard,
  createComment,
  getBoards,
  getCards,
  hasBoardReadScope,
  hasBoardWriteScope,
  isAccessTokenValid,
} from '../utils/api';
import { config } from '../utils/config';
import { State } from './state';

type ActionReturnType = ((state: State, actions: Actions) => ActionResult<State>) | ActionResult<State>;

export interface Actions {
  setVisible: (visible: boolean) => ActionReturnType;
  setSettingsVisible: (settingsVisible: boolean) => ActionReturnType;

  resetClipper: () => ActionReturnType;

  setAccessToken: (accessToken: string) => ActionReturnType;
  setNewAccessToken: (newAccessToken: string) => ActionReturnType;
  saveNewAccessToken: () => ActionReturnType;
  setAccessTokenChecksVisible: (accessTokenChecksVisible: boolean) => ActionReturnType;

  setBoardReadState: (boardReadState: StatusCheckState) => ActionReturnType;
  setBoardWriteState: (boardWriteState: StatusCheckState) => ActionReturnType;

  runClipper: (clipper: Clipper) => ActionReturnType;

  setIncludeLink: (includeLink: boolean) => ActionReturnType;
  setCurrentImage: (currentImage: string) => ActionReturnType;

  setCreateNewCard: (createNewCard: boolean) => ActionReturnType;

  setRawBoards: (boardsData: Board[]) => ActionReturnType;

  setBoards: (boards: SelectItem[]) => ActionReturnType;
  setBoardsLoading: (boardsLoading: boolean) => ActionReturnType;
  setSelectedBoard: (selectedBoard: string) => ActionReturnType;

  setColumns: (columns: SelectItem[]) => ActionReturnType;
  setColumnsLoading: (columnsLoading: boolean) => ActionReturnType;
  setSelectedColumn: (selectedColumn: string) => ActionReturnType;

  setCards: (cards: SelectItem[]) => ActionReturnType;
  setCardsLoading: (cardsLoading: boolean) => ActionReturnType;
  setSelectedCard: (selectedCard: string) => ActionReturnType;
  setCardName: (cardName: string) => ActionReturnType;

  loadBoards: () => ActionReturnType;
  loadColumns: () => ActionReturnType;
  loadCards: () => ActionReturnType;

  selectBoard: (boardId: string) => ActionReturnType;
  selectColumn: (columnId: string) => ActionReturnType;

  setIsSaving: (isSaving: boolean) => ActionReturnType;

  save: () => ActionReturnType;
}

export const actions: ActionsType<State, Actions> = {
  setVisible: (visible: boolean) => (state: State) => ({ ...state, visible }),
  setSettingsVisible: (settingsVisible: boolean) => (state: State) => ({ ...state, settingsVisible }),

  resetClipper: () => async (state: State, act: Actions) => {
    if (state.accessToken !== null && !state.settingsVisible) {
      act.loadBoards();
    }
  },

  setAccessToken: (accessToken: string) => (state: State) => {
    if (accessToken === null) {
      if (state.boardReadState === StatusCheckState.Failed || state.boardWriteState === StatusCheckState.Failed) {
        return { ...state, accessToken, accessTokenChecksVisible: true };
      }
    }

    return { ...state, accessToken, newAccessToken: accessToken, accessTokenChecksVisible: false };
  },

  setNewAccessToken: (newAccessToken: string) => (state: State) => ({ ...state, newAccessToken }),

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
        if (state.newAccessToken !== state.accessToken) {
          await config.setAccessToken(newAccessToken);
        }

        act.setSettingsVisible(false);
      } else if (state.newAccessToken === state.accessToken) {
        await config.setAccessToken(null);
      }
    }
  },

  setAccessTokenChecksVisible: (accessTokenChecksVisible: boolean) => (state: State) => ({
    ...state,
    accessTokenChecksVisible,
  }),

  setBoardReadState: (boardReadState: StatusCheckState) => (state: State) => ({ ...state, boardReadState }),
  setBoardWriteState: (boardWriteState: StatusCheckState) => (state: State) => ({ ...state, boardWriteState }),

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

  setIncludeLink: (includeLink: boolean) => (state: State) => ({ ...state, includeLink }),
  setCurrentImage: (currentImage: string) => (state: State) => ({ ...state, currentImage }),

  setCreateNewCard: (createNewCard: boolean) => (state: State) => ({ ...state, createNewCard }),

  setRawBoards: (rawBoards: boolean) => (state: State) => ({ ...state, rawBoards }),

  setBoards: (boards: SelectItem[]) => (state: State) => ({ ...state, boards }),
  setBoardsLoading: (boardsLoading: boolean) => (state: State) => ({ ...state, boardsLoading }),
  setSelectedBoard: (selectedBoard: string) => (state: State) => ({ ...state, selectedBoard }),

  setColumns: (columns: SelectItem[]) => (state: State) => ({ ...state, columns }),
  setColumnsLoading: (columnsLoading: boolean) => (state: State) => ({ ...state, columnsLoading }),
  setSelectedColumn: (selectedColumn: string) => (state: State) => ({ ...state, selectedColumn }),

  setCards: (cards: SelectItem[]) => (state: State) => ({ ...state, cards }),
  setCardsLoading: (cardsLoading: boolean) => (state: State) => ({ ...state, cardsLoading }),
  setSelectedCard: (selectedCard: boolean) => (state: State) => ({ ...state, selectedCard }),
  setCardName: (cardName: string) => (state: State) => ({ ...state, cardName }),

  loadBoards: () => async (state: State, act: Actions) => {
    act.setBoardsLoading(true);

    const rawBoards = await getBoards(state.accessToken);
    act.setRawBoards(rawBoards);

    act.setBoards(
      rawBoards.map(board => ({
        value: board.id,
        label: board.name,
      })),
    );

    act.setSelectedBoard(null);
    act.setBoardsLoading(false);
  },

  loadColumns: () => async (state: State, act: Actions) => {
    act.setColumnsLoading(true);

    const board = state.rawBoards.find(b => b.id === state.selectedBoard);
    act.setColumns(
      board.columns.map(column => ({
        value: column.id,
        label: column.name,
      })),
    );

    act.setSelectedColumn(null);
    act.setColumnsLoading(false);
  },

  loadCards: () => async (state: State, act: Actions) => {
    act.setCardsLoading(true);

    const cards = await getCards(state.accessToken, state.selectedBoard, state.selectedColumn);
    act.setCards(
      cards.map(card => ({
        value: card.id,
        label: card.name,
      })),
    );

    act.setSelectedCard(null);
    act.setCardsLoading(false);
  },

  selectBoard: (boardId: string) => async (state: State, act: Actions) => {
    act.setSelectedBoard(boardId);
    act.loadColumns();
  },

  selectColumn: (columnId: string) => async (state: State, act: Actions) => {
    act.setSelectedColumn(columnId);
    act.loadCards();
  },

  setIsSaving: (isSaving: boolean) => (state: State) => ({ ...state, isSaving }),

  save: () => async (state: State, act: Actions) => {
    act.setIsSaving(true);

    try {
      const { accessToken, includeLink, currentImage } = state;
      const boardId = state.selectedBoard;
      const columnId = state.selectedColumn;
      let cardId = state.selectedCard;

      if (state.createNewCard) {
        cardId = await createCard(accessToken, boardId, columnId, state.cardName);
      }

      const commentParts: string[] = [];
      const currentUrl = window.location.href;

      if (currentImage !== null) {
        const response = await fetch(state.currentImage);
        const blob = await response.blob();

        const attachmentUrl = await createAttachment(accessToken, boardId, cardId, blob);
        commentParts.push(`![Clipped image from ${currentUrl}](${attachmentUrl})`);
      }

      if (includeLink) {
        commentParts.push(`Link: ${currentUrl}`);
      }

      await createComment(accessToken, boardId, cardId, commentParts.join('\n'));
    } catch (err) {
      console.error(err);
    }

    act.setIsSaving(false);
  },
};
