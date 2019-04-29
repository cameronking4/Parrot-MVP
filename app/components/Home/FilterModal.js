//filtermodal opened from main home screen
 
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, 
  View,  
  Text,
  Dimensions,
  Modal,
  StyleSheet,
  ScrollView,
  InteractionManager,
  Picker,
  TextInput,
  TouchableOpacity,
  Platform 
   
}from 'react-native';

import {Toolbar,Icon} from 'react-native-material-ui';
import Permissions from 'react-native-permissions';

import { Dropdown } from 'react-native-material-dropdown';

var RegistrationStyle = require('../../style/RegistrationStyle');
var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postAction from '../../action/postAction';

var CommonUtility= require('../../reducer/lib/CommonUtility');
var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var Config = require('../../Config');


import Geocoder from 'react-native-geocoder';

var TagMultiPick = require('../../common/TagMultiPick'); 

class FilterModal extends React.Component {

constructor(props) {
  super(props);
  
  this.state = {

    filterData:null, 
    typeArray:[],
    posttype:'ALL',

    modalVisible : false,

    myLocation:false,        
    regaddress:'',
    regaddresses:[],

    tagMultiPickModalVisible:false,
    filterTags:[],//array of tags

    regkeywords:'',
    city:'',
  };
}


componentWillMount(){

  var typeArray=[{'value':'ALL'},{'value':'JOURNAL'},{'value':'STORY'}];
  this.setState({typeArray:typeArray});

  if(this.props.post.isFilter)
  {
      // alert('filtermodal'+JSON.stringify(this.props.post.content));
      this.setState({
          filterTags: this.props.post.content.tagsName,//this.props.post.content.tags,//array of tags
          city:this.props.post.content.city,
          regkeywords:this.props.post.content.q,
      });
      if(this.props.post.content.city != '')
      {
        this.setState({myLocation:true})
      }
  }

  Permissions.check('location').then(response => {
    console.log('location@@@@@@@@',response)
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if(response != 'denied'){
          this._geolocation();      
      }
      else{
              this.setState({city:'Las Vegas'});
      }

  })

}

_geolocation(){
  
  //Actions.Actions.Home({latitude:this.state.latitude,longitude:this.state.longitude,city:this.state.city});//if want static location
  var that=this;
  
  navigator.geolocation.getCurrentPosition(
      (position) => {
        
        //console.log("Position getCurrentPosition",position);
      
        if(position.coords.latitude!=null && position.coords.longitude!=null)
        {  

            this.getCityName(position.coords.latitude,position.coords.longitude)
            // this.setState({
            //   latitude: position.coords.latitude,
            //   longitude: position.coords.longitude,
            //   error: null,
            // });
           // console.log("check lat lon");
        }
      })

 }

