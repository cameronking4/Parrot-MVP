import   {ScrollView,Alert,
} from 'react-native';
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

import Config from '../Config';

import { 

  FETCH_PROFILEPOSTDETAIL_SUCCESS,
	FETCH_POSTADD_SUCCESS,
  
	FETCH_PROFILEPOSTLISTING_SUCCESS, 
	FETCH_PROFILEPOSTLISTING_REQUEST,
	FETCH_PROFILEPOSTLISTING_ERROR,

  FETCH_FILTERPROFILEPOSTLISTING_SUCCESS, 
  FETCH_FILTERPROFILEPOSTLISTING_REQUEST,
  FETCH_FILTERPROFILEPOSTLISTING_ERROR,

  REFRESH_PROFILEPOSTLISTING_REQUEST,

  SEARCH_PROFILEPOSTLISTING_REQUEST,
  SEARCH_PROFILEPOSTLISTING_ERROR,
  SEARCH_PROFILEPOSTLISTING_SUCCESS,
  
  FETCH_PROFILEPOSTADD_SUCCESS,
  FETCH_PROFILEPOSTADD_REQUEST,
  FETCH_PROFILEPOSTADD_ERROR,

  FETCH_PROFILEPOSTDELETE_SUCCESS,
  FETCH_PROFILEPOSTDELETE_REQUEST,
  FETCH_PROFILEPOSTDELETE_ERROR,

  FETCH_PROFILEPOSTUPDATE_SUCCESS,
  FETCH_PROFILEPOSTUPDATE_REQUEST,
  FETCH_PROFILEPOSTUPDATE_ERROR,

  FETCH_PROFILEPOSTFAVUPDATE_ERROR,
  FETCH_PROFILEPOSTFAVUPDATE_REQUEST,
  FETCH_PROFILEPOSTFAVUPDATE_SUCCESS,

  FETCH_PROFILEPOSTBOOKMARKUPDATE_ERROR,
  FETCH_PROFILEPOSTBOOKMARKUPDATE_REQUEST,
  FETCH_PROFILEPOSTBOOKMARKUPDATE_SUCCESS,
 

  FETCH_POSTDELETE_SUCCESS

 } from '../constants/action-types';

export function fetchPostList(path,bundle,pageNo,loadMore,refreshList,bookmark){ 
  return function(dispatch){
    if(refreshList){

      dispatch({ 
          type: REFRESH_PROFILEPOSTLISTING_REQUEST,
          isLoading: true,
          payload: null,
          
      });
  
    }
    else {
      if(bundle.pageNo == 0){
        dispatch({ 
          type: FETCH_PROFILEPOSTLISTING_REQUEST,
          isLoading: true,
          payload: 'reset',
          isFilter:false
          
        });
      }
      else{
        dispatch({ 
          type: FETCH_PROFILEPOSTLISTING_REQUEST,
          isLoading: true,
          payload: null,
          isFilter:false
          
      });  
      }
      
    }
    console.log('action:fetch-list::',path,bundle,pageNo,loadMore);
  // alert('bookmark'+bookmark)
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){

              // alert(JSON.stringify(bundle)+'   '+pageNo);
              // alert('action:PackageResponse'+JSON.stringify(response));
              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: FETCH_PROFILEPOSTLISTING_SUCCESS,
                            payload:  response.data.data,
                            pageNo:pageNo+1,
                            content:bundle,
                            isLoading:false,
                            isFinished:false,
                            totalPage:response.data.data.totalPage ,
                            isFilter:false,
                            bookmarkFinish:bookmark=='bookmark'?true:false,
                            myprofileFinish:bookmark=='myprofile'?true:false,
                            listtype:bundle.listtype,
                        }); 
                  }
                  else{
                      return  dispatch({
                        type: FETCH_PROFILEPOSTLISTING_SUCCESS,
                        payload:null,
                        pageNo:pageNo,
                        content:bundle,
                        isLoading:false,
                        isFinished:true,
                        myprofileFinish:true,
                        totalPage:response.data.data.totalPage ,
                        isFilter:false,
                        listtype:bundle.listtype,
                      }); 
                  }


              }
              else{
                return  dispatch({
                        type: FETCH_PROFILEPOSTLISTING_ERROR,
                        payload: null,
                        isFilter:false
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_PROFILEPOSTLISTING_ERROR,
                        payload: null,
                        isFilter:false
                    }); 

            });
  }
}


