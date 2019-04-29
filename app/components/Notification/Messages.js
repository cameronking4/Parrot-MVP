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
  Dimensions,BackHandler, I18nManager,ScrollView,ImageBackground,Modal,Alert,FlatList,NetInfo,ListView
} from 'react-native';
// import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Toolbar,Button,Avatar } from 'react-native-material-ui';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var CommonUtility =require('../../reducer/lib/CommonUtility');
var Config = require('../../Config');
// import { GiftedChat } from 'react-native-gifted-chat'
var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
var ImagePicker = require('react-native-image-picker');
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as chatRoomAction from '../../action/chatRoomAction';
import * as loginAction from '../../action/loginAction';
import * as notificationAction from '../../action/notificationAction';
import Notistyles from "./styles";
import { Metrics, Colors } from "../../Themes/";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
 var data;
 const options = {
    title: 'Select Image or Video',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    // customButtons: [
    //     {name: 'video', title: 'Take Video...'},
    //     {name: 'video_library', title: 'Choose Video from library...'},
    // ],
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
const EachMsg = (props) => {

  console.log("props",props.msg);
  if (props.sent === false) {
    return (
      <View style={styles.eachMsg}>
        <Image source={{ uri: props.image }}style={styles.userPic} />
        <View style={styles.msgBlock}>
          <Text style={styles.msgTxt}>{props.msg}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.rightMsg} >
      <View style={styles.rightBlock} >
        <Text style={styles.rightTxt}>{props.msg}</Text>
      </View>
      <Image source={require('../Images/crushd.png')} style={styles.userPic} />
    </View>
  );
};

const conversation = [
  {
    sent: true,
    msg: 'all cool!',
  },
  {
    sent: false,
    msg: 'Hey wassup?',
  },
];

class Messages extends Component {

constructor(props) {
    super(props);
    this.state={
        messages: [],
        login_id:'',
        chatroomId:"",
        chatroomdata:null,
        dataSource: ds.cloneWithRows(conversation),
      msg: '',
      item:null,
       isFinished:false,
      isLoading: false,
        visible:false,
      pageNo : 0,
      perPage:10,
       isPagination:true,
roomUser:null,
// upload image
       imagepost:"",
      videopost:"",
    };
      this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
  
}

 componentWillMount() {
// alert('messages.js')
  var that=this;
  const { navigation } = this.props;
  const roomUser=navigation.getParam('roomUser',{});
  this.setState({roomUser:roomUser},()=>{this.updateUnread()});
}

componentDidMount(){
    var that=this;
    
     AuthUtility.getToken(function(token){
      
      ApiUtility.setToken(token);
        if(token!==null){
           that.getListMessages('',false);
       
          // that.getAllData('',false);
          // 5bc6c62b22e058168766dbc2
         
      }
       
    });
  }

updateUnread(){ 

  const { navigation } = this.props;
  const unreadForUser=navigation.getParam('unreadForUser',{});
  const item=navigation.getParam('item',{});

   if(unreadForUser == 'nuser1'){
          var bunch={ 
          reqSorce:'mobile',         
          _id:item._id,
          nuser1:'0'
        };

        var that=this;

        var path = Config.API_URL+'/room/update';
        this.props.notificationAction.updateForUnread(path,bunch);

   }
   else{
        var bunch={ 
          reqSorce:'mobile',         
          _id:item._id,
          nuser2:'0',
        };

        var that=this;

        var path = Config.API_URL+'/room/update';
        this.props.notificationAction.updateForUnread(path,bunch);

   }
    
}

getListMessages(loadMore,refreshList){
  const { navigation } = this.props;
  const item=navigation.getParam('item',{});
  this.setState({item:item});
 
   var that=this;
 if (this.props.chatRoom.isFinished == true) return;

    if (this.props.chatRoom.isLoading == true) return;

    if (this.props.chatRoom.isFinished && this.props.chatRoom.isLoading == false)
      return;
    else {
       var path = Config.API_URL+'/message/listing';
 AuthUtility.getUserField('_id',function(login_id){
    
    
    that.setState({login_id:login_id},()=>{
          console.log("s",login_id);
     that.props.chatRoomAction.fetchChatMessageList(login_id,
        path,
        {
            room:item._id
          },
        0,
        false,
        refreshList
      );
   });
   });
        // that.fetchFeed(
        //   {
        //     reqSorce: "mobile",
        //     perPage: that.state.perPage,
        //     pageNo: that.props.chatRoom.pageNo,
        //     isPagination: that.state.isPagination,
        //     room:item._id
        //   },
        //   loadMore,
        //   refreshList
        // );
     
    }
    // if(loadMore == 'loadMore'){
    //   this.fetchFeed({
    //     reqSorce:'mobile',
    //     perPage:this.state.perPage,
    //     pageNo:this.props.chatRoom.pageNo,
    //     isPagination:this.state.isPagination,
    //     room:item._id
    //   },loadMore,refreshList);  
    // }
    // else{
    //   this.fetchFeed({
    //     reqSorce:'mobile',
    //     perPage:this.state.perPage,
    //     pageNo:0,
    //     isPagination:this.state.isPagination,
    //     room:item._id
    //   },loadMore,refreshList);
    // }


   
   
}
fetchFeed(bunch, loadMore, refreshList) {
  var that=this;
const { navigation } = this.props;
  const item=navigation.getParam('item',{});
  // this.setState({item:item});
 
  AuthUtility.getUserField('_id',function(login_id){
    
    
    that.setState({login_id:login_id},()=>{
          console.log("s",login_id);
       
          var path = Config.API_URL+'/message/listing';



    if (loadMore == "loadMore") {
      // 
      
        var bunch = that.props.chatRoom.content;
        // alert(JSON.stringify(bunch));
        bunch["pageNo"] = that.props.chatRoom.content.pageNo + 1;
        that.props.chatRoomAction.fetchChatMessageList(login_id,
          path,
          bunch,
          refreshList ? 0 : that.props.chatRoom.pageNo,
          true,
          refreshList
        );
      
    } else {
      //  alert(JSON.stringify(bunch));
      that.props.chatRoomAction.fetchChatMessageList(login_id,
        path,
        bunch,
        0,
        false,
        refreshList
      );
    }
          // that.props.chatRoomAction.fetchChatMessageList(path,{},login_id); 
          
          that.setState({
            chatroomId:item._id,
            // chatroomdata:chatroomdata
          },()=>{
            that.setMessages()});
         
        
    });
   });

}
setMessages(){
  // var that=this;
    if(this.props.chatRoom.chatmessageList!== null){
           console.log("JSO",this.props.chatRoom.chatmessageList);
        // alert("ii"+JSON.stringify(this.props.chatRoom.chatmessageList));
        var arrMessages=this.props.chatRoom.chatmessageList;
        // for(var i=0;i<arrMessages.length;i++){
        //    conversation.unshift(arrMessages[i]);
        // }        
         // this.setState({
         //    dataSource: ds.cloneWithRows(arrMessages),
         //    });
    // for(var i=0;i<arrMessages.length;i++){

    //      // alert("@@"+arrMessages[0]);

    //     var messageData=null;
    //     if(arrMessages[i].use2._id== this.state.login_id){
    //       // alert("@@"+arrMessages[i].message);
         
    //       // add chat mesage Right
    //               messageData={
    //             sent: true,
    //             msg:  arrMessages[i].message,
    //           };
    //           conversation.unshift(messageData);
           

    //     }else{
    //        // alert("1");
    //       console.log("1",arrMessages[i].use2);
    //       // add chat message left
    //               messageData={
    //             sent: false,
    //             msg:  arrMessages[i].message,
    //           }
    //           conversation.unshift(messageData);
    //         // do replay
    //         this.setState({
    //         dataSource: ds.cloneWithRows(conversation),
    //         });

    //     }
    //   }  
    }
}

  reply() {
    conversation.unshift({
      sent: false,
      msg: 'React Native  is Awesome!',
    });
    // this.setState({
    //   dataSource: ds.cloneWithRows(conversation),
    // });
  }

send(postId) {
    var that=this;
     var item=this.state.item;
     var bundle;
     var path = Config.API_URL+'/message/create'; 
    //  // here user:1(receiver) user2 (sender) 
    if (this.state.msg.length > 0) {
          console.log("item",this.state.item);
                     
          bundle={
              room:item._id,
              use1:item.user1._id, //receiver id
              use2:this.state.login_id, //myid (sender)
              message:this.state.msg,
              type:1,
          };

       
    }else if(this.state.imagepost!==null && postId!==''){
         bundle={
              room:item._id,
              use1:item.user1._id, //receiver id
              use2:this.state.login_id, //myid (sender)
              message:this.state.imagepost,
              imagepost:postId,
              type:2,
          };

    }

     that.props.chatRoomAction.createChatMessage(path,bundle,this.state.login_id);
       
        console.log("this.props.chatmessageList");
        data=this.props.chatRoom.chatmessageList;
        if(this.props.chatmessageList!==null){
          this.setState({msg:''});
            // that.getListMessages();

      // //     conversation.unshift({
      // //   sent: true,
      // //   msg: this.state.msg,
      // // });
        }
  }


  // send(postId,NOMSG) {
  //   var that=this;
  //    var item=this.state.item;
  //    var bundle;
  //    var path = Config.API_URL+'/message/create'; 
  //   //  // here user:1(receiver) user2 (sender) 

  //   // alert(this.state.msg)
  //   if (this.state.msg == '' || this.state.msg == ' ' || this.state.msg == null) {
    
  //       alert('please enter message')
  //   }
  //   else if (this.state.msg !== '' && this.state.msg !== ' ' && this.state.msg !== null) {
    
      

  //         console.log("item",this.state.item);
         
            
  //         bundle={
  //             room:item._id,
  //             use1:item.user1._id, //receiver id
  //             use2:this.state.login_id, //myid (sender)
  //             message:this.state.msg,
  //             type:1,
  //         };

  //     that.props.chatRoomAction.createChatMessage(path,bundle,this.state.login_id);

  //   }else if(this.state.imagepost!==null && postId!==''){

  //     // alert('asdad'+this.state.msg)

  //        bundle={
  //             room:item._id,
  //             use1:this.state.roomUser._id, //receiver id
  //             use2:item.user2._id, //myid (sender)
  //             message:this.state.imagepost,
  //             imagepost:postId,
  //             type:2,
  //         };

  //         that.props.chatRoomAction.createChatMessage(path,bundle,this.state.login_id);

  //   }

       
  //       console.log("this.props.chatmessageList");
  //       data=this.props.chatRoom.chatmessageList;
  //       if(this.props.chatmessageList!==null){
  //         this.setState({msg:''});
  //           // that.getListMessages();

  //     // //     conversation.unshift({
  //     // //   sent: true,
  //     // //   msg: this.state.msg,
  //     // // });
  //       }
  // }
 getNetInfo(){

    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));

      if(isConnected){
        this.setState({isNetOff:false})        
      }
      else{
        // //alert('No Internet');
         ToastAndroid.show('Connection not available...Retry!', ToastAndroid.LONG);
        return;
      }

    });    

  }
  applyFilterData(){
   this.getAllData('',true);
  }

  
