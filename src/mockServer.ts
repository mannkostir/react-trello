import { createServer, Model, Registry, Response } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

interface IList {
  readonly id: string;
  title: string;
}
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
      this.get('api/lists', (schema: AppSchema) => {
        return schema.all('list');
      });
      this.get('api/cards', (schema: AppSchema) => {
        return schema.all('card');
      });
      this.get('api/comments', (schema: AppSchema) => {
        return schema.all('comment');
      });

      this.post('api/lists', (schema: AppSchema, req) => {
        return schema.create('list', JSON.parse(req.requestBody));
      });
      this.post('api/cards', (schema: AppSchema, req) => {
        return schema.create('card', JSON.parse(req.requestBody));
      });
      this.post('api/cards', (schema: AppSchema, req) => {
        return schema.create('comment', JSON.parse(req.requestBody));
      });

      this.delete('api/cards/:id', (schema: AppSchema, req) => {
        const targetCard = schema.find('card', req.params.id);

        if (targetCard) {
          targetCard.destroy();
          return new Response(204);
        }

        return new Response(404);
      });
      this.delete('api/comments/:id', (schema: AppSchema, req) => {
        const targetComment = schema.find('comment', req.params.id);

        if (targetComment) {
          targetComment.destroy();
          return new Response(204);
        }

        return new Response(404);
      });
    },
  });
}
