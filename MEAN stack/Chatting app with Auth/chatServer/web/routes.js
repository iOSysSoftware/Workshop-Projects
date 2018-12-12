'use strict';

const routeHandler = require('./../handlers/route-handler');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){
		this.app.get('/usernameAvailable/:username', (request, response) => {
			routeHandler.userNameCheckHandler(request, response)
		});

		this.app.post('/login', (request, response) => {
			routeHandler.loginRouteHandler(request, response);
		});

		this.app.post('/register', (request, response) => {
			routeHandler.registerRouteHandler(request, response);
		});

		this.app.get('/userSessionCheck/:userId', (request, response) => {
			routeHandler.userSessionCheckRouteHandler(request, response);
		});

		this.app.post('/logout', (request, response) => {
			routeHandler.logout(request, response);
		});

		this.app.all('*', (request, response) => {
			routeHandler.routeNotFoundHandler(request, response);
		});
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;