import React, { FormEvent, useState } from 'react';
import CardsList from '../CardsList';
import styles from './BoardPageLists.module.css';
import addComponentStyles from 'shared/styles/AddComponent.module.css';
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
    <div style={styles} className={`${styles.lists} row`}>
      {state.board.lists.map((list) => (
        <div className={`${styles.list} col`} key={list.id}>
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
      <div className={`${styles.list} col`}>
        <div>
          {isAddingList ? (
            <form
              className={addComponentStyles.form}
              onSubmit={handleListFormSubmit}
            >
              <textarea
                className={`${addComponentStyles.textarea} card`}
                name="listTitle"
                placeholder="Enter a title for this column..."
                onChange={handleChange}
                required={true}
              />
              <div className={addComponentStyles.buttonsWrapper}>
                <button type="submit" className={addComponentStyles.submitBtn}>
                  Add Card
                </button>
                <button
                  onClick={(e) => setIsAddingList(false)}
                  className={addComponentStyles.discardBtn}
                >
                  X
                </button>
              </div>
            </form>
          ) : (
            <span
              className={addComponentStyles.toggle}
              onClick={() => setIsAddingList(true)}
            >
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
