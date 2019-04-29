//SearchModal opened from main home screen
 
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
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
}from 'react-native';
import {Toolbar,Icon} from 'react-native-material-ui';
 

var CommonUtility= require('../../reducer/lib/CommonUtility');
var ApiUtility = require('../../reducer/lib/ApiUtility');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var Config = require('../../Config');

var CommonStyle = require('../../style/common');
var color = require('../../style/color.js');
var ListStyle = require('../../style/ListStyle.js');

var Spinner = require('../../Spinner');


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postAction from '../../action/postAction';


class SearchModal extends React.Component {

constructor(props) {
  super(props);
  
  this.state = {
    modalVisible : false,
    text:'',
    isLoading:true,
    dataSource:[], 
  };
  this.onSubmitEditing=this.onSubmitEditing.bind(this);
  this.onSearchClear=this.onSearchClear.bind(this);
  this.onSearchPressed=this.onSearchPressed.bind(this);
  this.onChangeText=this.onChangeText.bind(this);
      
}

// componentWillReceiveProps(nextProps){
    
//     if(nextProps.modalVisible != this.state.modalVisible)
//     {
//       this.setState({
//         modalVisible : nextProps.modalVisible
//       });
//     }
//     if(nextProps.modalVisible==true){
//         this.getSearch('');
//     }

// }

componentWillMount(){
  this.getSearch('');
}

componentDidMount(){

    this.setState({
      modalVisible : this.props.modalVisible,
    });
    // this.getSearch();
    
}

getSearch(q){
    var that=this;

    var bunch={
      reqSorce:'mobile', 
      q:q
    };
    this.setState({isLoading:true});

    var path = Config.API_URL+'/post/listing';
    this.props.postAction.searchPostList(path,bunch);

}


SearchFilterFunction(text){
 // console.log("Search***",text);
  // alert('%%%'+text);
   
    this.setState({text:text});
    this.getSearch(text);
}
 
oncloseModal(){
    this.props.oncloseModal();
}

goToDetail(item){

  alert('goToDetail')
  // this.setState({modalVisible:false});
  // this.props.navigation.navigate('StoreDetail',{item:item.item});

  // this.props.oncloseModal(); 

}

_renderItem(item){
    // alert(JSON.stringify(item))

  return(
    
      <View style={[styles.container,{flexDirection:'column'}]}>

        {/*for detail page with tabs put:: this.props.navigation.navigate.UserTabList({item:item})*/}
        <TouchableOpacity onPress={()=>this.goToDetail(item)} style={[styles.container]} >

          <View style={styles.imageContainer}>

            <Image
                  source={{uri:item.item.image}}
                  resizeMode="cover" 
                  style={{borderRadius:35,height:70,width:70}} 
                />

          </View>


          <View>
              <Text numberOfLines={1} style={{fontSize:19}}>{item.item.firstname}</Text>
              <Text numberOfLines={1} style={{fontSize:19}}>{item.item.lastname}</Text>
          </View>

        </TouchableOpacity>

      </View>
  
  );

}


_renderListView(){

// alert(JSON.stringify(this.props.store.searchStoreList));
    if(this.props.post.isLoading){
      return this.spinner();
    }

    else if(this.props.post.searchPostList == null){
     console.log("not Found");
     return(
        
        <View style={{height:Screen.height-80,justifyContent:'center',}} >

          <View style={{justifyContent:'flex-start',alignItems:'center'}} >
          
            <View style={ListStyle.notFoundcontainer}>
              <Icon name="search" size={18} color={'#ffffff'} style={ListStyle.notFoundIcn}  />     
            </View>

            <Text  style={{fontFamily:'Roboto-Medium'}}> No Records Found </Text>
        
          </View>

        </View>
     )

    }
   else{
    
    return(
        
        <ScrollView>
          <FlatList
              data={this.props.post.searchPostList}
              extraData={this.props}
              renderItem={(item)=>this._renderItem(item)}
              initialNumToRender={7}
              // disableVirtualization={false}
              keyExtractor={(item, index) => index}
              // onRefresh={() =>this.applyFilterData()}
              refreshing={false}
              // onEndReachedThreshold={200}
          />  
        </ScrollView>
      );
    }
}

spinner(){
    //console.log("spinner calontol");
    if(this.props.post.isLoading)
    { 
      return(
        <View style={{justifyContent:'center',height:300}}>
          <Spinner />
        </View>
        );
    }
  }


onSearchPressed(){
    // this.setState({searchOpen:true});
    alert("onSearchPressed");
}

onSubmitEditing(){
  // alert('onSubmitEditing')
  this.SearchFilterFunction(this.state.text)
  // EventEmitter.emit('onSubmitEditing',true);
  // alert(this.state.text);
}

onSearchClear(){
  // alert()
  this.SearchFilterFunction('')
}


onChangeText(value){

// alert()
  if(value == '')  
    this.SearchFilterFunction('')
  this.setState({
    text : value
  });

  // this.fetchFeed(value);
  // this.fetchFoodFeed(value);
  // // console.log("onChangeText",value);
    
}


render() {

  return (
    
     <View>
      <View style={styles.modalcontainer}>
      
         <Toolbar
              leftElement="arrow-back"
              isSearchActive={true} 
              onLeftElementPress={() =>{this.props.navigation.goBack(null);}}
              // onSearchClearRequested={this.onSearchClear}
              searchable={{
                autoFocus: true,
                placeholder: 'Search',
                onSearchPressed:this.onSearchPressed,
                onSubmitEditing:this.onSubmitEditing,
                onChangeText:(value)=>{this.onChangeText(value)},
                onSearchClosed:()=>{
                  console.log("close");
                  this.props.oncloseModal();
                  this.setState({modalVisible:false});
                  
                },
                
              }}
              
              style={
              {
                container: {backgroundColor:color.toolBackColor,elevation:0},
                leftElement:{color:color.appTitle},
                rightElement:{color:color.appTitle},
                titleText:{
                  color:color.appTitle,
                },
                centerElementContainer:{
                   // alignItems:'center'
                },
              }
              }
          />

            <View style={{height:Dimensions.get('window').height-75,backgroundColor:color.homeback}}> 
             
            {this._renderListView()}        

            </View>
          
          </View>          
        
        {/*
          <TouchableOpacity style={styles.modalClosecontainer} onPress={this.props.oncloseModal.bind(this)}>
          </TouchableOpacity>
        */}
     </View>    
   );
  }
}



const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const styles = StyleSheet.create({

modalcontainer: {
      // marginTop:Platform.OS == 'ios' ?20:0,
      width: Dimensions.get('window').width,
      backgroundColor:"blue",
},
modalClosecontainer:{
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height-240,
    backgroundColor:"rgba(0,0,0,0.3)",
},
container: {
    // height:230,
    marginTop:7,
    marginBottom:7,
    alignSelf:'center',
    alignItems:'flex-start',
    width:Dimensions.get('window').width-30,
    borderWidth:1,
    borderColor:'#ffffff',
    borderRadius:5,
    margin:18,
    padding:10,
    flexDirection:'row',
    // elevation:3,
    backgroundColor:'#ffffff'
},
imageContainer:{
  width:70,
  height:70,
  borderRadius:35,
  backgroundColor:color.imageBack,
  marginRight:15
}

});


// module.exports=SearchModal;

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
)(SearchModal);


