import { Action } from './actions.types';
import { State } from './store.types';

export type Reducer<S = State, A extends Action<string> = Action<string>> = {
  state: S | undefined;
  action: A;
};
