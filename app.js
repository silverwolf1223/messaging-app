const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("listening to port " + port);
})