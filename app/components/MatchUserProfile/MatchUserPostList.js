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
  Dimensions,BackHandler, I18nManager,ScrollView,ImageBackground,Alert,ToastAndroid

} from 'react-native';
import Permissions from 'react-native-permissions';


import Video from 'react-native-video';
import moment from 'moment';
// import prompt from 'react-native-prompt-android';
// import AdComponent from './AdComponent';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
var ShareComponent =require('../../reducer/lib/ShareComponent');


// import IconFeather from 'react-native-vector-icons/dist/Feather';
import { Toolbar,Button,Icon,Avatar } from 'react-native-material-ui';

// import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Menu from '../../common/Menu';
import ProfessionsMultiPick from '../../common/ProfessionsMultiPick';
var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var CommonUtility =require('../../reducer/lib/CommonUtility');
var Config = require('../../Config');
import {Metrics,Colors } from '../../Themes/';
var Spinner = require('../../Spinner');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
var ListStyle = require('../../style/ListStyle');

import { PermissionsAndroid } from 'react-native';

// import DeviceInfo from 'react-native-device-info';
import { NavigationEvents } from "react-navigation";

var RegistrationStyle = require('../../style/RegistrationStyle');

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import * as matchUserPostListAction from '../../action/matchUserPostListAction';

class MatchUserPostList extends Component {

constructor(props) {
    super(props);
    this.state={
       fcmToken:null,
      isFinished:false,
      isLoading: false,
        visible:false,
      pageNo : 0,
      perPage:10,
      isPagination:true,
      filterData:{},
      isFromFilter:false,

      filterTagIds:[], //to create array of ids of multiplt tags
      isLike:false,

      fetchContactsList:[],
      userid:null,

      currentuser_id:'',
      shareOpen:false,
      shareItem:null,

      isRefreshRequest:false,

      isNetOff:false,
      renderPlaceholderOnly: true,
      viewRef: null,

      loginId:'',
      reportModalVisible:false,

      reportItem:null,
      reportmessage:null,

      listtypeState:'',
      txtVisible:true,
       lines:3,
       staySelect:false,
       cameraPermission:"undetermined",
       callPhonePermission:'undetermined',


       modalVisible:false,
       subcategory:[],
       
    };
    this._renderShareComponent = this._renderShareComponent.bind(this);

}

componentWillMount(){
  var that=this;
  

  AuthUtility.getUserField('_id',function(_id){
    var _id=_id;
    that.setState({loginId:_id});

  });
 
}

componentDidMount() {
  var that =this;
  that.getAllData();     

}
componentWillReceiveProps(nextProps){
    

    if(nextProps.listtype != this.state.listtypeState && nextProps.listtype!= ''){
      // alert(this.state.listtypeState+'nextProps::nextProps.::'+nextProps.listtype)  
      this.setState({listtypeState:nextProps.listtype},
       ()=>{this.getAllData();} 
      )
      

    }
    else
      return;
}

oncloseMessageModal(){
  this.setState({visible:false})
}


getNetInfo(){

    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));

      if(isConnected){
        this.setState({isNetOff:false})        
      }
      else{
        CommonUtility.showToast("Connection not available...Retry!");
        return;
      }

    });    

}

applyFilterData(){

  // alert('refreshhhh')
   this.getAllData('',true);
  
}



getAllData(loadMore,refreshList){


  if(this.props.matchUserPostList.isLoading == true)
    return;


    // alert(this.props.matchUserPostList.isFinished+'*///*'+this.props.listtype);
   if(this.props.matchUserPostList.isFinished == true)
      return;


    if(this.props.matchUserPostList.isFinished && this.props.matchUserPostList.isLoading == false)
      return;   


 // alert('Hii'+this.props.matchForUserId)
    if(loadMore == 'loadMore'){
      this.fetchFeed({
        reqSorce:'mobile',
        perPage:this.state.perPage,
        user:this.props.matchForUserId,
        pageNo:this.props.matchUserPostList.pageNo,
        isPagination:this.state.isPagination,
      },loadMore,refreshList);  
    }
    else{
      this.fetchFeed({
        reqSorce:'mobile',
        perPage:this.state.perPage,
        user:this.props.matchForUserId,
        pageNo:0,
        isPagination:this.state.isPagination,
      },loadMore,refreshList);
    }
    
}

fetchFeed(bunch,loadMore,refreshList){
 // alert(JSON.stringify(this.props.login.loginData.user._id))
 // alert('000000')
      this.getNetInfo();
      // return;
      // alert(this.props.listtype)

      console.log('fetchFeed call:after getNetInfo',bunch);
      var that = this;
       
        var path = Config.API_URL+'/post/listing';
        // AuthUtility.getToken(function(token){
        //   ApiUtility.setToken(token);

          if(loadMore == 'loadMore'){
            // alert('loadMore');
                  
                  that.props.matchUserPostListAction.fetchMatchUserPostList(path,bunch,refreshList?0:that.props.matchUserPostList.pageNo,true,refreshList);     
          }
          else{
      
                  that.props.matchUserPostListAction.fetchMatchUserPostList(path,bunch,0,false,refreshList);            
          }
      
};

