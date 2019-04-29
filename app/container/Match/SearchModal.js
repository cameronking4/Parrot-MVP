
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
  Modal
} from 'react-native';


import { Toolbar } from 'react-native-material-ui';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SearchModalComponent from '../../components/Match/SearchModal';

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class SearchModal extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      
      searchModalVisible:true,
    }
      // alert("Test");
  }



  componentWillMount(){
  
    // this.props.storeAction.restoreLoginData();
  }


  oncloseSearchModal(goToDetail,item){

    if(goToDetail == 'goToDetail'){

        // alert('hiii');

        this.props.navigation.goBack();
        this.props.navigation.navigate('MatchUserProfile',{matchforuserid:item.item._id,username:item.item.username});
        this.setState({searchModalVisible:false});
        
    
    }
    else{
      console.log('userpage:onsearchModal::');
      this.setState({searchModalVisible:false});
      this.props.navigation.goBack(null);
    
    }

  
}

  	render() {
        
	  return (

	  	<View style={{flex:1,}}>	 
		  
		  	<StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />
    	        <View style={{}}>

                  {/*custom toolbar<View style={[CommonStyle.toolbarView,{flexDirection:'row',justifyContent:'space-between'}]}>
                    <Text style={[CommonStyle.toolbarText]}>StorePage</Text>
                    <Icon name="filter" color={'#000000'}  size={22}/>
                  </View>
                  */}

                  <View style={{height:Dimensions.get('window').height-80}}>    
          	 
                     <Modal  animationType = {"slide"} 
                          transparent = {true}
                          visible = {this.state.searchModalVisible}
                          onRequestClose = {this.oncloseSearchModal.bind(this)}
                    >

                    <View style={{flex:1,}}>

                     <SearchModalComponent 
                          modalVisible={this.state.searchModalVisible} 
                          oncloseModal={this.oncloseSearchModal.bind(this)}
                          navigation={this.props.navigation}
                      /> 

                    </View>

                    </Modal>

                  </View>
              
              </View>

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

 module.exports = SearchModal;

