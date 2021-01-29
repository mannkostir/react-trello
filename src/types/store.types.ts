import { List, Card, Comment, User } from './BoardPage.types';

export interface IBoardState {
  lists: List[];
  cards: Card[];
  comments: Comment[];
}

export interface IUsersState {
  users: User[];
}

export interface IAuthState {
  currentUser: User | null;
}

export type State = {
  board: IBoardState;
  users: IUsersState;
  auth: IAuthState;
};
