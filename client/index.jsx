// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import axios from 'axios';
import App from './components/App.jsx';
import Map from './components/Map.jsx';
import Profile from './components/Profile.jsx';
import EventListings from './components/EventListings.jsx';
import CreateEvents from './components/CreateEvent.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import './styles.css';

const root = createRoot(document.getElementById('root'));

export const UserContext = React.createContext();

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
          setUser(res);
          console.log('APP LINE 91 AXIOS RESOBJ', res);
          if (res.status === 200) { return res; }
        })
        .then(({ data }) => { // <-- data = userObject
          console.log('DATA APP GET REQ LINE 94', data);
          setUser(data);
        })
        .catch((err) => console.error(err, '***ERROR***'));
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value = {user} >
      { children }
      </UserContext.Provider>
  );
}
const logout = () => {
  axios.get("/logout").then(res => {
    if(res.data) {
      alert('logout successful')
      window.location.href = '/'
    }
  }).catch(err => {
    console.error('AXIOSLOGOUT ERR', err)
  })
}

const Button = () => (
  <Route render={({ history}) => (
    <button
      type='button'
      onClick={() => { history.push('/') }}
    >
      Click Me!
    </button>
  )} />
)

root.render(
  <UserContextProvider>
  <HashRouter>
    <Routes>
      <Route path="/" element= {<App />}>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="map" element={<Map />} />
        <Route path="eventListings" element={<EventListings />} />
        <Route path="postEvent" element={<CreateEvents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element= {<Login />}/>
        <Route path="*" element= {<Login />}/>
      </Route>
    </Routes>
  </HashRouter>
  </UserContextProvider>,
);

export default UserContextProvider;
