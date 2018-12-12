"use strict";
/*requiring mongodb node modules */
const mongodb = require('mongodb');
const assert = require('assert');

class Db{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
	}

	onConnect(){
		const mongoURL = 'mongodb://127.0.0.1:27017/workshop';
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(mongoURL, (err, db) => {
				if (err) {
					reject(err);
				} else {
					assert.equal(null, err);
					resolve([db,this.ObjectID]);
				}
			});
		});
	}
}
module.exports = new Db();