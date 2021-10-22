require('dotenv/config')
require('express-async-errors')

const express = require('express');
const cors = require("cors");
const { ExceptionHandler } = require('./middlewares/exceptionHandler');
const { ExceptionParams } = require('./middlewares/exceptionParams');
const uploadConfig = require('./config/upload');

const port = process.env.PORT || 4000;
const app = express()
const routes = require('./routes/index');

app.use("/files", express.static(uploadConfig.directory))

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(ExceptionParams)

app.use(ExceptionHandler)

app.listen(port, () => console.log(`Listening on port ${port} ...`))