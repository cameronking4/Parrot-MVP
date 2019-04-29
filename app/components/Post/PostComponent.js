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
  KeyboardAvoidingView,
  Dimensions,BackHandler, I18nManager,ScrollView,ImageBackground,Modal,Alert

} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { Toolbar,Button,Icon,Avatar } from 'react-native-material-ui';
var ImagePicker = require('react-native-image-picker');
var ProfessionsMultiPick = require('../../common/ProfessionsMultiPick');
var TagMultiPick = require('../../common/TagMultiPick');
import Permissions from 'react-native-permissions';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var MessageModal = require('../../common/MessageModal');

import Video from 'react-native-video';
var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var CommonUtility =require('../../reducer/lib/CommonUtility');
var Config = require('../../Config');
var Spinner = require('../../Spinner');
var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
var styles =require('../../style/postAddstyles');
var RegistrationStyle = require('../../style/RegistrationStyle');
import ValidationComponent from 'react-native-form-validator';
import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';
import { Metrics } from '../../Themes/';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postAction from '../../action/postAction';
import * as loginAction from '../../action/loginAction';
import Geocoder from 'react-native-geocoder';


class PostComponent extends ValidationComponent {

constructor(props) {
    super(props);
    this.state={
        userId:"",
        tagMultiPickModalVisible:false,
        showWarn:false,
        showWarnTitle:false,

        regtags:[],
        checkregtags:[],
        filterTags:[],
        // post
        regpost:"",
        regposttitle:"",
        checkregregposttitle:[],
        checkregdesc:[],
        description:this.props.description?this.props.description:"",
        postId:this.props._id,

    // validations
    chktags:false,
    chkdesc:false,
    chktitle:false,

        // image
        postimg:"",
         image:false,
          video:false,
          regpost:"",
            imgPath:"",
      videopath:"",
      isLoading:false,
      imagepost:this.props.uri,
      videopost:"",
      // latlong
      latLong:"",
      latitude:22.7056,
      longitude:57.7867,
      city:"",
      country:"",
      state:"",
      modalVisible:false,
    };
}

componentWillMount(){
  var that=this;
// alert(this.props.update)

    AuthUtility.getUserField("_id",function(id){
      that.setState({userId:id});
    });


    // if(this.props.update){

    //       var _id = this.props._id;   

    //         var path = Config.API_URL+'/post/listing'; 
    //         var bundle={
    //           _id:_id,
    //         }; 
        // this.props.postDetailAction.fetchPostDetail(path,bundle);
        // this.fetchDetailForUpdt();

      // }   
   
}

