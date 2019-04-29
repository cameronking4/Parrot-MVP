// @flow

import {
  FETCH_PROFILEPOSTLISTING_ERROR,
  FETCH_PROFILEPOSTLISTING_REQUEST,
  FETCH_PROFILEPOSTLISTING_SUCCESS,

  FETCH_FILTERPROFILEPOSTLISTING_SUCCESS,
  FETCH_FILTERPROFILEPOSTLISTING_REQUEST, 
  FETCH_FILTERPROFILEPOSTLISTING_ERROR,
   
  REFRESH_PROFILEPOSTLISTING_REQUEST,

  SEARCH_PROFILEPOSTLISTING_REQUEST,
  SEARCH_PROFILEPOSTLISTING_ERROR,
  SEARCH_PROFILEPOSTLISTING_SUCCESS,
  
  FETCH_PROFILEPOSTADD_ERROR,
  FETCH_PROFILEPOSTADD_REQUEST,
  FETCH_PROFILEPOSTADD_SUCCESS,

  FETCH_PROFILEPOSTDELETE_ERROR,
  FETCH_PROFILEPOSTDELETE_REQUEST,
  FETCH_PROFILEPOSTDELETE_SUCCESS,

  FETCH_PROFILEPOSTUPDATE_ERROR,
  FETCH_PROFILEPOSTUPDATE_REQUEST,
  FETCH_PROFILEPOSTUPDATE_SUCCESS,

  FETCH_PROFILEPOSTFAVUPDATE_ERROR,
  FETCH_PROFILEPOSTFAVUPDATE_SUCCESS,
  FETCH_PROFILEPOSTFAVUPDATE_REQUEST,

  FETCH_PROFILEPOSTBOOKMARKUPDATE_ERROR,
  FETCH_PROFILEPOSTBOOKMARKUPDATE_SUCCESS,
  FETCH_PROFILEPOSTBOOKMARKUPDATE_REQUEST,
  
  FETCH_FRIENDREQUESTSEND_SUCCESS,

  FETCH_FRIENDREQUESTDELETE_SUCCESS,

  FETCH_FRIENDREQUESTUPDATE_SUCCESS,

} from '../constants/action-types';

import ApiUtility from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

