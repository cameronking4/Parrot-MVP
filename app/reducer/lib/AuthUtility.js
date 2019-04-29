var React = require('react-native');

var {
  AsyncStorage,
} = React;

var SqlDB = {
	setToken:function(token,cb){
		//console.log("setToken::",token);
		/*AuthUtility.setToken(response.data.token,function(){
            });*/
		try { 
			// console.log("try::",token);
			//alert(token);
			AsyncStorage.setItem('@token:key', token).then((error) => {
				// console.log("tryInside::",token);
				//alert("WEREWRWER");
				cb(200);
			}); 
		} catch (error) { 
			// Error saving data 
			cb(500);
		}
	},
	getToken : function(cb){
		/*AuthUtility.getToken(function(value){
	        console.log("Token",value);
	      });*/
		try { 
			AsyncStorage.getItem('@token:key').then((value) => {
				cb(value);
			}); 
			
		}
		catch (error) { 
			// Error retrieving data 
			
			cb(null);
		}
	},
	setUser:function(data){
		for (k in data) {
	    	AsyncStorage.setItem('@user:'+k, data[k]+"").then(() => {

	    	});
	    }
	},
	getUserField:function(key,cb){
		AsyncStorage.getItem('@user:'+key).then((value) => {
			cb(value);
		});
	},

	removeToken:function(cb){
		AsyncStorage.removeItem('@token:key').then(() => {
			cb();
		});
	},

	setKey:function(key,value,cb){
		AsyncStorage.setItem('@data:'+key,value ).then(() => {
			cb()
	   	});
	},
	getKey:function(key,cb){
		AsyncStorage.getItem('@data:'+key ).then((value) => {
			cb(value);
	   	});
	},

	clear:function(cb){
		AsyncStorage.clear().then((value) => {
			cb();
		});
	}
};

module.exports = SqlDB;