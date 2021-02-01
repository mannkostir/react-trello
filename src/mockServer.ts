import { createServer, Model, Registry, Response } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

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

const ListModel: ModelDefinition<IList> = Model.extend({});
const CardModel: ModelDefinition<ICard> = Model.extend({});
const CommentModel: ModelDefinition<IComment> = Model.extend({});

type AppRegistry = Registry<
  {
    list: typeof ListModel;
    card: typeof CardModel;
    comment: typeof CommentModel;
  },
  {}
>;
type AppSchema = Schema<AppRegistry>;

export default function () {
  createServer({
    models: {
      list: ListModel,
      card: Model,
      comment: Model,
    },
    routes() {
      this.get('api/:userId/lists', (schema: AppSchema, req) => {
        const lists = schema.findBy('list', { userId: req.params.userId });

        return new Response(200, {}, { lists });
      });
      this.get('api/:userId/lists/:listId/cards', (schema: AppSchema, req) => {
        const list = schema.findBy('list', { userId: req.params.userId });

        return new Response(200, {}, { cards: list?.cards || [] });
      });
      this.get(
        'api/:userId/lists/:listId/cards/:cardId/comments',
        (schema: AppSchema, req) => {
          const list = schema.findBy('list', { userId: req.params.userId });

          return new Response(
            200,
            {},
            {
              comments:
                list?.comments.filter(
                  (comment) => comment.cardId === req.params.cardId
                ) || [],
            }
          );
        }
      );

      this.post('api/:userId/lists', (schema: AppSchema, req) => {
        const newList: IList = JSON.parse(req.requestBody);

        schema.create('list', newList);

        return new Response(201, {}, { list: newList });
      });
      this.post('api/:userId/lists/:listId/cards', (schema: AppSchema, req) => {
        const newCard = JSON.parse(req.requestBody);

        const list = schema.findBy('list', {
          userId: req.params.userId,
          id: req.params.listId,
        });

        if (!list) return new Response(404);

        list.update({ cards: [...list.cards, newCard] });

        return new Response(201, {}, { cards: list.cards });
      });
      this.post(
        'api/:userId/lists/:listId/cards/:cardId/comments',
        (schema: AppSchema, req) => {
          const newComment = JSON.parse(req.requestBody);

          const list = schema.findBy('list', {
            userId: req.params.userId,
            id: req.params.listId,
          });

          if (!list) return new Response(404);

          list.update({ comments: [...list.comments, newComment] });

          return new Response(201, {}, { comments: list.comments });
        }
      );

      this.delete(
        'api/:userId/lists/:listId/cards/:cardId',
        (schema: AppSchema, req) => {
          const list = schema.findBy('list', {
            userId: req.params.userId,
            id: req.params.listId,
          });

          if (!list) return new Response(404);

          list.update({
            cards: list.cards.filter((card) => card.id !== req.params.cardId),
          });

          return new Response(200, {}, { lists: list.cards });
        }
      );
      this.delete(
        'api/users/:userId/lists/:listId/cards/:cardId/comment/:commentId',
        (schema: AppSchema, req) => {
          const list = schema.findBy('list', {
            userId: req.params.userId,
            id: req.params.listId,
          });

          if (!list) return new Response(404);

          list.update({
            comments: list.comments.filter(
              (comment) => comment.id !== req.params.commentId
            ),
          });

          return new Response(200, {}, { comments: list.comments });
        }
      );
    },
  });
}
