
/**
 * This service file contains the service layer methods for manipulating the master objects.
 */
var logger = require("../common/logger.js");
var categoryTypeSubtypeFile = require('../data/category-type-subtype.json')
var statusCodesFile = require('../data/status-codes.json')
var tenantCodesFile = require('../data/tenant-codes.json')
var priorityCodesFile = require('../data/priority-codes.json')

var Promise = require('bluebird');
var _ = require('underscore');
var fs = require('fs');

/**
 * Creating the object which will finally be exported
 */
var masterDataService = {
    getCategories: getCategories,
    getCategoriesByCategoryCode: getCategoriesByCategoryCode,
    getTypesByCategoryCode: getTypesByCategoryCode,
    getTypesByCategoryAndTypeCode: getTypesByCategoryAndTypeCode,
    getSubTypesByCategoryCodeAndTypeCode: getSubTypesByCategoryCodeAndTypeCode,
    getSubTypesByCategoryCodeTypeCodeAndSubTypeCode: getSubTypesByCategoryCodeTypeCodeAndSubTypeCode,
    getSubTypeCodeByCategoryCodeTypeCodeAndSubType: getSubTypeCodeByCategoryCodeTypeCodeAndSubType,
    getTenantsByTenantCode: getTenantsByTenantCode,
    getPrioritiesByPriorityCode: getPrioritiesByPriorityCode,
    getStatus: getStatus,
    getStatusByStatusCode: getStatusByStatusCode,
    postStatusByArrayOfStatusCodes: postStatusByArrayOfStatusCodes
};

function getCategories() {
    return new Promise(function (resolve, reject) {
        if (categoryTypeSubtypeFile != undefined) {
            var categories = _.map(categoryTypeSubtypeFile, function(data, i) { 
                var eachCategory = _.pick(data, 'categoryCode','categoryDesc') 
                return { code:eachCategory.categoryCode, description:eachCategory.categoryDesc }
            });
            logger.info("Categories information fetched successfully from category-type-subtype.json {{IN SERVICE}}");
            resolve(categories);
        } else {
            logger.error("couldnt fetch Categories information from category-type-subtype.json {{IN SERVICE}}");
            reject("couldnt fetch Categories information from category-type-subtype.json {{IN SERVICE}}");
        }
    })
}

function getCategoriesByCategoryCode(categoryCode) {
    return new Promise(function (resolve, reject) {
        if (categoryTypeSubtypeFile != undefined) {
            var categoryJson = _.findWhere(categoryTypeSubtypeFile, { categoryCode: categoryCode });
            logger.info("Categories information fetched successfully from category-type-subtype.json {{IN SERVICE}}");
            resolve(categoryJson);
        } else {
            logger.error("couldnt fetch Categories information from category-type-subtype.json {{IN SERVICE}}");
            reject("couldnt fetch Categories information from category-type-subtype.json {{IN SERVICE}}");
        }
    })
}

function getTypesByCategoryCode(categoryCode) {
    return new Promise(function (resolve, reject) {
        var categoryTypeSubtypeJson = _.findWhere(categoryTypeSubtypeFile, { categoryCode: categoryCode });
        if (categoryTypeSubtypeJson != undefined) {
            var typeJson = _.map(categoryTypeSubtypeJson.children, function(data, i) { 
                var eachType = _.pick(data, 'typeCode','typeDesc') 
                return { code:eachType.typeCode, description:eachType.typeDesc }
            });
            logger.info("Type information fetched successfully from category-type-subtype.json {{IN SERVICE}}");
            resolve(typeJson);
        } else {
            logger.error("couldnt fetch Type information from category-type-subtype.json {{IN SERVICE}}");
            reject("couldnt fetch Type information from category-type-subtype.json {{IN SERVICE}}");
        }
    })
}

