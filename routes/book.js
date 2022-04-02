const express = require('express');

const router = express.Router();

const bookController = require('../app/controllers/BookController');
const upload = require('../middle/uploadImage');

router.get('/create', bookController.create);
router.get('/:id/edit', bookController.showUpdate); // show
router.post('/stored', upload.single('image'), bookController.stored); // create
router.put('/:id/update', upload.single('image'), bookController.update);// update
router.delete('/:id/delete', bookController.delete); // delete soft
router.delete('/:id/deleteForce', bookController.deleteForce); // delete forever
router.patch('/:id/restore', bookController.restore); // restore book
router.post('/handle-form-actions', bookController.handleFormAction);

module.exports = router;
