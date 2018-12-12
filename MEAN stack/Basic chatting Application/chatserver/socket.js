'use strict';

class Socket{

	constructor(socket){
		this.io = socket;
	}
	
	socketEvents(){

		this.io.on('connection', (socket) => {

			/* Sending and Receiving message */
			socket.on(`message`, async (data) => {
				console.log(data);
				this.io.emit(`message-response`, {
					error : false,
					message : data.message
				});
			});

		});

	}
	
	socketConfig(){
		this.socketEvents();
	}
}
module.exports = Socket;