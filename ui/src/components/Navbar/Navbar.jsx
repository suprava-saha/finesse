import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

const Navbar = ({ setShowLogin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuBorder, setMenuBorder] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    window.location.reload();

  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="logo" />{" "}
      </Link>
      <ul className="navbar-menu">
        <Link
          onClick={() => setMenuBorder("home")}
          className={menuBorder === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/menus"
          onClick={() => setMenuBorder("menu")}
          className={menuBorder === "menu" ? "active" : ""}
        >
          Menus
        </Link>
        <a
          href="#footer"
          onClick={() => setMenuBorder("contact")}
          className={menuBorder === "contact" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>



      <HamburgerMenu></HamburgerMenu>



      <div className="navbar-right">
        
        <div className="navbar-basket-icon">
          <Link to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="basket icon" />{" "}
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar_profile">
            <img src={assets.profile_icon} alt="profile_icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="bag_icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout_icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