// onSend(messages = []) {

//   this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }))
    
//   var path = Config.API_URL+'/chatmessage/create';
//   this.props.chatRoomAction.createChatMessage(path,{
//               message:messages[0].text,
//               text:messages[0].text,
//               chatroom:this.state.chatroomId,
//               fromuser:this.state.login_id,
//               touser:this.state.chatroomdata.touser._id==this.state.login_id ?this.state.chatroomdata.fromuser._id:this.state.chatroomdata.touser._id,
//             });
//   }
// renderChat(){
//   if(Platform.OS=="ios"){
//     return( <KeyboardAvoidingView behavior = {Platform.OS=="ios"?"padding":'position'}  enabled> 
            
//             <View style={{height:Dimensions.get('window').height-70,}}>             
              
             
              
//             </View>
            
//             </KeyboardAvoidingView>);
  


//   }else{
//     return( <KeyboardAvoidingView  keyboardVerticalOffset={20} behavior ='position'  enabled> 
            
//             <View style={{height:Dimensions.get('window').height-70,}}>             
//               {/** 
//               // <GiftedChat
//               //   messages={this.state.messages}
//               //   onSend={messages => this.onSend(messages)}
//               //   user={{
//               //     _id: 1,
//               //   }}
//               // />
//               **/}
//             </View>
            
