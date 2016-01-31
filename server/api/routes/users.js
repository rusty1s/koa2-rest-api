'use strict';

export default (router, db) => {
  router.get('/test', async ctx => {
    const users = await db.User.findAll();
    ctx.body = users;
  });

  router.post('/test', async ctx => {
    const users = await db.User.findAll();
    ctx.body = users;
  });
};