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
import * as profilePostAction from '../../action/profilePostAction';
// import * as favaction from '../../action/favaction';
import * as postAction from '../../action/postAction';
// import * as blockAction from '../../action/blockAction';
// import * as friendRequestAction from '../../action/friendRequestAction';
// import { InterstitialAdManager } from 'react-native-fbads';

// InterstitialAdManager.showAd("490113701492323_490670061436687")

// const adsManager = new NativeAdsManager(490113701492323_490182158152144);
class ProfilePostList extends Component {

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
 // componentWillReceiveProps(nextProps){
 //        var { navigation } = this.props;
       
 // }

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


delete(item){
   
      Alert.alert( 'Confirm Delete',
        'Are you sure to want delete this post ?',
        [
          {text: 'Yes', onPress: () => {
            var bunch ={_id:item._id}
            
          console.log("bun",bunch,item._id);
         var path = Config.API_URL+'/post/delete';
         this.props.profilePostAction.fetchPostDelete(path,bunch,{
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

  if(this.props.listtype == 'myprofile'){

     if(this.props.post.myprofileFinish == true)
      return;
 

    if(this.props.profilePost.myprofileFinish && this.props.profilePost.isLoading == false)
      return;
 
  }
  else{

    // alert(this.props.profilePost.isFinished+'*///*'+this.props.listtype);
   if(this.props.profilePost.myprofileFinish == true)
      return;
 
  // alert('getAllData')

    if(this.props.profilePost.myprofileFinish && this.props.profilePost.isLoading == false)
      return;   

  }


 // alert('Hii'+this.props.listtype)
    if(loadMore == 'loadMore'){
      this.fetchFeed({
        reqSorce:'mobile',
        perPage:this.state.perPage,
        pageNo:this.props.profilePost.pageNo,
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
 // alert(JSON.stringify(bunch)+loadMore+refreshList)
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
            // alert('loadMore'+that.props.listtype);
            if(that.props.profilePost.isFilter){
                var bunch=that.props.profilePost.content;
                bunch['pageNo']=that.props.profilePost.content.pageNo+1;


                 if(that.props.listtype=='myprofile')
                {
                  // alert('1')
                  
                    that.props.profilePostAction.fetchPostList(path,{isPagination:false,listtype:'myprofile',user:that.props.loginId},0,true,false,'myprofile'); 
                    // return;
                }
                
            }
            else{
                if(that.props.listtype=='myprofile')
                { 
                            
                            // alert('2')          
                    that.props.profilePostAction.fetchPostList(path,{isPagination:false,listtype:'myprofile',user:that.props.loginId},0,true,refreshList,'myprofile');
                    // return;
                }
               
            }
                
          }
          else{
            // alert('NOloadMore');

               // alert(this.props.listtype)
                if(that.props.listtype=='myprofile')
                {
                    // alert(that.props.loginId)
                    that.props.profilePostAction.fetchPostList(path,{isPagination:false,listtype:'myprofile',user:that.props.loginId},0,false,false,'myprofile'); 
                    // return;
                }
               
          }
        // });
      
};

favourite(id){
  var path = Config.API_URL+'/like/unique-create';
 
  var bundle = { 
      post:id
  };     
  this.props.favaction.fetchFavCreate(path,bundle,this.props.profilePostAction,this.props.postAction,false,null);
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


updatePost(id){
    
    //var path = Config.API_URL+'/post/update';
    // that.props.packageAction.updatePackage(path,bunch);
    this.props.navigation.navigate('PostCreate',{id:id,update:true});
  
}

deletePost(id){
  // alert(id);
  var that = this;
  var path = Config.API_URL+'/post/delete'; 

  var bundle={
    _id:id,
  };

  Alert.alert(
  'Post Remove',
  'Are you sure you want to remove this post?',
  [
    {text: 'Remove', onPress: () => {that.props.profilePostAction.fetchPostDelete(path,bundle,this.state._id);}},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  ],
  { cancelable: false }
  )

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
                  
                 {
                    item.item.user==this.state.loginId?
                   <TouchableOpacity  onPress={()=>{this.updatePost(item.item._id)}}>
                    <Icons name="pencil" size={25} color="black" style={{ marginTop: 12, marginLeft: 20 }} />
                  </TouchableOpacity>:null
                 }

                 {
                    item.item.user==this.state.loginId?
                 
                  <TouchableOpacity  onPress={()=>{this.deletePost(item.item._id)}}>
                    <Icons name="trash-o" size={25} color="black" style={{ marginTop: 12, marginLeft: 20 }} />
                  </TouchableOpacity> : null
                  }                    

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
  
  var isFinished=this.props.profilePost.myprofileFinish;

  if((this.props.profilePost.profilelist || this.props.profilePost.filterpostList)  && isFinished)
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

  // alert(" this.props.profilePost"+JSON.stringify(this.props.profilePost));
  
  var list = this.props.profilePost.profilelist;

  if(this.props.profilePost.isLoading && this.props.profilePost.pageNo == 0){
    return (<Spinner />)
  }

  else if(list == null && (this.props.profilePost.myprofileFinish==true  && this.props.profilePost.isLoading ==false )){
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
// alert(JSON.stringify(this.props.profilePost.postList));
    return(
      <View style={{backgroundColor:color.homebackground}}>
          <FlatList
              style={{}}
              data={this.props.profilePost.profilelist}
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


render() {
   // alert('hi')
    return (
 
      <View style={{flex:1,backgroundColor:color.homebackground}}>

            <View>
              {/*this.renderFilteredViewHeader()*/}
            </View>

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
// module.exports = ProfilePostList;


// module.exports = Home;
const mapStateToProps = state => {
  // alert(JSON.stringify(state.login));
  return {
    login: state.login,
    profilePost: state.profilePost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
    postAction: bindActionCreators(postAction, dispatch),
    profilePostAction: bindActionCreators(profilePostAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePostList);
