const expressConfig = require('./express-config');
const bodyParser = require('body-parser');
const cors = require('cors');

class AppConfig{
	
	constructor(app) {
		this.app = app;
	}

	includeConfig() {
		this.app.use(
			cors({
				credentials: true,
				origin: true
			})
		);
		this.app.use(
            bodyParser.json()
		);       
		new expressConfig(this.app);
	}

}
module.exports = AppConfig;
