import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link ,Switch,Route} from 'react-router-dom';
import Profile from './Profile';
import axios from 'axios';
/*<form action="/users/create-session" method="POST">
   
     </form>*/
export default class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            auth:false,
            email:'',
            password:''
        }
        this.handleAuth = this.handleAuth.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
    handleAuth(username){
        var data = {
            email: this.state.email,
            password:this.state.password
        }
        axios.post(`http://localhost:8001/api/user/verify`,data)
        .then(res => {
          const dat = res.data;
          console.log(dat);
          if(data!='')
             this.props.setAuth(dat);
        })
        this.setState({email:'',password:''});
    }
    handleChange1(evt){
        this.setState({email:evt.target.value});
    }
    handleChange2(evt){
        this.setState({password:evt.target.value});
    }
  render() {
    return (
    <div>
      <div>
       <input type="email" name="email" placeholder="Email" onChange={this.handleChange1} required />
       <input type="password" name="password" placeholder="Password" onChange={this.handleChange2} required />
       <button onClick={this.handleAuth}>Login</button>
      </div>
     </div>
    )
  }
}