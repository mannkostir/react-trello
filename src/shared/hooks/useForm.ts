import { useState } from 'react';

export const useForm = (initialValue: Map<string, string> = new Map()) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(values.set(e.target.name, e.target.value));
  };

  return { keyValueMap: values, handleChange };
};
