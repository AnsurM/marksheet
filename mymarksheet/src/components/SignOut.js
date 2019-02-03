import React from 'react';

const SignOut = ({ChangeState2}) => {
	return (
			<div>
                 <input 
                 onClick = {() => ChangeState2('','signin')}
                 className="input b ph3 pv2 input-reset ba b--black hover-bg-green grow pointer f6 dib flex-column items-center sub" 
                 type="submit" 
                 value="Sign Out"/>
			</div>
		);

}

export default SignOut;


