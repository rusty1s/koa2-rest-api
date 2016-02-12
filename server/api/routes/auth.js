'use strict';

import { token } from '../../auth/oauth2';
import AccessToken from '../../models/access-token';
import {
  isFacebookAuthenticated,
  isFacebookAuthenticatedCallback,
} from '../../auth';
import * as provider from '../../auth/provider';

export default (router) => {
  router
    .post('/auth', token());

  router
    .get(provider.facebook.route, isFacebookAuthenticated())
    .get(provider.facebook.callbackRoute,
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
