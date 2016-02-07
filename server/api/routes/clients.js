'use strict';

import Client from '../../models/client';

export default (router) => {
  router
    .get('/clients', async ctx => ctx.body = await Client.find({}));
};
