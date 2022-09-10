// import react from "react";
import {useEffect,useState} from 'react';
import axios from 'axios';
function Home(){
  const respose="";
    const[homeRes,setHomeRes]=useState([]);
  useEffect(()=>{
    try{
      axios.get("http://localhost:3002/").then((response)=>{
  
        setHomeRes(response)
})
    }catch(error){
      console.log(error)
    }

  },[])
return  < div  className="App">{homeRes.data}
  </div>;
}
export default Home;