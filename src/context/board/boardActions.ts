import { createAction } from 'types/actions.types';
import { List, Card, Comment } from 'types/BoardPage.types';

export enum BoardActionTypes {
  ADD_LIST = 'ADD_LIST',
  CHANGE_LIST_TITLE = 'CHANGE_LIST_TITLE',
  REMOVE_LIST = 'REMOVE_LIST',
  ADD_CARD = 'ADD_CARD',
  REMOVE_CARD = 'REMOVE_CARD',
  EDIT_CARD = 'EDIT_CARD',
  ADD_COMMENT = 'ADD_COMMENT',
  REMOVE_COMMENT = 'REMOVE_COMMENT',
  EDIT_COMMENT = 'EDIT_COMMENT',
}

// List Actions

export const addListAC = (listData: Pick<List, 'title'>) =>
  createAction(BoardActionTypes.ADD_LIST, listData);

export const changeListTitleAC = (listData: Pick<List, 'id' | 'title'>) =>
  createAction(BoardActionTypes.CHANGE_LIST_TITLE, listData);

export const removeListAC = (listData: Pick<List, 'id'>) =>
  createAction(BoardActionTypes.REMOVE_LIST, listData);

// Card ActionsCard

export const addCardAC = (cardData: Pick<Card, 'title' | 'listId'>) =>
  createAction(BoardActionTypes.ADD_CARD, cardData);

export const removeCardAC = (cardData: Pick<Card, 'id'>) =>
  createAction(BoardActionTypes.REMOVE_CARD, cardData);

export const editCardAC = (cardData: Partial<Card>) =>
  createAction(BoardActionTypes.EDIT_CARD, cardData);

// Comment Actions

export const addCommentAC = (commentData: Omit<Comment, 'id' | 'date'>) =>
  createAction(BoardActionTypes.ADD_COMMENT, commentData);

export const removeCommentAC = (commentData: Pick<Comment, 'id'>) =>
  createAction(BoardActionTypes.REMOVE_COMMENT, commentData);

export const editCommentAC = (commentData: Pick<Comment, 'id' | 'content'>) =>
  createAction(BoardActionTypes.EDIT_COMMENT, commentData);

export type BoardAction =
  | ReturnType<typeof addListAC>
  | ReturnType<typeof changeListTitleAC>
  | ReturnType<typeof removeListAC>
  | ReturnType<typeof addCardAC>
  | ReturnType<typeof removeCardAC>
  | ReturnType<typeof editCardAC>
  | ReturnType<typeof addCommentAC>
  | ReturnType<typeof removeCommentAC>
  | ReturnType<typeof editCommentAC>;
