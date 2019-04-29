import React, { Component, PropTypes } from 'react';
import {  
  Platform,
  StyleSheet,
  Image,
  View, 
  Text,
  StatusBFar,
  TextInput,
  FlatList,
  NetInfo,
  Modal,
  findNodeHandle,
  TouchableOpacity,
  Dimensions,BackHandler, I18nManager,ScrollView,ImageBackground

} from 'react-native';
import moment from 'moment';

import Icons from 'react-native-vector-icons/dist/FontAwesome';
var ShareComponent =require('../../reducer/lib/ShareComponent');

import Video from 'react-native-video';

// import IconFeather from 'react-native-vector-icons/dist/Feather';
import { Toolbar,Button,Icon,Avatar } from 'react-native-material-ui';

// import Ionicons from 'react-native-vector-icons/dist/Ionicons';

var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var CommonUtility =require('../../reducer/lib/CommonUtility');
var Config = require('../../Config');
import {Metrics,Colors } from '../../Themes/';
var Spinner = require('../../Spinner');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
var ListStyle = require('../../style/ListStyle');

// import DeviceInfo from 'react-native-device-info';
import { NavigationEvents } from "react-navigation";

var RegistrationStyle = require('../../style/RegistrationStyle');

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import * as postAction from '../../action/postAction';
import * as profilePostAction from '../../action/profilePostAction';
import * as favaction from '../../action/favaction';
// import * as commentAction from '../../action/commentAction';
// import * as bookmarkAction from '../../action/bookmarkAction';
// import * as blockAction from '../../action/blockAction';
// import * as friendRequestAction from '../../action/friendRequestAction';
import * as postDetailAction from '../../action/postDetailAction';


class PostDetail extends Component {

constructor(props) {
    super(props);
    this.state={
        
      isFinished:false,
      item:null,
      duration:null,
      isLoading:false,
      duration: 0.0,
      currentTime: 0.0,
      paused:false
    };
     video: Video;
}

onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

onBuffer = (data) => {
    // alert();
    this.setState({isLoading:true });
  };

  onEnd = () => {
    this.setState({ paused: true })
    this.video.seek(0)
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  };

  onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    this.setState({ paused: !event.hasAudioFocus })
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
};

onLoad = (data) => {
    this.setState({ duration: data.duration });
};

componentWillMount(){
  var that=this;
   AuthUtility.getUserField('_id',function(_id){
      that.setState({loginId:_id})
   });
  this.fetchDetailPost();
}

fetchDetailPost(){ 

      // alert(this.props._id)
        var bunch={ 
          reqSorce:'mobile',         
          _id:this.props._id
        };

        var that=this;

        var path = Config.API_URL+'/post/listing';
        this.props.postDetailAction.fetchPostDetail(path,bunch);

}

