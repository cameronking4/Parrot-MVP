import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, 
  ListView,
  View,  
  Text,
  Dimensions,
  Modal,
  StyleSheet,
  ScrollView,
  InteractionManager,
  TouchableOpacity,
}from 'react-native';
import {Toolbar,} from 'react-native-material-ui';

import RNGooglePlacePicker from 'react-native-google-place-picker';
 

var CommonStyle = require('../style/common');
var color = require('../style/color.js');

class LatLongLocationPicker extends React.Component {

constructor(props) {
  super(props);
  
  this.state = {

    modalVisible : false,

    latitude:'',
    longitude:'',
    address:'',
    city:'',    

    location: null
  };
}

componentWillReceiveProps(nextProps){
    
    if(nextProps.modalVisible != this.state.modalVisible)
    {
      this.setState({
        modalVisible : nextProps.modalVisible
      });

    }
  }
 
oncloseModal(){
    this.props.oncloseModal(this.state.latitude,this.state.longitude);
}

fetchLocation(data,details){
  var that = this;
  var location={latitude:details.geometry.location.lat,
                longitude:details.geometry.location.lng,
                address:details.formatted_address,
              };

    this.setState({
      latitude:location.latitude,
      longitude:location.longitude,      
      address:details.formatted_address
    });

    if(this.state.latitude !== '' && this.state.longitude !== '' ){
      this.oncloseModal();
    }

    // that.getCityName(location);

}

onPress() {
  RNGooglePlacePicker.show((response) => {
    if (response.didCancel) {
      console.log('User cancelled GooglePlacePicker');
    }
    else if (response.error) {
      console.log('GooglePlacePicker Error: ', response.error);
    }
    else {
      this.setState({
        location: response
      });
    }
  })
}

render() {

  return (
    
    <Modal animationType = {"slide"} transparent = {true}
               visible = {this.state.modalVisible}

    >

      <View style={{height:Screen.height,backgroundColor:'#f8f8f8'}} elevation={5}>


      <Toolbar
         leftElement={null}
         centerElement="Select Location"
         rightElement={['close']}
         onRightElementPress={()=>{
             this.oncloseModal();
         }}
         style={{
            container: {backgroundColor:color.ColorBack,elevation:0},
            leftElement:{color:'#000000'},
            rightElement:{color:color.btnBack},
            titleText:{
                        color:color.appTitle,
                        // fontFamily:'SourceSansPro-Regular',
                      },
         }}
      />

        <TouchableOpacity onPress={()=>this.onPress()}>
          <Text style={{color: '#72c02c', fontSize: 20, fontWeight:'bold'}}>
            Click me to push Google Place Picker!
          </Text>
        </TouchableOpacity>
        
        <View style={styles.location}>
          <Text style={{color: 'black', fontSize: 15}}>
            {JSON.stringify(this.state)}
          </Text>
        </View>
       
    </View>

    <TouchableOpacity style={styles.modalCloseContainer} onPress={()=>this.oncloseModal()}>
    </TouchableOpacity>

  </Modal>
  
     
   );
  }
}



const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const styles = StyleSheet.create({

modalCloseContainer:{
  width: Screen.width,
  height:Screen.height-240,
  backgroundColor:'rgba(0,0,0,0)',
},

});


module.exports=LatLongLocationPicker;
