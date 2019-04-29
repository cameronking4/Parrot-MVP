//Component file for login

import React, { Component, PropTypes } from 'react';
import {
  Platform, 
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions, 
  ScrollView,
} from 'react-native';

import { Toolbar,Button,Icon } from 'react-native-material-ui';

import ValidationComponent from 'react-native-form-validator';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
var FBLoginView=require('./FBLoginView');

var Config = require('../../Config');
var AuthUtility=require('../../reducer/lib/AuthUtility')
var ApiUtility=require('../../reducer/lib/ApiUtility')
var CommonUtility=require('../../reducer/lib/CommonUtility')

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';

export default class LoginMain extends ValidationComponent {

constructor(props) {
    super(props);
    this.state={

      //Login Form Fields..
      email:'',
      password:'',

      //Login Form validation fields..
      checkEmail : [],
      checkPassword:[],


      //Custom
      disabled:true,


    };
}

componentWillMount(){
  if(this.props.email != ''){
    this.setState({
      email : this.props.email,
      password : this.props.password
    },() => {
      this.onLoginClick()
    });
  }
}

componentWillReceive(nextProps){
      if(nextProps.login.loginData != null){
      
      if(typeof nextProps.login.loginData != undefined && nextProps.login.isLoading==false ){
    
        if(nextProps.login.loginData.success){
          CommonUtility.showToast('welcome');
          nextProps.navigation.navigate('HomePage');
        }
     
      }

      /*if(nextProps.email != ''){
        this.setState({
          email : nextProps.email,
          password : nextProps.password
        },() => {
          this.onLoginClick()
        });

      }*/
   }
}

onLoginClick() {

    var that=this;

 // Call ValidationComponent validate method
    var isMyFormValidate =this.validate({
      email: {required: true,},
      password:{required: true,minlength:4}
    });

    this.setState({
      checkEmail : this.getErrorsInField('email'),
      checkPassword : this.getErrorsInField('password')
    });

    // console.log('this.isFormValid()1::',this.getErrorsInField('email'));
     
     if(isMyFormValidate){
      // this.setState({disabled:false});
      
      console.log('this.isFormValid()::',this.isFormValid());
      var bundle = {
          "email" : this.state.email,
          "password" : this.state.password,
          devicetype:'mobile',
          reqSource:'mobile'
        };
        AuthUtility.getKey("fcmToken",function(fcmToken){
      console.log("iff2",fcmToken);
      var path = Config.API_URL+'/auth/login';
      that.props.loginAction.fetchLoginData(path,bundle,that.props.navigation,fcmToken);
    });
  }
  else{
    return;
  }
}


renderLoginBtn(){
  if(this.state.disabled)
  {
    return(
       <TouchableOpacity onPress={this._onSubmitButton.bind(this)} style={[CommonStyle.actionButtonView,{backgroundColor:'#fff',borderColor:color.fbcolor,borderWidth:1}]}>
          <Icon name="navigate-next" color={'#ffffff'}  size={32}/>
        </TouchableOpacity>
     
    );
  }
  else{
    return(
     <TouchableOpacity onPress={this._onSubmitButton.bind(this)} style={[CommonStyle.actionButtonView,{backgroundColor:'#fff',borderColor:color.fbcolor,borderWidth:1}]}>
          <Icon name="navigate-next" color={'#ffffff'}  size={32}/>
      </TouchableOpacity>
    );
  }
}

fetchFeed(data){

      // var email= data.profile.email;
      // var image=data.profile.picture.data.url;


      var bunch = {
    
      name:data.name,
      email:data.email,
      image:data.picture.data.url,
      devicetype:'mobile',
      reqSource:'mobile'
    };  

      var that =this;

      var path = Config.API_URL+'/auth/social-login';
      ApiUtility.fetchPost(path,bunch,function(response){

       console.log('/auth/social-login:::',response);
        if(response.success == true && response.data.next == 'new')
        {
            that.props.navigation.navigate('RegistrationPasswordPage',{token:response.data.auth.resetpasswordtoken,email:bunch.email,profilePic:bunch.image});
        }
        if(response.success == true && response.data.next == 'login')
        {
             var expiretime=new Date().getTime()+parseInt(response.expiretime); 
              console.log("refres--",response.token);    
              AuthUtility.setToken(response.token,function(){
                AuthUtility.setKey("expiretime",expiretime.toString(),function(){
                  AuthUtility.setKey("refreshtoken",response.refreshtoken,function(){
                    AuthUtility.setKey("userData",JSON.stringify(response.data.user),function(){

                      AuthUtility.setUser(response.data.user);
                      alert(response.message)
                      that.props.navigation.navigate('HomePage');  
                    });
                  });
                });
         
              });
                
        }

       },function(error){
        //  Actions.Actions.Home({ type: 'reset'});
      });

}