export function fetchFilterPostList(path,bundle,pageNo,loadMore){ 
  return function(dispatch){
    dispatch({ 
          type: FETCH_FILTERPROFILEPOSTLISTING_REQUEST,
          isLoading: true,
          payload: null,
          isFilter:true,
    });
  
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){
              if(response.success){
                  if(response.data.data.length > 0){
                   
                        return  dispatch({
                            type: FETCH_FILTERPROFILEPOSTLISTING_SUCCESS,
                            payload:  response.data.data,
                            pageNo:pageNo+1,
                            content:bundle,
                            isLoading:false,
                            isFinished:false,
                            totalPage:response.data.data.totalPage ,
                            isFilter:true,
                        }); 
                     
                  }
                  else{
                     return  dispatch({
                        type: FETCH_FILTERPROFILEPOSTLISTING_SUCCESS,
                        payload:null,
                        pageNo:pageNo,
                        content:bundle,
                        isLoading:false,
                        isFinished:true,
                        totalPage:response.data.data.totalPage ,
                        isFilter:true,
                      });
                  }

              }
              else{
                return  dispatch({
                        type: FETCH_FILTERPROFILEPOSTLISTING_ERROR,
                        payload: null,
                        isFilter:true,
                        content:bundle,
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_FILTERPROFILEPOSTLISTING_ERROR,
                        payload: null,
                        isFilter:true,
                        content:bundle,
                    }); 

            });
  }
}

export function searchPostList(path,bundle){ 
  return function(dispatch){
    dispatch({ 
          type: SEARCH_PROFILEPOSTLISTING_REQUEST,
          isLoading: true,
          payload: null,
          isFilter:false
          
      });
   console.log('action:searchPostList-list::',path,bundle);
  
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){

              // alert(JSON.stringify(bundle)+'   '+pageNo);
              // alert('action:PackageResponse'+JSON.stringify(bundle)+'###'+JSON.stringify(response));
              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: SEARCH_PROFILEPOSTLISTING_SUCCESS,
                            payload:  response.data.data,
                            isLoading:false,
                            isFinished:false,
                            isFilter:false
                        }); 
                  }
                  else{
                        return  dispatch({
                            type: SEARCH_PROFILEPOSTLISTING_SUCCESS,
                            payload: null,
                            isLoading:false,
                            isFinished:false,
                            isFilter:false
                        }); 
                  }
              }
              else{
                return  dispatch({
                        type: SEARCH_PROFILEPOSTLISTING_ERROR,
                        payload: null,
                        isFilter:false
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: SEARCH_PROFILEPOSTLISTING_ERROR,
                        payload: null,
                        isFilter:false
                    }); 

            });
  }
}

