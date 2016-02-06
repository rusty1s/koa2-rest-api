'use strict';

import oauth2 from '../../auth/oauth2';
import { isClientAuthenticated } from '../../auth';

export default (router) => {
  router
    .post('/token',
      isClientAuthenticated(),
      oauth2.token(),
      oauth2.errorHandler()
    );
};
