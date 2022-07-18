import React from 'react';
import { Link, Outlet } from 'react-router-dom';

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
