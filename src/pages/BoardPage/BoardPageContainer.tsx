import React from 'react';
import './BoardPage.css';
import type { list } from 'types/BoardPage.types';
import BoardPageLists from './components/BoardPageLists';

// Context wannabe
const lists: list[] = [
  { title: 'To Do', cards: [{ title: 'Smth' }] },
  {
    title: 'In Progress',
    cards: [
      {
        title: 'Whatever',
        description: 'What is love',
        comments: [{ author: 'Me', content: 'IMHO', date: new Date() }],
      },
      {
        title: 'Whatever',
        description: 'What is love',
        comments: [],
      },
    ],
  },
  { title: 'Testing', cards: [] },
  { title: 'Done', cards: [] },
];

const BoardPageContainer = () => {
  return (
    <section className="board-page-container container-fluid">
      <BoardPageLists listsData={lists} />
    </section>
  );
};

export default BoardPageContainer;
