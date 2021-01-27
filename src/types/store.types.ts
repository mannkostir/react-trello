import { Action } from './actions.types';
import { list, card, comment, user } from './BoardPage.types';

export type State = {
  board: {
    lists: list[];
    cards: card[];
    comments: comment[];
  };
  users: user[];
  auth: {
    currentUser: user | null;
  };
};
