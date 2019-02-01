
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import 'tachyons';
import './Marksheet.css';


let columns = [{
		      dataField: 'rollno',
		      text: 'Roll No'},{
		      dataField: 'subject',
		      text: 'Subject'},{
		      dataField: 'theory',
		      text: 'Theory'},{
		      dataField: 'lab',
		      text: 'Lab'},{
		      dataField: 'total',
		      text: 'Total'},{
		      dataField: 'grade',
		      text: 'Grade'},{
		      dataField: 'gp',
		      text: 'GP'}];
let totalGP = 0.0;
let CGPA = 0.0;
let totalCGPA = 0.0;
let semRec = 0;


class Marksheet extends React.Component{

	constructor(props){
		super(props);

	    this.state = {
	      rollNo: this.props,
	      results: {}
	    }
	}


	UNSAFE_componentWillMount(){

      fetch('http://localhost:3000/results',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      rollNo: this.state.rollNo
      })
    })
    .then(response => response.json())
    .then(results => {
      if(results[0].rollno)
      {
		let state5 = {
			sem1: [],
			sem2: [],
			sem3: [],
			sem4: [],
			sem5: [],
			sem6: [],
			sem7: [],
			sem8: [],
		};

      	for (var i = 0; i < results.length; i++) {
      			var product = {
      				id: i+1,
      				rollno: results[i].rollno,
      				subject: (results[i].subcode + ' --- ' + results[i].subName),
      				theory: results[i].theory,
      				lab: results[i].lab,
      				total: results[i].total,
      				grade: results[i].grade,
      				gp: results[i].gp,
      			}
      			switch(true)
      			{
      				case (results[i].semester === 1):
      				{
		      			state5.sem1.push(product);
		      			break;
      				}
      				case (results[i].semester === 2):
      				{
		      			state5.sem2.push(product);
		      			break;
      				}
      				case (results[i].semester === 3):
      				{
		      			state5.sem3.push(product);
		      			break;
      				}
      				case (results[i].semester === 4):
      				{
		      			state5.sem4.push(product);
		      			break;
      				}
      				case (results[i].semester === 5):
      				{
		      			state5.sem5.push(product);
		      			break;
      				}
      				case (results[i].semester === 6):
      				{
		      			state5.sem6.push(product);
		      			break;
      				}
      				case (results[i].semester === 7):
      				{
		      			state5.sem7.push(product);
		      			break;
      				}
      				case (results[i].semester === 8):
      				{
		      			state5.sem8.push(product);
		      			break;
      				}
      				default:
      					break;
      			}
      	}
//      		console.log(Object.values(state5)[0][0].gp);
      		for(var k = 0; k < Object.values(state5).length; k++)
      		{
      			if(Object.values(state5)[k][0])
      			{
      				semRec++;
		      		for(var j = 0; j < Object.values(state5)[k].length; j++)
		      		{
		      			totalGP = totalGP + parseFloat(Object.values(state5)[k][j].gp);
		      		}      			
		      			CGPA = parseFloat(((totalGP)/(Object.values(state5)[k].length)).toFixed(2));
			   			totalCGPA = totalCGPA + parseFloat(CGPA);
		      				
		      				product = {
		      				id: i+1,
		      				rollno: "-",
		      				subject: "-",
		      				theory: "-",
		      				lab: "-",
		      				total: "-",
		      				grade: "CGPA",
		      				gp: CGPA,
		      			}

		      			Object.values(state5)[k].push(product);
			      		totalGP = 0;
		      	}
      		}
      		totalCGPA = totalCGPA / semRec;
   			console.log(totalCGPA);
			this.setState({
			signInEmail: this.state.signInEmail,
			results: state5
		})
	}
	})
}

	render(){	
		let key = 0;	
	     if(this.state.results.sem1)
	    {
	 		const display = [];

    		for(var i = 0; i < Object.keys(this.state.results).length; i++)
    		{

			     if(Object.values(this.state.results)[i][0])
				{
	    			display.push(
						<div key={i.toString()} className = 'flex data'>
							<div className="container" style={{ marginTop: 20 }}>
							        <h3 className = 'data'>Semester-{(i+1).toString()}</h3>
							        <BootstrapTable 
							        striped
							        hover
							        keyField='id' 
							        data={ Object.values(this.state.results)[i]} 
							        columns={ columns } />
						    </div>
						</div>
	    			);
	    		}
	    		key = i;
	    	}

		    return(
				<div className = 'flex-column items-center'>
					{
					<div>
					{display}
					<h3> Your Overall GPA after {semRec} semesters is {totalCGPA}</h3>
					</div>
					}
				</div>
		    	);
		}
		else {
	    return(
	    	<div>
	    	<h1>No results yet..... :(</h1>
	    	</div>
	    	);
		}
	}

}

export default Marksheet;
