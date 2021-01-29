import { addCardAC, changeListTitleAC } from 'context/board/boardActions';
import React, { FormEvent, useState } from 'react';
import { useForm } from 'hooks/useForm';
import * as types from 'types/BoardPage.types';
import Card from '../Card';
import styles from './CardsList.module.css';
import addComponentStyles from 'styles/AddComponent.module.css';

interface IListData {
  listTitle: string;
  cards: types.Card[];
  comments: types.Comment[];
  currentListId: string;
  dispatch: React.Dispatch<any>;
  currentUser: types.User | null;
}

const CardsList = ({
  cards,
  listTitle,
  currentListId,
  comments,
  dispatch,
  currentUser,
}: IListData) => {
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);

  const { keyValueMap, handleChange } = useForm();

  const addCard = (cardTitle: string) => {
    dispatch(addCardAC({ title: cardTitle, listId: currentListId }));
  };

  const handleCardFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardTitle = keyValueMap.get('cardTitle');

    if (cardTitle) {
      addCard(cardTitle);
    }

    setIsAddingCard(false);
  };

  const handleTitleEdit = (e: React.FocusEvent<HTMLDivElement>) => {
    const newTitle: string = e.target.innerText;

    dispatch(changeListTitleAC({ title: newTitle, id: currentListId }));
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
        {cards.map((card, index) => (
          <Card
            listTitle={listTitle}
            card={card}
            key={index}
            comments={comments.filter((comment) => comment.cardId === card.id)}
            dispatch={dispatch}
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
