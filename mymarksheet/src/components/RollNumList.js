import React from 'react';
import './bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import Scroll1 from './Scroll1';
import './RollNumList.css';

let columns = [{
		      dataField: 'rollno',
		      text: 'Roll No'},{
		      dataField: 'email',
		      text: 'Email'},{
		      dataField: 'name',
		      text: 'Name'},];

let resList = [];

class RollNumList extends React.Component
{
		constructor(props)
		{
			super(props);

			this.state = {
				list: {
				}
			}
		}

	UNSAFE_componentWillMount(){
	    	let tL = [];

			      fetch('http://localhost:3000/rollno',{
			      method: 'post',
			      headers: {'Content-Type': 'application/json'}
			    })
			    .then(response => response.json())
			    .then(results => {

		      	for (var i = 0; i < results.length; i++) {
	      			var product = {
	      				id: i+1,
	      				rollno: results[i].rollno,
	      				email: results[i].email,
	      				name: results[i].name
	      			}
	      			tL[i] = (product);
					resList[i] = tL[i];
				}
				this.setState({
					list: resList
				})
			})
			.catch(err => alert('error getting data'))
	}

	  onGoBack = () => {
	    this.props.ChangeState2('Administrator','');
	  }

	render(){
		if(this.state.list.length)
		{
			return(
				<div>
				<Scroll1>
						<div className = 'flex data rollno center'>
							<div className="container">
							        <h3 className = 'data'>Roll No List</h3>
							        <BootstrapTable 
							        striped
							        hover
							        keyField='id' 
							        data={(this.state.list)} 
							        columns={ columns } />
						    </div>
						</div>
				</Scroll1>
		          <div className="flex center">
		            <input 
		            onClick = {this.onGoBack}
		            className="flex center input b ph3 pv2 input-reset ba b--black hover-bg-green grow pointer f6 dib mt3" 
		            type="submit" 
		            value="Go Back"/>
		          </div>
				</div>
			);
		}
		else{
			return(
				<h2 className = 'center'>Loading.....</h2>
				);
		}
	}
}

export default RollNumList;