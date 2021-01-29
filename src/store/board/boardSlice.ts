import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { Card, Comment, List } from 'types/BoardPage.types';
import { IBoardState } from 'types/store.types';
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
