import socketIOClient from "socket.io-client";
import React,{ useEffect, useState } from "react";
const ENDPOINT = "http://127.0.0.1:8001";
const socket = socketIOClient(ENDPOINT);
export default function Chat(props) {
    const [response, setResponse] = useState('');
    const [msg, setmsg] = useState([]);
  useEffect(() => {
    socket.emit('chatcreated',{u1:props.u1,u2:props.u2});
    socket.on('oldmessage',data=>{
        console.log("lod messages are: ",data);
        setmsg(data);
    });
    socket.on('newmessage',({val,id1,id2})=>{
        if((id1===props.u1&&id2===props.u2)||(id2===props.u1&&id1===props.u2)){
           var temp = msg;
           temp.push(val);
           setmsg(temp);
        }
    });
  }, [msg]);
   
  /*socket.on('newmessage',({val,id1,id2})=>{
    if((id1===props.u1&&id2===props.u2)||(id2===props.u1&&id1===props.u2)){
       var temp = msg;
       temp.push(val);
       setmsg(temp);
    }
  });*/
   /*socket.on('oldmessage',(msgs)=>{
    console.log("lod messages are: ",msgs);
    setmsg(msgs[props.u1][props.u2]);
   });*/
    const handleChange=(evt)=>{
         evt.preventDefault();
         setResponse(evt.target.value);
    }
    const handleForm=(evt)=>{
        evt.preventDefault();
        socket.emit('message-send',{id1:props.u1,id2:props.u2,val:response});
        setResponse('');
    }
  return(
         <div>
           this is chat of{props.u1} and { props.u2}
          <div>
           <input type="text" name="content" onChange={handleChange}value={response} required />
           <button onClick={handleForm}>send</button>
          </div>
             {msg.map(ele=>{
                <li>{ele}</li>
             })}
         </div>
         )
 }

