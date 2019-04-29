
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';

import Config from '../Config';

import { 
	
	FETCH_POSTDETAIL_SUCCESS,
	FETCH_POSTDETAIL_REQUEST,
	FETCH_POSTDETAIL_ERROR,

  FETCH_POSTDETAILFAVUPDATE_REQUEST,
  FETCH_POSTDETAILFAVUPDATE_SUCCESS,
  FETCH_POSTDETAILFAVUPDATE_ERROR,

  FETCH_POSTDETAILBOOKMARKUPDATE_SUCCESS,
  FETCH_POSTDETAILBOOKMARKUPDATE_ERROR,
  FETCH_POSTDETAILBOOKMARKUPDATE_REQUEST,


 } from '../constants/action-types';

export function fetchPostDetail(path,bundle){
  return function(dispatch){
    dispatch({ 
    			type: FETCH_POSTDETAIL_REQUEST,
    			payload: { isLoading: true },
          
    });
    
    console.log('action:fetch-detail::',path,bundle);
    
            fetchAuthPost(path,bundle,function(response){

              // alert('response'+JSON.stringify(response));
              console.log('action:PostDetailResponse',response);
              if(response.success){

                      return  dispatch({
                            type: FETCH_POSTDETAIL_SUCCESS,
                            payload:  response.data.data[0]

                      }); 

              }
              else{
                return  dispatch({
                        type: FETCH_POSTDETAIL_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_POSTDETAIL_ERROR,
                        payload: null
                    }); 
            });
  }
}



export function updateDetailForFavorite(response){
  return function(dispatch){
    dispatch({ 
          type: FETCH_POSTDETAILFAVUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that =this;
            
        fetchAuthPost( Config.API_URL+'/post/listing',{_id:response.data.post},function(response){


              //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
              if(response.success && response.data.data.length > 0){
                  // alert(JSON.stringify(response))
                      return  dispatch({
                            type: FETCH_POSTDETAILFAVUPDATE_SUCCESS,
                            payload:  response.data.data[0] 
                      }); 

              }
              else{
                return  dispatch({
                        type: FETCH_POSTDETAILFAVUPDATE_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_POSTDETAILFAVUPDATE_ERROR,
                        payload: null
                    }); 
                // alert('ERRORRRRR');

            });
  }        
}


export function updateDetailForBookmark(response){
  return function(dispatch){
    dispatch({ 
          type: FETCH_POSTDETAILBOOKMARKUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that =this;
            
        fetchAuthPost( Config.API_URL+'/post/listing',{_id:response.data.post},function(response){


              //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
              if(response.success && response.data.data.length > 0){
                  // alert(JSON.stringify(response))
                      return  dispatch({
                            type: FETCH_POSTDETAILBOOKMARKUPDATE_SUCCESS,
                            payload:  response.data.data[0] 
                      }); 

              }
              else{
                return  dispatch({
                        type: FETCH_POSTDETAILBOOKMARKUPDATE_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_POSTDETAILBOOKMARKUPDATE_ERROR,
                        payload: null
                    }); 
                // alert('ERRORRRRR');

            });
  }        
}


