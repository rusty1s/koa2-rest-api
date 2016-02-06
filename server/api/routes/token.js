'use strict';

import { token } from '../../auth/oauth2';

export default (router) => {
  router
    .post('/token', token());
};
