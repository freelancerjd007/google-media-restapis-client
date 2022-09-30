import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "containers/Home";
import AccessToken from "components/AccessToken";

export default function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/access-token/:token" element={<AccessToken />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
