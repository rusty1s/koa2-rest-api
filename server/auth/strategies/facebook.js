'use strict';

import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebook } from '../provider';
import User from '../../models/user';
import AccessToken from '../../models/access-token';

export default new FacebookStrategy({
  clientID: facebook.clientId,
  clientSecret: facebook.clientSecret,
  profileFields: ['displayName', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  (async () => {
    try {
      const email = profile._json.email;

      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          name: profile.displayName,
          provider: 'facebook',
        });
      }

      await AccessToken.findOneAndRemove({ user: user._id });

      await AccessToken.create({
        user: user._id,
      });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })();
});
