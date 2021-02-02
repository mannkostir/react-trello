import StoreProvider, { RootState } from 'store';
import BoardPageContainer from 'pages/BoardPage/BoardPageContainer';
import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from 'components/Navbar';
import SignInPopup from 'components/SignInPopup';
import SignUpPopup from 'components/SignUpPopup';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from 'store/users/usersSlice';
import { createUUID } from 'utils/createUUID';
import { signIn, signOut } from 'store/auth/authSlice';
import { User } from 'types/BoardPage.types';
import makeServer from './mockServer';

interface AuthCredentials {
  username: string;
  password: string;
}

makeServer();

function App() {
  const state = useSelector((state: RootState) => ({
    ...state.auth,
    ...state.users,
  }));
  const dispatch = useDispatch();

  const [isShowingSignUpPopup, setIsShowingSingUpPopup] = useState(false);
  const [isShowingSignInPopup, setIsShowingSignInPopup] = useState(false);

  const handleSignUp = (data: AuthCredentials) => {
    let uuid: string = createUUID();

    const candidate = data;

    const isExists = state.users.find(
      (user) => user.username === candidate.username
    );

    if (isExists) throw new Error('User witch such name already exists');

    dispatch(
      addUser({
        id: uuid,
        username: candidate.username,
        password: candidate.password,
      })
    );

    setIsShowingSingUpPopup(false);
  };
  const handleSignIn = (data: AuthCredentials) => {
    const candidate = data;

    const targetUser = state.users.find(
      (user) => user.username === candidate.username
    );

    if (!targetUser) throw new Error('Status: 401');

    const isCorrectData = targetUser.password === candidate.password;

    if (!isCorrectData) throw new Error('Status: 401');

    dispatch(signIn({ ...targetUser }));

    setIsShowingSignInPopup(false);
  };

  const handleSignOut = () => {
    if (state.currentUser?.id) {
      dispatch(signOut({ id: state.currentUser.id }));
    }
  };

  useEffect(() => {
    if (state.currentUser?.id) {
      const candidate = state.users.find(
        (user) => user.id === state.currentUser!.id
      );

      if (candidate) {
        dispatch(signIn(candidate));
      }
    }
  }, []);
  return (
    <div className="app-container">
      <Navbar
        toggleSignInPopup={() =>
          setIsShowingSignInPopup((isShowing) => !isShowing)
        }
        toggleSignUpPopup={() =>
          setIsShowingSingUpPopup((isShowing) => !isShowing)
        }
        currentUser={state.currentUser}
        signOut={handleSignOut}
      />
      <SignInPopup
        signIn={handleSignIn}
        onClose={() => setIsShowingSignInPopup(false)}
        isVisible={isShowingSignInPopup}
      />
      <SignUpPopup
        signUp={handleSignUp}
        onClose={() => setIsShowingSingUpPopup(false)}
        isVisible={isShowingSignUpPopup}
      />
      <BoardPageContainer />
    </div>
  );
}

export default App;
