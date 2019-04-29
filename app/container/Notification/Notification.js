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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginAction from "../../action/loginAction";

var AuthUtility = require("../../reducer/lib/AuthUtility");
var ApiUtility = require("../../reducer/lib/ApiUtility");

import { Toolbar } from "react-native-material-ui";

import Icon from "react-native-vector-icons/dist/FontAwesome";
import NotificationPage from "../../components/Notification/Notificationpage";

var color = require("../../style/color.js");
var CommonStyle = require("../../style/common");

class Notification extends Component {
  componentWillMount() {
    // this.props.loginAction.restoreLoginData();
  }

  onlogout() {
    AuthUtility.removeToken(function() {});
    AuthUtility.clear(function() {}); 
    this.props.navigation.navigate("LoginPage");
  }

  render() {
    return (
      <View style={[CommonStyle.platformHeight]}>
        <StatusBar
          backgroundColor={color.statusbar}
          barStyle="dark-content"
          hidden={false}
        />

        <View style={{}}>
          <View
            style={[
              CommonStyle.toolbarView,
              { flexDirection: "row", justifyContent: "center" }
            ]}
          >
            <Text style={[CommonStyle.toolbarText]}>Room</Text>
          </View>

          <ScrollView style={{}}>
            <NotificationPage
              navigation={this.props.navigation}
              loginAction={this.props.loginAction}
              login={this.props.login}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    // fontFamily:'Roboto-Bold',
    fontSize: 25,
    lineHeight: 55,
    color: color.appTitle,
    textAlign: "left",
    fontWeight: "600"
  }
});

const mapStateToProps = state => {
  // alert(JSON.stringify(state.login));
  return {
    login: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAction: bindActionCreators(loginAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
