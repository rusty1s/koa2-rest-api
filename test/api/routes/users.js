'use strict';

export default function testUsers(request) {
  describe('Users', () => {
    it('should create user', async () => {
      await request.post('/api/users')
        .send({
          name: 'Matthias Fey',
          email: 'matthias.fey@tu-dortmund.de',
          password: 'secret',
          confirm_password: 'secret',
        })
        .expect(200);
    });
  });
}
