
import React from 'react';
import './bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import 'tachyons';
import './Marksheet.css';

let state1 = {
    products: [
      {
        id: 1,
        subject: 'ICS',
        'text': 3.0
      }
      ,
      {
        id: 2,
        subject: 'English-1',
        'text': 3.0
      }
      ,
      {
        id: 3,
        subject: 'Islamiat',
        'text': 3.0
      }
      ,
      {
        id: 4,
        subject: 'PST',
        'text': 3.0
      }
      ,
      {
        id: 5,
        subject: 'Maths-1',
        'text': 3.0
      }
      ,
      {
        id: 6,
        subject: 'Subject-6',
        'text': 3.0
      }
      ,
      {
        id: 7,
        subject: 'Subject-7',
        'text': 3.0
      }
   ]  
  ,
    
    columns: [{
      dataField: 'subject',
      text: 'Subjects'
    }
    ,
    {
      dataField: 'gpa',
      text: 'GPA'
    }
   ]
}

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


class Marksheet extends React.Component{

	constructor(props){
		super(props);

	    this.state = {
	      rollNo: this.props,
	      states: {
	      	Semester1: {},
	      	Semester2: {},
	      	Semester3: {},
	      	Semester4: {},
	      	Semester5: {},
	      	Semester6: {},
	      	Semester7: {},
	      	Semester8: {},
	      }
	    }
	}


