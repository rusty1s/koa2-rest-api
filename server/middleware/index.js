'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';

export default function middleware() {
  return compose([
    logger(),
    helmet(), // set HTTP headers (e.g. remove x-powered-by)
    convert(cors()), // enable cors
    convert(bodyParser()),
    convert(session()),
  ]);
}
