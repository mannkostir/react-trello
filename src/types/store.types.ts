import { List, Card, Comment, User } from './BoardPage.types';

export type CardsState = {
  currentCards: Card[];
  isLoading: boolean;
};

export type ListsState = {
  currentLists: List[];
  isLoading: boolean;
};

export type CommentsState = {
  currentComments: Comment[];
  isLoading: boolean;
};

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
