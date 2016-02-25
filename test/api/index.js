'use strict';

import importDir from 'import-dir';
import supertest from 'supertest-as-promised';
import mongoose from 'mongoose';
import chai from 'chai';
import app from '../../server';
import {
  connectDatabase,
  registerLocalClient,
  registerAdminUser,
} from '../../server/db';
import { test } from '../../server/db/config';

const routes = importDir('./routes');
const request = supertest.agent(app.listen());
chai.should();

describe('Routes', () => {
  before(async () => {
    await connectDatabase(test);
  });

  beforeEach(async () => {
    Object.keys(mongoose.models).forEach(async name => {
      await mongoose.model(name).remove();
    });

    await registerLocalClient();
    await registerAdminUser();
  });

  Object.keys(routes).forEach(name => routes[name](request));
});
