import { useContext } from 'react';
import { DispatchContext } from './store';

export const useDispatch = () => {
  const dispatch = useContext(DispatchContext);

  return dispatch;
};
