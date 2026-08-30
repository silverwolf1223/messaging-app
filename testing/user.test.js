import request from 'supertest';
import express from 'express';
import userRouter from '../routes/userRouter.js'

const app = express();
app.use(express.urlencoded({extended: false }));
app.use('/user/:id', userRouter);

const userId = '1234'

test('get user by id', done => {
    request(app)
        .get(`/user/${userId}`)
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
        .send({notifs: true})
        .then(() => {
            request(app)
                .get('/user/1234/settings')
                .expect('Content-Type', /json/)
                .expect(res => {expect(res.body).toHaveProperty('settings')})
                .expect(200, done);
        })
})

// test('user requests get', done => {
//     request(app)
//         .get('/user/1234/requests')
//         .expect('Content-Type', /json/)
//         //.expect(res => {expect(res.body).toHaveProperty('requests')})
//         .expect(200, done);
// })

test('user requests post', done => {
    request(app)
        .post('/user/1234/send')
        .type('form')
        .send({requesterId: '1234', requestId: '4444', sending: false, answer: true})
        .then(() => {
            request(app)
                .get(`/user/4444/requests`)
                .expect('Content-Type', /json/)
                //.expect(res => {expect(res.body).toHaveProperty('requests')})
                .expect(200, done);
        })
})

test('user accept request', done => {
    request(app)
        .post('/user/4444/accept')
        .type('form')
        .send({id: '01KV9SVTSABEGN8HEHY9J9YYGR'})
        .then(() => {
            request(app)
                .get('/user/4444/friends')
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body).toHaveProperty('friends')
                    expect(res.body.friends.length).toBeGreaterThan(0)
                })
                .expect(200, done)
        })
})