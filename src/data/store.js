const { mySqlClient } = require('../connection/mySqlClient');
// const { redisClient } = require('../connection/redisClient');
const { GenericError } = require('../exceptions/GenericError');

const saveToCache = async (key, value, ex) => {
    return await redisClient.set(key, value, {
        EX: ex
    });
};

const saveToDb = async (data) => {
    return new Promise((resolve, reject) => {
        const insertDb = 'INSERT INTO apimanager.pro_users SET ?';
        mySqlClient.query(insertDb, data, (err, results, fields) => {
            if (err) {
                return reject(new GenericError(err.code));
            } else {
                return resolve(results);
            }
        });
    });
};

module.exports = {
    saveToDb, saveToCache
};