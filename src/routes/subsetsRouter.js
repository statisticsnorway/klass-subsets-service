const express = require('express');
const lds = require('./../services/lds-api');

function routes(data) {
    const subsetsRouter = express.Router();
    subsetsRouter.route('/v1/subsets')
        .get((req, res) => {
            lds.getSubsets()
                .then(subset_data => res.status(200).json(subset_data))
                .catch(err => console.error(err))
        })
        .post((req, res) => {
            lds.postSubset(req.body)
                .then(subset_data => res.status(200).json(subset_data))
                .catch(err => console.error(err))
        })
        .put((req, res) => {
            data[data.findIndex(i => i.id == req.body.id)] = req.body;
            res.status(200).json(data.find(i => i.id = req.body.id));
        });

    subsetsRouter.route('/v1/subsets/:id')
        .get((req, res) => {
            lds.getSubset(req.params.id)
                .then(subset_data => res.status(200).json(subset_data))
                .catch(err => console.error(err))
        })
        .post((req, res) => {
            lds.postSubset(req.body, req.params.id)
                .then(subset_data => res.status(200).json(subset_data))
                .catch(err => console.error(err))
        });

    return subsetsRouter;
}

module.exports = routes;