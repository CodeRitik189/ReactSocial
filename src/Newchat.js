import React, { Component } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import Chati from './Chati';
export default class Newchat extends Component {
 constructor(props){
     super(props);
     this.state = {
        persons: [],
        content:'',
        ischat:false,
        chat:'',
        user:[]
      }    
     // this.sub = this.sub.bind(this);
      this.handleClick= this.handleClick.bind(this);
 }
 componentDidMount(){ 
    const ENDPOINT = 'http://localhost:8001';
    const socket = io(ENDPOINT);
      socket.on("FromAPI", data => {
        this.setState({persons:data});
      });
 }
  
  handleClick(evt){
    evt.preventDefault();
    console.log(evt.target.value);
    var data = {
        id1:this.props.user,
        id2:evt.target.value
    }
    axios.post(`http://localhost:8001/api/createchat`, data)
    .then(res => {
         this.setState({ischat:true,chat:evt.target.value});
      });
      axios.post(`http://localhost:8001/api/oldchat`,data)
      .then(res => {
        const user = res.data;
        console.log("old msgs are",user);
        this.setState({user:user});
      });
  }
  render() {
    return <div>
        { this.state.persons.map(ele =>
         <button  onClick={this.handleClick} value = {ele}>{ele}</button>
        )}
        {this.state.ischat&&<Chati u1={this.props.user} u2={this.state.chat} user={this.state.user}/>}
    </div>;
  }
}