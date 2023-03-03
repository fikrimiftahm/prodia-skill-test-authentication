const { mySqlClient } = require('../connection/mySqlClient');
// const { redisClient } = require('../connection/redisClient');
const { GenericError } = require('../exceptions/GenericError');

async function getCache(key) {
    return await redisClient.get(key);
}

const getUserId = async (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM apimanager.pro_users WHERE username = ?';
        mySqlClient.query(query, [username], (err, results, fields) => {
            if (err) {
                return reject(new GenericError(err.code));
            } else {
                return resolve(results[0].id);
            }
        });
    });
};

const getUserPass = async (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, password FROM apimanager.pro_users WHERE username = ?';
        mySqlClient.query(query, [username], (err, results, fields) => {
            if (err) {
                return reject(new GenericError(err.code));
            } else {
                if (results.length) {
                    return resolve(results[0]);
                } else {
                    return reject(new GenericError('Invalid username/password'));
                }
            }
        });
    });
};

const getUserPassById = async (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, username, password FROM apimanager.pro_users WHERE id = ?';
        mySqlClient.query(query, [id], (err, results, fields) => {
            if (err) {                
                return reject(new GenericError(err.code));
            } else {
                if (results.length) {
                    return resolve(results[0]);
                } else {
                    return reject(new GenericError('Invalid username/password'));
                }
            }
        });
    });
};

module.exports = {
    getCache, getUserId, getUserPass, getUserPassById
};