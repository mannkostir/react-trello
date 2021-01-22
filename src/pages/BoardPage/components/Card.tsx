import React from 'react';
import { card } from '../BoardPage.types';

interface ICardData {
  card: card;
}

const Card = ({ card }: ICardData) => {
  return (
    <div className="card">
      <span className="card__title">{card.title}</span>
      <div className="card__details">
        <span>{card.description ? 'description' : null}</span>
        <span>
          {card.comments?.length ? `comments[${card.comments.length}]` : null}
        </span>
      </div>
    </div>
  );
};

export default Card;
