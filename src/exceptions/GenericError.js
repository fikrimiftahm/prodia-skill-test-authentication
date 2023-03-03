class GenericError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'GenericError';
    }
}

module.exports = {
    GenericError
};