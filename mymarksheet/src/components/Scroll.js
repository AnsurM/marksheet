import React from 'react';
import './Scroll.css';

const Scroll = (props) => {
	
	return (
		<div className = 'scroll' style = {{overflowY: 'scroll', border: '1px solid black', height: '500px', width: '70%', margin: 'auto', marginTop: 10}}>
		{props.children}
		</div>
	);
}

export default Scroll;