import React, { useState } from 'react';
import { card, comment, user } from 'types/BoardPage.types';
import CardDetailsPopup from '../CardDetailsPopup';
import styles from './Card.module.css';

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
      <div className={`${styles.card} card`} onClick={togglePopup}>
        <span className={styles.title}>{card.title}</span>
        <div className={styles.info}>
          {card.description ? <span>has description</span> : null}
          <span>
            {comments?.length ? <span>comments[{comments.length}]</span> : null}
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
