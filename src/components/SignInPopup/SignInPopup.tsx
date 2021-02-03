import PopupWindow from 'components/PopupWindow';
import { useForm } from 'hooks/useForm';
import React from 'react';
import authPopupStyles from 'styles/AuthPopup.module.css';

interface ISignInPopupProps {
  isVisible: boolean;
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  onClose: () => void;
}

const SignInPopup = ({
  isVisible = false,
  signIn,
  onClose,
}: ISignInPopupProps) => {
  const { handleChange, keyValueMap } = useForm();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = keyValueMap.get('username');
    const password = keyValueMap.get('password');

    if (!username || !password) throw new Error('Status: 400');

    signIn({ password, username });
  };
  return (
    <PopupWindow isVisible={isVisible}>
      <span className={authPopupStyles.closeIcon} onClick={onClose}>
        CLOSE
      </span>
      <form className={authPopupStyles.authForm} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          required={true}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required={true}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </PopupWindow>
  );
};

export default SignInPopup;
