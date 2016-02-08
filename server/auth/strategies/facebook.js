'use strict';

import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebook } from '../config';
import User from '../../models/user';

export default new FacebookStrategy({
  clientID: facebook.clientId,
  clientSecret: facebook.clientSecret,
  callbackURL: facebook.callbackUrl,
}, (accessToken, refreshToken, profile, done) => {
  (async () => {
    try {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);

      return done(null, false);
    } catch (error) {
      return done(error);
    }
  })();
});
