const express = require('express');
const router = express.Router();

const controllers =  require('../controllers/auth.js');

router.get('/', (req, res) => {
	res.redirect('/login');
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', controllers.login);

router.get('/register', (req, res) => {
	res.render('register');
 });

 router.post('/register', controllers.register);

 router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;