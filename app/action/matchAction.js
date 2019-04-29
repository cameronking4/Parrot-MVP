import   {ScrollView,Alert,
} from 'react-native';
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

import Config from '../Config';

import { 
	
	FETCH_MATCHLISTING_SUCCESS, 
	FETCH_MATCHLISTING_REQUEST,
	FETCH_MATCHLISTING_ERROR, 

  FETCH_MATCHUPDATE_SUCCESS,
  FETCH_MATCHUPDATE_ERROR,
  FETCH_MATCHUPDATE_REQUEST,

  FETCH_MATCHDELETE_SUCCESS,
  FETCH_MATCHDELETE_ERROR,
  FETCH_MATCHDELETE_REQUEST,


 } from '../constants/action-types';

export function fetchMatchList(path,bundle){ 
  return function(dispatch){

        dispatch({ 
          type: FETCH_MATCHLISTING_REQUEST,
          isLoading: true,
          
      });  
      
    console.log('action:fetch-list::',path,bundle);
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){
              // alert('action:matchResponse'+JSON.stringify(response));

              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: FETCH_MATCHLISTING_SUCCESS,
                            payload:  response.data.data,
                            
                        }); 
                  }
                  else{
                      return  dispatch({
                        type: FETCH_MATCHLISTING_SUCCESS,
                        payload:null,
                        // content:bundle,
                        isLoading:false,
                       
                      }); 
                  }


              }
              else{
                return  dispatch({
                        type: FETCH_MATCHLISTING_ERROR,
                        payload: null,
                        isFilter:false
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_MATCHLISTING_ERROR,
                        payload: null,
                        isFilter:false
                    }); 

            });
  }
}


export function fetchMatchUpdate(path,bundle,followpath,followbunch,matchProfile,matchAction){
  // alert("update");
  return function(dispatch){
    dispatch({ 
          type: FETCH_MATCHUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    console.log('action:UPDATE -UPDATEmatch-list::',path,bundle);
    

      var that =this;
        ApiUtility.fetchAuthPost(path,bundle,function(response1){
          
          // alert(JSON.stringify(response1))
          if(response1.success)
          {
              
              ApiUtility.fetchAuthPost(followpath,followbunch,function(response2){


                if(response2.success)
                { 
          

                CommonUtility.showToast(response1.message); 

          // alert("UPDATE::response:"+JSON.stringify(response1.data._id));
                       if(matchProfile == 'matchProfile'){


                          AuthUtility.getUserField("_id", function(loginid) {
                            // alert()
                            var bunch = {
                              reqSorce: "mobile",
                              status: "pending",
                              user: loginid
                            };

                            var path = Config.API_URL + "/match/listing";
                            matchAction.fetchMatchList(path, bunch);
                          });
                        }
                        dispatch({
                            type: FETCH_MATCHUPDATE_SUCCESS,
                            // payload:  response1.data 
                        }); 
                
                }


              },function(error){
                  return  dispatch({
                             type: FETCH_MATCHUPDATE_ERROR,
                             payload: null
                         }); 
             });

                        
          }
          else{
              CommonUtility.showToast(response1.message); 
            return  dispatch({
                    type: FETCH_MATCHUPDATE_ERROR,
                    payload: null
                  }); 
          }
                
        },function(error){
            return  dispatch({
                       type: FETCH_MATCHUPDATE_ERROR,
                       payload: null
                   }); 
       });
    }
}


export function fetchMatchDelete(path,bundle){
  // alert("update");
  return function(dispatch){
    dispatch({ 
          type: FETCH_MATCHDELETE_REQUEST,
          payload: { isLoading: true },
    });
    
    console.log('action:UPDATE -UPDATEmatch-list::',path,bundle);
    

      var that =this;
        ApiUtility.fetchAuthPost(path,bundle,function(response1){
          
          // alert(JSON.stringify(response1))
          if(response1.success)
          {
              
              CommonUtility.showToast(response1.message); 

          // alert("UPDATE::response:"+JSON.stringify(response1.data._id));

                        dispatch({
                            type: FETCH_MATCHDELETE_SUCCESS,
                            // payload:  response1.data 
                        }); 
                        
              }
              else{
                return  dispatch({
                        type: FETCH_MATCHDELETE_ERROR,
                        payload: null
                      }); 
              }
                
        },function(error){
            return  dispatch({
                       type: FETCH_MATCHDELETE_ERROR,
                       payload: null
                   }); 
       });
    }
}
