import React from 'react';
import PopupWindow from 'components/PopupWindow/PopupWindow';
import styles from './FirstVisitFormPopup.module.css';

interface FirstVisitProps {
  isVisible: boolean;
  handleUserFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

const FirstVisitForm = ({
  isVisible,
  handleChange,
  handleUserFormSubmit,
}: FirstVisitProps) => {
  return (
    <PopupWindow isVisible={isVisible}>
      <div>
        <form className={styles.form} onSubmit={handleUserFormSubmit}>
          <label htmlFor="usernameInput">Enter your username:</label>
          <input
            type="text"
            name="username"
            id="usernameInput"
            onChange={handleChange}
            required={true}
          />
          <button type="submit">It's me, I swear</button>
        </form>
      </div>
    </PopupWindow>
  );
};

export default FirstVisitForm;
