'use strict';

import passport from 'koa-passport';
import importDir from 'import-dir';

const strategies = importDir('./strategies');

export default function auth() {
  Object.keys(strategies).forEach(name => {
    passport.use(strategies[name]);
  });

  return passport.initialize();
}
