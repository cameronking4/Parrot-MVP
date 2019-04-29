//date:16/4/2018

import {COLOR} from 'react-native-material-ui';
import {
  Platform,
} from 'react-native';
var color = {

// statusbar colors
    statusbar:'#ffaaa9', //statusbar color
    snow:"#FFFFFF",
    tabicon:"#741003",
// background colors
    homebackground:'#e9e9ef',
    mainbackground:'#ffffff', //background color of entire app

    crushcolor:'green',
    nocrushcolor:'red',

// text colors
    appTitle:'#000000',
    
    matchtitletext:'#626262',
    matchsubtext:'#c2c2c2',

    instacolor:"#fb3958",

    text1:'#741003', //textcolor of entire app
    text2:'#d62e2f',
    text3:'#fb625d',
    text4:'#ffaaa9',

    btnTitle:'#f8feff', //btn text before click
    rBtnTitle:COLOR.amber500, // btn text after click

    fbcolor:'#3897f1',

//iconColor

    iconColor:'#3897f1',

// btn
    btnBack:COLOR.grey400, //before click: buttoncolor of entire app
    rBtnBack:COLOR.amber50, //after click: buttoncolor of entire app

// seperator 
    vLine : '#b7b7b7', //verticalLine
    hLine : '#b7b7b7', //horizontalLine

// carausel dots
    dot  : COLOR.amber800,  // color of inactive dot
    rDot : COLOR.amber50,   // color of active dot

//form color
    borderBottomColor : COLOR.amber700,
    underlineColorAndroid :Platform.OS == 'android'? COLOR.grey100 : '#000000' , // color of borderbottom color for textinput

    backgroundViewColor:COLOR.grey100 ,

    placeholderTextColor : COLOR.grey400,  //placeholder
    textInputColor : '#000000',  // color of text in inputtext

//not found color
    notFoundColor:COLOR.amber700,



//toolbar colors
    toolTitleColor:'#000',
    toolBackColor:'#fafafa',


//image colors
    imageBack:'#fafafa',

//toggleColor
    toggleOn:COLOR.amber500, //before click: buttoncolor of entire app
    toggleOff:COLOR.grey600,
    sliderOn:COLOR.amber200,
    sliderOff:COLOR.grey200,


// selected category color 
    catSelect:'rgba(0,0,0,0.1)',

//bottomnav tab
    bottomTabActive:COLOR.amber700,
    rbottomTabActive:'#e2e2e2',

//tab inactive color
    tabInactive:COLOR.grey400,



    ColorMain:COLOR.grey200,
    grey6:COLOR.grey500,  	

    amber7:COLOR.amber700,
    amber1:COLOR.amber100,
    amber3:COLOR.amber300,
    amber2:COLOR.amber200, 
    amber9:COLOR.amber900,
    amber4:COLOR.amber400,
    amber5:COLOR.amber500,

    tamber1:'#f05522',  //  main color //login btn color
    grey1:'#e2e2e2',     // bottomnav deactive color
    homeback:'#ededed',  // home back color
    placeholder:'#7d7d7e',

    placeholderTextColor:COLOR.grey400,
    loginTitle:'#fcefea',
    subTitle:'#9b9b9b',
    
};

module.exports = color;
