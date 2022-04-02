const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../services/User');

class SiteController {
  // eslint-disable-next-line class-methods-use-this
  dashboard(req, res) {
    res.render('dashboard');
  }

  // eslint-disable-next-line class-methods-use-this
  login(req, res) {
    res.render('login', { layout: false });
  }

  // eslint-disable-next-line class-methods-use-this
  async onLogin(req, res) {
    const { username, password } = req.body;
    const user = await userService.login(username);
    if (user) {
      // admin login
      if (user.role === 'admin') {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          // eslint-disable-next-line no-underscore-dangle
          req.session.token = jwt.sign({ id: user._id, username: user.username }, 'mykey');
          res.redirect('/stored/books');
        } else {
          res.redirect('/login');
        }
      } else {
        // user login
        res.redirect('/login');
      }
    } else {
      // login false
      res.redirect('/login');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  logout(req, res) {
    req.session.destroy(() => {
      // thành công thì chuyển đăng nhập
      res.redirect('/login');
    });
  }
}
module.exports = new SiteController();
