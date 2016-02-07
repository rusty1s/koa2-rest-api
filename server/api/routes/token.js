'use strict';

import { token } from '../../auth/oauth2';
import AccessToken from '../../models/access-token';

export default (router) => {
  router
    .post('/token', token());

  router.get('/tokens', async ctx => ctx.body = await AccessToken.find({}));
};
