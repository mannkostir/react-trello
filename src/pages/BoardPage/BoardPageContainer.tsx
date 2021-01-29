import React, { useEffect, useState } from 'react';
import BoardPageLists from './components/BoardPageLists';
import { useSelector } from 'context/useSelector';
import { useDispatch } from 'context/useDispatch';
import { user } from 'types/BoardPage.types';
import { useForm } from 'shared/hooks/useForm/useForm';
import { signInAC } from 'context/auth/authActions';
import { createUUID } from 'shared/utils/createUUID';
import FirstVisitForm from './components/FirstVisitFormPopup';
import styles from './BoardPageContainer.module.css';

const BoardPageContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [cachedUser, setCachedUser] = useState<Pick<
    user,
    'id' | 'username'
  > | null>(null);

  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const { handleChange, keyValueMap } = useForm();

  const handleUserFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let uuid = createUUID();

    const username = keyValueMap.get('username');

    if (username) {
      const user: user = { id: uuid, username };
      dispatch(signInAC({ username, id: uuid }));
      localStorage.setItem('cachedUser', JSON.stringify(user));
      setCachedUser(user);
    }
  };

  useEffect(() => {
    setIsFirstVisit(!cachedUser);
  }, [cachedUser]);

  useEffect(() => {
    const userStorageJSON = localStorage.getItem('cachedUser');

    if (!userStorageJSON) return;

    const user = JSON.parse(userStorageJSON);

    dispatch(signInAC(user));

    setIsFirstVisit(false);
  }, []);

  return (
    <section className={`${styles.container} fluid-container`}>
      <FirstVisitForm
        isVisible={isFirstVisit}
        handleChange={handleChange}
        handleUserFormSubmit={handleUserFormSubmit}
      />
      <BoardPageLists state={state} dispatch={dispatch} />
    </section>
  );
};

export default BoardPageContainer;
