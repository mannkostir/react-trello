import React, { FormEvent, useState } from 'react';
import type { card, list, comment } from 'types/BoardPage.types';
import CardsList from './CardsList';
import 'shared/styles/addComponent.css';
import { useForm } from 'shared/hooks/useForm';
import { addListAC } from 'context/board/boardActions';

interface IListsData {
  lists: list[];
  cards: card[];
  comments: comment[];
  dispatch: React.Dispatch<any>;
}

const BoardPageLists = ({ lists, cards, comments, dispatch }: IListsData) => {
  const [isAddingList, setIsAddingList] = useState(false);

  const { handleChange, keyValueMap } = useForm();

  const handleListFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const listTitle = keyValueMap.get('listTitle');

    if (listTitle) {
      dispatch(addListAC({ title: listTitle }));
    }

    setIsAddingList(false);
  };

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
      <div className="board__list column col">
        <div>
          {isAddingList ? (
            <form className="add__form" onSubmit={handleListFormSubmit}>
              <textarea
                className="add__textarea card"
                name="listTitle"
                placeholder="Enter a title for this column..."
                onChange={handleChange}
                required={true}
              />
              <div className="add__buttons-wrapper">
                <button type="submit" className="add__submit-btn">
                  Add Card
                </button>
                <button
                  onClick={(e) => setIsAddingList(false)}
                  className="add__discard-btn"
                >
                  X
                </button>
              </div>
            </form>
          ) : (
            <span className="add__toggle" onClick={() => setIsAddingList(true)}>
              + {lists.length ? 'Add another column' : 'Add a column'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardPageLists;
