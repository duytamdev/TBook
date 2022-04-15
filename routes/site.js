const express = require('express');

const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/login', siteController.login);
router.post('/login', siteController.onLogin);
router.get('/logout', siteController.logout);

router.get('/', siteController.dashboard);

module.exports = router;
