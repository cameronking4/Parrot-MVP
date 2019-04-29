import   {ScrollView,Alert,
} from 'react-native';
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

import Config from '../Config';

import { 
	
	FETCH_USERLISTING_SUCCESS, 
	FETCH_USERLISTING_REQUEST,
	FETCH_USERLISTING_ERROR, 

 } from '../constants/action-types';

export function searchUserList(path,bundle){ 
  return function(dispatch){

        dispatch({ 
          type: FETCH_USERLISTING_REQUEST,
          isLoading: true,
        
      });  
      
    console.log('action:fetch-list::',path,bundle);
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){
              // alert('action:userResponse'+JSON.stringify(response));

              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: FETCH_USERLISTING_SUCCESS,
                            payload:  response.data.data,
                            
                        }); 
                  }
                  else{
                      return  dispatch({
                        type: FETCH_USERLISTING_SUCCESS,
                        payload:null,
                        // content:bundle,
                        isLoading:false,
                       
                      }); 
                  }


              }
              else{
                return  dispatch({
                        type: FETCH_USERLISTING_ERROR,
                        payload: null,
                        isFilter:false
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_USERLISTING_ERROR,
                        payload: null,
                        isFilter:false
                    }); 

            });
  }
}

