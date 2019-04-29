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

// var YearAgoPost = require('./YearAgoPost');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
var ListStyle = require('../../style/ListStyle');

import { PermissionsAndroid } from 'react-native';
// import PhoneNumberPicker from 'react-native-country-code-telephone-input'
var Contacts = require('react-native-contacts')


// import DeviceInfo from 'react-native-device-info';
import { NavigationEvents } from "react-navigation";

var RegistrationStyle = require('../../style/RegistrationStyle');

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import * as postAction from '../../action/postAction';
// import * as favaction from '../../action/favaction';
// import * as bookmarkAction from '../../action/bookmarkAction';
// import * as blockAction from '../../action/blockAction';
// import * as friendRequestAction from '../../action/friendRequestAction';
// import { InterstitialAdManager } from 'react-native-fbads';

// InterstitialAdManager.showAd("490113701492323_490670061436687")

// const adsManager = new NativeAdsManager(490113701492323_490182158152144);
class Home extends Component {

constructor(props) {
    super(props);
    this.state={
       fcmToken:null,
      isFinished:false,
      isLoading: true,
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
 // componentWillReceiveProps(nextProps){
 //        var { navigation } = this.props;
       
 // }

componentWillMount(){
  var that=this;
   AuthUtility.getToken(function(token){
      ApiUtility.setToken(token);
        that.props.loginAction.restoreLoginData();
 
        AuthUtility.getUserField('_id',function(_id){
      var _id=_id;
    that.setState({loginId:_id});

    AuthUtility.getKey("isContact",function(isContact){
     console.log("iff2"+_id);
     // all time set 
                    
     if(isContact!=='true' ){
    // console.log("IDDDDD"+this.props.isContact);
           const ContactPermission= Platform.OS=='ios'? Permissions.request('contacts') : 
           PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
              {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.'
              }
            );
             
             ContactPermission.then(() => {
              Contacts.getAll((err, contacts) => {
                 var newContacts=[];
                if (err === 'denied'){
                  // error
                } else {
                  console.log("alllll","con"+JSON.stringify(contacts));

                  for(var i=0;i<contacts.length;i++){
                    if(contacts[i].phoneNumbers.length>0){
                      var resultingString = contacts[i].phoneNumbers[0].number.replace(/[^\w\s]/gi, '');
                      var resultingString=resultingString.replace(/ /g,'');
                      newContacts.push({"mobileno":resultingString,"name":contacts[i].givenName,"user":_id,"email":contacts[i].emailAddresses.length>0?contacts[i].emailAddresses[0].email:""});
                      console.log("e"+resultingString);
                    }
                  }
                  console.log("arr","F"+newContacts.length);
                  // contacts returned in Array
        var path=Config.API_URL+'/contact/create';
           
              var bundle = {
                            "contacts":JSON.stringify(newContacts),
                          };
         ApiUtility.fetchPost(path,bundle,function(response){
              that.fetchContacts(_id);

                console.log("thim",response);
                if(response.success){
                  AuthUtility.setKey("isContact",'true',function(){
                    
                              that.fetchContacts(_id);
   
                  });
                    // alert('Registration done successfully');

                      // that.props.navigation.navigate('LoginPage');
                    
                    }
                    
                  },function(error){
                    
                   ToastAndroid.show('Connection not available...Retry!', ToastAndroid.LONG);
            
                    that.setState({
                      isLoading: false,
                    });
            
                  });
           

                } //else end
              })

      })

     }
    });
  });
        // that.setState({modalVisible:true});
  });
// AuthUtility.getUserField('_id',function(_id){
 
//  console.log("thatttttt","is"+_id);
//   });
     
// const adsManager = new NativeAdsManager(490113701492323_490182158152144, 10);
}

componentDidMount() {
  var that =this;
 // console.log("will","rec");
// setTimeout(()=>{{ 

// }}, 4500);

// alert('Did')
  that.getAllData();     

  // this.getNetInfo();
  
  // InteractionManager.runAfterInteractions(() => {
  //      this.setState({renderPlaceholderOnly: false});
  //  });


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
fetchContacts(_id){
var that=this;
//  var path=Config.API_URL+'/contact/listing';
           
//               var bundle = {
//                             "user":_id,
//                           };
//          ApiUtility.fetchPost(path,bundle,function(response){
                
//                 console.log("thim",response);
//                 if(response.success){
//                   // alert("success"+JSON.stringify(response))
                  that.setState({fetchContactsList:true,userid:_id,modalVisible:true,});
//                     // alert('Registration done successfully');

//                       // that.props.navigation.navigate('LoginPage');
                    
//                     }
                    
//                   },function(error){
                    
//                    ToastAndroid.show('Connection not available...Retry!', ToastAndroid.LONG);
            
//                     that.setState({
//                       isLoading: false,
//                     });
            
//                   });

           

}

oncloseMessageModal(){
  this.setState({visible:false})
}
 delete(item){
   
      Alert.alert( 'Confirm Delete',
        'Are you sure to want delete this post ?',
        [
          {text: 'Yes', onPress: () => {
            var bunch ={_id:item._id}
            
          console.log("bun",bunch,item._id);
         var path = Config.API_URL+'/post/delete';
         this.props.postAction.fetchPostDelete(path,bunch,{
        reqSorce:'mobile',
        perPage:this.state.perPage,
        pageNo:0,
        isPagination:this.state.isPagination,
      },item._id);
          
            
          }},
          {text: 'No', onPress: () => console.log('Bar Pressed!')},
        ]);
    
  }


applyFilterData(){

  // alert('refreshhhh')
   this.getAllData('',true);
  
}

getNetInfo(){

    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));

      if(isConnected){
        this.setState({isNetOff:false})        
      }
      else{
        CommonUtility.showToast("Connection not available...Retry!");
        // //alert('No Internet');
          // Snackbar.show({
          //     title: 'Connection not available...Retry!',
          //     duration: Snackbar.LENGTH_LONG,
          //     action: {
          //         title: 'Retry',
          //         color: 'green',
          //         onPress: () => { /* Do something. */ },
          //     },
          // });
        return;
      }

    });    

}


