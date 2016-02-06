'use strict';

import passport from 'koa-passport';
import compose from 'koa-compose';
import importDir from 'import-dir';
import User from '../models/user';

const strategies = importDir('./strategies');

Object.keys(strategies).forEach(name => {
  passport.use(name, strategies[name]);
});

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
  (async () => {
    const user = await User.findById(id);
    done(null, user);
  })();
});

export default function auth() {
  return compose([
    passport.initialize(),
    passport.session(),
  ]);
}

export function isClientAuthenticated() {
  return passport.authenticate('client-basic', { session: false });
}

export function isBearerAuthenticated() {
  return passport.authenticate('bearer', { session: false });
}
