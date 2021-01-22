const request = require('supertest');

const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: "123456"
        });

        const response = await request(app)
            .post('/signin')
            .send({ email: user.email, password: '123456' });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: "123456"
        });

        const response = await request(app)
            .post('/signin')
            .send({ email: user.email, password: '123122' });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticate', async () => {
        const user = await factory.create('User', {
            password: "123456"
        });

        const response = await request(app)
            .post('/signin')
            .send({ email: user.email, password: '123456' });

        expect(response.header).toHaveProperty('auth-token');
    });
});

describe('Registration', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should register with valid data', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ name: "Caroliny", email: "carol@hotmail.com", password: "123456" });

        expect(response.status).toBe(200);
    });

    it('should not register with email already registered', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .post('/signup')
            .send({ name: "Ana Carolina", email: user.email, password: "5874965" });

        expect(response.status).toBe(403);
    });
});

describe('Validators', () => {
    beforeAll(async () => {
        await truncate();
    });

    it('should not authenticate/register with invalid email', async () => {
        const response = await request(app)
            .post('/signin')
            .send({ email: "carol", password: "123456" });

        expect(response.status).toBe(400);
    });

    it('should not authenticate/register with password less than 6 digits', async () => {
        const response = await request(app)
            .post('/signin')
            .send({ email: "carol@hotmail.com", password: "12345" });

        expect(response.status).toBe(400);
    });

    it('should not register with null name', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ name: "", email: "carol@hotmail.com", password: "123456" });

        expect(response.status).toBe(400);
    });    
})
