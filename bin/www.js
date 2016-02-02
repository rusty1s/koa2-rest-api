'use strict';

import app from '../server';
import db from '../server/db';
import { development } from '../server/db/config';

(async() => {
  try {
    const info = await db(development);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Server started on port ${port}`);
})();
