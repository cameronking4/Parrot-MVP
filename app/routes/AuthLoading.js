import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


import firebase,{type,Notification,NotificationOpen,RemoteMessage} from 'react-native-firebase';

import * as loginAction from "../action/loginAction";

var AuthUtility= require('../reducer/lib/AuthUtility');
var ApiUtility= require('../reducer/lib/ApiUtility');
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

var Config = require("../Config");

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
     this.state = { 
        // _id:"",//user
        fcmToken:null,
      };
  }

  componentWillMount() {
    // this.checkPermission();
  }

componentWillUnmount(){
}



  //  componentDidMount () {
  //   console.log('$$$$z');
  //   SplashScreen.hide();  //for splashscreen
  // }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async (notif) => {
    

    const userToken = await AsyncStorage.getItem('@token:key');
   console.log("userToken::",userToken);
    if(userToken){
      // alert('****'+userToken);


      this.props.navigation.navigate('MatchStack');
    }
    else
      this.props.navigation.navigate('LoginStack');
  };
  
  // Render any loading content that you like here
  render() {
    return (
      <View style={{height:200}}>
        <ActivityIndicator />
      </View>
    );
  }
}

// module.exports = AuthLoadingScreen;


const mapStateToProps = state => {

  return {
    login: state.login,

  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(groupAction));
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),
    
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingScreen);