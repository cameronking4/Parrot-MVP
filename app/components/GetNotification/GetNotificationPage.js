
import React, { Component } from 'react';
import { ToastAndroid,FlatList,Modal,Text, StatusBar, Platform, ImageBackground,Dimensions,TouchableOpacity, KeyboardAvoidingView,ScrollView,ListView,TextInput, BackHandler, I18nManager,NetInfo,View,Image,StyleSheet} from 'react-native';
import { Container, Button,Right,Left,ListItem,Content,Body,Header,Icon,Title} from 'native-base';
// import Swiper from 'react-native-swiper';
// Screen Styles 
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { View} from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
// import moment from 'moment';
import {Avatar } from 'react-native-material-ui';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Metrics,Colors } from '../../Themes/';
// import dstyles from '../../../style/DrawerStyles';
import CommonStyle from '../../style/common';
import color from '../../style/color';
import ListStyle from '../../style/ListStyle';
// import Drawer from 'react-native-drawer';
// import MyControlPanel from '../../../container/Drawer/DrawerSocial/ControlPanel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
// import firebase from 'react-native-firebase';
var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// import * as commentAction from '../../action/commentAction';
import * as loginAction from '../../action/loginAction';

import * as getNotiAction from '../../action/getNotiAction';
// import * as friendRequestAction from '../../action/friendRequestAction';
import RNRestart from 'react-native-restart';
var Config = require('../../Config');
var Spinner = require('../../Spinner');
// import ValidationComponent from 'react-native-form-validator';
// import {Button,BottomNavigation } from 'react-native-material-ui';
/**
 *  Profile Screen
 */
 const profileImageOne = require('../Images/follow.png');
 const profileImageTwo = require('../Images/follow.png');
  const profileImageThree = require('../Images/follow.png');

 const profileImageFour = "https://antiqueruby.aliansoftware.net//Images/social/people_four_soeighteen.png";
 const profileImageFive = "https://antiqueruby.aliansoftware.net//Images/social/people_five_soeighteen.png";
 const profileImageSix = "https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png";
 const profileImageSeven = "https://antiqueruby.aliansoftware.net//Images/social/comments_profile_foursnine.png";
 const profileImageEight = "https://antiqueruby.aliansoftware.net//Images/social/people_eight_soeighteen.png";
 const profileImageNine = "https://antiqueruby.aliansoftware.net//Images/social/people_nine_soeighteen.png";

