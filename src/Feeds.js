import React, { Component } from 'react';
import {Route,Link,Switch} from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments'
import './style/post.css'
export default class Feeds extends Component {
 constructor(props){
     super(props);
     this.state = {
        persons: [],
        content:'',
        file:null
      }
      this.sub = this.sub.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleFileChange = this.handleFileChange.bind(this);
 }
 componentDidMount() { 
    axios.get(`http://localhost:8001/api/post`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
        this.setState({persons:persons});
      })
  }
  handleFileChange(evt){
    this.setState({file:evt.target.files[0]});
    console.log(evt.target.files[0]);
  }
  handleChange(evt){
    this.setState({content:evt.target.value});
  }
  sub(event){
    event.preventDefault(); 
    let data = {
        content: this.state.content,
        user:this.props.user,
        file:this.state.file
    }
     console.log(data);
     /*axios.post(`http://localhost:8001/api/create-post`, data)
    .then(res => {
        const persons = res.data;
        console.log(persons);
        this.setState({persons:persons,content:''});
      }); */
    /*let files = this.state.file;*/
    let formData = new FormData();
  
    //Adding files to the formdata
    //formData.append('image', files);
    formData.append('content', this.state.content);
    formData.append('user', this.props.user);
    console.log(formData);
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post("http://localhost:8001/api/create-post",data)
      .then((res) => {
         const persons = res.data;
         console.log(persons);
        this.setState({persons:persons,content:'',file:null});
       }) // Handle the response from backend here
      .catch((err) => { });
  }
  render() {
    return <div>
       <form onSubmit={this.sub} encType="multipart/form-data">
        <input type="file" name="fname" onChange={this.handleFileChange}  />
        <input type="text" name="content"placeholder="enter_name"value={this.state.content} onChange={this.handleChange} required/>
        <button type="submit">Post</button>
       </form>
       <img src={this.state.file} style={{height:"200px",width:"200px"}}/>
        <ul>
        { this.state.persons.map(person =>
          <li className="Post">
            {person.content} : {person.user} 
           {<Comments post_id={person._id} user={this.props.user} />}
          </li>
        )}
        </ul>
    </div>;
  }
}
