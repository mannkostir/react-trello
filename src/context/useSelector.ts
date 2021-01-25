import { useContext } from 'react';
import { StateContext } from './store';
import { State } from 'types/store.types';

export const useSelector = <TSelected = unknown>(
  selector: (state: State) => TSelected
) => {
  const _state = useContext(StateContext);

  const state = selector(_state);

  return state;
};
