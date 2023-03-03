const { mySqlClient } = require('../connection/mySqlClient');
const { GenericError } = require('../exceptions/GenericError');

const updatePass = async (username, password) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE apimanager.pro_users SET password = ? WHERE username = ?';
        mySqlClient.query(query, [password, username], (err, results, fields) => {
            if (err) {
                return reject(new GenericError(err.code));
            } else {
                return resolve(results);
            }
        });
    });
};

const updateUserData = async (username, email, gender, phone, usernameHeader) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE apimanager.pro_users SET username = ?, email = ?, gender = ?, phone = ? WHERE username = ?';
        mySqlClient.query(query, [username, email, gender, phone, usernameHeader], (err, results, fields) => {
            if (err) {                
                return reject(new GenericError(err.code));
            } else {
                return resolve(results);
            }
        });
    });
};

module.exports = {
    updatePass, updateUserData
};