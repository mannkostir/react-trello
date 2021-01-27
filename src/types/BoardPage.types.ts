export type comment = {
  readonly id: string;
  readonly author: string;
  content: string;
  readonly date: Date;
  readonly cardId: string;
};

export type card = {
  readonly id: string;
  listId: string;
  title: string;
  description?: string;
};

export type activity = {
  readonly id: string;
  readonly action: string;
  readonly data: Date;
  readonly cardId: string;
};

export type list = {
  readonly id: string;
  title: string;
};

export type user = {
  readonly id: string;
  username: string;
};
