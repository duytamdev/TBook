const express = require('express');

const router = express.Router();
const apiController = require('../app/controllers/APIController');

router.get('/products/get-all', apiController.getAllBook);
router.get('/categories/get-all', apiController.getAllCategories);
router.get('/products/search', apiController.searchNameBook);
router.post('/auth/register', apiController.register);
router.post('/auth/login', apiController.login);
module.exports = router;
