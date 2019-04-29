
import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Image, 
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

import { Toolbar,Icon } from 'react-native-material-ui';

import PostDetailComponent from '../../components/PostDetail/PostDetail';

import {bindActionCreators} from 'redux';

import * as postDetailAction from '../../action/postDetailAction';


var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class PostDetail extends Component {

constructor(props) {
    super(props);
    this.state={
        _id:'',
        
    };
}


componentWillMount(){
// alert(this.props.bottomTab)

  const { navigation } = this.props;
  const item = navigation.getParam('item', null); 
  const fromHome = navigation.getParam('fromHome', false); 

// alert('%%'+JSON.stringify(item)+fromHome)

  if(fromHome == true)
    this.setState({_id:item.item._id});
  else if(fromHome == 'yearago')
    this.setState({_id:item._id});
  else
    this.setState({_id: item });
}

  	render() {
        
	  return (

	  	<View style={{flex:1,backgroundColor:color.mainbackground}}>	 
		  	
		  	<StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />               
                  <PostDetailComponent
                  _id={this.state._id} 
                  navigation={this.props.navigation} 
                  postDetailAction={this.props.postDetailAction}
                  postDetail={this.props.postDetail}
                  />

	    </View>
	  );
	}
}


const styles = StyleSheet.create({
  titleText:{
    // fontFamily:'AirbnbCerealApp-Bold',
    fontSize:25,
    lineHeight:55,
    color:color.appTitle,
    textAlign:'left',
    fontWeight:'600',
  },

});


const mapStateToProps = state => {

  return {
    postDetail : state.postDetail,
  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(postDetailAction));
  return {
    postDetailAction : bindActionCreators(
      postDetailAction, dispatch,
    ),

  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
