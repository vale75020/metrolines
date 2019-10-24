import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component {
  state = {
    data: [],
    from : "",
    to:"",
    id:"",
    isVisible: false
  }

  componentDidMount(){
    axios
    .get("http://restratpws.azurewebsites.net/api/lines/metro")
    .then(response => {
      console.log(response);
      this.setState({
        data: response.data
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
  }

  handleChange = (e) => {
    const {value, name} = e.target
    this.setState({
      [name] : value
    })
    console.log(this.state)
  }

handleSubmit = e => {
  e.preventDefault()
   if (this.state.from !== "" && this.state.to !== "") {
     axios
    .get("http://restratpws.azurewebsites.net/api/lines/metro")
    .then(response => {
      console.log(response);
      this.setState({
        data: response.data
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
     
   }
}

  render() {
    return (
      <div>
        <h1 className="ratp">My RATP</h1>
        <div>
          {this.state.data.map(metro => {
            return (
              <div className="lines" key={metro.id}><img src={metro.image} alt="" />{metro.shortName} - {metro.name}</div>
            )
          })}
        </div>
        <div  className="form">
        <form type="submit" onSubmit={this.onSubmit}>
        <input type="text" name="from" value={this.state.from} onChange={this.handleChange}/><br/><br/>
        <input type="text" name="to" value={this.state.to} onChange={this.handleChange}/><br/><br/>
        <button type="submit" onSubmit={this.onSubmit}>SEARCH</button>
        </form>
        </div>
      </div>
    )
  }
}

