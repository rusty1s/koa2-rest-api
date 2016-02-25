'use strict';

import User from '../../models/user';
import { isBearerAuthenticated } from '../../auth';

export default (router) => {
  router
    .get('/users',
      async ctx => ctx.body = await User.find({}))
    .post('/users', async ctx => {
      ctx.body = await User.create({
        name: ctx.request.body.name,
        email: ctx.request.body.email,
        password: ctx.request.body.password,
        confirm_password: ctx.request.body.confirm_password,
      });
    })
    .get('/users/:id',
      async ctx => {
        const user = await User.findById(ctx.params.id);
        if (user) ctx.body = user;
      }
    )
    .put('/users/:id', async ctx => {
      const user = await User.findByIdAndUpdate(ctx.params.id, {
        name: ctx.request.body.name,
      }, {
        new: true,
        runValidators: true,
      });
      if (user) ctx.body = user;
    })
    .delete('/users/:id',
      isBearerAuthenticated(),
      async ctx => {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if (user) ctx.status = 204;
      }
    );
};
