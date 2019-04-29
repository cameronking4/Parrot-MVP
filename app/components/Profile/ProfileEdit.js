
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
  KeyboardAvoidingView,
  ScrollView,BackHandler
} from 'react-native';
import { Toolbar,Button,Icon } from 'react-native-material-ui';
import AuthUtility from '../../reducer/lib/AuthUtility';
import ApiUtility from '../../reducer/lib/ApiUtility';
import CommonUtility from '../../reducer/lib/CommonUtility';
// import { Spinner } from 'native-base';
var ImagePicker = require('react-native-image-picker');

var Config = require('../../Config');
var Spinner =require('../../Spinner');
var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');
import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';
import ValidationComponent from 'react-native-form-validator';

var picOptions = {
  title: 'Select Avatar',
  // customButtons: [
  //   {name: 'fb', title: 'Choose Photo from Facebook'},
  // ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class ProfileEdit extends ValidationComponent {

constructor(props) {
    super(props);
    this.state={

      username:'',
      profilePic:'',
      _id:'',
      updtName:'',
      isLoading:false,
      bio:'',
      firstName:'',
      lastName:'',
       checkEmail : [],
      checkPassword:[],
      checkFirstName:[],
      checkLastName:[],
      checkBio:[],
    };
}

componentWillMount(){

  const { navigation } = this.props;
  const _id = navigation.getParam('_id', '');   
  const username = navigation.getParam('name', '');   
  const profilePic =navigation.getParam('profilePic','');
  const bio=navigation.getParam('bio','');
  const firstName=navigation.getParam('firstName','');;
  const lastName=navigation.getParam('lastName','');;
  console.log("thhi",lastName)
  this.setState({username:username,profilePic:profilePic,_id:_id,bio:bio,firstName:firstName,lastName:lastName});

}

imagePick(){
  var that=this;
    ImagePicker.showImagePicker(picOptions, (response) => {
      console.log('Response = ', response);
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
        let source = { uri: response.uri }; 
       // console.log("chk uri::",response.uri);
       // alert(JSON.stringify(response.uri));
        this.setState({
          // avatarSource: source,
          // profilePic:response.uri,
          isLoading:true,
        });


      var extension=CommonUtility.fileExtensionExtractor(response.uri);
          console.log('that.state.:',response.data);
          var path = Config.API_URL+'/user/save-image';       
          var that = this;

          ApiUtility.saveImage(path,'file',
            response.uri,function(response){
          
                if(response)
                {
                  that.setState({profilePic:response.data.Newimgpath,isLoading:false});
                }          
          },function(error){
              alert('Error in image selection');
          });


      }
    });
}

