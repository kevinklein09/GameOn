import React from "react";
// import ReactDOM from "react-dom";
import App from "./components/App.jsx"
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Map from "./components/Map.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element= {<App />} />
    <Route path="map" element={<Map />} />
  </Routes>
</BrowserRouter>);