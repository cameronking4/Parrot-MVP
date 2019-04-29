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
  Dimensions,BackHandler, I18nManager,ScrollView,ImageBackground

} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Toolbar,Button,Icon } from 'react-native-material-ui';

 
import ValidationComponent from 'react-native-form-validator';

var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var Config = require('../../Config');
 
var Spinner = require('../../Spinner');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
var RegistrationStyle = require('../../style/RegistrationStyle');

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';


class OTPPage extends ValidationComponent {

constructor(props) {
    super(props);
    this.state={
    	otp:'', //Tech@gmail.com
      isLoading:false,
      authotp:'',
      checkauthotp:[],
      disabled:false,
      emailStar:'',
      token:'',
      OTPcode:'',
    };
}

componentWillMount(){
   var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.goBack();
      return true;
    });
  // console.log("OTPPage::",this.props.email);
  const { navigation } = this.props;
  const email = navigation.getParam('email', {});   
  const token =navigation.getParam('token','');
  const OTPcode =navigation.getParam('OTPcode','');
  const profilePic =navigation.getParam('profilePic','');
  // alert('OTPcode'+OTPcode);

  this.setState({token:token,OTPcode:OTPcode});

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
  const email = navigation.getParam('email', {});   
  const token =navigation.getParam('token','');
  const OTPcode =navigation.getParam('OTPcode','');
  const profilePic =navigation.getParam('profilePic','');

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
      else if(this.state.OTPcode == this.state.authotp){
          this.props.navigation.navigate('RegistrationPasswordPage',{token:token,email:email,profilePic:profilePic});
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
          <TouchableOpacity  style={[CommonStyle.submitBtn]}>
              <Text style={CommonStyle.submitBtnText}>Register</Text>
            </TouchableOpacity>
         
        </View>
    );
  }
  else
  {
    console.log('renderfrgtBtn:false',this.state.disabled);
    return(
        <View>
          <TouchableOpacity onPress={()=>this.chkOTP()} style={[CommonStyle.submitBtn]}>
              <Text style={CommonStyle.submitBtnText}>Register</Text>
           </TouchableOpacity> 
        </View>
    );
  }
}


render() {
 
    return (
 
      <View style={{flex:1,backgroundColor:color.mainbackground}}>
        
        <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10,height:50,alignItems:'center'}}>

            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{}}>
              <Icon name="arrow-back" color={'#000000'} size={22}/>
            </TouchableOpacity>

        </View>

        <ScrollView>

          <View style={[CommonStyle.mainFullScreenContainer,{justifyContent:'center',paddingTop:100}]}>

              <TextInput
                  ref="authotp"
                  autoFocus = {true}
                  placeholder={"Email confirmation data*"} 
                    style={[CommonStyle.textInputStyle]}
                    placeholderTextColor={color.shadows}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(authotp) => this.setState({authotp:authotp})} 
                    value={this.state.authotp}

                  />
          
          { this.state.checkauthotp ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkauthotp[0]}</Text> : null}                    
          <Text style={{marginTop:50,color:color.text2,fontFamily:'Roboto-Regular',textAlign:'center',marginBottom:20}}>We send you email confirmation data at {this.state.emailStar}</Text>
         
            {this.renderfrgtBtn()}

          </View>

        </ScrollView>

         {/*bottom part*/}

            <View style={{justifyContent:'flex-end',height:55}}>

              <View style={CommonStyle.hLine}></View>
                <View style={{justifyContent:'center',alignItems:'center',height:55}}>

                    <Text style={{color:color.text2,}}>Already have an account? Log In</Text>

                </View>

            </View>
      </View>
    );
  }
}

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}


OTPPage.defaultProps = {
  messages : Messages,
  rules:Rules
};

module.exports = OTPPage;
