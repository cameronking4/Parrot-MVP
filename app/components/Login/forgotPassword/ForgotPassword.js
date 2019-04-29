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
  
} from 'react-native';

import { Toolbar,Button } from 'react-native-material-ui';

 

import ValidationComponent from 'react-native-form-validator';

import ApiUtility from '../../../reducer/lib/ApiUtility';
import AuthUtility from '../../../reducer/lib/AuthUtility';
var Config = require('../../../Config');

var Spinner = require('../../../Spinner');
var CheckOTP = require('./CheckOTP');

var RegistrationStyle = require('../../../style/RegistrationStyle');

var Config = require('../../../Config');

var color = require('../../../style/color.js');
var CommonStyle = require('../../../style/common');

import Rules from '../../../common/validations/rules';
import Messages from '../../../common/validations/messages';


class ForgotPassword extends ValidationComponent {


constructor(props) {
    super(props);

    this.state = { 

        authemail:'',
        checkauthemail : [],
        isLoading:false,
        disabled:false,
      
    };

}

onAuthEmailSubmit(){

    var that=this;

    var isMyFormValidate =this.validate({
      
      authemail: {required: true,},
      
      
    });

    this.setState({
      checkauthemail : this.getErrorsInField('authemail'),      
      
    });

    // console.log('this.isFormValid()1::',this.getErrorsInField('regemail'));

    if(isMyFormValidate){
      // console.log('this.isF
        var that = this;
        this.setState({
            isLoading : true
        });
        
        var bundle = {
          email: this.state.authemail,
        };

        var that = this;
      var path = Config.API_URL+'/auth/send-otp';
      ApiUtility.fetchAuthPost(path,bundle,function(response){
        console.log("FrgtPassword:re",response);  

        if(response.success ==false){
           alert('Invalid User'); 
        }
        else if(response.OTPcode != ''){
          
             that.props.navigation.navigate('CheckOTP',{OTPcode:response.OTPcode,email:that.state.authemail,_id:response.userdata._id});
        
        }
        else{

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

loader(){
    if(this.state.isLoading)
      {
        return(
          <Spinner />
        );
    }
}

renderfrgtBtn(){
  if(this.state.disabled)
  {
    return(
      <TouchableOpacity onPress={this.onAuthEmailSubmit.bind(this)} style={[CommonStyle.submitBtn,{alignItems:"center",justifyContent:"center"}]}>
        <Text style={CommonStyle.submitBtnText}>Forgot Password</Text>
      </TouchableOpacity>
    );
  }
  else{
    return(
      <TouchableOpacity onPress={()=>{this.onAuthEmailSubmit()}} style={[CommonStyle.submitBtn,{alignItems:"center",justifyContent:"center"}]}>
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
          centerElement='Forgot Password'
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

       <View style={{justifyContent:'center',paddingLeft:20,paddingRight:20}}>

            
            <TextInput ref="authemail"
            placeholder={"Email*"} 
            placeholderTextColor={color.placeholderTextColor} 
            underlineColorAndroid={this.state.checkauthemail.length?'red':color.underlineColorAndroid} 
            onChangeText={(authemail) => this.setState({authemail:authemail})} 
            value={this.state.authemail}
            style={{color:color.textInputColor,}} 
            autoCapitalize="none"
            keyboardType='email-address'
            />
            { this.state.checkauthemail ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkauthemail[0]}</Text> : null}                    


          <View style={[CommonStyle.loginButtonView,{marginTop:45,}]}>
            {this.renderfrgtBtn()}
          </View>  

            {this.loader()}
          </View>

      </View>
	  );
	}
}


ForgotPassword.defaultProps = {
  messages : Messages,
  rules:Rules
};

const styles = StyleSheet.create({


});

module.exports = ForgotPassword;
