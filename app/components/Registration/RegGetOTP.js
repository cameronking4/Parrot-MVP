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
  KeyboardAvoidingView  ,
  ScrollView
} from 'react-native';

import { Toolbar,Button ,Icon} from 'react-native-material-ui';

import PhoneNumberPicker from 'react-native-country-code-telephone-input'

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

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';



class RegGetOTP extends ValidationComponent {


constructor(props) {
    super(props);

    this.state = { 

        authemail:'',
        checkauthemail : [],
        isLoading:false,
        disabled:false,
        
      phoneNo:null,    
      callingCode:null
    };

}

componentWillReceiveProps(nextProps){
  var that=this;
 
  if(nextProps.login.loginData != null){

    if(typeof nextProps.login.loginData != undefined && nextProps.login.isLoading==false){
    if(nextProps.login.loginData!=null){
      if(nextProps.login.loginData.success){
          // alert(JSON.stringify(nextProps.login.loginData.message));
            // alert(val);
            that.props.navigation.navigate('PackagePage');
         
      }
    }
    }
  }
}


gotoCheckOTP(){

    const { navigation } = this.props;
    const social = navigation.getParam('social','');
    const username = navigation.getParam('username', '');
    const token = navigation.getParam('token', ''); 
    const email = navigation.getParam('email', ''); 
const profilePic=navigation.getParam('profilePic','');
const firstname=navigation.getParam('firstname','');
const lastname=navigation.getParam('lastname','');

const name=navigation.getParam('name','');
const socialid=navigation.getParam('socialid','');
    console.log('social::',social);
    var that=this;

    if(this.state.phoneNo != null){
        
      if(social !== undefined){

       var bundle = {
            type:social,
            phone_number : this.state.phoneNo,
            country_code:'+'+this.state.callingCode,
          };
  

        
      var that = this;
      var path = Config.API_URL+'/auth/mobileno-verify-request';

      ApiUtility.fetchAuthPost(path,bundle,function(response){
        console.log("RegGetOTP::",response);  

        if(response.success ==false){
          alert(response.message)
         
        }
      
        else if(response.success==true){
          alert(response.message);
             that.props.navigation.navigate('RegCheckOTP',{
              username:username,
              phone_number:that.state.phoneNo,
              country_code:'+'+that.state.callingCode,
              social:social,
              uuid:response.uuid,
              token:token,email:email,
              profilePic:profilePic,firstname:firstname,lastname:lastname,
              name:name,
              socialid:socialid,
            });
        
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

  else{
    alert('enter mobile number')
  }
}


bypassLogin(response){


  // console.log('bypassLogin::',data)
    var bundle = {
        'logintype':'social',
        "mobileno" : response.data.auth.mobileno,
        "password" : '',
      };

    var path = Config.API_URL+'/auth/login';
    this.props.loginAction.fetchLoginData(path,bundle);
}

 PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
    this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
 }


  	render() {
    // alert(this.props.login.loginData.success)
    if(this.props.login.loginData != null){

      if(typeof this.props.login.loginData != undefined && this.props.login.isLoading==false){
      if(this.props.login.loginData!=null){
        if(this.props.login.loginData.success){
            // alert(JSON.stringify(this.props.login.loginData.message));
              this.props.navigation.navigate('PackagePage');
           
        }
      }
      }
    }
	  return (

	  	<View style={{flex:1,backgroundColor:color.mainbackground,paddingTop:20}}>   
      
        <StatusBar
          backgroundColor={color.statusbar}
          barStyle="light-content"
          hidden={false}
        />
    
        <Toolbar
          leftElement='arrow-back'
          centerElement='Verify your mobile number'
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

         <View style={{padding:20}}>

              <Text style={{fontSize:16,color:'#000000',marginTop:5}}>MOBILE NUMBER</Text>
              <PhoneNumberPicker
               countryHint={{name: 'India', cca2: 'IN', callingCode:"91"}}
               onChange={this.PhoneNumberPickerChanged.bind(this)}/>

              { this.state.checkmobileno ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkmobileno[0]}</Text> : null }

       
              <Text style={{fontSize:13,color:color.ColorBack,marginBottom:5,marginTop:5}}>You will get OTP on given number</Text>

             
          </View>
           <View style={{marginTop:50,marginBottom:10,alignItems:"flex-end"}}>
                <TouchableOpacity onPress={this.gotoCheckOTP.bind(this)} style={[CommonStyle.actionButtonView,{backgroundColor:color.text3,}]}>
                  <Icon name="navigate-next" color={'#ffffff'}  size={32}/>
                </TouchableOpacity>
              </View>
      </View>
	  );
	}
}


RegGetOTP.defaultProps = {
  messages : Messages,
  rules:Rules
};


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
  )(RegGetOTP);


// module.exports = RegGetOTP;

