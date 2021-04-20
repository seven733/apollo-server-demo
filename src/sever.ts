import * as Koa from 'koa';
import * as koaJwt from 'koa-jwt'
import * as Router from 'koa-router';
const bodyParser = require('koa-bodyparser');
// import { ApolloServer } from 'apollo-server-koa';
const { ApolloServer } = require('apollo-server-koa');
import { typeDefs, resolvers } from './schemas/index';
import UserService from './services/user';
import * as config from "config";
import { errorHandler, cors } from './middleware';
import { db } from './models/connect';
db();

const router = new Router();
const app = new Koa();
const { secret, PORT } = config;

router.get('/api/ping', ctx => ctx.body = 'success');
router.post('/api/login', async ctx => await UserService.login(ctx));
router.post('/api/register', async ctx => await UserService.register(ctx));

app
  .use(cors)
  .use(koaJwt({ secret, getToken: (ctx) => ctx.cookies.get('token')})
    .unless({ path: [ '/api/login', '/api/register', '/graphql' ] }))
  .use(errorHandler)
  .use(bodyParser())
  .use(router.routes())

// create apollo client
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => ({
    ...ctx,
    ...app.context
  })
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log( `🚀🚀🚀🚀🚀Server ready at http://localhost:4000${server.graphqlPath}`)
);
