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
 
 
class TagMultiPick extends Component {

constructor(props) {    

    super(props);

    this.state = { 

      //TagMultiPick 
        isLoading:true,
        categoryArray:[],
        categoryCheckedArray:[],
        modalVisible:false,
        searchText:'',
        custTag:'',

    };

}


componentWillReceiveProps(nextProps){
    
    if(nextProps.modalVisible != this.state.modalVisible)
    {
      this.setState({
        modalVisible : nextProps.modalVisible
      });

    }

    if(nextProps.modalVisible==true){
      this.setState({
        categoryCheckedArray : nextProps.selectedArr
      });

      this.refreshCheckArrFromCheckArray(nextProps.selectedArr);

    }
  }
 
oncloseModal(){
    
    this.setState({modalVisible : false,});
    this.props.oncloseModal(this.state.categoryCheckedArray);
}


componentDidMount(){
 // console.log("*************tagsMulipick:fetchData:");
  this.fetchData('');

}

fetchData(text){
  
        var bunch={ 
         reqSorce:'mobile',         
          q:text,
          perPage:100,
        };

        var that=this;

        var path = Config.API_URL+'/tags/listing';
        ApiUtility.fetchAuthPost(path,bunch,function(response){
          
          if(response)
          {
              // console.log("TagMultiPick::response:*********",response.data.data);
 
              that.dataProcess(response.data.data);
          }   
          that.setState({
              isLoading: false
          }); 
                
        },function(error){
            that.setState({
              isLoading: false
            });
        });

}

refreshCheckArrFromCheckArray(categoryCheckedArray){
  var categoryArray = _.clone(this.state.categoryArray);
  for(var i=0;i<categoryCheckedArray.length;i++){
    
    var k= CommonUtility.getIndexOfCompareVal(categoryArray,"_id",categoryCheckedArray[i]['_id']);

    if(k>-1){
      categoryArray[k]['isChecked'] = true;
    }
  }

  this.setState({
    categoryArray:categoryArray,
  });

  // this.props.oncloseModal(categoryCheckedArray);
}

dataProcess(categoryArray){
  var categoryCheckedArray =[];
  for(var i=0;i<categoryArray.length;i++){
    categoryArray[i]['isChecked'] = CommonUtility.getToggleCompareObjArr(categoryArray[i],'_id',this.state.categoryCheckedArray,'_id');
  }

  // if(categoryArray.length >0){
  //   this.refreshCheckArr(categoryArray);
  // }

  this.setState({
   categoryArray : categoryArray,
  });
}

onCheckToggle(item){
  // alert(JSON.stringify(item))

  var categoryArray =  this.state.categoryArray;

  categoryArray[item.index]['isChecked'] = !categoryArray[item.index]['isChecked'];

  this.refreshCheckArrOnToggle(categoryArray);

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

  // this.props.itemPicked(categoryCheckedArray);
}

renderSubmitbtn(){

  console.log();
  if(this.state.categoryCheckedArray.length > 0)
  {
    return(

        <TouchableOpacity onPress={()=>{this.oncloseModal()}} style={[CommonStyle.submitBtn,{width:Dimensions.get('window').width}]}>
          <Text style={CommonStyle.submitBtnText}>Select</Text>
        </TouchableOpacity>        

    );
  }

}

SearchFilterFunction(text){
    console.log("Search",text);
    this.setState({searchText:text});
    this.fetchData(text);
}

removeCategory(item){
    
  console.log("tagsMulipick:removeCategory:",item);

  var categoryCheckedArray =  this.state.categoryCheckedArray;
  var categoryArray =  this.state.categoryArray;

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

}


_renderHeader(){
  console.log("TagMultiPick:renderheader call");

  var categoryCheckedArray = this.state.categoryCheckedArray;
  if(categoryCheckedArray.length > 0){
    return(

        <View style={{backgroundColor:'#ffffff',marginBottom:15,paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10}}>
        
            <ScrollView horizontal={true} style={{width:Screen.width-30}}>
            
            { categoryCheckedArray.map((item, key)=>(
              <View key={key} style={CommonStyle.capsuleView}>
                  
                  <Text key={key} style={CommonStyle.capsuleText} numberOfLines={1}>
                    {item.name}
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
    console.log("i");
    return(
      <View style={{backgroundColor:color.mainbackground,marginBottom:15,paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:10}}>
          <Text>Selected Tags</Text>
      </View>
    );
  }
}


_renderItem(item){
  console.log("TagMultiPick:item::",item,this.state.categoryCheckedArray,this.state.categoryArray);
  
  return(
    <TouchableOpacity onPress={this.onCheckToggle.bind(this,item)} style={{height:30,borderWidth:1,borderColor:'#ffffff',justifyContent:'center',flexDirection:'row',alignItems:'center',backgroundColor:'#ffffff'}}>
      <Checkbox label={item.item.name} value={item.item.name} checked={item.item.isChecked} onCheck={this.onCheckToggle.bind(this,item)} />
    </TouchableOpacity>
    );                
}

spinner(){
    if(this.state.isLoading)
    { 
      return(<Spinner />);
    }
}

renderList(){

  if(this.state.isLoading){
      return this.spinner();
  }

  else if(this.state.categoryArray.length ==0){
     console.log("not Found");
     return(
        
        <View style={{justifyContent: 'center',backgroundColor:'#f8f8f8',flex:2,}} >

          <View style={{height:265,justifyContent: 'flex-start',alignItems:'center',}} >
          
            <View style={ListStyle.notFoundcontainer}>
              <Icon name="search" size={18} color={'#ffffff'} style={ListStyle.notFoundIcn}  />     
            </View>

            <Text  style={{fontFamily:'SF'}}> No Records Found </Text>
        
          </View>

        </View>
     )

    }
    else
    {
       console.log("categoryArraoy",this.state.categoryArray);
      return(
      
        <FlatList
            data={this.state.categoryArray}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={(item)=>this._renderItem(item)}
            ListHeaderComponent={this._renderHeader()}
        />
      );
    }
}

addCustomTag(){
  
  if(this.state.custTag == '')
  {
    alert('Please,Enter your tag name');
    return;
  }
  else{
        var bunch={ 
          reqSorce:'mobile',         
          name:this.state.custTag
        };

        var that=this;

        var path = Config.API_URL+'/tags/create';
        ApiUtility.fetchAuthPost(path,bunch,function(response){
          
          // alert(JSON.stringify(response))
          if(response.success)
          {
              
              var tmp=that.state.categoryArray;
              response.data['isChecked'] = false;
              response.data['index'] = 0;
              tmp.unshift(response.data); // to add element at 0 index
              
              that.setState({categoryArray : tmp,custTag:''},()=>{that.onCheckToggle(response.data)});
              
              
              // alert('Your tag added successfully')
              
          }
          else{
            that.setState({custTag:''});
            alert('Please enter unique tag');
            return;
          }   
          that.setState({
              isLoading: false
          }); 
                
        },function(error){
            that.setState({
              isLoading: false
            });
        });
      }
}

renderaddCustomTag(){

  return(

    <View style={styles.tabBtn}>


      <TextInput
              multiline={true}
              autoFocus = {false}
              style={{paddingLeft:10,fontSize:14,textAlign: 'left', color: 'gray',width:Dimensions.get("window").width-80, justifyContent:'center',alignItems:"center",}}
              placeholder="Add your custom tag"
              placeholderTextColor={color.placeholderTextColor}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(custTag) => this.setState({custTag:custTag})} 
              value={this.state.custTag}
      />


      <TouchableOpacity onPress={()=>this.addCustomTag()} style={{}}> 
        <Icon name="add-circle-outline" size={28} color={"grey"} style={{}}/> 
      </TouchableOpacity>

      </View>
  )

}


  render() {

    return (

     <Modal animationType = {"slide"} transparent = {true}
               visible = {this.state.modalVisible}
               onRequestClose = {() =>{this.setState({modalVisible:false});this.props.oncloseModal();}}
      >

    <View style={{height:Platform.OS=='ios'?Screen.height-10:Screen.height-25,marginTop:Platform.OS=='ios'?10:0,backgroundColor:color.mainbackground}} elevation={5}>

 
        <Toolbar
            leftElement="arrow-back"
            // isSearchActive={true} 
            centerElement="Select Tags"
            onLeftElementPress={() =>{this.setState({modalVisible:false});this.props.oncloseModal();}}
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
              onChangeText: (text) => {
                            this.SearchFilterFunction(text);
                          },
              onSearchClosed:()=>{
                console.log("close");
                this.setState({modalVisible:false});
                this.oncloseModal();
              }
            }}

           style={{
              container: {backgroundColor:color.ColorBack,elevation:0},
              leftElement:{color:color.toolTitleColor},
              rightElement:{color:color.toolTitleColor},
              titleText:{
                          color:color.toolTitleColor,
                          // fontFamily:'SFMedium',
                        },
           }}
        />


          {this.renderaddCustomTag()}
          {this.renderList()}
          {this.renderSubmitbtn()}

    
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

module.exports = TagMultiPick;
