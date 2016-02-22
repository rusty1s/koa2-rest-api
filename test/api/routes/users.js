'use strict';

export default function testUsers(request) {
  describe('Users', () => {
    it('should create user', async () => {
      await request.post('/api/users')
        .send({
          name: 'Test User',
          email: 'test.user@gmail.com',
          password: 'secret',
          confirm_password: 'secret',
        })
        .expect(200);
    });
  });
}
