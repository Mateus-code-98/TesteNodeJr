const AppError = require("../errors/AppError")

const ExceptionParams = (err,req,res,next) => {
    const type = err.errors ? err.errors[0].type : null
    const path = err.errors ? err.errors[0].path : null
    if(type === "unique violation")throw new AppError(`Atributo '${path}' não disponível!`,'400',path)
    else if(type === "notNull Violation")throw new AppError(`Atributo '${path}' obrigatório!`,'400',path)
    return next(err)
}

module.exports = { ExceptionParams }