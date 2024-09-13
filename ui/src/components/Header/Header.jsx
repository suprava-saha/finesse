import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Get Indulged into our FINESSE</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
          assumenda, doloremque molestias, nemo rerum corporis sequi adipisci
          atque, fugiat repellendus velit doloribus quisquam iusto architecto.
        </p>
        <Link to="/menus">View Menu</Link>
      </div>
    </div>
  );
};

export default Header;
