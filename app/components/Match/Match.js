import React, { Component } from "react";
import Swiper from "react-native-deck-swiper";
import {
    AsyncStorage,
Platform,
  Button,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  View,
  TouchableOpacity
} from "react-native";
var Contacts = require('react-native-contacts')

var color = require("../../style/color.js");
import firebase,{type,Notification,NotificationOpen,RemoteMessage} from 'react-native-firebase';
import Icon from "react-native-vector-icons/dist/FontAwesome";

var ApiUtility = require("../../reducer/lib/ApiUtility");
var AuthUtility = require("../../reducer/lib/AuthUtility");
var CommonUtility = require("../../reducer/lib/CommonUtility");
var Config = require("../../Config");
var ListStyle = require('../../style/ListStyle');
import Permissions from 'react-native-permissions';
import ProfessionsMultiPick from '../../common/ProfessionsMultiPick';


class Match extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      swipedAllCards: false,
      swipeDirection: "",
      cardIndex: 0,
      loginId: null,
      currentIndex: 0,
            fetchContactsList:[],
                   subcategory:[],


    };
  }

componentWillMount() {
  this.checkPermission();
  this.createNotificationListeners();
  // this.createContact();
}

componentWillUnmount(){
   this.notificationListener();
  this.notificationOpenedListener();
  this.messageListener();
}

  componentWillReceiveProps(nextProps) {
    // AuthUtility.removeToken(function() {});
    //     AuthUtility.clear(function() {});
    //     this.props.navigation.navigate("LoginPage");
    // alert(JSON.stringify(nextProps.match));

    
    if (nextProps.match.matchList != null)
      this.setState({ cards: nextProps.match.matchList, cardIndex: 0 });
    var that = this;
      that.createNotificationListeners();

    //    AuthUtility.getUserField('_id',function(_id){
    //     var _id=_id;
    //   that.setState({loginId:_id},()=>{that.fetchMatchPost(_id)});
    // });
  }
  
  componentDidMount() {
    var that = this;
    // console.log("matchh",this.props.loginAction);
    AuthUtility.getUserField("_id", function(_id) {
      var _id = _id;
      that.subscribeForNotification2(_id);
      // that.createNotificationListeners();
      that.subscribeForNotification(_id);
    });
  }



fetchContacts(_id){
var that=this;
that.setState({fetchContactsList:true,userid:_id,modalVisible:true});
  alert('modalVisible'+this.state.modalVisible)
}
  subscribeForNotification(id) {
    var that = this;
    // alert('hiiiiooo')
    var path = Config.API_URL + "/follow/listing";

    // that.props.groupmemberAction.fetchMemList(path,{user:this.props.login.loginData.user._id});
    ApiUtility.fetchAuthPost(
      path,
      { user: id },
      function(response) {
        if (response.success == false) {
          // alert('Invalid User'); /
        } else {
          console.log("Desc:re", response);
              that.subscribeForFollow(response.data.data,id);
        }

        that.setState({
          isLoading: false
        });
      },
      function(error) {
        that.setState({
          isLoading: false
        });
      }
    );
  }
  
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  

  // let fcmToken = await AsyncStorage.getItem('fcmToken');

  
  firebase.messaging().getToken().then((token) => {
    if (token) {
      // alert(token)
      this.setState({fcmToken:token})
    }
  });
  

     firebase.messaging().onTokenRefresh((token) => {
        if (token) {
          // alert('RESET'+fcmToken)
          this.setState({fcmToken:token})
        
           var pathUpdt = Config.API_URL+'/user/update';

         var bundle={
          fcm:token
            // _id:that.state._id,
          };

      // console.log("ProfileEdit::response:",bundle);
        this.props.loginAction.updateLoginData(pathUpdt,bundle);         
        }
      });
           this.createNotificationListeners();
 
}

