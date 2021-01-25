import React from 'react';
import './BoardPage.css';
import BoardPageLists from './components/BoardPageLists';
import { State } from 'types/store.types';

// Context wannabe
const state: State = {
  lists: [
    { id: 'a', title: 'To Do' },
    { id: 'b', title: 'In Progress' },
    { id: 'c', title: 'Testing' },
    { id: 'd', title: 'Done' },
  ],
  cards: [
    { id: 'a', listId: 'a', title: 'Smth' },
    {
      id: 'a',
      title: 'Whatever',
      description: 'What is love',
      listId: 'b',
    },
    {
      id: 'a',
      title: 'Whatever',
      description: 'What is love',
      listId: 'b',
    },
  ],
  comments: [],
  archive: [],
};

const BoardPageContainer = () => {
  return (
    <section className="board-page-container container-fluid">
      <BoardPageLists
        lists={state.lists}
        cards={state.cards}
        comments={state.comments}
      />
    </section>
  );
};

export default BoardPageContainer;
