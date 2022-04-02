const express = require('express');

const router = express.Router();
const storedController = require('../app/controllers/StoredController');

router.get('/books', storedController.books);
router.get('/categories', storedController.categories);
router.get('/trash/categories', storedController.trashCategories);
router.get('/trash/books', storedController.trashBooks);

module.exports = router;
