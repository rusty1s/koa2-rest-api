'use strict';

import Koa from 'koa';

import middleware from './middleware';
import api from './api';

const app = new Koa();

app.use(middleware());
app.use(api());
app.use(ctx => ctx.status = 404);

export default app;
