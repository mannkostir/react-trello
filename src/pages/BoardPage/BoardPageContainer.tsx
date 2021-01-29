import React, { useEffect, useState } from 'react';
import BoardPageLists from './components/BoardPageLists';
import { User } from 'types/BoardPage.types';
import { useForm } from 'hooks/useForm/useForm';
import { createUUID } from 'utils/createUUID';
import FirstVisitForm from './components/FirstVisitFormPopup';
import styles from './BoardPageContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from 'store/auth/authSlice';
import type { RootState } from 'store';

const BoardPageContainer = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  // const [cachedUser, setCachedUser] = useState<Pick<
  //   User,
  //   'id' | 'username'
  // > | null>(null);

  // const [isFirstVisit, setIsFirstVisit] = useState(false);

  // const { handleChange, keyValueMap } = useForm();

  // const handleUserFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   let uuid = createUUID();

  //   const username = keyValueMap.get('username');

  //   if (username) {
  //     const user: User = { id: uuid, username };
  //     dispatch(signIn({ username, id: uuid }));
  //     localStorage.setItem('cachedUser', JSON.stringify(user));
  //     setCachedUser(user);
  //   }
  // };

  // useEffect(() => {
  //   setIsFirstVisit(!cachedUser);
  // }, [cachedUser]);

  useEffect(() => {
    // const userStorageJSON = localStorage.getItem('cachedUser');
    // if (!userStorageJSON) return;
    // const user = JSON.parse(userStorageJSON);
    // dispatch(signIn(user));
    // setIsFirstVisit(false);
  }, []);

  return (
    <section className={`${styles.container} fluid-container`}>
      {/* <FirstVisitForm
        isVisible={isFirstVisit}
        handleChange={handleChange}
        handleUserFormSubmit={handleUserFormSubmit}
      /> */}
      <BoardPageLists state={state} dispatch={dispatch} />
    </section>
  );
};

export default BoardPageContainer;
