import React from 'react';
import styles from './PopupWindow.module.css';

const PopupWindow = ({
  children,
  isVisible = false,
}: {
  children: JSX.Element | JSX.Element[] | string;
  isVisible: boolean;
}) => {
  return isVisible ? (
    <div className={styles.overlay}>
      <div className={styles.popup}>{children}</div>
    </div>
  ) : null;
};

export default PopupWindow;
