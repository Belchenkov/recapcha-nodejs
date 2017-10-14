const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});