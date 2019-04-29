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
  TextInput
}from 'react-native';
import {Toolbar,} from 'react-native-material-ui';

import ValidationComponent from 'react-native-form-validator';

import { Picker, DatePicker } from 'react-native-wheel-datepicker';
import moment from 'moment';
var color = require('../style/color.js');
var CommonStyle = require('../style/common');

import AuthUtility from '../reducer/lib/AuthUtility';
import ApiUtility from '../reducer/lib/ApiUtility';
import CommonUtility from '../reducer/lib/CommonUtility';


import Rules from '../common/validations/rules';
import Messages from '../common/validations/messages';

class DatePickerModal extends ValidationComponent {

constructor(props) {
  super(props);
  
  this.state = {

    modalVisible : false,
    thirdDate: moment().add(0, 'years').toDate(),

  };
}

componentWillReceiveProps(nextProps){
    
    if(nextProps.modalVisible != this.state.modalVisible)
    {
      this.setState({
        modalVisible : nextProps.modalVisible,
      });

    }
}

 
saveDate(){
  // this.onAddressSave();
    this.props.oncloseModal(this.state.birthdate);
}

render() {

  return (
    
    <Modal animationType = {"slide"} transparent = {true}
               visible = {this.state.modalVisible}

    >
    <View style={{backgroundColor:'rgba(255,255,255,0.3)'}}>

      <View style={{height:290,marginTop:100,backgroundColor:'#f8f8f8',width:300,alignSelf:'center',justifyContent:'center',alignItems:'center'}} elevation={5}>

        <View style={{marginTop:5,marginBottom:5}}>
        <Text style={{}}>Pick your birth date*</Text>
        </View>

        <View style={{width:300}}>
          <DatePicker
            date={this.state.thirdDate}
            mode="date"
            maximumDate={moment().add(0, 'years').toDate()}
            minimumDate={moment().add(-70, 'years').toDate()}
            onDateChange={(date)=>this.setState({birthdate:moment(date).format('DD MMM, YYYY')})}
            // labelUnit={{ year: 'Y', month: 'M', date: 'D' }}

          />
          <TouchableOpacity  onPress={()=>this.saveDate()} style={{height:40,width:300,backgroundColor:'#f8f8f8',justifyContent:'center',alignItems:'center',}}>
              <Text style={{fontSize:18,alignSelf:'center',fontWeight:'bold',textAlign:'center'}}>Done</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>

    <TouchableOpacity style={styles.modalCloseContainer} onPress={()=>this.saveDate()}>
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
  width: Dimensions.get('window').width,
  height:Screen.height,
  // backgroundColor:'red'
  backgroundColor:'rgba(255,255,255,0.3)',
},

});


module.exports=DatePickerModal;
