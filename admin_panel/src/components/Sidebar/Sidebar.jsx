import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faBox } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="add icon" />
          <p>Add Menu</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="order_icon" />
          <p> Menu List</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="order_icon" />
          <p>Orders</p>
        </NavLink>

        <NavLink to="/category/add" className="sidebar-option">
          <img src={assets.add_icon} alt="add icon" />
          <span className="sidebar-text">Add Category</span>
        </NavLink>
        <NavLink as={NavLink} to="/category/list" className="sidebar-option">
          <img src={assets.order_icon} alt="order_icon" />
          <span className="sidebar-text">Category List</span>
        </NavLink>

        <NavLink as={NavLink} to="/items/add" className="sidebar-option">
          <img src={assets.add_icon} alt="add icon" />
          <span className="sidebar-text">Add Item</span>
        </NavLink>
        <NavLink as={NavLink} to="/items/list" className="sidebar-option">
          <img src={assets.order_icon} alt="order_icon" />
          <span className="sidebar-text">Item List</span>
        </NavLink>
        <NavLink to="/SalesReport" className="sidebar-option">
        <img src={assets.order_icon} alt="order_icon" />
          <span className="sidebar-text">Sales Report</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
