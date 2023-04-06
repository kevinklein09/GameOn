/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import axios from 'axios';
import App from './components/App.jsx';
import Map from './components/Map.jsx';
import Profile from './components/Profile.jsx';
import EventListings from './components/EventListings.jsx';
import EventPage from './components/EventPage.jsx';
import CreateEvents from './components/CreateEvent.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import TeamList from './components/TeamList.jsx';
import CreateTeam from './components/CreateTeam.jsx';
import Weather from './components/Weather.jsx';
import './styles.css';

const root = createRoot(document.getElementById('root'));

export const UserContext = React.createContext();

// eslint-disable-next-line react/prop-types
function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      const options = {
        url: '/hidden',
        method: 'GET',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      };
      axios(options)
        .then((res) => {
          setUser({
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            image: res.data.image,
            _id: res.data._id,
            eventCount: res.data.eventCount,
          });
          if (res.status === 200) {
            return res;
          }
        })
        .catch((err) => console.error(err, '***ERROR***'));
    };
    getUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

root.render(
  <UserContextProvider>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='map' element={<Map />} />
          <Route path='eventListings' element={<EventListings />} />
          <Route path='eventPage/:eventId' element={<EventPage />} />
          <Route path='postEvent' element={<CreateEvents />} />
          <Route path='leaderboard' element={<Leaderboard />} />
          <Route path='forecast' element={<Weather />} />
          <Route path='teamList' element={<TeamList />} />
          <Route path='createTeam' element={<CreateTeam />} />
          <Route path='profile' element={<Profile />} />
          <Route path='logout' />
          <Route path='*' element={<Login />} />
        </Route>
      </Routes>
    </HashRouter>
  </UserContextProvider>
);

export default UserContextProvider;
