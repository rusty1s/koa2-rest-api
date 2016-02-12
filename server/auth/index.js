'use strict';

import passport from 'koa-passport';
import compose from 'koa-compose';
import importDir from 'import-dir';
import User from '../models/user';
import { prefix } from '../api/config';
import * as provider from './provider';

const strategies = importDir('./strategies');

Object.keys(strategies).forEach(name => {
  passport.use(name, strategies[name]);
});

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
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

const facebookCallbackURL = prefix + provider.facebook.callbackRoute;

export function isFacebookAuthenticated() {
  return passport.authenticate('facebook', {
    scope: ['email'],
    callbackURL: facebookCallbackURL,
  });
}

export function isFacebookAuthenticatedCallback() {
  return passport.authenticate('facebook', {
    failureRedirect: '/login',
    callbackURL: facebookCallbackURL,
  });
}
