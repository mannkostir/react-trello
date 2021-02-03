import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateKeys } from 'constants/localStorageKeys';
import { Card, User } from 'types/BoardPage.types';
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
export const updateCard = createAsyncThunk(
  'card/updateCard',
  async ({ newCard, userId }: { newCard: Card; userId: string | null }) => {
    const updateCard = () =>
      new Promise<typeof newCard>((resolve, reject) => {
        setTimeout(() => {
          if (!userId) reject('Status 401. Unauthorized');

          if (newCard.author.userId !== userId)
            reject('Status: 403. Forbidden');

          resolve(newCard);
        }, 1000);
      });

    const result = await updateCard();

    return result;
  }
);
export const deleteCard = createAsyncThunk(
  'card/deleteCard',
  async ({
    cardData,
    userId,
  }: {
    cardData: Pick<Card, 'id' | 'author'>;
    userId: string | null;
  }) => {
    const deleteCard = () => {
      return new Promise<{ cardId: string }>((resolve, reject) => {
        setTimeout(() => {
          if (!userId) reject('Status 401. Unauthorized');

          if (cardData.author.userId !== userId)
            reject('Status: 403. Forbidden');

          resolve({ cardId: cardData.id });
        }, 1000);
      });
    };

    const result = await deleteCard();

    return result;
  }
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: defaultCards,
  reducers: {
    addCard(
      cards,
      action: PayloadAction<Pick<Card, 'listId' | 'title' | 'author'>>
    ) {
      let uuid: string = createUUID();

      const { listId, title, author } = action.payload;

      cards.currentCards.push({ listId, title, id: uuid, author });

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
      })
      .addCase(updateCard.fulfilled, (cards, action) => {
        const targetIndex = cards.currentCards.findIndex(
          (card) => card.id === action.payload.id
        );

        cards.currentCards[targetIndex] = {
          ...cards.currentCards[targetIndex],
          ...action.payload,
        };

        cards.currentCards[targetIndex].isLoading = false;

        localStorage.setItem(RootStateKeys.CARDS_STATE, JSON.stringify(cards));
      })
      .addCase(updateCard.pending, (cards, action) => {
        const targetIndex = cards.currentCards.findIndex(
          (card) => card.id === action.meta.arg.newCard.id
        );

        cards.currentCards[targetIndex].isLoading = true;
      })
      .addCase(updateCard.rejected, (cards, action) => {
        const targetIndex = cards.currentCards.findIndex(
          (card) => card.id === action.meta.arg.newCard.id
        );

        cards.currentCards[targetIndex].isLoading = false;

        console.error(action.error.message);
      })
      .addCase(deleteCard.fulfilled, (cards, action) => {
        const targetIndex = cards.currentCards.findIndex(
          (card) => card.id === action.payload.cardId
        );

        cards.currentCards.splice(targetIndex, 1);

        localStorage.setItem(RootStateKeys.CARDS_STATE, JSON.stringify(cards));
      })
      .addCase(deleteCard.pending, (cards, action) => {
        const targetIndex = cards.currentCards.findIndex(
          (card) => card.id === action.meta.arg.cardData.id
        );

        cards.currentCards[targetIndex].isLoading = true;
      })
      .addCase(deleteCard.rejected, (cards, action) => {
        const targetIndex = cards.currentCards.findIndex(
          (card) => card.id === action.meta.arg.cardData.id
        );

        cards.currentCards[targetIndex].isLoading = false;

        console.error(action.error.message);
      });
  },
});

export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;
