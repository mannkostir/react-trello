import React, { FormEvent, useState } from 'react';
import CardsList from './CardsList';
import 'shared/styles/addComponent.css';
import { useForm } from 'shared/hooks/useForm';
import { addListAC } from 'context/board/boardActions';
import { State } from 'types/store.types';

interface IListsData {
  state: State;
  dispatch: React.Dispatch<any>;
}

const BoardPageLists = ({ state, dispatch }: IListsData) => {
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
      {state.board.lists.map((list) => (
        <div className="board__list column col" key={list.id}>
          <CardsList
            listTitle={list.title}
            currentListId={list.id}
            cards={state.board.cards.filter((card) => card.listId === list.id)}
            dispatch={dispatch}
            comments={state.board.comments}
            currentUser={state.auth.currentUser}
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
              +{' '}
              {state.board.lists.length ? 'Add another column' : 'Add a column'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardPageLists;
