import React, { useState } from 'react';
import type { card, comment } from 'types/BoardPage.types';
import Card from './Card';

interface IListData {
  listTitle: string;
  cards: card[];
  comments: comment[];
}

const CardsList = ({ cards, listTitle, comments }: IListData) => {
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);

  return (
    <div className="list__content container-fluid">
      <header className="list__header">
        <div
          className="list__heading editable-heading"
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <h6>{listTitle}</h6>
        </div>
      </header>
      <div className="list__cards">
        {cards.map((card, index) => (
          <Card
            card={card}
            key={index}
            comments={comments.filter((comment) => comment.cardId === card.id)}
          />
        ))}
      </div>
      <div className="list__add-card">
        {isAddingCard ? (
          <form className="add-card__form">
            <textarea
              className="add-card__textarea card"
              name="cardTitle"
              placeholder="Enter a title for this card..."
            />
            <div className="add-card__buttons-wrapper">
              <button type="submit" className="add-card__submit-btn">
                Add Card
              </button>
              <button
                onClick={(e) => setIsAddingCard(false)}
                className="add-card__discard-btn"
              >
                X
              </button>
            </div>
          </form>
        ) : (
          <span
            className="add-card__link"
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
