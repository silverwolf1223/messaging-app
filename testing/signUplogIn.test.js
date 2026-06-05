import request from 'supertest';
import express from 'express';
import signUp from '../routes/signUpRouter.js'
import logIn from '../routes/logInRouter.js'

const app = express();
app.use(express.urlencoded({extended: false }));
app.use('/signUp', signUp);
app.use('/logIn', logIn);

const isIncludeField = function (fieldName) {
  return function (res) {
    res.body.should.have.property(fieldName);
  };
}

test("sign up and log in", done => {
    request(app)
        .post('/signUp')
        .type('form')
        .send({username: "Jack", password: "1234", email:"dum2@gmail.com"})
        .then(() => {
            request(app)
                .post('/logIn')
                .type('form')
                .send({username: "Jack", password: "1234"})
                .expect("Content-Type", /json/)
                .expect((res) => {
                  expect(res.body).toHaveProperty('username')
                })
                .expect(200, done);
        })
})