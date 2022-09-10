import {useEffect,useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import{AuthContext} from "../helpers/AuthContext";
function Posts(){
  
  const[listOfPost,setListOfPosts]=useState([]);
  const [likedPost,setLikedPosts]=useState([])
  let history=useHistory();

  useEffect(()=>{
    if(!localStorage.getItem("accesstoken")){
      // setAuthState({...authState,status:false})
        history.push("/login")
     }else{
      axios.get("http://localhost:3002/auth",{headers:{
      accesstoken:localStorage.getItem("accesstoken")
    }}).then((response)=>{
        if(response.data.error){
          // setAuthState({...authState,status:false})
        history.push("/login")
        }else{
          axios.get("http://localhost:3002/posts",{
          headers:{

          accesstoken:localStorage.getItem("accesstoken")

      }}).then((response)=>{
    
        setListOfPosts(response.data.listOfPosts);
  
        setLikedPosts(response.data.likedPosts.map((like)=>{
    return like.PostId;
  }));

  console.log(likedPost)

})
 }
  })

 } },[]);


const likeAPost=(postId)=>{
  
    axios.post("http://localhost:3002/posts/likes",{PostId:postId},{
  headers:{
      accesstoken:localStorage.getItem("accesstoken")
  }}).then((response)=>{
    
      setListOfPosts(listOfPost.map((post)=>{
        if(post.id===postId){
          if(response.data.liked){
            return {...post,Likes:[...post.Likes,0]}
          }else{
            const LikesArray=post.Likes;
            LikesArray.pop();
            return {...post,Likes:LikesArray}
          }
          
        }else{
          return post;
        }
      })
    );

    if(likedPost.includes(postId)){
      setLikedPosts(likedPost.filter((id)=>{
        return id!=postId;
      }))
    }else{
      setLikedPosts(...likedPost,postId)
    }
    
  });
  
};




return  (listOfPost&&likedPost?< div  className="container">
    {listOfPost.map((value,key)=>{
      return <div key={value.id} className="card shadow border-primary mb-3" >
       <div className="card-body" onClick={()=>{history.push(`/posts/${value.id}`)}}> <h1 className="text-primary">{value.title}</h1>
      <p>{value.postText}</p>
      
      </div>
      <div className="card-footer bg-primary">
      {value.username}
      <div className="float-end"> 
      <ThumbUpOutlinedIcon  onClick={()=>{
        likeAPost(value.id)
        }
        } 
        className={(()=>{
          return likedPost.includes(value.id)?"text-default":"text-white";
        })}
        />  
        {value.Likes.length}
        </div>
      </div>
      </div>
    })}
      </div>:
      <div><h1>Post Data  not available</h1></div>)

}
export default Posts;