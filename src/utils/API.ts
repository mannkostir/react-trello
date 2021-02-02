import { List } from 'types/BoardPage.types';

interface ICard {
  readonly id: string;
  listId: string;
  title: string;
  description?: string;
}
interface IComment {
  readonly id: string;
  readonly author: string;
  content: string;
  readonly date: string;
  readonly cardId: string;
}
interface IList {
  readonly id: string;
  title: string;
  cards: ICard[];
  comments: IComment[];
}

export default class API {
  userId: string;

  constructor(userId: string | undefined | null) {
    if (!userId) {
      throw new Error('Not authorized to make API calls');
    }

    this.userId = userId;
  }

  getLists = async () => {
    try {
      const res = await fetch(`api/${this.userId}/lists`);
      const lists: IList[] = await res.json();

      return { lists };
    } catch (e) {
      throw e;
    }
  };
  createList = async (listData: IList) => {
    const res = await fetch(`/api/${this.userId}/lists`, {
      method: 'POST',
      body: JSON.stringify(listData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { list } = await res.json();

    return { list };
  };
}
