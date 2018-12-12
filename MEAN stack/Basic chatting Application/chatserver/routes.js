'use strict';

const routeHandler = require('./route-handler');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){

		this.app.post('/singup', (request, response) => {
			routeHandler.singupRouteHandler(request, response);
		});
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;