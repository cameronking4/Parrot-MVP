
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
import IconM from 'react-native-vector-icons/dist/MaterialIcons';

var Config = require('../../Config');
import AuthUtility from '../../reducer/lib/AuthUtility';
import ApiUtility from '../../reducer/lib/ApiUtility';

import { connect } from 'react-redux';

import { NavigationEvents } from "react-navigation";


import {bindActionCreators} from 'redux';
// import * as loginAction from '../../action/loginAction';
import * as matchDetailAction from '../../action/matchDetailAction';
import MatchUserProfileComponent from '../../components/MatchUserProfile/MatchUserProfile';
import * as matchAction from '../../action/matchAction';


var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class MatchUserProfile extends Component {


constructor(props) {
    super(props);
    this.state={
    
      matchforuserid:null,
      username:null,
      matchIdForUpdt:'',

    };
}

 
componentWillMount(){
// alert('MatchUserProfile');
 
  const { navigation } = this.props;
  const matchforuserid = navigation.getParam('matchforuserid', null); 
  const username = navigation.getParam('username', ""); 

  
  this.setState({matchforuserid,username},()=>{this.fetchMatchDataProfile(matchforuserid);});

  
}



fetchMatchDataProfile(matchforuserid){ 

   var that =this;
        
        var path = Config.API_URL+'/match/unique-create'; 
        var bundle={
            matchforuser:matchforuserid,
        }; 

        ApiUtility.fetchAuthPost(path,bundle,function(response){

              // alert('response'+JSON.stringify(response));
              // console.log('action:PostDetailResponse',response);
              if(response.success){

                       // alert(matchforuserid+'#######')
                var bunch={ 
                  reqSorce:'mobile',         
                  _id:matchforuserid,
                  
                };

                var path = Config.API_URL+'/user/listing';
                that.props.matchDetailAction.fetchMatchDetail(path,bunch);
                that.setState({matchIdForUpdt:response.data._id})
              }
              else{
                return; 
              }

            },function(error){
                alert('Error to view profile')
            });



     

}


    render() {
        
    return (

      <View style={[CommonStyle.platformHeight]}>  
      
        <StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />
        
             <View style={[CommonStyle.toolbarView,{flexDirection:'row',justifyContent:'space-between',backgroundColor:'transparent',position:'absolute',top:10,left:3,zIndex:3}]}>
                {/*<Text style={[CommonStyle.toolbarText]}>{this.state.username}</Text>*/}


                <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null)}} style={{}}>
                    <IconM name="arrow-back" size={23} color={color.toolTitleColor} style={CommonStyle.backArrow}/>
                </TouchableOpacity>


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

                  <TouchableOpacity onPress={()=>{this.gotoLogout()}} style={{}}>
                    <Icon name="power-off" size={23} color={color.toolTitleColor} style={{}}/>
                  </TouchableOpacity>
                */}
                </View>
             
            </View>
            <View style={[CommonStyle.hLine,{width:Dimensions.get('window').width,}]}></View>
             
           
            <MatchUserProfileComponent 
                  matchIdForUpdt={this.state.matchIdForUpdt}
                  navigation={this.props.navigation}
                  matchAction={this.props.matchAction}
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
    matchDetail : state.matchDetail,
  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(loginAction));
  return {
     matchDetailAction : bindActionCreators(
      matchDetailAction, dispatch,
    ),
     matchAction : bindActionCreators(
      matchAction, dispatch,
    ),

  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchUserProfile);

