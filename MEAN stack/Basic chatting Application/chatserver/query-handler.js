'use strict';
class QueryHandler{

	constructor(){
		this.Mongodb = require("./db");
	}

	registerUser(data){
		return new Promise( (resolve, reject) => {
			this.Mongodb.onConnect()
				.then(([DB, ObjectID, mongoClient]) => {
					DB.collection('users').insertOne( data, (error, result) => {
						mongoClient.close();
						if (error) {
							reject(error);
						}
						resolve(result);
					});
				})
				.catch((error) => {
					reject(error)
				});	
		});
	}
}

module.exports = new QueryHandler();
