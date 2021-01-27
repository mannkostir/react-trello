import { addCommentAC, editCardAC } from 'context/board/boardActions';
import React, { useEffect, useState } from 'react';
import PopupWindow from 'shared/components/PopupWindow/PopupWindow';
import { useForm } from 'shared/hooks/useForm';
import { card, comment } from 'types/BoardPage.types';

interface ICardData {
  card: card;
  comments: comment[];
  listTitle: string;
  dispatch: React.Dispatch<any>;
}

const Card = ({ card, comments, listTitle, dispatch }: ICardData) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAddingDescription, setIsAddingDescription] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { handleChange, keyValueMap } = useForm();

  const togglePopup = () => setIsPopupVisible((isVisible) => !isVisible);

  const handleDescriptionFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDescription = keyValueMap.get('cardDescription');

    dispatch(editCardAC({ ...card, description: newDescription }));

    setIsAddingDescription(false);
  };

  const handleCommentFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = keyValueMap.get('comment') || '';

    dispatch(addCommentAC({ cardId: card.id, content: comment, author: ':(' }));

    setIsAddingComment(false);
  };
  return (
    <>
      {isPopupVisible ? (
        <PopupWindow isVisible={isPopupVisible}>
          <div className="card-details">
            <header className="card-details__header">
              <div className="card-details__header-content">
                <textarea
                  className="card-details__card-title"
                  defaultValue={card.title}
                />
                <div className="card-details__list-data">
                  in list{' '}
                  <span className="card-details__list-title">{listTitle}</span>
                </div>
              </div>
              <span
                className="card-details__popup-close-btn"
                onClick={() => setIsPopupVisible(false)}
              >
                CLOSE
              </span>
            </header>
            <section className="card-details__main">
              <div className="card-details__description">
                <span className="card-details__description-title">
                  Description
                </span>
                <div className="card-details__description-content">
                  {isAddingDescription ? (
                    <form
                      className="add__form"
                      onSubmit={(e) => handleDescriptionFormSubmit(e)}
                    >
                      <textarea
                        className="add__textarea"
                        name="cardDescription"
                        onChange={handleChange}
                        defaultValue={card.description}
                      />
                      <div className="add__buttons-wrapper">
                        <button type="submit" className="add__submit-btn">
                          Save
                        </button>
                        <button
                          className="add__discard-btn"
                          onClick={() => setIsAddingDescription(false)}
                        >
                          X
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div
                      className="add__toggle"
                      onClick={() => setIsAddingDescription(true)}
                    >
                      {card.description
                        ? card.description
                        : 'Add a more detailed description...'}
                    </div>
                  )}
                </div>
              </div>
              <div className="card-details__activity">
                <div className="card-details__activity-title">Activity</div>
                <form
                  className="card-details__comment"
                  onSubmit={handleCommentFormSubmit}
                >
                  <textarea
                    className="card-details__comment-textarea add__textarea"
                    name="comment"
                    placeholder="Write a comment"
                    onFocus={() => setIsAddingComment(true)}
                    onBlur={() => setIsAddingComment(false)}
                    onChange={handleChange}
                  />
                  <div className="add_buttons-wrapper">
                    <button
                      type="submit"
                      className="card-details__submit-btn add__submit-btn"
                    >
                      Save
                    </button>
                  </div>
                </form>
                <ul className="card-details__activity-list">
                  {comments.map((comment) => (
                    <li key={comment.id} className="card-details__comment">
                      <header className="card-details__comment-header">
                        <span className="card-details__comment-author">
                          {comment.author}
                        </span>
                      </header>
                      <div className="card-details__comment-content">
                        {comment.content}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <aside className="card-details__sidebar">
              Actions:
              <ul className="card-details__card-actions">
                <li className="card-details__card-actions-item add__toggle">
                  Delete Card
                </li>
              </ul>
            </aside>
          </div>
        </PopupWindow>
      ) : null}
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
