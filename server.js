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

app.get('/', (req, res) => {
  res.status(200).send('klass subsets service is running');
});

app.listen(config.port, () => logger.info(`${config.name} listening on port ${config.port}`));
