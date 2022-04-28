import React, { Component } from 'react';
import { Link ,Switch,Route} from 'react-router-dom';
//import Chats from './Chats'
import Feeds from './Feeds'
import Newchat from './Newchat'
//import Routechat from './Routechat'
export default class Profile
 extends Component {
   constructor(props){
     super(props);
   }
  render() {
    return(
     <div>
        <p>this is Profile of {this.props.user}</p>
        <nav>
          <Link to='/Feeds' >Feeds</Link>
          <Link to='/Newchat'>Chats</Link>
        </nav>
           <Switch>
              <Route exact path='/Feeds' render={()=><Feeds user={this.props.user}/>}/>
              <Route exact path='/Newchat' render={()=><Newchat user={this.props.user}/>}/>
           </Switch>
           <button onClick={()=>{this.props.setUser('')}}> LogOut</button>
     </div>
    );
  }
}
