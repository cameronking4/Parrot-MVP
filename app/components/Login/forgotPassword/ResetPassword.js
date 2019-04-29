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
  ListView,
} from 'react-native';


import { Toolbar,Button } from 'react-native-material-ui';

import ValidationComponent from 'react-native-form-validator';

import ApiUtility from '../../../reducer/lib/ApiUtility';
import AuthUtility from '../../../reducer/lib/AuthUtility';
import CommonUtility from '../../../reducer/lib/CommonUtility';

var Config = require('../../../Config');

var Spinner = require('../../../Spinner');

var RegistrationStyle = require('../../../style/RegistrationStyle');

var Config = require('../../../Config');

var color = require('../../../style/color.js');
var CommonStyle = require('../../../style/common');

import Rules from '../../../common/validations/rules';
import Messages from '../../../common/validations/messages';

// var LoginPage = require('../login/LoginPage');



class ResetPassword extends ValidationComponent {

constructor(props) {
    super(props);
    this.state={
    	email:'', //Tech@gmail.com
      isLoading:false,
      user_id:'',
      disabled:false,

      authpassword:'',
      authconfirmpassword:'',

      checkauthpassword:[],
      checkauthconfirmpassword:[]

    };
}

gotoSetPwd(){


    const { navigation } = this.props;
    const _id = navigation.getParam('_id', '');
    // const phone_number = navigation.getParam('phone_number', '');   

    var that=this;

    var isMyFormValidate =this.validate({
      
      authpassword: {required: true},
      authconfirmpassword:{required: true}
      
    });

    this.setState({
      checkauthpassword : this.getErrorsInField('authpassword'),      
      checkauthconfirmpassword : this.getErrorsInField('authconfirmpassword'),      
    });

    console.log('isMyFormValidate::',isMyFormValidate);
     
    if(isMyFormValidate){

          if(this.state.authpassword !== this.state.authconfirmpassword) {
              alert("Password & confirmPassword must be same");
              return;
          }

        	var that = this;
        	this.setState({
        	    isLoading : true
        	});
            
          var bundle = {
              "user_id" : _id,
              "password": this.state.authpassword
          };

          var path = Config.API_URL+'/auth/change-password';
          ApiUtility.fetchPost(path,bundle,function(response){
          console.log("ResetPassword:",response);  

            if(response.success ==false){
              console.log('Login::response::',response);
               alert('Please try again'); 
            }
            else if(response){
                CommonUtility.showToast(response.message);
                that.props.navigation.navigate('LoginPage');
            }

            that.setState({
              isLoading : false
            });



          },function(error){

            that.setState({
              isLoading : false
            });
          });    
      }
}

renderPwdBtn(){
  if(this.state.disabled)
  {
    return(
      <TouchableOpacity style={[CommonStyle.submitBtn,{width:Dimensions.get('window').width-45,marginLeft:3}]}>
        <Text style={CommonStyle.submitBtnText}>Save Password</Text>
      </TouchableOpacity>
    );
  }
  else
  {
    return(
      <TouchableOpacity onPress={this.gotoSetPwd.bind(this)} style={[CommonStyle.submitBtn,{width:Dimensions.get('window').width-45,marginLeft:3}]}>
        <Text style={CommonStyle.submitBtnText}>Forgot Password</Text>
      </TouchableOpacity>
    );
  }
}

  	render() {
    
	  return (

	  	<View style={{flex:1,backgroundColor:color.mainbackground}}>   
      
        <StatusBar
          backgroundColor={color.statusbar}
          barStyle="light-content"
          hidden={false}
        />
    
        <Toolbar
          leftElement="arrow-back"
          centerElement='Reset Password'
          rightElement={null}
          searchable={null}
          onLeftElementPress={() =>{ this.props.navigation.goBack();}}
          style={
            {
              container: {backgroundColor:color.ColorBack,elevation:0},
              leftElement:{color:color.textInputColor},
              titleText:{
                color:color.textInputColor,
                // fontFamily:'AirbnbCerealApp-Light',
              },
              centerElementContainer:{
                 // alignItems:'center'
              },
            }
          }
         />

        <View style={{justifyContent:'center',paddingLeft:20,paddingRight:20,paddingTop:10}}>

           <TextInput ref="authpassword"
            autoFocus = {true}
            placeholder={"Password*"} 
            secureTextEntry={true} 
            placeholderTextColor={color.placeholderTextColor} 
            underlineColorAndroid={this.state.checkauthpassword.length?'red':color.underlineColorAndroid} 
            onChangeText={(authpassword) => this.setState({authpassword:authpassword})} 
            value={this.state.authpassword}
            style={{color:color.textInputColor,}} 
            />
            { this.state.checkauthpassword ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkauthpassword[0]}</Text> : null}                    

          <TextInput ref="authconfirmpassword"
            placeholder={"Confirm Password*"} 
            secureTextEntry={true} 
            placeholderTextColor={color.placeholderTextColor} 
            underlineColorAndroid={this.state.checkauthconfirmpassword.length?'red':color.underlineColorAndroid} 
            onChangeText={(authconfirmpassword) => this.setState({authconfirmpassword:authconfirmpassword})} 
            value={this.state.authconfirmpassword}
            style={{color:color.textInputColor,}} 
            />
            { this.state.checkauthconfirmpassword ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkauthconfirmpassword[0]}</Text> : null}                    

			    <View style={[CommonStyle.loginButtonView,{marginTop:45,}]}>
            {this.renderPwdBtn()}	   			
  				</View>	 

	        </View>

	    </View> 
	  );
	}
}


ResetPassword.defaultProps = {
  messages : Messages,
  rules:Rules
};

const styles = StyleSheet.create({


});

module.exports = ResetPassword;
