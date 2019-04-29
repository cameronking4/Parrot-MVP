// @flow

import {
  FETCH_POSTLISTING_ERROR,
  FETCH_POSTLISTING_REQUEST,
  FETCH_POSTLISTING_SUCCESS,

  FETCH_FILTERPOSTLISTING_SUCCESS,
  FETCH_FILTERPOSTLISTING_REQUEST, 
  FETCH_FILTERPOSTLISTING_ERROR,
   
  REFRESH_POSTLISTING_REQUEST,

  SEARCH_POSTLISTING_REQUEST,
  SEARCH_POSTLISTING_ERROR,
  SEARCH_POSTLISTING_SUCCESS,
  
  FETCH_POSTADD_ERROR,
  FETCH_POSTADD_REQUEST,
  FETCH_POSTADD_SUCCESS,

  FETCH_POSTDELETE_ERROR,
  FETCH_POSTDELETE_REQUEST,
  FETCH_POSTDELETE_SUCCESS,

  FETCH_POSTUPDATE_ERROR,
  FETCH_POSTUPDATE_REQUEST,
  FETCH_POSTUPDATE_SUCCESS,

  FETCH_POSTFAVUPDATE_ERROR,
  FETCH_POSTFAVUPDATE_SUCCESS,
  FETCH_POSTFAVUPDATE_REQUEST,

  FETCH_POSTBOOKMARKUPDATE_ERROR,
  FETCH_POSTBOOKMARKUPDATE_SUCCESS,
  FETCH_POSTBOOKMARKUPDATE_REQUEST,
  
  FETCH_FRIENDREQUESTSEND_SUCCESS,

  FETCH_FRIENDREQUESTDELETE_SUCCESS,

  FETCH_FRIENDREQUESTUPDATE_SUCCESS,

} from '../constants/action-types';

import ApiUtility from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

