
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
var ProfessionsMultiPick = require('../../common/ProfessionsMultiPick');
import ChangePassword from './ChangePassword';

import ProfilePostListComponent from './ProfilePostList';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import * as postAction from '../../action/postAction';
import * as favaction from '../../action/favaction';
// import * as bookmarkAction from '../../action/bookmarkAction';
import * as blockAction from '../../action/blockAction';

class Profile extends Component {

constructor(props) {
    super(props);
    this.state={


      user:null,
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


  if(this.props.login.profileData != null){
    if(this.props.login.profileData.user!=null){
   // alert(JSON.stringify(this.props.login.loginData.user))
        this.setState({
          _id:this.props.login.profileData.user._id,
          name:this.props.login.profileData.user.username,
          image:this.props.login.profileData.user.image,
        });

      }
    }

  
}

componentWillReceiveProps(nextProps){
  

  
  if(typeof nextProps.login != undefined)

  {

    if(nextProps.login.profileData != null){
      if(nextProps.login.profileData!=null){
        
        // console.log('@@@@@@@@@@',nextProps.login.loginData);
        // alert('Profile'+JSON.stringify(nextProps.login.loginData.user));
    // alert(nextProps.login.loginData.user.image);
      this.setState({
        _id:nextProps.login.profileData._id,
        name:nextProps.login.profileData.username,
        image:nextProps.login.profileData.image,
        user:nextProps.login.profileData,
      });
    }
    }
  }

}
 

gotoProfileEdit(){
 // alert('****'+JSON.stringify(this.state.user));
   // this.setState({professionsModalVisible:false});
  this.props.navigation.navigate('ProfileEdit',{name:this.state.name,profilePic:this.state.image,_id:this.state._id,modalFalse:"false",bio:this.state.user.bio,firstName:this.state.user.firstname,lastName:this.state.user.lastname,user:this.state.user});

}
gotoProfessions(){
     
    this.setState({
      professionsModalVisible:true
  })
}

oncloseProfessionsMultiPick(professionsArray,arrowBack){
  if(arrowBack)
  {
      console.log('###oncloseProfessionsMultiPick###',arrowBack)

    this.setState({
      professionsModalVisible : false,
    });
  }
    else{
        this.setState({
        professionsModalVisible : false,
        regProfessions:professionsArray
      });
      console.log("oncloseProfessionsMultiPick",professionsArray);
      if(professionsArray.length > 0){
          // AuthUtility.getToken(function(token){
          //     ApiUtility.setToken(token);
               console.log("ProfilePostListProfile : getToken: ");
          // });
          var that=this;
          AuthUtility.getUserField('_id',function(_id){
            var pathUpdt = Config.API_URL+'/user/update';
             var bundle={
                // _id:that.state._id,
                interest:JSON.stringify(professionsArray),
              };

              that.props.loginAction.updateLoginData(pathUpdt,bundle,that.props.navigation,"update"); 
              alert('Your tags saved successfully')
              // this.props.navigation.goBack();
               // that.props.navigation.navigate("ProfilePage");
          });
            
      }else{
        alert("Please select at least one Interest");
      }    
  }
  
}

renderProfessions(){

    console.log("renderProfessions::");
    var regProfessions=[];

    // var regProfessions =this.state.regProfessions;
    if(this.props.login.profileData!=null){
      if(this.props.login.profileData.user!=null){
        regProfessions=this.props.login.profileData.user.interest;
      }
    }
    if(regProfessions.length > 0)
    {
          return(

            <View style={{paddingLeft:15,height:52}}>
              

              <TouchableOpacity onPress={()=>this.gotoProfessions()}  style={{backgroundColor:'#ffffff',marginBottom:15,paddingBottom:10,paddingLeft:10,paddingRight:10}}>
                <ScrollView>
                  <View style={{flexWrap:'wrap',flexDirection: 'row',borderBottomColor:"transparent"}}>
                
                  { regProfessions.map((item, key)=>(
                    <View style={[CommonStyle.capsuleView,{borderColor:'green'}]}>
                        
                        <Text style={CommonStyle.capsuleText} numberOfLines={1}>
                          {item.name}
                        </Text>

                    {/**    <TouchableOpacity  onPress={this.removeCategory.bind(this,item)}>
                          <Icon name="close" size={14} color={color.textInputColor} style={{alignItems:'flex-end',marginRight:3,marginLeft:8,}} />
                        </TouchableOpacity>
                    **/}

                    </View>
                  ))}
                 
                  </View>
                   </ScrollView>
              
             </TouchableOpacity>
            </View>
          );
    }
    else{
       return(
          <View style={{paddingLeft:15}}>

              <TouchableOpacity onPress={()=>this.gotoProfessions()} style={this.state.isErrorProfessions ? RegistrationStyle.formFieldViewError : [RegistrationStyle.formFieldView,{borderBottomColor:'transparent'}]}>
                <Text numberOfLines={1} style={{fontSize:15,justifyContent:'flex-end',color:color.placeholderTextColor}}>{"Select Interest"}</Text>
              </TouchableOpacity>
              { this.state.checkregProfessions ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkregProfessions[0]}</Text> : null}                    

          </View>
      );
    }
}

