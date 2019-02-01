import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';
import UserInfo from './components/UserInfo';
import Marksheet from './components/Marksheet';
import Scroll from './components/Scroll';
import SignIn from './components/SignIn';
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

  render() {
    
    if(this.state.name === 'Administrator')
    {
        return(
          <div>
          <UploadResult />
          </div>
          );
    }
    else if(this.state.route === 'signin')
    {
    return (
          <div>
          <SignIn ChangeState={this.ChangeState}/>
          </div>
    );
    }
    else if(this.state.route === 'home') 
    {
    
      return (
          <div>
          <div className = 'center'>
          <UserInfo currentData={this.state}/>
          </div>
          <Scroll>
          <Marksheet rollNo={this.state.rollNo}/>
          </Scroll>
          </div>
           );
  }
  }
}

export default App;
