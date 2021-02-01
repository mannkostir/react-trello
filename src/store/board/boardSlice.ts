import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { card } from 'pages/BoardPage/components/Card/Card.module.css';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Card, Comment, List } from 'types/BoardPage.types';
import { IBoardState } from 'types/store.types';
import API from 'utils/API';
import { createUUID } from 'utils/createUUID';

export const defaultBoard: IBoardState = localStorage.getItem('boardState')
  ? JSON.parse(localStorage.getItem('boardState') || '')
  : {
      lists: [
        { id: '1', title: 'To Do' },
        { id: '2', title: 'In Progress' },
        { id: '3', title: 'Testing' },
        { id: '4', title: 'Done' },
      ],
      cards: [],
      comments: [],
    };

const getAllLists = createAsyncThunk(
  'lists/getAllByUserId',
  async (userId: string) => {
    const api = new API(userId);

    const res = await api.getLists();

    return res.lists;
  }
);
const getAllCards = createAsyncThunk(
  'cards/getAllByListId',
  async ({ userId, listId }: { userId: string; listId: string }) => {
    const api = new API(userId);

    const res = await api.getCards(listId);
    return res.cards;
  }
);
const getAllComments = createAsyncThunk(
  'comments/getAllByCardId',
  async ({
    userId,
    listId,
    cardId,
  }: {
    userId: string;
    listId: string;
    cardId: string;
  }) => {
    const api = new API(userId);

    const res = await api.getComments(listId, cardId);

    return res.comments;
  }
);
const createList = createAsyncThunk(
  'lists/createList',
  async ({ userId, listData }: { userId: string; listData: List }) => {
    const api = new API(userId);

    const res = await api.createList({ ...listData, cards: [], comments: [] });

    return res.lists;
  }
);
const createCard = createAsyncThunk(
  'cards/createCard',
  async ({ userId, cardData }: { userId: string; cardData: Card }) => {
    const api = new API(userId);

    const res = await api.createCard(cardData.listId, cardData);

    return res.cards;
  }
);
const createComment = createAsyncThunk(
  'comments/createComments',
  async ({
    userId,
    listId,
    commentData,
  }: {
    userId: string;
    listId: string;
    commentData: Comment;
  }) => {
    const api = new API(userId);

    const res = await api.createComment(
      listId,
      commentData.cardId,
      commentData
    );

    return res.comments;
  }
);
const deleteCard = createAsyncThunk(
  'comments/deleteCard',
  async ({
    userId,
    cardData,
  }: {
    userId: string;
    cardData: Pick<Card, 'id' | 'listId'>;
  }) => {
    const api = new API(userId);

    const res = await api.deleteCard(cardData.listId, cardData.id);

    return res.cards;
  }
);
const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({
    userId,
    listId,
    commentData,
  }: {
    userId: string;
    listId: string;
    commentData: Pick<Comment, 'cardId' | 'id'>;
  }) => {
    const api = new API(userId);

    const res = await api.deleteComment(
      listId,
      commentData.cardId,
      commentData.id
    );

    return res.comments;
  }
);

const boardSlice = createSlice({
  name: 'board',
  initialState: defaultBoard,
  reducers: {
    addList(state, action: PayloadAction<Pick<List, 'title'>>) {
      let uuid: string = createUUID();

      const list = { id: uuid, title: action.payload.title };

      state.lists.push(list);

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
    },
    changeListTitle(state, action: PayloadAction<Pick<List, 'id' | 'title'>>) {
      const targetIndex = state.lists.findIndex(
        (list) => list.id === action.payload.id
      );

      state.lists[targetIndex].title = action.payload.title;
    },
    removeList(state, action: PayloadAction<Pick<List, 'id'>>) {
      const targetIndex = state.lists.findIndex(
        (list) => list.id === action.payload.id
      );

      state.lists.splice(targetIndex, 1);

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
    },
    addCard(state, action: PayloadAction<Pick<Card, 'listId' | 'title'>>) {
      let uuid: string = createUUID();

      const { listId, title } = action.payload;

      state.cards.push({ listId, title, id: uuid });

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
    },
    removeCard(state, action: PayloadAction<Pick<Card, 'id'>>) {
      const targetIndex = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );

      state.cards.splice(targetIndex, 1);

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
    },
    editCard(state, action: PayloadAction<Partial<Card>>) {
      const targetIndex = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );

      state.cards[targetIndex] = {
        ...state.cards[targetIndex],
        ...action.payload,
      };

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
    },
    addComment(state, action: PayloadAction<Omit<Comment, 'id' | 'date'>>) {
      let uuid: string = createUUID();
      let date: string = new Date().toLocaleDateString();

      const { author, cardId, content } = action.payload;

      state.comments.push({
        author,
        cardId,
        content,
        date,
        id: uuid,
      });

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
    },
    removeComment(state, action: PayloadAction<Pick<Comment, 'id'>>) {
      console.log(state.comments, action.payload.id);
      const targetIndex = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );

      state.comments.splice(targetIndex, 1);

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
    },
    editComment(state, action: PayloadAction<Pick<Comment, 'id' | 'content'>>) {
      const { content, id } = action.payload;

      const targetIndex = state.comments.findIndex(
        (comment) => comment.id === id
      );

      state.comments[targetIndex] = {
        ...state.comments[targetIndex],
        content,
      };

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllLists.fulfilled,
        (state, action: PayloadAction<List[]>) => {
          state.lists = action.payload;
        }
      )
      .addCase(
        getAllCards.fulfilled,
        (state, action: PayloadAction<Card[]>) => {
          state.cards = action.payload;
        }
      )
      .addCase(
        getAllComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
        }
      )
      .addCase(createList.fulfilled, (state, action: PayloadAction<List[]>) => {
        state.lists = action.payload;
      })
      .addCase(createCard.fulfilled, (state, action: PayloadAction<Card[]>) => {
        state.cards = action.payload;
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
        }
      )
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<Card[]>) => {
        state.cards = action.payload;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
        }
      );
  },
});

export const {
  addCard,
  addComment,
  addList,
  changeListTitle,
  editCard,
  editComment,
  removeCard,
  removeComment,
  removeList,
} = boardSlice.actions;

export default boardSlice.reducer;
