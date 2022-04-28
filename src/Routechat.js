import React, { Component } from 'react';
import { Link ,Switch,Route} from 'react-router-dom';
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
         <nav>
         { this.state.persons.map(ele =>
          <Link to={`/Routechat/${ele}`} >{ele}</Link>
         )}
        </nav>
        <Switch>
        {this.state.persons.map(ele =>
         <Route  exact path={`/Routechat/${ele}`} element={()=><Chati u1={this.props.user} u2={ele} user={["hi"]}/>}/>
        )}
        </Switch>
    </div>;
  }
}