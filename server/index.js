'use strict';

import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import Router from 'koa-router';

const app = new Koa();

app.use(logger());
app.use(helmet());  // set HTTP headers (e.g. remove x-powered-by)

const router = new Router({
  prefix: '/api',
});

router.get('/', function (ctx, next) {
  ctx.body = { message: 'api call' };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
  ctx.status = 404;
});

export default app;
