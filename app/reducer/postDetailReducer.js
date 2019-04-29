// @flow

import {
  FETCH_POSTDETAIL_ERROR,
  FETCH_POSTDETAIL_REQUEST,
  FETCH_POSTDETAIL_SUCCESS,

  FETCH_POSTDETAILFAVUPDATE_REQUEST,
  FETCH_POSTDETAILFAVUPDATE_SUCCESS,
  FETCH_POSTDETAILFAVUPDATE_ERROR,

  FETCH_POSTDETAILBOOKMARKUPDATE_SUCCESS,
  FETCH_POSTDETAILBOOKMARKUPDATE_ERROR,
  FETCH_POSTDETAILBOOKMARKUPDATE_REQUEST,

} from '../constants/action-types';

import ApiUtility from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

const initialState = {
  postDetail: null,
  isLoading: false,
  error: false,
};


export const getPostDetailSelector = (state: Object) => ({ ...state.postDetail });

const postDetailReducer = (state: Object = initialState, action: Object) => {

  // console.log('postDetailReducer::',action.type,action.payload);
  // alert('postDetailReducer::'+action.payload);

  switch (action.type) {

    case FETCH_POSTDETAIL_SUCCESS: {
      // alert('postDetailReducer::'+JSON.stringify(action.payload))
      return {
        postDetail: action.payload,
        isLoading: false,
        error: false,
        
      };
    }
    case FETCH_POSTDETAIL_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        // postDetail: null,

      };
    }

    case FETCH_POSTDETAIL_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        // postDetail: null,
        
      };
    }


    case FETCH_POSTDETAILFAVUPDATE_REQUEST: {
      return {
        ...state,
        // isLoading: true,
        error: false,
        
      };
    }

    case FETCH_POSTDETAILFAVUPDATE_SUCCESS: {
      var postDetail=state.postDetail;            
      postDetail.externalLike=action.payload.externalLike;      
      postDetail.nlikes=action.payload.nlikes;      

      return {
        ...state,
        isLoading: false,
        error: false,
        postDetail: postDetail,
      };
    }

    case FETCH_POSTDETAILFAVUPDATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
        faverror:true
      };
    }


    case FETCH_POSTDETAILBOOKMARKUPDATE_REQUEST: {
      return {
        ...state,
        // isLoading: true,
        error: false,
        
      };
    }

    case FETCH_POSTDETAILBOOKMARKUPDATE_SUCCESS: {
      var postDetail=state.postDetail;
        
        postDetail.externalBookmark=action.payload.externalBookmark;      

      return {
        ...state,
        isLoading: false,
        error: false,
        postDetail: postDetail,
      };
    }

    case FETCH_POSTDETAILBOOKMARKUPDATE_ERROR: {
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

export default postDetailReducer;