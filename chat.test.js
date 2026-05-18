import request from 'supertest';
import express from 'express';
import chatRouter from '../routes/chatRouter.js';

const app = express();
app.use(express.urlencoded({extended: false }));
app.use('/', chatRouter);

test("chat post", done => {
    request(app)
        .post('/')
        .type('form')
        .send({
            ids: [1, 2]
        })
        .expect('Content-Type', /json/)
        .expect({ messages: [] })
        .expect(200, done);
})

test("chat message post", done => {
    request(app)
        .post('/123')
        .type('form')
        .send({message: "Hello World"})
        .expect('Content-Type', /json/)
        .expect({ messages: ["Hello World"] })
        .expect(200, done);
})

test("chat get with id", done => {
    request(app)
        .get('/123')
        .expect('Content-Type', /json/)
        .expect({ messages: ["Hello World"] })
        .expect(200, done);
})

test("chat get message with id", done => {
    request(app)
        .get('/123/message/2')
        .expect('Content-Type', /json/)
        .expect({ messages: ["Hello World"] })
        .expect(200, done);
})

test("chat add user post", done => {
    request(app)
        .post('/123/addUser')
        .type('form')
        .send({user: '1234'})
        .expect('Content-Type', /json/)
        .expect({username: 'Silvy'})
        .expect(200, done)
})