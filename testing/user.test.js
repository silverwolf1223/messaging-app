import request from 'supertest';
import express from 'express';
import userRouter from '../routes/userRouter.js'

const app = express();
app.use(express.urlencoded({extended: false }));
app.use('/', userRouter);

test('get user by id', done => {
    request(app)
        .get('/user/1234')
        .expect('Content-Type', /json/)
        .expect(res => {expect(res.body).toHaveProperty('username')})
        .expect(200, done);
})

test('get user friends', done => {
    request(app)
        .get('/user/1234/friends')
        .expect('Content-Type', /json/)
        .expect(res => {expect(res.body).toHaveProperty('friends')})
        .expect(200, done);
})

test('post user settings', done => {
    request(app)
        .post('/user/1234/settings')
        .type('form')
        .send({username: bill, notifs: true})
            .get('/1234')
            .expect('Content-Type', /json/)
            .expect(res => {expect(res.body).toHaveProperty('username')})
            .expect(200, done);
})

test('user requests get', done => {
    request(app)
        .get('/user/1234/requests')
        .expect('Content-Type', /json/)
        .expect(res => {expect(res.body).toHaveProperty('requests')})
        .expect(200, done);
})

test('user requests post', done => {
    request(app)
        .post('/user/1234/requests')
        .type('form')
        .send({requestId: '4444', sending: false, answer: true})
            .get('/4444/requests')
            .expect('Content-Type', /json/)
            .expect(res => {expect(res.body).toHaveProperty('requests')})
            .expect(200, done);
})