async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}

  subscribeForNotification2(id){

    var that=this;
    // alert('hiiiiooo')
    var path = Config.API_URL+'/room/listing';

    // that.props.groupmemberAction.fetchMemList(path,{user:this.props.login.loginData.user._id});
      ApiUtility.fetchAuthPost(path,{user:id},function(response){

        // alert(JSON.stringify(response))
        if(response.success ==false){
           // alert('Invalid User'); /
        }

        else{
          console.log("room",response);
           that.subscribeForRoom(response.data.data);
        }

        that.setState({
          isLoading : false
        });

      },function(error){

        that.setState({
          isLoading : false
        });
      });
  }

  subscribeForRoom(list){
    var that=this;
     console.log("i",list);
     // var list=this.props.groupmem.memList;
     if(list!=null && list.length > 0){

      // alert("not null"+JSON.stringify(list));
      for(var i=0;i<list.length;i++){
        // console.log("gp1",list[i].privategroup);
          // alert(list[i]._id)
          firebase.messaging().subscribeToTopic(list[i]._id); 
        // console.log("ii)",this.state.product);
      }
     }
  }

  subscribeForFollow(list,loginid){
    var that=this;
     console.log("i",list);
     // var list=this.props.groupmem.memList;
     if(list!=null && list.length > 0){

      // alert("not null"+JSON.stringify(list));
      for(var i=0;i<list.length;i++){
        // console.log("gp1",list[i].privategroup);
          // alert(list[i].follower + list[i].following)
          if(list[i].follower._id == loginid){
            firebase.messaging().subscribeToTopic(list[i].following._id);   
          }
          else{
            firebase.messaging().subscribeToTopic(list[i].follower._id); 
          }
          
        // console.log("ii)",this.state.product);
      }
     }
  }


  async createNotificationListeners(){
  var that=this;
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  // alert('Match:createNotificationListeners')

  this.notificationListener = firebase.notifications().onNotification((notification) => {
      // alert('01')
      const { title, body } = notification;
      // alert("notify");
      console.log('notificationListener::',notification);
      
  });

   /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */     
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    // alert('02')
    const action = notificationOpen.action;
      const notification: Notification = notificationOpen.notification;
      console.log("noti",notification,action);
      
            // that.product(notification.data.product,'')
       
          if (notificationOpen) {
              if(notification._data != 'null'){
              console.log('notificationOpenWithtype::',notification.data.type)
                // that.product(notification.data.product,'')
                
                 AuthUtility.getKey("notifId",function(notifId){

                    if(notifId !== notification.notificationId){

                      AuthUtility.setKey("notifId",notification.notificationId,function(){
                

                      if(notification.data.type=="room"){
                        console.log("id",notification.data._id);
                      
                        that.props.navigation.navigate('Notification',{});
                      }
                      if(notification.data.type=="post"){
                        // console.log("id",notification.data._id);
                      
                        that.props.navigation.navigate('PostDetail',{id:notification.data._id});
                      }
                      if(notification.data.type=="follow"){
                      
                        that.props.navigation.navigate('GetNotify',{});
                      }
                      if(notification.data.type=="message"){
                        // console.log("messagemessagemessagemessageid",notification.data._id);
                      // alert('hiiii')
                      
                        that.props.navigation.navigate('Messages',{
                          item:{ user1:{_id:notification.data.user1},
                            user2:{_id:notification.data.user2}
                          },roomUser:{_id:notification.data.roomId}
                        });
                      }

                    });


                    }

                });
              }
          }

  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */

  var that=this;
 // const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
 //    if (notificationOpen) {
 //        // App was opened by a notification
 //        // Get the action triggered by the notification being opened
 //        const action = notificationOpen.action;
 //        // Get information about the notification that was opened
 //        const notification: Notification = notificationOpen.notification;
 //         console.log('notificationOpen::',notification,action);
 //    }
  firebase.notifications().getInitialNotification().then(function(notificationOpen){
        console.log('notificationOpen123::',notificationOpen)
        // it is call when app remove from bg notification receiver when press notification
    
      if (notificationOpen) {
      

                console.log('notificationOpen1::',notificationOpen)

      
          const notification: Notification = notificationOpen.notification;
      // alert('03'+notification.type)          
        
          if(notification._data != 'null'){
          console.log('notificationOpenWithtype::',notification.data.type)
            // that.product(notification.data.product,'')
            
             AuthUtility.getKey("notifId",function(notifId){

                if(notifId !== notification.notificationId){

                  AuthUtility.setKey("notifId",notification.notificationId,function(){
            

                  if(notification.data.type=="room"){
                    console.log("id",notification.data._id);
                  
                    that.props.navigation.navigate('Notification',{});
                  }
                  if(notification.data.type=="post"){
                    // console.log("id",notification.data._id);
                  
                    that.props.navigation.navigate('PostDetail',{id:notification.data._id});
                  }
                  if(notification.data.type=="follow"){
                  
                    that.props.navigation.navigate('GetNotify',{});
                  }
                  if(notification.data.type=="message"){
                    // console.log("messagemessagemessagemessageid",notification.data._id);
                  // alert('hiiii')
                  
                    that.props.navigation.navigate('Messages',{
                      item:{ user1:{_id:notification.data.user1},
                        user2:{_id:notification.data.user2}
                      },roomUser:{_id:notification.data.roomId}
                    });
                  }

                });


                }

            });
          }

          // if(notification.data.product != 'null'){
          //   that.product(notification.data.product,'')
          //   // that.props.navigation.navigate('PrivateGroupWall',{id:item._id});
          // }

      }
    });

  /*
  * Triggered for data only payload in foreground
  * */

  this.messageListener = firebase.messaging().onMessage((message:RemoteMessage) => {
    //process data message
    // alert('4')
    console.log('messageListener::',message);

  });
}



  // fetchMatchPost(_id){

  //       // alert(_id)
  //         var bunch={
  //           reqSorce:'mobile',
  //           // _id:_id
  //         };

  //         var that=this;

  //         var path = Config.API_URL+'/match/listing';
  //         this.props.matchAction.fetchMatchList(path,bunch);

  // }

  gotoMatchUser(matchforuserid, username) {
    // alert(matchforuserid)

    this.props.navigation.navigate("MatchUserProfile", {
      matchforuserid: matchforuserid,
      username: username
    });
  }

  renderCard = (card, index) => {
    // alert(JSON.stringify(card))
    if (card != undefined) {
      return (
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              this.gotoMatchUser(
                card.matchforuser._id,
                card.matchforuser.username
              );
            }}
            style={styles.cardContainer}
          >
            <Image
              source={{ uri: card.matchforuser.image }}
              resizeMode="cover"
              style={styles.imageContainer}
            />

            <View style={styles.cardBottomPart}>
              <View
                style={{
                  paddingLeft: 15,
                  paddingTop: 10,
                  width: Dimensions.get("window").width - 150
                }}
              >
                <Text numberOfLines={1} style={styles.title}>
                  {card.matchforuser.username}
                </Text>
                <Text numberOfLines={1} style={styles.subTitle}>
                  {card.matchforuser.firstname}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 15,
                  paddingTop: 13,
                  paddingRight: 10
                }}
              >
                <View style={{ marginRight: 20 }}>
                  <Icon name={"heart"} color={color.matchtitletext} size={20} />
                  <Text style={[styles.subTitle, { textAlign: "center" }]}>
                    {card.matchforuser.nfollowing}
                  </Text>
                </View>

                <View style={{ marginRight: 20 }}>
                  <Icon name={"users"} color={color.matchtitletext} size={20} />
                  <Text style={[styles.subTitle, { textAlign: "center" }]}>
                    {card.matchforuser.nfollow}
                  </Text>
                </View>

                <View style={{ marginRight: 10 }}>
                  <Icon
                    name={"location-arrow"}
                    color={color.matchtitletext}
                    size={22}
                  />
                  <Text style={[styles.subTitle, { textAlign: "center" }]}>
                    {card.distance}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  onSwiped = type => {

    console.log(`on swiped ${type}`);
    // alert('onSwiped'+JSON.stringify(this.state.cards[this.state.currentIndex].user._id))

    var _id = this.state.cards[this.state.currentIndex]._id;
    var loginId = this.state.cards[this.state.currentIndex].user._id;
// alert(_id)
    if (type == "top" || type == "right") {
      var bunch = {
        reqSorce: "mobile",
        _id: _id,
        status: "crush"
      };

      var followbunch = {
        follower: this.state.cards[this.state.currentIndex].matchforuser._id,
        following: loginId
      };

      this.setState(
        {
          currentIndex: this.state.currentIndex + 1
        },
        () => {
          var path = Config.API_URL + "/match/update";
          var followpath = Config.API_URL + "/follow/unique-create";
          this.props.matchAction.fetchMatchUpdate(
            path,
            bunch,
            followpath,
            followbunch
          );
        }
      );
    } else if (type == "bottom" || type == "left") {
      var bunch = {
        reqSorce: "mobile",
        _id: _id
      };

      this.setState(
        {
          currentIndex: this.state.currentIndex + 1
        },
        () => {
          var path = Config.API_URL + "/match/delete";
          this.props.matchAction.fetchMatchDelete(path, bunch);
        }
      );
    } else {
      return;
    }
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  swipeLeft = () => {
    this.swiper.swipeLeft();
  };

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

// renderModal(){
//   alert('####'+this.props.fromReg)
//   if(this.props.fromReg == 'true' || this.props.fromReg == true){
//     return(

//                   <ProfessionsMultiPick
//                       modalVisible={true} 
//                       oncloseModal={this.oncloseModal.bind(this)}
//                       selectedArr={this.state.subcategory}
//                       fetchContactsList={this.state.fetchContactsList}
//                       userid={this.state.userid}
//                       itemPicked={(item)=>this.onSubcatPicked(item)} 
//                       navigation={this.props.navigation}
//                       // reviewAction={this.props.reviewAction}
//                       // review={this.props.review}
//                     />

//   )
//   }
  
// }

  render() {
    if(this.state.cards.length > 0){

      return (
      <View style={styles.container}>
            {/*this.renderModal()*/}

        <Swiper
          ref={swiper => (this.swiper = swiper)}
          onSwiped={() => this.onSwiped("general")}
          onSwipedLeft={() => this.onSwiped("left")}
          onSwipedRight={() => this.onSwiped("right")}
          onSwipedTop={() => this.onSwiped("top")}
          onSwipedBottom={() => this.onSwiped("bottom")}
          onTapCard={this.swipeLeft}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={20}
          cardHorizontalMargin={10}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          backgroundColor={"#f7f8fc"}
          stackSeparation={8}
          // cardStyle={{}}
          overlayLabels={{
            bottom: {
              title: "NO CRUSH",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: color.nocrushcolor,
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }
            },
            left: {
              title: "No CRUSH",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: color.nocrushcolor,
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: "CRUSH",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: color.crushcolor,
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: "CRUSH",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: color.crushcolor,
                  color: color.crushcolor,
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 12,
                  justifyContent: "center"
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
          {/*<Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' />*/}
        </Swiper>
      </View>
    );

    }
    else{
      return(
        <View style={styles.container}>
            {/*this.renderModal()*/}

            <View style={{height:Dimensions.get('window').height-200,justifyContent: 'center',alignItems:'center',backgroundColor:color.homebackground,width:Dimensions.get('window').width,}} >
              
                <View style={[ListStyle.notFoundcontainer,{backgroundColor:color.homebackground}]}>
                  <Icon name="search" size={18} color={color.text3} style={ListStyle.notFoundIcn}  />     
                </View>

                <Text  style={{fontFamily:'Roboto-Bold'}}> No Crush Found </Text>
            
          </View>


        </View>
        )
    } 
  }
}

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

const styles = StyleSheet.create({
  container: {
    height: Screen.height - 100,
    // backgroundColor: "red"
    // paddingLeft:0
    // backgroundColor: '#F5FCFF'
  },
  imageContainer: {
    height: 320,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
    // backgroundColor:'red',
  },
  cardContainer: {
    height: 320,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
    // backgroundColor:'red',
  },
  card: {
    height: Screen.height - 250,
    width: Screen.width - 20,
    marginLeft: 0,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 4,
    borderColor: "#fefefe",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent"
  },
  cardBottomPart: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    color: color.matchtitletext,
    fontSize: 18
  },
  subTitle: {
    color: color.matchsubtext,
    fontSize: 16
  }
});

module.exports = Match;
