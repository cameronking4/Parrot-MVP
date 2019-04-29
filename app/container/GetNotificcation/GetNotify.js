
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
} from 'react-native';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import * as getNotiAction from '../../action/getNotiAction';
// import * as blockAction from '../../action/blockAction';
// import * as postAction from '../../action/postAction';

var AuthUtility= require('../../reducer/lib/AuthUtility');
var ApiUtility= require('../../reducer/lib/ApiUtility');

import { Toolbar,Button,Icon,Avatar } from 'react-native-material-ui';


// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import GetNotificationPage from '../../components/GetNotification/GetNotificationPage';

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class GetNotify extends Component {


  componentWillMount(){
    // this.props.loginAction.restoreLoginData();
  }

  // onlogout(){
  //   AuthUtility.removeToken(function(){});
  //   AuthUtility.clear(function(){});
  //   this.props.navigation.navigate('LoginPage');
  // }

  	render() {
        
	  return (

	  	<View style={{flex:1,marginTop:Platform.OS=='ios'?20:0}}>	 
		  
		  	<StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />
    
                  <View
                    style={[
                      CommonStyle.toolbarView,
                      { flexDirection: "row", justifyContent: "center" }
                    ]}
                  >
                    <Text style={[CommonStyle.toolbarText]}>Notification</Text>
                  </View>
           
          	 
                    <GetNotificationPage 
                      navigation={this.props.navigation}
                      loginAction={this.props.loginAction}
                      login={this.props.login}
                      getNotiAction={this.props.getNotiAction}
                      getnoti={this.props.getnoti}
                      // commentAction={this.props.commentAction}
                      // blockAction={this.props.blockAction}
                      // postAction={this.props.postAction}
                    />

	    </View>
	  );
	}
}


const styles = StyleSheet.create({
  titleText:{
    fontFamily:'AirbnbCerealApp-Bold',
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
    getnoti:state.getnoti,
    // comment:state.comment,
  };
  
}

const mapDispatchToProps = dispatch => {
  
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),
    getNotiAction: bindActionCreators(
      getNotiAction, dispatch,
    ),
    // blockAction: bindActionCreators(
    //   blockAction, dispatch,
    // ),
    // postAction : bindActionCreators(
    //   postAction, dispatch,
    // ),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GetNotify);