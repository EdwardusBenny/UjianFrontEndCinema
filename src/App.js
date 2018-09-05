import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Headers from './component/Header';
import HomePage from './component/Homepage';
import LoginPage from './component/Login';
import RegisPage from './component/Register';
import Book from './component/Book';
import Book2 from './component/Book2';
import Book3 from './component/Book3';
class App extends Component {
  state = {sudahlogin:false, uname:"Briana"}
  
  fungsilogin = () =>
  {
    this.setState({sudahlogin:true, uname:"Briana"})
  }
  render() {
    console.log("render jalan");
 
    return (
      <div className="App">
            <Headers logIn={this.state.sudahlogin} username={this.state.uname} />
            {/* 
            <br/><br/>
            <input type="button" className="btn btn-succes" value="login" onClick={this.fungsilogin}/>
            <Albumlist/>
            <Lalalist/> */}
            <br/><br/><br/><br/>
          <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/Login" component={LoginPage}/>
          <Route path="/Regis" component={RegisPage}/>
          <Route path="/Book" component={Book}/>
          <Route path="/Book2" component={Book2}/>
          <Route path="/Book3" component={Book3}/>
          </div>
      </div>
        
          
    );
  }
}

export default App;
