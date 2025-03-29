const request = require('supertest');
const app = require('./index'); // Import the Express app

describe('Node CI Project API', () => {
    test('GET / should return "Hello, Jenkins CI!"', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Hello, Jenkins CI!' });
    });

    test('GET /notfound should return 404', async () => {
        const res = await request(app).get('/notfound');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: 'Not Found' });
    });
});
