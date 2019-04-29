import React, { Component } from 'react';
import { Text,WebView,View,TouchableOpacity,StatusBar } from 'react-native';
import { Toolbar,Icon,Button, } from 'react-native-material-ui';
var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
export default class WebViewPage extends Component {

constructor(props) {
    super(props);
    this.state={
    	url:'',
      type:''
    };
}

 


  componentWillMount(){

// alert('componentWillMount')
     const { navigation } = this.props;
      const url = navigation.getParam('url','');
       const type = navigation.getParam('type','');

      this.setState({url:url,type:type});
    
  }

renderToolbar(){
  // alert(this.props.bottomTab)
  
    return(

       <TouchableOpacity onPress={()=>{this.props.navigation.navigate("HomePage",{listtype:"profile"});}} style={{marginLeft:20,marginTop:20,flexDirection:'row',alignItems:'center'}}>
          <Icon name="arrow-back" color={'#000000'} size={22}/>
          <Text style={{marginLeft:20,textAlign:'center',fontSize:20,fontFamily:'Roboto-Medium',color:'#000',marginRight:10}}>{this.state.type=='guide'?'Guide':'About Us'}</Text>
        </TouchableOpacity>
    )
  
}

  render() {
    return (
    	  <View style={[CommonStyle.platformHeight]}>  
      
        <StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />

    			{this.renderToolbar()}

		      <WebView
		        source={{uri: this.state.url}}
		        style={{marginTop: 20}}
		      />
      </View>
    );
  }
}