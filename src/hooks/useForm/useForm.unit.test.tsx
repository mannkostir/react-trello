import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { useForm } from './useForm';

const UseFormExample = ({
  onSubmit = (formValues: Map<string, string>): void => {},
}) => {
  const { keyValueMap, handleChange } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(keyValueMap);
  };

  return (
    <form data-testid="test-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Enter your name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
      />
      <input
        type="checkbox"
        id="subscribe"
        name="subscribe"
        value="subscribe"
        onChange={handleChange}
      />
      <label htmlFor="subscribe">Subscribe</label>
      <input
        type="radio"
        id="male"
        name="gender"
        value="male"
        onChange={handleChange}
      />
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        onChange={handleChange}
      />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        id="undecided"
        name="gender"
        value="undecided"
        onChange={handleChange}
      />
      <label htmlFor="undecided">Somewhere in between</label>
      <button type="submit">Submit</button>
    </form>
  );
};

describe('useForm', () => {
  test('test', () => {
    let data: Map<string, string> = new Map();

    render(<UseFormExample onSubmit={(formData) => (data = formData)} />);

    userEvent.type(screen.getByPlaceholderText(/enter your name/i), 'Dohn Joe');

    userEvent.type(
      screen.getByPlaceholderText(/enter your email/i),
      'abc@xyz.asd'
    );

    userEvent.type(
      screen.getByPlaceholderText(/enter your password/i),
      'donottellanyone'
    );

    userEvent.click(screen.getByLabelText(/subscribe/i));

    userEvent.click(screen.getByLabelText(/^male/i));

    userEvent.click(screen.getByLabelText(/somewhere in between/i));

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(data.get('username')).toEqual(expect.stringMatching(/dohn joe/i));

    expect(data.get('email')).toEqual(expect.stringMatching(/abc@xyz.asd/i));

    expect(data.get('password')).toEqual('donottellanyone');

    expect(data.get('subscribe')).toBeTruthy();

    expect(data.get('gender')).toEqual(expect.stringMatching(/undecided/i));
  });
});
