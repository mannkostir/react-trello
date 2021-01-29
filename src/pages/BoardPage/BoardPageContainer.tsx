import React from 'react';
import BoardPageLists from './components/BoardPageLists';
import styles from './BoardPageContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';

const BoardPageContainer = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <section className={`${styles.container} fluid-container`}>
      <BoardPageLists state={state} dispatch={dispatch} />
    </section>
  );
};

export default BoardPageContainer;
