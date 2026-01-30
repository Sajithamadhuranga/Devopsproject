import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/signup/signup";
import Cart from "./components/Cart/Cart";
import Dashboard from "./components/Dashboard/Dashboard";
import Admindashboard from "./components/Admindashboard/Admindashboard";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Galary from "./components/Galary/Galary";
import Stock from "./components/Stock/Stock";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admindashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
