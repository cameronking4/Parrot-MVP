
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
  // WebView,
} from 'react-native';

import { Toolbar,Icon,Button, } from 'react-native-material-ui';
import IconFA from 'react-native-vector-icons/dist/FontAwesome';


import AuthUtility from '../../reducer/lib/AuthUtility';

var Config = require('../../Config');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');


import ChangePassword from './ChangePassword';

export default class SettingsPage extends Component {

constructor(props) {
    super(props);
    this.state={



      name:'',
      image:'',
      _id:'',

      changePasswordModalVisible:false,
    };
}

componentWillMount(){

// alert(this.props.login.loginData.user.name);

    
    // this.setState({
    //   _id:this.props.login.loginData.user._id,
    //   name:this.props.login.loginData.user.name,
    //   image:this.props.login.loginData.user.image,
    // });

}

componentWillReceiveProps(nextProps){

// alert(nextProps.login.loginData.user.name);
  // if(typeof nextProps.login != undefined)

  // {

  //   if(nextProps.login.loginData != null){
  //   // alert(nextProps.login.loginData.user.image);
  //     this.setState({
  //       _id:nextProps.login.loginData.user._id,
  //       name:nextProps.login.loginData.user.name,
  //       image:nextProps.login.loginData.user.image,
  //     });
  //   }
  // }

}


gotoWebView(url,type){
    this.props.navigation.navigate('WebViewPage',{'url':url,'type':type});
}

gotoBankDetail(){
    // this.props.navigation.navigate('BankDetailPage',{mode:'edit'});
}

renderToolbar(){
  // alert(this.props.bottomTab)
  
    return(

       <TouchableOpacity onPress={()=>{this.props.navigation.goBack(null)}} style={{marginTop:40,flexDirection:'row',alignItems:'center',marginTop:20,paddingLeft:20}}>
          <Icon name="arrow-back" color={'#000000'} size={22}/>
          <Text style={{marginLeft:20,textAlign:'center',fontSize:20,fontFamily:'Roboto-Medium',color:'#000',marginRight:10}}>CRUSH'd</Text>
        </TouchableOpacity>
    )
  
}



  render(){
  {/**  put in image ....this.state.image**/}
    return(

            <View style={[CommonStyle.platformHeight]}>  
      
              <StatusBar
                  backgroundColor={color.statusbar}
                  barStyle="dark-content"
                  hidden={false}
              />

              {this.renderToolbar()}
{/*
              <View style={{paddingLeft:20,height:120,justifyContent:'center'}}>
                      <Text style={{fontSize:28,fontWeight:'500',marginBottom:10,color:'#000000',fontFamily:'Roboto-Bold'}}>VentPack</Text>
              </View>                    
*/}
                <View style={[CommonStyle.hLine,{marginTop:20,width:Dimensions.get('window').width-40,marginLeft:20,marginRight:20,marginBottom:20,}]}></View>

              {/*change pwd*/}

                  <TouchableOpacity onPress={()=>this.props.navigation.navigate("ChangePassword")} style={{flexDirection:'row',height:40,width:Dimensions.get('window').width,justifyContent:'space-between',paddingLeft:20,paddingRight:20,marginBottom:10,marginTop:10}}>
                     
                      <View style={{}}>
                          <Text style={{fontSize:16,fontFamily:'Roboto-Medium'}}>Change Password</Text>
                      </View>

                      <View style={{}}>
                          <IconFA name="expeditedssl" color={'#000000'}  size={26}/>  
                      </View>

                  </TouchableOpacity>


                {/**guide
                 <View style={[CommonStyle.hLine,{width:Dimensions.get('window').width-40,marginLeft:20,marginRight:20,marginBottom:20,}]}></View>


                  <TouchableOpacity style={{flexDirection:'row',height:40,width:Dimensions.get('window').width,justifyContent:'space-between',paddingLeft:20,paddingRight:20,marginBottom:10,marginTop:10}} onPress={()=>{this.gotoWebView('https://www.ventpack.com/mobile-guide','guide')}}>

                  
                      <View style={{}}>
                          <Text style={{fontSize:16,fontFamily:'Roboto-Medium'}}>Guide</Text>
                      </View>

                      <View style={{}}>
                          <IconFA name="hand-o-right" color={'#000000'}  size={26}/>  
                      </View>


                  </TouchableOpacity>
                  

              <View style={[CommonStyle.hLine,{width:Dimensions.get('window').width-40,marginLeft:20,marginRight:20,marginBottom:20,}]}></View>


              <TouchableOpacity style={{flexDirection:'row',height:40,width:Dimensions.get('window').width,justifyContent:'space-between',paddingLeft:20,paddingRight:20,marginBottom:10,marginTop:10}} onPress={()=>{this.gotoWebView('https://www.ventpack.com/mobile-about-us','about')}}>

                 
                  <View style={{}}>
                      <Text style={{fontSize:16,fontFamily:'Roboto-Medium'}}>About Us</Text>
                  </View>

                  <View style={{}}>
                      <IconFA name="info-circle" color={'#000000'}  size={26}/>  
                  </View>


              </TouchableOpacity>

              **/}
            </View>
      );
  }
}

const styles = StyleSheet.create({
  
actionButtonView:{
  // position:'absolute',
  // bottom:50,
  // right:30,
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'flex-end',
  height:50,
  width:50,
  borderRadius:25,
  elevation:5
},
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
},

});

