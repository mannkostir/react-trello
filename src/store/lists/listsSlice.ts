import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { List } from 'types/BoardPage.types';
import { ListsState } from 'types/store.types';
import { createUUID } from 'utils/createUUID';

export const defaultLists: ListsState = {
  currentLists: [],
  isLoading: false,
};

export const getState = createAsyncThunk('lists/getState', async () => {
  const getState = () =>
    new Promise<ListsState>((resolve, reject) => {
      setTimeout(() => {
        const state: ListsState = localStorage.getItem(
          RootStateKeys.LISTS_STATE
        )
          ? JSON.parse(localStorage.getItem(RootStateKeys.LISTS_STATE)!)
          : {
              ...defaultLists,
              currentLists: [
                ...defaultLists.currentLists,
                { id: '1', title: 'To Do' },
                { id: '2', title: 'In Progress' },
                { id: '3', title: 'Testing' },
                { id: '4', title: 'Done' },
              ],
            };

        resolve(state);
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

      localStorage.setItem(RootStateKeys.LISTS_STATE, JSON.stringify(lists));
    },
    changeListTitle(lists, action: PayloadAction<Pick<List, 'id' | 'title'>>) {
      const targetIndex = lists.currentLists.findIndex(
        (list) => list.id === action.payload.id
      );

      lists.currentLists[targetIndex].title = action.payload.title;

      localStorage.setItem(RootStateKeys.LISTS_STATE, JSON.stringify(lists));
    },
    removeList(lists, action: PayloadAction<Pick<List, 'id'>>) {
      const targetIndex = lists.currentLists.findIndex(
        (list) => list.id === action.payload.id
      );

      lists.currentLists.splice(targetIndex, 1);

      localStorage.setItem(RootStateKeys.LISTS_STATE, JSON.stringify(lists));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getState.fulfilled, (lists, action) => {
        return { ...action.payload, isLoading: false };
      })
      .addCase(getState.pending, (lists, action) => {
        lists.isLoading = true;
      });
  },
});

export const { addList, changeListTitle, removeList } = listsSlice.actions;
export default listsSlice.reducer;
