import   {ScrollView,Alert,
} from 'react-native';
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

import Config from '../Config';

import { 

	
	FETCH_CHATROOMLISTING_SUCCESS, 
	FETCH_CHATROOMLISTING_REQUEST,
	FETCH_CHATROOMLISTING_ERROR,
 
  FETCH_CHATMESSAGELISTING_ERROR,
  FETCH_CHATMESSAGELISTING_SUCCESS,
  FETCH_CHATMESSAGELISTING_REQUEST,

  CREATE_CHATMESSAGE_ERROR,
  CREATE_CHATMESSAGE_REQUEST,
  CREATE_CHATMESSAGE_SUCCESS,

  UPDATE_CHATMESSAGE_ERROR,
  UPDATE_CHATMESSAGE_REQUEST,
  UPDATE_CHATMESSAGE_SUCCESS,

 

 } from '../constants/action-types';

export function fetchChatRoomList(path,bundle){ 
  return function(dispatch){
    
        dispatch({ 
          type: FETCH_CHATROOMLISTING_REQUEST,
          isLoading: true,
        });
  
    console.log('action:fetch-list::',path,bundle);
  // alert('bookmark'+bookmark)
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){

              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: FETCH_CHATROOMLISTING_SUCCESS,
                            list:response.data.data,
                            isLoading:false,
                        }); 
                  }
              }
              else{
                return  dispatch({
                        type: FETCH_CHATROOMLISTING_ERROR,
                        payload: null,

                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_CHATROOMLISTING_ERROR,
                        payload: null,
                    }); 

            });
      }
}
export function fetchNotifyList(path,bundle,pageNo,loadMore,refreshList){ 
  return function(dispatch){
    // if(refreshList){

    //   dispatch({ 
    //       type: REFRESH_COMMULISTING_REQUEST,
    //       isLoading: true,
    //       payload: null,
          
    //   });
  
    // }
    // else {
      dispatch({ 
          type: FETCH_NOTIFYLISTING_REQUEST,
          isLoading: true,
          payload: null,
          isFilter:false
          
      });
    // }
    console.log('action:fetch-list::',path,bundle,pageNo,loadMore);
  
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){

              // alert(JSON.stringify(bundle)+'   '+pageNo);
              // alert('action:PackageResponse'+JSON.stringify(response));
              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: FETCH_NOTIFYLISTING_SUCCESS,
                            payload:  response.data.data,
                            pageNo:pageNo+1,
                            content:bundle,
                            isLoading:false,
                            isFinished:false,
                            totalPage:response.data.data.totalPage,
                            isFilter:false
                        }); 
                  }
                  else{
                      return  dispatch({
                        type: FETCH_NOTIFYLISTING_SUCCESS,
                        payload:null,
                        pageNo:pageNo,
                        content:bundle,
                        isLoading:false,
                        isFinished:true,
                        totalPage:response.data.data.totalPage,
                        isFilter:false
                      }); 
                  }


              }
              else{
                return  dispatch({
                        type: FETCH_NOTIFYLISTING_ERROR,
                        payload: null,
                        isFilter:false
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_NOTIFYLISTING_ERROR,
                        payload: null,
                        isFilter:false
                    }); 

            });
  }
}



