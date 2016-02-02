'use strict';

import { Strategy as BasicStrategy } from 'passport-http';
import db from '../../db';

export default new BasicStrategy((username, password, done) {
  db.User.findOne()
});
