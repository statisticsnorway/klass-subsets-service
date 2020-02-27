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

const fs = require('fs');
const raw = fs.readFileSync('./src/test/subsets.json');
const data = JSON.parse(raw);
const subsetsRouter = express.Router();

subsetsRouter.route('/subsets').get((req, res) => {res.json(data);});
subsetsRouter.route('/subsets/:id').get((req, res) => {res.json( data.find(i => i.id == req.params.id));});
app.use('/api', subsetsRouter);

app.get('/', (req, res) => {
  res.status(200).send('klass subsets service is running');
});

app.listen(config.port, () => logger.info(`${config.name} listening on port ${config.port}`));
