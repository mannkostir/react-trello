import React from 'react';
import './PopupWindow.css';

const PopupWindow = ({
  children,
}: {
  children: JSX.Element | string;
  isVisible: boolean;
}) => {
  return <div className="popup">{children}</div>;
};

export default PopupWindow;
