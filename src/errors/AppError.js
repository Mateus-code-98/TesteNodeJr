class AppError{
    message;
    path;
    statusCode;
    constructor(message,statusCode = 400,path = null){
        this.message    = message
        this.statusCode = statusCode
        this.path = path
    }
}

module.exports = AppError