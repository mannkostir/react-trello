import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { Comment } from 'types/BoardPage.types';
import { CommentsState } from 'types/store.types';
import { createUUID } from 'utils/createUUID';

export const defaultComments: CommentsState = {
  currentComments: [],
  isLoading: false,
};

export const getComments = createAsyncThunk(
  'comments/getComments',
  async () => {
    const getComments = () =>
      new Promise<CommentsState>((resolve, reject) => {
        setTimeout(() => {
          const state: CommentsState = localStorage.getItem(
            RootStateKeys.COMMENTS_STATE
          )
            ? JSON.parse(localStorage.getItem(RootStateKeys.COMMENTS_STATE)!)
            : defaultComments;

          resolve(state);
        }, 2500);
      });

    const result = await getComments();

    return result;
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: defaultComments,
  reducers: {
    addComment(comments, action: PayloadAction<Omit<Comment, 'id' | 'date'>>) {
      let uuid: string = createUUID();
      let date: string = new Date().toLocaleDateString();

      const { author, cardId, content } = action.payload;

      comments.currentComments.push({
        author,
        cardId,
        content,
        date,
        id: uuid,
      });

      localStorage.setItem(
        RootStateKeys.COMMENTS_STATE,
        JSON.stringify(comments)
      );
    },
    removeComment(comments, action: PayloadAction<Pick<Comment, 'id'>>) {
      const targetIndex = comments.currentComments.findIndex(
        (comment) => comment.id === action.payload.id
      );

      comments.currentComments.splice(targetIndex, 1);

      localStorage.setItem(
        RootStateKeys.COMMENTS_STATE,
        JSON.stringify(comments)
      );
    },
    editComment(
      comments,
      action: PayloadAction<Pick<Comment, 'id' | 'content'>>
    ) {
      const { content, id } = action.payload;

      const targetIndex = comments.currentComments.findIndex(
        (comment) => comment.id === id
      );

      comments.currentComments[targetIndex] = {
        ...comments.currentComments[targetIndex],
        content,
      };

      localStorage.setItem(
        RootStateKeys.COMMENTS_STATE,
        JSON.stringify(comments)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (comments, action) => {
        return { ...action.payload, isLoading: false };
      })
      .addCase(getComments.pending, (comments, action) => {
        comments.isLoading = true;
      });
  },
});

export const { addComment, editComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
