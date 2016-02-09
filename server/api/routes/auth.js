'use strict';

import { token } from '../../auth/oauth2';
import AccessToken from '../../models/access-token';
import {
  isFacebookAuthenticated,
  isFacebookAuthenticatedCallback,
} from '../../auth';

export default (router) => {
  router
    .post('/auth', token());

  router
    .get('/auth/facebook', isFacebookAuthenticated())
    .get('/auth/facebook/callback',
      isFacebookAuthenticatedCallback(),
      async ctx => {
        const accessToken = await AccessToken.findOne({
          user: ctx.passport.user._id,
        });

        ctx.body = {
          access_token: accessToken,
          token_type: 'Bearer',
        };
      }
    );
};
