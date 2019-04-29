
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
  KeyboardAvoidingView,
  ScrollView,BackHandler
} from 'react-native';

import { connect } from 'react-redux';

import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import ProfileComponent from '../../components/Profile/Profile';
import { Toolbar,Button,Icon } from 'react-native-material-ui';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

import ProfileEditComponent from '../../components/Profile/ProfileEdit';

class ProfileEdit extends Component {

constructor(props) {
    super(props);
    this.state={

      name:'',
      profilePic:'',
      _id:''
    };
}

componentWillMount(){
  var that=this;
  const { navigation } = this.props;
  const name = navigation.getParam('name', '');   
  const profilePic =navigation.getParam('profilePic','');
  const _id =navigation.getParam('_id','');
  const user =navigation.getParam('user','');
  this.setState({name:name,profilePic:profilePic,_id:_id});

  // alert('ProfileEdit'+JSON.stringify(user));
 // BackHandler.addEventListener('hardwareBackPress', function() {
 //      that.props.navigation.navigate("HomePage",{listtype:"profile"});
 //      return true;
 //    });
 // const modalFalse=navigation.getParam("modalFalse",{});
 if(this.props.modalFalse=="false"){
  // this.props.closeModal();
 }
}

  	render() {
        
	  return (

	  	<View style={[CommonStyle.platformHeight]}>	 
		  
		  	<StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />
       <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,height:50,alignItems:'center'}}>
               <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}} style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name="arrow-back" color={'#000000'} size={22}/>
              
              </TouchableOpacity>       
      </View>
        <ScrollView style={{}}>    
	         <KeyboardAvoidingView behavior = {Platform.OS=="ios"?"padding":'padding'}  enabled> 

            <ProfileEditComponent 
              navigation={this.props.navigation} 
              name={this.state.name} 
              profilePic={this.state.profilePic} 
              _id={this.state._id}
              loginAction={this.props.loginAction}
              login={this.props.login}
             />

             </KeyboardAvoidingView>
        </ScrollView>

	    </View>
	  );
	}
}


const styles = StyleSheet.create({
  titleText:{
    // fontFamily:'AirbnbCerealApp-Bold',
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
)(ProfileEdit);