//  const drawerStyles = {
//   drawer: {
//     shadowColor: "#000000",
//     shadowOpacity: 0.8,
//     shadowRadius: 0,
//   }
// }
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class GetNotificationPage extends Component{

// implememnt Drawer

// implement Private groups screen
  

  constructor(props) {
 		super(props);
    this.state = {
      userId:"",
      // userid
      regposttitle:"",
      isFinished:false,
      isLoading: false,
       pageNo : 0,
      perPage:10,
      isPagination:true,
       isNetOff:false,
      dataSource: ds.cloneWithRows([]),
      showWarn:false,
      reportModalVisible:false,
    id:"",
    // post id
      
    };
 	}

  componentWillMount(){
    var that = this;
    // const { navigation } = this.props;
    // const id = navigation.getParam('id','');
    // console.log("id:",id);
    // if(id!=undefined){
    //    this.setState({id:id});
    // }
    // BackHandler.addEventListener('hardwareBackPress', function() {
    //  that.props.navigation.navigate('LoginStack');
    //   return true;
    // });
    AuthUtility.getUserField("_id",function(id){
      that.setState({userId:id});
    });
    
  }
  componentDidMount(){
    var that=this;
    
     AuthUtility.getToken(function(token){
      
      // ApiUtility.setToken(token);
        if(token!==null){
          // alert("ii"+token);
       
          that.getAllData('',false);
          // 5bc6c62b22e058168766dbc2
         
      }
       
    });
  }
  
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

  getAllData(loadMore,refreshList){
    // var count=0;
    // alert("Did");
    // count+1;
  // alert('loadMore'+this.props.getnoti);
  var that=this;
    if(this.props.getnoti.isFinished == true)
      return;

    if(this.props.getnoti.isLoading == true)
      return;

    if(this.props.getnoti.isFinished && this.props.getnoti.isLoading == false)
      return;
   
   else{
   
    that.fetchFeed({
      reqSorce:'mobile',
      // status:'LIVE',
      perPage:that.state.perPage,
      pageNo:that.props.getnoti.pageNo,
      isPagination:that.state.isPagination,
      user:that.state.userId,
      
  },loadMore,refreshList);

  
   }  
  }
  // searchList(bunch,loadMore,refreshList){
  //   this.getNetInfo();
  //   var that = this;
       
  //       var path = Config.API_URL+'/privategroup/listing';
  //       // this.props.group.groupList=null;
  //       that.props.groupAction.fetchSearchGroupList(path,bunch);
        
  // }
  fetchFeed(bunch,loadMore,refreshList){
    // var count=0;
    // alert("Did"+bunch);
    // count+1;
      this.getNetInfo();
      // return;

      console.log('fetchFeed call:after getNetInfo',bunch);
      var that = this;
       
        var path = Config.API_URL+'/notification/listing';
        // AuthUtility.getToken(function(token){
        //   ApiUtility.setToken(token);

          if(loadMore == 'loadMore'){
            // alert('loadMore');
            if(that.props.getnoti.isFilter){
                var bunch=that.props.getnoti.content;
                bunch['pageNo']=that.props.getnoti.content.pageNo+1;
                that.props.getNotiAction.fetchCommentList(path,bunch,refreshList?0:that.props.getnoti.pageNo,true,refreshList);
            }
            else{
              that.props.getNotiAction.fetchCommentList(path,bunch,refreshList?0:that.props.getnoti.pageNo,true,refreshList);
            }
                
          }
          else{
               // alert(JSON.stringify(bunch));
              that.props.getNotiAction.fetchCommentList(path,bunch,0,false,refreshList);
          }
        // });
      
  };

  // requestUpdate(item){
  //   var path = Config.API_URL+'/friendrequest/update'; 
  //   var bundle={
  //    _id:item.friendrequest._id,
  //     status:"ACCEPTED",
  //   };
  //   this.props.friendRequestAction.fetchJoinCall(path,bundle,this.props.commentAction,this.props.navigation,item.user._id);
  //    // firebase.messaging().subscribeToTopic(id); 
  // }
//   renderItem(item){
//    // alert("irrrrr"+JSON.stringify(item));
// return (
//     <View style={{backgroundColor:'red',height:500,width:500}}>
//        <Text style={{fontSize:50,color:'#fff'}}>{"hi"}</Text>
//       </View>
       
//             );
//   }
// renderImg(){
//   console.log("this",this.props.login.loginData);
//   if(this.props.login.loginData!==null){

  
//     if(this.props.login.loginData.user.image==""){
//       return(
//         <View style={{width: 36, height: 36,borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}>
//         <Avatar
//                   icon="person"
//                   size={36} 
//                   // iconSize={60}
//                   iconColor="#ffffff"
//               />
        
//         </View>

//       );
//     }else{
//       return(
//         <Image
//         style={{ width: 36, height: 36, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
//         source={{ uri: this.props.login.loginData.user.image }}
//       />
//       );
//     }
//   }
// }
// renderImageComment(item,isBlur){
//   if(item.user!==null){

  
//     if(item.user.image==""){
//       return(
//         <View style={{width: 36, height: 36,borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}>
//         <Avatar
//                   icon="person"
//                   size={36} 
//                   // iconSize={60}
//                   iconColor="#ffffff"
//               />
        
//         </View>

//       );
//     }else{
//       return(
//         <Image
//         style={{ width: 36, height: 36, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
//         source={{ uri: item.user.image }}
//         blurRadius={isBlur?25:0}
//       />
//       );
//     }
//   }
// }

// checkWord(text){
  
//   this.setState({regposttitle:text})

//   var i=0;
//   var restrictStringArray=[' kill ',' murder ',' die ',' slut ',' whore ',' bitch ',' cunt ',' fuck '];

//   for(i=0;i<restrictStringArray.length;i++)
//   {
    
//     text=" "+text.toUpperCase()+" ";   //case igorance
//     restrictStringArray[i]=restrictStringArray[i].toUpperCase();  //case igorance
         
//     if(text.substring(0, restrictStringArray[i].trimLeft().length) == restrictStringArray[i].trimLeft()){
//       // alert(text.substring(0, restrictStringArray[i].trimLeft().length) == restrictStringArray[i].trimLeft());
//     // alert('3')
//       this.setState({showWarn:true})
//       break;
//     }
//     if(text.includes(restrictStringArray[i]))
//     {
//       // alert('1')
//       this.setState({showWarn:true})
//       break; 
//     }
//     else if((text)==(restrictStringArray[i].trimLeft()) || (text+' ')==(restrictStringArray[i].trimLeft()) || ((' '+text) == restrictStringArray[i].trimRight()) ){
//        // alert('2'+(text+' ')+'NN'+(restrictStringArray[i].trimLeft())+'MM')
//        this.setState({showWarn:true})
//         break;
//     }  
//     else{
//         this.setState({showWarn:false})
//         break;
//     }
    
//   }
  

// }



// renderNm(){
//   if(this.props.login.loginData!=null){
//     if(this.props.login.loginData.user!=null){
//       return(
        
//         <View>

//           <TextInput
//               multiline={true}
//               autoFocus = {false}
//               style={{paddingLeft:10,fontSize:14,textAlign: 'left', color: 'gray',width:Dimensions.get("window").width-100, justifyContent:'center',alignItems:"center"}}
//               placeholder="Add a comment"
//               placeholderTextColor={color.placeholderTextColor}
//               underlineColorAndroid="transparent"
//               autoCapitalize="none"
//               keyboardType="default"
//               textAlign={I18nManager.isRTL ? "right" : "left"}
//               // tiniColor={Colors.loginBlue}
//               onChangeText={(regposttitle) => this.checkWord(regposttitle)} 
//               value={this.state.regposttitle}
//               returnKeyType={ "next" } 
//           />
//         </View>
                
//      );
//     }else{
//       return(<View/>);
//     }
//   }
// }
// renderRequest(item,isBlur){
//   console.log("itt",this.state._id);
//     return(<View>

//  <Text style={styles.rowNameTxt}>{isBlur?moment(item.user.updatedAt).format('DD MMM, YYYY'):item.user.username}</Text>
//                   <Text style={styles.rowDesignationTxt}>{item.comment}</Text>
//                   <Text style={styles.rowDesignationTxt}>{moment(item.createdAt).fromNow()}</Text>
                  
//     </View>);
//   }

//  if(item.friendrequest.status=="ACCEPTED" && reqUser==this.state._id){
//     console.log("acc",item.friendrequest.status);
//     return( <View>
//             <Text style={styles.rowDesignationTxt}>{"Your request has been Accepted."}</Text>
    
//     </View>);
//   }else if(item.friendrequest.status=="ACCEPTED"){
//     console.log("else");
//     return( <View><Text style={styles.rowNameTxt}>{item.friendrequest.user.username}</Text>
//                         <Text style={styles.rowDesignationTxt}>{"Send you a Friend request."}</Text>
//     <TouchableOpacity style={styles.followBgSelected} onPress = {() =>{}}><Text style={styles.followTxtSelected}>Accepted</Text></TouchableOpacity>
//     </View>);
//   }

// reportPost(){
  
//   if(this.state.reportmessage == null ||  this.state.reportmessage == ''){
//     alert('Please enter report message');
//     return;
//   }
//   else{
//     var path = Config.API_URL+'/blockrequest/create';
   
//     var bundle = {
//         type:'COMMENT',
//         comment: this.state.reportItem._id,
//         user:this.state.userId,
//         post:this.state.reportItem.post,
//         message:this.state.reportmessage,
//     };  

//     // alert(JSON.stringify(bundle))        
//     this.props.blockAction.fetchBlockrequestCreate(path,bundle,this.props.postAction);
//     this.setState({reportModalVisible:false})

//   }
// }


// visibleReportModal(){
  
//   // alert(this.state.reportModalVisible)
//   if(this.state.reportModalVisible){
//     return(

//         <Modal  animationType = {"slide"} 
//               transparent = {true}
//               visible = {this.state.reportModalVisible}
//               // onRequestClose = {this.setState({reportModalVisible:false})}
//               >
        
//           <ScrollView style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
//             <View style={{height:Dimensions.get('window').height,backgroundColor:"rgba(0,0,0,0.4)",alignItems:'center',justifyContent:'center'}}> 
              
//               <View style={styles.modalcontainer} elevation={5}>
  
//                 <Text style={{ color:color.iconColor,marginBottom:5,fontFamily:'Roboto-Medium' }}>Report Violence</Text>

//                 <TextInput 
//                   placeholder={"Report Message"} 
//                   placeholderTextColor={color.placeholderTextColor} 
//                   underlineColorAndroid={'#f8f8f8'} 
//                   onChangeText={(msg) => this.setState({reportmessage:msg})} 
//                   value={this.state.reportmessage}
//                   multiline={true}
//                   textAlignVertical= 'top'   
//                   style={{color:color.textInputColor,height:150,marginBottom:10,padding:10,paddingBottom:5,backgroundColor:'#f8f8f8'}}  
//                   returnKeyType={ "next" }/>


//                   <TouchableOpacity onPress={()=>{this.reportPost()}} style={[CommonStyle.submitBtnText,{width:Dimensions.get('window').width-70,marginLeft:10,justifyContent:'center',alignItems:'center',marginTop:15,height:40,borderRadius:3,borderWidth:1,borderColor:color.iconColor,backgroundColor:'#fff'}]}>

//                       <Text style={{ color:color.iconColor,fontFamily:'Roboto-Medium' }}>SEND REPORT</Text>

//                   </TouchableOpacity>

//                   <TouchableOpacity onPress={()=>{this.setState({reportModalVisible:false})}} style={[CommonStyle.submitBtnText,{width:Dimensions.get('window').width-70,marginLeft:10,justifyContent:'center',alignItems:'center',marginTop:15,height:40,borderRadius:3,borderWidth:1,borderColor:color.iconColor,backgroundColor:'#fff'}]}>

//                       <Text style={{ color:color.iconColor,fontFamily:'Roboto-Medium' }}>CANCEL</Text>

//                   </TouchableOpacity>
//               </View>

//             </View>
//           </ScrollView>
//         </Modal>
//       );
//   }
// }


renderItem(item){
  // nidhi
  // alert(JSON.stringify(item.item));
  // var item2=;
  console.log("itemmmmmmm"+JSON.stringify(item.item));
  return (          
    <View style={{height:61.5,width:Dimensions.get("window").width,flexDirection:"row",marginBottom:10}}>
        <View style={{height:60,width:60,alignItems:"center",justifyContent:"center"}}>
        <Image 
        resizeMode="contain"
        resizeMethod="resize" 
        style={{width: 40, height: 40, borderRadius: 20}}
        source={profileImageOne}/>
        </View>
            <View style={{width:Dimensions.get("window").width-60,height:60,padding:10,justifyContent:"center"}}>
              <Text style={{width:Dimensions.get("window").width}}>{JSON.stringify(item.item.message)}</Text>
            </View>
    <View style={{ width:Dimensions.get("window").width-20,
    height:1.5,
    backgroundColor: "green",}}/>
    </View>
   );
  
  }
  
  renderList(){

    
    var list = this.props.getnoti.getNotificationList;
    // alert(JSON.stringify(list));
    if(this.state.isLoading){
        return <Spinner/>;
    }
    if(list == null && this.props.getnoti.isFinished==true && this.props.getnoti.isLoading ==false){
      return( 
        <View style={{height:Dimensions.get('window').height-123,justifyContent: 'center',alignItems:'center',backgroundColor:Colors.snow,width:Dimensions.get('window').width,}}>
              <View style={[ListStyle.notFoundcontainer,{backgroundColor:Colors.snow}]}>
                <MaterialIcons name="search" size={18} color={color.appTitle} style={ListStyle.notFoundIcn}/>     
              </View>
              <Text  style={{fontFamily:'Roboto-Medium'}}>No Records Found</Text>
        </View>
      )
    }
    else if(list!==null){
    
      return(
        
            <View style={{height:Dimensions.get('window').height-123,
            width:Dimensions.get("window").width,backgroundColor:color.snow
          }}>
            <FlatList
              style={{}}
              data={list}
              // extraData={this.props}
              renderItem={(item)=>this.renderItem(item)}
              refreshing={false}
              inverted={false}
              keyExtractor={(item, index) => index}
              onEndReached={()=>{this.getAllData('loadMore',false)}}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.5}
              // ListFooterComponent={this.onListFooterComponent.bind(this) }
              // ListHeaderComponent={this._renderHeader.bind(this)} //not in use for AutoCrud
          />
            
          
      </View>

      );
    }else{
      // alert("else");
      return (<View style={{height:Dimensions.get('window').height-135,backgroundColor:Colors.snow}}></View>);
    }
  }

  render(){

    var that = this;

    return(
      <View style={{width:Dimensions.get('window').width,height:Dimensions.get("window").height}}>
      
      
        {this.renderList()} 
       
     
        
      </View>
      
    );
  }
