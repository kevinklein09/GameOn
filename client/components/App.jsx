import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Map from './Map.jsx';

const App = () =>{
    return (
        <>
            <h1>Welcome to GameOn React App thats built using Webpack and Babel separately.  For the players!!!</h1>
        <nav>
            <Link to="/map">Map</Link>
        </nav>
        </>
    )
}

export default App;  