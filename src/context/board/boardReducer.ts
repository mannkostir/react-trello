import { card } from 'types/BoardPage.types';
import { State } from 'types/store.types';
import { BoardAction, BoardActionTypes } from './boardActions';

const createUUID = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};

export const boardReducer = (state: State, action: BoardAction): State => {
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
    case BoardActionTypes.ARCHIVE_CARD: {
      let archivedCard: card | undefined;

      const newCards: typeof state.cards = state.cards.flatMap((card) => {
        if (card.id === action.payload.id) {
          archivedCard = card;
          return [];
        } else {
          return card;
        }
      });

      const newArchive: typeof state.archive = [...state.archive];

      if (archivedCard) {
        newArchive.push(archivedCard);
      }

      return { ...state, cards: newCards, archive: newArchive };
    }
    case BoardActionTypes.REMOVE_CARD: {
      const newArchive: typeof state.archive = state.archive.filter(
        (card) => card.id === action.payload.id
      );

      return { ...state, archive: newArchive };
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
    default:
      return state;
  }
};
