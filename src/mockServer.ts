import { createServer, Model, Registry, Response, Factory } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';
import MockDB from 'utils/MockDB';

interface ICard {
  readonly id: string;
  listId: string;
  title: string;
  description?: string;
  comments: IComment[];
  readonly userId: string | null;
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
  title: string;
  cards: ICard[];
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

const mockDB = new MockDB();

export default function makeServer() {
  return createServer({
    models: {
      list: ListModel,
      card: Model,
      comment: Model,
    },
    seeds(server) {
      server.db.loadData(
        localStorage.getItem('db')
          ? JSON.parse(localStorage.getItem('db')!)
          : {
              lists: [],
              cards: [],
              comments: [],
            }
      );
    },
    routes() {
      this.get('api/:userId/lists', (schema: AppSchema, req) => {
        const lists = schema.all('list').models.map((list) => {
          schema.all('card').models.forEach((card) => {
            if (card.listId === list.id) {
              schema.all('comment').models.forEach((comment) => {
                if (comment.cardId === card.id) {
                  card.comments.push(comment);
                }
              });
              list.cards.push(card);
            }
          });
        });

        return new Response(200, {}, lists);
      });
      this.post('api/:userId/board/lists', (schema: AppSchema, req) => {
        const newList: IList = JSON.parse(req.requestBody);

        schema.create('list', newList);

        mockDB.setItem('db', JSON.stringify(schema.db));

        return new Response(201, {}, { list: newList });
      });
      this.patch(
        'api/:userId/board/lists/:listId',
        (schema: AppSchema, req) => {
          const update: IList = JSON.parse(req.requestBody);

          const list = schema.findBy('list', {
            id: req.params.listId,
          });

          if (!list) return new Response(404);

          list.update(update);

          return new Response(201, {}, { list });
        }
      );
      this.post('api/:userId/board/cards', (schema: AppSchema, req) => {
        const newCard: ICard = JSON.parse(req.requestBody);

        schema.create('card', newCard);

        mockDB.setItem('db', JSON.stringify(schema.db));

        return new Response(201, {}, { card: newCard });
      });
    },
  });
}
