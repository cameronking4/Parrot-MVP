// @flow

import {
  FETCH_CHATROOMLISTING_SUCCESS, 
  FETCH_CHATROOMLISTING_REQUEST,
  FETCH_CHATROOMLISTING_ERROR,

  FETCH_CHATMESSAGELISTING_ERROR,
  FETCH_CHATMESSAGELISTING_SUCCESS,
  FETCH_CHATMESSAGELISTING_REQUEST,

  CREATE_CHATMESSAGE_ERROR,
  CREATE_CHATMESSAGE_REQUEST,
  CREATE_CHATMESSAGE_SUCCESS,


  UPDATE_CHATMESSAGE_ERROR,
  UPDATE_CHATMESSAGE_REQUEST,
  UPDATE_CHATMESSAGE_SUCCESS,
  

  } from '../constants/action-types'; 
  
  import ApiUtility from '../reducer/lib/ApiUtility';
  import AuthUtility from '../reducer/lib/AuthUtility';
   
  const initialState = {
   chatroomList:null,
   chatmessageList:null,
    isLoading: false,
    error: false,
    content:null,
  pageNo:0,
  totalPage:0,
  isFinished:false,
  };
  
  
  export const getChatRoomSelector = (state: Object) => ({ ...state.chatRoom });
  
  const chatRoomReducer = (state: Object = initialState, action: Object) => {
  
    console.log('packageReducer::',action.type,action.payload);
  
    switch (action.type) {
      case FETCH_CHATROOMLISTING_SUCCESS:{
        // var blockList = state.blockList;
        // var list=null;

        return {
          isLoading: false,
          error: false,
          chatroomList:action.list,
          
        };
      }
      case FETCH_CHATROOMLISTING_REQUEST: {
        return {
          isLoading: true,
          error: false,
         // ...state
        };
      }
  
      case FETCH_CHATROOMLISTING_ERROR: {
        return {
          ...state,
          isLoading: false,
          error: true,

          // blockList: {}
          
        };
      }
      
      case FETCH_CHATMESSAGELISTING_SUCCESS:{
        // alert(JSON.stringify(action.chatmessagelist));
        var postList = state.chatmessagelist;
        var list=null;
      if(action.chatmessagelist != null && postList != null)
             list=postList.concat(action.payload);
        else if(action.chatmessagelist == null && postList != null)
            list=postList;
        // else if(action.payload != null && postList != null && pageNo == 0)
        //     var list=postList;
        else
            list=action.chatmessagelist; 
        var newChatMessages=[];
      for(var i=0;i<list.length;i++){
         // alert("@@"+arrMessages[0]);

        var messageData=null;
        if(list[i].use2._id == action.loginId){
          // alert("@@"+arrMessages[i].message);
         
          // add chat mesage Right
                  messageData={
                sent: true,
                type:list[i].type,
                image:list[i].use2.image,
                  firstName:list[i].use2.firstname,
                 lastName:list[i].use2.lastname,
                msg:  list[i].message,
              };
        }else{
           // alert("1");
          console.log("111111",list[i].use1.image);
          // add chat message left
                  messageData={
                sent: false,
                 type:list[i].type,
                image:list[i].use1.image,
                  firstName:list[i].use1.firstname,
                 lastName:list[i].use1.lastname,
                msg:  list[i].message,
              } 
        }
      newChatMessages.push(messageData);
      }  
      // alert(JSON.stringify(action.content));
      return {
        // ...state,
        chatmessageList: newChatMessages,
        content:action.content,
        pageNo:action.pageNo,
        // totalPage:action.totalPage,
        isFinished:action.isFinished,
        // bookmarkFinish:action.bookmarkFinish,
        // myprofileFinish:action.myprofileFinish,
        isLoading: false,
        error: false,
        // deleted:false,
        // isFilter:action.isFilter,
      };
      //       var chatmessagelist = state.chatmessagelist;
      //  var list=null;
      // // console.log('prevState pkglisting:8888',chatmessagelist);
      //   if(action.chatmessagelist != null && chatmessagelist != null)
      //        list=action.chatmessagelist.concat(chatmessagelist);
      //   else if(action.chatmessagelist == null && chatmessagelist != null)
      //       list=chatmessagelist;
      //   else
      //       list=action.chatmessagelist;
      //     console.log("list$$$$",list);
      //   return {
      //     // ...state,
      //   chatmessagelist: list,
      //   // content:action.content,
      //   // pageNo:action.pageNo,
      //   // totalPage:action.totalPage,
      //   // isFinished:action.isFinished,
      //   isLoading: false,
      //   error: false,
      //   // deleted:false,
      //   // isFilter:action.isFilter,
      // };
        
      }
      case FETCH_CHATMESSAGELISTING_REQUEST: {
        return {
         ...state,

          isLoading: true,
          error: false,
        };
      }
  
      case FETCH_CHATMESSAGELISTING_ERROR: {
        return {
          // ...state,
          isLoading: false,
          error: true,
          // blockList: {}
          
        };
      }

      case CREATE_CHATMESSAGE_SUCCESS:{
        var chatmessageList = state.chatmessageList;
        var list;
        if(chatmessageList == null && action.createdmessage!=null){
            list=action.createdmessage
         }
         else if(chatmessageList!=null && state.chatmessageList != undefined && action.createdmessage!=null){
           list=(action.createdmessage).concat(state.chatmessageList);
         }
       var newChatMessages=[];
      for(var i=0;i<list.length;i++){
         // alert("@@"+arrMessages[0]);

        var messageData=null;
        var userMessage=null;

        if(list[i].use2._id == action.loginId){
          // alert("@@"+arrMessages[i].message);
         
          // add chat mesage Right
          // userMessage=list[i].use2
                  messageData={
                sent: true,
                 type:list[i].type,
                image:list[i].use2.image,
                firstName:list[i].use2.firstname,
                 lastName:list[i].use2.lastname,
                msg:  list[i].message,
              };
        }else{
           // alert("1");
          console.log("bbbnn1",list[i].use1.image);
          // add chat message left
                  messageData={
                sent: false,
                 type:list[i].type,
                image:list[i].use1.image,
                firstName:list[i].use1.firstname,
                lastName:list[i].use1.lastname,
                msg:  list[i].message,
              } 
        }
      newChatMessages.push(messageData);
      }  
         // alert(JSON.stringify(list));
        return {
          ...state,
          isLoading: false,
          error: false,
          chatmessageList:newChatMessages,
          
        };
      }
      
      case CREATE_CHATMESSAGE_REQUEST: {
        return {
          // ...state,
          isLoading: true,
          error: false,
         
        };
      }
  
      case CREATE_CHATMESSAGE_ERROR: {
        return {
          // ...state,
          isLoading: false,
          error: true,
        
          
        };
      }

      case UPDATE_CHATMESSAGE_SUCCESS:{

        var tmpdataSource=state.chatroomList;
        var list=state.chatroomList;
      // alert(JSON.stringify(action.updatedChatroom))
        if(action.updatedChatroom != null && action.updatedChatroom != undefined){


            for (var i = 0;i < state.chatroomList.length ;i++) {
              if(state.chatroomList[i]['_id'] == action.updatedChatroom._id)
              {
                  tmpdataSource.splice(i,1);
                  var list=tmpdataSource.concat(action.updatedChatroom);      
              }
          
            }
      
        }
         // alert(JSON.stringify(list))
        return {
          ...state,
          isLoading: false,
          error: false,
          chatroomList:list,
          
        };
      }
      
      case UPDATE_CHATMESSAGE_REQUEST: {
        return {
          ...state,
          isLoading: true,
          error: false,
         
        };
      }
  
      case UPDATE_CHATMESSAGE_ERROR: {
        return {
          ...state,
          isLoading: false,
          error: true,
        
          
        };
      }

      default: {
        return state;
      }
    }
  };
  
  export default chatRoomReducer;