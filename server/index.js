'use strict';

import Koa from 'koa';
import convert from 'koa-convert';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

const app = new Koa();

// convert legacy generator to promise middleware
const _use = app.use;
app.use = x => _use.call(app, convert(x));

app.use(logger());
app.use(helmet());  // set HTTP headers (e.g. remove x-powered-by)
app.use(cors()); // enable cors
app.use(bodyParser());

const router = new Router({
  prefix: '/api',
});

router.get('/', async ctx => {
  ctx.body = { message: 'api call' };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
  ctx.status = 404;
});

export default app;