//             </KeyboardAvoidingView>
//       );
//   }
// }

renderImg(){
  console.log("this",this.props.login.loginData);
  if(this.props.login.loginData!==null){

  
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
renderItem(item,index){
 if(item.type==1){
  if (item.sent === false) {
    console.log("render",item);
    return (
      <View style={styles.eachMsg}>
        <Image source={{ uri: item.image }}style={styles.userPic} />
        <View style={styles.msgBlock}>
          <Text style={styles.msgTxt}>{item.msg}</Text>
        </View>
      </View>
    );
  }else{

  return (
    <View style={styles.rightMsg}>
      <View style={styles.rightBlock} >
        <Text style={styles.rightTxt}>{item.msg}</Text>
      </View>
      <Image source={{uri:item.image}} style={styles.userPic} />
    </View>
  );
  }
}
  else if(item.type==2){
    console.log("tttttt",item);
 if (item.sent === false) {
    console.log("render",item);
    return (
      <View style={styles.eachMsg}>
        <Image source={{ uri: item.image }}style={styles.userPic} />
        <View style={styles.msgBlock}>
         
     <Image
              resizeMode="cover"
              resizeMethod="resize"
              style={{height:150,
  width:220-20,
  backgroundColor:'#fff',
     borderRadius: 5,
  borderColor:'#fff',
  justifyContent:'center',
  alignItems:'center',marginTop:0}}
                  source={{uri:item.msg}}
              />
             
              
        </View>
      </View>
    );
  }else{

  return (
    <View style={styles.rightMsg}>
      <View style={styles.rightBlock} >
       
           <Image
                    resizeMode="cover"
                    resizeMethod="resize"
                    style={{height:150,
        width:220-20,
        backgroundColor:'#fff',
           borderRadius: 5,
        borderColor:'#fff',
        justifyContent:'center',
        alignItems:'center',marginTop:0}}
                        source={{uri:item.msg}}
                    />
             
             
      </View>
      <Image source={{uri:item.image}} style={styles.userPic} />
    </View>
  );
  }
    
  }
}
  renderList(){

    
    var list = this.props.chatRoom.chatmessageList;
    // alert(JSON.stringify(list));
    if(this.state.isLoading){
        return <Spinner/>;
    }
    if(list == null && this.props.comment.isFinished==true && this.props.comment.isLoading ==false){
      return( 
        <ScrollView style={{height:Dimensions.get('window').height-135}}>
        <View style={{height:Dimensions.get('window').height-135,justifyContent: 'center',alignItems:'center',backgroundColor:Colors.snow,width:Dimensions.get('window').width,}}>
              <View style={[ListStyle.notFoundcontainer,{backgroundColor:Colors.snow}]}>
                <MaterialIcons name="search" size={18} color={color.appTitle} style={ListStyle.notFoundIcn}/>     
              </View>
              <Text  style={{fontFamily:'Roboto-Medium'}}>No Comment Found</Text>
        </View>
        </ScrollView>
      )
    }
    else if(list!=null){
    
      return(
        
            <View style={{height:Dimensions.get('window').height-135,backgroundColor:Colors.snow}}>
            <FlatList
              style={{height:Dimensions.get('window').height-135}}
              data={list}
              // extraData={this.props}
              renderItem={(item)=>this.renderItem(item.item)}
              refreshing={false}
              inverted={true}
              keyExtractor={(item, index) => index}
              onEndReached={()=>{this.getAllData('loadMore',false)}}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.5}
              // ListFooterComponent={this.onListFooterComponent.bind(this) }
              // ListHeaderComponent={this._renderHeader.bind(this)} //not in use for AutoCrud
          />
             {/* <ListView
              dataSource={ds.cloneWithRows(list)}
              renderRow={this.renderItem.bind(this)}
              onEndReachedThreshold={100}
               initialListSize={10}
              enableEmptySections={true}
               onEndReached={()=>{
                this.getAllData('loadMore');
               }}
            /> */}
          
      </View>

      );
    }else{
      // alert("else");
      return (<View style={{height:Dimensions.get('window').height-135,backgroundColor:Colors.snow}}></View>);
    }
  }

renderNm(){
  
      return(
        
        <View>

          <TextInput
              multiline={true}
              autoFocus = {false}
              style={{paddingLeft:10,fontSize:14,textAlign: 'left', color: 'gray',width:Dimensions.get("window").width-100, justifyContent:'center',alignItems:"center"}}
              placeholder="Add a comment"
              placeholderTextColor={color.placeholderTextColor}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="default"
              textAlign={I18nManager.isRTL ? "right" : "left"}
              // tiniColor={Colors.loginBlue}
              onChangeText={(regposttitle) => this.checkWord(regposttitle)} 
              value={this.state.regposttitle}
              returnKeyType={ "next" } 
          />
        </View>
                
     );
   
  
}
renderListView(){
  if(this.props.chatRoom.chatmessageList!==null){
   
    var list=this.props.chatRoom.chatmessageList;
     console.log("DDDDDds",list);
    return( 
       <FlatList
              style={{height:Dimensions.get('window').height-135}}
              data={list}
              // extraData={this.props}
              renderItem={(item)=>this.renderItem(item.item)}
              refreshing={false}
              inverted={true}
              keyExtractor={(item, index) => index}
              // onEndReached={()=>{this.getListMessages('loadMore',false)}}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.9}
          />
            );
  }
}

// attachment module
imagePick(){
  var that=this;
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
                return
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

uploadVideo(uri){
    this.setState({isLoading:true});
    // var that=this;
    // var type="/videopost/save-image";
    
    // var path = Config.API_URL+type;
    //       ApiUtility.saveVideo(path,'file',
    //         uri,function(response){
            
    //         if(response)
    //         {
    //           CommonUtility.showToast(response.message +" Now you can post here.")
    //             console.log("Videosave::response:",response);
    //             that.setState({
    //               videopost:response.data.Newimgpath,image:true,isLoading:false});    
    //         }    
    //         else{
              
    //         }      
    //       },function(error){
    //           // that.props.onProcessLoding(true);
    //           // that.setState({
    //           //   isLoading: false
    //           // });
    //       });
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
              // CommonUtility.showToast(response.message +"Now you can post here.")
                console.log("ImageSinglePick::response:",response);
                that.setState({
                  imagepost:response.data.Newimgpath,image:true,isLoading:false}); 
                  that.createPost(2);
                  // that.send(); 
            }    
            else{
              
            }      
          },function(error){
          });
  }
