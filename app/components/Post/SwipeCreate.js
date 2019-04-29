import React, { Component, } from 'react';
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
  Dimensions,BackHandler, I18nManager,ScrollView,ImageBackground,Modal,Alert, Animated, PanResponder

} from 'react-native';

import { Toolbar,Button,Icon,Avatar } from 'react-native-material-ui';
// 
const MediaPicker = Platform.OS=='ios' ? require('prop-types') : require("react-native-mediapicker");


var ImagePicker = require('react-native-image-picker');


var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var CommonUtility =require('../../reducer/lib/CommonUtility');
var Config = require('../../Config');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

import Video from 'react-native-video';
var Spinner = require('../../Spinner');

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postAction from '../../action/postAction';
import * as loginAction from '../../action/loginAction';


const options = {
    title: 'Select the perfect view',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    customButtons: [
        {name: 'video', title: 'Take Video...'},
        {name: 'video_library', title: 'Choose Video from library...'},
    ],
    maxWidth: 1920,
    maxHeight: 1080,
    noData: true
};

const optionsVideo = {
    storageOptions: {
        skipBackup: true,
        path: 'movies'
    },
    noData: true,
    mediaType: 'video'
};
1
const SCREEN_WIDTH = Dimensions.get('window').width;

class SwipeCreate extends Component {

constructor(props) {
    super(props);
    this.panResponder;
    this.state={
      imagepost:"",
      videopost:"",
      isLoading:false,
      
      Xposition: new Animated.Value(0), 
 
      RightText: false,
 
      LeftText: false, 
    };
  
 
    this.CardView_Opacity = new Animated.Value(1);
}
componentWillMount()
  {
    this.panResponder = PanResponder.create(
    {
      onStartShouldSetPanResponder: (evt, gestureState) => false,
 
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
 
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
 
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
 
      onPanResponderMove: (evt, gestureState) =>
      {
        this.state.Xposition.setValue(gestureState.dx);
 
        if( gestureState.dx > SCREEN_WIDTH - 250 )
        {
 
          this.setState({ 
            
            RightText: true, 
 
            LeftText: false 
          });
 
        }
        else if( gestureState.dx < -SCREEN_WIDTH + 250 )
        {
 
          this.setState({ 
 
            LeftText: true, 
 
            RightText: false 
 
          });
 
        }
      },
 
      onPanResponderRelease: (evt, gestureState) =>
      {
        if( gestureState.dx < SCREEN_WIDTH - 150 && gestureState.dx > -SCREEN_WIDTH + 150 )
        {
          
          this.setState({ 
 
            LeftText: false,
 
            RightText: false 
            
          });
 
          Animated.spring( this.state.Xposition,
          {
            toValue: 0,
            speed: 5,
            bounciness: 10,
          }, { useNativeDriver: true }).start();
        }
 
        else if( gestureState.dx > SCREEN_WIDTH - 150 )
        {
 
          Animated.parallel(
          [          
            Animated.timing( this.state.Xposition,
            {
              toValue: SCREEN_WIDTH,
              duration: 200
            }),
 
            Animated.timing( this.CardView_Opacity,
            {
              toValue: 0,
              duration: 200
            })
          ], { useNativeDriver: true }).start(() =>
          {
            this.setState({ LeftText: false, RightText: false }, () =>
            {
              this.props.removeCardView();
            });
          }); 
 
        }
        else if( gestureState.dx < -SCREEN_WIDTH + 150 )
        {
          Animated.parallel(
          [          
            Animated.timing( this.state.Xposition,
            {
              toValue: -SCREEN_WIDTH,
              duration: 200
            }),
 
            Animated.timing( this.CardView_Opacity,
            {
              toValue: 0,
              duration: 200
            })
          ], { useNativeDriver: true }).start(() =>
          {
            this.setState({ LeftText: false, RightText: false }, () =>
            {
              this.props.removeCardView();
            });
          });          
        }
      }
    });
  }

gotoCreatePost(){
  if(this.state.imagepost == "" && this.state.videopost == ""){
    alert("pick an item to post");
    return;
  }
  else{
    this.props.navigation.navigate('PostCreateComponent',{
      'type':this.state.videopost!=""?"VIDEO":"IMAGE",
      'uri':this.state.videopost!=""?this.state.videopost:this.state.imagepost
    })  
  }
  
}

uploadVideo(uri){
    this.setState({isLoading:true});
    var that=this;
    var type="/videopost/save-image";
    
    var path = Config.API_URL+type;
          ApiUtility.saveVideo(path,'file',
            uri,function(response){
            
            if(response)
            {
              CommonUtility.showToast(response.message +" Now you can post here.")
                console.log("Videosave::response:",response);
                that.setState({
                  videopost:response.data.Newimgpath,image:true,isLoading:false});    
            }    
            else{
              
            }      
          },function(error){
              // that.props.onProcessLoding(true);
              // that.setState({
              //   isLoading: false
              // });
          });
  }


uploadImg(uri){
    this.setState({isLoading:true});
    var that=this;
    var type="/imagepost/save-image";
    
    var path = Config.API_URL+type;
          ApiUtility.saveImage(path,'file',
            uri,function(response){
            
            if(response)
            {
              CommonUtility.showToast(response.message +" Now you can post here.")
                console.log("ImageSinglePick::response:",response);
                that.setState({
                  imagepost:response.data.Newimgpath,image:true,isLoading:false});    
            }    
            else{
              
            }      
          },function(error){
              // that.props.onProcessLoding(true);
              // that.setState({
              //   isLoading: false
              // });
          });
  }

renderPost(){
    if(this.state.isLoading){
      return( 
      <View style={styles.getGallery}><Spinner /></View>);
    }
    
    if(this.state.imagepost!=""){
      // alert(this.state.imagepost)
      return( 
      <View style={{}}>
      
        <View style={styles.getGallery}>
          
        <Image
              resizeMode="contain"
              resizeMethod="resize"
              style={[styles.getGallery,{marginTop:0}]}
                  source={{uri: this.state.imagepost}}
              />
             
              </View>
            </View>
              );
    }else if(this.state.videopost!=""){
      return(
        <View style={styles.getGallery}>
              <Video
                 ref={(ref: Video) => { this.video = ref }}
                 source={{uri:this.state.videopost}}
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
                    style={styles.getGallery}
                    repeat={true}
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                    onAudioFocusChanged={this.onAudioFocusChanged}
                  />  
          </View>
      )
    }
    else{
      return(
          <TouchableOpacity onPress={()=>{this.renderImgPick()}} style={styles.getGallery}> 
                  <Icon size={80}  name="image" color={'grey'} style={{}}/>
            </TouchableOpacity>          
            
      )
    }
  }


renderImgPick(){

    ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton === 'video') {
        ImagePicker.launchCamera(optionsVideo, (response)  => {
          
            console.log('video response::',response);
            // alert("1");
            if(response.didCancel){
                return;
            }else{
              if(response.uri!=null||response.uri!=""){
                this.uploadVideo(response.uri);
              } 
            }
          

        });
    } else if (response.customButton === 'video_library') {
        ImagePicker.launchImageLibrary(optionsVideo, (response)  => {

            // alert(JSON.stringify(response));

          // let source = { uri: 'data:video/mp4;base64,' + response.uri };
          // console.log("@@@video",source);
          // this.setState({
          //   postimg: response.uri,
           
          // });
          console.log('video2 response::',response);
            // alert("1");
            if(response.didCancel){
              return;    
            }
            else{
              if(response.uri!=null||response.uri!=""){
                this.uploadVideo(response.uri);
              }
            }

        });
    }       
    else {
        
          if(response.uri!=null||response.uri!=""){
            this.uploadImg(response.uri);
          }
      }
      
      }); 
    
  }
 

 
