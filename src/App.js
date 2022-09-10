import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {BrowserRouter as Router, Route, Switch,Link} from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import{AuthContext} from "./helpers/AuthContext";
import {useState,useEffect} from "react";
import PageNotFound from "./pages/pageNotFound";
import axios from "axios";
function App() {
  
  const [authState,setAuthState]=useState({username:"",id:0,status:false});
 
  useEffect(()=>{
    if(!localStorage.getItem("accesstoken")){
      setAuthState({...authState,status:false})
     }else{
      axios.get("http://localhost:3002/auth",{headers:{
      accesstoken:localStorage.getItem("accesstoken")
    }}).then((response)=>{
      if(response.data.error){
          setAuthState({...authState,status:false})
      }else{
          setAuthState(
            {
              username:response.data.username,
              id:response.data.id,
              status:true
            }
          )
      }
    })
  }
  },[]);

  const logout=()=>{
    localStorage.removeItem("accesstoken")
    setAuthState({username:"",id:0,status:false})
  }
  return  < div  className="App">
   <AuthContext.Provider value={{authState,setAuthState}}>
   <Router>
     <div  className="nav navbar  fixed-top bg-dark">
      <div className="container-fluid">
      <Link to="/" className="nav-link">Home</Link>  
      <Link to="/posts" className="nav-link">Posts</Link>
      <Link to="/users" className="nav-link">Users</Link> 
      <Link to="/createpost" className="nav-link">Create Post</Link>
      {!authState.status ?(
        <>
          <Link to="/registration" className="nav-link">User Registration</Link>
        <Link to="/login" className="nav-link">Login</Link>
        </>
      ):(<button onClick={logout} className="btn btn-sm btn-default text-white">Logout</button>)}
      
          <h4 className="text-white">{authState.username}</h4>
      </div>
    </div>
    <div className="main">
      <header><h1>This is the Header of the Application</h1></header>
    <Switch>
       <Route path="/" exact component={Home}/>
       <Route path="/posts" exact component={Posts}/>
       <Route path="/posts/:id" exact component={SinglePost}/>
       <Route path="/users" exact component={Users}/>
       <Route path="/createpost" exact component={CreatePost}/>
       <Route path="/registration" exact component={Registration}/>
       //PageNotFound
       <Route path="/login" exact component={Login}/>
       <Route path="*" exact component={PageNotFound}/>
     </Switch>
    </div>
     
   </Router>
   </AuthContext.Provider>
</div>;}
export default App;
