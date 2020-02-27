const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const fs = require('fs');

const config = {
  name: 'klass-subsets-service',
  port: 5000
};

const logger = log({ console: true, file: false, label: config.name });
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

app.get('/', (req, res) => res.status(200).send('klass subsets service v0.1.0 is running'));

const data = JSON.parse(fs.readFileSync('./src/test/subsets.json'));
const subsetsRouter = express.Router();

app.use('/subsets', subsetsRouter);

subsetsRouter.route('/')
    .get((req, res) => res.status(200).json(data))
    .post((req, res) => {
      const subset = req.body;
      subset.id = data.length+1;
      data.push(subset);
      res.status(200).json(subset);
    });

subsetsRouter.route('/:id')
    .get((req, res) => res.status(200).json(data.find(i => i.id == req.params.id)));

app.listen(config.port, () => logger.info(`${config.name} listening on port ${config.port}`));
