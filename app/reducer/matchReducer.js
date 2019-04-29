// @flow

import {
  FETCH_MATCHLISTING_ERROR,
  FETCH_MATCHLISTING_REQUEST,
  FETCH_MATCHLISTING_SUCCESS,

  FETCH_MATCHUPDATE_SUCCESS,
  FETCH_MATCHUPDATE_ERROR,
  FETCH_MATCHUPDATE_REQUEST,

  FETCH_MATCHDELETE_SUCCESS,
  FETCH_MATCHDELETE_ERROR,
  FETCH_MATCHDELETE_REQUEST,

} from '../constants/action-types';

import ApiUtility from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

const initialState = {
  matchList: null,

  isLoading: false,
  error: false,

  pageNo:0,
  totalPage:0,
  isFinished:false,

};

export const getPostSelector = (state: Object) => ({ ...state.match });

const matchReducer = (state: Object = initialState, action: Object) => {
//
  // alert('packageReducer::'+action.isLoading);

  switch (action.type) {
    case FETCH_MATCHLISTING_SUCCESS: {
       
      return {
        matchList:action.payload,
        // content:action.content,
        // pageNo:action.pageNo,
        // totalPage:action.totalPage,
        // isFinished:action.isFinished,
        isLoading: false,
        error: false,
      };
    }

    case FETCH_MATCHLISTING_REQUEST: {
      return {
        ...state,
        matchList:action.payload=='reset'?null:state.matchList,
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_MATCHLISTING_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        matchList: null
        
      };
    }


        case FETCH_MATCHUPDATE_SUCCESS: {
      // var matchList = state.matchList;

      // alert(JSON.stringify(action.payload));      
      // var tmpdataSource=state.matchList;
      // var list=null;

      // for (var i = 0;i < state.matchList.length ;i++) {
      //   if(state.matchList[i]['_id'] == action.payload._id)
        //   {
      //       tmpdataSource.splice(i,1);
      //       var list=tmpdataSource.concat(action.payload);

      //       CommonUtility.showToast('match updated successfully');
      //   }
    
      // }

      return {
       ...state,// to set perfect pagination
        isLoading: false,
        error: false,
        // matchList: list,
        // pageNo:0, // to set perfect pagination
      };
    }

    case FETCH_MATCHUPDATE_REQUEST: {
      return {
       ...state,// to set perfect pagination
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_MATCHUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        
      };
    }

    case FETCH_MATCHDELETE_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        // matchList: action.payload,

      };
    }
    case FETCH_MATCHDELETE_REQUEST: {
      console.log("hi",state.matchList);
      return {
        isLoading: true,
        error: false,
       ...state
      };
    }

    case FETCH_MATCHDELETE_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        matchList: null
        
      };
    }



    default: {
      return state;
    }
  }
};

export default matchReducer;