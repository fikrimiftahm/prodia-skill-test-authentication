const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    const error = {
                        httpStatus: 500,
                        errors: err,
                    }

                    return reject(error);
                }

                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        const error = {
                            httpStatus: 500,
                            errors: err,
                        }

                        return reject(error);
                    }

                    return resolve(hash);
                });
            });
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = {
    hashPassword
};