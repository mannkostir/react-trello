import { useDispatch } from './useDispatch';
import { useSelector } from './useSelector';

export const useStore = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const getState = () => {
    return state;
  };

  return { getState, dispatch };
};
