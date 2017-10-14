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

app.post('/subscribe', (req, res) => {
    if (
        req.body.capcha === undefined ||
        req.body.capcha === '' ||
        req.body.capcha === null
    ) {
        return res.json({"success": false, "msg": "Please select captcha"});
    }

    // Secret Key
    const secretKey = '6LffYTQUAAAAAHok5jmTOqwJ6s-UPEqjKZjgP_3y';

    // Verify URL
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=
                        ${secretKey}&reponse=${req.body.capcha}&remoteip=
                        ${req.connection.remoteAddress}`;

    // Make Request to VerifyURL
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);

        // If Not Successful
        if (body.success !== undefined && !body.success) {
            return res.json({"success": false, "msg": "Failed captcha verification"});
        }

        // If Successful
        return res.json({"success": true, "msg": "Captcha Passed"});
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});