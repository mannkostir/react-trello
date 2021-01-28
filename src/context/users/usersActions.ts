import { createAction } from 'types/actions.types';
import { user } from 'types/BoardPage.types';

export enum UsersActions {
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
}

export const addUserAC = (userData: user) =>
  createAction(UsersActions.ADD_USER, userData);

export const removeUserAC = (userData: user) =>
  createAction(UsersActions.REMOVE_USER, userData);

export type UsersAction =
  | ReturnType<typeof addUserAC>
  | ReturnType<typeof removeUserAC>;
