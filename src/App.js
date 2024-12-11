import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Events from "./pages/Events";

function App() {
  return (
    <Router>
      <nav style={{ backgroundColor: "#333", padding: "10px", textAlign: "center" }}>
        <Link to="/" style={{ margin: "0 15px", color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/events" style={{ margin: "0 15px", color: "white", textDecoration: "none" }}>Events</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
