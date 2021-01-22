export type comment = {
  author: string;
  content: string;
  date: Date;
};

export type card = {
  title: string;
  description?: string;
  comments?: comment[];
  activity?: [{ action: string; date: Date }];
};

export type list = {
  title: string;
  cards: card[];
};