renderChatUser(){
  if(this.state.roomUser!==null){
    console.log("itemmm",this.state.roomUser);
  return(
    <View style={[Notistyles.rowView,{alignItems: 'center'}]}>
    <View style={[Notistyles.profileImg, { alignSelf: "center" }]}>
        <Image source={{ uri: this.state.roomUser.image }}style={styles.userPic} />
      </View>
      <View style={[Notistyles.namePostView, { width: Metrics.WIDTH * 0.75 }]}>
          <Text style={styles.msgTxt}>{this.state.roomUser.firstname}</Text>
        </View>
      </View>
      );
    }
}
createPost(type){

  var that=this;
  var bunch={image:this.state.imagepost,description:'',type:type};
  var pathtype=type=="VIDEO"?"/videopost/create":"/imagepost/create";

        var path = Config.API_URL+pathtype;
        
        // this.props.notificationAction.addPost(path,bunch,this.props.navigation);  
ApiUtility.fetchAuthPost(path,bunch,
        function(response){
          if(response!=undefined){
          var postId=response.data._id;
          that.send(postId);
        }
      },function(error){

       // ToastAndroid.show('You are not connected to internet. Please check your internet connection.', ToastAndroid.LONG);
     });
        that.setState({
          isLoading : false,
        });
        // console.log("sssss",this.props.post.postId);
}

