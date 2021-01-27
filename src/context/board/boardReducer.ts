import { defaultState } from 'context/store';
import { card } from 'types/BoardPage.types';
import { Reducer } from 'types/reducers.types';
import { State } from 'types/store.types';
import { BoardAction, BoardActionTypes } from './boardActions';

const createUUID = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};

export const boardReducer = (
  state = defaultState.board,
  action: BoardAction
): typeof defaultState.board => {
  switch (action.type) {
    case BoardActionTypes.ADD_LIST: {
      let uuid: string;

      do {
        uuid = createUUID();
      } while (state.lists.some((list) => list.id === uuid));

      const newLists: typeof state.lists = [
        ...state.lists,
        { ...action.payload, id: uuid },
      ];

      return { ...state, lists: newLists };
    }
    case BoardActionTypes.CHANGE_LIST_TITLE: {
      const newLists: typeof state.lists = state.lists.map((list) => {
        if (list.id === action.payload.id) {
          list.title = action.payload.title;
        }
        return list;
      });

      return { ...state, lists: newLists };
    }
    case BoardActionTypes.ADD_CARD: {
      let uuid: string;

      do {
        uuid = createUUID();
      } while (state.cards.some((card) => card.id === uuid));

      const newCards: typeof state.cards = [
        ...state.cards,
        { ...action.payload, id: uuid },
      ];

      return { ...state, cards: newCards };
    }
    case BoardActionTypes.REMOVE_CARD: {
      const newCards: typeof state.cards = state.cards.filter(
        (card) => card.id !== action.payload.id
      );

      return { ...state, cards: newCards };
    }
    case BoardActionTypes.EDIT_CARD: {
      const newCards: typeof state.cards = state.cards.map((card) => {
        if (card.id === action.payload.id) {
          return { ...card, ...action.payload };
        }
        return card;
      });

      return { ...state, cards: newCards };
    }
    case BoardActionTypes.ADD_COMMENT: {
      let uuid: string;

      do {
        uuid = createUUID();
      } while (state.comments.some((comment) => comment.id === uuid));

      return {
        ...state,
        comments: [
          ...state.comments,
          { ...action.payload, date: new Date(), id: uuid },
        ],
      };
    }
    case BoardActionTypes.EDIT_COMMENT: {
      const newComments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return { ...comment, ...action.payload };
        }
        return comment;
      });

      return { ...state, comments: newComments };
    }
    case BoardActionTypes.REMOVE_COMMENT: {
      const newComments = state.comments.filter((comment) => {
        if (comment.id === action.payload.id) {
          return [];
        }
        return comment;
      });

      return { ...state, comments: newComments };
    }
    default:
      return state;
  }
};