_onSubmitButton() {

    var that=this;
    var isMyFormValidate =this.validate({
      firstName: {required: true,},
      lastName:{required: true,},
      bio:{required:true},

    });

    this.setState({
      checkFirstName:this.getErrorsInField('firstName'),
      checkLastName:this.getErrorsInField('lastName'),
      checkBio:this.getErrorsInField('bio'),
    
    });

     if(isMyFormValidate){
    var pathUpdt = Config.API_URL+'/user/update';

     var bundle={
        _id:that.state._id,
        username:that.state.username,
        image:that.state.profilePic,
        bio:that.state.bio,
        lastName:that.state.lastName,
        firstName:that.state.firstName,
        devicetype:'mobile',
        reqSource:'mobile'
      };

      // console.log("ProfileEdit::response:",);
      if(!this.state.isLoading){
      that.props.loginAction.updateLoginData(pathUpdt,bundle,this.props.navigation,'update');              
      // this.props.navigation.navigate("ProfilePage");
      alert('Profile successfully updated');
    }
  }else{
    return;
  }

} 
renderImage(){
  if(this.state.isLoading){
    return(
        <View  style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width,padding:20,}}>
          <View style={{width:100,height:100,backgroundColor:'#f8f8f8',borderRadius:50,}}>
            <Spinner/>
          </View>
        </View>
      ) ;
}
  return(
      <TouchableOpacity onPress={()=>{this.imagePick()}} style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width,padding:20,}}>

          <View style={{width:100,height:100,backgroundColor:'#f8f8f8',borderRadius:50,}}>
              <Image  
                  resizeMethod="resize"                                
                  source={{uri:this.state.profilePic}}  
                  style={{height:100,width:100,borderRadius:50}}
                  resizeMode='cover'
              />
          </View>

      </TouchableOpacity>
    );
}

  render(){
      // alert(this.state.profilePic);
     
    return(

          <View>

            <KeyboardAvoidingView behavior = {Platform.OS=="ios"?"padding":'padding'}  enabled> 
                <ScrollView style={{}}>

                  <View style={{height:(Dimensions.get('window').height)-80,}}>
                    {this.renderImage()}
                    
                    {/**<View style={{alignItems:'center',marginBottom:10}}>
                          <Text style={{fontSize:28,fontWeight:'500',marginBottom:10,fontFamily:'Roboto-Light'}}>{this.state.username}</Text>
                    </View>

                    <View style={[CommonStyle.hLine,{width:Dimensions.get('window').width-40,marginLeft:20,marginRight:20,marginBottom:20,}]}></View>
                       **/}
                    <View style={{marginTop:10}}>            
                    
                          <TextInput
                              editable={false}
                              ref={ref => this.textInputRef = ref}
                              placeholder="Username"
                              defaultValue={this.state.username}
                              placeholderTextColor='grey'
                              underlineColorAndroid="transparent"
                              style={styles.textInput}

                          />

                          </View>
                          <View style={{marginTop:15}}> 
                           <TextInput
                              
                             ref="firstName" 
                              onChangeText={(firstName) => this.setState({firstName:firstName})}
                              placeholder="First Name"
                              defaultValue={this.state.firstName}
                              placeholderTextColor='grey'
                              underlineColorAndroid="transparent"
                              style={[styles.textInput]}

                          />
                          { this.state.checkFirstName ? <Text style={{color:'red',marginLeft:15}}>{this.state.checkFirstName[0]}</Text> : null}                    
                          </View>  
                          
                          <View style={{marginTop:0,}}> 
                           <TextInput
                             
                             ref="lastName" 
                              onChangeText={(lastName) => this.setState({lastName:lastName})}
                              placeholder="Last Name"
                              defaultValue={this.state.lastName}
                              placeholderTextColor='grey'
                              underlineColorAndroid="transparent"
                              style={[styles.textInput]}

                          />
                          { this.state.checkLastName ? <Text style={{color:'red',marginLeft:15}}>{this.state.checkLastName[0]}</Text> : null}                    
                          
                          </View>  
                          
                           <View style={{}}> 
                           <TextInput
                              multiline={true}
                           ref="bio" 
                              onChangeText={(bio) => this.setState({bio:bio})}
                              placeholder="Bio"
                              defaultValue={this.state.bio}
                              placeholderTextColor='grey'
                              underlineColorAndroid="transparent"
                              style={[styles.textInput,{alignItems:"center",justifyContent:'flex-start',height:120,marginTop:8,}]}

                          />
                          { this.state.checkBio ? <Text style={{color:'red',marginLeft:15}}>{this.state.checkBio[0]}</Text> : null}                    
                          </View>                              
              
                  </View>
                  

                  <View style={{justifyContent:"flex-end",marginRight:25}}>
                    <TouchableOpacity onPress={this._onSubmitButton.bind(this)} style={[CommonStyle.actionButtonView,{backgroundColor:color.btnBack,}]}>

                      <Icon name="check" color={'#ffffff'}  size={22}/>
                    </TouchableOpacity>

                  </View>

                </ScrollView>
              </KeyboardAvoidingView> 
            </View>
      );
  }
}
 ProfileEdit.defaultProps = {
  messages : Messages,
  rules:Rules
};
const styles = StyleSheet.create({
  
textInput: {
  marginTop:8,
  height: 40, 
  width:Dimensions.get('window').width-20,
  borderColor: 'rgba(0.2, 0.2,0.2, 0.2)', 
  borderWidth: 1,
  alignSelf:'center',
  // alignItems:'flex-start',
  justifyContent:'center',
  fontSize: 20,
  color: '#000000',
  paddingLeft:10,
  paddingRight:2,
  paddingBottom:2,
  paddingTop:2,
//textAlign:'center',
//fontFamily:'AirbnbCerealApp-Light',
},

});

