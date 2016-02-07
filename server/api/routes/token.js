'use strict';

import { token } from '../../auth/oauth2';
import AccessToken from '../../models/access-token';
import { isBearerAuthenticated } from '../../auth';

export default (router) => {
  router
    .post('/token', token())
    .delete('/token',
      isBearerAuthenticated(),
      async ctx => {
        await AccessToken.findOneAndRemove({ user: ctx.passport.user._id });
        ctx.status = 204;
      }
    );
};
