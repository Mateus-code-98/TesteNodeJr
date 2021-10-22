const { Router } = require('express');
const { UserRouter } = require('./userRouter');
const routes = Router()

routes.use('/users', UserRouter)

module.exports = routes