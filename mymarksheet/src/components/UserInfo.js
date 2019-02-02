import React from 'react';

class UserInfo extends React.Component {

	constructor(props)
	{
		super(props);
	}


	render()
	{
		const {name , rollNo} = this.props.currentData;
		return(
			<div className = 'center'>
			<h1>Semester Performance</h1>
			<h2>Name: {name}</h2>
			<h3>Roll No: {rollNo} </h3>
			</div>
		);
	}

}


export default UserInfo;