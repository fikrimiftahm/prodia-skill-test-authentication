const bcrypt = require('bcrypt');
const { GenericError } = require('../exceptions/GenericError');

const validatePass = async (password, hash) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.compare(password, hash, (err, result) => {
                if (err) {
                    const error = {
                        httpStatus: 500,
                        errors: err,
                    }

                    return reject(error);
                }

                if (result) {
                    return resolve(result);
                } else {
                    return reject(new GenericError('Invalid username/password'));
                }
            });
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = {
    validatePass
};