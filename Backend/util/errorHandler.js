const ErrorHandler = (error,req,res,next) =>{
    error.statusCode = error.statusCode;
    error.staus = error.status || 'error';
    res.status(error.statusCode).json({
        status:error.status,
        message:error.message
    })
}

module.exports = ErrorHandler;