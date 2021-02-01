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

  constructor(userId: string | undefined) {
    if (!userId) {
      throw new Error('Not authorized to make API calls');
    }

    this.userId = userId;
  }

  getLists = async () => {
    const res = await fetch(`/api/${this.userId}/lists`);
    const lists = await res.json();

    return { lists };
  };
  getCards = async (listId: string) => {
    const res = await fetch(`/api/${this.userId}/lists/${listId}/cards`);
    const cards = await res.json();

    return { cards };
  };
  getComments = async (listId: string, cardId: string) => {
    const res = await fetch(
      `/api/${this.userId}/lists/${listId}/card/${cardId}/comments`
    );
    const comments = await res.json();

    return { comments };
  };

  createList = async (listData: IList) => {
    const res = await fetch(`/api/${this.userId}/lists`, {
      method: 'POST',
      body: JSON.stringify(listData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const lists = await res.json();

    return { lists };
  };
  createCard = async (listId: string, cardData: ICard) => {
    const res = await fetch(`/api/${this.userId}/lists/${listId}/cards`, {
      method: 'POST',
      body: JSON.stringify(cardData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const cards = await res.json();

    return { cards };
  };
  createComment = async (
    listId: string,
    cardId: string,
    commentData: IComment
  ) => {
    const res = await fetch(
      `/api/${this.userId}/lists/${listId}/cards/${cardId}/comments`,
      { method: 'POST', body: JSON.stringify(commentData) }
    );
    const comments = await res.json();

    return { comments };
  };

  deleteCard = async (listId: string, cardId: string) => {
    const res = await fetch(
      `/api/${this.userId}/lists/${listId}/cards/${cardId}`,
      { method: 'DELETE' }
    );
    const cards = await res.json();

    return { cards };
  };
  deleteComment = async (listId: string, cardId: string, commentId: string) => {
    const res = await fetch(
      `/api/${this.userId}/lists/${listId}/cards/${cardId}/comments/${commentId}`
    );
    const comments = await res.json();

    return { comments };
  };
}
