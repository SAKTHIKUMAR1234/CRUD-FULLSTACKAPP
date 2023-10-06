const Errors = require('./Errors.json')


class CustomeError extends Error {
    constructor(statusCode) {
        statusCode = statusCode || 500;
        super(Errors[statusCode]);
        this.statusCode = statusCode;
        this.status = 'fail';
        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = CustomeError