import { Action, AnyAction } from './actions.types';
import { State } from './store.types';

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;
