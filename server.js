const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const fetch = require('node-fetch');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/test/subsets.json'));
const subsetsRouter = require('./src/routes/subsetsRouter')(data);

const config = {
  name: 'klass-subsets-service',
  port: 5000
};

const app = express();
app.use(bodyParser.json());
app.use(cors());
const logger = log({ console: true, file: false, label: config.name });
app.use(ExpressAPILogMiddleware(logger, { request: true, response: true }));

app.get('/', (req, res) => res.status(200).send('klass subsets service v0.1.5 is running'));
app.use('/api', subsetsRouter);
app.use('/auth', subsetsRouter);
app.get('/auth', (req, res) => res.status(200).send('AUTHORIZED: klass subsets service v0.1.5 is running'));

app.get('/klass-api', (req, res) => {
    fetch('https://data.ssb.no/api/klass/v1/classifications/68/codesAt.json?date=2020-03-18&selectCodes=1')
        .then(response => response.json())
        .then(klass_data => res.status(200).json(klass_data));
});

app.get('/lds-klass/schema', (req, res) => {
    fetch('http://lds-klass.klass.svc.cluster.local/ns/ClassificationSubset/?schema ')
        .then(response => response.json())
        .then(lds_data => res.status(200).json(lds_data));
});

const subset1 = JSON.parse(fs.readFileSync('./src/test/subset1.json'));
app.get('/lds-klass/subset1', (req, res) => {

    fetch('http://lds-klass.klass.svc.cluster.local/ns/ClassificationSubset/1', {
        method: 'post',
        body: JSON.stringify(subset1),
        headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(subset_data => res.status(200).json(subset_data))
        .catch(err => console.error(err));
});

app.listen(config.port, () => logger.info(`${config.name} listening on port ${config.port}`));
