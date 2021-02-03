import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { List } from 'types/BoardPage.types';
import { ListsState } from 'types/store.types';
import { createUUID } from 'utils/createUUID';

export const defaultLists: ListsState = {
  currentLists: [],
  isLoading: false,
};

export const getState = createAsyncThunk('lists/getState', async () => {
  const getState = () =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });

  const result = await getState();

  return result;
});

export const listsSlice = createSlice({
  name: 'lists',
  initialState: defaultLists,
  reducers: {
    addList(lists, action: PayloadAction<Pick<List, 'title'>>) {
      let uuid: string = createUUID();

      const list = { id: uuid, title: action.payload.title };

      lists.currentLists.push(list);
    },
    changeListTitle(lists, action: PayloadAction<Pick<List, 'id' | 'title'>>) {
      const targetIndex = lists.currentLists.findIndex(
        (list) => list.id === action.payload.id
      );

      lists.currentLists[targetIndex].title = action.payload.title;
    },
    removeList(lists, action: PayloadAction<Pick<List, 'id'>>) {
      const targetIndex = lists.currentLists.findIndex(
        (list) => list.id === action.payload.id
      );

      lists.currentLists.splice(targetIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getState.fulfilled, (lists, action) => {
        lists.isLoading = false;
        return lists;
      })
      .addCase(getState.pending, (lists, action) => {
        lists.isLoading = true;
      });
  },
});

export const { addList, changeListTitle, removeList } = listsSlice.actions;
export default listsSlice.reducer;
