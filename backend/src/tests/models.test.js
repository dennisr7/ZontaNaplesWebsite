import { test } from 'node:test';
import assert from 'node:assert/strict';
import Member from '../models/member.js';
import Contact from '../models/contact.js';
import Event from '../models/event.js';
import Product from '../models/product.js';

const validMember = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    reason: 'I would like to support the mission of the club.'
};

test('Member: accepts a valid application and defaults status to pending', () => {
    const member = new Member(validMember);
    assert.equal(member.validateSync(), undefined);
    assert.equal(member.status, 'pending');
});

test('Member: rejects a reason shorter than 20 characters', () => {
    const err = new Member({ ...validMember, reason: 'too short' }).validateSync();
    assert.ok(err.errors.reason);
});

test('Member: rejects an invalid email', () => {
    const err = new Member({ ...validMember, email: 'not-an-email' }).validateSync();
    assert.ok(err.errors.email);
});

test('Contact: requires all fields and a message of at least 10 characters', () => {
    const err = new Contact({ name: 'A', email: 'a@example.com', subject: 'Hi', message: 'short' }).validateSync();
    assert.ok(err.errors.message);
    const ok = new Contact({ name: 'A', email: 'a@example.com', subject: 'Hi', message: 'A long enough message' });
    assert.equal(ok.validateSync(), undefined);
    assert.equal(ok.status, 'unread');
});

test('Event: validates required fields, type enum and minimum attendees', () => {
    const err = new Event({ title: 'T', description: 'short', type: 'party', maxAttendees: 0 }).validateSync();
    assert.ok(err.errors.description);
    assert.ok(err.errors.date);
    assert.ok(err.errors.location);
    assert.ok(err.errors.type);
    assert.ok(err.errors.maxAttendees);
});

test('Product: rejects a negative price and an unknown category', () => {
    const err = new Product({ name: 'Mug', description: 'A mug', price: -1, category: 'Food', inventory: 1 }).validateSync();
    assert.ok(err.errors.price);
    assert.ok(err.errors.category);
});
