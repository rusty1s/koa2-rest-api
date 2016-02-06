'use strict';

import { BasicStrategy } from 'passport-http';
import Client from '../../models/client';
import { verifyHash } from '../../helpers/crypt';

export default new BasicStrategy((id, secret, done) => {
  (async () => {
    try {
      const client = await Client.findOne({id});

      if (!client) return done(null, false);

      const isMatch = await verifyHash(client.hashedSecret, secret);
      if (!isMatch) return done(null, false);

      return done(null, client);
    } catch (error) {
      return done(error);
    }
  })();
});
