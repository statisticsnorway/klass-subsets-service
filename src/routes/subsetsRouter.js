const express = require('express');
const lds = require('./src/services/lds-api');

function routes(data) {
    const subsetsRouter = express.Router();
    subsetsRouter.route('/v1/subsets')
        .get((req, res) =>
            res.status(200).json(data))
        .post((req, res) => {
            const subset = req.body;
            subset.id = data.length+1;
            data.push(subset);
            res.status(200).json(subset);
        })
        .put((req, res) => {
            data[data.findIndex(i => i.id == req.body.id)] = req.body;
            res.status(200).json(data.find(i => i.id = req.body.id));
        });

    subsetsRouter.route('/v1/subsets/:id')
        .get((req, res) => {
            lds.getSubset(id)
                .then(subset_data => res.status(200).json(subset_data))
                .catch(err => console.error(err))
        });

    return subsetsRouter;
}

module.exports = routes;