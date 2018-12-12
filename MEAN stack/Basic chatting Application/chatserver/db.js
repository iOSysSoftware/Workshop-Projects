"use strict";
const mongodb = require('mongodb');

class Db{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
	}

	onConnect(){
		const mongoURL = 'mongodb://127.0.0.1:27017';
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(mongoURL, {
					useNewUrlParser: true
				}, (err, client) => {	
					if (err) {
						reject(err);
					} else {
						const db = client.db('workshop');
						resolve([db, this.ObjectID, client]);
					}
			});
		});
	}
}
module.exports = new Db();