const express = require('express');
const lds = require('./../services/lds-api');
const validator = require('./../utils/validator');

function routes() {
    const subsetsRouter = express.Router();
    subsetsRouter.route('/v1/subsets')
        .get((req, res) => {
            // /v1/subsets?schema=lds
            if (req.query.schema === 'lds') {
                lds.getSchema()
                    .then(schema => res.status(200).json(schema))
                    .catch(err => console.error(err));
            } else {
                lds.getSubsets()
                    .then(subset_data => res.status(200).json(subset_data))
                    .catch(err => console.error(err))
            }
        })
        .post((req, res) => {
            const subset = validator.validate(req.body);
            subset.id = "5";
            lds.postSubset(subset)
                .then(subset_data => res.status(200).json({ id: subset.id }))
                .catch(err => console.error(err))
        });

    subsetsRouter.route('/v1/subsets/:id')
        .get((req, res) => {
            lds.getSubset(req.params.id)
                .then(subset_data => res.status(200).json(subset_data))
                .catch(err => console.error(err))
        })
        .put((req, res) => {
            lds.postSubset(req.body)
                .then(subset_data => res.status(200).json(subset_data))
                .catch(err => console.error(err))
        });

    return subsetsRouter;
}

module.exports = routes;