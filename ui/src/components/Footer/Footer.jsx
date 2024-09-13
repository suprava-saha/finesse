import { assets } from "../../assets/assets";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
            praesentium odio ducimus laborum ab maxime vitae eum, ea, quo enim
            suscipit, eligendi architecto voluptate. Totam!
          </p>
        </div>
        <div className="footer-content-center">
          <h2>FINESSE</h2>
          <ul>
            <li>FINESSE</li>
            <li>About FINESSE</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Say Hello to FINESSE</h2>
          <ul>
            <li>+880 18697 43080</li>
            <li>suprava.saha.dibya@g.bracu.ac.bd</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; FINESSE - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
