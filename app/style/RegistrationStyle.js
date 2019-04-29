

var ReactNative = require('react-native');
var { StyleSheet} = ReactNative;
var Dimensions = require('Dimensions');
var color = require('./color');
//width:Dimensions.get('window').width-30,

var RegistrationStyle = StyleSheet.create({


formFieldView:{
	height:45,
	borderTopColor:'transparent',
	borderRightColor:'transparent',
	borderLeftColor:'transparent',
	borderBottomColor:color.underlineColorAndroid,
	borderWidth:1,
	justifyContent:'flex-end',
	paddingBottom:7,
	marginLeft:4,
	marginRight:4
},


formFieldViewError:{
	height:45,
	borderTopColor:'transparent',
	borderRightColor:'transparent',
	borderLeftColor:'transparent',
	borderBottomColor:'red',
	borderWidth:1,
	justifyContent:'flex-end',
	paddingBottom:7,
	marginLeft:4,
	marginRight:4
},

formFieldText:{
	fontSize:15,
	justifyContent:'flex-end',
	color:color.placeholderTextColor
},

formText:{
	padding:5,
	marginTop:20,
	fontSize:15,
	color:color.placeholderTextColor
}

});

module.exports = RegistrationStyle;
