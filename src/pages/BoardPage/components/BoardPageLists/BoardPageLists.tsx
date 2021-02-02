import React, { FormEvent, useEffect, useState } from 'react';
import CardsList from '../CardsList';
import styles from './BoardPageLists.module.css';
import addComponentStyles from 'styles/AddComponent.module.css';
import { useForm } from 'hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { addList, getLists } from 'store/lists/listsSlice';

const BoardPageLists = () => {
  const { lists, auth, cards, comments } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const [isAddingList, setIsAddingList] = useState(false);

  const { handleChange, keyValueMap } = useForm();

  useEffect(() => {
    dispatch(getLists());
  }, []);

  const handleListFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const listTitle = keyValueMap.get('listTitle');

    if (listTitle) {
      dispatch(addList({ title: listTitle }));
    }

    setIsAddingList(false);
  };

  return (
    <div className={`${styles.lists} row`}>
      {lists.map((list) => (
        <div className={`${styles.list} col`} key={list.id}>
          <CardsList
            listTitle={list.title}
            currentListId={list.id}
            cards={cards.filter((card) => card.listId === list.id)}
            comments={comments}
            currentUser={auth.currentUser}
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
              + {lists.length ? 'Add another column' : 'Add a column'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardPageLists;
