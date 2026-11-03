import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/authMiddleware.js';
import scholarshipRoutes from '../routes/scholarships.js';
import scholarshipListingRoutes from '../routes/scholarshipListings.js';
import User from '../models/user.js';

process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRE = '1h';

let server;
let base;

before(async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/scholarship', scholarshipRoutes);
    app.use('/api/scholarship-listings', scholarshipListingRoutes);
    app.get('/protected', protect, (req, res) => res.json({ ok: true }));
    await new Promise((resolve) => { server = app.listen(0, resolve); });
    base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test('protect: responds 401 when no Authorization header is sent', async () => {
    const res = await fetch(`${base}/protected`);
    assert.equal(res.status, 401);
    assert.equal((await res.json()).success, false);
});

test('protect: responds 401 for a token signed with the wrong secret', async () => {
    const token = jwt.sign({ id: '507f1f77bcf86cd799439011' }, 'wrong-secret');
    const res = await fetch(`${base}/protected`, { headers: { Authorization: `Bearer ${token}` } });
    assert.equal(res.status, 401);
});

test('scholarship review routes require authentication', async () => {
    for (const [method, path] of [
        ['GET', '/api/scholarship'],
        ['GET', '/api/scholarship/507f1f77bcf86cd799439011'],
        ['PUT', '/api/scholarship/507f1f77bcf86cd799439011'],
        ['GET', '/api/scholarship-listings/admin/stats']
    ]) {
        const res = await fetch(`${base}${path}`, { method });
        assert.equal(res.status, 401, `${method} ${path}`);
    }
});

test('User.generateAuthToken: produces a verifiable JWT with id and role', () => {
    const user = new User({ email: 'admin@example.com', password: 'password123', role: 'admin' });
    const decoded = jwt.verify(user.generateAuthToken(), process.env.JWT_SECRET);
    assert.equal(decoded.id, user._id.toString());
    assert.equal(decoded.role, 'admin');
});
