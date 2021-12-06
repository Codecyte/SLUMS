import React from 'react';
import logo from './logo.png'

function Header(){
    return(
        <div className="header">
            <img className="logo-image" src={logo} alt="logo"></img>
            
        </div>
    )
}


export default Header;