  fetchDetailForUpdt(){

    // alert('data'+JSON.stringify(this.props.packageDetail.packageDetail));

    if(this.props.packageDetail.isLoading ==false && this.props.packageDetail.packageDetail != null && this.props.update )
    {
          var data=this.props.packageDetail.packageDetail[0];
          console.log('PackageAdd/update:fetchDetailForUpdt:',data.availibility);

            this.setState({
              title:data.title,
              description:data.description,
              regImageMultiPick:data.images,
              priceperhour:data.perpersonprice.toString(),
              // regtags:data.availibility,
              
              
            });
            
        }

  }


 
renderPost(){
    if(this.state.isLoading){
      return( 
      <View style={styles.getGallery}><Spinner /></View>);
    }
    
    if(this.state.imagepost!=""){
    
      if(this.props.type == "VIDEO"){
        return(

          <View style={styles.getGallery}>
              <Video
                 ref={(ref: Video) => { this.video = ref }}
                 source={{uri:this.state.imagepost}}
                    // source={{uri:"http://techslides.com/demos/sample-videos/small.mp4"}}
                    // resizeMode="contain" 
                    muted={false}
                     rate={this.state.rate}
                      paused={this.state.paused}
                      volume={this.state.volume}
                    resizeMode={this.state.resizeMode}
                      onLoad={this.onLoad}
                      onProgress={this.onProgress}
                      onEnd={this.onEnd}
                    style={[styles.getGallery,{marginTop:0}]}
                    repeat={true}
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                    onAudioFocusChanged={this.onAudioFocusChanged}
                  />  

            </View>
        )
      }
      else{
        return( 
        
        <View style={styles.getGallery}>
          
            <Image
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={[styles.getGallery,{marginTop:0}]}
                  source={{uri: this.state.imagepost}}
              />
             
        </View>
              );
      }
    }

    
  }

// doDelete(){
//   var that = this;
//   var bunch;
//   if(this.state.imagepost!=""){
//      bunch = {
//         image : this.state.imagepost
//       };
//   }else if(this.state.videopost!=""){
//     bunch = {
//         image : this.state.videopost
//       };
//   }else{
//   }
  
//    var path = Config.API_URL+"/sysdraft/delete";
//       console.log('bunch:',bunch);
//       ApiUtility.fetchAuthPost(path,bunch,function(response){
//         if(response)
//         {
          
//           console.log('avatarSource:',response);
//         }
//         },function(err){
//       });
//       that.setState({
//         imagepost : '' 
//       });

  
// }


createPost(){

  // alert(this.props.type)
  var that=this;
  

  if(this.props.update){

      var bunch={imageupdate:{_id:this.props.imagepostId,image:this.props.uri,description:this.state.description,type:this.props.type},
                  listupdate:{_id:this.props.postId,image:this.props.uri,description:this.state.description,type:this.props.type}};
      var pathtype=this.props.type=="VIDEO"?"/videopost/update":"/imagepost/update";

        var path = Config.API_URL+pathtype;
          
        this.props.postAction.updatePost(path,bunch,this.props.navigation);  

        that.setState({
          isLoading : false,
        });

  }
  else{
        var bunch={image:this.props.uri,description:this.state.description,type:this.props.type}

        var pathtype=this.props.type=="VIDEO"?"/videopost/create":"/imagepost/create";

        var path = Config.API_URL+pathtype;
          
        this.props.postAction.addPost(path,bunch,this.props.navigation);  

        that.setState({
          isLoading : false,
        });
  }
}

render() {
   console.log("op",this.state.chktitle);
    return (

       <View style={{flex:1,backgroundColor:color.mainbackground,marginTop:Platform.OS=='ios'?20:0,}}>   
                  
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={[styles.tabBtn,{}]}> 
                  <Icon size={22}  name="arrow-back" color={color.text3} style={{}}/>
                  
                </TouchableOpacity> 
            
              <Text style={{color:color.text3,fontSize:20,fontWeight:'bold',marginTop:10,justifyContent:'center',}}>Post</Text>
            
            </View>
            <View style={[CommonStyle.hLine,{}]}></View>
           
            {/*top part*/}
            <ScrollView>
            <View style={{alignItems:'center',justifyContent:'center'}}>

              {this.renderPost()}

              <TextInput ref="description"   
                  placeholder={"Description"} 
                  placeholderTextColor={color.placeholderTextColor} 
                  underlineColorAndroid={color.underlineColorAndroid} 
                  onChangeText={(description) => this.setState({description:description})} 
                  value={this.state.description}
                  multiline={true}
                  textAlignVertical= 'top'   
                  style={[CommonStyle.textInputStyle,{width:Dimensions.get('window').width-20,marginTop:10,height:100}]} />
            
            </View>              

            </ScrollView>

            <TouchableOpacity onPress={() =>{this.createPost()}} style={{position:'absolute',bottom:10,right:20,justifyContent:'center',alignItems:'center',alignSelf:'flex-end',backgroundColor:color.text3,height:50,width:50,borderRadius:25}}>
              <Icon name="done"  style={styles.actionButtonIcon} />
            </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

tabBtn:{
  // backgroundColor:'yellow',
  paddingLeft:20,
  paddingRight:20,
  justifyContent:'center',
  alignItems:'flex-start',
  height:50,
},
getGallery:{
  // marginTop:50,
  height:Dimensions.get('window').height/2,
  width:Dimensions.get('window').width,
  backgroundColor:'#f8f8f8',
  // borderRadius:100,
  borderColor:'#f8f8f8',
  justifyContent:'center',
  alignItems:'center'

},
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
},

 
});


const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}
const mapStateToProps = state => {

  return {
    post : state.post,
    login:state.login
  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(postAction));
  return {
    postAction : bindActionCreators(
      postAction, dispatch,
    ),
    loginAction: bindActionCreators(
      loginAction, dispatch,
    ),
  };
}
module.exports = PostComponent;

