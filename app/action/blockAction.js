
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

import { 
	
	FETCH_BLOCKUSERPOST_SUCCESS,
  FETCH_BLOCKUSERPOST_REQUEST,
  FETCH_BLOCKUSERPOST_ERROR,
  
 } from '../constants/action-types';

export function fetchBlockrequestCreate(path,bundle,postAction){
  return function(dispatch){
    dispatch({ 
    			type: FETCH_BLOCKUSERPOST_REQUEST,
    			payload: { isLoading: true },
    });
    
            fetchAuthPost(path,bundle,function(response){
              // alert(JSON.stringify(response))
              if(response.success){
                CommonUtility.showToast(response.message);
    
                      return  dispatch({
                            type: FETCH_BLOCKUSERPOST_SUCCESS,
                            payload:  response 
                      }); 

              }
              else{
                
                dispatch({
                        type: FETCH_BLOCKUSERPOST_ERROR,
                        payload: {}
                      }); 
                
                return;
              }

            },function(error){
                 
                  dispatch({
                        type: FETCH_BLOCKUSERPOST_ERROR,
                        payload: {}
                    }); 
                // alert('ERRORRRRR');
                return;
            });
    // });
  }
}