export function fetchChatMessageList(loginId,path,bundle, pageNo, loadMore, refreshList){ 
  return function(dispatch){
    
        dispatch({ 
          type: FETCH_CHATMESSAGELISTING_REQUEST,
          isLoading: true,
        });
  // alert()
    console.log('action:fetch-list::',path,bundle);
  // alert('bookmark'+bookmark)
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){

              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: FETCH_CHATMESSAGELISTING_SUCCESS,
                            chatmessagelist:response.data.data,
                            loginId:loginId,
                            pageNo:pageNo+1,
                            content: bundle,
                            isLoading:false,
                             isFinished:false,
                        }); 
                  }
              }
              else{
                return  dispatch({
                        type: FETCH_CHATMESSAGELISTING_ERROR,
                        chatmessagelist: null,
                          isFinished:false,
                           content:bundle,
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_CHATMESSAGELISTING_ERROR,
                        chatmessagelist: null,
                    }); 

            });
      }
}
export function createChatMessage(path,bundle,loginId){
  return function(dispatch){
    dispatch({ 
          type: CREATE_CHATMESSAGE_REQUEST,
          payload: { isLoading: true },
    });
    
    // console.log('action:add -addPackage-list::',path,bundle);

      var that =this;
        ApiUtility.fetchAuthPost(path,bundle,function(response){
          
            // alert('action:addPost'+JSON.stringify(response));
          if(response.success == false){
             CommonUtility.showToast(response.message);
             return;
          }
          else if(response.success) 
          {
              
                  console.log("postcreate::response:",response);
                  ApiUtility.fetchAuthPost( Config.API_URL+'/message/listing',{room:response.data.room},function(response){
                
                    console.log("postlist::response:",response);
                    if(response.success){
                      CommonUtility.showToast("Message created successfully.");
                      // navigation.navigate('HomePage',{data:'abc',renderpage:'postlist'});
                      
                            dispatch({
                                  type: CREATE_CHATMESSAGE_SUCCESS,
                                  createdmessage:  response.data.data,
                                    loginId:loginId, 
                            }); 
                         
                            

                            return  ;

                    }
                    else{
                      return  dispatch({
                              type: CREATE_CHATMESSAGE_ERROR,
                              payload: null
                            }); 
                    }


                  },function(error){
                      return  dispatch({
                              type: CREATE_CHATMESSAGE_ERROR,
                              payload: null
                          }); 
                      // alert('ERRORRRRR');

                  });

             
                              
          } 
            else{
              alert(response.message)
                return  dispatch({
                        type: CREATE_CHATMESSAGE_ERROR,
                        payload: null
                      }); 
              }   
                
        },function(error){
            return  dispatch({
                       type: CREATE_CHATMESSAGE_ERROR,
                       payload: null
                   }); 
       });
    }
}


// export function createChatMessage(path,bundle){ 
//   return function(dispatch){
    
//         dispatch({ 
//           type: CREATE_CHATMESSAGE_REQUEST,
//           isLoading: true,
//         });
  
//     console.log('action:fetch-list::',path,bundle);
//   // alert('bookmark'+bookmark)
//     // alert('action:PackageResponse::'+JSON.stringify(bundle));
//     // var that=this;
//             fetchAuthPost(path,bundle,function(response){

//               if(response.success){
//                 console.log("dsdd",response.data);
//                         return  dispatch({
//                             type: CREATE_CHATMESSAGE_SUCCESS,
//                             createdmessage:null,
//                             createdmessage:response.data,
//                             isLoading:false,
//                         }); 
//               }
//               else{
//                 return  dispatch({
//                         type: CREATE_CHATMESSAGE_ERROR,
//                         payload: null,

//                       }); 
//               }

//             },function(error){
//                 return  dispatch({
//                         type: CREATE_CHATMESSAGE_ERROR,
//                         payload: null,
//                     }); 

//             });
//       }
// }


export function updateChatRoom(path,bundle,login_id){ 
  return function(dispatch){
    
        dispatch({ 
          type: UPDATE_CHATMESSAGE_REQUEST,
          isLoading: true,
        });
  // alert()
    console.log('action:fetch-list::',path,bundle);
  // alert('bookmark'+bookmark)
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
    // var that=this;
            fetchAuthPost(path,bundle,function(response){

              if(response.success){
                // alert(JSON.stringify(response.data))
                        
                  var path2 = Config.API_URL+'/chatroom/listing';
                  fetchAuthPost(path2,{_id:response.data._id,fromuser:login_id},function(response){

                        if(response.success){
                          if(response.data.data.length > 0){

                               return  dispatch({
                                  type: UPDATE_CHATMESSAGE_SUCCESS,
                                  updatedChatroom:response.data.data[0],
                                  isLoading:false,
                              }); 

                          }
                        }
                      },function(error){
                      return  dispatch({
                              type: UPDATE_CHATMESSAGE_ERROR,
                              payload: null,
                          }); 

                  });

              }
              else{
                return  dispatch({
                        type: UPDATE_CHATMESSAGE_ERROR,
                        payload: null,

                      }); 
              }

            },function(error){
                return  dispatch({
                        type: UPDATE_CHATMESSAGE_ERROR,
                        payload: null,
                    }); 

            });
      }
}

