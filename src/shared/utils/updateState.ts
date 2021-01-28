import { State } from 'types/store.types';

export const updateState = <S, U extends Partial<S>>(
  state: S,
  update: U,
  localStorageKey: string = ''
) => {
  const updatedState: typeof state = { ...state, ...update };

  if (localStorageKey) {
    localStorage.setItem(localStorageKey, JSON.stringify(updatedState));
  }

  console.log(updatedState);

  return updatedState;
};
