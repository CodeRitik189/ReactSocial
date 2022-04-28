import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link ,Switch,Route} from 'react-router-dom';
import Profile from './Profile';
import './App.css';
import Home from './Home'
class App extends Component {
  constructor(props){
  super(props);
    this.state = {
        auth:false,
        user:''
    }
    this.setUser = this.setUser.bind(this);
  }
  setUser(userid){
    if(userid!='')
    this.setState({auth:true,user:userid});
    else
    this.setState({auth:false,user:userid});
  }
 render(){
  return(
    <div className="App">
      {!this.state.auth&&<Home user={this.state.user} setUser={this.setUser} />}
      {this.state.auth&&<Profile user={this.state.user} setUser={this.setUser} />}
    </div>
  );
 }
}

export default App;
