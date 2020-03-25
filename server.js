require('dotenv-extended').load({errorOnMissing: true});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {log, ExpressAPILogMiddleware} = require('@rama41222/node-logger');
const subsetsRouter = require('./src/routes/subsetsRouter')();
const klass = require('./src/services/klass-api');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());
const logger = log({ console: true, file: false, label: process.env.npm_package_name });
app.use(ExpressAPILogMiddleware(logger, { request: true, response: true }));

app.get('/', (req, res) => res.status(200).send(`${process.env.npm_package_name} is running`));
app.get('/version', (req, res) => res.status(200).send(process.env.npm_package_version));
app.use('/api', subsetsRouter);
app.use('/auth', subsetsRouter);
app.get('/auth', (req, res) => res.status(200).send(`AUTHORIZED: ${process.env.npm_package_name} is running`));

app.get('/klass-api', (req, res) => {
    klass.getCode(1)
        .then(code => res.status(200).json(code))
        .catch(err => console.error(err));
});

app.listen(PORT, () =>
    logger.info(`${process.env.npm_package_name} v${process.env.npm_package_version} listening on port ${PORT}`));