favourite(id){
  var path = Config.API_URL+'/like/unique-create';
 
  var bundle = { 
      post:id
  };     
  this.props.favaction.fetchFavCreate(path,bundle,this.props.matchUserPostListAction,false,null);
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
      // alert(this.state.shareOpen)
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

spinner(){
    // alert('Spinner2');
    
    if(this.props.matchUserPostList.isLoading)
    { 
      return(

        <View styles={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width}}>
          <Spinner />
        </View>

      );
    }
}



  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  renderImage(item){
    // alert(JSON.stringify(item))
   if(item.item.type == "1"){
      return(
          <View>
             <View style={{flexDirection:'row',alignItems:'space-between'}}>
                <Text style={{color:'#fff',fontWeight: 'bold', height: 60, lineHeight: 60, flex: 1}}>{item.item.title}</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostDetail',{item:item,fromMatchUserPostList:true})}}>
                  <Icon name={"play-circle-outline"} color={'#ffffff'} size={26}/>
                </TouchableOpacity>
              </View>
            <Video
                 ref={(ref: Video) => { this.video = ref }}
                 source={{uri:item.item.videopost.image}}
                    // source={{uri:"http://techslides.com/demos/sample-videos/small.mp4"}}
                    resizeMode="contain" 
                    muted={false}
                     rate={this.state.rate}
                      paused={true}
                      volume={this.state.volume}
                    // resizeMode={this.state.resizeMode}
                      onLoad={this.onLoad}
                      onProgress={this.onProgress}
                      onEnd={this.onEnd}
                    style={{ width: Dimensions.get('window').width-30, height: 260, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
                    repeat={false}
                  />  

            <Text  numberOfLines={this.state.lines} style={{ fontSize: 12, color: '#fff',marginTop:10,marginBottom:10 }}>{item.item.description}</Text>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostDetail',{item:item,fromMatchUserPostList:true})
            }}>
            <Text  style={{fontFamily:"Roboto-Regular",color:'#fff',height:20,alignSelf:'flex-end'}}>{"Read More"}</Text></TouchableOpacity> 
        </View>);
   }
    else{
        return(
          <View>
            <Text style={{color:'#fff',fontWeight: 'bold', height: 60, lineHeight: 60, flex: 1}}>{item.item.title}</Text>
            <Image
                style={{ width: Dimensions.get('window').width-30, height: 260, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
                source={{uri:item.item.imagepost.image}}
              />
            <Text  numberOfLines={this.state.lines} style={{ fontSize: 12, color: '#fff',marginTop:10,marginBottom:10 }}>{item.item.description}</Text>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostDetail',{item:item,fromMatchUserPostList:true})
            }}>
            <Text  style={{fontFamily:"Roboto-Regular",color:'#fff',height:20,alignSelf:'flex-end'}}>{"Read More"}</Text></TouchableOpacity> 
        </View>);
    }
  }


