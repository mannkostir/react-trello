import { Action } from './actions.types';
import { list, card, comment, user } from './BoardPage.types';

export type State = {
  lists: list[];
  cards: card[];
  comments: comment[];
  archive: card[];
  users: user[];
};
