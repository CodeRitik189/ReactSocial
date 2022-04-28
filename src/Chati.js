import React, { Component } from 'react';
import axios from 'axios'
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:8001';
export default class Chati extends Component {

    constructor(props){
         super(props);
        this.state = {
           persons: [],
           content:'',
           user:[]
         }
         this.sub = this.sub.bind(this);
         this.handleChange = this.handleChange.bind(this);
         //this.handleData = this.handleData.bind(this);
    }
    componentDidMount() {  
      console.log("bna hu ",this.props.user);
      //  axios.post(`http://localhost:8001/api/oldchat`,data)
      //    .then(res => {
      //      const persons = res.data;
      //      console.log("old msgs are",persons);
      //      this.setState({persons:persons});
      //    });
         const socket = io(ENDPOINT);
         socket.on('emitmsg',({id1,id2,content})=>{
          if((id1===this.props.u1&&id2===this.props.u2)||(id2===this.props.u1&&id1===this.props.u2)){
           console.log("aya h yha ",content)
           this.setState({persons:[...this.state.persons,content]});
          }
         });
     }
     componentDidUpdate(prevProps, prevState) {
      if (prevProps.u2 !== this.props.u2){
        // Now fetch the new data here.
        this.setState({persons:[]});
      }
     }
     sub(event){
      event.preventDefault(); 
      var data = {
          content: this.state.content,
          id1:this.props.u1,
          id2:this.props.u2
      }
      axios.post(`http://localhost:8001/api/chat/sendmessage`, data)
      .then(res => {
           console.log("messagw sent");
        });
        this.setState({content:''});
    }
     handleChange(evt){
       this.setState({content:evt.target.value});
     }
     render() {
       return <div>
         <p>chat of {this.props.u1} and {this.props.u2}</p>
           <input type="text" name="content"placeholder="enter_name"value={this.state.content} onChange={this.handleChange} />
           <button onClick={this.sub}>Post</button>
           <ul>
           { this.props.user.map(person =>
             <li >
               {person} 
             </li>
           )}
           { this.state.persons.map(person =>
             <li >
               {person} 
             </li>
           )}
           </ul>
       </div>;
  }
}
