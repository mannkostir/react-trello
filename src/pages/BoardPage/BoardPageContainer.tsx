import React, { useEffect } from 'react';
import './BoardPage.css';
import BoardPageLists from './components/BoardPageLists';
import { useSelector } from 'context/useSelector';
import { useDispatch } from 'context/useDispatch';
import { addCardAC, addListAC } from 'context/board/boardActions';
import { card } from 'types/BoardPage.types';

// Context wannabe
// const state: State = {
//   lists: [
//     { id: 'a', title: 'To Do' },
//     { id: 'b', title: 'In Progress' },
//     { id: 'c', title: 'Testing' },
//     { id: 'd', title: 'Done' },
//   ],
//   cards: [
//     { id: 'a', listId: 'a', title: 'Smth' },
//     {
//       id: 'a',
//       title: 'Whatever',
//       description: 'What is love',
//       listId: 'b',
//     },
//     {
//       id: 'a',
//       title: 'Whatever',
//       description: 'What is love',
//       listId: 'b',
//     },
//   ],
//   comments: [],
//   archive: [],
// };

const BoardPageContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addListAC({ title: 'To Do' }));
    dispatch(addListAC({ title: 'In Progress' }));
    dispatch(addListAC({ title: 'Testing' }));
    dispatch(addListAC({ title: 'Done' }));
  }, []);
  return (
    <section className="board-page-container container-fluid">
      <BoardPageLists
        lists={state.lists}
        cards={state.cards}
        comments={state.comments}
        dispatch={dispatch}
      />
    </section>
  );
};

export default BoardPageContainer;
