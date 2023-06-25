const { constants } = require('../constants');

/**
 * Error Handler Middleware - To handle the error in asynchronous functions
 * @param err Error object passed by async functions that run into error
 * @param req Request object
 * @param res Response object
 * @param next NextFunction
 */
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ? res.statusCode : 500;

	switch(statusCode) {
		case constants.VALIDATION_ERROR: 
			res.json({
				title: "Validation Failed!",
				message: err.message,
				stackTrace: err.stack,						
			});
			break;
			
		case constants.NOT_FOUND: 
			res.json({
				title: "Not Found",
				message: err.message,
				stackTrace: err.stack,
			});
			break;

		case constants.FORBIDDEN: 
			res.json({
				title: "Request Forbidden",
				message: err.message,
				stackTrace: err.stack,
			});
			break;

		case constants.UNAUTHORIZED: 
			res.json({
				title: "Unauthorized Access",
				message: err.message,
				stackTrace: err.stack,
			});
			break;
			
		case constants.SERVER_ERROR: 
			res.json({
				title: "Server Error",
				message: err.message,
				stackTrace: err.stack,
			});
			break;
			
		default:
			// console.log("No error! All good!!")
			break;
	}
};

module.exports = errorHandler;