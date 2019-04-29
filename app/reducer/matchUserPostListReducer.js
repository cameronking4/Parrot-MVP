// @flow

import {
  FETCH_MATCHUSERPOSTLISTLISTING_ERROR,
  FETCH_MATCHUSERPOSTLISTLISTING_REQUEST,
  FETCH_MATCHUSERPOSTLISTLISTING_SUCCESS,

  REFRESH_MATCHUSERPOSTLISTLISTING_REQUEST,
  
  FETCH_MATCHUSERPOSTLISTADD_ERROR,
  FETCH_MATCHUSERPOSTLISTADD_REQUEST,
  FETCH_MATCHUSERPOSTLISTADD_SUCCESS,

  FETCH_MATCHUSERPOSTLISTDELETE_ERROR,
  FETCH_MATCHUSERPOSTLISTDELETE_REQUEST,
  FETCH_MATCHUSERPOSTLISTDELETE_SUCCESS,

  FETCH_MATCHUSERPOSTLISTUPDATE_ERROR,
  FETCH_MATCHUSERPOSTLISTUPDATE_REQUEST,
  FETCH_MATCHUSERPOSTLISTUPDATE_SUCCESS,

  FETCH_MATCHUSERPOSTLISTFAVUPDATE_ERROR,
  FETCH_MATCHUSERPOSTLISTFAVUPDATE_SUCCESS,
  FETCH_MATCHUSERPOSTLISTFAVUPDATE_REQUEST,


} from '../constants/action-types';

import ApiUtility from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

const initialState = {
  matchUserPostList: null,
  filtermatchUserPostList: null,
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

export const getMatchUserPostSelector = (state: Object) => ({ ...state.matchUserPostList });

const matchUserPostListReducer = (state: Object = initialState, action: Object) => {
//
  // alert('packageReducer::'+action.isLoading);

  switch (action.type) {
    case FETCH_MATCHUSERPOSTLISTLISTING_SUCCESS: {
        var matchUserPostList = state.matchUserPostList;
        var list=null;
        // for comment add update ncomment  

          // var j = CommonUtility.getIndexOfCompareObjArr(action.payload,"_id",state.matchUserPostList,"_id");
          // if(j>-1){
          //   matchUserPostList[j].ncomment=action.payload.ncomment;      
          //   list=matchUserPostList;
          // }
      // alert('list'+state.pageNo);
        // alert(state.matchUserPostList.length)
        // alert('postlist:'+JSON.stringify(state.matchUserPostList)+'##'+JSON.stringify(action.payload))
      // console.log('prevStatepkglist:',state,matchUserPostList);
        if(action.payload != null &&  matchUserPostList != null)
             list=matchUserPostList.concat(action.payload);
        else if(action.payload == null && matchUserPostList != null)
            list=matchUserPostList;
        else
            list=action.payload; 
      
      return {
        matchUserPostList: list,
        content:action.content,
        pageNo:action.pageNo,
        totalPage:action.totalPage,
        isFinished:action.isFinished,
        isLoading: false,
        error: false,
        deleted:false,
      };
    }

    case FETCH_MATCHUSERPOSTLISTLISTING_REQUEST: {
      return {
        ...state,
        matchUserPostList:action.payload=='reset'?null:state.matchUserPostList,
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_MATCHUSERPOSTLISTLISTING_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        matchUserPostList: null
        
      };
    }

    

    case REFRESH_MATCHUSERPOSTLISTLISTING_REQUEST: {
      return {
        matchUserPostList:null,
        content:action.content,
        pageNo:0,
        totalPage:action.totalPage,
        isFinished:false,
        isLoading: false,
        error: false,
        filtermatchUserPostList: null,
        isFilter:state.isFilter,
        deleted:false

      };
    }

    
    case FETCH_MATCHUSERPOSTLISTFAVUPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        
      };
    }

    case FETCH_MATCHUSERPOSTLISTFAVUPDATE_SUCCESS: {
      var tmpdataSource=state.matchUserPostList;
      var list=null;

          var j = CommonUtility.getIndexOfCompareObjArr(action.payload,"_id",state.matchUserPostList,"_id");
          if(j>-1){
            // alert(j)
            
            tmpdataSource[j].externalLike=action.payload.externalLike;      
            tmpdataSource[j].nfavorite=action.payload.nfavorite;      
            list=tmpdataSource;
            
          }


      return {
        ...state,
        isLoading: false,
        error: false,
        matchUserPostList: list,
      };
    }

    case FETCH_MATCHUSERPOSTLISTFAVUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        faverror:true
      };
    }

    


    default: {
      return state;
    }
  }
};

export default matchUserPostListReducer;