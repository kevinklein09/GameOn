import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


const App = () =>{
    return (
        <>
            <h1>Welcome to GameOn React App thats built using Webpack and Babel separately.  For the players!!!</h1>
        <nav>
            <Link to="/login">LOGIN</Link>
            <Link to="/map">Map</Link>
            <Link to="/listings">See Events</Link>
            <Link to="/postEvent">Create new Event</Link>
            <Link to="/profile">Your Profile</Link>
        </nav>
        </>
    )
}

export default App;  