
import ApiUtility,{fetchPost,fetchAuthPost} from '../reducer/lib/ApiUtility';
import AuthUtility from '../reducer/lib/AuthUtility';
import CommonUtility from '../reducer/lib/CommonUtility';

import Config from '../Config';

import { 

  // FETCH_POSTDETAIL_SUCCESS,
	
	FETCH_GETNOTILISTING_SUCCESS,
	FETCH_GETNOTILISTING_REQUEST,
	FETCH_GETNOTILISTING_ERROR,

  // FETCH_FILTERPOSTLISTING_SUCCESS,
  // FETCH_FILTERPOSTLISTING_REQUEST,
  // FETCH_FILTERPOSTLISTING_ERROR,

  REFRESH_GETNOTILISTING_REQUEST,

//   SEARCH_POSTLISTING_REQUEST,
//   SEARCH_POSTLISTING_ERROR,
//   SEARCH_POSTLISTING_SUCCESS,
  
//   FETCH_COMMENTADD_SUCCESS,
//   FETCH_COMMENTADDD_REQUEST,
//   FETCH_COMMENTADD_ERROR,

//   FETCH_POSTDELETE_SUCCESS,
//   FETCH_POSTDELETE_REQUEST,
//   FETCH_POSTDELETE_ERROR,

//   FETCH_POSTUPDATE_SUCCESS,
//   FETCH_POSTUPDATE_REQUEST,
//   FETCH_POSTUPDATE_ERROR,

//   FETCH_POSTFAVUPDATE_ERROR,
//   FETCH_POSTFAVUPDATE_REQUEST,
//   FETCH_POSTFAVUPDATE_SUCCESS,
  
//   FETCH_COMMENTRESET_SUCCESS,
// FETCH_POSTCOMMENTRESET_SUCCESS,

 } from '../constants/action-types';

export function fetchCommentList(path,bundle,pageNo,loadMore,refreshList){ 
  return function(dispatch){
    if(refreshList){

      dispatch({ 
          type: REFRESH_GETNOTILISTING_REQUEST,
          isLoading: true,
          payload: null,
          
      });
     
    }
    else {
      dispatch({ 
    			type: FETCH_GETNOTILISTING_REQUEST,
          isLoading: true,
    			payload: null,
          isFilter:false
          
      });
       
    }
    console.log('action:fetch-list::',path,bundle,pageNo,loadMore);
  
    // alert('action:PackageResponse::'+JSON.stringify(bundle));
            fetchAuthPost(path,bundle,function(response){

              // alert(JSON.stringify(bundle)+'   '+pageNo);
              // alert('action:PackageResponse'+JSON.stringify(response));
              if(response.success){
                  if(response.data.data.length > 0){
                        return  dispatch({
                            type: FETCH_GETNOTILISTING_SUCCESS,
                            payload:  response.data.data,
                            pageNo:pageNo+1,
                            content:bundle,
                            isLoading:false,
                            isFinished:false,
                            totalPage:response.data.data.totalPage ,
                            isFilter:false
                        }); 
                  }
                  else{
                      return  dispatch({
                        type: FETCH_GETNOTILISTING_SUCCESS,
                        payload:null,
                        pageNo:pageNo,
                        content:bundle,
                        isLoading:false,
                        isFinished:true,
                        totalPage:response.data.data.totalPage ,
                        isFilter:false
                      }); 
                  }


              }
              else{
                return  dispatch({
                        type: FETCH_GETNOTILISTING_ERROR,
                        payload: null,
                        isFilter:false
                      }); 
              }

            },function(error){
                return  dispatch({
                        type: FETCH_GETNOTILISTING_ERROR,
                        payload: null,
                        isFilter:false
                    }); 

            });
  }
}
// export function commentReset(){
//   return function(dispatch){
//     dispatch({ 
//       type: FETCH_COMMENTRESET_SUCCESS,
//       isLoading: true,
//       payload: null,
      
//     });
    
   
  
//   }
// }

// export function fetchFilterPostList(path,bundle,pageNo,loadMore){ 
//   return function(dispatch){
//     dispatch({ 
//           type: FETCH_FILTERPOSTLISTING_REQUEST,
//           isLoading: true,
//           payload: null,
//           isFilter:true,
//     });
  
//     // alert('action:PackageResponse::'+JSON.stringify(bundle));
//             fetchAuthPost(path,bundle,function(response){
//               if(response.success){
//                   if(response.data.data.length > 0){
                   
//                         return  dispatch({
//                             type: FETCH_FILTERPOSTLISTING_SUCCESS,
//                             payload:  response.data.data,
//                             pageNo:pageNo+1,
//                             content:bundle,
//                             isLoading:false,
//                             isFinished:false,
//                             totalPage:response.data.data.totalPage ,
//                             isFilter:true,
//                         }); 
                     
