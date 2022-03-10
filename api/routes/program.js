const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send({
    programa: 'Auth Basic Google/Facebook/LinkedIn OAuth2',
    endpoints: [
      'http://localhost:5000/auth/google',
      'http://localhost:5000/auth/facebook',
      'http://localhost:5000/auth/linkedin',
      'http://localhost:5000/home',
      'http://localhost:5000/auth/logout',
      'http://localhost:5000/failed'
    ],
    developer: 'Felipe Morales'
  });
});

router.get('/profile', function (req, res) {
  res.send({ programa: 'Profile' });
});

module.exports = router;
