'use strict';

const user = {
  name: 'Test User',
  email: 'test.user@gmail.com'.toUpperCase(),
  password: 'secret',
  confirm_password: 'secret',
};

export default function testUsers(request) {
  describe('Users', () => {
    it('should create user', async () => {
      const res = await request.post('/api/users')
        .send(user)
        .expect(200)
        .expect('Content-Type', /json/);

      Object.keys(res.body).should.have.length(7);
      res.body.should.have.property('_id');
      res.body.name.should.equal(user.name);
      res.body.email.should.equal(user.email.toLowerCase());
      res.body.provider.should.equal('local');
      res.body.admin.should.equal(false);
      res.body.should.have.property('created_at');
      res.body.should.have.property('updated_at');
    });

    it('should get user', async () => {
      let res = await request.post('/api/users')
        .send(user)
        .expect(200);

      res = await request.get(`/api/users/${res.body._id}`)
        .expect(200)
        .expect('Content-Type', /json/);

      Object.keys(res.body).should.have.length(7);
      res.body.should.have.property('_id');
      res.body.name.should.equal(user.name);
      res.body.email.should.equal(user.email.toLowerCase());
      res.body.provider.should.equal('local');
      res.body.admin.should.equal(false);
      res.body.should.have.property('created_at');
      res.body.should.have.property('updated_at');
    });
  });
}
