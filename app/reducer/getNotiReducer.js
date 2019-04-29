// @flow

import {
  FETCH_GETNOTILISTING_SUCCESS,
  FETCH_GETNOTILISTING_REQUEST,
  FETCH_GETNOTILISTING_ERROR,
  
    // FETCH_FILTERPOSTLISTING_SUCCESS,
    // FETCH_FILTERPOSTLISTING_REQUEST,
    // FETCH_FILTERPOSTLISTING_ERROR,
    
   REFRESH_GETNOTILISTING_REQUEST,
  
    // SEARCH_POSTLISTING_REQUEST,
    // SEARCH_POSTLISTING_ERROR,
    // SEARCH_POSTLISTING_SUCCESS,
    
    // FETCH_COMMENTADD_SUCCESS,
    // FETCH_COMMENTADDD_REQUEST,
    // FETCH_COMMENTADD_ERROR,
  
    // FETCH_POSTDELETE_ERROR,
    // FETCH_POSTDELETE_REQUEST,
    // FETCH_POSTDELETE_SUCCESS,
  
    // FETCH_POSTUPDATE_ERROR,
    // FETCH_POSTUPDATE_REQUEST,
    // FETCH_POSTUPDATE_SUCCESS,
  
    // FETCH_POSTFAVUPDATE_ERROR,
    // FETCH_POSTFAVUPDATE_SUCCESS,
    // FETCH_POSTFAVUPDATE_REQUEST,

    // FETCH_COMMENTRESET_SUCCESS,
    // FETCH_POSTCOMMENTRESET_SUCCESS,
  // nidhi
  } from '../constants/action-types';
  
  import ApiUtility from '../reducer/lib/ApiUtility';
  import AuthUtility from '../reducer/lib/AuthUtility';
  import CommonUtility from '../reducer/lib/CommonUtility';
  
  const initialState = {
    getNotificationList: null,
    filtercommentList: null,
    searchPostList:null,
  
    isLoading: false,
    error: false,
  
    content:null,
    pageNo:0,
    totalPage:0,
    isFinished:false,
    isFilter:false,
  
    deleted:false,
    faverror:null,
  };
  
  export const getPostSelector = (state: Object) => ({ ...state.post });
  
  const getNotiReducer = (state: Object = initialState, action: Object) => {
  //
    // alert('packageReducer::'+action.isLoading);
  
    switch (action.type) {
    // case FETCH_COMMENTRESET_SUCCESS:{
    //     return{
    //       pageNo:0,
    // commentList: null,
    // filtercommentList: null,
    // searchPostList:null,
  
    // isLoading: false,
    // error: false,
  
    // content:null,
    // pageNo:0,
    // totalPage:0,
    // isFinished:false,
    // isFilter:false,
  
    // deleted:false,
    // faverror:null,
    //     };
    //   }
      case FETCH_GETNOTILISTING_SUCCESS: {
          var getNotificationList = state.getNotificationList;
        // alert('list'+state.pageNo);
          // alert(JSON.stringify(action.payload));
          // alert('postlist:'+JSON.stringify(state.commentList)+'##'+JSON.stringify(action.payload))
        // console.log('prevStatepkglist:',state,commentList);
          if(action.payload !== null && getNotificationList !== null)
              var list=getNotificationList.concat(action.payload);
          else if(action.payload == null && getNotificationList !== null)
              var list=getNotificationList;
          // else if(action.payload != null && commentList != null && pageNo == 0)
          //     var list=commentList;
          else
              var list=action.payload;
        // alert('commentList'+JSON.stringify(list));
  
        return {
          getNotificationList: list,
          content:action.content,
          pageNo:action.pageNo,
          totalPage:action.totalPage,
          isFinished:action.isFinished,
          isLoading: false,
          error: false,
          deleted:false,
          isFilter:action.isFilter,
        };
      }
  
      case FETCH_GETNOTILISTING_REQUEST: {
        return {
          ...state,
          isLoading: true,
          error: false,
         
        };
      }
  
      case FETCH_GETNOTILISTING_ERROR: {
        return {
          // ...state,
          isLoading: false,
          error: true,
          commentList: null
          
        };
      }
  
  //     case FETCH_FILTERPOSTLISTING_SUCCESS: {
  //         var filtercommentList = state.filtercommentList;
  //         var list=null;
  //       // console.log('prevStatepkglist:',state,commentList);
  //         if(action.payload != null && filtercommentList != null && state.isFilter && action.pageNo == 1){
  //            list=action.payload;
  //         }
  //         else if(action.payload != null && filtercommentList != null && state.isFilter){
  //                     // alert('**if'+JSON.stringify(action.payload));
  //             list=filtercommentList.concat(action.payload);
  //         }
  
  //         else if(action.payload == null && filtercommentList != null && state.isFilter){
  //             // alert('**else'+JSON.stringify(action.payload)+JSON.stringify(state.filtercommentList));
  //             list=filtercommentList;
  //         }
  //         else
  //            list=action.payload;
  //       // alert('filtercommentList'+JSON.stringify(list));
  
  //       return {
  //         ...state,
  //         filtercommentList:list,
  //         content:action.content,
  //         pageNo:action.pageNo,
  //         totalPage:action.totalPage,
  //         isFinished:action.isFinished,
  //         isLoading: false,
  //         error: false,
  //         isFilter:true,
  //         deleted:false
  
  //       };
  //     }
  
    
  //     case FETCH_FILTERPOSTLISTING_REQUEST: {
  //       return {
  //         ...state,
  //         isLoading: true,
  //         error: false,
  //         isFilter:true,
  //       };
  //     }
  
  //     case FETCH_FILTERPOSTLISTING_ERROR: {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: true,
  //         isFilter:true,
  //         filtercommentList: null,
  //         content:action.content
          
  //       };
  //     }    
  
      case REFRESH_GETNOTILISTING_REQUEST: {
        return {
          REFRESH_GETNOTILISTING_REQUEST:null,
          content:action.content,
          pageNo:0,
          totalPage:action.totalPage,
          isFinished:false,
          isLoading: false,
          error: false,
          filtercommentList: null,
          isFilter:state.isFilter,
          deleted:false
  
        };
      }
  
  //     case SEARCH_POSTLISTING_SUCCESS: {
          
  //         // alert(action.payload)
  //       return {
  //         ...state,
  //         searchPostList: action.payload,
  //         // commentList : state.commentList, //add this line otherwise main postlist will become null
  //         // isFinished:action.isFinished,
  //         isLoading: false,
  //         error: false,
  //       };
  //     }
  
  //     case SEARCH_POSTLISTING_REQUEST: {
  //       return {
  //        ...state,
  //         isLoading: false,
  //         error: false,
         
  //       };
  //     }
  
  //     case SEARCH_POSTLISTING_ERROR: {
  //       return {
  //         // ...state,
  //         isLoading: false,
  //         error: true,
  //         commentList: null
          
  //       };
  //     }
  
  //     case   FETCH_COMMENTADD_SUCCESS: {
  
  //       var commentList = state.commentList;
  //       // alert('add'+state.pageNo);
  //       //    // console.log("create-",action.payload,state.commentList,commentList);
  //          var list;
  //         if(commentList == null && action.payload!=null){
  //             list=action.payload
  //          }
  //          else if(commentList!=null && state.commentList != undefined && action.payload!=null){
  //            list=(action.payload).concat(state.commentList);
  //          }
  
  //       //    alert(JSON.stringify(state.commentList))
  //       return {
  //         ...state,
  //         isLoading: false,
  //         isFinished:true,
  //         error: false,
  //         commentList: list,
  //         // pageNo:0,
  //       };
  //     }
  
  //     case FETCH_COMMENTADDD_REQUEST: {
  //       return {
  //        ...state,
  //         isLoading: true,
  //         error: false,
  //         // commentList: state.commentList,
  //         // pageNo:0,
         
  //       };
  //     }
  
  //     case FETCH_COMMENTADD_ERROR: {
  //       return {
  //         // ...state,
  //         isLoading: false,
  //         error: true,
  //         // commentList: null
          
  //       };
  //     }
  
  //     case FETCH_POSTDELETE_SUCCESS: {
  //       return {
  //         isLoading: false,
  //         error: false,
  //         commentList: action.payload,
  //         deleted:true
  //       };
  //     }
  //     case FETCH_POSTDELETE_REQUEST: {
  //       return {
  //         isLoading: true,
  //         error: false,
  //        ...state
  //       };
  //     }
  
  //     case FETCH_POSTDELETE_ERROR: {
  //       return {
  //         // ...state,
  //         isLoading: false,
  //         error: true,
  //         commentList: null
          
  //       };searchPostList
  //     }
  
  //     case FETCH_POSTUPDATE_SUCCESS: {
  //       // var commentList = state.commentList;
  
  //       // alert(JSON.stringify(state.commentList));      
  //       var tmpdataSource=state.commentList;
  //       var list=null;
  
  //       for (var i = 0;i < state.commentList.length ;i++) {
  //         if(state.commentList[i]['_id'] == action.payload._id)
  //         {
  //             tmpdataSource.splice(i,1);
  //             var list=tmpdataSource.concat(action.payload);      
  //             CommonUtility.showToast('post updated successfully');
  //         }
      
  //       }
  
  //       return {
  //        ...state,// to set perfect pagination
  //         isLoading: false,
  //         error: false,
  //         commentList: list,
  //         pageNo:0, // to set perfect pagination
  //       };
  //     }
  
  //     case FETCH_POSTUPDATE_REQUEST: {
  //       return {
  //        ...state,// to set perfect pagination
  //         isLoading: true,
  //         error: false,
         
  //       };
  //     }
  
  //     case FETCH_POSTUPDATE_ERROR: {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: true,
          
  //       };
  //     }
  
  //     case FETCH_POSTFAVUPDATE_REQUEST: {
  //       return {
  //         ...state,
  //         isLoading: true,
  //         error: false,
          
  //       };
  //     }
  
  //     case FETCH_POSTFAVUPDATE_SUCCESS: {
  //       var tmpdataSource=state.commentList;
  //       var list=null;
  
  //           var j = CommonUtility.getIndexOfCompareObjArr(action.payload,"_id",state.commentList,"_id");
  //           if(j>-1){
  //             // alert(j)
              
  //             tmpdataSource[j].externalFavorite=action.payload.externalFavorite;      
  //             list=tmpdataSource;
              
  //           }
  
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: false,
  //         commentList: list,
  //       };
  //     }
  
  //     case FETCH_POSTFAVUPDATE_ERROR: {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: true,
  //         faverror:true
  //       };
  //     }
  // // nidhi
  //   case FETCH_POSTCOMMENTRESET_SUCCESS:{
  //     return{
  //     commentList: null,
  //   filtercommentList: null,
  //   searchPostList:null,
  
  //   isLoading: false,
  //   error: false,
  
  //   content:null,
  //   pageNo:0,
  //   totalPage:0,
  //   isFinished:false,
  //   isFilter:false,
  
  //   deleted:false,
  //   faverror:null,
  //   };
  // }
      default: {
        return state;
      }
    }
  };
  
  export default getNotiReducer;