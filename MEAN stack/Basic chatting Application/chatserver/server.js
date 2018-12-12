'use strict';

const http = require('http');
const express = require("express");
const socketio = require('socket.io');
const bodyParser =  require('body-parser');
const cors = require('cors');

const socketEvents = require('./socket');
const routes = require('./routes');


class Server{

    constructor(){
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

    appConfig(){     
        this.app.use(
            bodyParser.json()
        );
        this.app.use(cors());
    }

    /* Including app Routes starts*/
    includeRoutes(){
        new routes(this.app).routesConfig();
        new socketEvents(this.socket).socketConfig();
    }
    /* Including app Routes ends*/  

    appExecute(){
        this.appConfig();
        this.includeRoutes();

        const port =  process.env.PORT || 4000;
        const host = process.env.HOST || `localhost`;      

        this.http.listen(port, host, () => {
            console.log(`Listening on http://${host}:${port}`);
        });
    }

}
    
const app = new Server();
app.appExecute();