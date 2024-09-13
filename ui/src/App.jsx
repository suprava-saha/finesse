import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";
import "./App.css";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}></LoginPopup> : <></>}

      <div className="app">
        <Navbar setShowLogin={setShowLogin}></Navbar>
        <Outlet></Outlet>
      </div>
      
      <Footer></Footer>
    </>
  );
}

export default App;
