
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

import { 
	
	FETCH_FAVADD_SUCCESS,
  FETCH_FAVADD_REQUEST,
  FETCH_FAVADD_ERROR,
  FETCH_FAVLISTING_SUCCESS, 
  FETCH_FAVLISTING_REQUEST,
  FETCH_FAVLISTING_ERROR,
  FETCH_POSTFAVUPDATE_ERROR,

 } from '../constants/action-types';

export function fetchFavCreate(path,bundle,profilePostAction,postAction,isDetail,postDetailAction){
  return function(dispatch){
    dispatch({ 
    			type: FETCH_FAVADD_REQUEST,
    			payload: { isLoading: true },
    });
    
            fetchAuthPost(path,bundle,function(response){
              // alert(JSON.stringify(response))
              if(response.success){
                CommonUtility.showToast(response.message);
                  postAction.updateForFavorite(response);
                  profilePostAction.updateForFavorite(response);
                  
                  if(isDetail == true)
                      postDetailAction.updateDetailForFavorite(response);

                      dispatch({
                            type: FETCH_FAVADD_SUCCESS,
                            payload:  response 
                      }); 

                    return;
              }
              else{
                dispatch({
                        type: FETCH_POSTFAVUPDATE_ERROR,
                        payload: {}
                      });
                
                dispatch({
                        type: FETCH_FAVADD_ERROR,
                        payload: {}
                      }); 
                
                return;
              }

            },function(error){
                  dispatch({
                        type: FETCH_POSTFAVUPDATE_ERROR,
                        payload: {}
                      });

                  dispatch({
                        type: FETCH_FAVADD_ERROR,
                        payload: {}
                    }); 
                // alert('ERRORRRRR');
                return;
            });
    // });
  }
}