render() {
  // const { navigation } = this.props;
  // const chatroomdata = navigation.getParam('chatroomdata',null);
  
  // alert(JSON.stringify(this.state.chatroomdata))
    return (
           
        <View style={{flex:1,
        backgroundColor:color.mainbackground,
        paddingTop:Platform.OS=='ios'?20:0,
        flexDirection:"column"}}>
           
      
      <ImageBackground
          
          style={styles.image}
        >
          <View style={styles.header}>
            <View style={styles.left}>
               <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{}}>
                <Icon name="arrow-back" color={'#000000'} size={22} style={{paddingLeft: 10 }}/>
              </TouchableOpacity>
             
            </View>
            <View style={{width:width-40,height:50,paddingTop:10,justifyContent:"center",alignItems:'center'}}>
            {this.renderChatUser()}
            </View>
          </View>
           <ScrollView>
          <KeyboardAvoidingView keyboardVerticalOffset={70} behavior = 'padding' style={styles.keyboard} >
           {this.renderListView()}
           
            <View style={styles.input}>
            <TouchableOpacity onPress={()=>{this.imagePick()}} style={{width:40,justifyContent:'center',alignItems:'center'}}>
                    <Image
                      resizeMode="contain"
                        resizeMethod="resize"
                      style={{ width: 20,height:20,}}
                         source={require('../Images/attach.png')}
                       />
                       
            </TouchableOpacity>
              <TextInput
               placeholderTextColor={color.placeholderTextColor} 
                style={{alignItems:'center',justifyContent:'center',width: Platform.OS=='ios'? width-20-20-10: width-20-20-10-20}}
                value={this.state.msg}
                onChangeText={msg => this.setState({ msg })}
                blurOnSubmit={false}
                onSubmitEditing={() => this.send('')}
                placeholder="Type a message"
                returnKeyType="send"
              />
              <TouchableOpacity onPress={()=>{this.send('')}}>
               <Image
                      resizeMode="contain"
                        resizeMethod="resize"
                      style={{ width: 20,height:20,marign:20}}
                         source={require('../Images/send.png')}
                       />
              </TouchableOpacity>         
            </View>
           
          </KeyboardAvoidingView>
           </ScrollView>
        </ImageBackground>
   
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
  keyboard: {
    // flex:1,
   height:height-50-25,
  // backgroundColor:"green",
    justifyContent: 'center',
  },
  image: {
    width,
    height,
    // backgroundColor:"green"
  },
  header: {
    height: 50,
    flexDirection: 'row',
    // justifyContent:"center",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    width:40
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    // height:40,
    flexDirection: 'row',
   alignItems: 'center',
    justifyContent:'center',
    padding: 10,
    height: 60,
    width: Platform.OS == 'ios'?width: width - 20,
     // backgroundColor: 'red',
    backgroundColor: '#fff',
    marginLeft:Platform.OS == 'ios'?0: 10,
     marginRight:Platform.OS == 'ios'?0: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    // backgroundColor: '#97c163',
    backgroundColor:color.text3,
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
 
});


const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const mapStateToProps = state => {

  return {
    chatRoom:state.chatRoom,
    notify:state.notify,
    login:state.login,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    chatRoomAction : bindActionCreators(
      chatRoomAction, dispatch,
    ),
      loginAction:bindActionCreators(
      loginAction, dispatch,
    ),
    notificationAction:bindActionCreators(
      notificationAction, dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);



        
