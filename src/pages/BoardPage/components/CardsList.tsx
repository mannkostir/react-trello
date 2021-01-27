import { addCardAC, changeListTitleAC } from 'context/board/boardActions';
import React, { FormEvent, useState } from 'react';
import { useForm } from 'shared/hooks/useForm';
import type { card, comment, user } from 'types/BoardPage.types';
import Card from './Card';
import 'shared/styles/addComponent.css';

interface IListData {
  listTitle: string;
  cards: card[];
  comments: comment[];
  currentListId: string;
  dispatch: React.Dispatch<any>;
  currentUser: user | null;
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

  return (
    <div className="list__content container-fluid">
      <header className="list__header">
        <div
          className="list__heading editable-heading"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={handleTitleEdit}
        >
          <h6>{listTitle}</h6>
        </div>
      </header>
      <div className="list__cards">
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
      <div className="list__add-component">
        {isAddingCard ? (
          <form className="add__form" onSubmit={handleCardFormSubmit}>
            <textarea
              className="add__textarea card"
              name="cardTitle"
              placeholder="Enter a title for this card..."
              onChange={handleChange}
              required={true}
            />
            <div className="add__buttons-wrapper">
              <button type="submit" className="add__submit-btn">
                Add Card
              </button>
              <button
                onClick={(e) => setIsAddingCard(false)}
                className="add__discard-btn"
              >
                X
              </button>
            </div>
          </form>
        ) : (
          <span className="add__toggle" onClick={(e) => setIsAddingCard(true)}>
            + {cards.length ? 'Add another card' : 'Add a card'}
          </span>
        )}
      </div>
    </div>
  );
};

export default CardsList;
