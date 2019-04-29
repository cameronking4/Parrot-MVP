
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

import { Toolbar,Button, } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import AuthUtility from '../../reducer/lib/AuthUtility';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
// import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

var Config = require('../../Config');
var RegistrationStyle =require('../../style/RegistrationStyle');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');


import MatchUserPostListComponent from '../../components/MatchUserProfile/MatchUserPostList';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import * as matchDetailAction from '../../action/matchDetailAction';
import * as matchUserPostListAction from '../../action/matchUserPostListAction';
import * as postAction from '../../action/postAction';
import * as favaction from '../../action/favaction';
// import * as bookmarkAction from '../../action/bookmarkAction';
import * as blockAction from '../../action/blockAction';
import * as matchAction from '../../action/matchAction';


class MatchUserProfile extends Component {

constructor(props) {
    super(props);
    this.state={


      loginId:null,
      name:'',
      image:'',
      _id:'',

      changePasswordModalVisible:false,

      professionsModalVisible:false,
    
      regProfessions:[],

      checkregProfessions:[]
    };
}

componentWillMount(){
  // alert("eill");
  // alert('container:componentWillMount:'+this.props.login.loginData.user._id);


  if(this.props.login.loginData != null){
    if(this.props.login.loginData.user!=null){
   // alert(JSON.stringify(this.props.login.loginData.user))
      this.setState({
        _id:this.props.login.loginData.user._id,
        name:this.props.login.loginData.user.username,
        image:this.props.login.loginData.user.image,
        regProfessions:this.props.login.loginData.user.interest,
      });

    }
    }

  
}

componentWillReceiveProps(nextProps){
  

  
  if(typeof nextProps.login != undefined)

  {

    if(nextProps.login.loginData != null){
      if(nextProps.login.loginData.user!=null){
        // alert(JSON.stringify(nextProps.login.loginData.user));
    // alert(nextProps.login.loginData.user.image);
      this.setState({
        _id:nextProps.login.loginData.user._id,
        loginId:nextProps.login.loginData.user._id,
        name:nextProps.login.loginData.user.username,
        image:nextProps.login.loginData.user.image,
        regProfessions:nextProps.login.loginData.user.interest,
      });
    }
    }
  }

}



  onButtonPress(type){
    console.log(`on swiped ${type}`)
    // alert(JSON.stringify(this.props.matchDetail))
       var _id=this.props.matchDetail.matchDetail._id;

    if(type == 'crush'){


      var bunch={ 
          reqSorce:'mobile',         
          // _id:_id,
          _id:this.props.matchIdForUpdt,
          status:'crush'
        };


      var followbunch={ 
          follower:_id,
          following:this.state.loginId,
        };
        

      this.setState({
        currentIndex:this.state.currentIndex+1
      },()=>{var path = Config.API_URL+'/match/update';
            var followpath = Config.API_URL+'/follow/unique-create';
        this.props.matchAction.fetchMatchUpdate(path,bunch,followpath,followbunch,'matchProfile',this.props.matchAction);
        this.props.navigation.goBack(null);
      });

        

    }
    else if(type == 'nocrush'){

      var bunch={ 
          reqSorce:'mobile',         
          _id:_id,
        };

        this.setState({
        currentIndex:this.state.currentIndex+1
      },()=>{ var path = Config.API_URL+'/match/delete';
        this.props.matchAction.fetchMatchDelete(path,bunch);

      });

       
    }
    else{
      return;
    }
  }

gotoProfileEdit(){
  console.log('****',JSON.stringify(this.props.matchDetail.matchDetail.user.firstname));
   // this.setState({professionsModalVisible:false});
  this.props.navigation.navigate('ProfileEdit',{name:this.state.name,profilePic:this.state.image,_id:this.state._id,modalFalse:"false",bio:this.props.login.loginData.user.bio,firstName:this.props.login.loginData.user.firstname,lastName:this.props.login.loginData.user.lastname});

}

