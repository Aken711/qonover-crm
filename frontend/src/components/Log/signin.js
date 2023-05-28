import React from 'react';

const signin = ({handleClick}) => { 
    return (
        <div className='sign-in'>
            <h2>Login</h2>

            <label htmlFor="emailSignInInput" className="form-label">Email address</label>
            <input type="email" className="form-control" id="emailSignInInput" placeholder="name@example.com"></input>
            
            <label htmlFor="passwordSignInInput" className="form-label">Password</label>
            <input type="password" id="passwordSignInInput" className="form-control" aria-labelledby="passwordHelpBlock"></input>

            <button type="submit" className='btn-login'>Connect</button>
            <span className='link-to-signin' onClick={handleClick}>No account yet ? Sign up right now</span>
        </div>
    );
};

export default signin;