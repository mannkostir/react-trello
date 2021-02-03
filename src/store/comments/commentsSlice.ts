import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
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
    },
    removeComment(comments, action: PayloadAction<Pick<Comment, 'id'>>) {
      const targetIndex = comments.currentComments.findIndex(
        (comment) => comment.id === action.payload.id
      );

      comments.currentComments.splice(targetIndex, 1);
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (comments, action) => {
        comments.isLoading = false;
        return comments;
      })
      .addCase(getComments.pending, (comments, action) => {
        comments.isLoading = true;
      });
  },
});

export const { addComment, editComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
