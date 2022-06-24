const express = require('express')
const eventRouter = require('./api/event')

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/event', eventRouter);

const port = 3000;

app.listen(port, () => console.log(`listening to port ${port}`)) 