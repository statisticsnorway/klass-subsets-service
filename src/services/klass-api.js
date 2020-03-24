const fetch = require('node-fetch');

const url = 'https://data.ssb.no/api/klass/v1/classifications/68/codesAt.json?date=2020-03-18&selectCodes=';

module.exports.getCode = function(code){
    return fetch(`${url}${code}`).then(response => response.json());
};


