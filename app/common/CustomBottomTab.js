
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
import * as loginAction from '../action/loginAction';


var AuthUtility= require('../reducer/lib/AuthUtility');
var ApiUtility= require('../reducer/lib/ApiUtility');

import { Toolbar,Icon } from 'react-native-material-ui';

import Icons from 'react-native-vector-icons/dist/FontAwesome';
import HomeComponent from '../components/Home/Home';

var color = require('../style/color.js');
var CommonStyle = require('../style/common');

import * as postAction from '../action/postAction';
import * as favaction from '../action/favaction';
import * as bookmarkAction from '../action/bookmarkAction';
import * as blockAction from '../action/blockAction';
import * as friendRequestAction from '../action/friendRequestAction';



class CustomBottomTab extends Component {

constructor(props) {
    super(props);
    this.state={
        listtype:'postlist',    
    }
}

  componentWillMount(){
    // alert('!!!')
    // this.props.loginAction.restoreLoginData();
  }

  // componentWillReceiveProps(nextProps){
  //   alert('home..$$$$:nextProps.::')
  //         // this.getAllData();     
  // }

  onlogout(){
    AuthUtility.removeToken(function(){});
    AuthUtility.clear(function(){});
    this.props.navigation.navigate('LoginPage');
  }

onBtnPress(type){
  this.setState({listtype:type})
  this.props.onBtnPress(type)
}

  	render() {
         
	  return (

	   <View style={{flex:1,justifyContent:'flex-end',}}>  
                   
                    
                    <View style={{height:50,backgroundColor:color.statusbar,flexDirection:'row',justifyContent:'space-between'}}>
                   
                      <TouchableOpacity onPress={()=>this.onBtnPress('postlist')} style={[styles.tabBtn]}> 
                        <Icon name="home" size={28} color={this.state.listtype=='postlist'?"black":"green"} style={{}} />
                        {/*<Text>Home</Text>*/}
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>this.onBtnPress('bookmark')} style={styles.tabBtn}> 
                        <Icon name="bookmark" size={28} color={this.state.listtype=='bookmark'?"black":"green"} style={{}} />
                        {/*<Text>Book</Text>*/}
                      </TouchableOpacity>

{/*                      <TouchableOpacity onPress={()=>this.onBtnPress('createPost')} style={styles.tabBtn}> 
                        <Icon name="add-circle-outline" size={28} color={this.state.listtype=='addPost'?"black":"green"} style={{}} />
                     
                      </TouchableOpacity>
*/}
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreatePost')} style={styles.tabBtn}> 
                        <Icon name="add-circle-outline" size={28} color={this.state.listtype=='addPost'?"black":"green"} style={{}} />
                      </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatRoom')} style={styles.tabBtn}> 
                        <Icon name="message" size={28} color={this.state.listtype=='addPost'?"black":"green"} style={{}} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.onBtnPress('notification')} style={styles.tabBtn}> 
                        <Icon name="notifications" size={28} color={this.state.listtype=='notification'?"black":"green"} style={{}} />
                        {/*<Text>Book</Text>*/}
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>this.onBtnPress('myprofile')} style={styles.tabBtn}> 
                        <Icon name="person" size={28} color={this.state.listtype=='profile'?"black":"green"} style={{}} />
                        {/*<Text>Book</Text>*/}
                      </TouchableOpacity>
                   
                    </View>


	    </View>
	  );
	}
}


const styles = StyleSheet.create({

tabBtn:{
  // backgroundColor:'yellow',
  paddingLeft:10,
  paddingRight:10,
  justifyContent:'center',
  alignItems:'center'
}
 
});


// module.exports = Home;
const mapStateToProps = state => {
  // alert(JSON.stringify(state.login));
  return {
    login : state.login,
    post : state.post,
  };
}

const mapDispatchToProps = dispatch => {
  
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),
     postAction : bindActionCreators(
      postAction, dispatch,
    ),
    favaction: bindActionCreators(
      favaction, dispatch,
    ),
    bookmarkAction: bindActionCreators(
      bookmarkAction, dispatch,
    ),
    blockAction: bindActionCreators(
      blockAction, dispatch,
    ),
    friendRequestAction: bindActionCreators(
      friendRequestAction, dispatch,
    ),

  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomBottomTab);
