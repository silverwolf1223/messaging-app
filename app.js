const express = require('express');
const app = express();

const signUpRouter = require('./routes/signUpRouter.js')
const logInRouter = require('./routes/logInRouter.js')
const userRouter = require('./routes/userRouter.js')
const chatRouter = require('./routes/chatRouter.js')

app.use(express.urlencoded({extended: true}));

app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);
app.use('/user/:id', userRouter);
app.use('/chat/:id', chatRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("listening to port " + port);
})