import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class About extends Component {
  constructor(props){
    super(props);
    this.state = {
        auth:false,
        name:'',
        email:'',
        password:'',
        confirm_password:''
    }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleClick = this.handleClick.bind(this);
}
handleClick(evt){
   var data = {
     name:this.state.name,
     email: this.state.email,
     password:this.state.password,
     confirm_password:this.state.confirm_password
   }
   console.log(data);
    axios.post(`http://localhost:8001/api/user/create`,data)
        .then(res => {
          const dat = res.data;
          console.log(dat);
          if(data){
            console.log("user created");
          }
    });
    this.setState({name:'',email:'',password:'',confirm_password:''});
}
handleChange1(evt){
  this.setState({name:evt.target.value});
}
handleChange2(evt){
  this.setState({email:evt.target.value});
}
handleChange3(evt){
  this.setState({password:evt.target.value});
}
handleChange4(evt){
  this.setState({confirm_password:evt.target.value});
}
  render() {
    return (
    <div>
    <input type="text" name="name" placeholder="Your Name" value={this.state.name} onChange={this.handleChange1} required />
    <input type="email" name="email" placeholder="Your Email" value={this.state.email} onChange={this.handleChange2} required />
    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange3} required />
    <input type="password" name="confirm_password" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.handleChange4} required />
    <button onClick={this.handleClick} >signup</button>
    </div>
    );
  }
}