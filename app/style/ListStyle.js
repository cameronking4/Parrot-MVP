var ReactNative = require('react-native');
var { StyleSheet} = ReactNative;
var Dimensions = require('Dimensions');
var color = require('./color');
//width:Dimensions.get('window').width-30,

var ListStyle = StyleSheet.create({

notFoundcontainer:{
  alignSelf:'center',
  margin:5,
  justifyContent:'center',
  backgroundColor:color.notFoundColor,
  height:40,
  width:40,
  borderWidth:1,
  borderRadius:20,
  borderColor:color.text3,
},
notFoundIcn:{
  alignSelf:'center',
  justifyContent:'center',
},

container: {
    // height:230,
    marginTop:7,
    marginBottom:7,
    alignSelf:'center',
    alignItems:'flex-start',
    width:Dimensions.get('window').width-30,
    borderWidth:1,
    borderColor:'#ffffff',
    borderRadius:5,
    margin:18,
    padding:10,
    flexDirection:'row',
    // elevation:3,
    backgroundColor:'#ffffff'
},
imageContainer:{
  width:70,
  height:70,
  borderRadius:35,
  backgroundColor:color.imageBack,
  marginRight:15
}


});

module.exports = ListStyle;
