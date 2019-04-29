import ApiUtility, {
  fetchPost,
  fetchAuthPost
} from "../reducer/lib/ApiUtility";
import AuthUtility from "../reducer/lib/AuthUtility";
import CommonUtility from "../reducer/lib/CommonUtility";

import Config from "../Config";

import {
  FETCH_NOTIFYLISTING_SUCCESS,
  FETCH_NOTIFYLISTING_REQUEST,
  FETCH_NOTIFYLISTING_ERROR,
  FETCH_NOTIFYLISTUPDATE_SUCCESS,
  FETCH_NOTIFYLISTUPDATE_REQUEST,
  FETCH_NOTIFYLISTUPDATE_ERROR,
  RESET_NOTIFYLISTING,

  UPDATE_ROOMREAD_ERROR,
  UPDATE_ROOMREAD_SUCCESS,
  UPDATE_ROOMREAD_REQUEST
} from "../constants/action-types";

export function fetchNotifyList(path, bundle, pageNo, loadMore, refreshList) {
  return function(dispatch) {
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
      isFilter: false
    });
    // }
    console.log("action:fetch-list::", path, bundle, pageNo, loadMore);

    // alert('action:PackageResponse::'+JSON.stringify(bundle) + pageNo + loadMore);
    fetchAuthPost(
      path,
      bundle,
      function(response) {
        // alert(JSON.stringify(bundle));
        // alert('action:PackageResponse'+JSON.stringify(response));
        if (response.success) {
          
          if (response.data.data.length > 0) {
            // alert('hi')
            return dispatch({
              type: FETCH_NOTIFYLISTING_SUCCESS,
              payload: response.data.data,
              pageNo: pageNo + 1,
              content: bundle,
              isLoading: false,
              isFinished: false,
              totalPage: response.data.data.totalPage,
              isFilter: false
            });
          } else {
            return dispatch({
              type: FETCH_NOTIFYLISTING_SUCCESS,
              payload: null,
              pageNo: pageNo,
              content: bundle,
              isLoading: false,
              isFinished: true,
              totalPage: response.data.data.totalPage,
              isFilter: false
            });
          }
        } else {
          return dispatch({
            type: FETCH_NOTIFYLISTING_ERROR,
            payload: null,
            isFilter: false
          });
        }
      },
      function(error) {
        return dispatch({
          type: FETCH_NOTIFYLISTING_ERROR,
          payload: null,
          isFilter: false
        });
      }
    );
  };
}

export function updateForFriendRequest(response, user) {
  return function(dispatch) {
    dispatch({
      type: FETCH_NOTIFYLISTUPDATE_REQUEST,
      payload: { isLoading: true }
    });

    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);

    var that = this;

    fetchAuthPost(
      Config.API_URL + "/notification/listing",
      { friendrequest: response.data._id, user: user },
      function(response) {
        //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
        if (response.success && response.data.data.length > 0) {
          // alert(JSON.stringify(response))
          return dispatch({
            type: FETCH_NOTIFYLISTUPDATE_SUCCESS,
            payload: response.data.data[0]
          });
        } else {
          return dispatch({
            type: FETCH_NOTIFYLISTUPDATE_ERROR,
            payload: null
          });
        }
      },
      function(error) {
        return dispatch({
          type: FETCH_NOTIFYLISTUPDATE_ERROR,
          payload: null
        });
        // alert('ERRORRRRR');
      }
    );
  };
}

export function updateForDeniedRequest(notiId) {
  return function(dispatch) {
    dispatch({
      type: FETCH_NOTIFYLISTUPDATE_REQUEST,
      payload: { isLoading: true }
    });

    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);

    var that = this;

    fetchAuthPost(
      Config.API_URL + "/notification/listing",
      { _id: notiId },
      function(response) {
        // alert(notiId);
        //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
        if (response.success && response.data.data.length > 0) {
          // alert(JSON.stringify(response))
          return dispatch({
            type: FETCH_NOTIFYLISTUPDATE_SUCCESS,
            payload: response.data.data[0]
          });
        } else {
          return dispatch({
            type: FETCH_NOTIFYLISTUPDATE_ERROR,
            payload: null
          });
        }
      },
      function(error) {
        return dispatch({
          type: FETCH_NOTIFYLISTUPDATE_ERROR,
          payload: null
        });
        // alert('ERRORRRRR');
      }
    );
  };
}

export function resetNotifyList() {
  return function(dispatch) {
    dispatch({
      type: RESET_NOTIFYLISTING,
      payload: { isLoading: true }
    });
  };
}


export function updateForUnread(path,bundle){
  return function(dispatch){
    dispatch({ 
          type: UPDATE_ROOMREAD_REQUEST,
          payload: { isLoading: true },
    });
    
    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that =this;
            
        fetchAuthPost( path,bundle,function(response){

              //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
              if(response.success){
                  // alert(JSON.stringify(response))
                      return  dispatch({
                            type: UPDATE_ROOMREAD_SUCCESS,
                            payload:  response.data 
                      }); 

              }
              else{
                return  dispatch({
                        type: UPDATE_ROOMREAD_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: UPDATE_ROOMREAD_ERROR,
                        payload: null
                    }); 
                // alert('ERRORRRRR');

            });
  }        
}


// export function fetchSearchCommuList(path,bundle){
//   return function(dispatch){
//     dispatch({
//           type: SEARCH_GROUPLISTING_REQUEST,
//           isLoading: true,
//           payload: null,
//           isFilter:false

//       });
//    console.log('action:searchStoreList-list::',path,bundle);

//     // alert('action:PackageResponse::'+JSON.stringify(bundle));
//             fetchAuthPost(path,bundle,function(response){

//               // alert(JSON.stringify(bundle)+'   '+pageNo);
//               // alert('action:PackageResponse'+JSON.stringify(response.data.data));
//               if(response.success){
//                   if(response.data.data.length > 0){
//                         return  dispatch({
//                             type: SEARCH_GROUPLISTING_SUCCESS,
//                             payload:  response.data.data,
//                             isLoading:false,
//                             isFinished:false,
//                             // isFilter:false
//                         });
//                   }else{
//                     return  dispatch({
//                       type: SEARCH_GROUPLISTING_SUCCESS,
//                       content:bundle,
//                       isLoading:false,
//                       isFinished:true, //is require for fetch api repetedly calls issue solve
//                     });
//                   }
//               }
//               else{
//                 return  dispatch({
//                         type: SEARCH_GROUPLISTING_ERROR,
//                         payload: null,
//                         isFilter:false
//                       });
//               }

//             },function(error){
//                 return  dispatch({
//                         type: SEARCH_GROUPLISTING_ERROR,
//                         payload: null,
//                         // isFilter:false
//                     });

//             });
//   }
// }

