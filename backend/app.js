const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const indexRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleErrors } = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Запрос прошел успешно');
});
app.use('/', indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.listen(PORT, () => {
});
