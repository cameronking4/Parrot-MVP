import   {ScrollView,Alert,
} from 'react-native';
import ApiUtility,{fetchPost} from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
var Config = require('../Config');

import { 
	
	FETCH_LOGIN_SUCCESS,
	FETCH_LOGIN_REQUEST,
	FETCH_LOGIN_ERROR,

  UPDATE_LOGIN_SUCCESS,
  UPDATE_LOGIN_REQUEST,
  UPDATE_LOGIN_ERROR,

  RESTORE_LOGIN_REQUEST,
  RESTORE_LOGIN_SUCCESS,

  FETCH_USERPROFILE_SUCCESS,
  FETCH_USERPROFILE_ERROR,
  FETCH_USERPROFILE_REQUEST


 } from '../constants/action-types';

export function fetchLoginData(path,bundle,navigation,fcmToken){

  return function(dispatch){
    dispatch({ 
    			type: FETCH_LOGIN_REQUEST,
    			payload: { isLoading: true },
    });
    
    console.log('action:fetch-data::',path,bundle,fcmToken);

    fetchPost(path,bundle,function(response){

 
      // //console.log('action:loginResponse',response);
      if(response.success){
        
       
        var expiretime=new Date().getTime()+parseInt(response.expiretime); 
        console.log("refres--**",response,navigation);    
        
         dispatch({
            type: FETCH_LOGIN_SUCCESS,
            payload:  response 
         });

        AuthUtility.setToken(response.token,function(){

                AuthUtility.setKey("refreshtoken",response.refreshtoken,function(){

                    AuthUtility.setKey("expiretime",expiretime.toString(),function(){
            
                    AuthUtility.setKey("userData",JSON.stringify(response.user),function(){
                      // alert(response.FETCH_USERPROFILE_SUCCESS)
                      // alert('loginaction'+JSON.stringify(response.user))
                      //console.log('action:userData:',response.user);
                      AuthUtility.setUser(response.user);
                        // ApiUtility.setToken(response.token);                          
                          var pathup = Config.API_URL+'/user/update';
                          ApiUtility.fetchAuthPost(pathup,{_id:response.user._id},function(response){
                          // ApiUtility.fetchAuthPost(pathup,{_id:response.user._id,fcm:fcmToken},function(response){
                          if(response.success){
                            console.log("updatedres:",response);
                              AuthUtility.setUser(response.user); 
                         
                         
                                
                          dispatch({
                            type: UPDATE_LOGIN_SUCCESS,
                            payload:  response.data
                          },()=>{navigation.navigate('HomePage');}); 

                                return;
                          // if(response.user.interest.length>0){
                          //   navigation.navigate('HomePage');
                             
                          //   }else{
                          //      navigation.navigate('InterestSelectPage');
                          //   }


                          }
                          else{
                              return  dispatch({
                                      type: UPDATE_LOGIN_ERROR,
                                      payload: {}
                                    }); 
                            }
                        },function(error){
                             return  dispatch({
                                type: UPDATE_LOGIN_ERROR,
                                payload: {}
                            }); 
                // alert(error);

                    });               
                          // navigation.navigate('HomePage');
                          
                         //  return  dispatch({
                         //    type: FETCH_LOGIN_SUCCESS,
                         //    payload:  response 
                         // },()=>{navigation.navigate('HomePage');}); 

                    });
                  });
                });
         
            
        
        });

      }
      else{
        // alert(response.message);
        alert(response.message);
        return  dispatch({
                type: FETCH_LOGIN_ERROR,
                payload: {}
              }); 
      }

    },function(error){
        return  dispatch({
                type: FETCH_LOGIN_ERROR,
                payload: {}
            }); 
        // alert('ERRORRRRR');

    });

  }
}


export function updateLoginData(path,bundle,navigation,profileupdate){
  return function(dispatch){
    dispatch({ 
          type: UPDATE_LOGIN_REQUEST,
          payload: { isLoading: true },
    });
      
      ApiUtility.fetchAuthPost(path,bundle,function(response){
            
            console.log("updated profile::",response);
               
              if(response.success){
                // alert(JSON.stringify(response))
                  AuthUtility.setUser(response.data); 
                   if(profileupdate!="update"){
                      alert('Thank you for selecting interest');
                       navigation.navigate('MatchPage');
                   } else{
                     navigation.navigate("ProfilePage");
                     // navigation.navigate("MatchPage",{listtype:"profile"});
                   }
                
                 

                  return  dispatch({
                  type: UPDATE_LOGIN_SUCCESS,
                  payload:  response.data,

                }); 
                
              }
              else{
                  return  dispatch({
                          type: UPDATE_LOGIN_ERROR,
                          payload: {}
                        }); 
                }
            },function(error){
                 return  dispatch({
                    type: UPDATE_LOGIN_ERROR,
                    payload: {}
                }); 
                alert(error);

      });
    }
}


export function restoreLoginData(){
  return function(dispatch){
    dispatch({ 
          type: RESTORE_LOGIN_REQUEST,
          payload: { isLoading: true },
    });
      
      var loginData;
        
          AuthUtility.getKey("expiretime",function(expiretime){
            AuthUtility.getKey("refreshtoken",function(refreshtoken){ 
              AuthUtility.getKey("userData",function(userData){
                AuthUtility.getToken(function(token){
                  // ApiUtility.setToken(token);
                  // alert('$$$'+refreshtoken)
                loginData={
                    "refreshtoken":refreshtoken,
                    'expiretime':expiretime,
                    'token':token,
                    'user':JSON.parse(userData),
                    'success':true
                  }
                        AuthUtility.setUser(loginData.user); 
                       console.log('action:restoreLoginData:',loginData.user);

                  return  dispatch({
                    type: RESTORE_LOGIN_SUCCESS,
                    payload:  loginData 
                  }); 
                });
            });
            // alert('refreshtoken'+refreshtoken);
          });
        });
      
    }
}

export function fetchUserProfile(path,bundle){
  return function(dispatch){
    dispatch({ 
          type: FETCH_USERPROFILE_REQUEST,
          payload: { isLoading: true },
    });
      
      // alert('loginaction:fetchUserProfile:'+JSON.stringify(bundle))
      ApiUtility.fetchAuthPost(path,bundle,function(response){
            // alert("$$$$$"+JSON.stringify(response.data));
            // //console.log("updated profile::",response.data[0]);
               
              if(response.success){

                  return  dispatch({
                  type: FETCH_USERPROFILE_SUCCESS,
                  payload:  response.data,

                }); 
                
              }
              else{
                  return  dispatch({
                          type: FETCH_USERPROFILE_ERROR,
                          payload: {}
                        }); 
                }
            },function(error){
                 return  dispatch({
                    type: FETCH_USERPROFILE_ERROR,
                    payload: {}
                }); 
                alert(error);

      });
    }
}
