// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import React, { useState, createContext } from 'react';
import {
  Routes, Route, HashRouter, BrowserRouter,
} from 'react-router-dom';
import App from './components/App.jsx';
import Map from './components/Map.jsx';
import Profile from './components/Profile.jsx';
import EventListings from './components/EventListings.jsx';
import CreateEvents from './components/CreateEvent.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import './styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = createRoot(document.getElementById('root'));
// const [user, setUser] = useState('{username: user, email: user@gmail.com}');
const UserContext = createContext();

class UserContextProvider extends React.Component {
  state = {
    user: { username: 'username', email: 'user@gmail.com' },
  };

  render() {
    return (
    <UserContext.Provider value = {{ ...this.state }} />
    );
  }
}

root.render(
  <UserContextProvider>
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element= {<App />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="home" element={<Home />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="map" element={<Map />} />
        <Route exact path="eventListings" element={<EventListings />} />
        <Route exact path="postEvent" element={<CreateEvents />} />
        <Route exact path="profile" element={<Profile />} />
        <Route exact path="logout" element= {<Login />}/>
        <Route exact path="*" element= {<Login />}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </UserContextProvider>,
);
