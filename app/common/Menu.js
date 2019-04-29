//modal to select multiple tags...
// SHARED FILE 

import React, { Component } from 'react';
import {
  Platform, 
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Picker,
  ListView,
  FlatList,
  Modal 
} from 'react-native';

import { Toolbar,Button,Icon,Checkbox,Avatar } from 'react-native-material-ui';
 

import PropTypes from 'prop-types';
import _ from 'lodash';

var AuthUtility= require('../reducer/lib/AuthUtility');
var ApiUtility= require('../reducer/lib/ApiUtility');
var CommonUtility= require('../reducer/lib/CommonUtility');
var Config = require('../Config');

var color = require('../style/color.js');
var CommonStyle = require('../style/common');
var ListStyle = require('../style/ListStyle.js');

var Spinner = require('../Spinner');

const propTypes = {
  
};

const defaultProps = {

};
 
 
class Menu extends Component {

constructor(props) {    

    super(props);

    this.state = { 

      //MessageModal 
        isLoading:true,
        categoryArray:[],
        categoryCheckedArray:[],
        modalVisible:false,
        searchText:'',
        custTag:'',
        type:'',

    };

}


componentWillReceiveProps(nextProps){
    
    // alert(this.state.modalVisible)
    if(nextProps.modalVisible != this.state.modalVisible)
    {
      this.setState({
        modalVisible : nextProps.modalVisible,
        // type:nextProps.type
      });
        
    }
  }
 
oncloseModal(){
    
    this.setState({modalVisible : false,});
    this.props.oncloseModal();
}


componentDidMount(){
 // console.log("*************tagsMulipick:fetchData:");
 
}


gotoDelete(){
  
  // if(this.state.modalVisible){
    this.props.delete()
    // alert(JSON.stringify(this.props.selectedItem))
  // }
      
}


gotoReport(){
  this.props.report()
}
  render() {

    return (

     <Modal animationType = {"slide"} transparent = {true}
               visible = {this.state.modalVisible}
               onRequestClose = {() =>{this.setState({modalVisible:false});this.props.oncloseModal();}}
      >

        <View style={{height: Platform.OS=='ios'? Screen.height : Screen.height-25,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}} elevation={5}>

              <View style={{height:240,width: Screen.width-20,paddingLeft:20,paddingRight:20,margin:50,paddingBottom:20,backgroundColor:'#fff',borderRadius:5,alignItems:"center",justifyContent:"center"}}>
               
               <TouchableOpacity onPress={()=>{this.gotoReport()}} style={[CommonStyle.submitBtnText,{width:Dimensions.get('window').width-70,marginLeft:10,justifyContent:'center',alignItems:'center',marginTop:15,height:40,borderRadius:3,borderWidth:1,borderColor:color.iconColor,backgroundColor:'#fff'}]}>
                 <Text style={{color:color.iconColor,fontFamily:'Roboto-Medium'}}>{"Report"}</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>{this.gotoDelete()}} style={[CommonStyle.submitBtnText,{width:Dimensions.get('window').width-70,marginLeft:10,justifyContent:'center',alignItems:'center',marginTop:15,height:40,borderRadius:3,borderWidth:1,borderColor:color.iconColor,backgroundColor:'#fff'}]}>
                <Text style={{color:color.iconColor,fontFamily:'Roboto-Medium'}}>{"Delete Comment"}</Text></TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{this.props.oncloseModal();}} style={[CommonStyle.submitBtnText,{width:Dimensions.get('window').width-70,marginLeft:10,justifyContent:'center',alignItems:'center',marginTop:15,height:40,borderRadius:3,borderWidth:1,borderColor:color.iconColor,backgroundColor:'#fff'}]}>
            <Text style={{color:color.iconColor,fontFamily:'Roboto-Medium'}}>{"Cancel"}</Text></TouchableOpacity>
              </View>
     
              
        </View>


    </Modal>

    );
  }
  
}

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const styles = StyleSheet.create({

tabBtn:{
  // backgroundColor:'yellow',
  borderWidth:1,
  borderColor:'grey',
  marginLeft:20,
  marginRight:20,
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center'
}

  
});

module.exports = Menu;
