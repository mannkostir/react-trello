import React from 'react';
import type { list } from '../BoardPage.types';
import CardsList from './CardsList';

interface IListsData {
  listsData: list[];
}

const BoardPageLists = ({ listsData }: IListsData) => {
  return (
    <div className="board__lists row">
      {listsData.map((listData, index) => (
        <div className="board__list column col" key={index}>
          <CardsList listTitle={listData.title} cards={listData.cards} />
        </div>
      ))}
    </div>
  );
};

export default BoardPageLists;
