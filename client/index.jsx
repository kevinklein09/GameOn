import React from 'react';
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, HashRouter,
} from 'react-router-dom';
import App from './components/App.jsx';
import Map from './components/Map.jsx';
import Profile from './components/Profile.jsx';
import EventListings from './components/EventListings.jsx';
import CreateEvents from './components/CreateEvent.jsx';
import Login from './components/Login.jsx';
import './styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element= {<App />}>
        <Route path="login" element={<Login />} />
        <Route path="map" element={<Map />} />
        <Route path="eventListings" element={<EventListings />} />
        <Route path="postEvent" element={<CreateEvents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element= {<App />}/>
      </Route>
    </Routes>
  </HashRouter>,
);

// root.render(
// <BrowserRouter>
//   <Routes>
//     <Route path="/" element= {<App />}>
//       <Route path="login" element={<Login />} />
//       <Route path="map" element={<Map />} />
//       <Route path="listings" element={<Listings />} />
//       <Route path="postEvent" element={<CreateEvents />} />
//       <Route path="profile" element={<Profile />} />
//       <Route path="*" element= {<App />}/>
//     </Route>
//   </Routes>
// </BrowserRouter>,
// );
