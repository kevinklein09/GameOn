import React from "react";
// import ReactDOM from "react-dom";
import App from "./components/App.jsx"
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Map from "./components/Map.jsx";
import Profile from './components/Profile.jsx';
import Listings from './components/Listings.jsx';
import CreateEvents from './components/CreateEvent.jsx';
import Login from './components/Login.jsx';

const root = createRoot(document.getElementById("root"));

root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element= {<App />} />
    <Route path="login" element={<Login />} />
    <Route path="map" element={<Map />} />
    <Route path="listings" element={<Listings />} />
    <Route path="CreateEvents" element={<CreateEvents />} />
    <Route path="CreateEvents" element={<CreateEvents />} /> 
  </Routes>
</BrowserRouter>);