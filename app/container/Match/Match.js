import React, { Component, PropTypes } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";

import { NavigationEvents } from "react-navigation";

var Config = require("../../Config");
var AuthUtility = require("../../reducer/lib/AuthUtility");
var ApiUtility = require("../../reducer/lib/ApiUtility");

import { Toolbar, Icon } from "react-native-material-ui";

import Icons from "react-native-vector-icons/dist/FontAwesome";

import MatchComponent from "../../components/Match/Match";

// import NotificationScreen from '../Notification/Notification';
// import PostScreen from '../Post/Post';
// import ProfileScreen from '../Profile/Profile';

// import CustomBottomTab from '../../common/CustomBottomTab';

var color = require("../../style/color.js");
var CommonStyle = require("../../style/common");

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginAction from "../../action/loginAction";
import * as matchAction from "../../action/matchAction";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listtype: "postlist",
      professionsModalVisible: false,

      regProfessions: [],
      fromReg:null,
    };
  }

  componentWillMount() {


  const { navigation } = this.props;
  const fromReg = navigation.getParam('fromReg', null); 
    
    this.setState({fromReg});
  }

  renderToolbar() {
    if (this.state.listtype == "postlist") {
      return (
        <View
          style={[
            CommonStyle.toolbarView,
            { flexDirection: "row", marginTop: Platform.OS == "ios" ? 20 : 0 }
          ]}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 50,
              paddingTop: 8,
              width: Dimensions.get("window").width - 30
            }}
          >
            <Image
              style={{ height: 40, width: 120 }}
              source={require("../../components/Images/crushd.png")}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("SearchModal");
            }}
            style={{ alignItems: "flex-start", paddingRight: 20 }}
          >
            <Icon name="search" size={28} color={color.text3} style={{}} />
          </TouchableOpacity>
          {/* 
                    <TouchableOpacity onPress={()=>this.onlogout()} style={{width:(Dimensions.get('window').width/3)-10,alignItems:'flex-end',paddingRight:10}} >
                      <Text style={[CommonStyle.toolbarText,{color:color.text3}]}>Logout</Text>
                    </TouchableOpacity>

                   <Text style={[CommonStyle.toolbarText]}>Crushd</Text>*/}

          {/*<TouchableOpacity onPress={()=>{this.props.navigation.navigate('FilterModal')}}>
                      <Icon name="search" size={28} color={color.toolTitleColor} style={{}}/>
                    </TouchableOpacity>
                    */}
        </View>
      );
    } else {
      return (
        <View
          style={[
            CommonStyle.toolbarView,
            {
              flexDirection: "row",
              justifyContent: "center",
              marginTop: Platform.OS == "ios" ? 20 : 0
            }
          ]}
        >
          <Text style={[CommonStyle.toolbarText]}>Bookmark</Text>
        </View>
      );
    }
  }

  fetchMatchData() {
    var that = this;
    AuthUtility.getUserField("_id", function(loginid) {
      // alert()
      var bunch = {
        reqSorce: "mobile",
        // _id:_id
        status: "pending",
        user: loginid
      };

      var path = Config.API_URL + "/match/listing";
      that.props.matchAction.fetchMatchList(path, bunch);
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={color.statusbar}
          barStyle="dark-content"
          hidden={false}
        />

        {/*<View style={{height:Dimensions.get('window').height-20,}}>*/}
        <View style={{ height: Dimensions.get("window").height }}>
          <NavigationEvents
            onWillFocus={payload => {
              this.fetchMatchData();
            }}
          />

          {this.renderToolbar()}

          <View style={{ height: Dimensions.get("window").height - 122 }}>
            <MatchComponent
              navigation={this.props.navigation}
              loginAction={this.props.loginAction}
              matchAction={this.props.matchAction}
              match={this.props.match}
              cardIndex={0}
              fromReg={this.state.fromReg}
            />
          </View>
        </View>

        {/* <CustomBottomTab onBtnPress={this.setView.bind(this)} navigation={this.props.navigation}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

// module.exports = Home;
const mapStateToProps = state => {
  // alert(JSON.stringify(state.login));
  return {
    login: state.login,
    match: state.match
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
    matchAction: bindActionCreators(matchAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Match);
