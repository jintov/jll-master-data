
/**
 * This file contains the controller methods related to manipulation of master documents.
 */

/**
 * Importing required
 */
var masterService = require("./master.service.js");
var Response = require("../common/response.js");
var logger = require("../common/logger.js");
var Promise = require("bluebird");

/**
 * Creating the object to be exported.
 */
function init(router) {
    router.route('/categories').get(getCategories);
    router.route('/categories/:categoryCode').get(getCategoriesByCategoryCode);
    router.route('/categories/:categoryCode/types').get(getTypesByCategoryCode);
    router.route('/categories/:categoryCode/types/:typeCode').get(getTypesByCategoryAndTypeCode);
    router.route('/categories/:categoryCode/types/:typeCode/subtypes').get(getSubTypesByCategoryCodeAndTypeCode);
    router.route('/categories/:categoryCode/types/:typeCode/subtypes/:subTypeCode').get(getSubTypesByCategoryCodeTypeCodeAndSubTypeCode);
    router.route('/categories/:categoryCode/typedesc/:typeDesc/subtypedesc/:subTypeDesc').get(getSubTypeCodeByCategoryCodeTypeCodeAndSubType);

    router.route('/tenants').get(getTenantsByTenantCode);
    router.route('/tenants/:tenantCode').get(getTenantsByTenantCode);

    router.route('/priorities').get(getPrioritiesByPriorityCode);
    router.route('/priorities/:priorityCode').get(getPrioritiesByPriorityCode);

    router.route('/statuses').get(getStatus);
    router.route('/statuses/:statusCode').get(getStatusByStatusCode);
    router.route('/statuses').post(postStatusByArrayOfStatusCodes);
};

function getCategories(req, res) {
    var response = new Response();
    masterService.getCategories().then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the Categories";
        logger.info("fetched the Categories successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Categories {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Categories data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getCategoriesByCategoryCode(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    masterService.getCategoriesByCategoryCode(categoryCode).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the Categories by CategoryCode";
        logger.info("fetched the Categories by CategoryCode successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Categories by CategoryCode {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Categories by CategoryCode data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getTypesByCategoryCode(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    masterService.getTypesByCategoryCode(categoryCode).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the Types";
        logger.info("fetched the Types successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Types {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Types data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getTypesByCategoryAndTypeCode(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    var typeCode = req.params.typeCode;
    masterService.getTypesByCategoryAndTypeCode(categoryCode, typeCode).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the Types";
        logger.info("fetched the Types successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Types {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Types data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getSubTypesByCategoryCodeAndTypeCode(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    var typeCode = req.params.typeCode;
    masterService.getSubTypesByCategoryCodeAndTypeCode(categoryCode, typeCode).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the SubTypes";
        logger.info("fetched the SubTypes successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the SubTypes {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "SubTypes data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getSubTypesByCategoryCodeTypeCodeAndSubTypeCode(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    var typeCode = req.params.typeCode;
    var subTypeCode = req.params.subTypeCode
    masterService.getSubTypesByCategoryCodeTypeCodeAndSubTypeCode(categoryCode, typeCode, subTypeCode).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the SubTypes";
        logger.info("fetched the SubTypes successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the SubTypes {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "SubTypes data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getSubTypeCodeByCategoryCodeTypeCodeAndSubType(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    var typeDesc = req.params.typeDesc;
    var subTypeDesc = req.params.subTypeDesc;
    masterService.getSubTypeCodeByCategoryCodeTypeCodeAndSubType(categoryCode, typeDesc, subTypeDesc).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the work subtype with category code :" + categoryCode + "successfully.";
        logger.info("fetched the work subtype with category code :" + categoryCode + " successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching work subtype with category code: " + categoryCode + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = error;
        res.status(500).json(response);
    });
};

function getTenantsByTenantCode(req, res) {
    var response = new Response();
    var tenantCode = req.params.tenantCode;
    masterService.getTenantsByTenantCode(tenantCode).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the Tenants";
        logger.info("fetched the Tenants successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Tenants {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Tenants data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getPrioritiesByPriorityCode(req, res) {
    var response = new Response();
    var priorityCode = req.params.priorityCode;
    masterService.getPrioritiesByPriorityCode(priorityCode).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the Priorities";
        logger.info("fetched the Priorities successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Priorities {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Priorities data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getStatus(req, res) {
    var response = new Response();
    masterService.getStatus().then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the status data";
        logger.info("fetched the status data successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the status data {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Status data was not fetched successfully";
        res.status(500).json(response);
    });
};


function getStatusByStatusCode(req, res) {
    var response = new Response();
    var statusCode = req.params.statusCode;
    masterService.getStatusByStatusCode(statusCode).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the status data for status codes :"+statusCode;
        logger.info("fetched the status data for status codes :"+statusCode + " successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the status data for status codes :"+statusCode+ " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Status data was not fetched successfully";
        res.status(500).json(response);
    });
};

function postStatusByArrayOfStatusCodes(req, res) {
    var response = new Response();
    var workOrderStatusCodes = req.body;
    masterService.postStatusByArrayOfStatusCodes(workOrderStatusCodes).then(function (responseArray) {
        response.data = responseArray;
        response.status.code = "200";
        response.status.message = "fetched the work order status data for status codes :"+workOrderStatusCodes;
        logger.info("fetched the work order status data for status codes :"+workOrderStatusCodes + " successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the work order status data for status codes :"+workOrderStatusCodes+ " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Work Subtype status data was not fetched successfully";
        res.status(500).json(response);
    });
};

module.exports.init = init;