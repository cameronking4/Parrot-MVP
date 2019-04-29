import   {ScrollView,Alert,
} from 'react-native';
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

import Config from '../Config';

import { 

  // FETCH_MATCHUSERPOSTLISTDETAIL_SUCCESS,
	
	FETCH_MATCHUSERPOSTLISTLISTING_SUCCESS, 
	FETCH_MATCHUSERPOSTLISTLISTING_REQUEST,
	FETCH_MATCHUSERPOSTLISTLISTING_ERROR,

  REFRESH_MATCHUSERPOSTLISTLISTING_REQUEST,

  FETCH_MATCHUSERPOSTLISTADD_SUCCESS,
  FETCH_MATCHUSERPOSTLISTADD_REQUEST,
  FETCH_MATCHUSERPOSTLISTADD_ERROR,

  FETCH_MATCHUSERPOSTLISTUPDATE_SUCCESS,
  FETCH_MATCHUSERPOSTLISTUPDATE_REQUEST,
  FETCH_MATCHUSERPOSTLISTUPDATE_ERROR,

  FETCH_MATCHUSERPOSTLISTFAVUPDATE_ERROR,
  FETCH_MATCHUSERPOSTLISTFAVUPDATE_REQUEST,
  FETCH_MATCHUSERPOSTLISTFAVUPDATE_SUCCESS,

 

 } from '../constants/action-types';

export function fetchMatchUserPostList(path,bundle,pageNo,loadMore,refreshList,bookmark){ 
  return function(dispatch){
    if(refreshList){

      dispatch({ 
          type: REFRESH_MATCHUSERPOSTLISTLISTING_REQUEST,
          isLoading: true,
          payload: null,
          
      });
  
    }
    else {
      if(bundle.pageNo == 0){
        dispatch({ 
          type: FETCH_MATCHUSERPOSTLISTLISTING_REQUEST,
          isLoading: true,
          payload: 'reset',
          isFilter:false
          
        });
      }
      else{
        dispatch({ 
          type: FETCH_MATCHUSERPOSTLISTLISTING_REQUEST,
          isLoading: true,
          payload: null,
          isFilter:false
          
      });  
      }
      
    }
    console.log('action:fetch-list::',path,bundle,pageNo,loadMore);
  // alert('bookmark'+bookmark)
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){

              // alert(JSON.stringify(bundle)+'   '+pageNo);
              // alert('action:PackageResponse'+JSON.stringify(response));
              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: FETCH_MATCHUSERPOSTLISTLISTING_SUCCESS,
                            payload:  response.data.data,
                            pageNo:pageNo+1,
                            content:bundle,
                            isLoading:false,
                            isFinished:false,
                            totalPage:response.data.data.totalPage ,
                            isFilter:false,
                            bookmarkFinish:bookmark=='bookmark'?true:false,
                            myprofileFinish:bookmark=='myprofile'?true:false,
                            listtype:bundle.listtype,
                        }); 
                  }
                  else{
                      return  dispatch({
                        type: FETCH_MATCHUSERPOSTLISTLISTING_SUCCESS,
                        payload:null,
                        pageNo:pageNo,
                        content:bundle,
                        isLoading:false,
                        isFinished:(bookmark=='bookmark' || bookmark=='myprofile')?false:true,
                        bookmarkFinish:bookmark=='bookmark'?true:false,
                        myprofileFinish:bookmark=='myprofile'?true:false,
                        totalPage:response.data.data.totalPage ,
                        isFilter:false,
                        listtype:bundle.listtype,
                      }); 
                  }


              }
              else{
                return  dispatch({
                        type: FETCH_MATCHUSERPOSTLISTLISTING_ERROR,
                        payload: null,
                        isFilter:false
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_MATCHUSERPOSTLISTLISTING_ERROR,
                        payload: null,
                        isFilter:false
                    }); 

            });
  }
}

export function updateForFavorite(response){
  return function(dispatch){
    dispatch({ 
          type: FETCH_MATCHUSERPOSTLISTFAVUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that =this;
            
        fetchAuthPost( Config.API_URL+'/post/listing',{_id:response.data.post},function(response){


              //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
              if(response.success && response.data.data.length > 0){
                  // alert(JSON.stringify(response))
                      return  dispatch({
                            type: FETCH_MATCHUSERPOSTLISTFAVUPDATE_SUCCESS,
                            payload:  response.data.data[0] 
                      }); 

              }
              else{
                return  dispatch({
                        type: FETCH_MATCHUSERPOSTLISTFAVUPDATE_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_MATCHUSERPOSTLISTFAVUPDATE_ERROR,
                        payload: null
                    }); 
                // alert('ERRORRRRR');

            });
  }        
}


export function updateForBookmark(response){
  return function(dispatch){
    dispatch({ 
          type: FETCH_MATCHUSERPOSTLISTBOOKMARKUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that =this;
            
        fetchAuthPost( Config.API_URL+'/post/listing',{_id:response.data.post},function(response){


              //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
              if(response.success && response.data.data.length > 0){
                  // alert(JSON.stringify(response))
                      return  dispatch({
                            type: FETCH_MATCHUSERPOSTLISTBOOKMARKUPDATE_SUCCESS,
                            payload:  response.data.data[0] 
                      }); 

              }
              else{
                return  dispatch({
                        type: FETCH_MATCHUSERPOSTLISTBOOKMARKUPDATE_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_MATCHUSERPOSTLISTBOOKMARKUPDATE_ERROR,
                        payload: null
                    }); 
                // alert('ERRORRRRR');

            });
  }        
}
