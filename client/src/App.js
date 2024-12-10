<<<<<<< HEAD:client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Events from "./pages/Events";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import Cart from "./pages/Cart";
import Navbar from "./components/common/Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/events" element={<Events />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
}

export default App;
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"
import CreateEvent from "./pages/CreateEvent";
import Cart from "./pages/Cart";
import Navbar from "./components/common/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <Router>
            <AuthProvider><Navbar /></AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/events" element={<Events />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
}

export default App;
>>>>>>> origin/osvaldo:src/App.js
