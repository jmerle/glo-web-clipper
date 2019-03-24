import { BoardsApi, CardsApi, ColumnsApi, CommentsApi, Configuration, UsersApi } from '../api';
import { AttachmentsApi } from '../api/apis';

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
    return err.status !== 403;
  }
}

export async function hasBoardWriteScope(accessToken: string): Promise<boolean> {
  try {
    await getBoardsApi(accessToken).createBoard({});
    return true;
  } catch (err) {
    return err.status !== 403;
  }
}
