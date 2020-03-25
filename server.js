const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {log, ExpressAPILogMiddleware} = require('@rama41222/node-logger');
const subsetsRouter = require('./src/routes/subsetsRouter')();
const klass = require('./src/services/klass-api');

const config = {
  name: 'klass-subsets-service',
  port: 5000
};

const app = express();
app.use(bodyParser.json());
app.use(cors());
const logger = log({ console: true, file: false, label: config.name });
app.use(ExpressAPILogMiddleware(logger, { request: true, response: true }));

app.get('/', (req, res) => res.status(200).send('klass subsets service v0.2.2 is running'));
app.use('/api', subsetsRouter);
app.use('/auth', subsetsRouter);
app.get('/auth', (req, res) => res.status(200).send('AUTHORIZED: klass subsets service v0.2.2 is running'));

app.get('/klass-api', (req, res) => {
    klass.getCode(1)
        .then(code => res.status(200).json(code))
        .catch(err => console.error(err));
});

app.listen(config.port, () => logger.info(`${config.name} listening on port ${config.port}`));
