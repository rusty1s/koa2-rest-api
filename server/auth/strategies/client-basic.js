'use strict';

import { BasicStrategy } from 'passport-http';
import Client from '../../models/client';

export default new BasicStrategy((id, secret, done) => {
  (async () => {
    try {
      const client = await Client.findOne({ id });

      if (!client) return done(null, false);

      if (secret !== client.secret) return done(null, false);

      return done(null, client);
    } catch (error) {
      return done(error);
    }
  })();
});
