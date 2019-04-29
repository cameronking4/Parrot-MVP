//Component file for login

import React, { Component, PropTypes } from 'react';
import {
  AsyncStorage,
  Platform, 
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions, 
  ScrollView,Alert,
} from 'react-native';

import { Toolbar,Button,Icon } from 'react-native-material-ui';

import firebase,{type,Notification,NotificationOpen,RemoteMessage} from 'react-native-firebase';

import ValidationComponent from 'react-native-form-validator';

import IconFA from 'react-native-vector-icons/dist/FontAwesome';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
var FBLoginView=require('./FBLoginView');

import InstagramLogin from 'react-native-instagram-login';

var Config = require('../../Config');
var AuthUtility=require('../../reducer/lib/AuthUtility')
var ApiUtility=require('../../reducer/lib/ApiUtility')
var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';
var LoginModal=require('./LoginModal');

export default class Login extends ValidationComponent {

constructor(props) {
    super(props);
    this.state={

      //Login Form Fields..
      email:'',
      password:'',

      firstname:'',
      lastname:'',

      //Login Form validation fields..
      checkEmail : [],
      checkPassword:[],

      socialType:null,
      socialData:null,

      //Custom
      disabled:true,

       fcmToken:null,
       getInfoModalVisible:false

    };
}
componentWillMount() {
  var that = this;
  // AuthUtility.setKey("isContact",'true',function(){
                that.checkPermission();

            // });
}


async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  

  // let fcmToken = await AsyncStorage.getItem('fcmToken');

  
  firebase.messaging().getToken().then((token) => {
     if (token) {
          // alert('RESET'+fcmToken)
          this.setState({fcmToken:token})
        
          //  var pathUpdt = Config.API_URL+'/user/update';
      
          //  var that=this;
          // AuthUtility.getToken(function(token2){

          //   // alert('AuthLoadingScreen:'+token)
          //      var bundle={
          //       fcm:token,
          //       token:token2
          //         // _id:that.state._id,
          //       };

          //   // console.log("ProfileEdit::response:",bundle);
          //     that.props.loginAction.updateLoginData(pathUpdt,bundle,that.props.navigation,);         

          // });

      }
  });
  

     firebase.messaging().onTokenRefresh((token) => {
      
        
         if (token) {
          this.setState({fcmToken:token})
           var pathUpdt = Config.API_URL+'/user/update';
      
           var that=this;
          AuthUtility.getToken(function(token2){

            // alert('AuthLoadingScreen:'+token)
               var bundle={
                fcm:token,
                token:token2
                  // _id:that.state._id,
                };

            // console.log("ProfileEdit::response:",bundle);
              that.props.loginAction.updateLoginData(pathUpdt,bundle,that.props.navigation,);         

          });
        } 
    });
}

async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}


fetchFeed(data,type){

  console.log("**fetchFeed**",this.state.email);

  if(type == 'instagramid'){
    

    var bunch = {
      type:'instagram',
      instagramid:data.data.id,
      username:data.data.username,
      facebookid:null,
      name:data.data.username,
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email:this.state.email,
      image:data.data.profile_picture,
      devicetype:'mobile',
      reqSource:'mobile',
      'fcm':this.state.fcmToken,
    };
  }
  else{
    var bunch = {
      type:'facebook',
      instagramid:null,
      facebookid:data.id,
      username:data.email,
      name:data.name,
      email:data.email,
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      image:data.picture.data.url,
      devicetype:'mobile',
      reqSource:'mobile',
      'fcm':this.state.fcmToken,
    };
  }
      

      var that =this;

      var path = Config.API_URL+'/auth/social-login';
      ApiUtility.fetchPost(path,bunch,function(response){

       console.log('/auth/social-login:=>',response,data.last_name);

        if(response.success == true && response.data.next == 'new')
        {
          that.props.navigation.navigate('RegGetOTP',{social:bunch.type,username:type == 'instagramid'?data.data.username:data.email,token:response.data.auth.resetpasswordtoken,email:type == 'instagramid'?that.state.email:data.email,
            profilePic:type == 'instagramid'?data.data.profile_picture:data.picture.data.url,firstname:that.state.firstname,lastname:that.state.lastname,
            socialid:type == 'instagramid'?data.data.id:data.id,
            name:type == 'instagramid'?data.data.username:data.name,
        });
            // that.props.navigation.navigate('RegistrationPasswordPage',{username:type == 'instagramid'?data.data.username:data.email,token:response.data.auth.resetpasswordtoken,email:data.email,profilePic:bunch.image,firstname:that.state.firstname,lastname:that.state.lastname});
        }
        if(response.success == true && response.data.next == 'login')
        {
             var expiretime=new Date().getTime()+parseInt(response.expiretime); 
              //console.log("refres--",response.refreshtoken);    
              AuthUtility.setToken(response.token,function(){
                AuthUtility.setKey("expiretime",expiretime.toString(),function(){
                  AuthUtility.setKey("refreshtoken",response.refreshtoken,function(){
                    AuthUtility.setKey("userData",JSON.stringify(response.data.user),function(){    
                      AuthUtility.setUser(response.data.user);
                      console.log("userrrrrr"+JSON.stringify(response.data.user));
                      // alert(response.message)
                          // alert("@@@@@"+response.message)
                          // that.props.navigation.navigate('HomePage');
                          that.props.navigation.navigate('MatchPage');

                    });
                  });
                });
         
              });

        }

       },function(error){
        //  Actions.Actions.Home({ type: 'reset'});
      });

}

