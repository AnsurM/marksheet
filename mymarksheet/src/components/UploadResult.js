import React from 'react';
import Register from './Register';

const initialState = {
      rollno: 0,
      subcode: '',
      theory: 0,
      lab: 0,
      total: 0,
      grade: '',
      gp: 0
}

class UploadResult extends React.Component {

  constructor(props){
    super(props);
    this.state = initialState;

  }

  onRollNoChange = (event) => {
    this.setState({rollno: parseInt(event.target.value,10)});
  }
  onSubCodeChange = (event) => {
    this.setState({subcode: event.target.value});
  }
  onTheoryChange = (event) => {
    this.setState({theory: parseInt(event.target.value,10)});
  }
  onLabChange = (event) => {
    this.setState({lab: parseInt(event.target.value,10)});
  }

  onSignOut = () => {
    this.props.ChangeState2('','signin');
  }

  onRegister = () => {
    this.props.ChangeState2('','register');
  }

  onGetRollNoList = () => {
    this.props.ChangeState2('Administrator','rollnolist');
  }

  onSubmitResult = () => {

    let {rollno, subcode,theory, lab} = this.state;

    if(theory === '-')
    {
      theory = 0;
    }
    if(lab === '-')
    {
      lab = 0;
    }

    if((!rollno) || (!subcode))
    {
      alert('Invalid form entry!');
    }
    else
    {

    let calcTotal = parseInt(this.state.theory,10) + parseInt(this.state.lab,10);
    let calcGrade = '';
    let calcGP = 0.0;

    calcTotal = parseInt(calcTotal, 10);

      if(calcTotal > 49)
      {

      if(calcTotal < 53)
      {
        calcGrade = 'D';
        calcGP = 1.0;
        
      }
      else if (calcTotal < 57)
      {
        calcGrade = 'D+';
        calcGP = 1.4;
        
      }
      else if (calcTotal < 61)
      {
        calcGrade = 'C-';
        calcGP = 1.8;
        
      }
      else if (calcTotal <= 63)
      {
        calcGrade = 'C';
        calcGP = 2.0;
        
      }
      else if (calcTotal <= 67)
      {
        calcGrade = 'C+';
        calcGP = 2.4;
        
      }
      else if (calcTotal <= 70)
      {
        calcGrade = 'B-';
        calcGP = 2.8;
        
      }
      else if (calcTotal <= 74)
      {
        calcGrade = 'B';
        calcGP = 3.0;
        
      }
      else if (calcTotal < 80)
      {
        calcGrade = 'B+';
        calcGP = 3.4;
        
      }
      else if (calcTotal <= 84)
      {
        calcGrade = 'A-';
        calcGP = 3.8;
        
      }
      else if (calcTotal <= 89)
      {
        calcGrade = 'A';
        calcGP = 4.0;
        
      }
      else if (calcTotal >= 90)
      {
        calcGrade = 'A+';
        calcGP = 4.0;
      }
    }
      else      
      {
        console.log('default runs');
        calcGrade = 'FAILS';
        calcGP = 0.0;
      }

    this.setState(Object.assign(this.state, 
      {total: calcTotal,
       grade: calcGrade,
       gp: calcGP
      }
      ));


      fetch('http://localhost:3000/uploadresults',{
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      rollno: this.state.rollno,
      subcode: this.state.subcode,
      theory: this.state.theory,
      lab: this.state.lab,
      total: this.state.total,
      grade: this.state.grade,
      gp: this.state.gp 
      })
    })
    .then(response => response.json())
    .then(result => {
        alert(result);
    })
    .catch(err => console.log('results were not uploaded'))

  }
}

  render(){


    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="uploadData" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Upload Marks</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Roll No</label>
              <input 
              className="entry pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="number" 
              name="rollno"  
              id="rollno"
              onChange = {this.onRollNoChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Subject Code</label>
              <input 
              className="entry pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="text" 
              name="SubjectCode"  
              id="subjectCode"
              onChange = {this.onSubCodeChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Theory Marks</label>
              <input 
              className="entry pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="number" 
              name="TheoryMarks"  
              id="theoryMarks"
              onChange = {this.onTheoryChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Lab Marks</label>
              <input 
              className="entry pa2 input-reset ba bg-transparent hover-bg-black w-100" 
              type="number" 
              name="LabMarks"  
              id="labMarks"
              onChange = {this.onLabChange}
              />
            </div>
          </fieldset>
          <hr />
          <div className="">
            <input 
            onClick = {this.onSubmitResult}
            className="input b ph3 pv2 input-reset ba b--black hover-bg-green grow pointer f6 dib" 
            type="submit" 
            value="Upload Result"/>
          </div>
          <hr />
          <div className="">
            <input 
            onClick = {this.onSignOut}
            className="input b ph3 pv2 input-reset ba b--black hover-bg-green grow pointer f6 dib" 
            type="submit" 
            value="Sign Out"/>
          </div>
          <hr />
          <div>
            <input 
            onClick = {this.onRegister}
            className="input b ph3 pv2 input-reset ba b--black hover-bg-green grow pointer f6 dib mh3" 
            type="submit" 
            value="Register New Student"/>
            <input 
            onClick = {this.onGetRollNoList}
            className="input b ph3 pv2 input-reset ba b--black hover-bg-green grow pointer f6 dib mh3" 
            type="submit" 
            value="Student Roll No"/>
          </div>
        </div>
      </main>
      </article>

  	 );
  }
}
export default UploadResult;