//   createPostSubmit(){

//     var that=this;
//    var token="";

//       // this.textpost();
   
// // Call ValidationComponent validate method
//    var isMyFormValidate =this.validate({
//     regposttitle:{required: true},
//    });
  
//    if(this.state.regposttitle == "") {
//              alert("Post comment is required!");
//               errorStatus=1;
//          }
//    var errorStatus=0;
//    var regcategoryid=null;
//    var regtagsid=[];
 
//    const { navigation } = this.props;
//    // const token = navigation.getParam('token', {});
  
  
//   var bunch;
//     if(isMyFormValidate && errorStatus == 0){
//             obj={description:this.state.regpost};
//       bunch = {
        
//         reqSource:'mobile',
//         post:this.state.id,
//         user:this.state.userId,
//         comment:this.state.regposttitle,
//      };
     
        
//        that.setState({
//          isLoading : false
//        });
//        var that = this;
//        console.log("bun",bunch);
//        var path = Config.API_URL+'/comment/create';
//        this.props.commentAction.addComment(path,bunch,this.props.navigation,this.props.postAction);
//       //  this.props.privatepostAddAction.createPost(path,bunch);
//        this.setState({regposttitle:""});
//        // setTimeout(()=>{{ this.props.navigation.navigate("PrivateGroupWall");}},1500);
//          // setTimeout(()=>{{ that.props.navigation.navigate('Social18');}},3000);       
//    }
//    else{
//      return;
//    }

