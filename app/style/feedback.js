var ReactNative = require('react-native');
var { StyleSheet} = ReactNative;
var Dimensions = require('Dimensions');

var Constants = require('./constants');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var feedbackstyle = StyleSheet.create({
  container:{
    flex:1,
    width: width,
  },
  maincontainer:{
    //flex:1,
    height:height,
    width: width,
    //alignSelf:'center',
    //justifyContent:'center',
    alignItems:'center',
    //width:width,
   // backgroundColor:'rgba(0,0,0,0.5)',
  },
  bugview:{
    backgroundColor:'red',
    width: width-47
  },
  suggestionview:{
    flex:1,
    backgroundColor:'yellow',
    width: width-47
  },
  likeitview:{
    backgroundColor:'blue',
    width: width-48
  },
  bugcircle:{
    // top:38,
    // left:115,
    width:95,
    height:95,
    borderRadius:48,
    padding:5,
    backgroundColor:Constants.cyanLightStatus,
    // marginHorizontal:80,
    // marginVertical:40,
  },
  suggestioncircle:{
    // bottom:137,
    // right:100,
    width:95,
    height:95,
    borderRadius:48,
    padding:5,

    backgroundColor:Constants.cyanLightStatus,
    // marginHorizontal:80,
    // marginVertical:40,
  },
  likeitcircle:{
    //position:'absolute',
    // bottom:335,
    // right:5,
    zIndex:100,
    width:140,
    height:140,
    borderRadius:70,
    padding:5,
    backgroundColor:Constants.cyanLightText,
    justifyContent:'center',
    alignItems:'center',
    // marginHorizontal:70,
    // marginVertical:40,
    borderWidth:5,
    borderColor:'#ffffff',
  },
  likeicon:{
    flex:1,
    position:'absolute',
    top:35
  },
  liketxt:{
    flex:1,
    fontSize:25,
    color:'#ffffff',
    alignSelf:'center',
    paddingTop:65
  },
  bugicon:{
    flex:1,
    position:'absolute',
    top:25,
    right:38,
  },
  bugtxt:{
    flex:1,
    paddingTop:50,
    alignSelf:'center',
    fontSize:12,
    color:'#ffffff',
  },
  plusicon:{
    flex:1,
    position:'absolute',
    top:25,
    left:35,
  },
  plustxt:{
    flex:1,
    paddingTop:45,
    paddingLeft:10,
    fontSize:12,
    color:'#ffffff',
    fontFamily:'Roboto-Bold',
    alignSelf:'center'
  },
});

module.exports = feedbackstyle;
