'use strict';

import oauth2orize from 'oauth2orize-koa';
import Client from '../models/client';
import User from '../models/user';
import AccessToken from '../models/access-token';
import uuid from 'uuid';
import { verifyHash } from '../helpers/crypt';

const server = oauth2orize.createServer();

server.serializeClient(client => client._id);
server.deserializeClient(async id => await Client.findById(id));

server.exchange(oauth2orize.exchange.password(async (client, email, password) => {
  console.log(client);

  const localClient = await Client.findOne({ id: client.clientId });

  if (!localClient) return false;
  if (!localClient.grant !== 'password') return false;

  let isMatch = await verifyHash(
    localClient.hashedSecret,
    client.clientSecret
  );
  if (!isMatch) return false;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) return false;

  isMatch = await verifyHash(user.hashedPassword, password);
  if (!isMatch) return false;

  const token = uuid.v4();
  await AccessToken.create({
    token,
    user: user._id,
    client: localClient.id,
  });

  return token;
}));

export default server;

/*
export const decision = server.decision();

export const token = [
  server.token(),
  server.errorHandler(),
];*/
