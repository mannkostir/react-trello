export type Comment = {
  readonly id: string;
  readonly author: string;
  content: string;
  readonly date: string;
  readonly cardId: string;
};

export type Card = {
  readonly id: string;
  listId: string;
  title: string;
  description?: string;
  readonly author: { userId: string; username: string };
  isLoading?: boolean;
};

export type Activity = {
  readonly id: string;
  readonly action: string;
  readonly data: string;
  readonly cardId: string;
};

export type List = {
  readonly id: string;
  title: string;
};

export type User = {
  readonly id: string;
  username: string;
  password: string;
};
