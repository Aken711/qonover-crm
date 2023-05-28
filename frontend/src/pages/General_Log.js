import React, { useState } from 'react';
import Index from "../components/Log/index"
import Signin from "../components/Log/signin"
import Navigations from '../components/Navigations';
import NavigationsFooter from "../components/NavigationsFooter"

const Log = () => {
    const [showSignIn, setShowSignIn] = useState(true); // par défaut, on affiche SignIn
  
  const handleClick = () => {
    setShowSignIn(!showSignIn); // lorsque vous cliquez sur le lien, inversez l'état de showSignIn
  }
  
    return (
        <div className="login-page">
            <Navigations />
            <div className="log-container">
            {showSignIn ? <Signin handleClick={handleClick} /> : <Index handleClick={handleClick} />}
            </div>
            <NavigationsFooter />
        </div>
    );
};

export default Log;