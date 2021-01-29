import {
  addCommentAC,
  editCardAC,
  editCommentAC,
  removeCardAC,
  removeCommentAC,
} from 'context/board/boardActions';
import React, { useEffect, useRef, useState } from 'react';
import PopupWindow from 'components/PopupWindow/PopupWindow';
import { useForm } from 'hooks/useForm/useForm';
import { useInput } from 'hooks/useInput';
import { Card, Comment, User } from 'types/BoardPage.types';
import styles from './CardDetailsPopup.module.css';
import addComponentStyles from 'styles/AddComponent.module.css';

interface ICardDetailsData {
  card: Card;
  listTitle: string;
  comments: Comment[];
  isPopupVisible: boolean;
  currentUser: User | null;
  onPopupClose: () => void;
  dispatch: React.Dispatch<any>;
}

const CardDetailsPopup = ({
  card,
  listTitle,
  comments,
  isPopupVisible,
  currentUser,
  onPopupClose = () => {},
  dispatch,
}: ICardDetailsData) => {
  const [isAddingDescription, setIsAddingDescription] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [editingComments, setEditingComments] = useState<string[]>([]);

  const { handleChange, keyValueMap } = useForm();
  const { triggerTextAreaChangeEvent } = useInput();

  const commentInput = useRef<HTMLTextAreaElement>(null);
  const descriptionTextArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!descriptionTextArea.current) return;

    if (isAddingDescription) descriptionTextArea.current.select();
  }, [isAddingDescription]);

  useEffect(() => {
    const ifEscPressedAction = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onPopupClose();
      }
    };

    window.addEventListener('keydown', ifEscPressedAction);

    return () => window.removeEventListener('keydown', ifEscPressedAction);
  }, []);

  const handleDescriptionFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDescription = keyValueMap.get('cardDescription');

    dispatch(editCardAC({ ...card, description: newDescription }));

    setIsAddingDescription(false);
  };

  const handleCommentFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = keyValueMap.get('comment') || '';

    if (currentUser?.username) {
      dispatch(
        addCommentAC({
          cardId: card.id,
          content: comment,
          author: currentUser.username,
        })
      );
    }

    if (commentInput.current) {
      triggerTextAreaChangeEvent(commentInput.current, '');
    }

    setIsAddingComment(false);
  };

  const handleCommentEditFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    e.preventDefault();

    const newComment = keyValueMap.get('newComment') || '';

    if (newComment) {
      dispatch(editCommentAC({ id: commentId, content: newComment }));
    }

    setEditingComments((comments) =>
      comments.filter((comment) => comment !== commentId)
    );
  };

  const changeCardTitle = () => {
    const newCardTitle = keyValueMap.get('cardTitle');

    if (newCardTitle) {
      dispatch(editCardAC({ id: card.id, title: newCardTitle }));
    }
  };

  const removeCard = () => {
    dispatch(removeCardAC({ id: card.id }));
    onPopupClose();
  };

  const deleteComment = (commentId: string) => {
    dispatch(removeCommentAC({ id: commentId }));
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
            />
            <div>
              in list <span className={styles.listTitle}>{listTitle}</span>
            </div>
          </div>
          <span className={styles.popupCloseBtn} onClick={onPopupClose}>
            CLOSE
          </span>
        </header>
        <section className={styles.main}>
          <div>
            <span className={styles.descriptionTitle}>Description</span>
            <div>
              {isAddingDescription ? (
                <form
                  className={addComponentStyles.form}
                  onSubmit={(e) => handleDescriptionFormSubmit(e)}
                >
                  <textarea
                    className={addComponentStyles.textarea}
                    name="cardDescription"
                    onChange={handleChange}
                    defaultValue={card.description}
                    ref={descriptionTextArea}
                  />
                  <div className={addComponentStyles.buttonsWrapper}>
                    <button
                      type="submit"
                      className={addComponentStyles.submitBtn}
                    >
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
                  onClick={() => setIsAddingDescription(true)}
                >
                  {card.description
                    ? card.description
                    : 'Add a more detailed description...'}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={styles.activityTitle}>Activity</div>
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
                <button
                  type="submit"
                  className={`${addComponentStyles.submitBtn}`}
                >
                  Save
                </button>
              </div>
            </form>
            <ul className={styles.activityList}>
              {comments.map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  <header>
                    <span className={styles.commentAuthor}>
                      {comment.author}
                    </span>
                  </header>
                  {editingComments.includes(comment.id) ? (
                    <form
                      onSubmit={(e) =>
                        handleCommentEditFormSubmit(e, comment.id)
                      }
                    >
                      <textarea
                        className={`${styles.commentContent} ${addComponentStyles.textarea}`}
                        name="newComment"
                        onChange={handleChange}
                        defaultValue={comment.content}
                      />
                      <div className={addComponentStyles.buttonsWrapper}>
                        <button
                          type="submit"
                          className={addComponentStyles.submitBtn}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div
                      className={`${styles.commentContent} ${addComponentStyles.textarea}`}
                    >
                      {comment.content}
                    </div>
                  )}
                  <div className={styles.commentActions}>
                    <button
                      onClick={() => {
                        setEditingComments((comments) => [
                          ...comments,
                          comment.id,
                        ]);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteComment(comment.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
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
