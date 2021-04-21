import * as Boom from '@hapi/boom';
import * as config from "config";

export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (Boom.isBoom(err)) {
      const { output: { statusCode, payload } } = err;
      ctx.body = {
        status: statusCode,
        message: payload.message,
        error: payload.error
      }
      return
    }

    ctx.body = {
      status: 500,
      error: 'Internal Error',
      message: err.message
    }
  }
};

// export const cors = async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', config.domain);
//   ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//   ctx.set('Access-Control-Allow-Credentials', 'true');

//   console.log(`${ctx.method} ${ctx.path}`);
//   if (ctx.method !== 'OPTIONS') {
//     await next();
//   } else {
//     ctx.body = '';
//     ctx.status = 204;
//   }
// };