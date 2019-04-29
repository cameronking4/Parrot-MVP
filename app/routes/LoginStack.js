
import React, { Component } from 'react';
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
  Navigator, 
  NativeModules,
  AsyncStorage,
  BackHandler, 
  StatusBar
} from 'react-native';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import { 
  createSwitchNavigator,
  createStackNavigator, 
  TabNavigator, 
  createDrawerNavigator,
  createBottomTabNavigator

} from 'react-navigation'; 

import LoginPage from '../container/Login/Login';
import RegGetOTP from '../components/Registration/RegGetOTP';
import RegCheckOTP from '../components/Registration/RegCheckOTP';


import RegistrationPage from '../container/Registration/Registration';
import OTPPage from '../components/Registration/OTPPage';
import RegistrationPasswordPage from '../container/Registration/RegistrationPassword';

const LoginStack = createStackNavigator({


    LoginPage: {
      screen: LoginPage,
      navigationOptions: { header: null } //to hide the header
    },
    RegGetOTP: {
      screen: RegGetOTP,
      navigationOptions: { header: null } //to hide the header
    },
    RegCheckOTP: {
      screen: RegCheckOTP,
      navigationOptions: { header: null } //to hide the header
    },

    RegistrationPage: {
        screen: RegistrationPage,
        navigationOptions: { header: null } //to hide the header
      },
      OTPPage: {
        screen: OTPPage,
        navigationOptions: { header: null } //to hide the header
      },
      RegistrationPasswordPage: {
        screen: RegistrationPasswordPage,
        navigationOptions: { header: null } //to hide the header
      },
      
    
      
    },
    {
      initialRouteName:'LoginPage',
    }
  );
export default LoginStack;