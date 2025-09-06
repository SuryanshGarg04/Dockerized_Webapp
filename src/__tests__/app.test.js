const request = require('supertest');
const app = require('../app');

describe('GET /health', () => {
  it('returns 200 OK with { ok: true }', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
