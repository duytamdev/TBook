const userService = require('../services/User');

exports.login = async (username, password) => {
    // eslint-disable-next-line no-return-await
    return await userService.login(username);
}