renderItem(item,index){
  console.log("render",item);

  var isLike=false;
   if(item.item.externalLike.length > 0){ 
        isLike=true;
    }

      return(
       
        <View style={{marginBottom:10,}}>             
            <View style={{height: 60,backgroundColor: 'white', }}>
               
                <Image
                  style={{ width: 36, height: 36, margin: 12, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
                  source={{ uri: ""}}

                />

                <Text style={{ color: 'black',fontWeight: 'bold', height: 60, lineHeight: 60, flex: 1 }}>{ "item.item.user.username"}</Text>
            </View>
            
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostDetail',{item:item,fromMatchUserPostList:true})}}>

                  <View style={{backgroundColor:'#000',paddingLeft:15,paddingRight:15,paddingBottom:10}}>
                  {this.renderImage(item)}
                  </View>

                </TouchableOpacity>

              <View style={{ height: 54, backgroundColor: 'white', flexDirection: 'row' }}>
                
                  <TouchableOpacity onPress={()=>{this.favourite(item.item._id)}}>
                    <Icons name={isLike?"heart":
                    "heart-o"} size={29} color="black" style={{ marginTop: 12, marginLeft: 15 }} />
                  </TouchableOpacity>

                  {/*<TouchableOpacity onPress={()=>{this.doShareOpen(item.item)}} >
                    <Icons name="send-o" size={29} color="black" style={{ marginTop: 12, marginLeft: 20 }} />
                  </TouchableOpacity>
                */}
               
                  <View style={{ flex: 1 }} />
                
              </View>
               <View style={{backgroundColor: 'white',paddingLeft: 15,height:30 }}>
                <Text style={{ fontSize: 12, color: 'black' }}>{item.item.nlikes+' likes'}</Text>
              </View>

             {/* <View style={{backgroundColor: 'white',paddingLeft: 15 }}>
                <Text style={{ fontSize: 12, color: 'black' }}>{item.item.nfavorite+' likes'}</Text>
                <Text style={{ fontSize: 12, color: 'gray' }}>{'View '+item.item.ncomment+' comment'}</Text>
              </View>
            
            
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Comment",{id:item.item._id});
              this.props.commentAction.commentReset();
              }} style={{justifyContent:'flex-start'}}>
          
                <View style={{marginBottom:Platform.OS=='ios'?0:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:60,
                    paddingLeft: 15 ,paddingRight:15,
                    // backgroundColor:"green",
                    marginBottom:Platform.OS=='ios'?0:10,
                    // marginLeft:25,
                    // marginRight:15,
                    // justifyContent:'flex-end',
                    backgroundColor:Colors.snow,
                    width:Dimensions.get("window").width
                    }}>
                            
                      </View>
                 
              </View>
          </TouchableOpacity>
        */}
      </View>
  );      

}


onListFooterComponent(){
  
  var isFinished=this.props.listtype == 'bookmark'?this.props.matchUserPostList.bookmarkFinish:this.props.matchUserPostList.isFinished;

  if((this.props.matchUserPostList.postList || this.props.matchUserPostList.filterpostList)  && isFinished)
  {
      console.log('onListFooterComponent:not found'); 
      return(
        
          <View style={{height:200,justifyContent: 'center',alignItems:'center',backgroundColor:color.mainbackground,width:Dimensions.get('window').width,}} >
          
             <View style={[ListStyle.notFoundcontainer,{backgroundColor:color.mainbackground}]}>
              <Icon name="search" size={18} color={color.appTitle} style={ListStyle.notFoundIcn}  />     
            </View>

            <Text  style={{fontFamily:'Roboto-Bold'}}> No More Records Found </Text>
        
          </View>
        
     )
  }
  else if(isFinished){
    console.log('onListFooterComponent:if'); 
    return null;    
  }
  else{
    // alert('**ssssss')
    console.log('Spinner3');
      return(
        <View style={{alignItems:'center',height:50,alignSelf:'center',width:Dimensions.get('window').width,}}>
          <Spinner />
        </View>
      );
  }
}

renderList(){

  // alert(" this.props.matchUserPostList"+JSON.stringify(this.props.matchUserPostList));
  var list = this.props.matchUserPostList;
  
  if(this.props.matchUserPostList.isLoading && this.props.matchUserPostList.pageNo == 0){
    return (<Spinner />)
  }

  else if(list == null && (this.props.matchUserPostList.isFinished==true  && this.props.matchUserPostList.isLoading ==false )){
    return( 
      <View style={{height:Dimensions.get('window').height-200,justifyContent: 'center',alignItems:'center',backgroundColor:color.homebackground,width:Dimensions.get('window').width,}} >
          
            <View style={[ListStyle.notFoundcontainer,{backgroundColor:color.homebackground}]}>
              <Icon name="search" size={18} color={color.appTitle} style={ListStyle.notFoundIcn}  />     
            </View>

            <Text  style={{fontFamily:'Roboto-Bold'}}> No Records Found </Text>
        
      </View>
    )
  }

  else{
// alert(JSON.stringify(this.props.matchUserPostList));
    return(
      <View style={{backgroundColor:color.homebackground}}>
          <FlatList
              style={{}}
              data={this.props.matchUserPostList.matchUserPostList}
              extraData={this.props}
              renderItem={this.renderItem.bind(this)}
              onRefresh={() =>this.applyFilterData()}
              refreshing={false}
              // inverted={true}
              keyExtractor={(item, index) => index}
              onEndReached={()=>{this.getAllData('loadMore')}}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.5}
              ListFooterComponent={this.onListFooterComponent.bind(this) }
              // ListHeaderComponent={this._renderHeader.bind(this)} //not in use for AutoCrud
          />
      </View>
    );
  }
}



// implement frd modal 
  oncloseModal(subcatObject){
    
    if(subcatObject == 'noChange'){
        this.setState({
          modalVisible : false,
        });
    
    }
    else{
    
        this.setState({
          modalVisible : false,
          subcategory:subcatObject
        });
    }
    // alert("oncloseProfessionsMultiPick"+JSON.stringify(subcatObject));

  }
   onSubcatPicked(subcatObject){

  console.log("onSubCatProcessDone:",subcatObject);
  this.setState({subcategory:subcatObject});

  }
render() {
   // alert('hi')
    return (
 
      <View style={{flex:1,backgroundColor:color.homebackground}}>

            {this.renderList()}
            {this._renderShareComponent()}      
                  
      </View>
    );
  }
}

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}


const styles = StyleSheet.create({

modalcontainer: {
      padding:20,
      paddingTop:10,
      width: Dimensions.get('window').width-40,
      height: Dimensions.get('window').height/2,
      backgroundColor:"#fff",
      justifyContent:'flex-start',
      // backgroundColor:'red'
      // margin:30
      // alignItems:'flex-end',
},
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
},

});
module.exports = MatchUserPostList;