//                   }
//                   else{
//                      return  dispatch({
//                         type: FETCH_FILTERPOSTLISTING_SUCCESS,
//                         payload:null,
//                         pageNo:pageNo,
//                         content:bundle,
//                         isLoading:false,
//                         isFinished:true,
//                         totalPage:response.data.data.totalPage ,
//                         isFilter:true,
//                       });
//                   }

//               }
//               else{
//                 return  dispatch({
//                         type: FETCH_FILTERPOSTLISTING_ERROR,
//                         payload: null,
//                         isFilter:true,
//                         content:bundle,
//                       }); 
//               }

//             },function(error){
//                 return  dispatch({
//                         type: FETCH_FILTERPOSTLISTING_ERROR,
//                         payload: null,
//                         isFilter:true,
//                         content:bundle,
//                     }); 

//             });
//   }
// }

// export function searchPostList(path,bundle){ 
//   return function(dispatch){
//     dispatch({ 
//           type: SEARCH_POSTLISTING_REQUEST,
//           isLoading: true,
//           payload: null,
//           isFilter:false
          
//       });
//    console.log('action:searchPostList-list::',path,bundle);
  
//     // alert('action:PackageResponse::'+JSON.stringify(bundle));
//             fetchAuthPost(path,bundle,function(response){

//               // alert(JSON.stringify(bundle)+'   '+pageNo);
//               // alert('action:PackageResponse'+JSON.stringify(bundle)+'###'+JSON.stringify(response));
//               if(response.success){
//                   if(response.data.data.length > 0){
//                         return  dispatch({
//                             type: SEARCH_POSTLISTING_SUCCESS,
//                             payload:  response.data.data,
//                             isLoading:false,
//                             isFinished:false,
//                             isFilter:false
//                         }); 
//                   }
//                   else{
//                         return  dispatch({
//                             type: SEARCH_POSTLISTING_SUCCESS,
//                             payload: null,
//                             isLoading:false,
//                             isFinished:false,
//                             isFilter:false
//                         }); 
//                   }
//               }
//               else{
//                 return  dispatch({
//                         type: SEARCH_POSTLISTING_ERROR,
//                         payload: null,
//                         isFilter:false
//                       }); 
//               }

//             },function(error){
//                 return  dispatch({
//                         type: SEARCH_POSTLISTING_ERROR,
//                         payload: null,
//                         isFilter:false
//                     }); 

//             });
//   }
// }

// export function fetchPostDelete(path,bundle,listBundle){
//   return function(dispatch){
//     dispatch({ 
//           type: FETCH_POSTDELETE_REQUEST,
//           payload: { isLoading: true },
//     });
    
//     // console.log('action:fetch-delete::',path,bundle);
    
    
//             fetchAuthPost(path,bundle,function(response){


//               // console.log('action:POSTDELETEResponse',response);
//               if(response.success){

//                   fetchAuthPost( Config.API_URL+'/post/listing',listBundle,function(response){

//                     // alert('data::'+JSON.stringify(response))
//                     // console.log('action:PackageResponse',response);
//                     if(response.success){

//                         if(response.data.data.length > 0){
//                             return  dispatch({
//                                   type: FETCH_POSTDELETE_SUCCESS,
//                                   payload:  response.data.data
//                             }); 
//                         }
//                     }
//                     else{
//                       return  dispatch({
//                               type: FETCH_POSTDELETE_ERROR,
//                               payload: null                            
//                             }); 
//                     }

//                   },function(error){
//                       return  dispatch({
//                               type: FETCH_POSTDELETE_ERROR,
//                               payload: null
//                           }); 
//                       // alert('ERRORRRRR');

//                   });
//                     alert('Deleted Successgully');
//                       return  dispatch({
//                             type: FETCH_POSTDELETE_SUCCESS,
//                             payload:  null 
//                       }); 

//               }
//               else{
//                 return  dispatch({
//                         type: FETCH_POSTDELETE_ERROR,
//                         payload: null
//                       }); 
//               }

//             },function(error){
//                 return  dispatch({
//                         type: FETCH_POSTDELETE_ERROR,
//                         payload: null
//                     }); 
//                 // alert('ERRORRRRR');

//             });
    
//   }
// }


// export function addComment(path,bundle,navigation,postAction){
//   return function(dispatch){
//     dispatch({ 
//           type: FETCH_COMMENTADDD_REQUEST,
//           payload: { isLoading: true },
//     });
    
//     // console.log('action:add -addPackage-list::',path,bundle);

//       var that =this;
//         ApiUtility.fetchAuthPost(path,bundle,function(response){
          
//             // alert('action:addPost'+JSON.stringify(response));
//           if(response.success == false)
//           CommonUtility.showToast(response.message);
//           if(response.success)
//           {
//               console.log("Registration::response:",response);
              
  
//               fetchAuthPost( Config.API_URL+'/comment/listing',{_id:response.data._id},function(response){
                
