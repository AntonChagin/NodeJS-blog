const express = require('express');
const router = express.Router();
const Joi = require('joi');
const usersController = require('../controllers').users;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next){
  /*if(!req.body.username || !req.body.password){
  return res.render('index', {error: 'Please fill out all fields'});
}*/
var userSchema = Joi.object().keys({
  username: Joi.string().required()
  .error(new Error(' ФИО не введено!')),
  email: Joi.string().email().required()
  .error(new Error(' Емейл неверен!')),
  password: Joi.string().required()
  .error(new Error(' Пароль не введен!')),
  repeat_password: Joi.any().valid(Joi.ref('password')).required()
  .error(new Error(' Пароль не совпадает!'))
});
var err = Joi.validate(req.body, userSchema, {abortEarly: false});

if (err.error) {
  res.locals.error=err;
  // Ошибка валидации данных
  return res.status(400).render('register',err); }
  else {
    usersController.create(req.body)
    .then(result => {
      if(result.error){
        // Ошибка базы

        res.locals.error=new Error(result.message);
        return res.status(400).render('register',res.locals.error);
      } else res.status(201).render('index');
  }
  )
    .catch(error => {res.locals.error=error;return res.status(400).render('register');})
  }

});

router.get('/auth', function(req, res, next) {
  res.render('auth');
});
router.post('/auth', function(req, res, next){
  /*if(!req.body.username || !req.body.password){
  return res.render('index', {error: 'Please fill out all fields'});
}*/
var userSchema = Joi.object().keys({
  email: Joi.string().email().required()
  .error(new Error(' Емейл неверен!')),
  password: Joi.string().required()
  .error(new Error(' Пароль не введен!')),
});
var err = Joi.validate(req.body, userSchema, {abortEarly: false});

if (err.error) {
  res.locals.error=err;
  return res.status(400).render('auth',err); }
  else {
  usersController.validate(req.body)
    .then(result => {
      console.log('validate callback: '+result);
      if(result.error){
        res.locals.error=new Error(result.message);
        return res.status(400).render('auth',res.locals.error);
      } else res.status(201).render('index');
  })
    .catch(error => {res.locals.error=error;return res.status(400).render('auth');})
  }

});

module.exports = router;
