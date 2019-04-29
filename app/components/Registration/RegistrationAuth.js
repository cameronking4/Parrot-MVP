//Auth by email
 
import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,BackHandler, I18nManager,ScrollView,ImageBackground
} from 'react-native';


import { Toolbar,Button,Avatar } from 'react-native-material-ui';
 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';

var AuthUtility= require('../../reducer/lib/AuthUtility');
var ApiUtility= require('../../reducer/lib/ApiUtility');
var CommonUtility= require('../../reducer/lib/CommonUtility');
var Config = require('../../Config');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
var RegistrationStyle = require('../../style/RegistrationStyle');

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';

var picOptions = {
  title: 'Select Avatar',
  // customButtons: [
  //   {name: 'fb', title: 'Choose Photo from Facebook'},
  // ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};



class RegistrationAuth extends ValidationComponent {

constructor(props) {
    super(props);

    this.state = { 

      	authemail:'',
        checkauthemail : [],
        profilePic:'',      	
    };

}

// imagePick(){
//   var that=this;
//     ImagePicker.showImagePicker(picOptions, (response) => {
//       console.log('Response = ', response);
//       // console.log("data::",response.uri);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       }
//       else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       }
//       else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       }
//       else {
//         let source = { uri: response.uri }; 
//        // console.log("chk uri::",response.uri);
//        // alert(JSON.stringify(response.uri));
//         this.setState({
//           // avatarSource: source,
//           profilePic:response.uri,
//         });


//       var extension=CommonUtility.fileExtensionExtractor(response.uri);
//           // console.log('that.state.:',);
//           var path = Config.API_URL+'/user/save-image';       
//           var that = this;

//           ApiUtility.saveImage(path,'file',
//             response.uri,function(response){
          
//                 if(response)
//                 {
//                   that.setState({profilePic:response.data.Newimgpath});
//                 }      

//           },function(error){
//               alert('Error in image selection');
//           });


//       }
//     });
// }



componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.goBack();
      return true;
    });
}

onAuthEmailSubmit() {

    var that=this;

    var isMyFormValidate =this.validate({
      
      authemail: {required: true,email: true},
      
    });


    this.setState({
      checkauthemail : this.getErrorsInField('authemail'),      
    });

    // console.log('this.isFormValid()1::',this.getErrorsInField('regemail'));
     
     if(isMyFormValidate){
      // console.log('this.isFormValid()::',this.isFormValid());
      // alert(this.state.authemail)
      var bunch = {

        email:this.state.authemail,
        devicetype:'mobile',
        };

        that.setState({
          isLoading : false
        });

        var path = Config.API_URL+'/auth/create';
        ApiUtility.fetchPost(path,bunch,function(response){
          
          if(response.success)
          {
              console.log("RegistrationAuth::response:",response.data.resetpasswordtoken);
              AuthUtility.setKey("resetTokenUser",response.data.resetpasswordtoken,function(){
                
              });
              that.props.navigation.navigate('OTPPage',{token:response.data.resetpasswordtoken,OTPcode:response.OTPcode,email:that.state.authemail,profilePic:that.state.profilePic});
          } 
          else{
            alert(response.message);
          }    
                
        },function(error){
            that.setState({
              isLoading: false
            });
        });


          
    }
    else{
      return;
    }
  }


renderLoginBtn(){
 
    return(
      <TouchableOpacity onPress={this.onAuthEmailSubmit.bind(this)} style={[CommonStyle.submitBtn,{width:Dimensions.get('window').width-25,marginLeft:3}]}>
      	<Text style={CommonStyle.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    );
 
}

render() {

  // alert(this.state.profilePic)
  return (

      <View style={{flex:1}}>
        <ScrollView>
          
          <View style={CommonStyle.mainFullScreenContainer}>
              <View style={{height:200,justifyContent:'center',alignItems:'center',marginBottom:20}}>

              {/* <TouchableOpacity onPress={()=>{this.imagePick()}} style={{justifyContent:'center',alignItems:'center',width:150,height:150,backgroundColor:color.imageBack,borderRadius:75,}}>

                          <Image  
                              resizeMethod="resize"                                
                              source={{uri:this.state.profilePic}}  
                              style={{height:150,width:150,borderRadius:75}}
                              resizeMode='cover'
                          />

                  </TouchableOpacity>*/}  

              </View>


              <TextInput
               ref="authemail"
                style={[CommonStyle.textInputStyle]}
                placeholder={"Enter Email*"} 
                autoFocus = {true}
                placeholderTextColor={color.shadows}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(authemail) => this.setState({authemail:authemail})} 
                value={this.state.authemail}

              />
            { this.state.checkauthemail ? <Text style={{color:'red',marginBottom:20}}>{this.state.checkauthemail[0]}</Text> : null}                    

            
            <TouchableOpacity onPress={()=>this.onAuthEmailSubmit()} style={[CommonStyle.submitBtn]}>
              <Text style={CommonStyle.submitBtnText}>Next</Text>
            </TouchableOpacity>
         
          </View>

        </ScrollView>

         {/*bottom part*/}

            <View style={{justifyContent:'flex-end',height:55}}>

              <View style={CommonStyle.hLine}></View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginMainPage',{email:'',password:''})} style={{justifyContent:'center',alignItems:'center',height:55}}>

                        <Text style={{color:color.text2,}}>Already have an account? Log In</Text>

                </TouchableOpacity>
              </View>

      </View>
 
    );
  }
  
}


const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}


RegistrationAuth.defaultProps = {
  messages : Messages,
  rules:Rules
};



module.exports = RegistrationAuth;
