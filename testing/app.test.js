import request from 'supertest';
import express from 'express';
import signUp from '../routes/signUp.js'
import logIn from '../routes/logInRouter.js'

const app = express();
app.use(express.urlencoded({extended: false }));
app.use('/signUp', signUp);
app.use('/logIn', logIn)

text("sign up post works", done => {
    request(app)
        .post('/signUp')
        .type('form')
        .send({username: "testdummy1", password: "1234", email:"dum1@gamil.com"})
        .then(() => {
            request(app)
                .post('/logIn')
                .type('form')
                .send({username: "Silvy", password: "asd"})
                .expect("Content-Type", /json/)
                .expect({ username: "Silvy"})
                .expect(200, done);
        })
})