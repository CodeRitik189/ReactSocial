import ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import socket from './Socket';
import Newchat from'./Newchat'
export default function Chats(props){
  const [response, setResponse] = useState({data:[],chat:'',ischat:false});
  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse({data:data});
    });
  }, []);
 const handleClick=(evt)=>{
    evt.preventDefault();
     //here if you havn't mentioned all three properties then u r in a big trouble
    setResponse({data:response.data,chat:evt.target.value,ischat:true});
    //const socket = socketIOClient(ENDPOINT);
   // socket.emit('chatcreated',{u1:props.user,u2:evt.target.value});
 }
  return (
    <div>
       <div>
          {response.data.map(ele=>
           <button onClick={handleClick} value = {ele}>{ele}</button>
          )}   
       </div>   
    </div>
     );
}