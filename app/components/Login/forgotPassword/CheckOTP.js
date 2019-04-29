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

var ResetPassword = require('./ResetPassword');
import ValidationComponent from 'react-native-form-validator';

import ApiUtility from '../../../reducer/lib/ApiUtility';
import AuthUtility from '../../../reducer/lib/AuthUtility';
var Config = require('../../../Config');

var Spinner = require('../../../Spinner');

var RegistrationStyle = require('../../../style/RegistrationStyle');

var Config = require('../../../Config');

var color = require('../../../style/color.js');
var CommonStyle = require('../../../style/common');

import Rules from '../../../common/validations/rules';
import Messages from '../../../common/validations/messages';



class CheckOTP extends ValidationComponent {

constructor(props) {
    super(props);
    this.state={
    	otp:'', //Tech@gmail.com
      isLoading:false,
      authotp:'',
      checkauthotp:[],
      disabled:false,
      emailStar:'',
    };
}

componentWillMount(){

  const { navigation } = this.props;
  const email = navigation.getParam('email', {});   
  
  // console.log("CheckOTP::",this.props.email);

  var emailStr=email;
  var emailLen=email.length;

  var str1=emailStr[0]+emailStr[1]+emailStr[2];
  var str2='';
  for(var i=3;i<emailLen-3;i++)
  {
    str2=str2+'*';
  }
  var str3=emailStr[emailLen-3]+emailStr[emailLen-2]+emailStr[emailLen-1];
  var str4=str1+str2+str3;

  console.log("***",str1+str2+str3);
  this.setState({emailStar:str4});
}


chkOTP(){

  const { navigation } = this.props;
  const OTPcode = navigation.getParam('OTPcode', {});   
  const _id = navigation.getParam('_id', '');   

  // alert(OTPcode);
  console.log('chkOTP call');
    var that=this;

    var isMyFormValidate =this.validate({
      
      authotp: {required: true},
      
    });

    this.setState({
      checkauthotp : this.getErrorsInField('authotp'),      
    });

    console.log('isMyFormValidate::',isMyFormValidate);
     
    if(isMyFormValidate){

      var value = this.state.authotp ;
      if(value == null)
      {
        return;
      }
      else if(OTPcode == this.state.authotp){
          this.props.navigation.navigate('ResetPassword',{email:this.state.emailStar,_id:_id});    
      }
      else{
        alert("Wrong OTP");
        return;
      }
    }
}

renderfrgtBtn(){

  if(this.state.disabled)
  {
    console.log('renderfrgtBtn:if:',this.state.disabled);
    return(
        <View>
          <TouchableOpacity  style={[CommonStyle.submitBtn,{width:Dimensions.get('window').width-45,marginLeft:3}]}>
            <Text style={CommonStyle.submitBtnText}>Verify OTP</Text>
          </TouchableOpacity>
          
        </View>
    );
  }
  else
  {
    console.log('renderfrgtBtn:false',this.state.disabled);
    return(
        <View>
          <TouchableOpacity onPress={()=>{this.chkOTP()}} style={[CommonStyle.submitBtn,{width:Dimensions.get('window').width-45,marginLeft:3}]}>
            <Text style={CommonStyle.submitBtnText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
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
          centerElement='Verify OTP'
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

           <TextInput ref="authotp"
            autoFocus = {true}
            placeholder={"Enter OTP*"} 
            placeholderTextColor={color.placeholderTextColor} 
            underlineColorAndroid={this.state.checkauthotp.length?'red':color.underlineColorAndroid} 
            onChangeText={(authotp) => this.setState({authotp:authotp})} 
            value={this.state.authotp}
            style={{color:color.textInputColor,}} 
            />
            { this.state.checkauthotp ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkauthotp[0]}</Text> : null}                    

            <Text style={{marginTop:8,color:color.appTitle,fontFamily:'Roboto-Regular',textAlign:'center'}}>We send you one time password at {this.state.emailStar}</Text>

			    <View style={[CommonStyle.loginButtonView,{marginTop:45,}]}>
            {this.renderfrgtBtn()}	   				
  				</View>	 

	        </View>

	    </View>
	  );
	}
}


CheckOTP.defaultProps = {
  messages : Messages,
  rules:Rules
};

const styles = StyleSheet.create({


});

module.exports = CheckOTP;