const initialState = {
  profilelist:null,
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

export const getprofilePostSelector = (state: Object) => ({ ...state.profilePost });

const profilePostReducer = (state: Object = initialState, action: Object) => {
//
  // alert('packageReducer::'+action.isLoading);

  switch (action.type) {
    case FETCH_PROFILEPOSTLISTING_SUCCESS: {
        var profilelist = state.profilelist;
        
       // alert(JSON.stringify(action.isFinished))
        if((action.listtype != 'bookmark' && action.listtype != 'myprofile')  && action.payload != null && profilelist != null)
             list=profilelist.concat(action.payload);
        else if((action.listtype != 'bookmark' && action.listtype != 'myprofile') && action.payload == null && profilelist != null)
            list=profilelist;
        else
            list=action.payload; 
      
      return {
        profilelist:list,
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

    case FETCH_PROFILEPOSTLISTING_REQUEST: {
      return {
        ...state,
        profilelist:action.payload=='reset'?null:state.profilelist,
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_PROFILEPOSTLISTING_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        postList: null
        
      };
    }

    case FETCH_FILTERPROFILEPOSTLISTING_SUCCESS: {
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

  
    case FETCH_FILTERPROFILEPOSTLISTING_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        isFilter:true,
      };
    }

    case FETCH_FILTERPROFILEPOSTLISTING_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        isFilter:true,
        filterpostList: null,
        content:action.content
        
      };
    }    

    case REFRESH_PROFILEPOSTLISTING_REQUEST: {
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

    case SEARCH_PROFILEPOSTLISTING_SUCCESS: {
        
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

    case SEARCH_PROFILEPOSTLISTING_REQUEST: {
      return {
       ...state,
        isLoading: false,
        error: false,
       
      };
    }

    case SEARCH_PROFILEPOSTLISTING_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        postList: null
        
      };
    }

    case FETCH_PROFILEPOSTADD_SUCCESS: {

      var profilelist = state.profilelist;
      // alert('add'+state.pageNo);
      //    // console.log("create-",action.payload,state.postList,postList);
         var list;
        if(profilelist == null && action.payload!=null){
            list=action.payload
         }
         else if(profilelist!=null && state.profilelist != undefined && action.payload!=null){
           list=(action.payload).concat(state.profilelist);
         }

      //    alert(JSON.stringify(state.postList))
      return {
        ...state,
        isLoading: false,
        isFinished:true,
        error: false,
        profilelist: list,
        
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


    case FETCH_PROFILEPOSTADD_REQUEST: {
      return {
       ...state,
        isLoading: true,
        error: false,
        // postList: state.postList,
        // pageNo:0,
       
      };
    }

    case FETCH_PROFILEPOSTADD_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        // postList: null
        
      };
    }

    case FETCH_PROFILEPOSTDELETE_SUCCESS: {
    
      var tmpdataSource=state.profilelist;

      for (var i = 0;i < state.profilelist.length ;i++) {
        if(state.profilelist[i]['_id'] == action._id)
        {
            tmpdataSource.splice(i,1);
        }
    
      }
      
      return {
        isLoading: false,
        error: false,
        profilelist: tmpdataSource,
        // pageNo:0,
        deleted:true
      };
    }
    case FETCH_PROFILEPOSTDELETE_REQUEST: {
      console.log("hi",state.postList);
      return {
        isLoading: true,
        error: false,
       ...state
      };
    }

    case FETCH_PROFILEPOSTDELETE_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        profilelist: null
        
      };
    }

    case FETCH_PROFILEPOSTUPDATE_SUCCESS: {
      // var postList = state.postList;

      // alert(JSON.stringify(action.payload));      
      var tmpdataSource=state.profilelist;
      var list=tmpdataSource;
// alert(state.profilelist)
   
        if(state.profilelist !== null){
          for (var i = 0;i < state.profilelist.length ;i++) {
            if(state.profilelist[i]['_id'] == action.payload._id)
            {
                tmpdataSource.splice(i,1);
                var list=tmpdataSource.concat(action.payload);

                CommonUtility.showToast('post updated successfully');
            }
        
          }

        }
          
      return {
       ...state,// to set perfect pagination
        isLoading: false,
        error: false,
        profilelist: list,
        // pageNo:0, // to set perfect pagination
      };
    }

    case FETCH_PROFILEPOSTUPDATE_REQUEST: {
      return {
       ...state,// to set perfect pagination
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_PROFILEPOSTUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        
      };
    }

    case FETCH_PROFILEPOSTFAVUPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        
      };
    }

    case FETCH_PROFILEPOSTFAVUPDATE_SUCCESS: {
      var tmpdataSource=state.profilelist;
      var list=null;

          var j = CommonUtility.getIndexOfCompareObjArr(action.payload,"_id",state.profilelist,"_id");
          if(j>-1){
            // alert(j)
            
            tmpdataSource[j].externalLike=action.payload.externalLike;      
            tmpdataSource[j].nlikes=action.payload.nlikes;
            // tmpdataSource[j].nlikes=action.payload.externalLike.length;            
            list=tmpdataSource; 
          }

      return {
        ...state,
        isLoading: false,
        error: false,
        profilelist: list,
      };
    }

    case FETCH_PROFILEPOSTFAVUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        faverror:true
      };
    }

    case FETCH_PROFILEPOSTBOOKMARKUPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        
      };
    }

    case FETCH_PROFILEPOSTBOOKMARKUPDATE_SUCCESS: {
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

    case FETCH_PROFILEPOSTBOOKMARKUPDATE_ERROR: {
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

export default profilePostReducer;