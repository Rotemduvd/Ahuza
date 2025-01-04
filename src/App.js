import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Parking from "./pages/Parking";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parking" element={<Parking />} />
        </Routes>
      </Router>
  );
}

export default App;