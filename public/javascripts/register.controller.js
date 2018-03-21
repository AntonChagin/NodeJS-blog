const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config.json');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: '/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body

            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
      //  return res.redirect('/login');
    });
});

module.exports = router;