  render(){
    // alert(JSON.stringify(this.props.matchDetail))
    if(this.props.matchDetail.matchDetail != null){
      var user=this.props.matchDetail.matchDetail;
        
    return(

          <View style={{flex:1}}>
           
            <ScrollView style={styles.container}>
               
               <View>

                <Image 
                       
                        source={{uri:user.image}}  
                        resizeMode="stretch" style={{height:350, width:Dimensions.get('window').width}}
                    />
                
                <View style={{position:'absolute',zIndex:3,bottom:15,right:0,width:Dimensions.get('window').width,flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end',paddingLeft:15,paddingTop:15,}}>


                  <View style={{marginRight:20}}>
                  <Icon name={"heart"}  color={color.matchtitletext} size={20}/>
                  <Text style={[styles.subTitle,{textAlign:'center'}]}>{user.nfollowing}</Text>
                  </View>

                  <View style={{marginRight:20}}>
                  <Icon name={"users"} color={color.matchtitletext} size={20}/>
                  <Text style={[styles.subTitle,{textAlign:'center'}]}>{user.nfollow}</Text>
                  </View>


                </View>


                </View>

                

                <View style={[styles.row, {marginTop:15}]}>

                    <Text numberOfLines={1} style={[styles.usernameStyle,{color:'#000',fontWeight:'500',}]}>{user.username}</Text>

                </View>

                <View style={[styles.row,]}>

                    <Text numberOfLines={1} style={styles.usernameStyle}>{user.firstname}</Text>

                </View>
              
                <View style={[styles.description, {marginBottom:15}]}>

                  <Text style={styles.usernameStyle}>{user.bio}</Text>
                
                </View>
              

              <View style={[CommonStyle.hLine,{width:Dimensions.get('window').width}]}></View> 


                
                      <MatchUserPostListComponent 
                          navigation={this.props.navigation}
                          matchForUserId={user._id}
                          listtype={'myprofile'}
                          loginId={this.props.loginId}
                          loginAction={this.props.loginAction}
                          login={this.props.login}
                          matchUserPostListAction={this.props.matchUserPostListAction}
                          matchUserPostList={this.props.matchUserPostList}
                          favaction={this.props.favaction}
                          blockAction={this.props.blockAction}
                      /> 
              
         </ScrollView>

          <View style={[styles.buttonsContainer,{marginBottom:20}]}>
                
                  <TouchableOpacity onPress={()=>{this.onButtonPress('nocrush')}} style={[styles.btnView,{backgroundColor:'red',borderColor:'red'}]}>
                    <Icon name={"close"}  color={'#fff'} size={30}/>
                  </TouchableOpacity>
              
                  <TouchableOpacity onPress={()=>{this.onButtonPress('crush')}} style={styles.btnView}>
                    <Icon name={"heart"}  color={'#fff'} size={30}/>
                  </TouchableOpacity>


          </View>



        </View>
      );
    }
    else{
      return (<View></View>);
    }
  }
}

const styles = StyleSheet.create({
  
   container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
  },
  row: {
    flexDirection:'row',
    margin:15,
    marginBottom:0,
    marginTop:5,
    alignItems:'flex-end'
  },
  title:{
    fontSize:14,
    fontWeight:'600',
    color:'#333'
  },
  commons:{
    padding:15
  },
  buttons:{
    width:80, 
    height:80, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:40
  },
  description:{
    padding:15,
    borderTopWidth:1,
    // borderBottomWidth:1,
    borderColor:'#e3e3e3',
    marginTop:10,
    // marginBottom:10
  },
  buttonSmall:{
    width:50, 
    height:50, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
},
profiledigit:{
  fontSize:21, fontWeight:'300', marginBottom:-2

  // fontSize:18,
  // color:'#000',
  // // fontWeight:'500',
  // fontFamily:'Roboto-Medium'
},
profiledigitView:{
  width:Dimensions.get('window').width/4,
  marginRight:10,
  justifyContent:'center',
  alignItems:'center'
},
profilesubTitle:{
  fontSize:15,
  fontWeight:'200',
  fontFamily:'Roboto-Medium'
},
usernameStyle:{
                
    fontSize:19, fontWeight:'400',

  // fontSize:18,
  // // textAlign:'center',
  // marginBottom:10,
  // fontFamily:'Roboto-Medium',
  // color:'#000'
},
btnView:{width:100,
  height:60,
  width:60,
  backgroundColor:'green',
 borderColor:'green',
  borderWidth:1,
  borderRadius:30,
  padding:3,
  justifyContent:'center',
  alignItems:'center'
},
buttonsContainer:{
  width:Dimensions.get('window').width,
  position:'absolute',
  bottom:20,
  height: 54,
   backgroundColor: 'transparent', 
   flexDirection: 'row',
   justifyContent:'space-between',
   paddingLeft:20, 
   paddingRight:20 }

});


const mapStateToProps = state => {
  // alert(JSON.stringify(state.login));
  return {
    login : state.login,
    post : state.post,
    matchDetail:state.matchDetail,
    matchUserPostList:state.matchUserPostList,
    match : state.match,    
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
    matchDetailAction: bindActionCreators(
      matchDetailAction, dispatch,
    ),
    matchAction: bindActionCreators(
      matchAction, dispatch,
    ),
    matchUserPostListAction: bindActionCreators(
      matchUserPostListAction, dispatch,
    ),
    
    // bookmarkAction: bindActionCreators(
    //   bookmarkAction, dispatch,
    // ),
    blockAction: bindActionCreators(
      blockAction, dispatch,
    ),
   
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchUserProfile); 
