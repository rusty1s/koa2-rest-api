'use strict';

import passport from 'koa-passport';
import importDir from 'import-dir';

const strategies = importDir('./strategies');

export default function auth() {
  Object.keys(strategies).forEach(name => {
    passport.use(name, strategies[name]);
  });

  return passport.initialize();
}

export function isClientAuthenticated() {
  return passport.authenticate('client-basic', { session: false });
}

export function isBearerAuthenticated() {
  return passport.authenticate('bearer', { sessio: false });
}
