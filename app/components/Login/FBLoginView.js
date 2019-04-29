import React, { Component } from 'react';
import { StyleSheet, Text, View,Dimensions ,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

var color = require('../../style/color.js');
import { Toolbar} from 'react-native-material-ui';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.shape({})
	};

  constructor(props) {
      super(props);
    }

    render(){
        return (
          <View style={{backgroundColor:color.fbcolor,borderRadius:7}}>
            <TouchableOpacity onPress={() => {
                
                this.context.login()
                // if(!this.context.isLoggedIn){

                //   this.context.login()
                // }else{
                //   this.context.logout()
                // }

              }} style={styles.loginBtn}>
              <Icon name="facebook-square" style={{color:"#ffffff",}} size={25}/>
              <Text style={{color:'#ffffff',marginLeft:8,fontFamily:'Roboto-Medium',marginRight:3,fontSize:18}}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>
      )
    }
}

const styles = StyleSheet.create({
loginBtn:{
  width:Dimensions.get('window').width-70,
  height:50,
  padding:5,
  marginLeft:10,
  marginRight:10,
  // marginBottom:15,
  borderColor:color.fbcolor,
  borderWidth:1,
  borderRadius:5,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  backgroundColor:color.fbcolor,
},

});

module.exports = FBLoginView;