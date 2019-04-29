//modal to select multiple tags...
// SHARED FILE 

import React, { Component } from 'react';
import {
  Platform, 
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Picker,
  ListView,
  FlatList,
  Modal 
} from 'react-native';

import { Toolbar,Button,Icon,Checkbox,Avatar } from 'react-native-material-ui';
 

import PropTypes from 'prop-types';

import _ from 'lodash';

import moment from 'moment';
import ValidationComponent from 'react-native-form-validator';

var AuthUtility= require('../../reducer/lib/AuthUtility');
var ApiUtility= require('../../reducer/lib/ApiUtility');
var CommonUtility= require('../../reducer/lib/CommonUtility');
var Config = require('../../Config');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');


var Spinner = require('../../Spinner');
 

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';

var DatePickerModal=require('../../common/DatePickerModal');

class LoginModal extends ValidationComponent {

constructor(props) {    

    super(props);

    this.state = { 

      showDate:false,
      datePickerModalVisible:false,
       birthdate:'Birthdate*',      

        isLoading:true,
        modalVisible:false,
      
      email:'',
      password:'',
      confirmpassword:'',

      //Login Form validation fields..
      checkEmail : [],
      checkPassword:[],
      checkConfirmPassword:[],


    };

}


oncloseDatePickerModal(bdate){

    this.setState({
        birthdate:bdate,
        datePickerModalVisible : false,
      }); 

  }

 showDatePicker(){
        this.setState({
          datePickerModalVisible:true
        })
  }


componentWillReceiveProps(nextProps){
    
    if(nextProps.modalVisible != this.state.modalVisible)
    {
      this.setState({
        modalVisible : nextProps.modalVisible,              
        
      });
      if(nextProps.modalVisible == true){
        this.setState({
          email:'',
          password:'',
          confirmpassword:'',
          birthdate:'Birthdate*'
        });
      }
    }
    
  }
 
oncloseModal(type){
    
  if(type == "back"){
      this.setState({modalVisible : false,});
      this.props.oncloseModal(null,null,null);
      return;
  }

    var that=this;

 // Call ValidationComponent validate method
    var isMyFormValidate =this.validate({
      email: {required: true,email:true},
      password:{required: true,minlength:4},
      confirmpassword:{required: true,minlength:4}
    });

    this.setState({
      checkEmail : this.getErrorsInField('email'),
      checkPassword : this.getErrorsInField('password'),
      checkConfirmPassword : this.getErrorsInField('confirmpassword')
    });


    // console.log('this.isFormValid()1::',this.getErrorsInField('email'));


    if(this.state.birthdate == "Birthdate*"){
      alert("Birthdate is required");
      return;
    }

    if(this.state.password != this.state.confirmpassword){
      alert("password and confirmpassword must be same");
      return;
    }

    if(isMyFormValidate){

      this.setState({modalVisible : false,});
      this.props.oncloseModal(this.state.email,this.state.password,this.state.birthdate);

    }
}



  render() {

    return (

     <Modal animationType = {"slide"} transparent = {true}
               visible = {this.state.modalVisible}
               onRequestClose = {() =>{this.oncloseModal('back');}}
      >
 
        <Toolbar
            leftElement="arrow-back"
            // isSearchActive={true} 
            centerElement="Required Information"
            onLeftElementPress={() =>{this.oncloseModal('back');}}
           style={{
              container: {backgroundColor:color.ColorBack,elevation:0},
              leftElement:{color:color.toolTitleColor},
              rightElement:{color:color.toolTitleColor},
              titleText:{
                          color:color.toolTitleColor,
                          // fontFamily:'SFMedium',
                        },
           }}
        />

        <ScrollView>
        <View style={{height:Platform.OS=='ios'?Screen.height-10:Screen.height-25,marginTop:Platform.OS=='ios'?10:0,backgroundColor:color.mainbackground,padding:15}} elevation={5}>
                <TextInput
                   ref="email"
                    style={[CommonStyle.textInputStyle,{}]}
                    placeholder={"Email*"} 
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
                  placeholder={"Password*"}
                  secureTextEntry={true} 
                  placeholderTextColor={color.shadows}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={(password) => this.setState({password:password})} 
                  value={this.state.password}
                  />
                 { this.state.checkPassword ? <Text style={{color:'red',}}>{this.state.checkPassword[0]}</Text> : null }

                 <TextInput ref="confirmpassword"                    
                  style={[CommonStyle.textInputStyle,{marginTop:15,}]}
                  placeholder={"Confirm Password*"}
                  secureTextEntry={true} 
                  placeholderTextColor={color.shadows}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={(confirmpassword) => this.setState({confirmpassword:confirmpassword})} 
                  value={this.state.confirmpassword}
                  />
                 { this.state.checkConfirmPassword ? <Text style={{color:'red',}}>{this.state.checkConfirmPassword[0]}</Text> : null }

              
                <TouchableOpacity onPress={()=>this.showDatePicker()} style={[CommonStyle.textInputStyle,{marginTop:15,paddingTop:5}]}>
                      <Text numberOfLines={2} style={{fontSize:18,justifyContent:'center',marginTop:5,color:this.state.birthdate=="Birthdate*"?color.grey6:'#000'}}>{this.state.birthdate}</Text>
                </TouchableOpacity>

                <DatePickerModal 
                 modalVisible={this.state.datePickerModalVisible} 
                 oncloseModal={this.oncloseDatePickerModal.bind(this)}
                />
            

                <TouchableOpacity onPress={()=>this.oncloseModal()} style={{marginTop:10,justifyContent:'center',alignItems:'center',backgroundColor:color.text3,borderRadius:8,height:55}}>
                  <Text style={{color:"#ffffff",fontSize:20,}}>Save</Text>
                </TouchableOpacity>
    
          </View>

          </ScrollView>
    </Modal>

    );
  }
  
}

LoginModal.defaultProps = {
  messages : Messages,
  rules:Rules
};


const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const styles = StyleSheet.create({

tabBtn:{
  // backgroundColor:'yellow',
  borderWidth:1,
  borderColor:'grey',
  marginLeft:20,
  marginRight:20,
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center'
}

  
});

module.exports = LoginModal;
