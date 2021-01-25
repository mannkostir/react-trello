import { Action } from './actions.types';
import { list, card, comment } from './BoardPage.types';

export type State = {
  lists: list[];
  cards: card[];
  comments: comment[];
  archive: card[];
};