oncloseGetInfoModal(email,pwd,bdt){

    if(email == null){
      this.setState({
        getInfoModalVisible:false,
      });  
      return;
    }

    console.log("oncloseGetInfoModal::",email,pwd,bdt);
    this.setState({
      getInfoModalVisible:false,
      birthday:bdt,
      email:email,
      password:pwd,
    },()=>{this.fetchFeed(this.state.socialData,this.state.socialType);});

}


  render(){

    var that =this;
      function takeUserData(e){
      
          console.log("FB user:",e);
         
         // var api = `https://graph.facebook.com/me?access_token=${e.credentials.token}`; 
          var api = `https://graph.facebook.com/me?fields=id,email,name,picture,birthday&access_token=${e.credentials.token}`;
         
          fetch(api)
          .then((response) => response.json())
          .then((responseData) => {
            //alert(JSON.stringify(responseData));
           console.log("fb:responseData",responseData,e);

              if(responseData){
                var arrname=responseData.name.split(' ');
                that.setState({getInfoModalVisible:true,firstname:arrname[0],lastname:arrname[1]==undefined?arrname[0]:arrname[1],socialData:responseData,socialType:'facebookid'});
                  that.fetchFeed(responseData,'facebookid');
              }

          })
      }

      function takeInstaUserData(token){
      
          console.log('takeInstaUserData::',token);
          var api = `https://api.instagram.com/v1/users/self/?access_token=${token}`;
         

          fetch(api)
          .then((response) => response.json())
          .then((responseData) => {
            //alert(JSON.stringify(responseData));
           console.log("insta:responseData",responseData);


              if(responseData){
                var arrname=responseData.data.full_name.split(' ');
                 
                  that.setState({getInfoModalVisible:true,firstname:arrname[0],lastname:arrname[1]==undefined?arrname[0]:arrname[1],socialData:responseData,socialType:'instagramid'});
                  that.fetchFeed(responseData,'instagramid');
              }
                

          })
      }


    return(

          <View style={{flex:1}}> 
            

            {/*top part*/}
            <ScrollView>
            <View style={CommonStyle.mainFullScreenContainer}>
                  
                {/*<LoginModal 
                    
                    modalVisible={this.state.getInfoModalVisible} 
                    oncloseModal={this.oncloseGetInfoModal.bind(this)}
                    
                  />   
                */}
                  <View style={{height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
                     <Image
                      resizeMode="contain"
                      resizeMethod="resize"
                      style={{ width: Dimensions.get('window').width-100,height: 260,marign:20,alignSelf: 'center',}}
                      source={require('../Images/crushd.png')}
                    />
                     
                  </View>

                  {/*  fb button  */}

                  <View style={{justifyContent:'center',alignItems:'center'}}>

        
                      <Text style={{textAlign:'center',fontSize:16,fontFamily:'Roboto-Medium',color:color.text3,fontWeight:'bold',marginLeft:10,marginRight:10}}>Sign in with </Text>

                    <View style={Platform.OS=='ios'?styles.fbloginBtn:{marginBottom:20,marginTop:20}}>

                    <FBLogin
                        buttonView={
                          <FBLoginView/>

                        }

                        ref={(fbLogin) => { this.fbLogin = fbLogin }}
                        loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        permissions={["email","public_profile",]}
                        onError={
                          function(e){console.log("###onError",e)}
                        }
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


                    <View style={{backgroundColor:color.instacolor,borderRadius:7}}>
                        <TouchableOpacity onPress={()=> this.refs.instagramLogin.show()} style={styles.loginBtn}>
                            <IconFA name="instagram" style={{color:"#ffffff",}} size={25}/>
                            <Text style={{color:'#ffffff',marginLeft:8,fontFamily:'Roboto-Medium',marginRight:3,fontSize:18}}>Continue with Instagram</Text>
                        </TouchableOpacity>
                        <InstagramLogin
                            ref='instagramLogin'
                            clientId='9bb7b8ce750c4dbdb68087a5c6583c88'
                            redirectUrl='http://www.techacorn.com/'
                            scopes={['public_content', 'follower_list']}
                            onLoginSuccess={(token) =>{takeInstaUserData(token)} }
                            onLoginFailure={(data) => console.log(data)}
                        />
                    </View>

                    </View>

                    </View>

                </ScrollView>
              {/*top part over*/}

                {/*bottom part*/}

                <View style={{justifyContent:'flex-end',height:55}}>

                  <View style={CommonStyle.hLine}></View>
                    {/*<TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginMainPage',{email:'',password:''})} style={{justifyContent:'center',alignItems:'center',height:55}}>

                        <Text style={{color:color.text2,}}>Already have an account? Log In</Text>

                    </TouchableOpacity>
                    */}
                </View>

            </View>
      );
  }
}
 
Login.defaultProps = {
  messages : Messages,
  rules:Rules
};


const styles = StyleSheet.create({
loginBtn:{
  width:Dimensions.get('window').width-70,
  height:50,
  padding:5,
  marginLeft:10,
  marginRight:10,
  // marginBottom:15,
  borderColor:color.instacolor,
  borderWidth:1,
  borderRadius:5,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  backgroundColor:color.instacolor,
},
fbloginBtn:{
  width:Dimensions.get('window').width-50,
  height:50,
  padding:5,
  marginLeft:10,
  marginRight:10,
  marginBottom:10,
  marginTop:Platform.OS=="ios"?10:0,
  borderColor:'#446bad',
  borderWidth:1,
  borderRadius:5,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  backgroundColor:'#446bad',
},
});


