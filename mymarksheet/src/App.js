import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';
import UserInfo from './components/UserInfo';
import Marksheet from './components/Marksheet';
import Scroll from './components/Scroll';
import SignIn from './components/SignIn';
import RollNumList from './components/RollNumList';
import Register from './components/Register';
import SignOut from './components/SignOut';
import UploadResult from './components/UploadResult';
import 'tachyons';

class App extends Component {

  constructor(){
    super();
    this.state = {
      route: 'signin',
      name: '',
      email: '',
      rollNo: ''
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route })
  }

  ChangeState = (route, email, name, rollNo) => {
    this.setState({route: route, email: email, name: name, rollNo: rollNo})
  }

  ChangeState2 = (name,route) => {
    this.setState({route: route, email: this.state.email, name: name, rollNo: this.state.rollNo})
  }

  render() {
    
    if(this.state.name === 'Administrator')
    {
        if(this.state.route === 'rollnolist')
        {
          return(
            <div>
            <RollNumList ChangeState2 = {this.ChangeState2}/>
            </div>
          );          
        }
        else
        {
          return(
            <div className = 'admin'>
            <UploadResult ChangeState2={this.ChangeState2}/>
            </div>
            );
        }
    }
    else if(this.state.route === 'signin')
    {
    return (
          <div className = 'signin'>
          <SignIn ChangeState={this.ChangeState}/>
          </div>
    );
    }
    else if(this.state.route === 'register')
    {
    return (
          <div className = 'register'>
          <Register ChangeState2 = {this.ChangeState2} />
          </div>
    );
    }
    else if(this.state.route === 'home') 
    {
    
      return (
          <div>
          <UserInfo currentData={this.state} ChangeState2={this.ChangeState2}/>
          <SignOut ChangeState2 = {this.ChangeState2}/>
          <Scroll>
          <Marksheet rollNo={this.state.rollNo} ChangeState2 = {this.ChangeState2}/>
          </Scroll>
          </div>
           );
  }
  }
}

export default App;
