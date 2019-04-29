
import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TextInput,
  Clipboard,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import RNRestart from 'react-native-restart';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

var Config = require('../../Config');
import AuthUtility from '../../reducer/lib/AuthUtility';
import { connect } from 'react-redux';

import { NavigationEvents } from "react-navigation";


import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import ProfileComponent from '../../components/Profile/Profile';
import ChangePassword from '../../components/Profile/ChangePassword';

import * as profilePostAction from '../../action/profilePostAction';

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class Profile extends Component {


constructor(props) {
    super(props);
    this.state={

      timePassed:false,

      name:'',
      image:'',
      _id:"",

      changePasswordModalVisible:false,
    };
}

 

componentWillMount(){
  // alert('container:componentWillMount:'+this.props.login.loginData.user._id);
  // var path = Config.API_URL+'/user/view';
  // var that=this;
  
  // // setTimeout(() => {this.setState({timePassed: true})}, 1000)

    
  //   if (this.state.timePassed){
  //       // alert("ProfileContainer"+JSON.stringify(this.props.login.loginData))

  //     if(this.props.login.loginData!=null){
  //       if(this.props.login.loginData.user!=null){
  //         this.setState({_id:this.props.login.loginData.user._id});
  //     this.props.loginAction.fetchUserProfile(path,{_id:this.props.login.loginData.user._id,status:'LIVE'});

  //     }

  //   }
  //   }

}



getLoginData(){
   var path = Config.API_URL+'/user/view';
  var that=this;


      if(this.props.login.loginData!=null){
        if(this.props.login.loginData.user!=null){
          this.setState({_id:this.props.login.loginData.user._id});
          this.props.loginAction.fetchUserProfile(path,{_id:this.props.login.loginData.user._id,status:'LIVE'});
          
          // var path = Config.API_URL+'/post/listing';
          // this.props.profilePostAction.fetchPostList(path,{isPagination:false,listtype:'myprofile',user:this.props.login.loginData.user._id},0,false,false,'myprofile'); 
        }

      }
}

gotoLogout(){
    
    var that = this;

    Alert.alert(
    'Logout',
    'Are you sure you want to Logout?',
    [
      {text: 'Logout', onPress: () => {
          AuthUtility.removeToken(function(){
            AuthUtility.clear(function(){
                    that.props.navigation.navigate('LoginPage');       
            });
          });
          RNRestart.Restart();
      }},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    ],
    { cancelable: false }
    )

}

gotoChangePassword(){

  this.setState({changePasswordModalVisible:true});

}

oncloseChangePassword(){

  this.setState({changePasswordModalVisible:false});
  alert('Your password changed successfully');
}

writeToClipboard = async (text) => {
  await Clipboard.setString(text);
  alert('Copied to Clipboard!');
};



    render() {
        
    return (

      <View style={[CommonStyle.platformHeight]}>  
      
        <StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />
        
        <NavigationEvents
          onWillFocus={payload => {
            this.getLoginData()
            }}
        />
             <View style={[CommonStyle.toolbarView,{flexDirection:'row',justifyContent:'space-between'}]}>
                <View style={{justifyContent:'center',paddingLeft:10,alignItems:'center',width:Dimensions.get('window').width-50}}>
                  <Text style={[CommonStyle.toolbarText,{textAlign:"center"}]}>My Profile</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                 {/*   <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Help")}} style={{marginRight:10}}>
                      <Icon name="envelope" size={23} color={color.toolTitleColor} style={{}}/>
                    </TouchableOpacity>
                   

                   <TouchableOpacity onPress={()=>{this.writeToClipboard()}} style={{marginRight:10}}>
                    <Icon name="edit" size={23} color={color.toolTitleColor} style={{}}/>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{this.writeToClipboard()}} style={{marginRight:10}}>
                    <Icon name="save" size={23} color={color.toolTitleColor} style={{}}/>
                  </TouchableOpacity>
                  

                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate("SettingsPage")}} style={{marginRight:10}}>
                    <Icon name="cog" size={23} color={color.toolTitleColor} style={{}}/>
                  </TouchableOpacity>
                  */}
                  
                  <TouchableOpacity onPress={()=>{this.gotoLogout()}} style={{}}>
                    <Icon name="power-off" size={23} color={color.toolTitleColor} style={{}}/>
                  </TouchableOpacity>
                
                </View>
             
            </View>
            <View style={[CommonStyle.hLine,{width:Dimensions.get('window').width,}]}></View>
             
           
            <ProfileComponent 
                  navigation={this.props.navigation}
                  loginId={this.state._id}
                  loginAction={this.props.loginAction}
                  login={this.props.login}
                  profilePostAction={this.props.profilePostAction}
                  profilePost={this.props.profilePost}
                   />
                
{/** 
        // <ChangePassword 
        //     modalVisible={this.state.changePasswordModalVisible} 
        //     oncloseModal={this.oncloseChangePassword.bind(this)}
        // />
**/}
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

  // alert(JSON.stringify(state.login));
  return {
    login : state.login,
    profilePost:state.profilePost
    };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(loginAction));
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),
    profilePostAction : bindActionCreators(
      profilePostAction, dispatch,
    ),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

