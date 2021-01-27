import { Action, ActionWithPayload } from 'types/actions.types';
import { user } from 'types/BoardPage.types';

export enum UserActionTypes {
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
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

export const addUserAC = (userData: user) =>
  createAction(UserActionTypes.ADD_USER, userData);

export const removeUserAC = (userData: Pick<user, 'id'>) =>
  createAction(UserActionTypes.REMOVE_USER, userData);

export type UserAction =
  | ReturnType<typeof addUserAC>
  | ReturnType<typeof removeUserAC>;
