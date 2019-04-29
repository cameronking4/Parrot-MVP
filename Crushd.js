
import React, { Component } from 'react';
import {
ActivityIndicator,
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

import { ThemeProvider } from 'react-native-material-ui';


import { 
  createStackNavigator, 
  TabNavigator, 
  createDrawerNavigator,
  createBottomTabNavigator,
  createSwitchNavigator

} from 'react-navigation'; 

import { Provider } from 'react-redux';

import configureStore from './app/store/configureStore';

const store = configureStore({});

// import SplashScreen from 'react-native-splash-screen';

var AuthUtility= require('./app/reducer/lib/AuthUtility');
var ApiUtility= require('./app/reducer/lib/ApiUtility');

import AuthLoadingScreen from './app/routes/AuthLoading';

import LoginStack from './app/routes/LoginStack';
import HomeStack from './app/routes/HomeStack';


const AppStack = createStackNavigator({ HomeStack: HomeStack },{headerMode:'none'});
const AuthStack = createStackNavigator({ LoginStack:LoginStack },{headerMode:'none'});

const RootStack = createSwitchNavigator(
  {
    AuthLoading:{
        screen: AuthLoadingScreen,
        navigationOptions: { header: null } //to hide the header,
    },
    HomeStack:{ 
        screen: AppStack,
        navigationOptions: {header: null } //to hide the header,
    },
    LoginStack: {
        screen: AuthStack,
        navigationOptions: { header: null } //to hide the header,
    }
  },
  { 
    headerMode: 'none' ,
    initialRouteName: 'AuthLoading',
  }
);

export default class Crushd extends React.Component {
  
  constructor(props){
    super(props);

    this.state={
    }

  }

  componentDidMount () {

    // SplashScreen.hide();  //for splashscreen

  }


  render(){
    // AuthUtility.removeToken(function(){});
    // AuthUtility.clear(function(){});
    return (
      <Provider store={store}>
        <ThemeProvider >
          <RootStack  />
        </ThemeProvider>
      </Provider>
    );
  }
}