  render(){

    var that =this;
      function takeUserData(e){
      
          console.log("FB user:",e);
         
         // var api = `https://graph.facebook.com/me?access_token=${e.credentials.token}`; 
          var api = `https://graph.facebook.com/me?fields=id,name,email,picture,birthday&access_token=${e.credentials.token}`;
         
          fetch(api)
          .then((response) => response.json())
          .then((responseData) => {
            //alert(JSON.stringify(responseData));
           console.log("fb:responseData",responseData);

              if(responseData)
                  that.fetchFeed(responseData);

          })
      }



    return(

          <View style={{flex:1}}>
            

            {/*top part*/}
            <ScrollView>
              <View style={CommonStyle.mainFullScreenContainer}>

                  
                  <View style={{height:Dimensions.get('window').height/4,justifyContent:'center',alignItems:'center'}}>

                      <Image
                     resizeMode="contain"
                     resizeMethod="resize"
                style={{ width: Dimensions.get('window').width-100,height: 260,marign:20,alignSelf: 'center',}}
                source={require('../Images/imgPack.jpg')}
              />

                  </View>


                  <TextInput
                     ref="email"
                      style={[CommonStyle.textInputStyle,{}]}
                      placeholder={"Email"} 
                      autoFocus = {true}
                      placeholderTextColor={color.shadows}
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={(email) => this.setState({email:email})} 
                      value={this.state.email}
                    />
                  { this.state.checkEmail ? <Text style={{color:'red'}}>{this.state.checkEmail[0]}</Text> : null}                    


                <TextInput ref="password"                    
                  style={[CommonStyle.textInputStyle,{marginTop:15,}]}
                  placeholder={"Password"}
                  secureTextEntry={true} 
                  placeholderTextColor={color.shadows}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={(password) => this.setState({password:password})} 
                  value={this.state.password}
                  />
                 { this.state.checkPassword ? <Text style={{color:'red',}}>{this.state.checkPassword[0]}</Text> : null }


                  <TouchableOpacity onPress={()=>this.onLoginClick()} style={[CommonStyle.submitBtn,{marginBottom:15,marginTop:15,backgroundColor:'#fff',borderColor:color.fbcolor,borderWidth:1}]}>
                    <Text style={[CommonStyle.submitBtnText,{color:color.fbcolor}]}>Login</Text>
                  </TouchableOpacity>


                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ForgotPasswordPage')}} style={{flexDirection:'row',marginBottom:10,justifyContent:'center'}}>
                      <Text style={{textAlign:'center',fontSize:14,fontFamily:'Roboto-Light',color:color.text2,marginLeft:10,}}>Forgot your login details? </Text>
                      <Text style={{textAlign:'center',fontSize:14,fontFamily:'Roboto-Bold',color:color.text2,marginRight:10}}>Get help</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection:'row',height:20,alignItems:'center',marginBottom:15}}>
                      <View style={[CommonStyle.hLine,{width:(Dimensions.get('window').width/2)-40,justifyContent:'flex-start'}]}></View>
                            <Text style={{color:color.text2,fontFamily:'Roboto-Medium',marginLeft:10,marginRight:10}}>OR</Text>
                      <View style={[CommonStyle.hLine,{width:(Dimensions.get('window').width/2)-40,justifyContent:'flex-start'}]}></View>
                    </View>



                  {/*  fb button  */}

                  <View style={{justifyContent:'center',alignItems:'center'}}>

                    <View style={Platform.OS=='ios'?styles.loginBtn:{marginBottom:20}}>
                      <FBLogin
                        buttonView={
                          <FBLoginView/>

                        }
                        ref={(fbLogin) => { this.fbLogin = fbLogin }}
                        loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        permissions={["email","user_friends","public_profile","user_birthday",'user_location','user_hometown']}
                        onLogin={function(e){
                          // alert()
                           console.log("onlogin",e);
                           takeUserData(e);
                        }}
                        onLoginFound={function(e){
                          // alert();
                          FBLoginManager.logout((data) => {console.log(data)});
                        }}
                        onLoginNotFound={function(e){console.log("onLoginNotFound",e)}}
                        onLogout={function(e){console.log("logout",e)}}
                        onCancel={function(e){console.log("onCancel",e)}}
                        onPermissionsMissing={function(e){console.log("onPermissionsMissing",e)}}
                      /> 
                    </View>

                  </View>

                </View>

                </ScrollView>
              {/*top part over*/}

                {/*bottom part*/}

                <View style={{justifyContent:'flex-end',height:55}}>

                  <View style={CommonStyle.hLine}></View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('RegistrationPage')} style={{justifyContent:'center',alignItems:'center',height:55}}>

                        <Text style={{color:color.text2,}}>Create a new account? Sign Up</Text>

                    </TouchableOpacity>

                </View>

            </View>
      );
  }
}
 
LoginMain.defaultProps = {
  messages : Messages,
  rules:Rules
};

const styles = StyleSheet.create({
loginBtn:{
  width:Dimensions.get('window').width-50,
  height:50,
  padding:5,
  marginLeft:10,
  marginRight:10,
  marginBottom:10,
  borderColor:'#446bad',
  borderWidth:1,
  borderRadius:5,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  backgroundColor:'#446bad',
},

});


