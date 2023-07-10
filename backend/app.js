const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
// const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL, { useNewUrlParser: true });

// app.use(cors);
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/handleError'));

app.listen(PORT);
