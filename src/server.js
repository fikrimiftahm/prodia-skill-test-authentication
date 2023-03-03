const { registerUser } = require('./api/registerUser');
const { loginUser } = require('./api/loginUser');
const { updatePassword } = require('./api/updatePassword');
const { updateUser } = require('./api/updateUser');

exports.register = registerUser;
exports.login = loginUser;
exports.updatepass = updatePassword;
exports.update = updateUser;