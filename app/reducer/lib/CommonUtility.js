import {
  AlertIOS,
  ToastAndroid,
  Platform
} from 'react-native';


var ApiUtility= require('./ApiUtility');
var AuthUtility= require('./AuthUtility');
var Config= require('../../Config');

var  async =  require('async');
 
var CommonUtility={

  //**** This function used to compare destination object with full array object, also need to pass destKey and sourceKey will compare object[key]
  //Same as getIndexOfCompareObjArr <BUT IT WILL RETURN YOU BOOLEAN VALUE ONLY>
  //Usage : like button, checkbox value sync two array etc..
  //var arr = [{_id:"1",name:"sdfs"},{_id:"2",name:"234"}]
  //key = "_id"
  //compareVal = "1"
  //return index or -1 incase fail
  //getToggleCompareObjArr(obj,"_id",arr,"_id");
  getToggleCompareObjArr: function(destObj,destKey,sourceArray,sourceKey){

    // console.log('checkInArray:destObj,destKey,sourceArray,sourceKey:',destObj,destKey,sourceArray,sourceKey);
    
    sourceArray = sourceArray||[];
      
    for (var i = 0;i < sourceArray.length ;i++) {
        
        if(sourceArray[i][sourceKey] == destObj[destKey])
        {
            return true;
        }
    
    }

    return false;

  },

  //**** This function used to compare destination object with full array object, also need to pass destKey and sourceKey will compare object[key]
  //Usage : checkbox value sync two array etc..
  //var arr = [{_id:"1",name:"sdfs"},{_id:"2",name:"234"}]
  //key = "_id"
  //compareVal = "1"
  //return index or -1 incase fail
  //getIndexOfCompareObjArr(obj,"_id",arr,"_id");
  getIndexOfCompareObjArr: function(destObj,destKey,sourceArray,sourceKey){

    // console.log('checkInArray:destObj,destKey,sourceArray,sourceKey:',destObj,destKey,sourceArray,sourceKey);
    // alert(JSON.stringify(destObj[destKey]));
    sourceArray = sourceArray||[];
      
    for (var i = 0;i < sourceArray.length ;i++) {
        
        if(sourceArray[i][sourceKey] == destObj[destKey])
        {
            return i;
        }
    
    }

    return -1;

  },


  //to extract file extension
  //filePath: path from which the extension will be extract

  fileExtensionExtractor: function(filePath){
    var extension = filePath.substring(filePath.lastIndexOf('.')+1, filePath.length) || filePath;
    return extension;
  },

  //**** This function used to return index of array object.
  //Usage : remove checkbox, or get any object['key'] value 
  //var arr = [{_id:"1",name:"sdfs"},{_id:"2",name:"234"}]
  //key = "_id"
  //compareVal = "1"
  //return index or -1 incase fail
  //getIndexOfCompareVal(arr,"_id","1");
  getIndexOfCompareVal:function(arr,key,compareVal){
    for(var i=0;i<arr.length;i++){
      if(arr[i][key] == compareVal){
        return i;
      }
    }

    return -1;
  },
 getIndexOfCompareVal2:function(arr,key,compareVal){
    // alert(arr);
    if(arr!=null && arr.length>0){
      
      // var arr=JSON.parseArray(arr);
    for(var i=0;i<arr.length;i++){
      if(arr[i][key] == compareVal){
        return arr[i];
      }
    }
    }
    return -1;
  },
  showToast:function(message){
    if (Platform.OS === "android") {
      return ToastAndroid.show(message, ToastAndroid.SHORT);
    } 
    else if (Platform.OS === "ios") {
      return AlertIOS.alert(message);
    }
  },

  checkValidToken:function(cb){

    async.parallel({
      email:function(callback){
        AuthUtility.getUserField('email',function(email){
          callback(null,email);
        });
      },
      refreshtoken:function(callback){
        AuthUtility.getKey("refreshtoken",function(refreshtoken){ 
          callback(null,refreshtoken);
        });
      },
      expiretime:function(callback){
        AuthUtility.getKey("expiretime",function(expiretime){
          callback(null,expiretime);
        });
      }
    },function(err,results){
      
      console.log('CommonUtility:JSON.stringify(results)',JSON.stringify(results));
      var refreshtoken=results['refreshtoken'];
      var email=results['email'];
      var expiretime=results['expiretime'];

      var currentTime=new Date().getTime();
      
      // var exTime=parseInt(expireTime);
      console.log('currentTime-exTime > 5:',currentTime,parseInt(expiretime));

      if(currentTime  < parseInt(expiretime)){
        
        cb(true);
      }
      else{
        // alert('$$$$$ token expire $$$$');
      
        var NewExpireTime=currentTime+parseInt(expiretime);
        var that = this;
        var path = Config.API_URL+'/auth/refresh-token';
        var bunch={
          email:email,
          refreshtoken:refreshtoken,
        };

        // console.log('path,bunch',path,bunch);


          fetch(path,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',

            },
            body: JSON.stringify(bunch)
          })
          .then((response) =>{
            // console.log("Before error",response);
            return response.json()
          })
          .catch((error) => {
            console.log("Error...:",path,error);
            cb(false);
          })
          .then((responseJson) => {
            console.log("Url:",path,bunch,responseJson);
            // alert('CommonUtility:refreshtoken:response::'+responseJson);          

            if(responseJson == undefined){
              alert('please login first');
            }

            var expiretime=new Date().getTime()+parseInt(responseJson.expiretime);

            // alert(JSON.stringify(responseJson));
            if(responseJson.success==true){
              async.parallel([
                    
                    function(callback){
                      
                      AuthUtility.setKey("expiretime",expiretime.toString(),function(){
                        console.log('CommonUtility: new expiretime setted');
                        callback(null);
                      });
                    },
                    function(callback){
                      AuthUtility.setKey("refreshtoken",responseJson.refreshtoken,function(){
                        console.log('CommonUtility: new refreshtoken setted');
                        callback(null);
                      });
                    }
                  ],function(err,results){
                      cb(true);
                  });
            }
            else{
              console.log('CommonUtility:else call');
              cb(null);
            }
          });
          
      }
    });

  }

}

module.exports = CommonUtility;
