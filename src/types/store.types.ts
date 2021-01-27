import { Action } from './actions.types';
import { list, card, comment, user } from './BoardPage.types';

export interface IBoardState {
  lists: list[];
  cards: card[];
  comments: comment[];
}

export interface IUsersState {
  users: user[];
}

export interface IAuthState {
  currentUser: user | null;
}

export type State = {
  board: IBoardState;
  users: IUsersState;
  auth: IAuthState;
};
