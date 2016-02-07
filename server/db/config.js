'use strict';

export const development = 'mongodb://localhost/koa-rest-api';

export const test = 'mongodb://localhost/koa-rest-api-test';

export const localClient = {
  name: 'local',
  id: 'local',
  secret: 'local',
};

export const adminUser = {
  name: 'Admin',
  email: 'matthias.fey@tu-dortmund.de',
  password: 'admin',
};