//                 if(response.success){
//                   // alert(response.message);

//                                         // resetPostComment();
//                       // nidhi
//                         postAction.updatePostNumberComment(Config.API_URL+"/post/update",{_id:response.data._id},navigation);
//                         dispatch({
//                               type: FETCH_COMMENTADD_SUCCESS,
//                               payload:  response.data.data 
//                         }); 
                        
//                        // navigation.goBack(null);
//                         // dispatch({
//                               // type: FETCH_COMMENTLis_SUCCESS,
//                               // payload:  response.data.data 
//                         // }); 
//                         return  ;

//                 }
//                 else{
//                   return  dispatch({
//                           type: FETCH_COMMENTADD_ERROR,
//                           payload: null
//                         }); 
//                 }

//               },function(error){
//                   return  dispatch({
//                           type: FETCH_COMMENTADD_ERROR,
//                           payload: null
//                       }); 
//                   // alert('ERRORRRRR');

//               });
                
//             } 
//             else{
//               alert(response.message)
//                 return  dispatch({
//                         type: FETCH_COMMENTADD_ERROR,
//                         payload: null
//                       }); 
//               }   
                
//         },function(error){
//             return  dispatch({
//                        type: FETCH_COMMENTADD_ERROR,
//                        payload: null
//                    }); 
//        });
//     }
// }

// export function updatePost(path,bundle,navigation){
//   return function(dispatch){
//     dispatch({ 
//           type: FETCH_POSTUPDATE_REQUEST,
//           payload: { isLoading: true },
//     });
    
//     // console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

//       var that =this;
//         ApiUtility.fetchAuthPost(path,bundle,function(response1){
          
//           if(response1.success)
//           {
              
//               // CommonUtility.showToast(response.message); 

//           // alert("UPDATE::response:"+JSON.stringify(response1.data._id));

//                fetchAuthPost( Config.API_URL+'/post/listing',{_id:response1.data._id},function(response){

//                 // alert("UPDATE:::"+JSON.stringify(response));
//               // console.log('action:UPDATE:PackageResponse',response.data.data[0]);
//               if(response.success && response.data.data.length > 0){

//                     navigation.navigate('PostDetail',{item:response1.data._id})
//                       // navigation.navigate('PostPage');

//                         dispatch({
//                             type: FETCH_POSTUPDATE_SUCCESS,
//                             payload:  response.data.data[0] 
//                         }); 
                        
                        
//                         dispatch({
//                             type: FETCH_POSTDETAIL_SUCCESS,
//                             payload:  response.data.data[0]

//                         }); 

//                         return;

//               }
//               else{
//                 return  dispatch({
//                         type: FETCH_POSTUPDATE_ERROR,
//                         payload: null
//                       }); 
//               }

//             },function(error){
//                 return  dispatch({
//                         type: FETCH_POSTUPDATE_ERROR,
//                         payload: null
//                     }); 
//                 // alert('ERRORRRRR');

//             });
//               // alert(response.message);
//               //  return  dispatch({
//               //               type: FETCH_POSTUPDATE_SUCCESS,
//               //               payload:  response.data.data 
//               //             });
              
//             } 
//             else{
//                 return  dispatch({
//                         type: FETCH_POSTUPDATE_ERROR,
//                         payload: null
//                       }); 
//               }   
                
//         },function(error){
//             return  dispatch({
//                        type: FETCH_POSTUPDATE_ERROR,
//                        payload: null
//                    }); 
//        });
//     }
// }


// export function updateForFavorite(response){
//   return function(dispatch){
//     dispatch({ 
//           type: FETCH_POSTFAVUPDATE_REQUEST,
//           payload: { isLoading: true },
//     });
    
//     //console.log('action:UPDATE -UPDATEPackage-list::',path,bundle);
    

//       var that =this;
            
//         fetchAuthPost( Config.API_URL+'/post/listing',{_id:response.data.post},function(response){


//               //console.log('action:UPDATE:PackageResponse',response.data.data[0]);
//               if(response.success && response.data.data.length > 0){
//                   // alert(JSON.stringify(response))
//                       return  dispatch({
//                             type: FETCH_POSTFAVUPDATE_SUCCESS,
//                             payload:  response.data.data[0] 
//                       }); 

//               }
//               else{
//                 return  dispatch({
//                         type: FETCH_POSTFAVUPDATE_ERROR,
//                         payload: null
//                       }); 
//               }

//             },function(error){
//                 return  dispatch({
//                         type: FETCH_POSTFAVUPDATE_ERROR,
//                         payload: null
//                     }); 
//                 // alert('ERRORRRRR');

//             });
//   }        
// }
// export function resetPostComment(){
//   console.log("rst post");
//   return function(dispatch){
//     dispatch({ 
//       type: FETCH_POSTCOMMENTRESET_SUCCESS,
//       isLoading: true,
//       payload: null,
      
//     });
//   }
// }


