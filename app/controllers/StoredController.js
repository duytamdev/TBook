const Book = require('../models/Book');
const Category = require('../models/Category');
const date = require('../../utils/fortmatdate');

class StoredController {
  // [GET] /stored/books
  // eslint-disable-next-line class-methods-use-this
  books(req, res, next) {
    const isQuery = !!req.query.q; // if ton tai -> true
    let query;
    if (isQuery) {
      query = Book.find({ name: { $regex: new RegExp(req.query.q), $options: 'i' } });
    } else {
      query = Book.find({});
    }
    Promise.all([query.populate('category'), Book.countDeleted()])
      .then(([books, countDeleted]) => {
        const bookFormat = books.map((book) => ({
          _id: book._id,
          name: book.name,
          category: book.category,
          country: book.country,
          author: book.author,
          updatedAt: date.format(book.updatedAt),
          publicationDate: book.publicationDate,
        }));
        console.log(bookFormat[0]);
        res.render('stored/stored-books', { books: bookFormat, countDeleted });
      })
      .catch((err) => { next(err); });
  }

  // [GET] /stored/categories
  // eslint-disable-next-line class-methods-use-this
  categories(req, res, next) {
    const isQuery = !!req.query.q; // if ton tai -> true
    let query;
    if (isQuery) {
      query = Category.find({ name: { $regex: new RegExp(req.query.q), $options: 'i' } });
    } else {
      query = Category.find({});
    }
    Promise.all([query, Category.countDeleted()])
      .then(([categories, countDeleted]) => {
        const categoryFormat = categories.map((category) => ({
          _id: category._id,
          name: category.name,
          description: category.description,
          updatedAt: date.format(category.updatedAt),
        }));
        res.render('stored/stored-categories', { categories: categoryFormat, countDeleted });
      })
      .catch((err) => { next(err); });
    // Category.find({})
    //   .then((categories) => {
    //     res.render('stored/stored-categories', { categories });
    //   })
    //   .catch((err) => next(err));
  }

  // [GET] /stored/trash/category
  // eslint-disable-next-line class-methods-use-this
  trashCategories(req, res, next) {
    const isQuery = !!req.query.q; // if ton tai -> true
    let query;
    if (isQuery) {
      query = Category.findDeleted({ name: { $regex: new RegExp(req.query.q), $options: 'i' } });
    } else {
      query = Category.findDeleted({});
    }
    query
      .then((categories) => {
        const categoryFormat = categories.map((category) => ({
          _id: category._id,
          name: category.name,
          description: category.description,
          deletedAt: date.format(category.deletedAt),
        }));
        res.render('stored/stored-categories-trash', { categories: categoryFormat });
      })
      .catch((err) => next(err));
  }

  // [GET] /stored/trash/books
  // eslint-disable-next-line class-methods-use-this
  trashBooks(req, res, next) {
    const isQuery = !!req.query.q; // if ton tai -> true
    let query;
    if (isQuery) {
      query = Book.findDeleted({ name: { $regex: new RegExp(req.query.q), $options: 'i' } });
    } else {
      query = Book.findDeleted({});
    }
    query.populate('category')
      .then((books) => {
        const bookFormat = books.map((book) => ({
          _id: book._id,
          name: book.name,
          category: book.category,
          country: book.country,
          author: book.author,
          deletedAt: date.format(book.deletedAt),
          publicationDate: book.publicationDate,
        }));
        res.render('stored/stored-books-trash', { books: bookFormat });
      })
      .catch((err) => next(err));
  }
}
module.exports = new StoredController();
