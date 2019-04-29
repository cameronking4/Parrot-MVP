// @flow

import {
  FETCH_NOTIFYLISTING_SUCCESS,
  FETCH_NOTIFYLISTING_REQUEST,
  FETCH_NOTIFYLISTING_ERROR,
  FETCH_NOTIFYLISTUPDATE_SUCCESS,
  FETCH_NOTIFYLISTUPDATE_REQUEST,
  FETCH_NOTIFYLISTUPDATE_ERROR,
  RESET_NOTIFYLISTING,

  UPDATE_ROOMREAD_ERROR,
  UPDATE_ROOMREAD_SUCCESS,
  UPDATE_ROOMREAD_REQUEST

} from "../constants/action-types";

import ApiUtility from "./lib/ApiUtility";
import AuthUtility from "./lib/AuthUtility";
import CommonUtility from "./lib/CommonUtility";

const initialState = {
  pageNo: 0,
  notifyList: null,
  // AddGroup:null,
  // groupJoinList:null,
  // searchList:null,
  isLoading: false,
  error: false,

  content: null,
  totalPage: 0,
  isFinished: false,
  isFilter: false,

  deleted: false
};

const notificationReducer = (state: Object = initialState, action: Object) => {
  console.log("loginReducer::", action.type, action.payload);

  switch (action.type) {
    case FETCH_NOTIFYLISTING_SUCCESS: {
      var notifyList = state.notifyList;
      var list;

      // alert(JSON.stringify(notifyList))
      console.log("prevState pkglisting:", notifyList);
      if(action.isFinished == true){
        // alert('1')
        list = notifyList;
      }
      else if (action.payload != null && notifyList != null){
        // alert('11')
        list = notifyList.concat(action.payload);
      }
      else if (action.payload == null && notifyList != null) {
        // alert('122')
        list = notifyList;
      }
      else{
        // alert('1222'+JSON.stringify(action.payload))
         list = action.payload;
      }
      console.log("list", list);
      // alert("lisy" + action.isFinished);
      return {
        // ...state,
        notifyList: list,
        content: action.content,
        pageNo: action.pageNo,
        totalPage: action.totalPage,
        isFinished: action.isFinished,
        isLoading: false,
        error: false,
        deleted: false,
        isFilter: action.isFilter
      };
    }
    case FETCH_NOTIFYLISTING_REQUEST: {
      // alert("req");
      return {
        isLoading: true,
        error: false
        // ...state
      };
    }

    case FETCH_NOTIFYLISTING_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true,
        notifyList: null
      };
    }

    // updatefor joincall group
    case FETCH_NOTIFYLISTUPDATE_REQUEST: {
      return {
        // ...state
        isLoading: true,
        error: false,
        
      };
    }

    case FETCH_NOTIFYLISTUPDATE_SUCCESS: {
      var tmpdataSource = state.notifyList;
      var list = null;
      console.log("tempdta", action.payload, tmpdataSource);
      // for (var i = 0;i < state.packageList.length ;i++) {
      // if(state.packageList[i]['_id'] == action.payload._id)
      // {
      var j = CommonUtility.getIndexOfCompareObjArr(
        action.payload,
        "_id",
        state.notifyList,
        "_id"
      );
      console.log("j", j);
      if (j > -1) {
        // alert(j)
        // alert('*******'+JSON.stringify(action.payload)+' $$$ '+JSON.stringify(tmpdataSource[j].externalFavorite));
        tmpdataSource[j].friendrequest = action.payload.friendrequest;
        list = tmpdataSource;
      }

      console.log("finalll", list);
      return {
        isLoading: false,
        error: false,
        notifyList: list,
        isFinished: true,
        ...state
      };
    }

    case FETCH_NOTIFYLISTUPDATE_ERROR: {
      return {
        // ...state,
        isLoading: false,
        error: true
        // notifyList: null
      };
    }

    // for group search
    //   case SEARCH_notifyListING_SUCCESS:{
    //     // var storeList = state.notifyList;
    //     // storeList=null;
    //     storeList=action.payload;
    //   // console.log('prevStatepkglistserach:',action.isFinished);
    //   return {
    //     ...state,
    //     searchList:storeList,
    //     // packageList : state.storeList, //add this line otherwise main storelist will become null
    //     isFinished:true,
    //     isLoading: false,
    //     error: false,
    //     // ...state
    //   };
    // }

    // case SEARCH_notifyListING_REQUEST: {
    //   return {
    //     isLoading: false,
    //     error: false,
    //    ...state
    //   };
    // }

    // case SEARCH_notifyListING_ERROR: {
    //   return {
    //     // ...state,
    //     isLoading: false,
    //     error: true,
    //     notifyList: null

    //   };
    // }
    case RESET_NOTIFYLISTING:
      return {
        pageNo: 0,
        notifyList: null,
        isLoading: false,
        error: false,
        content: null,
        totalPage: 0,
        isFinished: false,
        isFilter: false,
        deleted: false
      };


    case UPDATE_ROOMREAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        
      };
    }

    case UPDATE_ROOMREAD_SUCCESS: {
      var tmpdataSource=state.notifyList;
      // alert('UPDATE_ROOMREAD_SUCCESS'+JSON.stringify(action.payload))

      var list=null;

          var j = CommonUtility.getIndexOfCompareObjArr(action.payload,"_id",state.notifyList,"_id");
          if(j>-1){
            // alert(j)
            
            tmpdataSource[j].nuser1=action.payload.nuser1;      
            tmpdataSource[j].nuser2=action.payload.nuser2;          
            list=tmpdataSource;
            
          }

      return {
        ...state,
        isLoading: false,
        error: false,
        notifyList: list,
      };
    }

    case UPDATE_ROOMREAD_ERROR: {
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

export default notificationReducer;