 getCityName(latitude,longitude){

  // alert();
    var that=this;

    var city = {
      lat: latitude,
      lng: longitude
    };

      console.log('getCityName:res::');

    Geocoder.geocodePosition(city).then(res => {
    // res is an Array of geocoding object (see below)

      console.log('getCityName:res::',res[0]);
      // alert(res[0].locality)
      this.setState({city:res[0].locality});

      // this.setState({country:res[0].country,statename:res[0].adminArea,city:res[0].locality});

    })
    .catch(err => console.log(err))

}


oncloseModal(getState){

  var tmpTagIds=[];

  if(getState == 'isRefreshRequest'){

    if(this.state.filterTags.length != 0)
    {
      console.log('PostList:applyFilterData',this.state.filterData);
      var tmpTags=this.state.filterTags;
      // alert(JSON.stringify(tmpTags))
    // if(this.state.filterData.tags.length > 0){
        for(var i=0;i< tmpTags.length;i++) 
        { 
            tmpTagIds[i]= tmpTags[i]._id;  // to generate array of tags id
        }
    // } 
      // JSON.stringify(tmpTagIds);

    }
    else{
      tmpTagIds=null
    }

      var bunch={
            perPage:10,
            pageNo:0,
            isPagination:true,

            q:this.state.regkeywords,
            city:this.state.myLocation?this.state.city:'',
            status:'LIVE',

            posttype:this.state.posttype,

            tags:tmpTagIds==null ? null : JSON.stringify(tmpTagIds),
            tagsName:this.state.filterTags,


      };

      // alert(JSON.stringify(bunch))
      var path = Config.API_URL+'/post/listing';
      this.props.postAction.fetchFilterPostList(path,bunch,0,false,false);
      this.props.navigation.goBack();
  }
  else
    this.props.navigation.goBack();
}

updateGender(itemValue,itemIndex){
  this.setState({gender:itemValue});  
}

renderTagMultiPick(){

    console.log("renderTagMultiPick::");
    var filterTags =this.state.filterTags;
  
    // alert(JSON.stringify(filterTags)) 
    if(filterTags.length > 0)
    {


          return(

            <View>
              <Text numberOfLines={1} style={{fontSize:15,marginTop:15,justifyContent:'flex-end',color:color.placeholderTextColor}}>Tags</Text>   

              <TouchableOpacity onPress={()=>this.setState({tagMultiPickModalVisible:true})} style={{backgroundColor:'#ffffff',marginBottom:15,paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10}}>
                
                <View style={{flexWrap:'wrap',flexDirection: 'row',}}>
                  { filterTags.map((item, key)=>(
                    <View style={CommonStyle.capsuleView}>
                        
                        <Text style={CommonStyle.capsuleText} numberOfLines={1}>
                          {item.name}
                        </Text>

                    </View>
                  ))}
                  
                  </View>
                                
              </TouchableOpacity>

            </View>
          );
    }
    else{
       return(

            <View>
              <TouchableOpacity onPress={()=>this.gotoTagMultipick()} style={RegistrationStyle.formFieldView}>
                <Text numberOfLines={1} style={{fontSize:15,justifyContent:'flex-end',color:color.textInputColor}}>Click to add Tags</Text>
              </TouchableOpacity>
               
            </View>
      );
    }
}

gotoTagMultipick(){
     // alert('gotoTagMultipick::')
    this.setState({
      tagMultiPickModalVisible:true
  })
}

oncloseTagMultiPick(tagsArr){
  
  // alert(JSON.stringify(tagsArr))
  
    if(tagsArr == undefined || tagsArr.length == 0)
    {
      this.setState({
        tagMultiPickModalVisible : false,
        filterTags:[],
      });  
    }
  else {
    this.setState({
      tagMultiPickModalVisible : false,
      filterTags:tagsArr,
    }); 
  }

}

clearFilter(){

  console.log('clearFilter call');
  this.setState({
    filterData:null,

    regkeywords:'',
    myLocation:false,
    city:'',

    tagMultiPickModalVisible:false,
    filterTags:[],//array of tags

  });

}


render() {

  return (
    
    <View>
      <View style={{height:Screen.height,marginTop:Platform.OS == 'ios' ?20:0,backgroundColor:'#f8f8f8'}} elevation={5}>


      <Toolbar
         leftElement={'arrow-back'}
         centerElement="Filter"
         rightElement={
                <TouchableOpacity onPress={() =>{this.clearFilter()}} style={{marginRight:12,}}>
                    <Text style={{marginRight:12,fontWeight:'bold',color:color.toolTitleColor}}>CLEAR</Text>
                </TouchableOpacity>
         }
         onLeftElementPress={()=>{
          this.props.navigation.goBack();
             // this.props.onpopModal();
         }}
         style={
          {
            container: {backgroundColor:color.toolBackColor,elevation:0},
            leftElement:{color:color.toolTitleColor},
            rightElement:{color:color.toolTitleColor},
            titleText:{
              color:color.toolTitleColor,
              // fontFamily:'SFMedium',
            },
          }
        }
      />

      <ScrollView style={{padding:10,paddingBottom:50}}>

          {/*keywords*/}
          <TextInput 
                  placeholder={"Search title of journal or story post here"} 
                  placeholderTextColor={color.placeholderTextColor} 
                  underlineColorAndroid={'#fff'} 
                  onChangeText={(regkeywords) => this.setState({regkeywords:regkeywords})} 
                  value={this.state.regkeywords}
                  multiline={true}
                  textAlignVertical= 'top'   
                  style={{color:color.textInputColor,height:150,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#fff'}}  
                  // onSubmitEditing={() => {
                  //   this.focusNextField('regcity');
                  // }}
                  returnKeyType={ "next" }/>


          {/*render location*/}

          <View style={{marginTop:8,height:50}}>
              
              <View style={{marginTop:5,height:50,width:Dimensions.get('window').width-20,backgroundColor:'#fff',flexDirection:'row'}}>

                <TouchableOpacity onPress={()=>this.setState({myLocation:!this.state.myLocation})} style={[styles.locationbtn,{backgroundColor:this.state.myLocation?'#fff':color.btnBack}]}>
                  <Icon name="location-on" color={'#000'} size={29}/>
                  <Text style={{ color: 'black', }}>All over the world</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({myLocation:!this.state.myLocation})} style={[styles.locationbtn,{backgroundColor:this.state.myLocation?color.btnBack:'#fff'}]}>
                  <Icon name="location-on" color={'#000'} size={29}/>
                  <Text style={{ color: 'black',}}>My Location</Text>
                </TouchableOpacity>

              </View>

          </View>       

        {/*render Tags*/}

          <View style={{marginTop:8,}}>
              
              <View style={{marginTop:5,paddingBottom:10,paddingLeft:3,paddingRight:8,width:Dimensions.get('window').width-20,justifyContent:'space-between'}}>
             {/*     <Text style={{fontSize:15,fontFamily:'SFMedium',color:'#4a4a4a',marginBottom:10}}>Tags</Text>*/}
          
                {this.renderTagMultiPick()} 
                
                <TagMultiPick 
                  selectedArr={this.state.filterTags}
                  modalVisible={this.state.tagMultiPickModalVisible} 
                  oncloseModal={this.oncloseTagMultiPick.bind(this)}
                />                  

              </View>    

              <View style={{height:1,backgroundColor:'#d0d0d0',}}></View>
          </View>

        {/*render Type*/}

          <View style={{}}>
              
              <View style={{marginTop:5,paddingBottom:10,paddingLeft:3,width:Dimensions.get('window').width-20,justifyContent:'space-between'}}>
                
                <Dropdown
                  data={this.state.typeArray}
                  selectedItemColor={color.textInputColor}
                  baseColor={this.state.isErrorGender?'red':color.placeholderTextColor}
                  // itemTextStyle={{color:color.placeholderTextColor}}
                  textColor={color.textInputColor}
                  containerStyle={{}}
                  value="Select type"
                  onChangeText={(value)=>this.setState({posttype:value,})}
                />
              
              </View>    

              
          </View>

          <View style={{height:50}}></View>

      </ScrollView>  

    <TouchableOpacity onPress={()=>{this.oncloseModal("isRefreshRequest")}} style={[CommonStyle.submitBtn,{borderRadius:0,marginBottom:20,width:Dimensions.get('window').width}]}>
        <Text style={CommonStyle.submitBtnText}>Apply Filter</Text>
    </TouchableOpacity>

    </View>


    <TouchableOpacity style={styles.modalCloseContainer} onPress={()=>this.oncloseModal()}>
    </TouchableOpacity>

  </View>
  
     
   );
  }
}



const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const styles = StyleSheet.create({

locationbtn:{
  flexDirection:'row',
  alignItems:'center',
  width:(Dimensions.get('window').width/2)-10,
  justifyContent:'center',
},
modalCloseContainer:{
  width: Screen.width,
  height:Screen.height-240,
  backgroundColor:'rgba(0,0,0,0)',
},
datePickerView:{ 
  width:100,
  height:30,
  borderColor:color.underlineColorAndroid,
  borderWidth:1,
  justifyContent:'center',
  alignItems:'center'
},

});


// module.exports=FilterModal;


const mapStateToProps = state => {

  return {
    post : state.post,
  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(loginAction));
  return {
    postAction : bindActionCreators(
      postAction, dispatch,
    ),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterModal);

