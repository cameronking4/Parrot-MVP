import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Alert,
  InteractionManager,
  TouchableOpacity,
  Linking,
  Image,
  Navigator,
  NativeModules,
  AsyncStorage,
  BackHandler,
  StatusBar
} from "react-native";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated"]);

import {
  createSwitchNavigator,
  createStackNavigator,
  TabNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import color from "../style/color";
import Icon from "react-native-vector-icons/MaterialIcons";

import SearchModal from '../container/Match/SearchModal';
import HomePage from "../container/Home/Home";
import PostCreate from "../components/Post/PostCreate";
import PostDetail from "../container/PostDetail/PostDetail";
import PostCreateComponent from "../container/Post/PostCreateComponent";

import MatchPage from "../container/Match/Match";

import ProfilePage from '../container/Profile/Profile';
import ProfileEdit from '../container/Profile/ProfileEdit';
import SettingsPage from '../components/Profile/SettingsPage';
import ChangePassword from '../components/Profile/ChangePassword';

import SwipeCreate from '../components/Post/SwipeCreate';

import MatchUserProfile from '../container/MatchUserProfile/MatchUserProfile';
import Notification from "../container/Notification/Notification";
import Messages from "../components/Notification/Messages";

import ProfessionsMultiPick from '../components/ProfessionsMultiPick/ProfessionsMultiPick';

import GetNotify from '../container/GetNotificcation/GetNotify';

const Home2Stack = createStackNavigator(
  {
    Messages:{

      screen:Messages,
      navigationOptions: { header: null } //to hide the header
    },
    Notification: {
      screen: Notification,
      navigationOptions: { header: null } //to hide the header
    }
  },
  {
    initialRouteName: "Notification"
    // lazy:false
  }
);
Home2Stack.navigationOptions = ({ navigation }) => {
  // alert()
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};


const HomeStack = createStackNavigator({

      HomePage:{

        screen:HomePage,
        navigationOptions: { header: null } //to hide the header
      },
      PostCreate:{

        screen:PostCreate,
        navigationOptions: { header: null } //to hide the header
      },
      PostCreateComponent:{

        screen:PostCreateComponent,
        navigationOptions: { header: null } //to hide the header
      },
      // InterestSelectPage:{

      //   screen:InterestSelectPage,
      //   navigationOptions: { header: null } //to hide the header
      // },
      PostDetail:{
         screen: PostDetail,
        navigationOptions: { header: null } //to hide the header
      },
      ProfessionsMultiPick:{
        screen: ProfessionsMultiPick,
        navigationOptions: { header: null } 
      }
    },
    {
      initialRouteName:'HomePage',
      // lazy:false
    }
);

HomeStack.navigationOptions = ({ navigation }) => {
  // alert()
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const MatchStack = createStackNavigator({

      MatchPage:{

        screen:MatchPage,
        navigationOptions: { header: null } //to hide the header
      },
      MatchUserProfile:{
        screen:MatchUserProfile,
        navigationOptions: { header: null }
      },
      SearchModal: {
        screen: SearchModal,
        navigationOptions: { header: null } //to hide the header
      },
  },
  {
    initialRouteName: "MatchPage"
    // lazy:false
  }
);

MatchStack.navigationOptions = ({ navigation }) => {
  // alert()
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const ProfileStack = createStackNavigator(
  {
    ProfilePage: {
      screen: ProfilePage,
      navigationOptions: { header: null }
    },
      ProfileEdit:{
        screen:ProfileEdit,
        navigationOptions: { header: null }
      },

      ChangePassword:{
        screen:ChangePassword,
        navigationOptions: { header: null }
      },
      // WebViewPage:{
      //   screen:WebViewPage,
      //   navigationOptions: { header: null }
      // },

      SettingsPage:{
        screen:SettingsPage,
        navigationOptions: { header: null }
      },
      // CustomBottomTab:{

      //   screen:CustomBottomTab,
      //   navigationOptions: { header: null } //to hide the header
      // },
  
  },
  {
    initialRouteName: "ProfilePage"
  }
);

ProfileStack.navigationOptions = ({ navigation }) => {
  // console.log("in",navigation.state.index);
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const NotificationStack = createStackNavigator(
  {
    GetNotify: {
      screen: GetNotify,
      navigationOptions: { header: null } //to hide the header
    }
  },
  {
    initialRouteName: "GetNotify"
    // lazy:false
  }
);
NotificationStack.navigationOptions = ({ navigation }) => {
  // alert()
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const HomeTabs = createMaterialTopTabNavigator(
  {

    HomeStack:{
        screen:HomeStack,
        navigationOptions: {
          tabBarIcon: () => (
           <Icon name="home" size={25} color={color.tabicon}/>
          )
        },
      },
      
      HomeeStack: {
        screen: Home2Stack,
        navigationOptions: {
          tabBarIcon: () => (
            <Icon name="message" size={25} color={color.tabicon} />
          )
        }
      },
      
      MatchStack:{
        screen:MatchStack,
        navigationOptions: {
          tabBarIcon: () => (
           <Image
                style={[{width: 25, height: 25,}]}
                source={require('../components/Images/logo.png')}
              />
          )
        },
      },
       NotificationStack: {
          screen: NotificationStack,
          navigationOptions: {
            tabBarIcon: () => (
              <Icon name="notifications" size={25} color={color.tabicon} />
            )
          }
        },
      
      ProfileStack:{
        screen:ProfileStack,
        navigationOptions: {
          tabBarIcon: () => (
           <Icon name="person" size={25} color={color.tabicon}/>
          )
        },
      },
  },
  {
    initialRouteName: "MatchStack",
    swipeEnabled: false,
    // lazy: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      },
      showIcon: true,
      showLabel: false,
      tabStyle: {
        // width: 100,
      },
      indicatorStyle: {
        backgroundColor: "#ffffff"
      },
      style: {
        backgroundColor: "#ffffff"
      }
    }
  }
);

export default HomeTabs;
