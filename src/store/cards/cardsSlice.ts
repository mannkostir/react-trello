import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { Card } from 'types/BoardPage.types';
import { CardsState } from 'types/store.types';
import { createUUID } from 'utils/createUUID';

export const defaultCards: CardsState = {
  currentCards: [],
  isLoading: false,
};

export const getCards = createAsyncThunk('cards/getCards', async () => {
  const getCards = () =>
    new Promise<CardsState>((resolve, reject) => {
      setTimeout(() => {
        const state: CardsState = localStorage.getItem(
          RootStateKeys.CARDS_STATE
        )
          ? JSON.parse(localStorage.getItem(RootStateKeys.CARDS_STATE)!)
          : defaultCards;

        resolve(state);
      }, 2000);
    });

  const result = await getCards();

  return result;
});

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: defaultCards,
  reducers: {
    addCard(cards, action: PayloadAction<Pick<Card, 'listId' | 'title'>>) {
      let uuid: string = createUUID();

      const { listId, title } = action.payload;

      cards.currentCards.push({ listId, title, id: uuid });

      localStorage.setItem(RootStateKeys.CARDS_STATE, JSON.stringify(cards));
    },
    removeCard(cards, action: PayloadAction<Pick<Card, 'id'>>) {
      const targetIndex = cards.currentCards.findIndex(
        (card) => card.id === action.payload.id
      );

      cards.currentCards.splice(targetIndex, 1);

      localStorage.setItem(RootStateKeys.CARDS_STATE, JSON.stringify(cards));
    },
    editCard(cards, action: PayloadAction<Partial<Card>>) {
      const targetIndex = cards.currentCards.findIndex(
        (card) => card.id === action.payload.id
      );

      cards.currentCards[targetIndex] = {
        ...cards.currentCards[targetIndex],
        ...action.payload,
      };

      localStorage.setItem(RootStateKeys.CARDS_STATE, JSON.stringify(cards));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (cards, action) => {
        return { ...action.payload, isLoading: false };
      })
      .addCase(getCards.pending, (cards, action) => {
        cards.isLoading = true;
      });
  },
});

export const { addCard, editCard, removeCard } = cardsSlice.actions;
export default cardsSlice.reducer;
