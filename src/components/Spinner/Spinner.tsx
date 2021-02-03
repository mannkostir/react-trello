import React from 'react';
import styles from './Spinner.module.css';

// Stole from here: https://tobiasahlin.com/spinkit/

const Spinner = ({ style }: { style?: {} }) => {
  return (
    <div className={styles['sk-chase']} style={style}>
      <div className={styles['sk-chase-dot']}></div>
      <div className={styles['sk-chase-dot']}></div>
      <div className={styles['sk-chase-dot']}></div>
      <div className={styles['sk-chase-dot']}></div>
      <div className={styles['sk-chase-dot']}></div>
      <div className={styles['sk-chase-dot']}></div>
    </div>
  );
};

export default Spinner;