renderImage(item){
    
   if(item.type == "1"){
    const flexCompleted = this.getCurrentTimePercentage() * 100;
      const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
      return(
          <View>

            <View style={{flexDirection:'row',height: 60,flex: 1,justifyContent:'space-between',}}>
              <Text style={{color:'#fff',fontWeight: 'bold',  lineHeight: 60, }}>{}</Text>
              
                      <TouchableOpacity
                                  style={{marginTop:17}}
                                  onPress={() => this.setState({ paused: !this.state.paused })}
                      >

                  <Icon name={this.state.paused?"play-circle-outline":"pause-circle-outline"} color={'#ffffff'} size={26}/>

                  </TouchableOpacity>
                  </View>  
   
          {this.spinnerVideo()}

            <Video
                 ref={(ref: Video) => { this.video = ref }}
                 source={{uri:item.videopost.image}}
                    // source={{uri:"http://techslides.com/demos/sample-videos/small.mp4"}}
                    resizeMode="contain" 
                      rate={this.state.rate}
                      paused={this.state.paused}
                      volume={this.state.volume}
                      muted={this.state.muted}
                      resizeMode={this.state.resizeMode}
                      onLoad={this.onLoad}
                      onProgress={this.onProgress}
                      onEnd={this.onEnd}
                      onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                      onAudioFocusChanged={this.onAudioFocusChanged}
                      controls={true}
                      onBuffer={this.onBuffer}
                    style={{ width: Dimensions.get('window').width-30, height: 260, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
                    repeat={false}
                  />  

                
                {/*<View style={[styles.trackingControls,{}]}>
                          <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                          </View>
                </View>*/}


            <Text  numberOfLines={this.state.lines} style={{ fontSize: 12, color: '#fff',marginTop:10,marginBottom:10 }}>{item.description}</Text>
            
        </View>);
   }
    else{
        return(
          <View>
            <Text style={{color:'#fff',fontWeight: 'bold', height: 60, lineHeight: 60, flex: 1}}>{"item.item.title"}</Text>
            <Image
                style={{ width: Dimensions.get('window').width-30, height: 260, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
                source={{uri:item.imagepost.image}}
              />
            <Text  numberOfLines={this.state.lines} style={{ fontSize: 12, color: '#fff',marginTop:10,marginBottom:10 }}>{item.description}</Text>
            
        </View>);
    }
  }


doShareOpen(item){  

    this.setState({    
      shareOpen: !this.state.shareOpen,
      shareItem:item
    });

}

doBeforeShareClose(){
  console.log("doBeforeClose");
  this.setState({
    shareOpen:false,
  }); 
}

_renderShareComponent(){
   
    console.log("ShareOpen::",this.state.shareItem);

    if(this.state.shareItem == null){
      return;
    }else{
    // if(this.state.shareOpen){
    return (
    
      <ShareComponent 
        visible={this.state.shareOpen}
        doBeforeClose={this.doBeforeShareClose.bind(this)}
        title={this.state.shareItem.title}
        message={this.state.shareItem.title}
        url={"https://play.google.com/store/apps/details?id=com.ventoapp"}
        subject={"Subject"}
        // imageUrl={this.state.imgUrl}
      />
    
    );
  }

}

renderImg(){
  console.log("this",this.props.login.loginData);
  if(this.props.login.loginData!=null){

  if(this.props.login.loginData.user!=null){


    if(this.props.login.loginData.user.image==""){
      return(
        <View style={{width: 36, height: 36,borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}>
        <Avatar
                  icon="person"
                  size={36} 
                  // iconSize={60}
                  iconColor="#ffffff"
              />
        
        </View>

      );
    }else{
      return(
        <Image
        style={{ width: 36, height: 36, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
        source={{ uri: this.props.login.loginData.user.image }}
      />
      );
    }
  }
}
}

renderNm(){
  if(this.props.login.loginData!=null){
    if(this.props.login.loginData.user!=null){
      return(
        <Text numberOfLines={1} style={{paddingLeft:10,fontSize:14,textAlign: 'left', color: 'gray',width:Dimensions.get("window").width-100,
        justifyContent:'center',alignItems:"center"}}>{"Add a comment"}</Text>
     );
    }else{
      return(<View/>);
    }
  }
}

spinner(){
    // alert('Spinner2');
    
    if(this.props.postDetail.isLoading)
    { 
      return(

        <View styles={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width}}>
          <Spinner />
        </View>

      );
    }
}

spinnerVideo(){
    // alert('Spinner2');
    
    if(this.state.isLoading)
    { 
      return(

        <View styles={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width}}>
          <Spinner />
        </View>

      );
    }
}

favourite(id){
  var path = Config.API_URL+'/like/unique-create';
 
  var bundle = { 
      post:id
  };     
  this.props.favaction.fetchFavCreate(path,bundle,this.props.profilePostAction,this.props.postAction,true,this.props.postDetailAction);
}


getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
};

  render(){
 
    const item=this.props.postDetail.postDetail;

      
// alert(JSON.stringify(this.props.postDetail))
    if(this.props.postDetail.isLoading)
    { 
      return(

        <View styles={{height:Dimensions.get('window').height,justifyContent:'center',alignItems:'center',alignSelf:'center',width:Dimensions.get('window').width}}>
          <Spinner />
        </View>

      );
    }
  
    if(item != null){ 
      var isLike=false;
      if(item.externalLike.length > 0){ 
        isLike=true;
      }


    return(

        <View style={{flex:1,backgroundColor:"#ffffff",marginTop:Platform.OS=='ios'?20:0}}>
              
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}} style={{paddingLeft:15,flexDirection:'row',height:50,alignItems:'center'}}>
            <Icon name="arrow-back" color={'#000000'} size={22}/>
            <Text style={{marginLeft:20,textAlign:'center',fontSize:20,fontFamily:'Roboto-Medium',color:'#000',marginRight:10}}>{item.title}</Text>
          </TouchableOpacity>


          <View style={{flex:1,backgroundColor:"#ffffff",}}> 
              
              <ScrollView>

              <View style={{height: 60,backgroundColor: 'white', flexDirection: 'row' }}>
               
                <Image
                  style={{ width: 36, height: 36, margin: 12, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
                  source={{ uri: ""}}

                />


              <Text style={{ color: '#000',fontWeight: 'bold', height: 60, lineHeight: 60, flex: 1 }}>{}</Text>
            
              </View>

              

              <View style={{backgroundColor:'#000',paddingLeft:15,paddingRight:15,paddingBottom:10,}}>
              {this.renderImage(item)}
              </View>


              <View style={{ height: 54, backgroundColor: 'white', flexDirection: 'row' }}>
                
                <TouchableOpacity onPress={()=>{this.favourite(item._id)}}>
                  <Icons name={isLike?"heart":"heart-o"} size={29} color="black" style={{ marginTop: 12, marginLeft: 15 }} />
                </TouchableOpacity>
                  {/*<TouchableOpacity  onPress={()=>{this.props.navigation.navigate("Comment",{id:item._id})}}>
                <Icons name="comments-o" size={29} color="black" style={{ marginTop: 12, marginLeft: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.doShareOpen(item)}} >
                  <Icons name="send-o" size={29} color="black" style={{ marginTop: 12, marginLeft: 20 }} />
                </TouchableOpacity>
                */}
                <View style={{ flex: 1 }} />
                
                {/*<TouchableOpacity onPress={()=>{this.bookmark(item._id)}} >
                  <Icons name={isBookmark?"bookmark":"bookmark-o"} size={29} color="black" style={{ marginTop: 12, marginRight: 15 }} />
                </TouchableOpacity>
                */}

              </View>
              <View style={{backgroundColor: 'white',paddingLeft: 15 }}>
                <Text style={{ fontSize: 12, color: 'black' }}>{item.nlikes+' likes'}</Text>
              </View>


             {/* COMMENT PART
              
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Comment",{id:item._id});
                    this.props.commentAction.commentReset();
                  }} style={{justifyContent:'flex-start'}}>


                <View style={{}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:60,
                      paddingLeft: 15 ,paddingRight:15,
                      // backgroundColor:"green",
                      // marginBottom:10,
                      // marginLeft:25,
                      // marginRight:15,
                      // justifyContent:'flex-end',
                      backgroundColor:Colors.snow,
                      width:Dimensions.get("window").width
                      }}>
                            {this.renderImg()}
                          {/this.renderNm()}

                    </View>
           
                </View>
                
              </TouchableOpacity>

              */}
                      {this._renderShareComponent()}      
        
                  </ScrollView>
        </View>

      </View>

    )
  }
  else{
    return(<View></View>)
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 10,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 10,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  playBtn:{

    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 10,
    right: 0,
  }
});


const mapStateToProps = state => {
  // alert(JSON.stringify(state.login));
  return {
    login : state.login,
    post : state.post,
    postDetail : state.postDetail,
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
    
    profilePostAction : bindActionCreators(
      profilePostAction, dispatch,
    ),

    postDetailAction: bindActionCreators(
      postDetailAction, dispatch,
    ),
    favaction: bindActionCreators(
      favaction, dispatch,
    ),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
