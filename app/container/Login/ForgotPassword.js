
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

import ForgotPasswordComponent from '../../components/Login/forgotPassword/ForgotPassword';

import {bindActionCreators} from 'redux';

import * as loginAction from '../../action/loginAction';


var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class ForgotPassword extends Component {


  render() {
              
	  return (

	  	<View style={{backgroundColor:color.mainbackground}}>	 
		  	
		  	<StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />
    
    		{/**

					<Toolbar
	            leftElement="arrow-back"
	            centerElement={null}
	            rightElement={null}
           		searchable={null}
	            onLeftElementPress={() =>{ this.props.navigation.goBack();}}
	            style={
	            	{
	                container: {backgroundColor:color.ColorBack,elevation:0},
	                leftElement:{color:'#000000'}
					}
				}
	        />
    		**/}
          
    	        <View style={[CommonStyle.loginContainer,{height:Dimensions.get('window').height-10,}]}>
              
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                  
                </View>

              <ScrollView style={{}}>    
      	       
                  <ForgotPasswordComponent 
                  navigation={this.props.navigation} 
                  loginAction={this.props.loginAction}
                  login={this.props.login}
                  />

              </ScrollView>
              
              </View>

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
)(ForgotPassword);