getAllData(loadMore,refreshList){


  if(this.props.post.isLoading == true)
    return;

  if(this.props.listtype == 'bookmark'){

     if(this.props.post.bookmarkFinish == true)
      return;
 

    if(this.props.post.bookmarkFinish && this.props.post.isLoading == false)
      return;
 
  }
  else if(this.props.listtype == 'myprofile'){

     if(this.props.post.myprofileFinish == true)
      return;
 

    if(this.props.post.myprofileFinish && this.props.post.isLoading == false)
      return;
 
  }
  else{

    // alert(this.props.post.isFinished+'*///*'+this.props.listtype);
   if(this.props.post.isFinished == true)
      return;
 
  // alert('getAllData')

    if(this.props.post.isFinished && this.props.post.isLoading == false)
      return;   

  }


 // alert('Hii'+this.props.listtype)
    if(loadMore == 'loadMore'){
      this.fetchFeed({
        reqSorce:'mobile',
        perPage:this.state.perPage,
        pageNo:this.props.post.pageNo,
        isPagination:this.state.isPagination,
      },loadMore,refreshList);  
    }
    else{
      this.fetchFeed({
        reqSorce:'mobile',
        perPage:this.state.perPage,
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
            if(that.props.post.isFilter){
                var bunch=that.props.post.content;
                bunch['pageNo']=that.props.post.content.pageNo+1;

                if(that.props.listtype=='bookmark')
                {
                  
                    that.props.postAction.fetchPostList(path,{isPagination:false,listtype:'bookmark'},0,true,false,'bookmark'); 
                    // return;
                }
                else if(that.props.listtype=='myprofile')
                {
                  // alert('1')
                  
                    that.props.postAction.fetchPostList(path,{isPagination:false,listtype:'myprofile',user:that.props.loginId},0,true,false,'myprofile'); 
                    // return;
                }
                else{
                  
                  that.props.postAction.fetchFilterPostList(path,bunch,refreshList?0:that.props.post.pageNo,true,refreshList);
                }
            }
            else{
               if(that.props.listtype=='bookmark')
                { 
                  
                    
                    that.props.postAction.fetchPostList(path,{isPagination:false,listtype:'bookmark'},0,true,refreshList,'bookmark');
                    // return;
                }
                else if(that.props.listtype=='myprofile')
                { 
                            
                            // alert('2')          
                    that.props.postAction.fetchPostList(path,{isPagination:false,listtype:'myprofile',user:that.props.loginId},0,true,refreshList,'myprofile');
                    // return;
                }
                else{
                  
                  that.props.postAction.fetchPostList(path,bunch,refreshList?0:that.props.post.pageNo,true,refreshList);
                }
            }
                
          }
          else{
            // alert('NOloadMore');

               // alert(this.props.listtype)
               if(that.props.listtype=='bookmark')
                {
                  
                    that.props.postAction.fetchPostList(path,{isPagination:false,listtype:'bookmark'},0,false,false,'bookmark'); 
                    // return;
                }
                else if(that.props.listtype=='myprofile')
                {
                    // alert(that.props.loginId)
                    that.props.postAction.fetchPostList(path,{isPagination:false,listtype:'myprofile',user:that.props.loginId},0,false,false,'myprofile'); 
                    // return;
                }
                else{
                  
                  that.props.postAction.fetchPostList(path,bunch,0,false,refreshList);
                }
          }
        // });
      
};

favourite(id){
  var path = Config.API_URL+'/like/unique-create';
 
  var bundle = { 
      post:id
  };     
  this.props.favaction.fetchFavCreate(path,bundle,this.props.postAction,false,null);
}

bookmark(id){
  var path = Config.API_URL+'/bookmark/unique-create';
 
  var bundle = { 
      post:id
  };  
      
  this.props.bookmarkAction.fetchBookmarkCreate(path,bundle,this.props.postAction,false,null);
 
}

friendrequestcancel(item){
  // console.log('friendrequest',item)
  // alert()
  var that =this;
    var path = Config.API_URL+'/friendrequest/delete';
   
    var bundle = { 
        _id:item.item.externalFriendrequest[0]._id,
        receiveruser:item.item.user._id
    };  
        
    this.props.friendRequestAction.fetchfriendrequestDelete(path,bundle);
 
 }

 friendrequest(item,msg){
  
  var that =this;
    var path = Config.API_URL+'/friendrequest/create';
   
    var bundle = { 
        user:this.state.loginId,
        receiveruser:item.item.user._id,
        message:msg,
    };  
        
    this.props.friendRequestAction.fetchfriendrequestCreate(path,bundle,item.item.user._id);
    // this.props.friendRequestAction.fetchJoinCall(path,bundle,this.props.notificationAction,this.props.navigation,item.user._id);
 }

reportPost(){
  
    if(this.state.reportmessage == null || this.state.reportmessage == ''){
      alert('Please enter report message');
      return;
    }
    else{
        var path = Config.API_URL+'/blockrequest/create';
       
        var bundle = {
            type:'POST', 
            user:this.state.loginId,
            post:this.state.reportItem._id,
            message:this.state.reportmessage,
        };  

        // alert(JSON.stringify(bundle))        
        this.props.blockAction.fetchBlockrequestCreate(path,bundle,this.props.postAction);
        this.setState({reportModalVisible:false})
      }
}


visibleReportModal(){
  
  // alert(this.state.reportModalVisible)
  if(this.state.reportModalVisible){
    return(

        <Modal  animationType = {"slide"} 
              transparent = {true}
              visible = {this.state.reportModalVisible}
              // onRequestClose = {this.setState({reportModalVisible:false})}
              >
        
          <ScrollView style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
            <View style={{height:Dimensions.get('window').height,backgroundColor:"rgba(0,0,0,0.4)",alignItems:'center',justifyContent:'center'}}> 
              
              <View style={styles.modalcontainer} elevation={5}>
  
                <Text style={{ color:color.iconColor,marginBottom:5,fontFamily:'Roboto-Medium' }}>Report Violence</Text>

                <TextInput 
                  placeholder={"Report Message"} 
                  placeholderTextColor={color.placeholderTextColor} 
                  underlineColorAndroid={'#f8f8f8'} 
                  onChangeText={(msg) => this.setState({reportmessage:msg})} 
                  value={this.state.reportmessage}
                  multiline={true}
                  textAlignVertical= 'top'   
                  style={{color:color.textInputColor,height:150,marginBottom:10,padding:10,paddingBottom:5,backgroundColor:'#f8f8f8'}}  
                  returnKeyType={ "next" }/>


                  <TouchableOpacity onPress={()=>{this.reportPost()}} style={[CommonStyle.submitBtnText,{width:Dimensions.get('window').width-70,marginLeft:10,justifyContent:'center',alignItems:'center',marginTop:15,height:40,borderRadius:3,borderWidth:1,borderColor:color.iconColor,backgroundColor:'#fff'}]}>

                      <Text style={{ color:color.iconColor,fontFamily:'Roboto-Medium' }}>SEND REPORT</Text>

                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{this.setState({reportModalVisible:false})}} style={[CommonStyle.submitBtnText,{width:Dimensions.get('window').width-70,marginLeft:10,justifyContent:'center',alignItems:'center',marginTop:15,height:40,borderRadius:3,borderWidth:1,borderColor:color.iconColor,backgroundColor:'#fff'}]}>

                      <Text style={{ color:color.iconColor,fontFamily:'Roboto-Medium' }}>CANCEL</Text>

                  </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </Modal>
      );
  }
}

friendRequestAccept(item){
    var path = Config.API_URL+'/friendrequest/update'; 
    var bundle={
      _id:item.item.externalFriendrequest[0]._id,
      status:"ACCEPTED",
    };
    this.props.friendRequestAction.fetchfriendrequestUpdate(path,bundle);
  }

renderFriendRequestBtn(item){
  if(item.item.user._id == this.state.loginId) {

    return null;
  }
    // alert(item.item.externalFriendrequest[0].receiveruser._id+'****'+this.state.loginId)

  if(item.item.externalFriendrequest.length == 0){
    return(

          <TouchableOpacity onPress={()=>{}} style={[CommonStyle.submitBtnText,{width:100,justifyContent:'center',alignItems:'center',height:30,borderRadius:3,backgroundColor:color.iconColor}]}>
            <Text style={{ color:'#fff',fontFamily:'Roboto-Medium' }}>SUBSCRIBE</Text>
          </TouchableOpacity>

    );
  }
  else if(item.item.externalFriendrequest[0].status=='REQUESTED' && item.item.externalFriendrequest[0].receiveruser._id == this.state.loginId){
     return(

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>{this.friendRequestAccept(item)}} style={[CommonStyle.submitBtnText,{width:100,justifyContent:'center',alignItems:'center',height:30,borderRadius:3,backgroundColor:'#fff',borderWidth:1,borderColor:color.iconColor}]}>
            <Text style={{ color:color.iconColor,fontFamily:'Roboto-Medium' }}>ACCEPT</Text>
          </TouchableOpacity>
        
          <TouchableOpacity onPress={()=>{this.friendrequestcancel(item);
          this.setState({staySelect:true});
          }} style={!this.state.staySelect?[CommonStyle.submitBtnText,{width:100,justifyContent:'center',alignItems:'center',height:30,borderRadius:3,backgroundColor:'#fff',borderColor:"red",color:"red",borderWidth:1,borderColor:color.iconColor}]
          :[CommonStyle.submitBtnText,{width:100,justifyContent:'center',alignItems:'center',height:30,borderRadius:3,backgroundColor:'#fff',borderWidth:1,borderColor:"red",color:"red"}]}>
            <Text style={{ color:!this.state.staySelect?color.iconColor:"red",fontFamily:'Roboto-Medium' }}>STAY PRIVATE</Text>
          </TouchableOpacity>
        </View>
    );
  }
  else if(item.item.externalFriendrequest[0].status=='REQUESTED'){
     return(

          <TouchableOpacity onPress={()=>{this.friendrequestcancel(item)}} style={[CommonStyle.submitBtnText,{width:100,justifyContent:'center',alignItems:'center',height:30,borderRadius:3,backgroundColor:'#fff',borderWidth:1,borderColor:color.iconColor}]}>
            <Text style={{ color:color.iconColor,fontFamily:'Roboto-Medium' }}>REQUESTED</Text>
          </TouchableOpacity>
    );
  }
  else{
    return(
          <TouchableOpacity onPress={()=>{this.friendrequestcancel(item)}} style={[CommonStyle.submitBtnText,{width:100,justifyContent:'center',alignItems:'center',height:30,borderRadius:3,backgroundColor:color.iconColor}]}>
            <Text style={{ color:'#fff',fontFamily:'Roboto-Medium' }}>UNSUBSCRIBE</Text>
          </TouchableOpacity>
    );
  }
  // else if(item.item.externalFriendrequest.){}
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
    
    if(this.props.post.isLoading)
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
   if(item.item.type == "1"){
      return(
          <View>
             <View style={{flexDirection:'row',alignItems:'space-between'}}>
                <Text style={{color:'#fff',fontWeight: 'bold', height: 60, lineHeight: 60, flex: 1}}>{item.item.title}</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostDetail',{item:item,fromHome:true})}}>
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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostDetail',{item:item,fromHome:true})
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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostDetail',{item:item,fromHome:true})
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
            
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostDetail',{item:item,fromHome:true})}}>

                  <View style={{backgroundColor:'#000',paddingLeft:15,paddingRight:15,paddingBottom:10}}>
                  {this.renderImage(item)}
                  </View>

                </TouchableOpacity>

              <View style={{ height: 54, backgroundColor: 'white', flexDirection: 'row' }}>
                
                  <TouchableOpacity onPress={()=>{this.favourite(item.item._id)}}>
                    <Icons name={isLike?"heart":
                    "heart-o"} size={29} color="black" style={{ marginTop: 12, marginLeft: 15 }} />
                  </TouchableOpacity>
                  {/*  <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("Comment",{id:item.item._id})}}>
                  <Icons name="comments-o" size={29} color="black" style={{ marginTop: 12, marginLeft: 20 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.doShareOpen(item.item)}} >
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
  
  var isFinished=this.props.listtype == 'bookmark'?this.props.post.bookmarkFinish:this.props.post.isFinished;

  if((this.props.post.postList || this.props.post.filterpostList)  && isFinished)
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

_renderHeader(){

  return(
      <View style={{marginBottom:10,elevation:12,backgroundColor:color.homebackground,}}> 
        <YearAgoPost navigation={this.props.navigation} />
      </View>
  )
}

renderList(){

  // alert(" this.props.post"+JSON.stringify(this.props.post));
  var list = this.props.post.postList;
  
  if(this.props.post.isLoading && this.props.post.pageNo == 0){
    return (<Spinner />)
  }

  else if(list == null && (this.props.post.isFinished==true  && this.props.post.isLoading ==false )){
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
// alert(JSON.stringify(this.props.post.postList));
    return(
      <View style={{backgroundColor:color.homebackground}}>
          <FlatList
              style={{}}
              data={this.props.post.isFilter?this.props.post.filterpostList:this.props.post.postList}
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

removeTags(item){

  console.log('removeTags:',item);  

  var bunch=this.props.post.content;
  var arr=JSON.parse(bunch['tags']);  
  var arrName =bunch['tagsName'];
  // alert(JSON.stringify(item) +'%%%%%'+bunch['tagsName'])
  for(var i=0;i<arr.length;i++){
      if(arr[i] == item._id){
    
        var path = Config.API_URL+'/post/listing';
 
        arr.splice(i,1);
        arrName.splice(i,1);

        bunch['tagsName']=arrName;
        bunch['tags']=arr.length==0?null:JSON.stringify(arr);
        // alert(JSON.stringify(arrName))
        this.props.postAction.fetchFilterPostList(path,bunch,0,false);

      }
  }

}

removekeywords(item){

  var bunch=this.props.post.content;
    
        var path = Config.API_URL+'/post/listing';
        bunch['q']='';
        
        this.props.postAction.fetchFilterPostList(path,bunch,0,false);

}

removecity(item){

  console.log('removeTags:',item);  

  var bunch=this.props.post.content;    
  var path = Config.API_URL+'/post/listing';

        bunch['city']='';
        // alert(JSON.stringify(arrName))
        // this.props.postAction.fetchFilterPostList(path,bunch,0,false);
}


renderFilteredViewHeader(){

// alert(JSON.stringify(this.props.post.content));

if(this.props.post.content != undefined || this.props.post.content !=null){
  if(this.props.post.isFilter)
  {
      var elements=[];
      
      const keywords =this.props.post.content.q;
      const city =this.props.post.content.city;
      const tags =this.props.post.content.tagsName;

      // alert(tags)
        
        if(keywords != null && keywords != ''){

            elements.push(<View style={{flexWrap:'wrap',flexDirection: 'row',}}>
            
                  <View  style={[CommonStyle.capsuleView,]}>
                      
                      <Text  style={[CommonStyle.capsuleText,{maxWidth:200}]} numberOfLines={1}>
                        {keywords}
                      </Text>

                      <TouchableOpacity  onPress={this.removekeywords.bind(this,keywords)}>
                        <Icon  name="close" size={14} color={color.appTitle} style={{alignItems:'flex-end',marginRight:3,marginLeft:3,}} />
                      </TouchableOpacity>

                  </View>
                     
              </View>
              );
        }

        if(city != ''){

            elements.push(<View style={{flexWrap:'wrap',flexDirection: 'row',}}>
            
                  <View  style={[CommonStyle.capsuleView,]}>
                      
                      <Text  style={[CommonStyle.capsuleText,{maxWidth:200}]} numberOfLines={1}>
                        {city}
                      </Text>

                      <TouchableOpacity  onPress={this.removecity.bind(this,city)}>
                        <Icon  name="close" size={14} color={color.appTitle} style={{alignItems:'flex-end',marginRight:3,marginLeft:3,}} />
                      </TouchableOpacity>

                  </View>
                     
              </View>
              );
        }


      if(tags != undefined){
        if(tags.length != 0 && tags.length != '' ){
          
          // for(var i=0;i<tags.length;i++){
            elements.push(<View style={{flexWrap:'wrap',flexDirection: 'row',}}>
            
            { tags.map((item, key)=>(
                  <View key={key} style={[CommonStyle.capsuleView,]}>
                      
                      <Text key={key} style={[CommonStyle.capsuleText,{maxWidth:200}]} numberOfLines={1}>
                        {item.name}
                      </Text>

                      <TouchableOpacity key={key} onPress={this.removeTags.bind(this,item)}>
                        <Icon key={key} name="close" size={14} color={color.appTitle} style={{alignItems:'flex-end',marginRight:3,marginLeft:3,}} />
                      </TouchableOpacity>

                  </View>
            ))}
                     
              </View>
              );
          }
        }

        if(elements.length > 0){
          return(
              <View >  
                <ScrollView horizontal={true} style={{backgroundColor:'#ffffff',marginBottom:3,marginTop:5,paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10}}>
                    {elements}
                </ScrollView>
              </View>
          );
        }
        else{
          return;
        }

  }
}
}

gotoAddPost(){

    this.props.navigation.navigate('PostCreate');

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

            <View>
              {/*this.renderFilteredViewHeader()*/}
            </View>

            {this.renderList()}
            {this._renderShareComponent()}      
            {this.visibleReportModal()}
          {/** frd modal**/}
                    <

                    ProfessionsMultiPick
                      modalVisible={this.state.modalVisible} 
                      oncloseModal={this.oncloseModal.bind(this)}
                      selectedArr={this.state.subcategory}
                      fetchContactsList={this.state.fetchContactsList}
                      userid={this.state.userid}
                      // itemPicked={(item)=>this.onSubcatPicked(item)} 
                      navigation={this.props.navigation}
                      // reviewAction={this.props.reviewAction}
                      // review={this.props.review}
                    />
            <TouchableOpacity onPress={() =>{this.gotoAddPost()}} style={{position:'absolute',bottom:5,right:20,justifyContent:'center',alignItems:'center',alignSelf:'flex-end',backgroundColor:color.text3,height:50,width:50,borderRadius:25}}>
              <Icon name="add"  style={styles.actionButtonIcon} />
            </TouchableOpacity>
      
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
module.exports = Home;
