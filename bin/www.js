'use strict';

import http from 'http';
import app from '../server';
import db from '../server/db';

const port = 3000;

(async() => {
  await db.sequelize.sync({
    force: true,
  });

  const httpServer = http.createServer(app.callback());

  httpServer.listen(
    process.env.PORT || port,
    () => console.log(`Server started on port ${httpServer.address().port}`));
})();
