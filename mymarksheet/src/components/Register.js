import React from 'react';

class Register extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        email: '',
        password: '',
        name:''
      }

    }

    onNameChange = (event) => {
      this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
      this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
      this.setState({password: event.target.value});
    }

    hasNumber = (myString) => {
      return /\d/.test(myString);
    }

    onSubmitRegistration = () => {

      const {email, password, name} = this.state;
      if(!email || !password || !name)
      {
        if(!email)
        {
          alert("Email field can't be empty");
        }
        else if(!password)
        {
          alert("Passwod field can't be empty");
        }
        if(!name)
        {
          alert("Name field can't be empty");
        }
      }
      else if(this.hasNumber(name))
      {
        alert("Name can only contain alphabets.");
      }
      else
      {

        fetch('http://localhost:3000/register',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          })
        })
        .then(response => response.json())
        .then(user => {
          console.log(user);
          if(user === true)
          {        
            alert("Registration successful!");
            this.props.ChangeState2('Administrator','');
          }
          else if (user === false)
          {
            alert("Error entering student!");
          }
          else {
            alert("This user already is registered!");
          }
        })

      }
  }


    render (){
      return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt1">
              <label className="db fw6 lh-copy bg-grey f6" htmlFor="name">Name</label>
              <input 
              className="entry pa2 input-reset ba hover-bg-black  w-100" 
              type="text" 
              name="name"  
              id="name"
              onChange={this.onNameChange}
              />
            </div>
            <div className="mt1">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
              className="entry pa2 input-reset ba bg-grey hover-bg-black  w-100" 
              type="email" 
              name="email-address"  
              id="email-address"
              onChange={this.onEmailChange}
              />
            </div>
            <div className="mv1">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
              className="entry b pa2 input-reset ba bg-transparent hover-bg-black w-100" 
              type="password" 
              name="password"  
              id="password"
              onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input 
            onClick = {this.onSubmitRegistration}
            className="input b ph3 pv2 input-reset ba b--black hover-bg-green grow pointer f6 dib" 
            type="submit" 
            value="Register"/>
          </div>
        </div>
      </main>
      </article>
    );

  }

}

export default Register;