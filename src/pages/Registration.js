
import {useEffect,useState} from 'react';
import axios from 'axios';
import {Formik,Form,Field,ErrorMessage} from "formik";
import {useHistory} from "react-router-dom";

import * as Yup from "yup";
function Registration(){
    let history=useHistory();
    
    
    const regsiterUser=(data)=>{
        axios.post("http://localhost:3002/rgister-user", data).then((response)=>{
        
            setTimeout(()=>{
                history.push("/login")
            },3000)
            
          })
    }
    const initialValue={
        username:"",
        password:"",
        
    };
    const  validationSchema=Yup.object().shape({
        
        password:Yup.string().required(),
        username:Yup.string().min(3).max(15).required()
    });
    
return  < div  className="container m-5">
            <div className="col-md-6 offset-3">
            <div className="card border-primary">
            <div className="card-header"><h2>User Regsitration</h2></div>
                <div className="card-body">
                <Formik Formik initialValues={initialValue} onSubmit={regsiterUser} validationSchema={validationSchema}>
            <Form class="form"> 
                <div className="form-group ">
                <label>Username:</label>
                     <ErrorMessage name="username" className="text-danger" component="span"/>
                     <Field className="form-control form-control-lg" autocomplete="off" id="inputeCreatePost" name="username" placeholder="Username"></Field>
                     
                </div>
                <div className="form-group ">
                <label>Password:</label>
                     <ErrorMessage name="password" className="text-danger" component="span"/>
                     <Field type="password" className="form-control form-control-lg" autocomplete="off" id="inputeCreatePost" name="password" placeholder="Password"></Field>
                     
                </div>
                
                <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                </div> 
                </Form>
            </Formik>
                </div>
            
        </div> 
            </div>
        
        </div>;
}
export default Registration;