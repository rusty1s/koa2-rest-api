'use strict';

import { BasicStrategy } from 'passport-http';
import User from '../../models/user';

export default new BasicStrategy(async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return done(null, false);
    if (!(await user.verifyPassword(password))) return done(null, false);

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
