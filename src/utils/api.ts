import {
  AttachmentsApi,
  Board,
  BoardsApi,
  Card,
  CardsApi,
  ColumnsApi,
  CommentsApi,
  Configuration,
  GetBoardsFieldsEnum,
  GetCardsByColumnFieldsEnum,
  UsersApi,
} from '../api';

function getApiConfiguration(accessToken: string): Configuration {
  return new Configuration({ accessToken: `Bearer ${accessToken}` });
}

export function getAttachmentsApi(accessToken: string): AttachmentsApi {
  return new AttachmentsApi(getApiConfiguration(accessToken));
}

export function getBoardsApi(accessToken: string): BoardsApi {
  return new BoardsApi(getApiConfiguration(accessToken));
}

export function getCardsApi(accessToken: string): CardsApi {
  return new CardsApi(getApiConfiguration(accessToken));
}

export function getColumnsApi(accessToken: string): ColumnsApi {
  return new ColumnsApi(getApiConfiguration(accessToken));
}

export function getCommentsApi(accessToken: string): CommentsApi {
  return new CommentsApi(getApiConfiguration(accessToken));
}

export function getUsersApi(accessToken: string): UsersApi {
  return new UsersApi(getApiConfiguration(accessToken));
}

export function isAccessTokenValid(accessToken: string): boolean {
  return /^([a-z0-9]{41})$/.test(accessToken);
}

export async function hasBoardReadScope(accessToken: string): Promise<boolean> {
  try {
    await getBoardsApi(accessToken).getBoards({});
    return true;
  } catch (err) {
    return err.status !== 401 && err.status !== 403;
  }
}

export async function hasBoardWriteScope(accessToken: string): Promise<boolean> {
  try {
    await getBoardsApi(accessToken).createBoard({});
    return true;
  } catch (err) {
    return err.status !== 401 && err.status !== 403;
  }
}

export async function getBoards(accessToken: string): Promise<Board[]> {
  const results: Board[] = [];

  for (let page = 1; results.length === (page - 1) * 100; page++) {
    const boards = await getBoardsApi(accessToken).getBoards({
      page,
      perPage: 100,
      fields: [GetBoardsFieldsEnum.Name, GetBoardsFieldsEnum.Columns],
    });

    results.push(...boards);
  }

  return results;
}

export async function getCards(accessToken: string, boardId: string, columnId: string): Promise<Card[]> {
  const results: Card[] = [];

  for (let page = 1; results.length === (page - 1) * 100; page++) {
    const cards = await getCardsApi(accessToken).getCardsByColumn({
      boardId,
      columnId,
      page,
      perPage: 100,
      fields: [GetCardsByColumnFieldsEnum.Name],
    });

    results.push(...cards);
  }

  return results;
}
