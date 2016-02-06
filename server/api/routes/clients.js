'use strict';

import Client from '../../models/client';

export default (router) => {
  router
    .get('/clients', async ctx => {
      ctx.body = await Client.find({});
    })
    .post('/clients', async ctx => {
      ctx.body = await Client.create({
        name: ctx.request.body.name,
        id: ctx.request.body.id,
        secret: ctx.request.body.secret,
        user: ctx.request.body.user,
      });
    });
};
