import { Platform, StyleSheet, Dimensions } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2d324f",
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
  },

  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent
  },
  backArrow: {
    width: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  menuIconWhite: {
    justifyContent: "center",
    alignItems: "center"
  },

  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.001,
    alignSelf: "center"
    // fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  right: {
    flex: 0.5
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    flexDirection: "column"
  },

  rowBg: {
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    marginLeft: Metrics.WIDTH * 0.045,
    marginTop: Metrics.HEIGHT * 0.015
  },

  profileImg: {
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06,
    alignSelf: "center",
    justifyContent: "center"
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(16),
    fontFamily: "Roboto-Bold",
    textAlign: "left"
  },

  rowDesignationTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(13),
    fontFamily: "Roboto-Medium",
    textAlign: "left"
  },

  dividerHorizontal: {
    width: Metrics.WIDTH,
    // width: ((Metrics.WIDTH) * 0.99) + 5,
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: "#D7D7D7",
    alignSelf: "flex-end"
  },

  followBgNotSelected: {
    width: Metrics.WIDTH * 0.24,
    height: Metrics.HEIGHT * 0.035,
    borderRadius: Metrics.HEIGHT * 0.005,
    borderWidth: 1,
    borderColor: "#0691ce",
    marginRight: Metrics.WIDTH * 0.03,
    justifyContent: "center"
  },

  followBgSelected: {
    width: Metrics.WIDTH * 0.24,
    height: Metrics.HEIGHT * 0.035,
    borderRadius: Metrics.HEIGHT * 0.005,
    backgroundColor: "#0691ce",
    marginRight: Metrics.WIDTH * 0.03,
    justifyContent: "center"
  },
  stayBgNotSelected: {
    width: Metrics.WIDTH * 0.24,
    height: Metrics.HEIGHT * 0.035,
    borderRadius: Metrics.HEIGHT * 0.005,
    borderWidth: 1,
    borderColor: "#0691ce",
    marginRight: Metrics.WIDTH * 0.03,
    justifyContent: "center"
  },

  stayBgSelected: {
    width: Metrics.WIDTH * 0.24,
    height: Metrics.HEIGHT * 0.035,
    borderRadius: Metrics.HEIGHT * 0.005,
    borderColor: "red",
    borderWidth: 1,
    // backgroundColor: "#0691ce",
    marginRight: Metrics.WIDTH * 0.03,
    justifyContent: "center"
  },
  followTxtSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: "Roboto-Medium",
    color: Colors.snow,
    alignSelf: "center"
  },

  followTxtNotSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: "Roboto-Medium",
    color: "#0691ce",
    alignSelf: "center"
  },

  listMainView: {
    width: Metrics.WIDTH
  },

  rowView: {
    flexDirection: "row",
    // marginBottom:(Metrics.HEIGHT) * 0.015,
    // edited by me
    marginBottom: Metrics.HEIGHT * 0.02
  },

  namePostView: {
    flexDirection: "column",
    marginLeft: Metrics.WIDTH * 0.045,
    width: Metrics.WIDTH * 0.75,
    justifyContent: "center"
    // backgroundColor:"green",
  },
  textInput: {
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "flex-start",
    height: Metrics.WIDTH * 0.12,
    width: Metrics.WIDTH * 0.85,
    // fontFamily: Fonts.type.SFUIDisplayRegular,
    color: "#FFF",
    // marginTop: (Metrics.WIDTH * 0.05),
    backgroundColor: "transparent",
    paddingLeft: 15
  }
});

export default styles;
