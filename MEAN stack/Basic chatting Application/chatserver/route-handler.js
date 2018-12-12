'use strict';

const queryHandler = require('./query-handler');

class RouteHandler{

	singupRouteHandler(request, response) {
		const data = {
			username: request.body.username
		};
		if (data.username === '') {
			response.status(400).json({
				error: true,
				message: `Username can't be empty`
			});
		} else {
			data.username = (data.username).toLowerCase();
			queryHandler.registerUser(data)
				.then( (result) => {
					if (result === null || result === undefined) {
						response.status(500).json({
							error: false,
							message: 'Username registration failed.'
						});
					} else {
						response.status(200).json({
							error: false,
							userId: result.insertedId,
							username: data.username,
							message: 'Username registration succesful.'
						});
					}
				})
				.catch((error) => {
							console.log(error);
					response.status(500).json({
						error: true,
						message: 'Username registration failed.'
					});
				});
		}
	}

	routeNotFoundHandler(request, response){
		response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
			error : true,
			message : CONSTANTS.ROUTE_NOT_FOUND
		});
	}
}

module.exports = new RouteHandler();