export function fetchPostDelete(path,bundle){
  return function(dispatch){
    dispatch({ 
          type: FETCH_PROFILEPOSTDELETE_REQUEST,
          payload: { isLoading: true },
    });
    
    // console.log('action:fetch-delete::',path,bundle);
    
    
            fetchAuthPost(path,bundle,function(response){


              // console.log('action:PROFILEPOSTDELETEResponse',response);
              if(response.success){
        
                            dispatch({
                                  type: FETCH_POSTDELETE_SUCCESS,
                                  _id:bundle._id,
                                  isDelete:'DELETED',
                                  // payload:  response.data.data
                            });
                            dispatch({
                                  type: FETCH_PROFILEPOSTDELETE_SUCCESS,
                                  _id:bundle._id,
                                  isDelete:'DELETED',
                                  // payload:  response.data.data
                            }); 
                            
                          alert('Deleted Successfully');
                  return;

              }
              else{
                return  dispatch({
                        type: FETCH_PROFILEPOSTDELETE_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_PROFILEPOSTDELETE_ERROR,
                        payload: null
                    }); 
                // alert('ERRORRRRR');

            });
    
  }
}


export function addPost(path,bundle,navigation){
  return function(dispatch){
    dispatch({ 
          type: FETCH_PROFILEPOSTADD_REQUEST,
          payload: { isLoading: true },
    });
    
    // console.log('action:add -addPackage-list::',path,bundle);

      var that =this;
        ApiUtility.fetchAuthPost(path,bundle,function(response){
          
            // alert('action:addPost'+JSON.stringify(response));
          if(response.success == false)

             CommonUtility.showToast(response.message);

          if(response.success) 
          {
              console.log("imgvdeopostcreate::response:",response);
              var bundle2;
              if(bundle.type == "VIDEO"){
                 bundle2={
                  type:1,
                  videopost:response.data._id,
                  imagepost:response.data._id,
                  description:bundle.description
                };  
              }
              else{
                   bundle2={
                    type:2,
                    imagepost:response.data._id,
                    videopost:response.data._id,
                    description:bundle.description
                  };
              }
              

              ApiUtility.fetchAuthPost(Config.API_URL+'/post/create',bundle2,function(response){

                  console.log("postcreate::response:",response);
                  ApiUtility.fetchAuthPost( Config.API_URL+'/post/listing',{_id:response.data._id},function(response){
                
                    console.log("postlist::response:",response);
                    if(response.success){
                      CommonUtility.showToast("Post created successfully.");
                      navigation.navigate('HomePage',{data:'abc',renderpage:'postlist'});
                      
                            dispatch({
                                  type: FETCH_PROFILEPOSTADD_SUCCESS,
                                  payload:  response.data.data 
                            }); 
                            // navigation.goBack(null);
                            dispatch({
                                  type: FETCH_POSTADD_SUCCESS,
                                  payload:  response.data.data 
                            }); 

                            return  ;

                    }
                    else{
                      return  dispatch({
                              type: FETCH_PROFILEPOSTADD_ERROR,
                              payload: null
                            }); 
                    }

                  },function(error){
                      return  dispatch({
                              type: FETCH_PROFILEPOSTADD_ERROR,
                              payload: null
                          }); 
                      // alert('ERRORRRRR');

                  });

              },function(error){
                  return  dispatch({
                          type: FETCH_PROFILEPOSTADD_ERROR,
                          payload: null
                      }); 
                  // alert('ERRORRRRR');

              });
                              
            } 
            else{
              alert(response.message)
                return  dispatch({
                        type: FETCH_PROFILEPOSTADD_ERROR,
                        payload: null
                      }); 
              }   
                
        },function(error){
            return  dispatch({
                       type: FETCH_PROFILEPOSTADD_ERROR,
                       payload: null
                   }); 
       });
    }
}

export function updatePost(path,bundle,navigation){
  // alert("update");
  return function(dispatch){
    dispatch({ 
          type: FETCH_PROFILEPOSTUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that =this;
        ApiUtility.fetchAuthPost(path,bundle.imageupdate,function(response1){
          
          if(response1.success)
          {
              
              // CommonUtility.showToast(response.message); 

          // alert("UPDATE::response:"+JSON.stringify(response1.data._id));

              var bundle2=null;
              if(bundle.type == "VIDEO"){
                 bundle2={
                  type:1,
                  _id:bundle.listupdate._id,
                  videopost:response1.data._id,
                  imagepost:response1.data._id,
                  description:bundle.listupdate.description
                };  
              }
              else{
                   bundle2={
                    type:2,
                    _id:bundle.listupdate._id,
                    imagepost:response1.data._id,
                    videopost:response1.data._id,
                    description:bundle.listupdate.description
                  };
              }

              fetchAuthPost( Config.API_URL+'/post/update',bundle2,function(responseUpdatepost){

                if(responseUpdatepost.success){


                  fetchAuthPost( Config.API_URL+'/post/listing',{_id:bundle.listupdate._id},function(response){

                      // alert("UPDATE:::"+JSON.stringify(response));
                    // console.log('action:UPDATE:PackageResponse',response.data.data[0]);
                    if(response.success && response.data.data.length > 0){

                            // navigation.navigate('PostPage');


                              dispatch({
                                  type: FETCH_PROFILEPOSTUPDATE_SUCCESS,
                                  payload:  response.data.data[0] 
                              }); 
                              
                              
                              dispatch({
                                  type: FETCH_PROFILEPOSTDETAIL_SUCCESS,
                                  payload:  response.data.data[0]

                              }); 
                              
                              navigation.navigate('HomePage')

                              // navigation.navigate('PostDetail',{item:response.data.data[0]._id})

                              return;

                    }
                    else{
                      return  dispatch({
                              type: FETCH_PROFILEPOSTUPDATE_ERROR,
                              payload: null
                            }); 
                    }

                },function(error){
                      return  dispatch({
                              type: FETCH_PROFILEPOSTUPDATE_ERROR,
                              payload: null
                          }); 
                      // alert('ERRORRRRR');

                  });

                }
              }, function(error){
                      return  dispatch({
                              type: FETCH_PROFILEPOSTUPDATE_ERROR,
                              payload: null
                          }); 
                      // alert('ERRORRRRR');

                  });
              // alert(response.message);
              //  return  dispatch({
              //               type: FETCH_PROFILEPOSTUPDATE_SUCCESS,
              //               payload:  response.data.data 
              //             });
              

            } 
            else{
                return  dispatch({
                        type: FETCH_PROFILEPOSTUPDATE_ERROR,
                        payload: null
                      }); 
              }   
                
        },function(error){
            return  dispatch({
                       type: FETCH_PROFILEPOSTUPDATE_ERROR,
                       payload: null
                   }); 
       });
    }
}
export function updatePostNumberComment(path,bundle,navigation){
  // alert("update");
  return function(dispatch){
    dispatch({ 
          type: FETCH_PROFILEPOSTUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that=this;
        ApiUtility.fetchAuthPost(path,bundle,function(response1){
          
          if(response1.success)
          {
              
              // CommonUtility.showToast(response.message); 

          // alert("UPDATE::response:"+JSON.stringify(response1.data._id));
              // alert(response.message);
               return  dispatch({
                            type: FETCH_PROFILEPOSTUPDATE_SUCCESS,
                            payload:  response1.data.data[0]
                          });
              
            } 
            else{
                return  dispatch({
                        type: FETCH_PROFILEPOSTUPDATE_ERROR,
                        payload: null
                      }); 
              }   
                
        },function(error){
            return  dispatch({
                       type: FETCH_PROFILEPOSTUPDATE_ERROR,
                       payload: null
                   }); 
       });
    }
}

export function updateForFavorite(response){
  return function(dispatch){
    dispatch({ 
          type: FETCH_PROFILEPOSTFAVUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that =this;
            
        fetchAuthPost( Config.API_URL+'/post/listing',{_id:response.data.post},function(response){


              //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
              if(response.success && response.data.data.length > 0){
                  // alert(JSON.stringify(response))
                      return  dispatch({
                            type: FETCH_PROFILEPOSTFAVUPDATE_SUCCESS,
                            payload:  response.data.data[0] 
                      }); 

              }
              else{
                return  dispatch({
                        type: FETCH_PROFILEPOSTFAVUPDATE_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_PROFILEPOSTFAVUPDATE_ERROR,
                        payload: null
                    }); 
                // alert('ERRORRRRR');

            });
  }        
}


export function updateForBookmark(response){
  return function(dispatch){
    dispatch({ 
          type: FETCH_PROFILEPOSTBOOKMARKUPDATE_REQUEST,
          payload: { isLoading: true },
    });
    
    //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

      var that =this;
            
        fetchAuthPost( Config.API_URL+'/post/listing',{_id:response.data.post},function(response){


              //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
              if(response.success && response.data.data.length > 0){
                  // alert(JSON.stringify(response))
                      return  dispatch({
                            type: FETCH_PROFILEPOSTBOOKMARKUPDATE_SUCCESS,
                            payload:  response.data.data[0] 
                      }); 

              }
              else{
                return  dispatch({
                        type: FETCH_PROFILEPOSTBOOKMARKUPDATE_ERROR,
                        payload: null
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_PROFILEPOSTBOOKMARKUPDATE_ERROR,
                        payload: null
                    }); 
                // alert('ERRORRRRR');

            });
  }        
}
