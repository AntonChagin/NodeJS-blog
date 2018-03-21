const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config.json');

router.get('/', function (req, res) {
    res.render('auth');
});

router.post('/auth', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: '/auth',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('auth', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('auth', {
                error: response.body

            });
        }

        // return to login page with success message
        req.session.success = 'Authorization successful';
      //  return res.redirect('/login');
    });
});

module.exports = router;
