import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { Card, Comment, List } from 'types/BoardPage.types';
import { IBoardState } from 'types/store.types';
import API from 'utils/API';
import { createUUID } from 'utils/createUUID';

export const defaultBoard: IBoardState = false
  ? JSON.parse(localStorage.getItem('boardState') || '')
  : {
      lists: [
        // { id: '1', title: 'To Do' },
        // { id: '2', title: 'In Progress' },
        // { id: '3', title: 'Testing' },
        // { id: '4', title: 'Done' },
      ],
      cards: [],
      comments: [],
    };

export const getBoardState = createAsyncThunk(
  'boardState/getState',
  async (userId: string) => {
    const getLists = () =>
      new Promise<IBoardState>((resolve, reject) => {
        setTimeout(() => {
          const state: IBoardState = localStorage.getItem('boardState')
            ? JSON.parse(localStorage.getItem('boardState')!)
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

          resolve(state);
        }, 2000);
      });
    const result = await getLists();
    return result;
  }
);
export const createList = createAsyncThunk(
  'lists/createList',
  async ({
    userId,
    listData,
  }: {
    userId: string | null;
    listData: Pick<List, 'title'>;
  }) => {
    const createList = () => {
      return new Promise<typeof listData>((resolve, reject) => {
        setTimeout(() => {
          resolve(listData);
        }, 1000);
      });
    };

    const result = await createList();

    return result;
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({
    commentData,
  }: {
    commentData: Pick<Comment, 'author' | 'content' | 'cardId'>;
  }) => {
    const createComment = () => {
      return new Promise<typeof commentData>((resolve, reject) => {
        setTimeout(() => {
          resolve(commentData);
        }, 1000);
      });
    };

    const result = await createComment();

    return result;
  }
);

export type BoardAction = ReturnType<typeof getBoardState>;

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

      localStorage.setItem(RootStateKeys.BOARD_STATE, JSON.stringify(state));
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
        getBoardState.fulfilled,
        (state, action: PayloadAction<IBoardState>) => {
          console.log(state.lists);
          state.cards = action.payload.cards;
          state.comments = action.payload.comments;
          state.lists = action.payload.lists;

          document.body.dataset.loading = 'fulfilled';
        }
      )
      .addCase(getBoardState.pending, (state, action) => {
        document.body.dataset.loading = 'pending';
      })
      .addCase(getBoardState.rejected, (state, action) => {
        document.body.dataset.loading = 'fulfilled';
      })
      .addCase(
        createList.fulfilled,
        (state, action: PayloadAction<Pick<List, 'title'>>) => {
          let uuid: string = createUUID();
          state.lists.push({ ...action.payload, id: uuid });
        }
      )
      .addCase(
        createComment.fulfilled,
        (
          state,
          action: PayloadAction<Pick<Comment, 'content' | 'author' | 'cardId'>>
        ) => {
          let uuid: string = createUUID();
          let date = new Date().toLocaleTimeString();
          state.comments.push({ ...action.payload, id: uuid, date });

          localStorage.setItem(
            RootStateKeys.BOARD_STATE,
            JSON.stringify(state)
          );
          document.body.dataset.loading = 'fulfilled';
        }
      )
      .addCase(createComment.pending, (state, action) => {
        document.body.dataset.loading = 'pending';
      })
      .addCase(createComment.rejected, (state, action) => {
        document.body.dataset.loading = 'fulfilled';
      });
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
