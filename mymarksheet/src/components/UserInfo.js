
import React from 'react';

class UserInfo extends React.Component {

		render(){
			
			const {name, rollNo} = this.props.currentData;

			return(
			<div>
			<h1>Semester Performance</h1>
			<h1>Name: {name}</h1>
			<h1>Roll no: {rollNo}</h1>
			</div>
		);
	}
}

export default UserInfo;