const initialState = {
  postList: null,
  filterpostList: null,
  searchPostList:null,
  bookmarkFinish:false,
  myprofileFinish:false,


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

const postReducer = (state: Object = initialState, action: Object) => {
//
  // alert('packageReducer::'+action.isLoading);

  switch (action.type) {
    case FETCH_POSTLISTING_SUCCESS: {
        var postList = state.postList;
        var list=null;
        // for comment add update ncomment  

          // var j = CommonUtility.getIndexOfCompareObjArr(action.payload,"_id",state.postList,"_id");
          // if(j>-1){
          //   postList[j].ncomment=action.payload.ncomment;      
          //   list=postList;
          // }
      // alert('list'+state.pageNo);
        // alert(state.postList.length)
        // alert('postlist:'+JSON.stringify(state.postList)+'##'+JSON.stringify(action.payload))
      // console.log('prevStatepkglist:',state,postList);
        // if(action.isDelete == 'DELETED')
        // {
        //     list=action.payload
        // }
        
        if((action.listtype != 'bookmark' && action.listtype != 'myprofile')  && action.payload != null && postList != null)
             list=postList.concat(action.payload);
        else if((action.listtype != 'bookmark' && action.listtype != 'myprofile') && action.payload == null && postList != null)
            list=postList;
        // else if(action.payload != null && postList != null && pageNo == 0)
        //     var list=postList;
        else
            list=action.payload; 
      // alert('postList'+JSON.stringify(list));
      // alert(action.isFinished)
      return {
        postList: list,
        content:action.content,
        pageNo:action.pageNo,
        totalPage:action.totalPage,
        isFinished:action.isFinished,
        bookmarkFinish:action.bookmarkFinish,
        myprofileFinish:action.myprofileFinish,
        isLoading: false,
        error: false,
        deleted:false,
        isFilter:action.isFilter,
      };
    }

    case FETCH_POSTLISTING_REQUEST: {
      return {
        ...state,
        postList:action.payload=='reset'?null:state.postList,
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_POSTLISTING_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        postList: null
        
      };
    }

    case FETCH_FILTERPOSTLISTING_SUCCESS: {
        var filterpostList = state.filterpostList;
        var list=null;
      // console.log('prevStatepkglist:',state,postList);
        if(action.payload != null && filterpostList != null && state.isFilter && action.pageNo == 1){
           list=action.payload;
        }
        else if(action.payload != null && filterpostList != null && state.isFilter){
                    // alert('**if'+JSON.stringify(action.payload));
            list=filterpostList.concat(action.payload);
        }

        else if(action.payload == null && filterpostList != null && state.isFilter){
            // alert('**else'+JSON.stringify(action.payload)+JSON.stringify(state.filterpostList));
            list=filterpostList;
        }
        else
           list=action.payload;
      // alert('filterpostList'+JSON.stringify(list));

      return {
        ...state,
        filterpostList:list,
        content:action.content,
        pageNo:action.pageNo,
        totalPage:action.totalPage,
        isFinished:action.isFinished,
        isLoading: false,
        error: false,
        isFilter:true,
        deleted:false

      };
    }

  
    case FETCH_FILTERPOSTLISTING_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        isFilter:true,
      };
    }

    case FETCH_FILTERPOSTLISTING_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        isFilter:true,
        filterpostList: null,
        content:action.content
        
      };
    }    

    case REFRESH_POSTLISTING_REQUEST: {
      return {
        postList:null,
        content:action.content,
        pageNo:0,
        totalPage:action.totalPage,
        isFinished:false,
        isLoading: false,
        error: false,
        filterpostList: null,
        isFilter:state.isFilter,
        deleted:false

      };
    }

    case SEARCH_POSTLISTING_SUCCESS: {
        
        // alert(action.payload)
      return {
        ...state,
        searchPostList: action.payload,
        // postList : state.postList, //add this line otherwise main postlist will become null
        // isFinished:action.isFinished,
        isLoading: false,
        error: false,
      };
    }

    case SEARCH_POSTLISTING_REQUEST: {
      return {
       ...state,
        isLoading: false,
        error: false,
       
      };
    }

    case SEARCH_POSTLISTING_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        postList: null
        
      };
    }

    case FETCH_POSTADD_SUCCESS: {

      var postList = state.postList;
      // alert('add'+state.pageNo);
      //    // console.log("create-",action.payload,state.postList,postList);
         var list;
        if(postList == null && action.payload!=null){
            list=action.payload
         }
         else if(postList!=null && state.postList != undefined && action.payload!=null){
           list=(action.payload).concat(state.postList);
         }

      //    alert(JSON.stringify(state.postList))
      return {
        ...state,
        isLoading: false,
        isFinished:true,
        error: false,
        postList: list,
        
        // pageNo:0,
      };
    }

    case FETCH_FRIENDREQUESTSEND_SUCCESS: {
      var tmpdataSource=state.postList;
      // var list=null;

      // for (var i = 0;i < state.postList.length ;i++) {
      //   if(state.postList[i]['_id'] == action.payload._id)
      //   {
      //       tmpdataSource.splice(i,1);
      //       var list=tmpdataSource.concat(action.payload);      
      //   }
    
      // }

      return {
       ...state,// to set perfect pagination
        isLoading: false,
        error: false,
        postList: action.payload,
        pageNo:0, // to set perfect pagination
      };
    }


    case FETCH_FRIENDREQUESTDELETE_SUCCESS: {
      
      return {
       ...state,// to set perfect pagination
        isLoading: false,
        error: false,
        postList: action.payload,
        pageNo:0, // to set perfect pagination
      };
    }

    case FETCH_FRIENDREQUESTUPDATE_SUCCESS: {
      
      return {
       ...state,// to set perfect pagination
        isLoading: false,
        error: false,
        postList: action.payload,
        pageNo:0, // to set perfect pagination
      };
    }


    case FETCH_POSTADD_REQUEST: {
      return {
       ...state,
        isLoading: true,
        error: false,
        // postList: state.postList,
        // pageNo:0,
       
      };
    }

    case FETCH_POSTADD_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        // postList: null
        
      };
    }

    case FETCH_POSTDELETE_SUCCESS: {


      var tmpdataSource=state.postList;

      for (var i = 0;i < state.postList.length ;i++) {
        if(state.postList[i]['_id'] == action._id)
        {
            tmpdataSource.splice(i,1);
        }
    
      }
      
      
      return {
        isLoading: false,
        error: false,
        postList:tmpdataSource,
        // postList: action.payload,
        // pageNo:0,
        deleted:true
      };
    }
    case FETCH_POSTDELETE_REQUEST: {
      console.log("hi",state.postList);
      return {
       ...state,
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_POSTDELETE_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        postList: null
        
      };
    }

    case FETCH_POSTUPDATE_SUCCESS: {
      // var postList = state.postList;

      // alert(JSON.stringify(action.payload));      
      var tmpdataSource=state.postList;
      var list=null;

      for (var i = 0;i < state.postList.length ;i++) {
        if(state.postList[i]['_id'] == action.payload._id)
        {
            tmpdataSource.splice(i,1);
            var list=tmpdataSource.concat(action.payload);

            CommonUtility.showToast('post updated successfully');
        }
    
      }

      return {
       ...state,// to set perfect pagination
        isLoading: false,
        error: false,
        postList: list,
        // pageNo:0, // to set perfect pagination
      };
    }

    case FETCH_POSTUPDATE_REQUEST: {
      return {
       ...state,// to set perfect pagination
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_POSTUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        
      };
    }

    case FETCH_POSTFAVUPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        
      };
    }

    case FETCH_POSTFAVUPDATE_SUCCESS: {
      var tmpdataSource=state.postList;
      // alert('FETCH_POSTFAVUPDATE_SUCCESS'+JSON.stringify(action.payload))

      var list=null;

          var j = CommonUtility.getIndexOfCompareObjArr(action.payload,"_id",state.postList,"_id");
          if(j>-1){
            // alert(j)
            
            tmpdataSource[j].externalLike=action.payload.externalLike;      
            // tmpdataSource[j].nfavorite=action.payload.nfavorite;      
            tmpdataSource[j].nlikes=action.payload.nlikes;      
            // tmpdataSource[j].nlikes=action.payload.externalLike.length;      
            list=tmpdataSource;
            
          }


      return {
        ...state,
        isLoading: false,
        error: false,
        postList: list,
      };
    }

    case FETCH_POSTFAVUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        faverror:true
      };
    }

    case FETCH_POSTBOOKMARKUPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        
      };
    }

    case FETCH_POSTBOOKMARKUPDATE_SUCCESS: {
      var tmpdataSource=state.postList;
      var list=null;

          var j = CommonUtility.getIndexOfCompareObjArr(action.payload,"_id",state.postList,"_id");
          if(j>-1){
            // alert(j)
            
            tmpdataSource[j].externalBookmark=action.payload.externalBookmark;      
            list=tmpdataSource;
            
          }

      return {
        ...state,
        isLoading: false,
        error: false,
        postList: list,
      };
    }

    case FETCH_POSTBOOKMARKUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        // bookmarkerror:true
      };
    }



    default: {
      return state;
    }
  }
};

export default postReducer;