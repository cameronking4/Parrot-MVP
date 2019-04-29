var AuthUtility= require('./AuthUtility');
// var CommonUtility= require('./CommonUtility');
var token = '';

var async = require('async');

import {
	AsyncStorage
} from 'react-native';


// var expiretime='';
// AuthUtility.getKey("expiretime",function(expiretime){
//      expiretime=expiretime;
// });

var ApiUtility ={
	fetchPost: function(url,params,cb,errCb){
				var tableName = url;			
		
				fetch(tableName,{
				  method: 'POST',
				  headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',

				  },
				  body: JSON.stringify(params)
				})
		 		.then((response) =>{
		 			// console.log("Before error",response);
		 			return response.json()
		 		})
		 		.catch((error) => {
		 			console.log("Error...:",tableName,error);
		 			errCb(error);
		 		})
		 		.then((responseJson) => {
		 			console.log("Url:",tableName,params,responseJson);
		 			cb(responseJson);
		 		});
		
	},

	
	fetchAuthPost: function(url,params,cb,errCb){
		try { 
			AsyncStorage.getItem('@token:key').then((authtoken) => {
				
		// console.log("fetchAuthPost:",this.getUrl(key),JSON.stringify(params));
			// console.log("fetchAuthPost:",token);
			// CommonUtility.checkValidToken(function(response){
						
				var tableName = url;
				fetch(tableName,{
				  method: 'POST',
				  headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				    //'Authorization':'Bearer '+token
				    'token':authtoken
				  },
				  body: JSON.stringify(params)

				})
				.then((response) => {
					// console.log("check auth::",response);
					return response.json();

				})
				.catch((error) => {
		 			console.log("Error::",tableName,error);
		 			errCb(error);
		 		})
				.then((responseJson) => {
					//console.log("chk Token::",token);
					console.log("Url:",tableName,params,responseJson);
					// console.log("responseJson::",responseJson);
					cb(responseJson);
				});
			// });
		}); 
			
		}
		catch (error) { 
			// Error retrieving data 
			
			cb(null);
		}

},
	/*
	url : full path of api http://192.168.0.105:1332/api/...
	key : server key : userImage
	value : content://....
	cb : callback function will  return you with server response function(response){}
	errCb : callback function will  return you with server error response function(err){}
	*/
	saveImage : function(url,key,value,cb,errCb){
		
		console.log("value",value);
		/*
		let cleanUri =  value.replace( "file:///","");
alert(value);
		RNFetchBlob.fetch('POST', url, {
		  'Content-Type': 'multipart/form-data',
		}, [ 
		    { 
		    	name: 'image.jpg',
		    	filename: 'image.jpg', 
		    	type:'image/jpeg',   //'image/jpeg',
		    	data: RNFetchBlob.wrap(cleanUri) 
		    }
		  ]) .then((resp) => {
		    console.log("Res",resp.text());
		    alert(resp.text());
		  }).catch((err) => {
		  	alert(JSON.stringify(err));
		    console.log("err",err);
		  });

		*/
		const data = new FormData();
	    data.append(key, {
	      uri: value,
	      type:'image/jpeg',   //'image/jpeg',
	      name: 'image.jpg'
	    });
		var tableName = url;
		// post your data.
		fetch(tableName, {
		  method: 'POST',
			headers: {
		    'Accept': 'application/json',
			'Content-Type': 'multipart/form-data',
		    'token':token
		  },
		  // body: JSON.stringify(data)
		  body: data
		})
		.then((response) => {
			// console.log("Success Response:",response);
			return response.json();
		})
		.catch((error) => {
 			console.log(tableName,error);
 			errCb(error);
 		})
		.then((responseJson) => {
			console.log("Url:",tableName,value,responseJson);

			// console.log("responseJson",responseJson);
			cb(responseJson);
		});
		
	},


	saveVideo : function(url,key,value,cb,errCb){
		const data = new FormData();
	    data.append(key, {
	      uri: value,
	      type:'video/mp4',   //'video/mp4',
	      name: 'video.mp4'
	    });
		var tableName = url;
		// post your data.
		fetch(tableName, {
		  method: 'POST',
			headers: {
		    'Accept': 'application/json',
			'Content-Type': 'multipart/form-data',
		    'token':token
		  },
		  // body: JSON.stringify(data)
		  body: data
		})
		.then((response) => {
			// console.log("Success Response:",response);
			return response.json();
		})
		.catch((error) => {
 			console.log(tableName,error);
 			errCb(error);
 		})
		.then((responseJson) => {
			console.log("Url:",tableName,value,responseJson);
			// console.log("responseJson",responseJson);
			cb(responseJson);
		});
	},


	/*fetchAuthGet: function(key,params,cb){
		////alert(this.getUrl(key)+" "+'Bearer '+token );
		fetch(this.getUrl(key),{
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Authorization':'Bearer '+token
		  },
		  body: querystring.stringify(params)
		})
		.then((response) => response.json())
		.then((responseJson) => {

			//console.log("responseJson",responseJson);
			cb(responseJson);
		});
	},*/

	setToken : function(value){
		// alert("setTokentoken"+value);
		token = value;
	},

	// getUrl:function(key){

	// // var base_url = "http://81.4.110.105:2901/";
	// var base_url = "http://192.168.0.105:1332/";
	// // var base_url = "http://128.199.208.15:1337/";
	// // var base_url = "http://192.168.0.8:3300/";
 //    var val = null;
 //    console.log("switch::",key);

 //        switch(key)
 //        {

	//         //login DONE
	//         case "userlogin":
	//           val = base_url + "api/auth/login";
	//           break;
			
	// 		case "singleimage":
	//           val = base_url + "api/user/save-image";
	//           break;
			
	// 		case "multipleimage":
	//           val = base_url + "api/user/save-images-single";
	//           break;			

	//     }

	//     return val;

	// }
}

module.exports = ApiUtility;
