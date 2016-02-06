'use strict';

import { Strategy as BearerStrategy } from 'passport-http-bearer';
import AccessToken from '../../models/access-token';

export default new BearerStrategy(async (token, done) => {
  (async () => {
    try {
      const accessToken = await AccessToken
        .findOne({ token })
        .populate('user')
        .exec();

      if (!accessToken) return done(null, false);

      return done(null, accessToken.user, { scope: '*' });
    } catch (error) {
      return done(error);
    }
  })();
});