//  }
  // _fnChangeItem(listId){
  //    // const newArray = this.state.data;
  //    const newArray = this.state.data;

  //    for(var i = 0 ; i< this.state.data.length; i++){
  //      if(this.state.data[i].id == listId){
  //        // alert(listId + ' prag ' +this.state.data[i].id)
  //        const newArray1 = [];

  //        for(var i = 0 ; i< this.state.data.length; i++){
  //          if(this.state.data[i].id == listId){
  //            newArray1.push({
  //                id: this.state.data[i].id,
  //                profileImage: this.state.data[i].profileImage,
  //                name: this.state.data[i].name,
  //                post: this.state.data[i].post,
  //                isSelected: !this.state.data[i].isSelected
  //              },
  //            );
  //          } else {
  //            newArray1.push({
  //                id: this.state.data[i].id,
  //                profileImage: this.state.data[i].profileImage,
  //                name: this.state.data[i].name,
  //                post: this.state.data[i].post,
  //                isSelected: this.state.data[i].isSelected
  //              },
  //            );
  //          }
  //        }

  //       this.setState({data: newArray1});
  //        console.log("pragnesh");
  //        console.log(newArray1);
  //      }
  //    }
  // }
}
const mapStateToProps = state => {

  return {
    comment : state.comment,
    // joinadd:state.joinadd,
    // privatepost:state.privatepost,
  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(groupAction));
  return {
   
    getNotiAction:bindActionCreators(
      getNotiAction, dispatch,
    ),
    loginAction:bindActionCreators(
      loginAction, dispatch,
    ),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetNotificationPage);

