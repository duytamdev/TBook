const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');
const Category = require('../models/Category');
const userService = require('../services/User');

class SiteController {
  // eslint-disable-next-line class-methods-use-this
  getAllBook(req, res, next) {
    Book.find({}).populate('category')
      .then((books) => {
        res.json(books);
      })
      .catch((err) => next(err));
  }

  // eslint-disable-next-line class-methods-use-this
  getAllCategories(req, res, next) {
    Category.find({}, '_id name')
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => next(err));
  }

  // eslint-disable-next-line class-methods-use-this
  searchNameBook(req, res, next) {
    // search name ko phan biet chu hoa, chu thuong
    Book.find({ name: { $regex: new RegExp(req.query.name), $options: 'i' } })
      .then((books) => {
        res.json(books);
      })
      .catch((err) => next(err));
  }

  // eslint-disable-next-line class-methods-use-this
  getBook(req, res) {
    Book.findById(req.params.id).populate('category')
      .then((book) => {
        res.json(book);
      })
      .catch(() => res.json({ status: false }));
  }

  // eslint-disable-next-line class-methods-use-this
  getBookOfCategory(req, res) {
    Book.find({ category: req.params.idCategory }).populate('category')
      .then((book) => {
        res.json(book);
      })
      .catch(() => res.json({ status: false }));
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async register(req, res) {
    // eslint-disable-next-line camelcase
    const { username, password, confirm_password } = req.body;
    const userExists = await userService.login(username);
    // eslint-disable-next-line camelcase
    if (password !== confirm_password || userExists) {
      res.json({ status: false });
    } else {
      const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
      const userNew = await userService.register(username, hash);
      if (userNew) {
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    const { username, password } = req.body;
    const user = await userService.login(username);
    if (user) {
      // admin login
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        // eslint-disable-next-line no-underscore-dangle
        req.session.token = jwt.sign({ id: user._id, username: user.username }, 'mykey');
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    } else {
      // login false
      res.json({ status: false });
    }
  }
}
module.exports = new SiteController();
