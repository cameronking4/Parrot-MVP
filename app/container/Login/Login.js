
import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Image, 
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

import { Toolbar,Icon } from 'react-native-material-ui';

import LoginComponent from '../../components/Login/Login';

import {bindActionCreators} from 'redux';

import * as loginAction from '../../action/loginAction';
import AuthUtility from '../../reducer/lib/AuthUtility';

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class Login extends Component {


componentWillMount(){
  AuthUtility.setKey("journalFirstTime","false",function(){
    AuthUtility.setKey("postAlert","false",function(){
      AuthUtility.setKey("shareAlert","false",function(){
      });
    });
  });
}

  	render() {
        
	  return (

	  	<View style={{flex:1,backgroundColor:color.mainbackground}}>	 
		  	
		  	<StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />               
                  <LoginComponent 
                  navigation={this.props.navigation} 
                  loginAction={this.props.loginAction}
                  login={this.props.login}
                  />

	    </View>
	  );
	}
}


const styles = StyleSheet.create({
  titleText:{
    // fontFamily:'AirbnbCerealApp-Bold',
    fontSize:25,
    lineHeight:55,
    color:color.appTitle,
    textAlign:'left',
    fontWeight:'600',
  },

});


const mapStateToProps = state => {

  return {
    login : state.login,
  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(loginAction));
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),

  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