function getTypesByCategoryAndTypeCode(categoryCode, typeCode) {
    return new Promise(function (resolve, reject) {
        var categoryTypeSubtypeJson = _.findWhere(categoryTypeSubtypeFile, { categoryCode: categoryCode });
        if (categoryTypeSubtypeJson != undefined) {
            var typeSubtypeJson = _.findWhere(categoryTypeSubtypeJson.children, { typeCode: typeCode });
            if (typeSubtypeJson != undefined) {
                // var typeJson = _.map(typeSubtypeJson.children, function(data, i) { 
                //     var eachSubType = _.pick(data, 'subTypeCode','subTypeDesc') 
                //     return { code:eachSubType.subTypeCode, description:eachSubType.subTypeDesc }
                // });
                logger.info("Type information fetched successfully from category-type-subtype.json {{IN SERVICE}}");
                resolve(typeSubtypeJson);
            } else {
                logger.error("couldnt fetch Type information from category-type-subtype.json {{IN SERVICE}}");
                reject("couldnt fetch Type information from category-type-subtype.json {{IN SERVICE}}");
            }
        } else {
            logger.error("couldnt fetch Category Code information from category-type-subtype.json {{IN SERVICE}}");
            reject("couldnt fetch Category Code information from category-type-subtype.json {{IN SERVICE}}");
        }
    })
}


function getSubTypesByCategoryCodeAndTypeCode(categoryCode, typeCode) {
    return new Promise(function (resolve, reject) {
        var categoryTypeSubtypeJson = _.findWhere(categoryTypeSubtypeFile, { categoryCode: categoryCode });
        if (categoryTypeSubtypeJson != undefined) {
            var typeSubtypeJson = _.findWhere(categoryTypeSubtypeJson.children, { typeCode: typeCode });
            if (typeSubtypeJson != undefined) {
                var typeJson = _.map(typeSubtypeJson.children, function(data, i) { 
                    var eachSubType = _.pick(data, 'subTypeCode','subTypeDesc') 
                    return { code:eachSubType.subTypeCode, description:eachSubType.subTypeDesc }
                });
                logger.info("Type information fetched successfully from category-type-subtype.json {{IN SERVICE}}");
                resolve(typeJson);
            } else {
                logger.error("couldnt fetch Type information from category-type-subtype.json {{IN SERVICE}}");
                reject("couldnt fetch Type information from category-type-subtype.json {{IN SERVICE}}");
            }
        } else {
            logger.error("couldnt fetch Category Code information from category-type-subtype.json {{IN SERVICE}}");
            reject("couldnt fetch Category Code information from category-type-subtype.json {{IN SERVICE}}");
        }
    })
}

function getSubTypesByCategoryCodeTypeCodeAndSubTypeCode(categoryCode, typeCode, subTypeCode) {
    return new Promise(function (resolve, reject) {
        var categoryTypeSubtypeJson = _.findWhere(categoryTypeSubtypeFile, { categoryCode: categoryCode })
        if (categoryTypeSubtypeJson != undefined) {
            var typeSubtypeJson = _.findWhere(categoryTypeSubtypeJson.children, { typeCode: typeCode })
            if (typeSubtypeJson != undefined) {
                var subtypeJson = _.findWhere(typeSubtypeJson.children, { subTypeCode: subTypeCode })
                if (subtypeJson != undefined) {
                    logger.info("Subtype fetched successfully for categoryCode :: " + categoryCode + ", typeCode :: " + typeCode + ", subTypeCode :: " + subTypeCode + " from category-type-subtype.json");
                    resolve(subtypeJson);
                } else {
                    logger.info("Category Code with Type Description and Subtype Description Mapping given by you doesnt match with anything in database");
                    reject("Category Code with Type Description and Subtype Description Mapping given by you doesnt match with anything in database");
                }
            } else {
                logger.info("Category Code with Type Description Mapping given by you doesnt match with anything in database");
                reject("Category Code with Type Description Mapping given by you doesnt match with anything in database");
            }
        } else {
            logger.info("Category Code given by you doesnt match with anything in database");
            reject("Category Code given by you doesnt match with anything in database");
        }
    })
}


function getSubTypeCodeByCategoryCodeTypeCodeAndSubType(categoryCode, typeDesc, subTypeDesc) {
    return new Promise(function (resolve, reject) {
        typeDesc = searchTextFormat(typeDesc);
        subTypeDesc = searchTextFormat(subTypeDesc);
        var categoryTypeSubtypeJson = _.findWhere(categoryTypeSubtypeFile, { categoryCode: categoryCode })
        if (categoryTypeSubtypeJson != undefined) {
            var typeSubtypeJson = _.findWhere(categoryTypeSubtypeJson.children, { searchKey: typeDesc })
            if (typeSubtypeJson != undefined) {
                var subtypeJson = _.findWhere(typeSubtypeJson.children, { searchKey: subTypeDesc })
                if (subtypeJson != undefined) {
                    logger.info("Subtype fetched successfully for categoryCode :: " + categoryCode + ", typeDesc :: " + typeDesc + ", subTypeDesc :: " + subTypeDesc + " from category-type-subtype.json");
                    resolve(subtypeJson.subTypeCode);
                } else {
                    logger.info("Category Code with Type Description and Subtype Description Mapping given by you doesnt match with anything in database");
                    reject("Category Code with Type Description and Subtype Description Mapping given by you doesnt match with anything in database");
                }
            } else {
                logger.info("Category Code with Type Description Mapping given by you doesnt match with anything in database");
                reject("Category Code with Type Description Mapping given by you doesnt match with anything in database");
            }
        } else {
            logger.info("Category Code given by you doesnt match with anything in database");
            reject("Category Code given by you doesnt match with anything in database");
        }
    })
}

function getTenantsByTenantCode(tenantCode) {
    return new Promise(function (resolve, reject) {
        var allTenantsDetails = tenantCodesFile.codes
        if (tenantCode != undefined) {
            var foundTenantDetails = _.findWhere(allTenantsDetails, { code: tenantCode });
            logger.info("Tenant information fetched successfully from tenant-codes.json {{IN SERVICE}}");
            resolve(foundTenantDetails);
        } else {
            logger.info("Tenants information fetched successfully from tenant-codes.json {{IN SERVICE}}");
            resolve(allTenantsDetails);
        }
    })
}

function getPrioritiesByPriorityCode(priorityCode) {
    return new Promise(function (resolve, reject) {
        var allPriorityDetails = priorityCodesFile.codes
        if (priorityCode != undefined) {
            var foundPriorityDetails = _.findWhere(allPriorityDetails, { code: priorityCode });
            logger.info("Priority information fetched successfully from tenant-codes.json {{IN SERVICE}}");
            resolve(foundPriorityDetails);
        } else {
            logger.info("Priorities information fetched successfully from tenant-codes.json {{IN SERVICE}}");
            resolve(allPriorityDetails);
        }
    })
}

function getStatus() {
    return new Promise(function (resolve, reject) {
        var statusCodes = statusCodesFile.codes
        if (statusCodes != undefined) {
            logger.info("Status information fetched successfully from status-codes.json {{IN SERVICE}}");
            resolve(statusCodes);
        }
        else {
            logger.error("couldnt fetch status information from status-code json {{IN SERVICE}}");
            reject("couldnt fetch status information from status-code json {{IN SERVICE}}");
        }
    })
}

function getStatusByStatusCode(statusCode) {
    return new Promise(function (resolve, reject) {
        if (statusCode.length > 0) {
            var statusCodeTypes = statusCodesFile.codes;
            var foundStatusDetails = _.findWhere(statusCodeTypes, { code: statusCode });
            logger.info("Status information fetched successfully from status-codes.json {{IN SERVICE}}");
            resolve(foundStatusDetails);
        }
        else {
            logger.error("couldnt fetch status information from status-code json {{IN SERVICE}}");
            reject("couldnt fetch status information from status-code json {{IN SERVICE}}");
        }
    })
}

function postStatusByArrayOfStatusCodes(workOrderStatusCodes) {
    return new Promise(function (resolve, reject) {
        // Change string to JSON, unless input is in JSON format
        try {
            workOrderStatusCodes = JSON.parse(workOrderStatusCodes);
        } catch (e) { }
        if (workOrderStatusCodes.length > 0) {
            var statusCodeTypes = statusCodesFile.codes;
            var statusResponseArray = [];
            for (var i = 0; i < workOrderStatusCodes.length; ++i) {
                var neededWorkOrderStatus = _.findWhere(statusCodeTypes, { code: workOrderStatusCodes[i] });
                statusResponseArray.push(neededWorkOrderStatus);
            }
            logger.info("work order status information fetched successfully from status-codes.json {{IN SERVICE}}");
            resolve(statusResponseArray);
        }
        else {
            logger.error("couldnt fetch work order status information from status-code json {{IN SERVICE}}");
            reject("couldnt fetch work order status information from status-code json {{IN SERVICE}}");
        }
    })
}

function searchTextFormat(value) {
    value = value.toLowerCase();
    value = value.split(/\//g).join('_');
    value = value.split(/\s+/g).join('_');
    value = value.split(/\-/g).join('_');
    value = value.split(/_+/g).join('_');
    return value
}

//Exporting allthe methods in an object
module.exports = masterDataService;