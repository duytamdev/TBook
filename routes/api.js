const express = require('express');

const router = express.Router();
const apiController = require('../app/controllers/APIController');
const authentication = require('../middle/authencation');

router.get('/products/get-all', [authentication.checkToken], apiController.getAllBook);
router.get('/categories/get-all', [authentication.checkToken], apiController.getAllCategories);
router.get('/products/search', [authentication.checkToken], apiController.searchNameBook);
router.get('/product/:id', [authentication.checkToken], apiController.getBook);
router.get('/products-of-category/:idCategory', [authentication.checkToken], apiController.getBookOfCategory);
router.post('/auth/register', apiController.register);
router.post('/auth/login', apiController.login);
router.get('/auth/usernameIsUsed/:username', apiController.usernameIsUsed);
router.post('/cart/add', apiController.addCart);
module.exports = router;
