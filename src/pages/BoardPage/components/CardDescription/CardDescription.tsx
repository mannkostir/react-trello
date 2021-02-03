import React, { useEffect, useRef, useState } from 'react';
import styles from './CardDescription.module.css';
import addComponentStyles from 'styles/AddComponent.module.css';
import { Card, User } from 'types/BoardPage.types';
import { useForm } from 'hooks/useForm';
import { useDispatch } from 'react-redux';
import { updateCard } from 'store/cards/cardsSlice';

interface ICardDescriptionProps {
  card: Card;
  currentUser: User | null;
}

const CardDescription = ({ card, currentUser }: ICardDescriptionProps) => {
  const dispatch = useDispatch();
  const [isAddingDescription, setIsAddingDescription] = useState(false);

  const descriptionTextArea = useRef<HTMLTextAreaElement>(null);

  const { handleChange, keyValueMap } = useForm();

  useEffect(() => {
    if (!descriptionTextArea.current) return;

    if (isAddingDescription) descriptionTextArea.current.select();
  }, [isAddingDescription]);

  const handleDescriptionFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDescription = keyValueMap.get('cardDescription');

    dispatch(
      updateCard({
        newCard: { ...card, description: newDescription },
        userId: currentUser?.id || null,
      })
    );

    setIsAddingDescription(false);
  };

  return (
    <div>
      <span className={styles.descriptionTitle}>Description</span>
      <div>
        {card.isLoading ? (
          'Loading...'
        ) : isAddingDescription ? (
          <form
            className={addComponentStyles.form}
            onSubmit={handleDescriptionFormSubmit}
          >
            <textarea
              className={addComponentStyles.textarea}
              name="cardDescription"
              onChange={handleChange}
              defaultValue={card.description}
              ref={descriptionTextArea}
            />
            <div className={addComponentStyles.buttonsWrapper}>
              <button type="submit" className={addComponentStyles.submitBtn}>
                Save
              </button>
              <button
                className={addComponentStyles.discardBtn}
                onClick={() => setIsAddingDescription(false)}
              >
                X
              </button>
            </div>
          </form>
        ) : (
          <div
            className={addComponentStyles.toggle}
            onClick={() => {
              if (card.author.userId !== currentUser?.id) return;
              setIsAddingDescription(true);
            }}
          >
            {card.description
              ? card.description
              : 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDescription;
