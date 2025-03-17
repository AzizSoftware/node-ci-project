const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
    res.send('Hello, Jenkins CI!');
});

test('GET / should return "Hello, Jenkins CI!"', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello, Jenkins CI!');
});
