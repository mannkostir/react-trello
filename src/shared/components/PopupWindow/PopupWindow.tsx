import React from 'react';
import './PopupWindow.css';

const PopupWindow = ({
  children,
  isVisible = false,
}: {
  children: JSX.Element | JSX.Element[] | string;
  isVisible: boolean;
}) => {
  return isVisible ? (
    <div className="overlay">
      <div className="popup">{children}</div>
    </div>
  ) : null;
};

export default PopupWindow;
