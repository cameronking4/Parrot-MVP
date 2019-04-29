
import {
  Platform,
} from 'react-native';
var ReactNative = require('react-native');
var { StyleSheet} = ReactNative;
var Dimensions = require('Dimensions');
var color = require('./color');
//width:Dimensions.get('window').width-30,

var CommonStyle = StyleSheet.create({

mainFullScreenContainer:{
	justifyContent:'flex-start',
	alignItems:'stretch',
	paddingLeft:20,
	paddingRight:20,
},

toolbarView:{
	height:50,
	width:Dimensions.get('window').width,
	backgroundColor:color.toolBackColor,
	justifyContent:'center',
	paddingLeft:15,
	paddingRight:15,
	paddingTop:12,
	paddingBottom:12
},

toolbarText:{
	fontSize:20,
	color:color.text3,
	fontWeight:'400',
	fontFamily:'Roboto-Bold',
},

platformHeight:{
	marginTop:Platform.OS == 'android'? 0 : 20,
	height:Platform.OS == 'android' ? Dimensions.get('window').height :Dimensions.get('window').height-10,
	backgroundColor:color.mainbackground
},

screenHeight:{
	height:Dimensions.get('window').height,
},

// text for app Heading
h1:{
	
	fontSize:40,
	fontWeight:"700"
},

h3:{
	fontSize:10,
	fontWeight:"500"
},

//btn used in login
loginContainer:{
	height:Dimensions.get('window').height-20,
	justifyContent:'flex-start',
	// paddingRight:20,
	// paddingLeft:20,
},
loginButtonView: {
   	width:Dimensions.get('window').width-40,
    height:60,
    
},

//btn used in registration
submitBtn:{
	height:50,
	width:Dimensions.get('window').width-40,
	borderRadius:5,
	backgroundColor:color.iconColor,
	justifyContent:'center',
	alignItems:'center'
},
submitBtnText:{
	color:color.btnTitle,
	alignSelf:'center',
	textAlign:'center',
	fontFamily:'Roboto-Medium',
	fontSize:18,
	marginRight:10,
},
textInputStyle:{
	color:color.textInputColor,
	fontFamily:'Roboto-Regular',
	borderColor:color.vLine,
	borderWidth:1,
	height:50,
	fontSize:17,
	paddingLeft:15,
	borderRadius:5,
	paddingTop:5,
	paddingBottom:5,
	backgroundColor:color.imageBack
},

vLine:{
	height:40,
	alignSelf:'center',
	backgroundColor:color.vLine,
	width:2
},

hLine:{
	height:1,
	backgroundColor:color.hLine,
	width:Dimensions.get('window').width
},


capsuleView:{
  //backgroundColor:"#ffffff",
  //width:100,
  paddingTop:3,
  paddingRight:3,
  paddingBottom:3,
  paddingLeft:3,
  marginRight:5,
  marginBottom:3,
  alignItems:'flex-start',
  borderRadius:10,
  borderColor:color.btnBack,
  borderWidth:2,
  justifyContent:'space-between',
  flexDirection:'row',
},

capsuleText:{
  marginLeft:4,
  textAlign:'left',
  color:'#000000',

  //fontWeight :'bold',
  fontSize:12,
},

//to create action button view
  
actionButtonView:{
	elevation:10,
	position:'absolute',
	// bottom:30,
	right:5,
	justifyContent:'center',
	alignItems:'center',
	// alignSelf:'center',
	backgroundColor:color.text3,
	height:50,
	width:50,
	// paddingBottom:4,
	borderRadius:25
},
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
},
 imageUser:{
    
    width:50,
    height:50,
    borderRadius: 25,
  },
  name:{
	 width:Dimensions.get("window").width-50,
	 justifyContent:'center',
    paddingLeft:20,
    // backgroundColor:"green",
    paddingRight:20,
  },

headerText:{
	fontSize:15,
    color: "#000000",
    justifyContent:'flex-start',
	alignItems:'flex-start',
	height:50,
	borderWidth: 0.5,
    borderColor:color.placeholderTextColor,
	borderRadius: 5,
	marginTop:6,
	marginBottom:6,
	paddingLeft:6,
},
postCreateheaderText:{
	fontSize:15,
    color: "#000000",
    justifyContent:'flex-start',
	alignItems:'flex-start',
	height:50,
	borderWidth: 0.5,
    borderColor:'#ffffff',
	borderRadius: 5,
	marginTop:6,
	marginBottom:6,
	paddingLeft:6,
},

addBtn:{
	// marginLeft:5,
	marginBottom:12,
	// marginRight:12,
	marginTop:10,
	justifyContent:'center',
	alignItems:'center',
	alignSelf:'center',
	height:28,
	width:28,
	borderWidth:1,
	borderRadius:14,
	backgroundColor:color.placeholderTextColor,
	elevation:0,
	borderColor:'#d0d0d0'
},
navRightBox:{
		width:50,
		justifyContent:'center',
		// alignItems:'center',
		flexDirection:'row',
	},
backArrow:{
	marginRight:10,
	height:40,
	width:40,
	borderWidth:1,
	borderRadius:20,
	borderColor:'rgba(255,255,255,0.5)',
	backgroundColor:'rgba(255,255,255,0.5)',
	justifyContent:'center',
	alignItems:'center',
	padding:7
}

});

module.exports = CommonStyle;
