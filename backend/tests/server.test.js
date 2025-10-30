const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  test('GET /api/notas debería devolver 200', async () => {
    const res = await request(app).get('/api/notas');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('POST /api/notas requiere texto', async () => {
    const res = await request(app)
      .post('/api/notas')
      .send({ id: 'test123' });
    expect(res.statusCode).toEqual(400);
  });
});