// modal to select multi users

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  AppRegistry, 
  View,  
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  InteractionManager,
  TouchableOpacity,
  ToastAndroid
}from 'react-native';

import {Toolbar,Checkbox,Avatar,Icon} from 'react-native-material-ui';

import _ from 'lodash';
import IconFA from 'react-native-vector-icons/dist/Ionicons';
 import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
 import Modal from "react-native-modal";

var CommonUtility= require('../reducer/lib/CommonUtility');

var AuthUtility= require('../reducer/lib/AuthUtility');
var ApiUtility= require('../reducer/lib/ApiUtility');
var Config = require('../Config');
var CommonStyle = require('../style/common');
var color = require('../style/color.js');
var ListStyle = require('../style/ListStyle.js');
var Spinner = require('../Spinner');

class ProfessionsMultiPick extends React.Component {

constructor(props) {
  super(props);
  
  this.state = {

    modalVisible : false,
    categoryArray:[],
    categoryCheckedArray:[],
    searchText:'',
    isLoading:true,
  };
}

componentWillMount(){

  // alert(JSON.stringify(this.props.selectedArr));
  var that =this;
  AuthUtility.getToken(function(token){
      ApiUtility.setToken(token);
  
      that.setState({
        modalVisible : that.props.modalVisible,
        categoryCheckedArray : that.props.selectedArr
      },that.refreshCheckArrFromCheckArray(that.props.selectedArr));

       // console.log("Home: getToken: ",token); 
  });
}

componentWillReceiveProps(nextProps){
    

    // if(nextProps.modalVisible != this.state.modalVisible)
    // {
      // alert("$$"+JSON.stringify(nextProps.selectedArr));
      console.log('nextProps.modalVisible::',nextProps.selectedArr)
      this.setState({
        modalVisible : nextProps.modalVisible,
        categoryCheckedArray : nextProps.selectedArr
      },this.refreshCheckArrFromCheckArray(nextProps.selectedArr));

    // }
 
    var that=this;
    
    AuthUtility.getToken(function(token){
      ApiUtility.setToken(token);
      // alert(token)
   
      if(nextProps.modalVisible==true){
        
      that.setState({
        categoryCheckedArray : nextProps.selectedArr
      },that.refreshCheckArrFromCheckArray(nextProps.selectedArr));

      }   // console.log("Home: getToken: ",token);
  
  });
    
  }
 
oncloseModal(arrowBack){
    this.setState({modalVisible : false,},()=>{this.props.oncloseModal(this.state.categoryCheckedArray,arrowBack);});
   // alert(arrowBack)
 
}


componentDidMount(){
  // alert()
  if(this.props.fetchContactsList){
    this.fetchData('');  
  }
  
  // this.dataProcess(this.props.selectedArr);
  // alert("@@@"+JSON.stringify(this.props.selectedArr))
}

fetchData(text){

  var that =this;

  // alert(this.props.userid);
   var path=Config.API_URL+'/contact/listing';
           
              var bundle = {
                            "user":this.props.userid,
                          };
         ApiUtility.fetchPost(path,bundle,function(response){
                
          if(response)
          {
              that.dataProcess(response.data.data);
              // that.refreshCheckArr(that.state.categoryArray);
          }   
          that.setState({
              isLoading: false
          }); 
                    
                  },function(error){
                    
                   ToastAndroid.show('Connection not available...Retry!', ToastAndroid.LONG);
            
                    that.setState({
                      isLoading: false,
                    });
            
                  });


}

dataProcess(categoryArray){
  var categoryCheckedArray =categoryArray;
  for(var i=0;i<categoryArray.length;i++){
    // categoryArray[i]['isChecked'] = CommonUtility.getToggleCompareObjArr(categoryArray[i],'_id',this.state.categoryCheckedArray,'_id');
    categoryArray[i]['isChecked'] =true;
    categoryCheckedArray[i]['isChecked'] =true;
  }

  // alert("categoryArray:"+JSON.stringify(categoryArray)
  this.refreshCheckArr(categoryArray);

  this.setState({
   categoryArray : categoryArray,
  });

  // alert(JSON.stringify(categoryArray))
}

onCheckToggle(item){
  
  var categoryArray =  this.state.categoryArray;

  categoryArray[item.index]['isChecked'] = !categoryArray[item.index]['isChecked'];
  this.refreshCheckArrOnToggle(categoryArray);
  // this.refreshCheckArr(categoryArray);

  this.setState({
    categoryArray : categoryArray 
  });
}
refreshCheckArrOnToggle(categoryArray){
  var categoryCheckedArray = this.state.categoryCheckedArray;
  for(var i=0;i<categoryArray.length;i++){
     
    var k= CommonUtility.getIndexOfCompareVal(categoryCheckedArray,"_id",categoryArray[i]['_id']);

    if(categoryArray[i]['isChecked']==true && k==-1){
      categoryCheckedArray.push(categoryArray[i]);
    }
    else if(categoryArray[i]['isChecked']==false && k>-1){
      categoryCheckedArray.splice(k,1);
    }

  }

  this.setState({
    categoryCheckedArray:categoryCheckedArray,
  });

  // this.props.itemPicked(categoryCheckedArray);
}

refreshCheckArr(categoryArray){
  var categoryCheckedArray = [];
  for(var i=0;i<categoryArray.length;i++){
    
    if(categoryArray[i]['isChecked']==true){
      categoryCheckedArray.push(categoryArray[i]);
    }
  }

  this.setState({
    categoryCheckedArray:categoryCheckedArray,
  });

  // this.props.oncloseModal(categoryCheckedArray);
}

refreshCheckArrFromCheckArray(categoryCheckedArray){
  

  var categoryArray = _.clone(this.state.categoryArray);
  for(var i=0;i<categoryCheckedArray.length;i++){
    
    var k= CommonUtility.getIndexOfCompareVal(categoryArray,"_id",categoryCheckedArray[i]['_id']);

    if(k>-1){

      categoryArray[k]['isChecked'] = true;
    }
  }

  // alert("@@@@@@@@"+JSON.stringify(categoryCheckedArray)+"###"+JSON.stringify(categoryArray));
  this.setState({
    categoryArray:categoryArray,
  });

// alert("@@@@@@@@"+JSON.stringify(categoryArray));
  // this.props.oncloseModal(categoryCheckedArray);
}


SearchFilterFunction(text){
    console.log("Search",text);
    this.setState({searchText:text});
    this.fetchData(text);

}

renderImageAvatar(item){

  // console.log('ProfessionsMultiPick:renderImageAvatar:',item);

  if(item.item.image == ''){

    return(

        <Avatar
            icon="person" 
            size={60} 
            iconSize={40}
            iconColor="#ffffff"
        />
        
    );

  }
  else{

    return(

      <Image
            source={{uri:item.item.image}}
            resizeMode="cover" 
            style={{height:60,width:60,borderRadius:30}}
            repeat={false}
      />

    );

  }

}

_renderItem(item){
  console.log("TagMultiPick:item::",item);
    
    // alert("ji")
  return(
    <TouchableOpacity onPress={this.onCheckToggle.bind(this,item)} style={{height:80,borderWidth:1,borderColor:'#ffffff',justifyContent:'flex-start',flexDirection:'row',alignItems:'center',backgroundColor:'#ffffff',padding:8,marginBottom:10,}}>
      
     <View style={{height:60,width:60,borderRadius:30,marginRight:10,backgroundColor:color.mainbackground,justifyContent:'flex-start',alignItems:'center',alignSelf:'center'}} >
       
        {this.renderImageAvatar(item)}

      </View>

      <View style={{marginRight:10,alignItems:'flex-start',width:Screen.width-60-30-30,paddingLeft:3}}>
        <Text numberOfLines={1} style={{fontSize:15}}>{item.item.username}</Text>
       {/* <Text numberOfLines={1} style={{fontSize:15}}>{item.item.qualifications}</Text>*/}
      </View>

      <View style={{paddingRight:10,alignItems:'flex-end',width:40,}}>

     <Checkbox label={item.item.name} value={item.item.name} checked={item.item.isChecked} onCheck={this.onCheckToggle.bind(this,item)} />
      {/* old pattern which doesnt work in ios<CheckBox value={item.item.isChecked}  onValueChange={this.onCheckToggle.bind(this,item)}  />*/}  
      </View>

    </TouchableOpacity>
    );                
}

spinner(){
    //console.log("spinner calontol");
    if(this.state.isLoading)
    { 
      return(<Spinner />);
    }
}


removeCategory(item){
    
  console.log("ProfessionsMultiPick:removeCategory:",item);

  var categoryCheckedArray =  this.state.categoryCheckedArray;
  var categoryArray =  this.state.categoryArray;

  // for(var i=0;i<categoryCheckedArray.length;i++)
  // {
  //   if(categoryCheckedArray[i]._id == item._id)
  //   {
  //     categoryCheckedArray.splice(i,1);
  //     categoryArray[i]['isChecked']=false;
  //   }
  // }

  var i =CommonUtility.getIndexOfCompareObjArr(item,"_id",categoryCheckedArray,"_id");

  if(i>-1){
    categoryCheckedArray.splice(i,1);
  }

  var j =CommonUtility.getIndexOfCompareObjArr(item,"_id",categoryArray,"_id");
  if(j>-1){
      categoryArray[j]['isChecked']=false;
  }

  this.setState({
    categoryCheckedArray : categoryCheckedArray,
    categoryArray:categoryArray 
  });

  // console.log('categoryCheckedArray,categoryArray',categoryCheckedArray,categoryArray);

}
  

_renderHeader(){

  var categoryCheckedArray = this.state.categoryCheckedArray;
  if(categoryCheckedArray.length > 0){
    return(

        <View style={{backgroundColor:'#ffffff',marginBottom:15,paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10}}>
        
            <ScrollView horizontal={true} style={{width:Screen.width-30}}>
            
            { categoryCheckedArray.map((item, key)=>(
              <View key={key} style={CommonStyle.capsuleView}>
                  
                  <Text key={key} style={CommonStyle.capsuleText} numberOfLines={1}>
                    {item.username}
                  </Text>

                  <TouchableOpacity key={key} onPress={this.removeCategory.bind(this,item)}>
                    <Icon key={key} name="close" size={14} color={color.appTitle} style={{alignItems:'flex-end',marginRight:3,marginLeft:8,}} />
                  </TouchableOpacity>

              </View>
            ))}
            
            </ScrollView>
        
        </View>

    );
  }
  else{
    return(
      <View style={{backgroundColor:'#ffffff',marginBottom:15,paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:10}}>
          <Text>Select your interest</Text>
      </View>
    );
  }
}

renderSubmitbtn(){

  console.log();
  if(this.state.categoryCheckedArray.length > 0)
  {
    return(

        <TouchableOpacity onPress={()=>{this.oncloseModal();}} style={[CommonStyle.submitBtn,{width:Dimensions.get('window').width,borderRadius:0}]}>
          <Text style={CommonStyle.submitBtnText}>Select</Text>
        </TouchableOpacity>        

    );
  }

}

renderList(){

  if(this.state.isLoading){
      return this.spinner();
  }


  else if(this.state.categoryArray.length ==0){
     console.log("not Found");
     return(
        
        <View style={{justifyContent: 'center',backgroundColor:'#f8f8f8',flex:2}} >

          <View style={{height:265,justifyContent: 'center',alignItems:'center',}} >
          
            <View style={ListStyle.notFoundcontainer}>
              <Icon name="search" size={18} color={'#ffffff'} style={ListStyle.notFoundIcn}  />     
            </View>

            <Text  style={{fontFamily:'Roboto-Regular'}}> No Records Found </Text>
        
          </View>

        </View>
     )

    }
    else
    {
      return(
      <View>
          <FlatList
              data={this.state.categoryArray}
              extraData={this.state}
              keyExtractor={(item, index) => index}
              renderItem={(item)=>this._renderItem(item)}
              ListHeaderComponent={this._renderHeader()}
          />

        <View style={{}}>
        {/**this.renderSubmitbtn()**/}
        </View>

        </View>
      );
    }
}

render() {
  // alert(this.state.modalVisible)
console.log('####',this.state.modalVisible)
  return (
    
    <Modal 
    animationIn={"slideInUp"}
               isVisible = {this.state.modalVisible}
                
    >

 <View style={{flexDirection: 'column',alignItems:"center",justifyContent:"center",marginTop:Platform.OS=='ios'?20:0,height:Platform.OS=='ios'?Screen.height:Screen.height,paddingTop:Platform.OS=='ios'?10:0,}} >

        <View style={{height:Screen.height,marginTop:20,width:Screen.width,}}>
          <View style={{height:40,backgroundColor:color.text3,flexDirection:"row",justifyContent:"space-between"}}>
                <TouchableOpacity  style={{height:40,justifyContent:"center",marginLeft:5}} onPress={()=>{this.oncloseModal()}}>
                      <IconSimple name="close" color={"#FFFFFF"}  size={25} style={{}} />
                </TouchableOpacity>
                
                  <View style={{height:40,alignItems:"center",justifyContent:"center"}}>
                  <Text style={{textAlign:"center",color:"#FFFFFF",fontSize:20,}}>{"Select your Friends"}</Text>
                   </View>
                   <TouchableOpacity style={{height:40,justifyContent:"center",marginRight:5}} onPress={()=>{this.oncloseModal()}}>
                  
                <View>
                <IconSimple name="check" color={"#FFFFFF"} size={25} style={{}} />
                </View>
                  </TouchableOpacity>
          </View>
          {this.renderList()}
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

modalCloseContainer:{
  width: Screen.width,
  height:Screen.height,
  backgroundColor:'rgba(0,0,0,0)',
},

catIcon:{
  //backgroundColor:"#ffffff",
  //width:100,
  flex:1,
  paddingTop:3,
  paddingRight:3,
  paddingBottom:3,
  paddingLeft:3,
  marginRight:5,
  alignItems:'flex-start',
  borderRadius:10,
  borderColor:color.btnBack,
  borderWidth:2,
  justifyContent:'space-between',
  flexDirection:'row',
},
text:{
  marginLeft:4,
  textAlign:'left',
  color:'#000000',

  //fontWeight :'bold',
  fontSize:12,
},


});


module.exports=ProfessionsMultiPick;
