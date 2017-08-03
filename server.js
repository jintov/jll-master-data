/**
 * Import Files
 */
var masterDataRoute = require("./app/master.route.js");
var swagger = require("./swagger/swagger.json");
var corsFilter = require("./common/cors.filter");
var logger = require("./common/logger.js");

/**
 * Set up npm modules
 */
var swaggerUi = require('swaggerize-ui');
var bodyParser = require("body-parser");
var morganLogger = require("morgan");
var express = require("express");
var fs = require('fs');

/**
 * Initialize the Express server and its router
 */
var app = express();
var router = express.Router();

/**
 * Initialize logging middleware
 */
app.use(morganLogger('dev'));
// Create the log directory if it does not exist
if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

/**
 * Setting limits
 */
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', "extended": false }));

/**
 * Cross-Origin Resource Sharing (CORS) to gives web servers cross-domain access controls,
 * which enable secure cross-domain data transfers.
 */
corsFilter(router);

/**
 * Configure routes for the services
 */
app.use('/api/v1/master', router);
masterDataRoute.init(router);

/**
 * Endpoint to get Swagger API specification
 */
app.get('/swagger', function(req, res) {
	fs.readFile('./swagger/swagger.json', 'utf8', function(err, data){
		res.end(data);
	});
})

/**
 * Endpoint for Swagger UI
 */
app.use('/api/v1/master/docs', swaggerUi({
  docs: '/swagger'
}));

/**
 * Error handler if something breaks
 */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Sorry, something went wrong in the server!');
});

/**
 * This function starts the express server
 */
function start() {
  logger.info("Starting the server using startup function");
  var port = process.env.PORT || 9002;
  app.listen(port, '0.0.0.0', function() {
    logger.info("Listening on : ", port);
  });
  logger.info("Master data service listening on port %d ", port);
}

/**
 * Calling the startup function to start the application
 */
start();
