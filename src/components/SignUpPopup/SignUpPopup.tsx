import PopupWindow from 'components/PopupWindow';
import { useForm } from 'hooks/useForm';
import React from 'react';
import authPopupStyles from 'styles/AuthPopup.module.css';

interface ISignUpPopupProps {
  isVisible: boolean;
  signUp: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  onClose: () => void;
}

const SignUpPopup = ({
  isVisible = false,
  signUp,
  onClose,
}: ISignUpPopupProps) => {
  const { handleChange, keyValueMap } = useForm();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = keyValueMap.get('username');
    const password = keyValueMap.get('password');
    const passwordConfirm = keyValueMap.get('passwordConfirm');

    if (!username || !password || !passwordConfirm)
      throw new Error('Status: 400');

    if (password !== passwordConfirm) {
      throw new Error('Password do not match');
    }

    signUp({ password, username });
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
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm password"
          required={true}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </PopupWindow>
  );
};

export default SignUpPopup;
