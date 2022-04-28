import React, { Component } from 'react';
import {Route,Link,Switch} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import About from './About'
export default class Home
 extends Component {
    constructor(props){
       super(props);
       this.state = {
           id:""
       }
       this.setAuth = this.setAuth.bind(this);
    }
    setAuth(username){
       this.props.setUser(username);
    }
  render() {
    return(
    <div className="root">
        <nav style={{backgroundColor:"black",}}>
          <Link to='/About'>About</Link>
          <Link to='/Register'>Register</Link>
          <Link to='/Login'>Login</Link>
        </nav>
          <Switch>
              <Route exact path='/About' component={About}/>
              <Route exact path='/Register' render={()=><Register user={this.props.user}/>}/>
              <Route exact path='/Login' render={()=><Login setAuth={this.setAuth}/>}/>
           </Switch>
    </div>
    )
  }
}
