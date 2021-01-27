import React from 'react';
import './PopupWindow.css';

const PopupWindow = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
  isVisible: boolean;
}) => {
  return (
    <div className="overlay">
      <div className="popup">{children}</div>
    </div>
  );
};

export default PopupWindow;
