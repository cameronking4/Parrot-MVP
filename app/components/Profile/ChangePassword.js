import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, 
  ListView,
  View,  
  Text,
  Dimensions,
  Modal,
  StyleSheet,
  ScrollView,
  InteractionManager,
  TouchableOpacity,
  TextInput,BackHandler,
  Platform
}from 'react-native';
import {Toolbar,Icon} from 'react-native-material-ui';

import ValidationComponent from 'react-native-form-validator';

var Config = require('../../Config');
import AuthUtility from '../../reducer/lib/AuthUtility';
import ApiUtility from '../../reducer/lib/ApiUtility';

var CommonStyle = require('../../style/common');
var color = require('../../style/color.js');

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';


class ChangePassword extends ValidationComponent {

constructor(props) {
  super(props);
  
  this.state = {

    modalVisible : false,

      oldpwd:'',
      newpwd:'',
      cnfrmpwd:'',

      
      checkOldpwd : [],
      checkNewpwd:[],
      checkCnfrmpwd:[],


  };
}

componentWillReceiveProps(nextProps){
    
    if(nextProps.modalVisible != this.state.modalVisible)
    {
      this.setState({
        modalVisible : nextProps.modalVisible
      });

    }
  }
 
componentWillMount(){
  var that=this;
  BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.goBack();
      return true;
    });
}
_onSubmitButton() {

    var that=this;

 // Call ValidationComponent validate method
    var isMyFormValidate =this.validate({
      oldpwd: {required: true,minlength:3},
      newpwd:{required: true,minlength:3},
      cnfrmpwd:{required: true,minlength:3},

    });

    this.setState({
      checkOldpwd : this.getErrorsInField('oldpwd'),
      checkNewpwd : this.getErrorsInField('newpwd'),
      checkCnfrmpwd : this.getErrorsInField('cnfrmpwd')
    
    });

    if(this.state.newpwd !== this.state.cnfrmpwd) {
        alert("Password & confirmPassword must be same");
        return;
    }

     
     if(isMyFormValidate){

      // console.log('this.isFormValid()::',this.isFormValid());
      var bundle = {
          "password" : this.state.oldpwd,
          "new_password" : this.state.newpwd,
          devicetype:'mobile',
          reqSource:'mobile'
        };

      // AuthUtility.getToken(function(token){
      //     ApiUtility.setToken(token);


         // console.log("ChangePassword: getToken: ",token);
    
          var path = Config.API_URL+'/user/change-password';
          
          ApiUtility.fetchAuthPost(path,bundle,function(response){
              console.log("ResetPassword:",response);  

                if(response.success ==false){
                   alert('Invalid Password'); 
                }
                else if(response){
                  alert("Password changed successfully");
                  that.props.navigation.goBack();
                    // that.oncloseModal();
                    // alert('Password Changed Successfully');
                    
                }

              },function(error){

              });    
      // });
  }
  else{
    return;
  } 
}

renderToolbar(){
  // alert(this.props.bottomTab)
  
    return(

       <TouchableOpacity onPress={()=>{this.props.navigation.navigate("HomePage",{listtype:"profile"});}} style={{flexDirection:'row',alignItems:'center'}}>
          <Icon name="arrow-back" color={'#000000'} size={22}/>
          <Text style={{marginLeft:20,textAlign:'center',fontSize:20,fontFamily:'Roboto-Medium',color:'#000',marginRight:10}}>Change Password</Text>
        </TouchableOpacity>
    )
  
}

oncloseModal(){
    this.setState({modalVisible:true});
    this.props.oncloseModal();
}


render() { 

  return (
    
  

      <View style={{height:Screen.height,backgroundColor:'#ffffff',marginTop:Platform.OS=='ios'?20:0}} elevation={5}>
          <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,height:50,justifyContent:'space-between',alignItems:'center'}}>

             {this.renderToolbar()} 

            
            </View>
            <View style={[CommonStyle.hLine,{}]}></View>
{/** 
      <Toolbar
         leftElement="arrow-left"
         centerElement="Change Password"
         // rightElement={['close']}
         onRightElementPress={()=>{
             // this.oncloseModal();
         }}
         style={{
            container: {backgroundColor:color.ColorBack,elevation:0},
            leftElement:{color:'#000000'},
            // rightElement:{color:'#000000'},
            titleText:{
                        color:color.appTitle,
                        // fontFamily:'AirbnbCerealApp-Light',
                      },
         }}
      />
**/}
        <View style={{padding:15}}>
            <Text style={{fontSize:13,color:'#000000',marginBottom:5}}>OLD PASSWORD</Text>
            <TextInput ref="oldpwd" 
                secureTextEntry={true} 
                underlineColorAndroid={this.state.checkOldpwd.length?'red':color.underlineColorAndroid} 
                onChangeText={(oldpwd) => this.setState({oldpwd:oldpwd})} 
                value={this.state.oldpwd}
                style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                { this.state.checkOldpwd ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkOldpwd[0]}</Text> : null}
                
            <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>NEW PASSWORD</Text>
            <TextInput ref="newpwd" 
               
                secureTextEntry={true} 
                underlineColorAndroid={this.state.checkNewpwd.length?'red':color.underlineColorAndroid} 
                onChangeText={(newpwd) => this.setState({newpwd:newpwd})} 
                value={this.state.newpwd}
                style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
             { this.state.checkNewpwd ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkNewpwd[0]}</Text> : null }

            <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>CONFIRM PASSWORD</Text>
            <TextInput ref="cnfrmpwd" 
               
                secureTextEntry={true} 
                underlineColorAndroid={this.state.checkCnfrmpwd.length?'red':color.underlineColorAndroid} 
                onChangeText={(cnfrmpwd) => this.setState({cnfrmpwd:cnfrmpwd})} 
                value={this.state.cnfrmpwd}
                style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
             { this.state.checkCnfrmpwd ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkCnfrmpwd[0]}</Text> : null }

             <View style={{}}>
              <TouchableOpacity onPress={this._onSubmitButton.bind(this)} style={[CommonStyle.actionButtonView,{backgroundColor:color.btnBack,}]}>
                  <Icon name="navigate-next" color={'#ffffff'}  size={32}/>
              </TouchableOpacity>
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

const styles = StyleSheet.create({

modalCloseContainer:{
  width: Screen.width,
  height:Screen.height-240,
  backgroundColor:'rgba(0,0,0,0)',
},

});


ChangePassword.defaultProps = {
  messages : Messages,
  rules:Rules
};


module.exports=ChangePassword;
