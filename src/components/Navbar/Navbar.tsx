import { current } from '@reduxjs/toolkit';
import React from 'react';
import { User } from 'types/BoardPage.types';
import styles from './Navbar.module.css';

interface INavbarProps {
  toggleSignInPopup: () => void;
  toggleSignUpPopup: () => void;
  currentUser: User | null;
  signOut: () => void;
}

const Navbar = ({
  toggleSignInPopup,
  toggleSignUpPopup,
  currentUser,
  signOut,
}: INavbarProps) => {
  return (
    <nav className={styles.mainNav}>
      <div className={styles.authButtons}>
        {!currentUser?.id ? (
          <>
            <button
              className={`${styles.button} ${styles.signUpBtn}`}
              onClick={toggleSignUpPopup}
            >
              Sign Up
            </button>
            <button className={`${styles.button}`} onClick={toggleSignInPopup}>
              Sign In
            </button>
          </>
        ) : (
          <button onClick={signOut}>Sign Out</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
