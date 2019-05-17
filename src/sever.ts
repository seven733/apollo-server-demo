import * as Koa from 'koa';
import * as koajwt from 'koa-jwt'
import * as Router from 'koa-router';
const bodyParser = require('koa-bodyparser');
import { ApolloServer } from 'apollo-server-koa';
import { typeDefs, resolvers } from './schemas/index';
import UserService from 'services/user';

const router = new Router();

const app = new Koa();
const secret = 'test';

// connect mongodb
import { db } from 'models/connect';
db();

async function login(ctx) {
  const token = await UserService.login(ctx.request.body);

  ctx.cookies.set( 'token', token, { maxAge: 60 * 60 * 1000, httpOnly: true });

  ctx.body = 'ok'
}

async function register(ctx) {
  ctx.body = await UserService.register(ctx.request.body);
}

router.post('/login', ctx => login(ctx));
router.post('/register', ctx => register(ctx));

app
  .use(koajwt({ secret, getToken: (ctx) => ctx.headers.authorization })
    .unless({ path: [ '/login', '/register' ] }))
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

app.listen({ port: 4000 }, () =>
  console.log( `🚀🚀🚀🚀🚀Server ready at http://localhost:4000${server.graphqlPath}`)
);
