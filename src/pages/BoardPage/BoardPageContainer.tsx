import React, { useEffect, useState } from 'react';
import './BoardPage.css';
import BoardPageLists from './components/BoardPageLists';
import { useSelector } from 'context/useSelector';
import { useDispatch } from 'context/useDispatch';
import { addCardAC, addListAC } from 'context/board/boardActions';
import { card, user } from 'types/BoardPage.types';
import PopupWindow from 'shared/components/PopupWindow/PopupWindow';
import { useForm } from 'shared/hooks/useForm';
import { signInAC } from 'context/auth/authActions';

const createUUID = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};

// Context wannabe
// const state: State = {
//   lists: [
//     { id: 'a', title: 'To Do' },
//     { id: 'b', title: 'In Progress' },
//     { id: 'c', title: 'Testing' },
//     { id: 'd', title: 'Done' },
//   ],
//   cards: [
//     { id: 'a', listId: 'a', title: 'Smth' },
//     {
//       id: 'a',
//       title: 'Whatever',
//       description: 'What is love',
//       listId: 'b',
//     },
//     {
//       id: 'a',
//       title: 'Whatever',
//       description: 'What is love',
//       listId: 'b',
//     },
//   ],
//   comments: [],
//   archive: [],
// };

const BoardPageContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [cachedUser, setCachedUser] = useState(
    localStorage.getItem('cachedUser')
  );

  const { handleChange, keyValueMap } = useForm();

  const handleUserFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let uuid = createUUID();

    const username = keyValueMap.get('username');

    if (username) {
      const user: user = { id: uuid, username };
      dispatch(signInAC({ username, id: uuid }));
      localStorage.setItem('cachedUser', JSON.stringify(user));
      setCachedUser(JSON.stringify(user));
    }
  };

  useEffect(() => {
    if (!cachedUser) return;

    const user = JSON.parse(cachedUser);

    dispatch(signInAC(user));
  }, [cachedUser]);

  useEffect(() => {
    dispatch(addListAC({ title: 'To Do' }));
    dispatch(addListAC({ title: 'In Progress' }));
    dispatch(addListAC({ title: 'Testing' }));
    dispatch(addListAC({ title: 'Done' }));
  }, []);
  return (
    <section className="board-page-container container-fluid">
      <PopupWindow isVisible={!cachedUser}>
        <div className="first-visit">
          <form className="first-visit__form" onSubmit={handleUserFormSubmit}>
            <label className="first-visit__input-label" htmlFor="usernameInput">
              Enter your username:
            </label>
            <input
              type="text"
              name="username"
              className="first_visit__input-username"
              id="usernameInput"
              onChange={handleChange}
              required={true}
            />
            <button type="submit" className="first-visit__submit-btn">
              It's me, I swear
            </button>
          </form>
        </div>
      </PopupWindow>
      <BoardPageLists state={state} dispatch={dispatch} />
    </section>
  );
};

export default BoardPageContainer;
