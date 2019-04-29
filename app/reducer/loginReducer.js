// @flow

import {
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,

  UPDATE_LOGIN_ERROR,
  UPDATE_LOGIN_REQUEST,
  UPDATE_LOGIN_SUCCESS,

  RESTORE_LOGIN_REQUEST,
  RESTORE_LOGIN_SUCCESS,

  SEARCH_STORELISTING_REQUEST,
  SEARCH_STORELISTING_ERROR,
  SEARCH_STORELISTING_SUCCESS,


  FETCH_USERPROFILE_SUCCESS,
  FETCH_USERPROFILE_ERROR,
  FETCH_USERPROFILE_REQUEST

} from '../constants/action-types';

import ApiUtility from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';

const initialState = {
  profileData:null,
  loginData:null,
  isLoading: false, 
  error: false,
  update:false,
  
};

                                                                   
export const getLoginSelector = (state: Object) => ({ ...state.login });

const loginReducer = (state: Object = initialState, action: Object) => {

  console.log('loginReducer::',action.type,action.payload);
// alert("JSON.stringify"+JSON.stringify(action.payload))
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS: {
        console.log('FETCH_LOGIN_SUCCESS::',action.payload);

      // alert("loginreducer"+JSON.stringify(action.payload))
      return {
        isLoading: false,
        error: false,
        loginData: action.payload,
      };
    }
    case FETCH_LOGIN_REQUEST: {
      return {
       ...state,
        isLoading: true,
        error: false,
       
      };
    }

    case FETCH_LOGIN_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        loginData:null
        
      };
    }

    case UPDATE_LOGIN_SUCCESS:{

      var loginData = state.loginData;

      return {
        isLoading : false,
        error : false,
        // loginData : loginData,
        profileData:action.payload,
        update:true,
      }
    }

    case UPDATE_LOGIN_REQUEST: {
      return {
        // ...state,
        isLoading: true,
        error: false,

      };
    }

    case UPDATE_LOGIN_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        loginData:null
        
      };
    }

    case RESTORE_LOGIN_SUCCESS: {
      console.log('##########RESTORE_LOGIN_SUCCESS',action.payload)
      // alert('RESTORE_LOGIN_SUCCESS'+JSON.stringify(action.payload));
      return {
        // ...state,
        isLoading: false,
        error: false,
        loginData: action.payload,
      };
    }

    case RESTORE_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }


    case SEARCH_STORELISTING_SUCCESS: {
      // var storeList = state.storeList;

    // // console.log('prevStatepkglist:',state,storeList);
    //   if(action.payload != null && storeList != null)
    //       var list=storeList.concat(action.payload);
    //   else if(action.payload == null && storeList != null)
    //       var list=storeList;
    //   else
    //       var list=action.payload;
    // alert('storeList'+JSON.stringify(state.storeList));
    return {
      packageList: action.payload,
      storeList : state.storeList, //add this line otherwise main storelist will become null
      isFinished:action.isFinished,
      isLoading: false,
      error: false,
      ...state
    };
  }

  // case SEARCH_STORELISTING_REQUEST: {
  //   return {
  //     isLoading: false,
  //     error: false,
  //    ...state
  //   };
  // }

  // case SEARCH_STORELISTING_ERROR: {
  //   return {
  //     // ...state,
  //     isLoading: false,
  //     error: true,
  //     storeList: null
      
  //   };
  // }


    case FETCH_USERPROFILE_SUCCESS: {
      // alert('%%%'+JSON.stringify(action.payload))
      return {
        profileData: action.payload,
        isLoading: false,
        error: false,
        
      };
    }
    case FETCH_USERPROFILE_REQUEST: {
      return {
        // ...state,
        isLoading: true,
        error: false,
      };
    }

    case FETCH_USERPROFILE_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        profileData:null
        
      };
    }

    default: {
      return state;
    }
  }
};

export default loginReducer;