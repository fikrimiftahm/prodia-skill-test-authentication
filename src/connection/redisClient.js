require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.connect();

redisClient.on('connect', () => {
    console.log('Redis connected');
});

redisClient.on('error', (err) => {
    console.log('Redis error: ' + typeof err == 'object' ? JSON.stringify(err) : err);
});

module.exports = {
    redisClient
};