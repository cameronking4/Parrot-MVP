
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

import LoginMainComponent from '../../components/Login/LoginMain';

import {bindActionCreators} from 'redux';

import * as loginAction from '../../action/loginAction';

import AuthUtility from '../../reducer/lib/AuthUtility';

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class LoginMain extends Component {

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

          <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10,height:50,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{}}>
              <Icon name="arrow-back" color={'#000000'} size={22}/>
            </TouchableOpacity>
          </View>
    

                  <LoginMainComponent 
                  navigation={this.props.navigation} 
                  loginAction={this.props.loginAction}
                  login={this.props.login}
                  
                  email={this.props.navigation.state.params.email||''}
                  password={this.props.navigation.state.params.password||''}
                  
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
  // alert(JSON.stringify(LoginMainAction));
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),

  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginMain);
