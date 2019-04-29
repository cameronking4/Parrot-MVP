import React, { Component } from "react";
import {
  ToastAndroid,
  FlatList,
  Text,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  ListView,
  TextInput,
  BackHandler,
  I18nManager,
  NetInfo,
  View,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  ListItem,
  Content,
  Body,
  Header,
  Icon,
  Title
} from "native-base";
// import Swiper from 'react-native-swiper';
// Screen Styles
import styles from "./styles";
import moment from "moment";
// import { View} from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";

import { Avatar } from "react-native-material-ui";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import { Metrics, Colors } from "../../Themes/";
// import dstyles from '../../../style/DrawerStyles';
// import CommonStyle from '../../style/common';
import color from "../../style/color";
import ListStyle from "../../style/ListStyle";
// import Drawer from 'react-native-drawer';
// import MyControlPanel from '../../../container/Drawer/DrawerSocial/ControlPanel';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
// import firebase from 'react-native-firebase';
var ApiUtility = require("../../reducer/lib/ApiUtility");
var AuthUtility = require("../../reducer/lib/AuthUtility");

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as notificationAction from "../../action/notificationAction";
import * as loginAction from "../../action/loginAction";
// import * as friendRequestAction from '../../action/friendRequestAction';
import RNRestart from "react-native-restart";
var Config = require("../../Config");
var Spinner = require("../../Spinner");
// import {Button,BottomNavigation } from 'react-native-material-ui';
/**
 *  Profile Screen
 */
const profileImageOne =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_chat_propic04_21_29.png";
const profileImageTwo =
  "https://antiqueruby.aliansoftware.net//Images/social/card_sc15.png";
const profileImageThree =
  "https://antiqueruby.aliansoftware.net//Images/social/card_propic_01_sc12.png";
const profileImageFour =
  "https://antiqueruby.aliansoftware.net//Images/social/people_four_soeighteen.png";
const profileImageFive =
  "https://antiqueruby.aliansoftware.net//Images/social/people_five_soeighteen.png";
const profileImageSix =
  "https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png";
const profileImageSeven =
  "https://antiqueruby.aliansoftware.net//Images/social/comments_profile_foursnine.png";
const profileImageEight =
  "https://antiqueruby.aliansoftware.net//Images/social/people_eight_soeighteen.png";
const profileImageNine =
  "https://antiqueruby.aliansoftware.net//Images/social/people_nine_soeighteen.png";

