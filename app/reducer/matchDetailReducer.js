// @flow

import {
  FETCH_MATCHDETAIL_ERROR,
  FETCH_MATCHDETAIL_REQUEST,
  FETCH_MATCHDETAIL_SUCCESS,

  FETCH_MATCHDETAILFAVUPDATE_REQUEST,
  FETCH_MATCHDETAILFAVUPDATE_SUCCESS,
  FETCH_MATCHDETAILFAVUPDATE_ERROR,

  FETCH_MATCHDETAILBOOKMARKUPDATE_SUCCESS,
  FETCH_MATCHDETAILBOOKMARKUPDATE_ERROR,
  FETCH_MATCHDETAILBOOKMARKUPDATE_REQUEST,

} from '../constants/action-types';

import ApiUtility from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

const initialState = {
  matchDetail: null,
  isLoading: false,
  error: false,
};


export const getPostDetailSelector = (state: Object) => ({ ...state.matchDetail });

const matchDetailReducer = (state: Object = initialState, action: Object) => {

  // console.log('matchDetailReducer::',action.type,action.payload);
  // alert('matchDetailReducer::'+action.payload);

  switch (action.type) {

    case FETCH_MATCHDETAIL_SUCCESS: {
      // alert('matchDetailReducer::'+JSON.stringify(action.payload))
      return {
        matchDetail: action.payload,
        isLoading: false,
        error: false,
        
      };
    }
    case FETCH_MATCHDETAIL_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        matchDetail: null,

      };
    }

    case FETCH_MATCHDETAIL_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        // matchDetail: null,
        
      };
    }


    case FETCH_MATCHDETAILFAVUPDATE_REQUEST: {
      return {
        ...state,
        // isLoading: true,
        error: false,
        
      };
    }

    case FETCH_MATCHDETAILFAVUPDATE_SUCCESS: {
      var matchDetail=state.matchDetail;            
      matchDetail.externalLike=action.payload.externalLike;      
      matchDetail.nfavorite=action.payload.nfavorite;      

      return {
        ...state,
        isLoading: false,
        error: false,
        matchDetail: matchDetail,
      };
    }

    case FETCH_MATCHDETAILFAVUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        faverror:true
      };
    }


    case FETCH_MATCHDETAILBOOKMARKUPDATE_REQUEST: {
      return {
        ...state,
        // isLoading: true,
        error: false,
        
      };
    }

    case FETCH_MATCHDETAILBOOKMARKUPDATE_SUCCESS: {
      var matchDetail=state.matchDetail;
        
        matchDetail.externalBookmark=action.payload.externalBookmark;      

      return {
        ...state,
        isLoading: false,
        error: false,
        matchDetail: matchDetail,
      };
    }

    case FETCH_MATCHDETAILBOOKMARKUPDATE_ERROR: {
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

export default matchDetailReducer;