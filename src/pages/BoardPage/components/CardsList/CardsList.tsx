import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'hooks/useForm';
import * as types from 'types/BoardPage.types';
import Card from '../Card';
import styles from './CardsList.module.css';
import addComponentStyles from 'styles/AddComponent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, getCards } from 'store/cards/cardsSlice';
import { changeListTitle } from 'store/lists/listsSlice';
import { RootState } from 'store';
import { getComments } from 'store/comments/commentsSlice';

interface IListData {
  listTitle: string;
  cards: types.Card[];
  isCardsLoading: boolean;
  currentListId: string;
  currentUser: types.User | null;
}

const CardsList = ({
  cards,
  isCardsLoading,
  listTitle,
  currentListId,
  currentUser,
}: IListData) => {
  const comments = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch();

  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);

  const { keyValueMap, handleChange } = useForm();

  useEffect(() => {
    dispatch(getCards());
    dispatch(getComments());
  }, []);

  const handleCardFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardTitle = keyValueMap.get('cardTitle');

    if (cardTitle) {
      if (!currentUser) return;

      dispatch(
        addCard({
          listId: currentListId,
          title: cardTitle,
          author: { userId: currentUser.id, username: currentUser.username },
        })
      );
    }

    setIsAddingCard(false);
  };

  const handleTitleEdit = (e: React.FocusEvent<HTMLDivElement>) => {
    const newTitle: string = e.target.innerText;

    dispatch(changeListTitle({ title: newTitle, id: currentListId }));
  };

  const selectAllText = (e: React.MouseEvent<HTMLDivElement>) => {
    const range = document.createRange();
    range.selectNodeContents(e.currentTarget);

    const selection = window.getSelection();

    if (selection) {
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <div className={`${styles.content} container-fluid`}>
      <header className={styles.header}>
        <div
          className={styles.editableHeading}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={handleTitleEdit}
          onClick={selectAllText}
        >
          <h6>{listTitle}</h6>
        </div>
      </header>
      <div className={styles.cards}>
        {isCardsLoading
          ? 'Cards loading...'
          : comments.isLoading
          ? 'Comments loading...'
          : cards.map((card, index) => (
              <Card
                listTitle={listTitle}
                card={card}
                key={index}
                comments={comments.currentComments.filter(
                  (comment) => comment.cardId === card.id
                )}
                isCommentsLoading={comments.isLoading}
                currentUser={currentUser}
              />
            ))}
      </div>
      <div>
        {isAddingCard ? (
          <form
            className={addComponentStyles.form}
            onSubmit={handleCardFormSubmit}
          >
            <textarea
              className={`${addComponentStyles.textarea} card`}
              name="cardTitle"
              placeholder="Enter a title for this card..."
              onChange={handleChange}
              required={true}
            />
            <div className={addComponentStyles.buttonsWrapper}>
              <button type="submit" className={addComponentStyles.submitBtn}>
                Add Card
              </button>
              <button
                onClick={(e) => setIsAddingCard(false)}
                className={addComponentStyles.discardBtn}
              >
                X
              </button>
            </div>
          </form>
        ) : (
          <span
            className={addComponentStyles.toggle}
            onClick={(e) => setIsAddingCard(true)}
          >
            + {cards.length ? 'Add another card' : 'Add a card'}
          </span>
        )}
      </div>
    </div>
  );
};

export default CardsList;
