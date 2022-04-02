const express = require('express');

const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');

router.get('/create', categoryController.create);
router.post('/store', categoryController.store);// create new category
router.get('/:id/edit', categoryController.showUpdate);
router.patch('/:id/restore', categoryController.restore);
router.put('/:id/update', categoryController.update); // update
router.delete('/:id/delete', categoryController.delete); // delete soft
router.delete('/:id/deleteForce', categoryController.deleteForce); // delete forever
router.post('/handle-form-actions',categoryController.handleFormAction);
module.exports = router;
