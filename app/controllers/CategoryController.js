const Category = require('../models/Category');
const CategoryService = require('../services/Category');

class CategoryController {
  // [GET] /category/create
  // eslint-disable-next-line class-methods-use-this
  create(req, res) {
    res.render('category/create');
  }

  // [POST] / category/store
  // eslint-disable-next-line class-methods-use-this
  store(req, res, next) {
    const category = new Category(req.body);
    CategoryService.save(category)
      .then(() => {
        res.redirect('/stored/categories');
      })
      .catch((err) => next(err));
  }

  // [PUT] / category/update
  // eslint-disable-next-line class-methods-use-this
  update(req, res, next) {
    CategoryService.update(req.params.id, req.body)
      .then(() => {
        res.redirect('/stored/categories');
      })
      .catch((err) => next(err));
  }

  // [GET] /category/:id
  // eslint-disable-next-line class-methods-use-this
  showUpdate(req, res, next) {
    Category.findOne({ _id: req.params.id })
      .then((category) => {
        res.render('category/update', { category });
      })
      .catch((err) => next(err));
  }

  // [DELETE] /category/:id/delete
  // eslint-disable-next-line class-methods-use-this
  delete(req, res, next) {
    Category.delete({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch((err) => next(err));
  }

  // [DELETE] /category/:id/deleteForce
  // eslint-disable-next-line class-methods-use-this
  deleteForce(req, res, next) {
    Category.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch((err) => next(err));
  }

  // [PATCH] /category/:id/restore
  // eslint-disable-next-line class-methods-use-this
  restore(req, res, next) {
    Category.restore({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch((err) => next(err));
  }

  // eslint-disable-next-line class-methods-use-this
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete': {
        Category.delete({ _id: { $in: req.body.categoryIds } })
          .then(() => res.redirect('back'))// dieu huong quay ve trang truoc
          .catch((err) => next(err));
        break;
      }
      case 'restore': {
        Category.restore({ _id: { $in: req.body.categoryIds } })
          .then(() => res.redirect('back'))// dieu huong quay ve trang truoc
          .catch((err) => next(err));
        break;
      }
      case 'deleteForce': {
        Category.deleteMany({ _id: { $in: req.body.categoryIds } })
          .then(() => res.redirect('back'))// dieu huong quay ve trang truoc
          .catch((err) => next(err));
        break;
      }
      default: {
        res.status(404);
      }
    }
  }
}
module.exports = new CategoryController();
