
import { Platform, StyleSheet, Dimensions } from 'react-native';

// Screen Styles
import { Fonts, Metrics, Colors } from '../Themes/';

const postAddstyles = StyleSheet.create({

  header: {
    backgroundColor: '#2d324f',
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: (Metrics.HEIGHT * 0.03),
    elevation: 0,
    paddingLeft: (Metrics.WIDTH * 0.05),
    paddingRight: (Metrics.WIDTH * 0.05),
  },

  left: {
    flex: 0.5,
    backgroundColor:"transparent",
  },
  backArrow:{
    width: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuIconWhite: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: (Metrics.HEIGHT * 0.001),
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  right: {
    flex: 0.5
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    flexDirection: 'column'
  },

  rowBg: {
    width: (Metrics.WIDTH),
    backgroundColor: "green",
    marginLeft: (Metrics.WIDTH) * 0.045,
    marginTop: (Metrics.HEIGHT) * 0.015,
  },

  profileImg: {
    backgroundColor:"red",
    width:Dimensions.get("window").width-100,
    height:100,
    
    // width: (Metrics.WIDTH) * 0.12,
    // height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(16),
    fontWeight:"200",
    // fontFamily: "Roboto-Medium",
    textAlign: 'left'
  },

  rowDesignationTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(13),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left'
  },

  dividerHorizontal: {
    width:(Metrics.WIDTH) ,
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#D7D7D7",
    alignSelf: 'flex-end',
  },

  followBgNotSelected: {
    width: (Metrics.WIDTH) * 0.22,
    height: (Metrics.HEIGHT) * 0.035,
    borderRadius: (Metrics.HEIGHT) * 0.045,
    borderWidth: 1,
    borderColor: "#0691ce",
    marginRight: (Metrics.WIDTH) * 0.03,
    justifyContent:'center'
  },

  followBgSelected: {
    width: (Metrics.WIDTH) * 0.22,
    height: (Metrics.HEIGHT) * 0.035,
    borderRadius: (Metrics.HEIGHT) * 0.045,
    backgroundColor: "#0691ce",
    marginRight: (Metrics.WIDTH) * 0.03,
    justifyContent:'center'
  },

  followTxtSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: Colors.snow,
    alignSelf: 'center',
  },

  followTxtNotSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: "#0691ce",
    alignSelf: 'center',
  },

  listMainView:{
    width: (Metrics.WIDTH)
  },

  rowView:{
    flexDirection: 'row',
    // marginBottom:(Metrics.HEIGHT) * 0.015,
    // edited by me
    marginBottom:(Metrics.HEIGHT) * 0.020
  },

  namePostView:{
    flexDirection: 'column',
    width:Dimensions.get("window").width-50,
    paddingLeft:20,
    backgroundColor:"green",
    // width: (Metrics.WIDTH) * 0.50,
    justifyContent: 'center'
  },
  textInput: {
    borderRadius: 5,
    justifyContent:'center',
    alignSelf: 'flex-start',
    height:  (Metrics.WIDTH * 0.12),
    width: (Metrics.WIDTH * 0.85),
    fontFamily: Fonts.type.SFUIDisplayRegular,
    color:"#FFF",
    // marginTop: (Metrics.WIDTH * 0.05),
    backgroundColor: 'transparent',
    paddingLeft: 15

  },
 

});

export default postAddstyles;
