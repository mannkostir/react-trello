import React from 'react';
import BoardPageLists from './components/BoardPageLists';
import styles from './BoardPageContainer.module.css';

const BoardPageContainer = () => {
  return (
    <section className={`${styles.container} fluid-container`}>
      <BoardPageLists />
    </section>
  );
};

export default BoardPageContainer;
