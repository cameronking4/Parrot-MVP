
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
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';

import { Toolbar,Icon } from 'react-native-material-ui';

import RegistrationPasswordComponent from '../../components/Registration/RegistrationPassword';

import {bindActionCreators} from 'redux';

import * as loginAction from '../../action/loginAction';


var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class RegistrationPassword extends Component {

  constructor(props) {
    super(props);
    this.state={
      
          email:'',
          token:'',
          profilePic:'', 
     
          firstname:'',
          lastname:'',
          username:'',
    };
}

  componentWillMount(){

    const { navigation } = this.props;
    const email = navigation.getParam('email', {});   
    const token =navigation.getParam('token','');
    const profilePic =navigation.getParam('profilePic','');

    const firstname = navigation.getParam('firstname','');   
    const lastname =navigation.getParam('lastname','');
    const username =navigation.getParam('username','');

    console.log("########",firstname,lastname);
    this.setState({username:username,profilePic:profilePic,email:email,token:token,firstname:firstname,lastname:lastname});

  }


  	render() {
        
	  return (

	  	<View style={{flex:1,backgroundColor:color.mainbackground,}}>	 
		  	
    		    <StatusBar
                backgroundColor={color.statusbar}
                barStyle="light-content"
                hidden={false}
            />    
    
            <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10,height:50,alignItems:'center'}}>

              <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{flexDirection:'row',alignItems:'center',marginTop:Platform.OS=='ios'?20:0}}>
                <Icon name="arrow-back" color={'#000000'} size={22}/>
                <Text style={{marginLeft:20,textAlign:'center',fontSize:20,fontFamily:'Roboto-Bold',color:'#000',marginRight:10}}>Registration</Text>
              </TouchableOpacity>

            </View>
  	         	
              <RegistrationPasswordComponent 
                  email={this.state.email}
                  token={this.state.token}
                  profilePic ={this.state.profilePic}

                  firstname={this.state.firstname}
                  lastname={this.state.lastname}
                  username={this.state.username}
                
                  navigation={this.props.navigation} 
        
                  loginAction={this.props.loginAction}
                  login={this.props.login}
              />

	    </View>
	  );
	}
}


const styles = StyleSheet.create({
  titleText:{
    fontFamily:'Roboto-Bold',
    fontSize:25,
    lineHeight:55,
    color:color.appTitle,
    textAlign:'left',
    fontWeight:'600',
  },

});


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
)(RegistrationPassword);
