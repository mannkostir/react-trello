import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { State } from 'types/store.types';

interface ICard {
  readonly id: string;
  listId: string;
  title: string;
  description?: string;
}
interface IComment {
  readonly id: string;
  readonly author: string;
  content: string;
  readonly date: string;
  readonly cardId: string;
}
interface IList {
  readonly id: string;
  readonly userId: string;
  title: string;
  cards: ICard[];
  comments: IComment[];
}

export const useMockAPI = () => {
  const state = useSelector((state: RootState) => state);

  const getLists = async () => {
    if (!state.auth.currentUser?.id) return;

    const res = await fetch(`/api/${state.auth.currentUser?.id}/lists`);
    const lists = await res.json();
  };
  const getCards = async (listId: string) => {
    const res = await fetch(
      `/api/${state.auth.currentUser?.id}/lists/${listId}/cards`
    );
  };
  const getComments = async (listId: string, cardId: string) => {
    const res = await fetch(
      `/api/${state.auth.currentUser?.id}/lists/${listId}/cards/${cardId}`
    );
    const comments = await res.json();
  };

  const createList = async (listData: IList) => {
    const res = await fetch(`/api/${state.auth.currentUser?.id}/lists/`, {
      method: 'POST',
      body: JSON.stringify(listData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const createCard = async (cardData: ICard) => {
    const res = await fetch(
      `/api/${state.auth.currentUser?.id}/lists/${cardData.listId}/cards`,
      { method: 'POST' }
    );
  };
  const createComment = async (commentData: IComment & { listId: string }) => {
    const res = await fetch(
      `/api/${state.auth.currentUser?.id}/lists/${commentData.listId}/cards/${commentData.cardId}/comments`,
      { method: 'POST', body: JSON.stringify(commentData) }
    );
  };

  const deleteCard = async (cardData: { listId: string; id: string }) => {
    const res = await fetch(
      `/api/${state.auth.currentUser?.id}/lists/${cardData.listId}/cards/${cardData.id}`,
      { method: 'DELETE' }
    );
  };
  const deleteComment = async (commentData: {
    listId: string;
    cardId: string;
    id: string;
  }) => {
    const res = await fetch(
      `/api/${state.auth.currentUser?.id}/lists/${commentData.listId}/cards/${commentData.cardId}/comments/${commentData.id}`,
      { method: 'DELETE' }
    );
  };

  return {
    getLists,
    getCards,
    getComments,
    createList,
    createCard,
    createComment,
    deleteCard,
    deleteComment,
  };
};
