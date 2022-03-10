const { Router } = require('express');
const router = Router();

const Controller = require('../controllers/authController');

router.post('/api/auth/signin', Controller.signin);
router.post('/api/auth/signup', Controller.signup);
router.get('/api/auth/me', Controller.authenticated, Controller.me);

module.exports = router;
