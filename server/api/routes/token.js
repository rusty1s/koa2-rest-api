'use strict';

import AccessToken from '../../models/access-token';
import { isBearerAuthenticated } from '../../auth';

export default (router) => {
  router
    .get('/token',
      isBearerAuthenticated(),
      async ctx => {
        const accessToken = await AccessToken.findOne({
          user: ctx.passport.user._id,
        });
        if (accessToken) {
          ctx.body = {
            access_token: accessToken,
            token_type: 'Bearer',
          };
        }
      }
    )
    .delete('/token',
      isBearerAuthenticated(),
      async ctx => {
        await AccessToken.findOneAndRemove({ user: ctx.passport.user._id });
        ctx.status = 204;
      }
    );
};
