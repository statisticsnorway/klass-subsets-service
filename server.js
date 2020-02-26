const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

const config = {
  name: 'klass-subsets-service',
  port: 5000
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });
app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

const data = require('./src/test/subsets.json');
const subsetsRouter = express.Router();

subsetsRouter.route('/subsets')
    .get((req, res) => {
      res.json(data);
    });
app.use('/api', subsetsRouter);

app.get('/', (req, res) => {
  res.status(200).send('klass subsets service is running4');
});

app.listen(config.port, () => logger.info(`${config.name} listening on port ${config.port}`));
