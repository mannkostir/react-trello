import React, { useEffect } from 'react';
import PopupWindow from 'components/PopupWindow/PopupWindow';
import { useForm } from 'hooks/useForm/useForm';
import { Card, Comment, User } from 'types/BoardPage.types';
import styles from './CardDetailsPopup.module.css';
import addComponentStyles from 'styles/AddComponent.module.css';
import { deleteCard, updateCard } from 'store/cards/cardsSlice';
import { useDispatch } from 'react-redux';
import CardDescription from '../CardDescription';
import CardCommentForm from '../CardCommentForm';
import CardActivityList from '../CardActivityList';

interface ICardDetailsData {
  card: Card;
  listTitle: string;
  comments: Comment[];
  isCommentsLoading: boolean;
  isPopupVisible: boolean;
  currentUser: User | null;
  onPopupClose: () => void;
}

const CardDetailsPopup = ({
  card,
  listTitle,
  comments,
  isCommentsLoading,
  isPopupVisible,
  currentUser,
  onPopupClose,
}: ICardDetailsData) => {
  const dispatch = useDispatch();

  const { handleChange, keyValueMap } = useForm();

  useEffect(() => {
    const ifEscPressedAction = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onPopupClose();
      }
    };

    window.addEventListener('keydown', ifEscPressedAction);

    return () => window.removeEventListener('keydown', ifEscPressedAction);
  }, []);

  const changeCardTitle = () => {
    checkCardAuth({ author: card.author });

    const newCardTitle = keyValueMap.get('cardTitle');

    if (newCardTitle) {
      dispatch(
        updateCard({
          newCard: { ...card, title: newCardTitle },
          userId: currentUser?.id || null,
        })
      );
    }
  };

  const removeCard = () => {
    dispatch(
      deleteCard({
        cardData: { author: card.author, id: card.id },
        userId: currentUser?.id || null,
      })
    );
  };

  useEffect(() => {
    if (!card.id) onPopupClose();
  }, [card]);

  const checkCardAuth = (cardData: Pick<Card, 'author'>) => {
    if (!currentUser) throw new Error('Status: 401');

    if (currentUser.id !== cardData.author.userId)
      throw new Error('Status: 403');
  };
  return isPopupVisible ? (
    <PopupWindow isVisible={isPopupVisible}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <textarea
              className={styles.cardTitle}
              name="cardTitle"
              onChange={handleChange}
              onBlur={changeCardTitle}
              defaultValue={card.title}
              onClick={(e) => e.currentTarget.select()}
              disabled={card.author.userId !== currentUser?.id}
            />
            <div>
              in list <span className={styles.listTitle}>{listTitle}</span>
            </div>
          </div>
          <span>Author: {card.author.username}</span>
          <span className={styles.popupCloseBtn} onClick={onPopupClose}>
            CLOSE
          </span>
        </header>
        <section className={styles.main}>
          <div>
            <CardDescription card={card} currentUser={currentUser || null} />
            <CardCommentForm card={card} currentUser={currentUser || null} />
            <CardActivityList
              comments={comments}
              currentUser={currentUser || null}
              isCommentsLoading={isCommentsLoading}
            />
          </div>
        </section>
        <aside className={styles.sidebar}>
          Actions:
          <ul className={styles.cardActions}>
            <li
              className={`${styles.cardActionsItem} ${addComponentStyles.toggle}`}
              onClick={removeCard}
            >
              Delete Card
            </li>
          </ul>
        </aside>
      </div>
    </PopupWindow>
  ) : null;
};

export default CardDetailsPopup;
