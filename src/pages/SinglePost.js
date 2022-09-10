import react, {useEffect,useState,useContext} from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import {AuthContext} from "../helpers/AuthContext"
function SinglePost(){
    const {authState}=useContext(AuthContext);
    const {id}=useParams();
    const[postObj,setPostObj]=useState({});
    const [comments,setComments]=useState([]);
    const[newComment,setNewComment]=useState("");
    useEffect(()=>{
        
        axios.get(`http://localhost:3002/posts/${id}`).then(response=>{
            setPostObj(response.data)
        });

        axios.get(`http://localhost:3002/comments/${id}`).then(response=>{
            setComments(response.data)
        }); 
    },[])

    const addComment=()=>{
        axios.post("http://localhost:3002/comments",{commentBody:newComment,PostId:id},{
            headers:{
                accesstoken:localStorage.getItem("accesstoken")
            }
        }).then((response)=>{
            if(response.data.error){
                alert("Error")
            }else{
                const commentToAdd={commentBody:newComment,username:response.data.username}
                setComments([...comments,commentToAdd]);
                setNewComment("")
            }
        
        })
    }
    const deleteComment=(id)=>{
        // alert(`Detelete Comment ${id}`)
        axios.delete(`http://localhost:3002/deletecomment/${id}`,{
            headers:{
                accesstoken:localStorage.getItem("accesstoken")
            }
        }).then((response)=>{
            if(!response.data.error){
                setComments(comments.filter((val)=>{
                    return val.id!=id;
                }));
            }else{
                alert("Error")
            }
            
        })
    }
return  < div  className="container">
        <div className="row">
        <div className="col-md-6">
                <div className="card border-success shadow mb-3">
                <div className="card-header"><h1>  {postObj.title}</h1></div>
                    <div className="card-body"><p>{postObj.postText}</p></div>
                    <div className="card-footer"><span>{postObj.username}</span> || <span>{postObj.createdAt}</span></div>
                </div>                    
            </div>
            <div className="col-md-6">
            <div className="form-group">
                    <input value={newComment}type="text" placeholder="Write a comment" autoComplete="off" className="form-control form-control-lg" onChange={(event)=>{setNewComment(event.target.value)}}/>
                    <button className="btn btn-primary" onClick={addComment}>Comment</button>
                    </div>
                    <hr/>
                <div className="container-fluid">
                    {comments.map((comment,key)=>{
                        return(<div key={key} className="card border-primary mb-3">
                            <div className="card-body">{comment.commentBody}
                            <hr/>
                            <label className="text-muted text-right">{comment.username}</label>
                             {authState.username===comment.username&&<button className="btn btn-danger btn-sm" onClick={()=>{deleteComment(comment.id)}} >&times;</button>
                            

                             }</div>
                        </div>)
                    })}
                </div>
            </div>
        </div>
  </div>;
}
export default SinglePost;