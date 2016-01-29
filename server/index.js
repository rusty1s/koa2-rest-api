'use strict';

import Koa from 'koa';
import logger from 'koa-logger';

const app = new Koa();

app.use(logger());

app.use(async ctx => {
  ctx.body = { message: 'hello world' };
});

export default app;
