import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
// import Map from './Map.jsx';
// import Profile from './Profile.jsx';
// import Listings from './Listings.jsx';
// import CreateEvents from './CreateEvent.jsx';
// import Login from './Login.jsx';

const App = () => (
        <>
            <h1>Welcome to GameOn. For the players!!!</h1>
        <nav>
            <Link to="/login">LOGIN</Link>{'   '}
            <Link to="/map">Map</Link>{'   '}
            <Link to="/listings">See Events</Link>{'   '}
            <Link to="/postEvent">Create new Event</Link>{'   '}
            <Link to="/profile">Your Profile</Link>{'   '}
        </nav>
        <Outlet/>
        </>
);

export default App;
