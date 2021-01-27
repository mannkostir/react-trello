const nativeInputValueSetter = window.Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
)!.set;
const nativeTextAreaValueSetter = window.Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  'value'
)!.set;

const inputEvent = new Event('input', { bubbles: true });

export const useInput = () => {
  const triggerInputChangeEvent = (
    input: HTMLInputElement = window.HTMLInputElement.prototype,
    value = ''
  ) => {
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(input, value);
    }
    input.dispatchEvent(inputEvent);
  };

  const triggerTextAreaChangeEvent = (
    input: HTMLTextAreaElement = window.HTMLTextAreaElement.prototype,
    value = ''
  ) => {
    if (nativeTextAreaValueSetter) {
      nativeTextAreaValueSetter.call(input, value);
    }
    input.dispatchEvent(inputEvent);
  };

  return { triggerInputChangeEvent, triggerTextAreaChangeEvent };
};
