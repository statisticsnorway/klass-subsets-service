const fetch = require('node-fetch');

const url = 'http://lds-klass.klass.svc.cluster.local/ns/ClassificationSubset';

module.exports.getSchema = function() {
    return fetch(`${url}/?schema`).then(response => response.json());
};

module.exports.postSubset = function(subset) {
    return fetch('http://lds-klass.klass.svc.cluster.local/ns/ClassificationSubset/1', {
        method: 'post',
        body: JSON.stringify(subset),
        headers: {'Content-Type': 'application/json'}})
        .then(response => response.json());
};