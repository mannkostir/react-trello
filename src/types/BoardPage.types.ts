export type Comment = {
  readonly id: string;
  readonly author: string;
  content: string;
  readonly date: Date;
  readonly cardId: string;
};

export type Card = {
  readonly id: string;
  listId: string;
  title: string;
  description?: string;
};

export type Activity = {
  readonly id: string;
  readonly action: string;
  readonly data: Date;
  readonly cardId: string;
};

export type List = {
  readonly id: string;
  title: string;
};

export type User = {
  readonly id: string;
  username: string;
};
