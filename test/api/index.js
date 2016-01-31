'use strict';

import supertest from 'supertest-as-promised';
import app from '../../server';

const request = supertest.agent(app.listen());

describe('Routing', () => {
  it('should return true', async () => {
    const response = await request.get('/api/test').expect(200);
    console.log(response.body);
  });
});
