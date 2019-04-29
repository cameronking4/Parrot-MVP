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

import { Toolbar,Button,Icon } from 'react-native-material-ui';

// var ResetPassword = require('./ResetPassword');
import ValidationComponent from 'react-native-form-validator';

import ApiUtility from '../../reducer/lib/ApiUtility';
import AuthUtility from '../../reducer/lib/AuthUtility';
var Config = require('../../Config');

var Spinner = require('../../Spinner');

var RegistrationStyle = require('../../style/RegistrationStyle');

var Config = require('../../Config');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';



class RegCheckOTP extends ValidationComponent {

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
  const phone = navigation.getParam('phone_number', '');   
  
  // console.log("CheckOTP::",this.props.email);

  var phone_number=phone;
  var phone_numberLen=phone_number.length;

  var str1='***';
  var str2='';
  for(var i=3;i<phone_numberLen-3;i++)
  {
    str2=str2+'*';
  }
  var str3=phone_number[phone_numberLen-3]+phone_number[phone_numberLen-2]+phone_number[phone_numberLen-1];
  var str4=str1+str2+str3;

  console.log("***",str1+str2+str3);
  this.setState({emailStar:str4});
}


chkOTP(){

  const { navigation } = this.props;
  const country_code = navigation.getParam('country_code', '');
  const phone_number = navigation.getParam('phone_number', '');   
  const social = navigation.getParam('social', '');
  const uuid=navigation.getParam('uuid',"");
  
   const token = navigation.getParam('token', ''); 
  
    const email = navigation.getParam('email', ''); 
const profilePic=navigation.getParam('profilePic','');
const firstname=navigation.getParam('firstname','');
const lastname=navigation.getParam('lastname','');
const username=navigation.getParam("username",'');
const name=navigation.getParam('name','');
const socialid=navigation.getParam('socialid','');
  // const socialType = navigation.getParam('socialType', '');  
  // const socialData = navigation.getParam('socialData', '');

  console.log('chkOTP call',email,profilePic,firstname,lastname);
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
      
      else{

      
            var bundle = {
              phone_number : phone_number,
              country_code:country_code,
              type:social,token:value,
            };
          

           
            var that = this;
            var path = Config.API_URL+'/auth/mobileno-verify-check';
            ApiUtility.fetchAuthPost(path,bundle,function(response){
            console.log("RegCheckOTP::",response);  

            if(response.success ==false){
               alert(response.message); 
            }
            else {
              alert("Mobile Number Verified Successfully.");
                 that.props.navigation.navigate('RegistrationPasswordPage',{token:token,username:username,
                  email:email,phone_number:phone_number,country_code:country_code,
                  social:social,profilePic:profilePic,firstname:firstname,lastname:lastname,
                  name:name,socialid:socialid});
            
            }
            
            that.setState({
              isLoading : false
            });

          },function(error){

            that.setState({
              isLoading : false
            });

             // this.props.navigation.navigate('ResetPassword',{email:this.state.emailStar});    
          });
     }
  }
}

renderfrgtBtn(){

    console.log('renderfrgtBtn:false',this.state.disabled);
    return(
        <View style={{marginTop:80,marginBottom:10}}>
          <TouchableOpacity onPress={this.chkOTP.bind(this)} style={[CommonStyle.actionButtonView,{right:20,backgroundColor:color.text3,}]}>
            <Icon name="navigate-next" color={'#ffffff'}  size={32}/>
          </TouchableOpacity>
        </View>
    );

}


  	render() {
    
	  return (

	  	<View style={{flex:1,backgroundColor:color.mainbackground,paddingTop:20}}>   
      
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

        <View style={{justifyContent:'center',paddingRight:10,paddingLeft:10,}}>

           <TextInput ref="authotp"
            autoFocus = {true}
            placeholder={"Enter OTP*"} 
            placeholderTextColor={color.placeholderTextColor} 
            underlineColorAndroid={this.state.checkauthotp.length?'red':color.underlineColorAndroid} 
            onChangeText={(authotp) => this.setState({authotp:authotp})} 
            value={this.state.authotp}
            style={{color:color.textInputColor}} 
            />
            { this.state.checkauthotp ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkauthotp[0]}</Text> : null}                    

            <Text style={{fontSize:13,marginLeft:3,color:color.ColorBack,marginBottom:5,marginTop:5}}>We have sent you one time password at {this.state.emailStar}</Text>

			    <View style={{}}>
            {this.renderfrgtBtn()}	   				
  				</View>	 

	        </View>

	    </View>
	  );
	}
}


RegCheckOTP.defaultProps = {
  messages : Messages,
  rules:Rules
};

const styles = StyleSheet.create({


});

module.exports = RegCheckOTP;
