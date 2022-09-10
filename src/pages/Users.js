// import react from "react";
import {useEffect,useState} from 'react';
import axios from 'axios';
function Users(){
    const[listOfUsers,setListOfUsers]=useState([]);
  useEffect(()=>{
axios.get("http://localhost:3002/users").then((response)=>{
  // console.log(response)
  setListOfUsers(response.data)
})
  },[])
return  < div  className="container m-5">
{listOfUsers.map((value,key)=>{
  return <div key={value.id} className="card">
    <div className="card-header">{value.username}</div>
  <div className="card-body">{value.Name}</div>
  <div className="card-footer">{value.surname}</div>
  </div>})}
  </div>;
}
export default Users;