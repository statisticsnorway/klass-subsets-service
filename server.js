const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {log, ExpressAPILogMiddleware} = require('@rama41222/node-logger');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/test/subsets.json'));
const subsetsRouter = require('./src/routes/subsetsRouter')(data);
const lds = require('./src/services/lds-api');
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

app.get('/', (req, res) => res.status(200).send('klass subsets service v0.1.9 is running'));
app.use('/api', subsetsRouter);
app.use('/auth', subsetsRouter);
app.get('/auth', (req, res) => res.status(200).send('AUTHORIZED: klass subsets service v0.1.9 is running'));

app.get('/klass-api', (req, res) => {
    klass.getCode(1)
        .then(code => res.status(200).json(code))
        .catch(err => console.error(err));
});

app.get('/lds-klass/schema', (req, res) => {
    lds.getSchema()
        .then(schema => res.status(200).json(schema))
        .catch(err => console.error(err));
});

const subset1 = JSON.parse(fs.readFileSync('./src/test/subset1.json'));
app.get('/lds-klass/subset1', (req, res) => {
    lds.postSubset(subset1)
        .then(subset_data => res.status(200).json(subset_data))
        .catch(err => console.error(err))
});

app.listen(config.port, () => logger.info(`${config.name} listening on port ${config.port}`));
