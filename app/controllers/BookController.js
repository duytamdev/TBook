const Category = require('../models/Category');
const Book = require('../models/Book');
// must be used to avoid bug
// const IPv4Address = '192.168.1.3';
const IPv4Address = 'localhost';
const uploadFile = require('../../config/firebase/configFirebase');

class BookController {
  // [GET] /book/create
  // eslint-disable-next-line class-methods-use-this
  create(req, res, next) {
    Category.find({})
      .then((categories) => {
        // get must 2 field
        const minCategories = categories.map((category) => ({
          // eslint-disable-next-line no-underscore-dangle
          _id: category._id,
          name: category.name,
        }));
        res.render('book/create', { categories: minCategories });
      })
      .catch((err) => next(err));
  }

  // [GET] / book/:id -- show detail product
  // eslint-disable-next-line class-methods-use-this
  showUpdate(req, res, next) {
    Promise.all([Book.findOne({ _id: req.params.id }).populate('category'), Category.find({})])
      .then(([book, categories]) => {
        const categoriesSelected = categories.map((category) => {
          if (category._id.toString() === book.category._id.toString()) {
            return {
              _id: category._id,
              name: category.name,
              selected: true,
            };
          }
          return {
            _id: category._id,
            name: category.name,
          };
        });
        res.render('book/update', { book, categories: categoriesSelected });
      })
      .catch((err) => next(err));
  }

  // [POST] /book/store
  // eslint-disable-next-line class-methods-use-this
  async stored(req, res, next) {
    let { file, body } = req;
    let image;
    if (file) {
      image = await uploadFile(file.path, file.filename);
      console.log(image);
    } else {
      res.send('not found');
    }
    // let image;
    // if (file) {
    //   image = `http://${IPv4Address}:3000/images/${file.filename}`;
    // }
    body = { ...body, image };
    const newBook = new Book(body);
    newBook.save()
      .then(() => {
        res.redirect('/stored/books');
      })
      .catch((err) => next(err));
  }

  // [PUT] / book/:id/edit
  // eslint-disable-next-line class-methods-use-this
  async update(req, res, next) {
    let { file, body } = req;
    let image;
    console.log(file); // undefined
    console.log(req.body);
    if (file) {
      image = await uploadFile(file.path, file.filename);
    }
    body = { ...body, image };
    Book.updateOne({ _id: req.params.id }, body)
      .then(() => {
        res.redirect('/stored/books');
      })
      .catch((err) => next(err));
  }

  // [DELETE] / book/:id/delete
  // eslint-disable-next-line class-methods-use-this
  delete(req, res, next) {
    Book.delete({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch((err) => next(err));
  }

  // [DELETE] book/:id/deleteForce
  // eslint-disable-next-line class-methods-use-this
  deleteForce(req, res, next) {
    Book.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch((err) => next(err));
  }

  // [PATH] /book/:id/restore
  // eslint-disable-next-line class-methods-use-this
  restore(req, res, next) {
    Book.restore({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch((err) => next(err));
  }

  // eslint-disable-next-line class-methods-use-this
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete': {
        Book.delete({ _id: { $in: req.body.bookIds } })
          .then(() => res.redirect('back'))// dieu huong quay ve trang truoc
          .catch((err) => next(err));
        break;
      }
      case 'restore': {
        Book.restore({ _id: { $in: req.body.bookIds } })
          .then(() => res.redirect('back'))// dieu huong quay ve trang truoc
          .catch((err) => next(err));
        break;
      }
      case 'deleteForce': {
        Book.deleteMany({ _id: { $in: req.body.bookIds } })
          .then(() => res.redirect('back'))// dieu huong quay ve trang truoc
          .catch((err) => next(err));
        break;
      }
      default: {
        res.json('not found action');
      }
    }
  }
}
module.exports = new BookController();
