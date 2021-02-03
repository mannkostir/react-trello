import { List, Card, Comment, User } from './BoardPage.types';

export interface CardsState {
  currentCards: Card[];
  isLoading: boolean;
}

export interface ListsState {
  currentLists: List[];
  isLoading: boolean;
}

export interface CommentsState {
  currentComments: Comment[];
  isLoading: boolean;
}

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
