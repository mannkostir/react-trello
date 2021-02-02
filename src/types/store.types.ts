import { List, Card, Comment, User } from './BoardPage.types';

export type CardsState = Card[];

export type ListsState = List[];

export type CommentsState = Comment[];

export type UsersState = User[];

export type AuthState = {
  currentUser: User | null;
};

export type State = {
  cards: CardsState;
  lists: ListsState;
  comments: CommentsState;
  users: UsersState;
  auth: AuthState;
};
