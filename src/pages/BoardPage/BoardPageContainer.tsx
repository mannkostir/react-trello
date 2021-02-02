import React from 'react';
import BoardPageLists from './components/BoardPageLists';
import styles from './BoardPageContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';

const BoardPageContainer = () => {
  return (
    <section className={`${styles.container} fluid-container`}>
      <BoardPageLists />
    </section>
  );
};

export default BoardPageContainer;
