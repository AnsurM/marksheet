import React from 'react';

const Scroll1 = (props) => {
	
	return (
		<div style = {{overflowY: 'scroll', border: '1px solid black', height: '400px', width: '70%', margin: 'auto', marginTop: 100}}>
		{props.children}
		</div>
	);
}

export default Scroll1;