	UNSAFE_componentWillMount(){

		let semester = 0;

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
      	console.log('got results! ' + results[0]);
		let state5 = {
			products: [],
		    columns: [{
		      dataField: 'rollno',
		      text: 'Roll No'
		    }
		    ,
		    {
		      dataField: 'subject',
		      text: 'Subject'
		    }
		    ,
		    {
		      dataField: 'theory',
		      text: 'Theory'
		    }
		    ,
		    {
		      dataField: 'lab',
		      text: 'Lab'
		    }
		    ,
		    {
		      dataField: 'total',
		      text: 'Total'
		    }
		    ,
		    {
		      dataField: 'grade',
		      text: 'Grade'
		    }
		    ,
		    {
		      dataField: 'gp',
		      text: 'GP'
		    }
		   ]
		};

      	for (var i = 0; i < results.length; i++) {
      		console.log(results[i]);
      			var product = {
      				id: i+1,
      				rollno: results[i].rollno,
      				subject: (results[i].subcode + '-' + results[i].subName),
      				theory: results[i].theory,
      				lab: results[i].lab,
      				total: results[i].total,
      				grade: results[i].grade,
      				gp: results[i].gp
      			}
      			state5.products.push(product);
//				console.log('new ' + this.state.states.Semester1[0].products[0].subject);
      	}
			this.state.states.Semester1.products = (state5.products);				
//				console.log(this.state.states.Semester1.products);
			this.setState({
			signInEmail: this.state.signInEmail,
			states: this.state.states
		})

	}
	})
}

	render(){		
	     if(this.state.states.Semester1.products)
	    {
			const {Semester1,Semester2,Semester3,Semester4,Semester5,Semester6,Semester7, Semester8} = this.state.states;
	 		console.log('renderrrr ' + Semester1.products[0].subject);

	 		const display = [];

    		for(var i = 0; i < Object.keys(this.state.states).length; i++)
    		{
			     if(Object.values(this.state.states)[i].products)
				{
	    			display.push(
						<div key={i.toString()} className = 'flex'>
							<div className="container" style={{ marginTop: 20 }}>
							        <h3 >Semester-{(i+1).toString()}</h3>
							        <BootstrapTable 
							        striped
							        hover
							        keyField='id' 
							        data={ Object.values(this.state.states)[i].products } 
							        columns={ columns } />
						    </div>
						</div>
	    			);
	    		}
	    	}

		    return(
				<div className = 'flex-column items-center'>
					{
					<div>
					{display}		
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


{
/*
	if(results.state[7])
	{
	return(
		<div className = 'flex-column items-center'>
			{
			<div>		
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3 >Semester-1</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[0].products } 
				        columns={ results.state[0].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-2</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[1].products } 
				        columns={ results.state[1].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-3</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[2].products } 
				        columns={ results.state[2].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-4</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[3].products } 
				        columns={ results.state[3].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-5</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[4].products } 
				        columns={ results.state[4].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-6</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[5].products } 
				        columns={ results.state[5].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-7</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[6].products } 
				        columns={ results.state[6].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-8</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[7].products } 
				        columns={ results.state[7].columns } />
			    </div>
			</div>
			</div>
			}
		</div>
	);
	}
	else if(results.state[6])
	{
		return(
		<div className = 'flex-column'>
			{
			<div>		
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-1</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[0].products } 
				        columns={ results.state[0].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-2</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[1].products } 
				        columns={ results.state[1].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-3</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[2].products } 
				        columns={ results.state[2].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-4</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[3].products } 
				        columns={ results.state[3].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-5</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[4].products } 
				        columns={ results.state[4].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-6</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[5].products } 
				        columns={ results.state[5].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-7</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[6].products } 
				        columns={ results.state[6].columns } />
			    </div>
			</div>
			</div>
			}
		</div>
		);
	}
	else if(results.state[5])
	{
		return(
		<div className = 'flex-column'>
			{
			<div>		
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-1</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[0].products } 
				        columns={ results.state[0].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-2</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[1].products } 
				        columns={ results.state[1].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-3</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[2].products } 
				        columns={ results.state[2].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-4</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[3].products } 
				        columns={ results.state[3].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-5</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[4].products } 
				        columns={ results.state[4].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-6</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[5].products } 
				        columns={ results.state[5].columns } />
			    </div>
			</div>
			</div>
			}
		</div>
		);
	}
	else if(results.state[4])
	{
		return(
		<div className = 'flex-column'>
			{
			<div>		
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-1</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[0].products } 
				        columns={ results.state[0].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-2</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[1].products } 
				        columns={ results.state[1].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-3</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[2].products } 
				        columns={ results.state[2].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-4</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[3].products } 
				        columns={ results.state[3].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-5</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[4].products } 
				        columns={ results.state[4].columns } />
			    </div>
			</div>
			</div>
			}
		</div>
		);
	}
	else if(results.state[3])
	{
		return(
		<div className = 'flex-column'>
			{
			<div>		
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-1</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[0].products } 
				        columns={ results.state[0].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-2</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[1].products } 
				        columns={ results.state[1].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-3</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[2].products } 
				        columns={ results.state[2].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-4</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[3].products } 
				        columns={ results.state[3].columns } />
			    </div>
			</div>
			<div className = 'flex'>
			</div>
			</div>
			}
		</div>
		);
	}
	else if(results.state[2])
	{
		return(
		<div className = 'flex-column'>
			{
			<div>		
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-1</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[0].products } 
				        columns={ results.state[0].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-2</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[1].products } 
				        columns={ results.state[1].columns } />
			    </div>
			</div>
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-3</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[2].products } 
				        columns={ results.state[2].columns } />
			    </div>
			</div>
			</div>
			}
		</div>
		);
	}
	else if(results.state[1])
	{
		return(
		<div className = 'flex-column'>
			{
			<div>		
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-1</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[0].products } 
				        columns={ results.state[0].columns } />
			    </div>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-2</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[1].products } 
				        columns={ results.state[1].columns } />
			    </div>
			</div>
			</div>
			}
		</div>
		);
	}
	else if(results.state[1])
	{
		return(
		<div className = 'flex-column'>
			{
			<div>		
			<div className = 'flex'>
				<div className="container" style={{ marginTop: 20 }}>
				        <h3>Semester-1</h3>
				        <BootstrapTable 
				        striped
				        hover
				        keyField='id' 
				        data={ results.state[0].products } 
				        columns={ results.state[0].columns } />
			    </div>
			</div>
			</div>
			}
		</div>
		);
	}
	else{
		return(
		<h1>You have no semester results uploaded!</h1>
		);
	}
*/
}