renderMediaPicker(){
  if(Platform.OS=='ios'){
    return (
      <TouchableOpacity onPress={()=>{this.renderImgPick()}} style={{backgroundColor:color.text3,borderWidth:1,borderRadius:8,borderColor:color.text3,height:55,width:Dimensions.get('window').width-20,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:18,color:'#fff'}}>Click to add media item</Text>
      </TouchableOpacity>
    )
  }
  else{
    return(

    <View>
        <TouchableOpacity onPress={()=>{this.renderImgPick()}} style={{height:20,width:40,borderWidth:1,borderRadius:10,borderBottomLeftRadius:0,borderBottomRightRadius:0,justifyContent:'center',alignItems:'center',backgroundColor:"#f8f8f8",borderColor:"#f8f8f8"}}>
              <Icon name="expand-less" color={'#000'} size={25}/>
        </TouchableOpacity>
        
        <View style={{backgroundColor:"#f8f8f8"}}>
        
         <MediaPicker
            callback={items => this.whenClicked(items)}
            groupTypes="All"
            assetType="Images"
            maximum={1}
            imagesPerRow={3}
            imageMargin={5}
            showLoading={true}
            backgroundColor="#f8f8f8"
            selectedMarker={
              <Image
                style={[styles.checkIcon, {width: 25, height: 25, right: this.props.imageMargin + 5},]}
                source={require('../Images/crushd.png')}
              />
            } />
        </View>
    </View>
    );
  }
}

whenClicked(items){
  console.log("whenClicked::",items);
  this.uploadImg(items[0],"Image");

}

render() {
 const rotateCard = this.state.Xposition.interpolate(
    {
       inputRange: [-200, 0, 200],
       outputRange: ['-20deg', '0deg', '20deg'],
    });
    return (
           
        <View style={{height:Screen.height,backgroundColor:color.mainbackground,paddingTop:Platform.OS=='ios'?20:0,}}>
           
          <StatusBar
              backgroundColor={color.statusbar}
              barStyle="dark-content"
              hidden={false}
          />               
   

      </View>
    );
  }
}

const styles = StyleSheet.create({

tabBtn:{
  // backgroundColor:'yellow',
  paddingLeft:40,
  paddingRight:40,
  justifyContent:'center',
  alignItems:'center'
},
getGallery:{
  // marginTop:50,
  height:Dimensions.get('window').height-200,
  width:Dimensions.get('window').width,
  backgroundColor:'#fff',
  // borderRadius:100,
  borderColor:'#fff',
  justifyContent:'center',
  alignItems:'center'

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwipeCreate);



        
