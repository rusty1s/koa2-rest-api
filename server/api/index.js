'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';
import importDir from 'import-dir';
import { prefix } from './config';

const routes = importDir('./routes');

export default function api() {
  const router = new Router({ prefix });

  Object.keys(routes).forEach(name => routes[name](router));

  return compose([
    router.routes(),
    router.allowedMethods(),
  ]);
}
