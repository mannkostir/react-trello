import React, { useState } from 'react';
import styles from './CardActivityList.module.css';
import addComponentStyles from 'styles/AddComponent.module.css';
import { useForm } from 'hooks/useForm';
import { useDispatch } from 'react-redux';
import { editComment, removeComment } from 'store/comments/commentsSlice';
import { Comment, User } from 'types/BoardPage.types';

interface ICardActivityListProps {
  comments: Comment[];
  isCommentsLoading: boolean;
  currentUser: User | null;
}

const CardActivityList = ({
  comments,
  isCommentsLoading,
  currentUser,
}: ICardActivityListProps) => {
  const dispatch = useDispatch();

  const [editingComments, setEditingComments] = useState<string[]>([]);

  const { handleChange, keyValueMap } = useForm();

  const handleCommentEditFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    e.preventDefault();

    const newComment = keyValueMap.get('newComment') || '';

    if (newComment) {
      dispatch(editComment({ id: commentId, content: newComment }));
    }

    setEditingComments((comments) =>
      comments.filter((comment) => comment !== commentId)
    );
  };

  const deleteComment = (commentId: string) => {
    dispatch(removeComment({ id: commentId }));
  };

  const checkCommentAuth = (commentData: Pick<Comment, 'author' | 'id'>) => {
    if (!currentUser) throw new Error('Status: 401');

    if (currentUser.username !== commentData.author) {
      throw new Error('Status: 403');
    }
  };

  return (
    <>
      <div className={styles.activityTitle}>Activity</div>
      <ul className={styles.activityList}>
        {isCommentsLoading
          ? 'Comments loading...'
          : comments.map((comment) => (
              <li key={comment.id} className={styles.comment}>
                <header>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                </header>
                {editingComments.includes(comment.id) ? (
                  <form
                    onSubmit={(e) => handleCommentEditFormSubmit(e, comment.id)}
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
                      checkCommentAuth({
                        author: comment.author,
                        id: comment.id,
                      });
                      setEditingComments((comments) => [
                        ...comments,
                        comment.id,
                      ]);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      checkCommentAuth({
                        author: comment.author,
                        id: comment.id,
                      });
                      deleteComment(comment.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
      </ul>
    </>
  );
};

export default CardActivityList;
