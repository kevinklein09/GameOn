// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import React, { useState, createContext, Component } from 'react';
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

class UserContextProvider extends Component {
  state = {
    user: { username: 'username', email: 'user@gmail.com' },
  };

  render() {
    return (
    <UserContext.Provider value = {{ ...this.state }} >
      { this.props.children }
      </UserContext.Provider>
    );
  }
}

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
