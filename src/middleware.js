export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
      code: ctx.status
    };
  }
};

export const cors =  async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'localhost:3001');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  if (ctx.method !== 'OPTIONS') {
    await next();
  } else {
    ctx.body = '';
    ctx.status = 204;
  }
};