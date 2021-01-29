import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.mainNav}>
      <div className={styles.authButtons}>
        <button className={`${styles.button} ${styles.signUpBtn}`}>
          Sign Up
        </button>
        <button className={`${styles.button}`}>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
