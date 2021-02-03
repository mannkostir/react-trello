import { useForm } from 'hooks/useForm';
import { useInput } from 'hooks/useInput';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from 'store/comments/commentsSlice';
import { Card, User } from 'types/BoardPage.types';
import styles from './CardCommentForm.module.css';
import addComponentStyles from 'styles/AddComponent.module.css';

interface ICardCommentFormProps {
  card: Card;
  currentUser: User | null;
}

const CardCommentForm = ({ currentUser, card }: ICardCommentFormProps) => {
  const dispatch = useDispatch();

  const [isAddingComment, setIsAddingComment] = useState(false);

  const { handleChange, keyValueMap } = useForm();

  const commentInput = useRef<HTMLTextAreaElement>(null);

  const { triggerTextAreaChangeEvent } = useInput();

  const handleCommentFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = keyValueMap.get('comment') || '';

    if (currentUser?.username) {
      dispatch(
        addComment({
          cardId: card.id,
          content: comment,
          author: currentUser.username,
        })
      );
    } else {
      throw new Error('401, Unauthorized');
    }

    if (commentInput.current) {
      triggerTextAreaChangeEvent(commentInput.current, '');
    }

    setIsAddingComment(false);
  };
  return (
    <form className={styles.comment} onSubmit={handleCommentFormSubmit}>
      <textarea
        className={`${styles.commentTextarea} ${addComponentStyles.textarea}`}
        name="comment"
        placeholder="Write a comment"
        onFocus={() => setIsAddingComment(true)}
        onBlur={() => {
          if (!keyValueMap.get('comment')) {
            setIsAddingComment(false);
          }
        }}
        onChange={handleChange}
        data-isediting={isAddingComment}
        required={true}
        ref={commentInput}
      />
      <div className={addComponentStyles.buttonsWrapper}>
        <button type="submit" className={`${addComponentStyles.submitBtn}`}>
          Save
        </button>
      </div>
    </form>
  );
};

export default CardCommentForm;
