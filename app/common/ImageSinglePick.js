
import React, { Component, PropTypes } from 'react';
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
  
} from 'react-native';

import { Toolbar,Button,Avatar } from 'react-native-material-ui';
 

var ImagePicker = require('react-native-image-picker');

var AuthUtility= require('../reducer/lib/AuthUtility');
var ApiUtility= require('../reducer/lib/ApiUtility');
var CommonUtility= require('../reducer/lib/CommonUtility');

var color = require('../style/color.js');
var CommonStyle = require('../style/common');

//const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});

  const picOptions = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };


var Config = require('../Config');

class ImageSinglePick extends Component {

constructor(props) {
    super(props);

    this.state = { 
      imagePic:'',
      saveImageUrl:'',
      imageKey:'',
    };
}

componentWillReceiveProps(nextProps){
      
      console.log('SingleImagePicker:nextProps.selectedImages:',nextProps.selectedImage);    
    
  
      // if(nextProps.selectedImage !== ''){

      //   this.setState({
      //     imagePic : nextProps.selectedImage
      //   });

      // }

      // this.setState({saveImageUrl:nextProps.imageUrl,imageKey:nextProps.imageKey});
}

componentDidMount(){

    if(this.props.selectedImage !== ''){
      
      this.setState({
        imagePic : this.props.selectedImage
      });

    }

    this.setState({saveImageUrl:this.props.imageUrl,imageKey:this.props.imageKey});

}

_onSubmitButton() {

    var that=this;

  }

renderLoginBtn(){
  if(this.state.disabled)
  {
    return(
      <TouchableOpacity style={[CommonStyle.submitBtn,]}>
      	<Text style={[CommonStyle.submitBtnText,{}]}>Done</Text>
      </TouchableOpacity>
    );
  }
  else{
    return(
       <TouchableOpacity onPress={this._onSubmitButton.bind(this)} style={CommonStyle.submitBtn}>
      	<Text style={CommonStyle.submitBtnText}>Done</Text>
      </TouchableOpacity>
    );
  }
}

imagePick(){
  var that=this;
    ImagePicker.showImagePicker(picOptions, (response) => {
      // console.log('Response = ', response);
      // console.log("data::",response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can also display the image using uri only:
        let source = { uri: response.uri }; 

       console.log("chk uri::",response.uri);
        // You can also display the image using data: or base64
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log('this.props.imageUrl::',this.props.imageUrl);
        this.setState({
          // avatarSource: source,
          imagePic:response.uri,
          // imagePic:'data:image/jpeg;base64,'+response.data, // use for base64 data
        });

        if(this.props.imageUrl != ''){
          var extension=CommonUtility.fileExtensionExtractor(response.uri);
          // console.log('that.state.imageKey:',that.state.imageKey);
          var path = Config.API_URL+this.props.imageUrl;
          ApiUtility.saveImage(path,that.state.imageKey,
            response.uri,function(response){
            
            if(response)
            {

                console.log("ImageSinglePick::response:",response);
                that.props.itemPicked(response.data.Newimgpath);    
            }    
            else{
              that.props.onProcessLoding(true);
            }      
          },function(error){
              that.props.onProcessLoding(true);
              // that.setState({
              //   isLoading: false
              // });
          });

        }
      }
    });
}


renderImageSinglePick(){

  if(this.state.imagePic == '' || this.state.imagePic == null)
  {
    return(

        <TouchableOpacity onPress={()=>{this.imagePick()}} style={{height:120,width:120,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
            <Avatar
                icon="person"
                size={90} 
                iconSize={60}
                iconColor="#ffffff"
            />
             <Text style={{color:"#000000",fontSize:15,marginTop:5,marginBottom:5}}>IMAGE</Text>
          </TouchableOpacity>
    );
  }
  else{
    return(
        <TouchableOpacity onPress={()=>{this.imagePick()}} style={{height:120,width:120,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
          <Avatar
              image={<Image
                        source={{uri:this.state.imagePic}} style={{height:90,width:90,borderRadius:45}} />
                      }
              size={90} 
          />
          <Text style={{color:"#000000",fontSize:15,marginTop:5,marginBottom:5}}>IMAGE</Text>
        </TouchableOpacity>
    );
  }

}
  

  render() {

	  return (

	  	<View>
          {/*image picker*/}

          <View style={{width:Screen.width,alignSelf:'center'}}>
            {this.renderImageSinglePick()}
          </View>

	    </View>
	  );
	}
  
}

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const styles = StyleSheet.create({

  
});

module.exports = ImageSinglePick;
