import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { str, oneOf, positiveInt, toDate, isValidEmail, pick } from '../utils/sanitize.js';
import { strictLimiter } from '../middleware/rateLimit.js';

test('str: only passes strings through (blocks NoSQL operator objects and arrays)', () => {
    assert.equal(str('abc'), 'abc');
    assert.equal(str({ $ne: null }), undefined);
    assert.equal(str(['a', 'b']), undefined);
    assert.equal(str(undefined), undefined);
});

test('oneOf: accepts only allowed values', () => {
    assert.equal(oneOf('active', ['active', 'draft']), 'active');
    assert.equal(oneOf('other', ['active', 'draft']), undefined);
    assert.equal(oneOf({ $gt: '' }, ['active']), undefined);
});

test('positiveInt: falls back and caps', () => {
    assert.equal(positiveInt('5', 1), 5);
    assert.equal(positiveInt('-3', 1), 1);
    assert.equal(positiveInt('abc', 7), 7);
    assert.equal(positiveInt('99999', 1, 200), 200);
    assert.equal(positiveInt({ a: 1 }, 2), 2);
});

test('toDate: returns a Date for valid input and undefined otherwise', () => {
    assert.ok(toDate('2025-12-01T19:00:00Z') instanceof Date);
    assert.equal(toDate('not a date'), undefined);
    assert.equal(toDate(['2025-01-01']), undefined);
});

test('isValidEmail: accepts normal addresses and rejects malformed or huge input', () => {
    assert.equal(isValidEmail('jane@example.com'), true);
    assert.equal(isValidEmail('no-at-sign.com'), false);
    assert.equal(isValidEmail('a@b'), false);
    assert.equal(isValidEmail('a b@example.com'), false);
    assert.equal(isValidEmail('a@@example.com'), false);
    assert.equal(isValidEmail('a@' + 'x.'.repeat(200)), false);
    assert.equal(isValidEmail({ $ne: 1 }), false);
});

test('pick: copies only listed primitive keys (blocks mass assignment and operators)', () => {
    const out = pick({ name: 'Mug', price: 5, $set: { x: 1 }, images: [], status: { $ne: 1 } }, ['name', 'price', 'status']);
    assert.deepEqual(out, { name: 'Mug', price: 5 });
});

let server;
before(async () => {
    const app = express();
    app.post('/limited', strictLimiter, (req, res) => res.json({ ok: true }));
    await new Promise((resolve) => { server = app.listen(0, resolve); });
});
after(() => server.close());

test('strictLimiter: returns 429 after 20 requests from one client', async () => {
    const url = `http://127.0.0.1:${server.address().port}/limited`;
    let last;
    for (let i = 0; i < 21; i++) last = await fetch(url, { method: 'POST' });
    assert.equal(last.status, 429);
    assert.equal((await last.json()).success, false);
});
