var ReactNative = require('react-native');
var { StyleSheet} = ReactNative;
//var Dimensions = require('Dimensions');
var Constants = require('./constants');

var Detail = StyleSheet.create({

stickyHeader:{
	flexDirection:'row',
	backgroundColor:"#ffffff",
	height:50,
	alignItems:'center',
},
stickyHeaderTitle:{
	//alignItems:'center',
	fontSize:15,
	color:Constants.ColorMain,
},
foreground:{
	height:200,
	
	backgroundColor:Constants.ColorLight,	
},
foregroundTitle:{
	marginTop:8,
	fontSize:25,
	color:"#ffffff",
	
},
foregroundAvatar:{
	height:100,
	width:100,
	alignItems:'center',
	justifyContent:'center',
	backgroundColor:"#ffffff",
	borderRadius:50,
	borderColor:"#ffffff",
	borderWidth:1,
},
foregroundSubTitle:{

},
detailAvatarText:{
	fontSize:48,
	color:Constants.ColorLight,
	marginBottom:0,
	paddingBottom:0,
	lineHeight:35,
},
detailAvatarTextString:{
	fontSize:33,
	color:Constants.ColorLight,
	marginBottom:0,
	paddingBottom:0,
	lineHeight:38,
},

});


module.exports = Detail;