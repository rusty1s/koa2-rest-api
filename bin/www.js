'use strict';

import app from '../server';
import {
  connectDatabase,
  registerLocalClient,
  registerAdminUser,
} from '../server/db';
import { development } from '../server/db/config';

const port = process.env.PORT || 3000;

(async() => {
  try {
    const info = await connectDatabase(development);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  try {
    await registerLocalClient();
    await registerAdminUser();

    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.log(error);
  }
})();
