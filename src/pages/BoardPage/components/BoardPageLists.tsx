import React from 'react';
import type { card, list, comment } from 'types/BoardPage.types';
import CardsList from './CardsList';

interface IListsData {
  lists: list[];
  cards: card[];
  comments: comment[];
  dispatch: React.Dispatch<any>;
}

const BoardPageLists = ({ lists, cards, comments, dispatch }: IListsData) => {
  return (
    <div className="board__lists row">
      {lists.map((list) => (
        <div className="board__list column col" key={list.id}>
          <CardsList
            listTitle={list.title}
            currentListId={list.id}
            cards={cards.filter((card) => card.listId === list.id)}
            dispatch={dispatch}
            comments={comments}
          />
        </div>
      ))}
      <span>+ Add another column</span>
    </div>
  );
};

export default BoardPageLists;
