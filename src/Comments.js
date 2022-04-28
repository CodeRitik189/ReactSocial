import React, { Component } from 'react';
import axios from 'axios';
export default class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
           persons: [],
           content:''
         }
         this.sub = this.sub.bind(this);
         this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() { 
       axios.get(`http://localhost:8001/api/comments/?id=${this.props.post_id}`)
         .then(res => {
           const persons = res.data;
           console.log(persons);
           this.setState({persons:persons});
         })
     }
     handleChange(evt){
        this.setState({content:evt.target.value});
      }
      sub(event){
        event.preventDefault(); 
        var data = {
            content: this.state.content,
            user:this.props.user,
            post:this.props.post_id
        }
        axios.post(`http://localhost:8001/api/post/create-comment`, data)
        .then(res => {
            const persons = res.data;
            console.log(persons);
            this.setState({persons:persons,content:''});
          }).catch();   
      }
  render() {
    return <div>
         <form onSubmit={this.sub}>
            <input type="text" name="content"placeholder="enter_name"value={this.state.content} onChange={this.handleChange} />
            <button type="submit">Comment</button>
        </form>
        <ul>
        { this.state.persons.map(person => 
        <li>{person.content} : {person.post}</li>)}
       </ul>
    </div>;
  }
}
