import { Action, ActionWithPayload } from 'types/actions.types';
import { list, card, comment } from 'types/BoardPage.types';

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

function createAction<T extends string>(type: T): Action<T>;
function createAction<T extends string, P extends object>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
function createAction<T extends string, P extends object>(
  type: T,
  payload?: P
) {
  return { type, ...(payload ? { payload } : {}) };
}

// List Actions

export const addListAC = (listData: Pick<list, 'title'>) =>
  createAction(BoardActionTypes.ADD_LIST, listData);

export const changeListTitleAC = (listData: Pick<list, 'id' | 'title'>) =>
  createAction(BoardActionTypes.CHANGE_LIST_TITLE, listData);

export const removeListAC = (listData: Pick<list, 'id'>) =>
  createAction(BoardActionTypes.REMOVE_LIST, listData);

// Card Actions

export const addCardAC = (cardData: Pick<card, 'title' | 'listId'>) =>
  createAction(BoardActionTypes.ADD_CARD, cardData);

export const removeCardAC = (cardData: Pick<card, 'id'>) =>
  createAction(BoardActionTypes.REMOVE_CARD, cardData);

export const editCardAC = (cardData: card) =>
  createAction(BoardActionTypes.EDIT_CARD, cardData);

// Comment Actions

export const addCommentAC = (commentData: Omit<comment, 'id' | 'date'>) =>
  createAction(BoardActionTypes.ADD_COMMENT, commentData);

export const removeCommentAC = (commentData: Pick<comment, 'id'>) =>
  createAction(BoardActionTypes.REMOVE_COMMENT, commentData);

export const editCommentAC = (commentData: Pick<comment, 'id' | 'content'>) =>
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
