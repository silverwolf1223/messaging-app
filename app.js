import express from 'express';
import cors from 'cors';
const app = express();

import signUpRouter from './routes/signUpRouter.js';
import logInRouter from './routes/logInRouter.js';
// import userRouter from './routes/userRouter.js';
// import chatRouter from './routes/chatRouter.js';

app.use(cors());

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use('/signUp', signUpRouter);
app.use('/logIn', logInRouter);
// app.use('/user/:id', userRouter);
// app.use('/chat/:id', chatRouter);
app.use('/', (req, res, next) => {
    next();
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("listening to port " + port);
})