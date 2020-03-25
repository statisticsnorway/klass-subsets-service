const fetch = require('node-fetch');

const url = 'http://lds-klass.klass.svc.cluster.local/ns/ClassificationSubset';

module.exports.getSchema = function() {
    return fetch(`${url}/?schema`).then(response => response.json());
};

module.exports.getSubsets = function() {
    return fetch(url).then(response => response.json());
};

module.exports.getSubset = function(id) {
    return fetch(`${url}/${id}`).then(response => response.json());
};

module.exports.postSubset = function(subset, id = '') {
    return fetch(`${url}/${id}`, {
        method: 'post',
        body: JSON.stringify(subset),
        headers: {'Content-Type': 'application/json'}})
        .then(response => response.json());
};