  render(){
    // alert(JSON.stringify(this.props.login.profileData))
    if(this.props.login.profileData != null){
      var user=this.props.login.profileData;
        
    return(

          <View style={{flex:1}}>
           
             <View style={{flexDirection:'row',width:Dimensions.get('window').width,padding:20,}}>
             
              <TouchableOpacity  onPress={()=>{this.gotoProfileEdit()}}>
                  <View style={{justifyContent:'center',height:110,width:100,}}>
                    <View style={{width:100,height:100,backgroundColor:'#f8f8f8',borderRadius:50,}}>
                        <Image 
                            resizeMethod="resize"                                
                            source={{uri:this.state.image}}  
                            style={{height:100,width:100,borderRadius:50}}
                            resizeMode='cover'
                        />
                    </View>
                    
                  </View>

                  
              </TouchableOpacity>   


                 <View style={{flexDirection:'column',paddingRight:20,paddingLeft:20}}>

                 <View style={styles.profiledigitView}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={[styles.usernameStyle,{width:Dimensions.get('window').width-185}]}>{this.state.name}</Text>
                        <TouchableOpacity onPress={()=>{this.gotoProfileEdit()}} >
                         <Icon name="edit" size={24} color={color.text1} style={{alignItems:'flex-end',marginRight:3,marginLeft:8,}} />
                        </TouchableOpacity>
                      </View>
                        <Text style={styles.usernameStyle}>{user.bio}</Text>
                  </View>

                 {/* <View style={{height:80,flexDirection:'row',}}>    
                      <View style={styles.profiledigitView}>
                        <Text style={styles.profiledigit}>{user.totalposts}</Text>
                        <Text style={styles.profilesubTitle}>posts</Text>
                      </View>

                      <View style={styles.profiledigitView}>
                        <Text style={styles.profiledigit}>{user.totalfriends}</Text>
                        <Text style={styles.profilesubTitle}>friends</Text>
                      </View>
                  </View>*/}
              
                {/**this.renderProfessions()

               <ProfessionsMultiPick 
                selectedArr={this.state.regProfessions}
                modalVisible={this.state.professionsModalVisible} 
                oncloseModal={this.oncloseProfessionsMultiPick.bind(this)}
              /> **/} 
              </View>
             </View> 

              <View style={[CommonStyle.hLine,{width:Dimensions.get('window').width}]}></View> 

              <View style={{height:Dimensions.get('window').height-250}}> 
                      <ProfilePostListComponent 
                          navigation={this.props.navigation}
                          listtype={'myprofile'}
                          loginId={this.props.loginId}
                          loginAction={this.props.loginAction}
                          login={this.props.login}
                          postAction={this.props.postAction}
                          post={this.props.post}
                          favaction={this.props.favaction}
                          blockAction={this.props.blockAction}
                      /> 
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
  
profiledigit:{
  fontSize:18,
  color:'#000',
  // fontWeight:'500',
  fontFamily:'Roboto-Medium'
},
profiledigitView:{
  width:Dimensions.get('window').width-150,
  marginRight:10,
  // backgroundColor:'red',
  justifyContent:'flex-start',
  alignItems:'flex-start'
},
profilesubTitle:{
  fontSize:15,
  fontWeight:'200',
  fontFamily:'Roboto-Medium'
},
usernameStyle:{
  fontSize:18,
  // textAlign:'center',
  marginBottom:10,
  fontFamily:'Roboto-Medium',
  color:'#000'
}

});


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
)(Profile); 
