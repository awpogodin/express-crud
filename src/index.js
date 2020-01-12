require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const requestLogger = require('./middlewares/request-logger.middleware');
const controllers = require('./controllers');

const mongoDbConfig = require('./config/mongodb.config');
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(mongoDbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  '/bootstrap',
  express.static(path.resolve(__dirname, '..', 'node_modules', 'bootstrap', 'dist')),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(controllers);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
