'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';

import db from '../db';

export default function api() {

  const router = new Router({
    prefix: '/api',
  });

  router.get('/test', async ctx => {
    const users = await db.User.findAll();
    ctx.body = users;
  });

  return compose([
    router.routes(),
    router.allowedMethods(),
  ]);
}