//  const drawerStyles = {
//   drawer: {
//     shadowColor: "#000000",
//     shadowOpacity: 0.8,
//     shadowRadius: 0,
//   }
// }
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class NotificationPage extends Component {
  // implememnt Drawer

  // implement Private groups screen

  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      // userid
      isFinished: false,
      isLoading: false,
      pageNo: 0,
      perPage: 10,
      isPagination: true,
      isNetOff: false,

      selectStay: false,
      dataSource: ds.cloneWithRows([]),
      data: [
        {
          id: 1,
          profileImage: { uri: profileImageOne },
          name: "Johnie Cornwall",
          post: "Senior Design Director",
          isSelected: true
        },
        {
          id: 2,
          profileImage: { uri: profileImageTwo },
          name: "Renaldo Rozman",
          post: "Lead 3D Artist",
          isSelected: false
        },
        {
          id: 3,
          profileImage: { uri: profileImageThree },
          name: "Argelia Bee",
          post: "Copywriter",
          isSelected: false
        },
        {
          id: 4,
          profileImage: { uri: profileImageFour },
          name: "Kimiko Hoyle",
          post: "Marketing & Creative Services",
          isSelected: false
        },
        {
          id: 5,
          profileImage: { uri: profileImageFive },
          name: "Elene Jeppesen",
          post: "Creative Leader",
          isSelected: false
        },
        {
          id: 6,
          profileImage: { uri: profileImageSix },
          name: "Lyndon Benavente",
          post: "Senior Design Director",
          isSelected: false
        },
        {
          id: 7,
          profileImage: { uri: profileImageSeven },
          name: "Elfrieda Esser",
          post: "UX/UI Designer",
          isSelected: false
        },
        {
          id: 8,
          profileImage: { uri: profileImageEight },
          name: "Devin Newberg",
          post: "Marketing Designer",
          isSelected: false
        },
        {
          id: 9,
          profileImage: { uri: profileImageNine },
          name: "Joey Gumm",
          post: "Interactive Art Director",
          isSelected: false
        }
      ]
    };
  }

  componentWillMount() {
    var that = this;
    AuthUtility.getUserField("_id", function(_id) {
      that.setState({ _id: _id });
    });
    // BackHandler.addEventListener('hardwareBackPress', function() {
    //  that.props.navigation.navigate('LoginStack');
    //   return true;
    // });
  }
  componentDidMount() {
    var that = this;

    AuthUtility.getToken(function(token) {
      // ApiUtility.setToken(token);
      if (token !== null) {
        // alert("ii"+token);

        that.getAllData("", false);
        // 5bc6c62b22e058168766dbc2
      }
    });
  }

  getNetInfo() {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log("First, is " + (isConnected ? "online" : "offline"));

      if (isConnected) {
        this.setState({ isNetOff: false });
      } else {
        // //alert('No Internet');
        ToastAndroid.show(
          "Connection not available...Retry!",
          ToastAndroid.LONG
        );
        return;
      }
    });
  }
  applyFilterData() {
    this.getAllData("", true);
  }

  getAllData(loadMore, refreshList) {
    // var count=0;
     // alert(this.props.notify.isFinished)
    var that=this;
    var path = Config.API_URL + "/room/listing";
    // var bunch = that.props.notify.content;;
    //     this.props.notificationAction.fetchNotifyList(
    //       path,
    //       bunch,
    //       refreshList ? 0 : that.props.notify.pageNo,
    //       true,
    //       refreshList
    //     );

    // count+1;
    // alert('loadMore'+this.props.group.isFinished+this.props.notify.isLoading);
    // var that = this;

    // if (this.props.notify.isFinished == true) 
    //   return;

    // if (this.props.notify.isLoading == true) 
    //   return;

    // if (this.props.notify.isFinished && this.props.notify.isLoading == false)
    //   return;
    // else {
      AuthUtility.getUserField("_id", function(id) {
        that.setState({ _id: id });

        that.props.notificationAction.fetchNotifyList(
          path,
           {
            reqSorce: "mobile",
            // perPage: that.state.perPage,
            // pageNo: that.props.notify.pageNo,
            // isPagination: that.state.isPagination,
            user: id
          },
          0 ,
          false,
          // refreshList
        );

        // that.fetchFeed(
        //   {
        //     reqSorce: "mobile",
        //     // perPage: that.state.perPage,
        //     // pageNo: that.props.notify.pageNo,
        //     // isPagination: that.state.isPagination,
        //     user: id
        //   },
        //   false,
        //   refreshList
        // );
      });
    // }
  }
  fetchFeed(bunch, loadMore, refreshList) {
    // var count=0;

    // count+1;
    this.getNetInfo();
    // return;

    console.log("fetchFeed call:after getNetInfo", bunch);
    var that = this;

    var path = Config.API_URL + "/room/listing";
    // AuthUtility.getToken(function(token){
    //   ApiUtility.setToken(token);

    if (loadMore == "loadMore") {
      // alert('loadMore');
      if (that.props.notify.isFilter) {
        var bunch = that.props.notify.content;
        bunch["pageNo"] = that.props.notify.content.pageNo + 1;
        that.props.notificationAction.fetchNotifyList(
          path,
          bunch,
          refreshList ? 0 : that.props.notify.pageNo,
          true,
          refreshList
        );
      } else {
        that.props.notificationAction.fetchNotifyList(
          path,
          bunch,
          refreshList ? 0 : that.props.notify.pageNo,
          true,
          refreshList
        );
      }
    } else {
      //  alert(JSON.stringify(bunch));
      that.props.notificationAction.fetchNotifyList(
        path,
        bunch,
        0,
        false,
        refreshList
      );
    }
    // });
  }

  // requestUpdate(item){

  //  var path = Config.API_URL+'/friendrequest/update';
  //     var bundle={
  //      _id:item.friendrequest._id,
  //       status:"ACCEPTED",
  //     };
  //     this.props.friendRequestAction.fetchJoinCall(path,bundle,this.props.notificationAction,this.props.navigation,item.user._id);
  //   }
  renderImg(item) {
    if (item.friendrequest != null) {
      if (item.friendrequest.user.image == "") {
        return (
          <View style={styles.profileImg}>
            <Avatar
              icon="person"
              // size={90}
              // iconSize={60}
              iconColor="#ffffff"
            />
          </View>
        );
      } else {
        return (
          <Image
            source={{ uri: item.friendrequest.user.image }}
            style={styles.profileImg}
          />
        );
      }
    }
  }
  renderStoryUser(item) {
    if (item.post.user != null) {
      if (item.post.user.image == "") {
        return (
          <View style={styles.profileImg}>
            <Avatar
              icon="person"
              // size={90}
              // iconSize={60}
              iconColor="#ffffff"
            />
          </View>
        );
      } else {
        return (
          <Image
            source={{ uri: item.post.user.image }}
            style={styles.profileImg}
          />
        );
      }
    }
  }
  renderStoryTagProfileTags(item) {
    if (item.post.user != null) {
      if (item.post.user.image == "") {
        return (
          <View style={styles.profileImg}>
            <Avatar
              icon="person"
              // size={90}
              // iconSize={60}
              iconColor="#ffffff"
            />
          </View>
        );
      } else {
        return (
          <Image
            source={{ uri: item.post.user.image }}
            style={styles.profileImg}
            blurRadius={25}
          />
        );
      }
    }
  }
  // deleteReq(item){
  //   if(item!==null){
  //      var path = Config.API_URL+'/friendrequest/delete';
  //     var bundle={
  //      _id:item.friendrequest._id,
  //       // status:"ACCEPTED",
  //     };
  //     this.props.friendRequestAction.fetchRequestDelete(path,bundle,this.props.notificationAction,this.props.navigation,item._id);

  //   }
  // }
  renderButton(item) {
    if (item.friendrequest !== null) {
      return (
        <View style={{ flexDirection: "row", marginRight: 20 }}>
          <TouchableOpacity
            style={[
              styles.followBgNotSelected,
              { marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }
            ]}
            onPress={() => {
              Alert.alert(
                "Allow this person to subscribe to my journal",
                "Please note if you allow this person to subscribe, your usernames will be visible to each other from now on.",
                [
                  {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      // this.requestUpdate(item)
                    }
                  }
                ]
              );
            }}
          >
            <Text numberOfLines={1} style={styles.followTxtNotSelected}>
              Subscribe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.selectStay
                ? [
                    styles.stayBgSelected,
                    {
                      marginTop: 5,
                      marginBottom: 5,
                      paddingTop: 5,
                      paddingBottom: 5
                    }
                  ]
                : [
                    styles.stayBgNotSelected,
                    {
                      marginTop: 5,
                      marginBottom: 5,
                      paddingTop: 5,
                      paddingBottom: 5
                    }
                  ]
            }
            onPress={() => {
              // this.deleteReq(item);
            }}
          >
            <Text
              numberOfLines={1}
              style={[styles.followTxtNotSelected, { colr: "red" }]}
            >
              Stay Private
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (item.friendrequest == null) {
      return (
        <Text style={styles.rowDesignationTxt}>
          {"Request has been Denied."}
        </Text>
      );
    }
  }
  renderFirend(item) {
    if (item.friendrequest !== null) {
      return (
        <View style={styles.rowBg}>
          <View style={styles.rowView}>
            {this.renderImg(item)}
            {this.renderRequest(item)}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rowBg}>
          <View style={styles.rowView}>
            <View style={[styles.profileImg]}>
              <Avatar
                icon="person"
                // size={90}
                // iconSize={60}
                iconColor="#ffffff"
              />
            </View>
            <View style={styles.namePostView}>
              <Text style={styles.rowNameTxt}>{"Ventpack User"}</Text>
              {/** 
                              <Text style={styles.rowDesignationTxt}>{"Send you a Subscription request."}</Text>
                              **/}

              {this.renderButton(item)}
            </View>
          </View>
        </View>
      );
    }
  }
  renderRequest(item) {
    var reqUser =
      item.friendrequest !== null ? item.friendrequest.user._id : null;
    console.log("reqsend", item.friendrequest, reqUser);
    if (item.friendrequest !== null) {
      if (
        item.friendrequest.status == "REQUESTED" &&
        reqUser !== this.state._id
      ) {
        console.log("reqsend", item.friendrequest);
        return (
          <View style={styles.namePostView}>
            <Text style={styles.rowNameTxt}>
              {item.friendrequest.user.username +
                " wants to subscribe to your journal entries, they sent you a message. Want to take a look or stay private?"}
            </Text>
            {/** 
                            <Text style={styles.rowDesignationTxt}>{"Send you a Subscription request."}</Text>
                            **/}
            <Text numberOfLines={2} style={styles.rowDesignationTxt}>
              {item.friendrequest.message}
            </Text>
            {this.renderButton(item)}
            <Text style={styles.rowDesignationTxt}>
              {moment(item.friendrequest.createdAt).fromNow()}
            </Text>
          </View>
        );
      } else if (item.friendrequest.status == "REQUESTED") {
        console.log("req", item.friendrequest.status);
        return (
          <View style={styles.namePostView}>
            <Text style={styles.rowDesignationTxt}>
              {"You have send Subscription request."}
            </Text>
            <Text style={styles.rowDesignationTxt}>
              {moment(item.friendrequest.createdAt).fromNow()}
            </Text>
          </View>
        );
      }
    }

    // vchange
    if (item.friendrequest !== null) {
      if (
        item.friendrequest.status == "ACCEPTED" &&
        reqUser == this.state._id
      ) {
        console.log("acc", item.friendrequest.status);
        return (
          <View style={styles.namePostView}>
            <Text style={styles.rowDesignationTxt}>
              {"Your request has been Subscribed."}
            </Text>
            <Text style={styles.rowDesignationTxt}>
              {moment(item.friendrequest.createdAt).fromNow()}
            </Text>
          </View>
        );
      } else if (item.friendrequest.status == "ACCEPTED") {
        console.log("else");
        return (
          <View style={styles.namePostView}>
            <Text style={styles.rowNameTxt}>
              {item.friendrequest.user.username}
            </Text>
            <Text style={styles.rowDesignationTxt}>
              {"Send you a Subscription request."}
            </Text>
            <View style={{ flexDirection: "row", marginRight: 20 }}>
              <View
                style={[
                  styles.followBgSelected,
                  {
                    marginTop: 5,
                    marginBottom: 5,
                    paddingTop: 5,
                    paddingBottom: 5
                  }
                ]}
              >
                <Text style={styles.followTxtSelected}>Allow</Text>
              </View>
            </View>
            <Text style={styles.rowDesignationTxt}>
              {moment(item.friendrequest.createdAt).fromNow()}
            </Text>
          </View>
        );
      }
    }
  }
  renderItem(item, sectorID, rowID, _id) {
  // alert(JSON.stringify(item))
    console.log("iteeeeee", item);

    var that = this;
    var _id = this.state._id;
    var roomUser,unread;

    if (item.user1._id !== _id) {
      roomUser = item.user1;
      unread = item.nuser2 == 0?' ':item.nuser2;          
    } else if (item.user2._id !== _id) {
      roomUser = item.user2; 
      unread = item.nuser1 == 0?' ':item.nuser1;
    }
    
    console.log("room", item);
    {/**  here user:1(receiver) user2 (sender) 
    **/}
// alert(JSON.stringify(item) +'   ' +JSON.stringify(roomUser))

    return (
      <View style={styles.rowBg}>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Messages",{item:item,roomUser:roomUser,navigation:this.props.navigation,unreadForUser:(item.user1._id == _id)? 'nuser1' :'nuser2' })}}>
        <View style={styles.rowView}>
          <View style={[styles.profileImg, { alignSelf: "center" }]}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: roomUser.image }}
            />
          </View>
          <View style={[styles.namePostView, { justifyContent:'space-between',alignItems:'center',flexDirection:'row',width: Metrics.WIDTH * 0.75 }]}>
            <Text numberOfLines={1} style={[styles.rowNameTxt,{width:Dimensions.get('window').width-20-100,}]}>{roomUser.firstname}</Text>
            <Text style={[styles.rowNameTxt,{width:20}]}>{unread}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
    // }else{
    //   return(</View>);
    // }
    // // console.log("ir"+JSON.stringify(item));
    // if (item.type == "FRIENDREQUEST") {
    //   return (
    //     <View>
    //       {this.renderFirend(item)}
    //       <View style={styles.dividerHorizontal} />
    //     </View>
    //   );
    // } else if (item.type == "NEWPOST") {
    //   return (
    //     <View>
    //       <TouchableOpacity
    //         onPress={() => {
    //           this.props.navigation.navigate("PostDetail", { item: item });
    //         }}
    //         style={styles.rowBg}
    //       >
    //         <View style={styles.rowView}>
    //           {this.renderStoryUser(item)}

    //           <View style={styles.namePostView}>
    //             <Text numberOfLines={1} style={styles.rowNameTxt}>
    //               {item.post.user.username}
    //             </Text>

    //             <Text numberOfLines={1} style={styles.rowDesignationTxt}>
    //               {item.title}
    //             </Text>
    //             <Text style={styles.rowDesignationTxt}>
    //               {moment(item.createdAt).fromNow()}
    //             </Text>
    //           </View>
    //         </View>
    //       </TouchableOpacity>
    //       <View style={styles.dividerHorizontal} />
    //     </View>
    //   );
    // } else if (item.type == "NEWPOSTTAG") {
    //   return (
    //     <View>
    //       <TouchableOpacity
    //         onPress={() => {
    //           this.props.navigation.navigate("PostDetail", { item: item });
    //         }}
    //         style={styles.rowBg}
    //       >
    //         <View style={styles.rowView}>
    //           {this.renderStoryTagProfileTags(item)}

    //           <View style={styles.namePostView}>
    //             <Text numberOfLines={1} style={styles.rowDesignationTxt}>
    //               {item.title}
    //             </Text>
    //             <Text style={styles.rowDesignationTxt}>
    //               {moment(item.createdAt).fromNow()}
    //             </Text>
    //           </View>
    //         </View>
    //       </TouchableOpacity>
    //       <View style={styles.dividerHorizontal} />
    //     </View>
    //   );
    // }
    // });
  }

  renderList() {
    var list = this.props.notify.notifyList;
    // alert(JSON.stringify(list));
    if (this.state.isLoading) {
      return <Spinner />;
    } else if (
      list == null &&
      this.props.notify.isFinished == true &&
      this.props.notify.isLoading == false
    ) {
      return (
        <View
          style={{
            height: Dimensions.get("window").height - 120,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color.mainbackground,
            width: Dimensions.get("window").width
          }}
        >
          <View
            style={[
              ListStyle.notFoundcontainer,
              { backgroundColor: color.mainbackground }
            ]}
          >
            <MaterialIcons
              name="search"
              size={18}
              color={color.appTitle}
              style={ListStyle.notFoundIcn}
            />
          </View>
          <Text style={{ fontFamily: "Roboto-Medium" }}>No Records Found</Text>
        </View>
      );
    } else if (list != null) {
      console.log("li", list);
      return (
        <View style={{ height: Dimensions.get("window").height - 120 }}>
          <ListView
            dataSource={ds.cloneWithRows(list)}
            renderRow={this.renderItem.bind(this)}
            onEndReachedThreshold={100}
            initialListSize={10}
            enableEmptySections={true}
            // onEndReached={() => {
            //   this.getAllData("loadMore");
            // }}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }

  render() {
    var that = this;

    var data = [
      {
        id: 1,
        profileImage: { uri: profileImageOne },
        name: "Johnie Cornwall",
        post: "Senior Design Director",
        isSelected: "true"
      },
      {
        id: 2,
        profileImage: { uri: profileImageOne },
        name: "Renaldo Rozman",
        post: "Lead 3D Artist",
        isSelected: "false"
      },
      {
        id: 3,
        profileImage: { uri: profileImageTwo },
        name: "Argelia Bee",
        post: "Copywriter",
        isSelected: "false"
      },
      {
        id: 4,
        profileImage: { uri: profileImageThree },
        name: "Kimiko Hoyle",
        post: "Marketing & Creative Services",
        isSelected: "false"
      },
      {
        id: 5,
        profileImage: { uri: profileImageFour },
        name: "Elene Jeppesen",
        post: "Creative Leader",
        isSelected: "false"
      },
      {
        id: 6,
        profileImage: { uri: profileImageFive },
        name: "Lyndon Benavente",
        post: "Senior Design Director",
        isSelected: "false"
      },
      {
        id: 7,
        profileImage: { uri: profileImageSix },
        name: "Elfrieda Esser",
        post: "UX/UI Designer",
        isSelected: "false"
      },
      {
        id: 8,
        profileImage: { uri: profileImageSeven },
        name: "Devin Newberg",
        post: "Marketing Designer",
        isSelected: "false"
      },
      {
        id: 9,
        profileImage: { uri: profileImageEight },
        name: "Joey Gumm",
        post: "Interactive Art Director",
        isSelected: "false"
      }
    ];

    return (
      <View>
        <Container style={styles.main}>{this.renderList()}</Container>
      </View>
    );
  }
  
}
const mapStateToProps = state => {
  return {
    notify: state.notify
    // joinadd:state.joinadd,
    // privatepost:state.privatepost,
  };
};

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(groupAction));
  return {
    notificationAction: bindActionCreators(notificationAction, dispatch),
    // friendRequestAction:bindActionCreators(
    //   friendRequestAction, dispatch,
    // ),
    loginAction: bindActionCreators(loginAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationPage);
