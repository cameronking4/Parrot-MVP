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

import { Toolbar,Button,Icon,Avatar } from 'react-native-material-ui';
// import MediaPicker from "react-native-mediapicker"
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
import * as postDetailAction from '../../action/postDetailAction';
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

class CreatePost extends Component {

constructor(props) {
    super(props);
    this.state={
      imagepost:"",
      videopost:"",
      isLoading:false,
      id:null,
      update:false,

      imagepostId:null,
      postId:null,

    };
}

componentWillMount(){
// alert(this.props.bottomTab)

  const { navigation } = this.props;

  const id = navigation.getParam('id', null); 
  const update = navigation.getParam('update',false); 

  // alert(update+JSON.stringify(id))

   this.setState({id,update},()=>{

    if(update){

    // alert()
          var _id = id;   

            var path = Config.API_URL+'/post/listing'; 
            var bundle={
              _id:_id,
          }; 
        this.props.postDetailAction.fetchPostDetail(path,bundle);
        // this.fetchDetailForUpdt();

      }   


   });

   
}


componentWillReceiveProps(nextProps){
        // this.fetchDetailForUpdt();

  if(nextProps.postDetail.isLoading ==false && nextProps.postDetail.postDetail != null)
  {
  // alert('action:fetch-detail::'+JSON.stringify(this.props.postDetail));

        var data=nextProps.postDetail.postDetail;
        // console.log('PackageAdd/update:fetchDetailForUpdt:',data.availibility);
          if(data.type == "1"){

            this.setState({
            // title:data.title,
              postId:data._id,
              description:data.description,
              videopostId:data.videopost._id,
              videopost:data.videopost.image,
              // regImageMultiPick:data.images,
              // priceperhour:data.perpersonprice.toString(),
            });

          }
          else{

            this.setState({
              // title:data.title,
              postId:data._id,
              description:data.description,
              imagepostId:data.imagepost._id,
              imagepost:data.imagepost.image
              // regImageMultiPick:data.images,
              // priceperhour:data.perpersonprice.toString(),
            });
          }
      }


}

fetchDetailForUpdt(){

  // alert('action:fetch-detail::'+JSON.stringify(this.props.postDetail));
 
  if(this.props.postDetail.isLoading ==false && this.props.postDetail.postDetail != null)
  {
  // alert('action:fetch-detail::'+JSON.stringify(this.props.postDetail));

        var data=this.props.postDetail.postDetail;
        // console.log('PackageAdd/update:fetchDetailForUpdt:',data.availibility);
          if(data.type == "1"){

            this.setState({
            // title:data.title,
              postId:data._id,
              description:data.description,
              videopostId:data.videopost._id,
              videopost:data.videopost.image,
              // regImageMultiPick:data.images,
              // priceperhour:data.perpersonprice.toString(),
            });

          }
          else{

            this.setState({
              // title:data.title,
              postId:data._id,
              description:data.description,
              imagepostId:data.imagepost._id,
              imagepost:data.imagepost.image
              // regImageMultiPick:data.images,
              // priceperhour:data.perpersonprice.toString(),
            });
          }
      }

}



gotoCreatePost(){
  if(this.state.imagepost == "" && this.state.videopost == ""){
    alert("pick an item to post");
    return;
  }
  else{
    if(this.props.update){

      this.props.navigation.navigate('PostCreateComponent',{
        'type':this.props.postDetail.postDetail.type=="1"?"VIDEO":"IMAGE",
        'uri':this.props.postDetail.postDetail.type=="1"?this.state.videopost:this.state.imagepost,
        'postId':this.state.postId,
        'imagepostId':this.state.videopost!=""?this.state.videopostId:this.state.imagepostId,
        'update':this.state.update,
        'description':this.state.description
      })

    }
    else{
      this.props.navigation.navigate('PostCreateComponent',{
        'type':this.state.videopost!=""?"VIDEO":"IMAGE",
        'uri':this.state.videopost!=""?this.state.videopost:this.state.imagepost,
        'postId':this.state.postId,
        'imagepostId':this.state.imagepostId,
        'update':this.state.update,
        'description':this.state.description
     })        
    }
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
// alert(this.state.update)
  if(this.state.update){

    this.renderImagePickerForUpdate();

  }
  else{

    ImagePicker.showImagePicker(options, (response) => {

    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton === 'video') {
        

        ImagePicker.launchCamera(optionsVideo, (response)  => {
          // alert('/launchCamera')   
            console.log('video response::',response);
            // alert("1");
            if(response.didCancel){
                return
            }else{
              if(response.uri!=null||response.uri!=""){
                this.uploadVideo(response.uri);
              } 
            }
          

        });




    } else if (response.customButton === 'video_library') {

        // alert(JSON.stringify(this.props.postDetail)) 

        ImagePicker.launchImageLibrary(optionsVideo, (response)  => {

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

}

renderImagePickerForUpdate(){


    ImagePicker.showImagePicker(options, (response) => {

    if(this.props.postDetail.postDetail != null && this.props.postDetail.postDetail.type !== '2'){
        alert('You can not take Image to update video');
        return;
    }

    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton === 'video') {
        

        if(this.props.postDetail.postDetail !== null && this.props.postDetail.postDetail.type !== '1'){
            alert('You can not take video to update image');
            return;
       }

        ImagePicker.launchCamera(optionsVideo, (response)  => {
          // alert('/launchCamera')   
            console.log('video response::',response);
            // alert("1");
            if(response.didCancel){
                return
            }else{
              if(response.uri!=null||response.uri!=""){
                this.uploadVideo(response.uri);
              } 
            }
          

        });




    } else if (response.customButton === 'video_library') {

       if(this.props.postDetail.postDetail !== null && this.props.postDetail.postDetail.type !== '1'){
            alert('You can not select video to update image');
            return;
       }

        // alert(JSON.stringify(this.props.postDetail)) 

        ImagePicker.launchImageLibrary(optionsVideo, (response)  => {

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
  // if(Platform.OS=='ios'){
    return (
      <TouchableOpacity onPress={()=>{this.renderImgPick()}} style={{backgroundColor:color.text3,borderWidth:1,borderRadius:8,borderColor:color.text3,height:55,width:Dimensions.get('window').width-20,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:18,color:'#fff'}}>Click to add media item</Text>
      </TouchableOpacity>
    )
  // }
  // else{
  //   return(

  //   <View>
  //       <TouchableOpacity onPress={()=>{this.renderImgPick()}} style={{height:20,width:40,borderWidth:1,borderRadius:10,borderBottomLeftRadius:0,borderBottomRightRadius:0,justifyContent:'center',alignItems:'center',backgroundColor:"#f8f8f8",borderColor:"#f8f8f8"}}>
  //             <Icon name="expand-less" color={'#000'} size={25}/>
  //       </TouchableOpacity>
        
  //       <View style={{backgroundColor:"#f8f8f8"}}>
        
  //        <MediaPicker
  //           callback={items => this.whenClicked(items)}
  //           groupTypes="All"
  //           assetType="Images"
  //           maximum={1}
  //           imagesPerRow={3}
  //           imageMargin={5}
  //           showLoading={true}
  //           backgroundColor="#f8f8f8"
  //           selectedMarker={
  //             <Image
  //               style={[styles.checkIcon, {width: 25, height: 25, right: this.props.imageMargin + 5},]}
  //               source={require('../Images/crushd.png')}
  //             />
  //           } />
  //       </View>
  //   </View>
  //   );
  // }
}



whenClicked(items){
  console.log("whenClicked::",items);
  this.uploadImg(items[0],"Image");

}

render() {

  // alert(JSON.stringify(this.props.postDetail.postDetail))
  if(this.props.postDetail.postDetail == null  && this.state.update)
  {

      return ( 

          <View style={{justifyContent:'center',flex:1,paddingBottom:100,paddingTop:15}}>
              <Spinner />
          </View>
      )

  }else{
  

    return (
           
        <View style={{height:Screen.height,backgroundColor:color.mainbackground,paddingTop:Platform.OS=='ios'?20:0,}}>
           
          <StatusBar
              backgroundColor={color.statusbar}
              barStyle="dark-content"
              hidden={false}
          />               

          <View style={{flexDirection:'row',paddingTop:10,paddingLeft:20,height:50,alignItems:'center',justifyContent:'space-between',paddingRight:20}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{}}>
              <Icon name="close" color={'#000000'} size={22}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{this.gotoCreatePost()}} style={{}}>
              <Text style={{color:color.text3,fontSize:17,fontWeight:'bold'}}>Next</Text>
            </TouchableOpacity>
          </View>


          <View style={{height:(Screen.height)-50-145,alignItems:'center',justifyContent:'center',}}>
            
              {this.renderPost()}

          </View>


          <View style={{height:115,alignItems:'center',justifyContent:'flex-end'}}>
        
              {this.renderMediaPicker()}
          </View>


      </View>
    );
  }
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
    login:state.login,
    postDetail:state.postDetail
  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(postAction));
  return {
    postAction : bindActionCreators(
      postAction, dispatch,
    ),
    postDetailAction : bindActionCreators(
      postDetailAction, dispatch,
    ),
    loginAction: bindActionCreators(
      loginAction, dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePost);



        
