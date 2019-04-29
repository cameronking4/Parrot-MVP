// @flow

import {
  FETCH_USERLISTING_ERROR,
  FETCH_USERLISTING_REQUEST,
  FETCH_USERLISTING_SUCCESS,

} from '../constants/action-types';

import ApiUtility from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

const initialState = {
  userList: null,

  isLoading: false,
  error: false,

  pageNo:0,
  totalPage:0,
  isFinished:false,

};

export const getUserSelector = (state: Object) => ({ ...state.user });

const userReducer = (state: Object = initialState, action: Object) => {
//
  // alert('packageReducer::'+action.isLoading);

  switch (action.type) {
    case FETCH_USERLISTING_SUCCESS: {
       
      return {
        userList:action.payload,
        isLoading: false,
        error: false,
      };
    }

    case FETCH_USERLISTING_REQUEST: {
      return {
        ...state,
        userList:action.payload=='reset'?null:state.userList,
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_USERLISTING_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        userList: null
        
      };
    }



    default: {
      return state;
    }
  }
};

export default userReducer;