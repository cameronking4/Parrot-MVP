var SQLite = require('react-native-sqlite-storage');

function successcb(){
	console.log("successcb");
};

function errorcb(){
	console.log("errorcb");
};

var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);

var SqlDB = {
	find:function(tableKey,query,cb){
		var tableName=this.getTableName(tableKey);
		var q = '';

		query['fields']=query['fields']||'*';
		q = 'SELECT '+query['fields']+' from '+tableName;

		if(query['where']){
			q+=" where "+ query['where'];
		}

		if(query['sort']){
			q+=" ORDER BY "+query['sort'];
		}

		if(typeof query['pageNo'] !== 'undefined' ){
			var limit 	= query['perPage']||20;
			var offset 	= query['pageNo']*(query['perPage']||20);

			q+= " LIMIT "+ limit + ' OFFSET ' + offset;
		}

		db.transaction(function(tx){

		  	tx.executeSql(q, [], function(tx, results){

						//  		console.log(q,results.rows.raw());
		      	// console.log(tx,results);
		      	cb(tx,results);
		      	/*
		        let rows = results.rows.raw(); // shallow copy of rows Array

		        rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
		      	*/
		    });
		});
	},
	insert : function(tableKey,params,cb){
		var tableName = this.getTableName(tableKey);
		var keys = Object.keys(params);
		var values = [];
		var valueQuestions = [];
		var k = 0;

		for(var i in params){
			values[k] = params[i]
			valueQuestions[k] = '?';

			k++;
		};
		var query = "INSERT INTO "+tableName+" ("+keys.join(",")+") VALUES ("+valueQuestions.join(",")+")";

		db.transaction(function(tx){
		  tx.executeSql(query, values, function(tx, results){

		      //console.log(query,tx,results);
		      cb(tx,results);
		      /*
		        let rows = results.rows.raw(); // shallow copy of rows Array

		        rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
		      */
		    });
		});
	},

	insertOrReplace : function(tableKey,params,cb){
		var tableName = this.getTableName(tableKey);
		var keys = Object.keys(params);
		var values = [];
		var valueQuestions = [];
		var k = 0;

		for(var i in params){
			values[k] = params[i]
			valueQuestions[k] = '?';

			k++;
		};

		var query = "INSERT OR REPLACE INTO "+tableName+" ("+keys.join(",")+") VALUES ("+valueQuestions.join(",")+")";

		db.transaction(function(tx){
		  tx.executeSql(query, values, function(tx, results){

		      //console.log(query,values,results);
		      cb(tx,results);
		      /*
		        let rows = results.rows.raw(); // shallow copy of rows Array

		        rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
		      */
		    });
		});
	},
	/*
	UPDATE table_name
	SET column1 = value1, column2 = value2...., columnN = valueN
	WHERE [condition];
	*/
	update:function(tableKey,values,where,cb){
		var tableName=this.getTableName(tableKey);
		var q = 'UPDATE '+tableName+'';

		q+=" SET "+ values;
		q+= " where " +where;

		db.transaction(function(tx){

		  	tx.executeSql(q, [], function(tx, results){

		      	//console.log(q,tx,results);
		      	cb(tx,results);
		      	/*
		        let rows = results.rows.raw(); // shallow copy of rows Array

		        rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
		      	*/
		    });
		});
	},
	delete:function(tableKey,where,cb){
		var tableName=this.getTableName(tableKey);
		var q = "DELETE FROM "+tableName;

		if(where){
			q+=" where "+ where;
		}
		db.transaction(function(tx){

		  	tx.executeSql(q, [], function(tx, results){

		     	//console.log(q,tx,results);
		      	cb(tx,results);
		      	/*
		        let rows = results.rows.raw(); // shallow copy of rows Array

		        rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
		      	*/
		    });
		});
	},
	createInit : function(cb){
		db.sqlBatch([
			"CREATE TABLE IF NOT EXISTS params"+
			"(pk INTEGER PRIMARY KEY AUTOINCREMENT,"+
			"updatedAt INTEGER)",

			"CREATE TABLE IF NOT EXISTS joinGroups"+
			"(pk INTEGER PRIMARY KEY AUTOINCREMENT,"+
			"userId,groupId,mobileNo,"+
			"userName,gcmid,gName,"+
			"isAccept INTEGER,"+
			"lMDate INTEGER,"+
			"nUMessages INTEGER,"+
			"createdAt INTEGER,"+
			"updatedAt INTEGER,"+
			"lastMessage,"+
			"id CHAR(24) )",

			"CREATE TABLE IF NOT EXISTS createdGroups"+
			"(pk INTEGER PRIMARY KEY AUTOINCREMENT,"+
			"ownerId,name,description,"+
			"isPublic INTEGER,"+
			"createdAt INTEGER,"+
			"updatedAt INTEGER,"+
			"lastMessage,"+
			"id CHAR(24) )",

			"CREATE TABLE IF NOT EXISTS messages"+
			"(pk INTEGER PRIMARY KEY AUTOINCREMENT,"+
			"userId,"+
			"groupId,"+
			"text,"+
			"publish INTEGER"+
			"text,"+
			"sDate INTEGER,"+
			"pDate INTEGER,"+
			"createdAt INTEGER,"+
			"updatedAt INTEGER,"+
			"id CHAR(24) )",

			"CREATE UNIQUE INDEX IF NOT EXISTS mongoId "+
			"on joinGroups (id)",

			"CREATE UNIQUE INDEX IF NOT EXISTS mongoId1 "+
			"on createdGroups (id)",

			"CREATE UNIQUE INDEX IF NOT EXISTS mongoId2 "+
			"on messages (id)",

			"CREATE INDEX IF NOT EXISTS mongoId3 "+
			"on messages (groupId)",

			"Alter table joinGroups add column isSubAdmin NUMERIC default 0",
			"Alter table joinGroups add column access varchar default 'READ'",

			]
		, function() {
	    	console.log('Populated database OK');
	    	cb(200);
	  	}, function(error) {
			console.log('SQL batch ERROR: ' + error.message);
			cb(500);
		});
	},
	dropAll : function(cb){
		db.sqlBatch([
			"DROP TABLE IF EXISTS params",
			"DROP TABLE IF EXISTS joinGroups",
			"DROP TABLE IF EXISTS createdGroups",
			"DROP TABLE IF EXISTS messages",
			]
		, function() {
	    	console.log('Populated database OK');
	    	cb(200);
	  	}, function(error) {
			console.log('SQL batch ERROR: ' + error.message);
			cb(500);
		});
	},
	getTableName : function(tableKey){
		switch(tableKey){
			case 'auth':
				return "auth";
			case 'params':
				return 'params';
			case 'joinGroups':
				return 'joinGroups';
			case 'createdGroups':
				return 'createdGroups';
			case 'messages':
				return 'messages';
		}
	},
};

module.exports = SqlDB;
