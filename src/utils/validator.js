module.exports.validate = function(input) {
    const subset = {};
    subset.createdBy = input.createdBy;
    subset.createdDate = new Date();
    subset.lastUpdatedDate = new Date();
    subset.administrativeStatus = "OPEN";
    subset.administrativeDetails = input.administrativeDetails;
    subset.description = input.description;
    subset.version = "1.0.0";
    subset.versionValidFrom = input.validFrom;
    subset.validFrom = input.validFrom;
    subset.validUntil = input.validUntil;
    subset.name = input.name;
    subset.codes = [];
    input.codes.map(code => subset.codes.push({ rank: code.rank, urn: code.urn }));

    console.log(JSON.stringify(subset,null,4));
    return subset;
};