import { IBoardState } from 'types/store.types';
import { BoardAction, BoardActionTypes } from './boardActions';
import { updateState } from 'shared/utils/updateState';
import { createUUID } from 'shared/utils/createUUID';

export const boardReducer = (
  state: IBoardState,
  action: BoardAction
): IBoardState => {
  switch (action.type) {
    case BoardActionTypes.ADD_LIST: {
      let uuid: string = createUUID();

      const newLists: typeof state.lists = [
        ...state.lists,
        { ...action.payload, id: uuid },
      ];

      return updateState(state, { lists: newLists }, 'boardState');
    }
    case BoardActionTypes.CHANGE_LIST_TITLE: {
      const newLists: typeof state.lists = state.lists.map((list) => {
        if (list.id === action.payload.id) {
          list.title = action.payload.title;
        }
        return list;
      });

      return updateState(state, { lists: newLists }, 'boardState');
    }
    case BoardActionTypes.ADD_CARD: {
      let uuid: string = createUUID();

      const newCards: typeof state.cards = [
        ...state.cards,
        { ...action.payload, id: uuid },
      ];

      return updateState(state, { cards: newCards }, 'boardState');
    }
    case BoardActionTypes.REMOVE_CARD: {
      const newCards: typeof state.cards = state.cards.filter(
        (card) => card.id !== action.payload.id
      );

      return updateState(state, { cards: newCards }, 'boardState');
    }
    case BoardActionTypes.EDIT_CARD: {
      const newCards: typeof state.cards = state.cards.map((card) => {
        if (card.id === action.payload.id) {
          return { ...card, ...action.payload };
        }
        return card;
      });

      return updateState(state, { cards: newCards }, 'boardState');
    }
    case BoardActionTypes.ADD_COMMENT: {
      let uuid: string = createUUID();

      return updateState(
        state,
        {
          comments: [
            ...state.comments,
            { ...action.payload, date: new Date(), id: uuid },
          ],
        },
        'boardState'
      );
    }
    case BoardActionTypes.EDIT_COMMENT: {
      const newComments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return { ...comment, ...action.payload };
        }
        return comment;
      });

      return updateState(state, { comments: newComments }, 'boardState');
    }
    case BoardActionTypes.REMOVE_COMMENT: {
      const newComments = state.comments.filter(
        (comment) => comment.id !== action.payload.id
      );

      return updateState(state, { comments: newComments }, 'boardState');
    }
    default:
      return state;
  }
};
