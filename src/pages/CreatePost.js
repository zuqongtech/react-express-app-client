import react from "react";
import {useEffect,useState} from 'react';
import axios from 'axios';
import {Formik,Form,Field,ErrorMessage} from "formik";
import {useHistory} from "react-router-dom";
import * as Yup from "yup";
function CreatePost(){
    // alert(sessionStorage.getItem("accesstoken"))
    let history=useHistory();
    useEffect(()=>{
        if(!localStorage.getItem("accesstoken")){
            
              history.push("/login")
              
           }else{
            axios.get("http://localhost:3002/auth",{headers:{
             accesstoken:localStorage.getItem("accesstoken")
    }}).then((response)=>{
            if(response.data.error){
                history.push("/login");  
            }
    })
} 
    },[]);

    const onSubmit=(data)=>{
        axios.post("http://localhost:3002/posts", data,{
            headers:{
                accesstoken:localStorage.getItem("accesstoken")
            }}).then((response)=>{
            if(!response.data.error){
                history.push("/posts")
            }else{
                console.log(response.data)
                alert(response.data.error)
            }
            
          })
    };
    const initialValue={
        title:"",
        postText:"",
        username:""
    };
    const  validationSchema=Yup.object().shape({
        title: Yup.string().required(),
        postText:Yup.string().required(),
        username:Yup.string().min(3).max(15).required()
    })

return < div  className="container">
            <div className="col-md-6 offset-3">
            <h1 calssName="text-primary">Create a new Post</h1>
            <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form class="form"> 
                <div className="form-group ">
                <label>Title:</label>
                     <ErrorMessage name="title" className="text-danger" component="span"/>
                     <Field className="form-control form-control-lg" autocomplete="off" id="inputeCreatePost" name="title" placeholder="(Ex. Post..)"></Field>
                     
                </div>
                <div className="form-group ">
                <label>Post:</label>
                     <ErrorMessage name="postText" className="text-danger" component="span"/>
                     <Field className="form-control form-control-lg" autocomplete="off" id="inputeCreatePost" name="postText" placeholder="(Ex. Post..)"></Field>
                     
                </div>
                <div className="form-group ">
                <label>Username:</label>
                     <ErrorMessage name="username" component="span" className="text-danger"/>
                     <Field className="form-control form-control-lg" autocomplete="off" id="inputeCreatePost" name="username" placeholder="(Ex. Usenrmae..)"></Field>
                
                </div>
                <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block">Create Post</button>
                </div> 
                </Form>
            </Formik>

            </div>
            
            </div>
}
export default  CreatePost;