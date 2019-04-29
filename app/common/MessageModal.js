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
 
 
class MessageModal extends Component {

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
        type:nextProps.type
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

renderMessage(){

  if(this.state.type == 'JOURNAL'){
    return(

        <View>

            <Text style={{fontFamily:'Roboto-Bold',marginBottom:10,fontSize:20,color:'#000'}}>Ever just want someone to listen?</Text>
            <Text style={{fontFamily:'Roboto-Regular',fontSize:15}}>Well here’s your chance.</Text>
            <Text style={{fontFamily:'Roboto-Regular',fontSize:15}}>Once you post your journal entry, you’ll be venting to a community of people who have your back.</Text>
            <Text style={{fontFamily:'Roboto-Regular',fontSize:15}}>Even though it’s all anonymous, maybe you will change someone’s life, or who knows, maybe they’ll change yours.</Text>


        </View>
    )
  }
  else if(this.state.type == 'STORY'){
    return(

        <View>

            <Text style={{fontFamily:'Roboto-Bold',marginBottom:10,fontSize:20,color:'#000'}}>Share you story</Text>
                  
            <Text style={{fontFamily:'Roboto-Regular',fontSize:15}}>This is a place where you can share your story with everyone in the community.</Text>
            <Text style={{fontFamily:'Roboto-Regular',fontSize:15}}>It’s a place where you can motivate, inspire, and share with the pack how you got through a tough time and what kept you going. Don’t worry it’s all anonymous.</Text>

            
        </View>
    )
  
  }
  else{
    return;
  }

}

  render() {

    return (

     <Modal animationType = {"slide"} transparent = {true}
               visible = {this.state.modalVisible}
               onRequestClose = {() =>{this.setState({modalVisible:false});this.props.oncloseModal();}}
      >

        <View style={{height: Platform.OS=='ios'? Screen.height : Screen.height-25,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}} elevation={5}>

              <View style={{height:260,paddingLeft:20,paddingTop:30,paddingRight:20,margin:50,paddingBottom:20,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                {this.renderMessage()}

                <TouchableOpacity onPress={()=>{this.oncloseModal()}} style={[CommonStyle.submitBtn,{marginTop:15,marginBottom:10,width:Dimensions.get('window').width/3,height:28,justifyContent:'center',alignItems:'center'}]}>
                    <Text style={CommonStyle.submitBtnText}>OK</Text>
                </TouchableOpacity>   

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

module.exports = MessageModal;
