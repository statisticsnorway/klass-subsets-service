const fetch = require('node-fetch');

const url = `${process.env.API_KLASS}/classifications/68/codesAt.json?date=2020-03-18&selectCodes=`;

module.exports.getCode = function(code){
    return fetch(`${url}${code}`).then(response => response.json());
};


