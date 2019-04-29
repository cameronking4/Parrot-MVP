import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import postReducer from "./postReducer";

import profilePostReducer from "./profilePostReducer";
import postDetailReducer from "./postDetailReducer";
import favReducer from "./favReducer";

import matchReducer from "./matchReducer";
import matchDetailReducer from "./matchDetailReducer";
import matchUserPostListReducer from "./matchUserPostListReducer";

import userReducer from "./userReducer";
import chatRoomReducer from "./chatRoomReducer";
import notificationReducer from "./notificationReducer";
import getNotiReducer from "./getNotiReducer";

// Root Reducer
const rootReducer = combineReducers({
  login: loginReducer,
  post: postReducer,
  profilePost:profilePostReducer,
  postDetail: postDetailReducer,
  fav: favReducer,
  match: matchReducer,
  matchDetail: matchDetailReducer,
  matchUserPostList: matchUserPostListReducer,
  user: userReducer,
  notify: notificationReducer,
  chatRoom: chatRoomReducer,
  getnoti:getNotiReducer,
});

export default rootReducer;

/*
import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/es/storage'

import login from './loginReducer';
import post from './postReducer';
import postDetail from './postDetailReducer';
import fav from './favReducer';


const config = {
  key: 'root',
  storage,
}
 
export default  persistCombineReducers(config, {
  post,
  login,
  postDetail,
  fav
});
*/
