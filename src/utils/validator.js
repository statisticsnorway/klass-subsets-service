module.exports.validate = function(input) {
    const subset = {};
    subset.id = req.body.name[0].languageText
        .toLowerCase()
        .replace(/\s/g, '_')
        .replace(/å|æ/g, 'a')
        .replace(/ø/g, 'o')
        .replace(/\W/g, '');
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

    return subset;
};