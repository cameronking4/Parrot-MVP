// @flow

import {
    FETCH_FAVADD_SUCCESS,
    FETCH_FAVADD_REQUEST,
    FETCH_FAVADD_ERROR,
    FETCH_FAVLISTING_SUCCESS,
    FETCH_FAVLISTING_REQUEST,
    FETCH_FAVLISTING_ERROR,
  } from '../constants/action-types'; 
  
  import ApiUtility from '../reducer/lib/ApiUtility';
  import AuthUtility from '../reducer/lib/AuthUtility';
   
  const initialState = {
   favList:null,
    isLoading: false,
    error: false,
  };
  
  
  export const getPostSelector = (state: Object) => ({ ...state.post });
  
  const favReducer = (state: Object = initialState, action: Object) => {
  
    // console.log('packageReducer::',action.type,action.payload);
  
    switch (action.type) {
      case FETCH_FAVADD_SUCCESS:{
        
        
        var favList = state.favList;

        var list=null;
        // alert(JSON.stringify(state.favList));
        // if(state.favList != null && action.payload.flag == 'removed')
        // {
        //   for (var i = 0;i < state.favList.data.data.length ;i++) {
        //     if(state.favList.data.data[i]['_id'] == action.payload.data._id)
        //     {
        //         // alert(JSON.stringify(action.payload)+'********'+JSON.stringify(state.favList))      
        //         list=state.favList.data.data.splice(i,1);
        //       // CommonUtility.showToast('User updated successfully');
        //     }
        
        //   }
        // }

        return {
          isLoading: false,
          error: false,
          favList:list,
          ...state,
          
        };
      }
      case FETCH_FAVADD_REQUEST: {
        return {
          isLoading: true,
          error: false,
         ...state
        };
      }
  
      case FETCH_FAVADD_ERROR: {
        return {
          // ...state,
          isLoading: false,
          error: true,
          favList: {}
          
        };
      }
      case FETCH_FAVLISTING_SUCCESS:{
        return {
          isLoading: false,
          error: false,
          favList: action.payload,
        };
      }
      case FETCH_FAVLISTING_REQUEST: {
        return {
          isLoading: true,
          error: false,
         ...state
        };
      }
  
      case FETCH_FAVLISTING_ERROR: {
        return {
          // ...state,
          isLoading: false,
          error: true,
          favList: {}
          
        };
      }
  
      default: {
        return state;
      }
    }
  };
  
  export default favReducer;