import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as types from 'types/BoardPage.types';
import CardDetailsPopup from '../CardDetailsPopup';
import styles from './Card.module.css';

interface ICardData {
  card: types.Card;
  comments: types.Comment[];
  isCommentsLoading: boolean;
  listTitle: string;
  currentUser: types.User | null;
}

const Card = ({
  card,
  comments,
  isCommentsLoading,
  listTitle,
  currentUser,
}: ICardData) => {
  const dispatch = useDispatch();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => setIsPopupVisible((isVisible) => !isVisible);

  return (
    <>
      <CardDetailsPopup
        card={card}
        comments={comments}
        isCommentsLoading={isCommentsLoading}
        listTitle={listTitle}
        isPopupVisible={isPopupVisible}
        onPopupClose={() => setIsPopupVisible(false)}
        currentUser={currentUser}
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
