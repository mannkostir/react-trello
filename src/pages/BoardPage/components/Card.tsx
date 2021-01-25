import React from 'react';
import { card, comment } from 'types/BoardPage.types';

interface ICardData {
  card: card;
  comments: comment[];
}

const Card = ({ card, comments }: ICardData) => {
  return (
    <div className="card">
      <span className="card__title">{card.title}</span>
      <div className="card__details">
        <span>{card.description ? 'description' : null}</span>
        <span>{comments?.length ? `comments[${comments.length}]` : null}</span>
      </div>
    </div>
  );
};

export default Card;
