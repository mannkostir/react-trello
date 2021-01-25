import React from 'react';
import type { card, list, comment } from 'types/BoardPage.types';
import CardsList from './CardsList';

interface IListsData {
  lists: list[];
  cards: card[];
  comments: comment[];
}

const BoardPageLists = ({ lists, cards, comments }: IListsData) => {
  return (
    <div className="board__lists row">
      {lists.map((list) => (
        <div className="board__list column col" key={list.id}>
          <CardsList
            listTitle={list.title}
            cards={cards.filter((card) => card.listId === list.id)}
            comments={comments}
          />
        </div>
      ))}
    </div>
  );
};

export default BoardPageLists;
