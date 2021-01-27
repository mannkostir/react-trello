import { addCommentAC, editCardAC } from 'context/board/boardActions';
import React, { useEffect, useState } from 'react';
import PopupWindow from 'shared/components/PopupWindow/PopupWindow';
import { useForm } from 'shared/hooks/useForm';
import { card, comment, user } from 'types/BoardPage.types';
import CardDetailsPopup from './CardDetailsPopup';

interface ICardData {
  card: card;
  comments: comment[];
  listTitle: string;
  currentUser: user | null;
  dispatch: React.Dispatch<any>;
}

const Card = ({
  card,
  comments,
  listTitle,
  dispatch,
  currentUser,
}: ICardData) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => setIsPopupVisible((isVisible) => !isVisible);

  return (
    <>
      <CardDetailsPopup
        card={card}
        comments={comments}
        listTitle={listTitle}
        isPopupVisible={isPopupVisible}
        onPopupClose={() => setIsPopupVisible(false)}
        currentUser={currentUser}
        dispatch={dispatch}
      />
      <div className="card" onClick={togglePopup}>
        <span className="card__title">{card.title}</span>
        <div className="card__info">
          <span>{card.description ? 'description' : null}</span>
          <span>
            {comments?.length ? `comments[${comments.length}]` : null}
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
